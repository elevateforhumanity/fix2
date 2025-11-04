"""
Certification Autopilot System - Main API
FastAPI application with all endpoints
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Certification Autopilot API",
    description="Human-in-the-loop certification application system",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Import routers
from .routers import profiles, packets, inject, audit, auth

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(profiles.router, prefix="/api/profiles", tags=["Profiles"])
app.include_router(packets.router, prefix="/api/packets", tags=["Packets"])
app.include_router(inject.router, prefix="/api/inject", tags=["Data Injection"])
app.include_router(audit.router, prefix="/api/audit", tags=["Audit Logs"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Certification Autopilot API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "database": "connected",
        "api": "operational"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
