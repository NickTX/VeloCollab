#!/bin/bash

# VeloCollab Full-Stack Startup Script
# Starts both backend and frontend servers in parallel

set -e

# Colors
VELO_ORANGE='\033[38;5;208m'
VELO_GREEN='\033[38;5;29m'
WHITE='\033[1;37m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${VELO_ORANGE}🌟 Starting VeloCollab Full-Stack Development Environment${NC}"
echo -e "${WHITE}========================================================${NC}"
echo ""

# Check if ports are available
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "   ${YELLOW}⚠️  Port $port is already in use (may be $service already running)${NC}"
        return 1
    fi
    return 0
}

# Check backend port
if ! check_port 8000 "FastAPI backend"; then
    echo -e "   ${CYAN}ℹ️  Backend may already be running on port 8000${NC}"
fi

# Check frontend port
if ! check_port 3000 "React frontend"; then
    echo -e "   ${CYAN}ℹ️  Frontend may already be running on port 3000${NC}"
fi

echo ""

# Function to start backend
start_backend() {
    echo -e "${WHITE}🐍 Starting FastAPI Backend Server...${NC}"

    if [ ! -d "backend" ]; then
        echo -e "   ${RED}❌ Backend directory not found${NC}"
        exit 1
    fi

    cd backend

    if [ ! -d ".venv" ]; then
        echo -e "   ${RED}❌ Virtual environment not found. Run setup-dev.sh first${NC}"
        exit 1
    fi

    echo -e "   ${VELO_ORANGE}Activating Python environment...${NC}"
    source .venv/bin/activate

    echo -e "   ${VELO_ORANGE}Starting uvicorn server on http://127.0.0.1:8000${NC}"
    echo -e "   ${CYAN}Health check: http://127.0.0.1:8000/health${NC}"
    echo -e "   ${CYAN}API docs: http://127.0.0.1:8000/docs${NC}"
    echo ""

    # Start backend server
    uvicorn src.app.main:app --reload --host 127.0.0.1 --port 8000 &
    BACKEND_PID=$!

    cd ..

    # Wait a moment and check if backend started
    sleep 3
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo -e "   ${GREEN}✅ Backend server started successfully (PID: $BACKEND_PID)${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Backend server starting... (may take a moment)${NC}"
    fi
}

# Function to start frontend
start_frontend() {
    echo -e "${WHITE}⚡ Starting React Frontend Server...${NC}"

    if [ ! -d "frontend" ]; then
        echo -e "   ${RED}❌ Frontend directory not found${NC}"
        exit 1
    fi

    cd frontend

    if [ ! -d "node_modules" ]; then
        echo -e "   ${RED}❌ Node modules not found. Run 'npm install' first${NC}"
        exit 1
    fi

    echo -e "   ${VELO_ORANGE}Starting React development server on http://localhost:3000${NC}"
    echo ""

    # Start frontend server
    npm start &
    FRONTEND_PID=$!

    cd ..

    # Wait a moment and check if frontend started
    sleep 5
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "   ${GREEN}✅ Frontend server started successfully (PID: $FRONTEND_PID)${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Frontend server starting... (may take a moment)${NC}"
    fi
}

# Start both servers
start_backend &
start_frontend &

# Wait for both processes to start
wait

echo ""
echo -e "${VELO_GREEN}🎉 Full-Stack Environment Started!${NC}"
echo -e "${WHITE}==================================${NC}"
echo ""
echo -e "${VELO_ORANGE}Services:${NC}"
echo -e "   🐍 ${WHITE}Backend:${NC}  http://127.0.0.1:8000"
echo -e "      📋 Health:   http://127.0.0.1:8000/health"
echo -e "      📖 API Docs: http://127.0.0.1:8000/docs"
echo ""
echo -e "   ⚡ ${WHITE}Frontend:${NC} http://localhost:3000"
echo ""
echo -e "${VELO_ORANGE}Process IDs:${NC}"
echo -e "   Backend PID:  $BACKEND_PID"
echo -e "   Frontend PID: $FRONTEND_PID"
echo ""
echo -e "${CYAN}To stop all services:${NC}"
echo -e "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo -e "${CYAN}Or use Ctrl+C to stop this script and all child processes${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down servers...${NC}"

    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null && echo -e "   ${GREEN}✅ Backend stopped${NC}" || echo -e "   ${YELLOW}⚠️  Backend may have already stopped${NC}"
    fi

    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null && echo -e "   ${GREEN}✅ Frontend stopped${NC}" || echo -e "   ${YELLOW}⚠️  Frontend may have already stopped${NC}"
    fi

    echo -e "${VELO_GREEN}👋 Goodbye! Thanks for building the future of fitness! 💪${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Keep script running
echo -e "${YELLOW}Press Ctrl+C to stop all servers...${NC}"
wait
