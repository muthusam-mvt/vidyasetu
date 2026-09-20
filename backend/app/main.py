from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas import ChatRequest, ChatResponse
from app.rag import build_system_prompt, ingest_knowledge_base
from app.llm import generate_reply

app = FastAPI(title="Vidya Setu API", version="0.1.0")

allowed_origins = [o.strip() for o in settings.frontend_origin.split(",") if o.strip()]
if "*" not in allowed_origins and "http://localhost:3000" not in allowed_origins:
    allowed_origins.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if "*" not in allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_ingest():
    # Idempotent: only embeds documents that aren't already stored.
    ingest_knowledge_base()


@app.get("/api/health")
def health():
    return {"status": "ok", "provider": settings.llm_provider}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="messages cannot be empty")

    last_user_msg = next((m.content for m in reversed(req.messages) if m.role == "user"), None)
    if not last_user_msg:
        raise HTTPException(status_code=400, detail="no user message found")

    system_prompt, sources = build_system_prompt(last_user_msg)

    try:
        reply = generate_reply(
            system_prompt=system_prompt,
            history=req.messages,
            provider=req.provider,
            api_key=req.api_key,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"LLM provider error: {e}")

    return ChatResponse(reply=reply, sources=sources)


@app.post("/api/admin/reingest")
def reingest():
    """Manually re-run ingestion, e.g. after editing knowledge_base/*.md."""
    count = ingest_knowledge_base()
    return {"chunks_ingested": count}
