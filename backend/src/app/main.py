import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="VeloCollab API", version="1.0.0")

# CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "VeloCollab API is running!"}


@app.get("/health")
async def health():
    return {"status": "healthy", "version": "1.0.0"}


@app.get("/api/status")
async def api_status():
    return {
        "api": "VeloCollab",
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
    }
