import os
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .routes import api_router

# Create FastAPI app with enhanced configuration
app = FastAPI(
    title="VeloCollab API",
    version="1.0.0",
    description=(
        "A comprehensive fitness tracking API for workout logging, "
        "progress analytics, and community features"
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://velocollab.com",  # For future production
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "details": {
                "timestamp": datetime.now().isoformat(),
                "path": str(request.url),
            },
        },
    )


# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "VeloCollab API is running!",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "healthy",
    }


# Health check endpoints
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/ready")
async def ready():
    """Kubernetes readiness probe endpoint"""
    return {
        "status": "ready",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
    }


# Legacy status endpoint (for backward compatibility)
@app.get("/api/status")
async def api_status():
    return {
        "api": "VeloCollab",
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "timestamp": datetime.now().isoformat(),
    }
