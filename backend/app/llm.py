"""
Thin abstraction over OpenAI and Groq chat completion APIs so the rest of
the app doesn't care which provider is configured. Both SDKs expose an
OpenAI-compatible `chat.completions.create` interface.
"""

from openai import OpenAI
from groq import Groq

from app.config import settings
from app.schemas import ChatMessage


def _get_client_and_model(provider: str | None, api_key: str | None):
    provider = provider or settings.llm_provider

    if provider == "openai":
        key = api_key or settings.openai_api_key
        if not key:
            raise ValueError("No OpenAI API key configured.")
        return OpenAI(api_key=key), settings.openai_model

    if provider == "groq":
        key = api_key or settings.groq_api_key
        if not key:
            raise ValueError("No Groq API key configured.")
        return Groq(api_key=key), settings.groq_model

    raise ValueError(f"Unsupported LLM provider: {provider}")


def generate_reply(
    system_prompt: str,
    history: list[ChatMessage],
    provider: str | None = None,
    api_key: str | None = None,
) -> str:
    client, model = _get_client_and_model(provider, api_key)

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend({"role": m.role, "content": m.content} for m in history)

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.4,
        max_tokens=600,
    )
    return completion.choices[0].message.content.strip()
