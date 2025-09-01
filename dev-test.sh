#!/bin/bash

# VeloCollab Phase 1 Development Test
# Enhanced for Warp terminal with VeloCollab branding

set -e

# VeloCollab brand colors for Warp
VELO_ORANGE='\033[38;5;208m'  # FF6B35
VELO_BLUE='\033[38;5;18m'     # 004E89
VELO_GREEN='\033[38;5;29m'    # 1A936F
WHITE='\033[1;37m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${VELO_ORANGE}🚀 VeloCollab Phase 1 Development Test${NC}"
echo -e "${WHITE}======================================${NC}"

# Test backend
echo ""
echo -e "${WHITE}🐍 BACKEND TESTS${NC}"
echo -e "${CYAN}================${NC}"
cd backend

if [ ! -d ".venv" ]; then
    echo -e "   ${RED}❌ Virtual environment not found${NC}"
    echo -e "   ${YELLOW}💡 Run: .warp/scripts/setup-dev.sh${NC}"
    exit 1
fi

source .venv/bin/activate

echo -e "   ${CYAN}🧪 Running backend tests...${NC}"
if pytest tests -v --tb=short; then
    echo -e "   ${GREEN}✅ Backend tests passed!${NC}"
else
    echo -e "   ${RED}❌ Backend tests failed!${NC}"
    exit 1
fi

echo ""
echo -e "   ${CYAN}🚀 Testing backend startup...${NC}"
echo -e "   ${YELLOW}Starting FastAPI server (5 second test)...${NC}"
timeout 5s uvicorn src.app.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!
sleep 2

if curl -s http://localhost:8000/health > /dev/null; then
    echo -e "   ${GREEN}✅ Backend API is responding!${NC}"
    echo -e "   ${CYAN}   Health check: http://127.0.0.1:8000/health${NC}"
else
    echo -e "   ${RED}❌ Backend API not responding!${NC}"
fi

# Cleanup backend
kill $BACKEND_PID 2>/dev/null
deactivate
cd ..

# Test frontend
echo ""
echo -e "${WHITE}⚡ FRONTEND TESTS${NC}"
echo -e "${CYAN}=================${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo -e "   ${CYAN}📦 Installing frontend dependencies...${NC}"
    npm ci --silent
    echo -e "   ${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "   ${GREEN}✅ Dependencies already installed${NC}"
fi

echo -e "   ${CYAN}🏗️ Testing frontend build...${NC}"
if npm run build --silent; then
    echo -e "   ${GREEN}✅ Frontend builds successfully!${NC}"
    rm -rf build
    echo -e "   ${CYAN}   🧽 Cleaned up build artifacts${NC}"
else
    echo -e "   ${RED}❌ Frontend build failed!${NC}"
    exit 1
fi

cd ..

echo ""
echo -e "${VELO_GREEN}🎉 Phase 1 Development Test Complete!${NC}"
echo -e "${WHITE}======================================${NC}"
echo ""
echo -e "${VELO_ORANGE}🚀 Ready to start development!${NC}"
echo ""
echo -e "${WHITE}Quick Start Commands:${NC}"
echo -e "   ${CYAN}Backend:${NC}"
echo -e "     cd backend && source .venv/bin/activate"
echo -e "     uvicorn src.app.main:app --reload --host 127.0.0.1 --port 8000"
echo ""
echo -e "   ${CYAN}Frontend:${NC}"
echo -e "     cd frontend && npm start"
echo ""
echo -e "${WHITE}Warp Workflows (faster):${NC}"
echo -e "   • ${VELO_ORANGE}start-backend${NC} - Launch FastAPI server"
echo -e "   • ${VELO_ORANGE}start-frontend${NC} - Launch React dev server"
echo -e "   • ${VELO_ORANGE}start-full-stack${NC} - Launch both servers"
echo ""
echo -e "${CYAN}Then visit http://localhost:3000 for the app!${NC}"
echo -e "${VELO_GREEN}Happy coding! Building the future of fitness! 💪${NC}"
