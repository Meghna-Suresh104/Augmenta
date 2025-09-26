from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # To load variables from a .env file, you'd specify it here
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # --- Database Config ---
    DATABASE_HOSTNAME: str
    DATABASE_PORT: int
    DATABASE_PASSWORD: str
    DATABASE_USERNAME: str
    DATABASE_NAME: str

    # --- Security & JWT Config ---
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # --- Google OAuth Config ---
    GOOGLE_OAUTH_CLIENT_ID: str
    GOOGLE_OAUTH_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str

    # You can also compute properties directly in your settings
    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        return (f"mysql+pymysql://{self.DATABASE_USERNAME}:{self.DATABASE_PASSWORD}@"
                f"{self.DATABASE_HOSTNAME}:{self.DATABASE_PORT}/{self.DATABASE_NAME}")

# The lru_cache decorator caches the settings object, so it's only created once.
@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()

