#!/bin/bash

# VeloCollab Development Environment Setup Script
# Sets up complete development environment for new developers

set -e

# Colors
VELO_ORANGE='\033[38;5;208m'
VELO_BLUE='\033[38;5;18m'
VELO_GREEN='\033[38;5;29m'
WHITE='\033[1;37m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${VELO_ORANGE}🏗️  VeloCollab Development Environment Setup${NC}"
echo -e "${WHITE}===============================================${NC}"
echo ""

# Check prerequisites
echo -e "${WHITE}🔍 Checking Prerequisites...${NC}"

# Python 3.11+
if command -v python3 >/dev/null 2>&1; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo -e "   ${GREEN}✅ Python: $PYTHON_VERSION${NC}"

    # Check Python version
    MAJOR=$(echo $PYTHON_VERSION | cut -d'.' -f1)
    MINOR=$(echo $PYTHON_VERSION | cut -d'.' -f2)
    if [ "$MAJOR" -ge 3 ] && [ "$MINOR" -ge 11 ]; then
        echo -e "   ${GREEN}✅ Python version is compatible${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Python 3.11+ recommended, but will continue${NC}"
    fi
else
    echo -e "   ${RED}❌ Python not found. Please install Python 3.11+${NC}"
    exit 1
fi

# Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo -e "   ${GREEN}✅ Node.js: $NODE_VERSION${NC}"
else
    echo -e "   ${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Git
if command -v git >/dev/null 2>&1; then
    GIT_VERSION=$(git --version | cut -d' ' -f3)
    echo -e "   ${GREEN}✅ Git: $GIT_VERSION${NC}"
else
    echo -e "   ${RED}❌ Git not found. Please install Git${NC}"
    exit 1
fi

echo ""

# Backend setup
echo -e "${WHITE}🐍 Setting up Backend Environment...${NC}"

if [ ! -d "backend" ]; then
    echo -e "   ${RED}❌ Backend directory not found${NC}"
    exit 1
fi

cd backend

# Create virtual environment
if [ ! -d ".venv" ]; then
    echo -e "   ${VELO_ORANGE}Creating Python virtual environment...${NC}"
    python3 -m venv .venv
    echo -e "   ${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "   ${GREEN}✅ Virtual environment already exists${NC}"
fi

# Activate virtual environment and install dependencies
echo -e "   ${VELO_ORANGE}Installing Python dependencies...${NC}"
source .venv/bin/activate

if [ -f "requirements.txt" ]; then
    pip install --upgrade pip
    pip install -r requirements.txt
    echo -e "   ${GREEN}✅ Python dependencies installed${NC}"
else
    echo -e "   ${RED}❌ requirements.txt not found${NC}"
    exit 1
fi

# Install pre-commit hooks if configured
if [ -f "../.pre-commit-config.yaml" ]; then
    echo -e "   ${VELO_ORANGE}Installing pre-commit hooks...${NC}"
    pre-commit install
    echo -e "   ${GREEN}✅ Pre-commit hooks installed${NC}"
fi

deactivate
cd ..

echo ""

# Frontend setup
echo -e "${WHITE}⚡ Setting up Frontend Environment...${NC}"

if [ ! -d "frontend" ]; then
    echo -e "   ${RED}❌ Frontend directory not found${NC}"
    exit 1
fi

cd frontend

# Install Node.js dependencies
if [ -f "package.json" ]; then
    echo -e "   ${VELO_ORANGE}Installing Node.js dependencies...${NC}"
    npm install
    echo -e "   ${GREEN}✅ Node.js dependencies installed${NC}"
else
    echo -e "   ${RED}❌ package.json not found${NC}"
    exit 1
fi

cd ..

echo ""

# Environment configuration
echo -e "${WHITE}🔧 Environment Configuration...${NC}"

# Backend .env file
if [ -f "backend/.env.example" ] && [ ! -f "backend/.env" ]; then
    echo -e "   ${VELO_ORANGE}Creating backend .env file...${NC}"
    cp backend/.env.example backend/.env
    echo -e "   ${GREEN}✅ Backend .env file created from example${NC}"
    echo -e "   ${YELLOW}⚠️  Please review and update backend/.env with your settings${NC}"
elif [ -f "backend/.env" ]; then
    echo -e "   ${GREEN}✅ Backend .env file already exists${NC}"
else
    echo -e "   ${YELLOW}⚠️  No .env.example found, skipping .env creation${NC}"
fi

echo ""

# Test installation
echo -e "${WHITE}🧪 Testing Installation...${NC}"

# Test backend
echo -e "   ${VELO_ORANGE}Testing backend...${NC}"
cd backend
source .venv/bin/activate

# Quick import test
if python3 -c "import src.app.main" >/dev/null 2>&1; then
    echo -e "   ${GREEN}✅ Backend imports successfully${NC}"
else
    echo -e "   ${RED}❌ Backend import failed${NC}"
fi

# Test pytest
if pytest --version >/dev/null 2>&1; then
    echo -e "   ${GREEN}✅ pytest is working${NC}"
else
    echo -e "   ${RED}❌ pytest not working${NC}"
fi

deactivate
cd ..

# Test frontend
echo -e "   ${VELO_ORANGE}Testing frontend...${NC}"
cd frontend

# Test build
if npm run build >/dev/null 2>&1; then
    echo -e "   ${GREEN}✅ Frontend builds successfully${NC}"
    rm -rf build  # Clean up test build
else
    echo -e "   ${RED}❌ Frontend build failed${NC}"
fi

cd ..

echo ""

# Summary
echo -e "${VELO_GREEN}🎉 Development Environment Setup Complete!${NC}"
echo -e "${WHITE}==============================================${NC}"
echo ""
echo -e "${VELO_ORANGE}Next steps:${NC}"
echo -e "1. Review and update ${WHITE}backend/.env${NC} with your configuration"
echo -e "2. Start the backend: ${WHITE}cd backend && source .venv/bin/activate && uvicorn src.app.main:app --reload${NC}"
echo -e "3. Start the frontend: ${WHITE}cd frontend && npm start${NC}"
echo -e "4. Run tests: ${WHITE}./dev-test.sh${NC}"
echo ""
echo -e "${VELO_ORANGE}Useful Warp workflows:${NC}"
echo -e "• ${WHITE}start-backend${NC} - Start FastAPI server"
echo -e "• ${WHITE}start-frontend${NC} - Start React dev server"
echo -e "• ${WHITE}start-full-stack${NC} - Start both servers"
echo -e "• ${WHITE}test-all${NC} - Run all tests"
echo ""
echo -e "${VELO_GREEN}Happy coding! 💪${NC}"
