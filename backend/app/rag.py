"""
Retrieval-Augmented Generation pipeline.

Uses ChromaDB (persistent, local) with an embedding function (FastEmbed with
SentenceTransformers fallback) to store and retrieve chunks from the custom
knowledge base (app/knowledge_base/*.md), so the LLM answers Indian Knowledge
Systems questions grounded in our own source documents rather than from memory.
"""

import os
import re
import glob

import chromadb
from chromadb.api.types import EmbeddingFunction, Documents, Embeddings

from app.config import settings


def _create_embedding_function():
    """Create FastEmbed embedding function with fallback to SentenceTransformers."""
    try:
        from fastembed import TextEmbedding

        class FastEmbedFunction(EmbeddingFunction):
            def __init__(self, model_name: str):
                self._model = TextEmbedding(model_name=model_name, threads=1)

            def __call__(self, input: Documents) -> Embeddings:
                return [e.tolist() for e in self._model.embed(input)]

        return FastEmbedFunction(settings.embedding_model)
    except Exception:
        from chromadb.utils import embedding_functions

        return embedding_functions.DefaultEmbeddingFunction()


_client = chromadb.PersistentClient(path=settings.chroma_persist_dir)
_embedding_fn = _create_embedding_function()

_collection = _client.get_or_create_collection(
    name=settings.collection_name,
    embedding_function=_embedding_fn,
    metadata={"hnsw:space": "cosine"},
)


def _chunk_markdown(text: str, source: str, max_chars: int = 900) -> list[dict]:
    """Split a markdown doc into heading-aware chunks small enough for retrieval."""
    sections = re.split(r"\n(?=## )", text)
    chunks = []
    for section in sections:
        section = section.strip()
        if not section:
            continue
        if len(section) <= max_chars:
            chunks.append({"text": section, "source": source})
        else:
            # Further split overly long sections on paragraph boundaries.
            para_buf = ""
            for para in section.split("\n\n"):
                if len(para_buf) + len(para) > max_chars and para_buf:
                    chunks.append({"text": para_buf.strip(), "source": source})
                    para_buf = ""
                para_buf += para + "\n\n"
            if para_buf.strip():
                chunks.append({"text": para_buf.strip(), "source": source})
    return chunks


def ingest_knowledge_base(kb_dir: str = None) -> int:
    """
    Read every .md file in the knowledge_base directory, chunk it, embed it,
    and upsert into the Chroma collection. Safe to re-run (idempotent by id).
    Returns the number of chunks ingested.
    """
    kb_dir = kb_dir or os.path.join(os.path.dirname(__file__), "knowledge_base")
    all_chunks: list[dict] = []

    for path in sorted(glob.glob(os.path.join(kb_dir, "*.md"))):
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
        source_name = os.path.basename(path)
        all_chunks.extend(_chunk_markdown(text, source_name))

    if not all_chunks:
        return 0

    ids = [f"{c['source']}::{i}" for i, c in enumerate(all_chunks)]
    documents = [c["text"] for c in all_chunks]
    metadatas = [{"source": c["source"]} for c in all_chunks]

    _collection.upsert(ids=ids, documents=documents, metadatas=metadatas)
    return len(all_chunks)


def retrieve_context(query: str, top_k: int | None = None) -> list[dict]:
    """Return the top_k most relevant chunks for a query, each with its source."""
    top_k = top_k or settings.top_k
    if _collection.count() == 0:
        ingest_knowledge_base()

    results = _collection.query(query_texts=[query], n_results=top_k)

    hits = []
    docs = results.get("documents", [[]])[0]
    metas = results.get("metadatas", [[]])[0]
    for doc, meta in zip(docs, metas):
        hits.append({"text": doc, "source": meta.get("source", "unknown")})
    return hits


def build_system_prompt(query: str) -> tuple[str, list[str]]:
    """
    Retrieve context for the query and assemble a grounded system prompt.
    Returns (system_prompt, list_of_source_filenames_used).
    """
    hits = retrieve_context(query)
    sources = sorted({h["source"] for h in hits})

    context_block = "\n\n".join(
        f"[Source: {h['source']}]\n{h['text']}" for h in hits
    ) or "No matching context was found in the knowledge base."

    system_prompt = f"""You are the Vidya Setu Scribe, a domain-specific assistant for a platform
about Indian Knowledge Systems (IKS), Paninian grammar, heritage preservation,
digital museums, and India's digital public services.

Answer using ONLY the context below when it is relevant. If the context does
not cover the question, say so plainly and give a brief, clearly-labelled
general answer instead of inventing specifics. Keep answers concise (3-6
sentences unless the user asks for depth), and write in a warm, articulate
tone fitting a knowledgeable museum guide.

--- CONTEXT ---
{context_block}
--- END CONTEXT ---
"""
    return system_prompt, sources
