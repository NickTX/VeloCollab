#!/bin/bash

# VeloCollab Project Information Script
# Displays comprehensive project status and information

set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# VeloCollab brand colors
VELO_ORANGE='\033[38;5;208m'  # FF6B35
VELO_BLUE='\033[38;5;18m'     # 004E89
VELO_GREEN='\033[38;5;29m'    # 1A936F

echo -e "${VELO_ORANGE}"
cat << "EOF"
 __     __   _         _____       _ _       _
 \ \   / /  | |       / ____|     | | |     | |
  \ \_/ /__ | | ___  | |     ___ | | | __ _| |__
   \   / _ \| |/ _ \ | |    / _ \| | |/ _` | '_ \
    | |  __/| | (_) || |___| (_) | | | (_| | |_) |
    |_|\___||_|\___/  \_____\___/|_|_|\__,_|_.__/

EOF
echo -e "${NC}"

echo -e "${WHITE}🏋️  Where Speed Meets Community - Fitness Platform${NC}"
echo -e "${CYAN}======================================================${NC}"
echo ""

# Project basics
echo -e "${WHITE}📋 PROJECT INFORMATION${NC}"
echo -e "   ${VELO_ORANGE}Name:${NC} VeloCollab"
echo -e "   ${VELO_ORANGE}Type:${NC} Full-stack Fitness Tracking Platform"
echo -e "   ${VELO_ORANGE}Stack:${NC} FastAPI (Python) + React (TypeScript)"
echo -e "   ${VELO_ORANGE}Phase:${NC} MVP Development"
echo ""

# Git status
echo -e "${WHITE}📊 REPOSITORY STATUS${NC}"
if git status &>/dev/null; then
    BRANCH=$(git branch --show-current)
    COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
    LAST_COMMIT=$(git log -1 --format="%h - %s (%cr)" 2>/dev/null || echo "No commits")

    echo -e "   ${VELO_ORANGE}Branch:${NC} $BRANCH"
    echo -e "   ${VELO_ORANGE}Commits:${NC} $COMMITS"
    echo -e "   ${VELO_ORANGE}Last:${NC} $LAST_COMMIT"

    # Check for uncommitted changes
    if ! git diff --quiet 2>/dev/null; then
        echo -e "   ${YELLOW}⚠️  Uncommitted changes detected${NC}"
    else
        echo -e "   ${GREEN}✅ Working directory clean${NC}"
    fi
else
    echo -e "   ${RED}❌ Not a git repository${NC}"
fi
echo ""

# Backend status
echo -e "${WHITE}🐍 BACKEND STATUS (FastAPI)${NC}"
if [ -d "backend" ]; then
    cd backend

    # Virtual environment
    if [ -d ".venv" ]; then
        echo -e "   ${GREEN}✅ Virtual environment exists${NC}"
    else
        echo -e "   ${RED}❌ Virtual environment not found${NC}"
    fi

    # Dependencies
    if [ -f "requirements.txt" ]; then
        DEPS_COUNT=$(wc -l < requirements.txt | tr -d ' ')
        echo -e "   ${VELO_ORANGE}Dependencies:${NC} $DEPS_COUNT packages"
    fi

    # Health check
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo -e "   ${GREEN}✅ API server is running (port 8000)${NC}"
        API_HEALTH=$(curl -s http://localhost:8000/health | jq -r '.status' 2>/dev/null || echo "unknown")
        echo -e "   ${VELO_ORANGE}Health:${NC} $API_HEALTH"
    else
        echo -e "   ${YELLOW}⏸️  API server not running${NC}"
    fi

    cd ..
else
    echo -e "   ${RED}❌ Backend directory not found${NC}"
fi
echo ""

# Frontend status
echo -e "${WHITE}⚡ FRONTEND STATUS (React)${NC}"
if [ -d "frontend" ]; then
    cd frontend

    # Package.json
    if [ -f "package.json" ]; then
        NODE_VERSION=$(node --version 2>/dev/null || echo "not found")
        NPM_VERSION=$(npm --version 2>/dev/null || echo "not found")
        echo -e "   ${VELO_ORANGE}Node.js:${NC} $NODE_VERSION"
        echo -e "   ${VELO_ORANGE}NPM:${NC} $NPM_VERSION"

        # Dependencies
        if [ -f "package-lock.json" ]; then
            echo -e "   ${GREEN}✅ Dependencies locked${NC}"
        else
            echo -e "   ${YELLOW}⚠️  No package-lock.json${NC}"
        fi
    fi

    # Development server check
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "   ${GREEN}✅ Dev server running (port 3000)${NC}"
    else
        echo -e "   ${YELLOW}⏸️  Dev server not running${NC}"
    fi

    cd ..
else
    echo -e "   ${RED}❌ Frontend directory not found${NC}"
fi
echo ""

# Development tools
echo -e "${WHITE}🛠️  DEVELOPMENT TOOLS${NC}"

# Python tools
if command -v python3 >/dev/null 2>&1; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo -e "   ${VELO_ORANGE}Python:${NC} $PYTHON_VERSION"
else
    echo -e "   ${RED}❌ Python not found${NC}"
fi

# Docker
if command -v docker >/dev/null 2>&1; then
    echo -e "   ${GREEN}✅ Docker available${NC}"
else
    echo -e "   ${YELLOW}⚠️  Docker not found${NC}"
fi

# Testing tools
if command -v pytest >/dev/null 2>&1 || [ -f "backend/.venv/bin/pytest" ]; then
    echo -e "   ${GREEN}✅ pytest available${NC}"
else
    echo -e "   ${YELLOW}⚠️  pytest not found${NC}"
fi
echo ""

# Quick commands
echo -e "${WHITE}🚀 QUICK START COMMANDS${NC}"
echo -e "   ${VELO_ORANGE}Backend:${NC}"
echo -e "     cd backend && source .venv/bin/activate"
echo -e "     uvicorn src.app.main:app --reload --host 127.0.0.1 --port 8000"
echo ""
echo -e "   ${VELO_ORANGE}Frontend:${NC}"
echo -e "     cd frontend && npm start"
echo ""
echo -e "   ${VELO_ORANGE}Full Test:${NC}"
echo -e "     ./dev-test.sh"
echo ""

# Warp workflows hint
echo -e "${WHITE}⚡ WARP WORKFLOWS AVAILABLE${NC}"
echo -e "   Type ${VELO_ORANGE}warp workflows${NC} to see all available commands"
echo -e "   Popular workflows:"
echo -e "     • ${CYAN}start-backend${NC} - Launch FastAPI server"
echo -e "     • ${CYAN}start-frontend${NC} - Launch React dev server"
echo -e "     • ${CYAN}start-full-stack${NC} - Launch both servers"
echo -e "     • ${CYAN}test-all${NC} - Run all tests"
echo ""

echo -e "${VELO_GREEN}🎯 Happy coding! Building the future of fitness tracking! 💪${NC}"
