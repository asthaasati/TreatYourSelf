from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # --- API Versioning ---
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "TreatYourSelf"
    ENVIRONMENT: str = "development"
    
    # --- Database Settings ---
    DATABASE_URL: str
    POSTGRES_USER: Optional[str] = None
    POSTGRES_PASSWORD: Optional[str] = None
    POSTGRES_DB: Optional[str] = None
    
    # --- Redis & Celery ---
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # --- AI Providers (Gemini & Groq) ---
    GEMINI_API_KEY: str
    GROQ_API_KEY: str
    PRIMARY_MODEL: str = "gemini-1.5-pro"
    FALLBACK_MODEL: str = "llama-3.3-70b-versatile"
    AI_CONFIDENCE_THRESHOLD: float = 0.95
    
    # --- Security ---
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 Days
    
    # --- Video Provider ---
    VIDEO_API_KEY: Optional[str] = None
    VIDEO_SECRET: Optional[str] = None

    # Pydantic Config: Reads from .env and ignores extra variables
    model_config = SettingsConfigDict(
        env_file=".env", 
        case_sensitive=False,  # Usually safer for environment variables
        extra="ignore"
    )

settings = Settings()