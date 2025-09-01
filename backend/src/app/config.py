from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "VeloCollab"
    debug: bool = True
    allowed_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"


settings = Settings()
