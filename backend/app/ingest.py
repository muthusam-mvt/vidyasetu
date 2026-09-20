"""
Run this manually to (re)build the vector store from knowledge_base/*.md:

    python -m app.ingest
"""

from app.rag import ingest_knowledge_base

if __name__ == "__main__":
    count = ingest_knowledge_base()
    print(f"Ingested {count} chunks into the Chroma collection.")
