from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    app_name: str = "VeloCollab"
    debug: bool = True
    allowed_origins: List[str] = ["http://localhost:3000"]
    
    class Config:
        env_file = ".env"


settings = Settings()
