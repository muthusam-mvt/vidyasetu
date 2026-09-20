from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # --- LLM provider selection ---
    llm_provider: str = "groq"  # "openai" or "groq"

    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    groq_api_key: str = ""
    groq_model: str = "openai/gpt-oss-120b"

    # --- Vector store / RAG ---
    chroma_persist_dir: str = "./chroma_store"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    collection_name: str = "iks_knowledge_base"
    top_k: int = 4

    # --- Server ---
    frontend_origin: str = "http://localhost:3000"


settings = Settings()
