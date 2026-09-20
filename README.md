# Bhāratīya Vidyā Setu — Technology for Indian Languages & Heritage

A full-stack starter for a platform covering **Indian language tech, heritage
preservation, digital museums, and digital public services**, with a
manuscript-inspired UI and a RAG-powered chatbot.

## Folder structure

```
heritage-app/
├── frontend/                      # Next.js 14 (App Router) + Tailwind
│   ├── app/
│   │   ├── layout.tsx             # Root layout, fonts, navbar, footer
│   │   ├── page.tsx                # Home: hero chatbot + subtopic grid
│   │   ├── globals.css            # Vintage manuscript design tokens
│   │   └── topics/[slug]/page.tsx # Dynamic subtopic detail page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── OrnateFrame.tsx        # Reusable ornate-border wrapper
│   │   ├── Chatbot.tsx            # Hero chat + quick-action bubbles
│   │   ├── QuickActionBubble.tsx
│   │   └── TopicCard.tsx
│   ├── lib/
│   │   ├── topics.ts              # Single source of truth for the 4 subtopics
│   │   └── api.ts                 # fetch wrapper for /api/chat
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                       # FastAPI + ChromaDB RAG
    ├── app/
    │   ├── main.py                 # /api/chat, /api/health, /api/admin/reingest
    │   ├── config.py               # env-driven settings (provider, keys, RAG)
    │   ├── schemas.py              # Pydantic request/response models
    │   ├── rag.py                  # Chroma ingestion + retrieval
    │   ├── llm.py                  # OpenAI / Groq abstraction
    │   ├── ingest.py               # CLI: python -m app.ingest
    │   └── knowledge_base/         # Source docs the RAG pipeline embeds
    │       ├── iks.md
    │       ├── manuscripts.md
    │       ├── bhashini.md
    │       └── public_services.md
    ├── requirements.txt
    └── .env.example
```

## How the RAG pipeline works

1. **Ingest** — On backend startup (and via `POST /api/admin/reingest`),
   every `.md` file in `app/knowledge_base/` is split into heading-aware
   chunks and embedded with a local `sentence-transformers` model, then
   upserted into a persistent **ChromaDB** collection (`app/rag.py`).
2. **Retrieve** — On each chat request, the latest user message is embedded
   and used to query Chroma for the top-`k` most similar chunks
   (`TOP_K` in `.env`, default 4).
3. **Augment** — Retrieved chunks are formatted into a system prompt that
   instructs the model to answer *only* from that context, and to say so
   plainly if the context doesn't cover the question (`build_system_prompt`).
4. **Generate** — The system prompt + conversation history is sent to
   whichever provider is configured — **OpenAI** or **Groq** — via a shared
   `generate_reply()` call (`app/llm.py`), since both SDKs expose an
   OpenAI-compatible `chat.completions.create` interface.

To add more knowledge, drop additional `.md` files into `knowledge_base/`
and call `POST /api/admin/reingest` (or restart the server).

## Running locally

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # fill in OPENAI_API_KEY or GROQ_API_KEY
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev                 # http://localhost:3000
```

The frontend's `next.config.js` rewrites `/api/*` to the FastAPI server
(`NEXT_PUBLIC_API_BASE`, default `http://localhost:8000`), so `Chatbot.tsx`
just calls `POST /api/chat` and it's transparently proxied.

## Design system notes

The visual language (see `app/globals.css`, `OrnateFrame.tsx`) is built as a
token system rather than copying the reference image directly:

- **Color** — deep maroon (`#5C1A1A`), aged brass (`#B8945A`), parchment
  (`#EFE4C6`), walnut wood (`#241811`), muted sage (`#57624B`) for links/accents.
- **Type** — `Cinzel Decorative` for display headings (the manuscript/carved
  feel), `Crimson Pro` for body copy (readable at length), and
  `Noto Sans Devanagari` for the Devanagari labels used throughout.
- **Layout** — an `OrnateFrame` component replaces the generic rounded-card
  pattern with a layered border + SVG corner flourishes, echoing the
  reference's carved wooden frame without literally recreating it.
- **Motion** — a single `hero-reveal` fade/slide on first paint, respecting
  `prefers-reduced-motion`; no per-card hover fade tricks.

## Extending

- Swap the embedding model in `.env` (`EMBEDDING_MODEL`) for a stronger
  multilingual one (e.g. `sentence-transformers/paraphrase-multilingual-mpnet-base-v2`)
  if you plan to ingest Devanagari-script source material.
- The `provider`/`api_key` fields on `ChatRequest` let a client bring its own
  key per-request instead of relying solely on server-side `.env` config —
  useful if you want users to supply their own OpenAI/Groq key.
- Add more subtopics by extending `frontend/lib/topics.ts` — the grid and
  routing pick up new entries automatically.
