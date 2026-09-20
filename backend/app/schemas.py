from typing import Literal
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(..., min_length=1)
    # Optional per-request override so a client can bring its own key
    # instead of relying on the server's .env configuration.
    provider: Literal["openai", "groq"] | None = None
    api_key: str | None = None


class ChatResponse(BaseModel):
    reply: str
    sources: list[str] = []
