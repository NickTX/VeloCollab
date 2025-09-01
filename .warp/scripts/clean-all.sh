#!/bin/bash

# VeloCollab Cleanup Script
# Removes all build artifacts, caches, and temporary files

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

echo -e "${VELO_ORANGE}🧹 VeloCollab Cleanup Script${NC}"
echo -e "${WHITE}=============================${NC}"
echo ""

CLEANED_ITEMS=0
CLEANED_SIZE=0

# Function to clean a directory/file and report size
clean_item() {
    local item="$1"
    local description="$2"

    if [ -e "$item" ]; then
        # Calculate size before removal
        if [ -d "$item" ]; then
            SIZE=$(du -sh "$item" 2>/dev/null | cut -f1 || echo "unknown")
        else
            SIZE=$(ls -lh "$item" 2>/dev/null | awk '{print $5}' || echo "unknown")
        fi

        rm -rf "$item"
        echo -e "   ${GREEN}✅ Cleaned: $description ($SIZE)${NC}"
        CLEANED_ITEMS=$((CLEANED_ITEMS + 1))
    else
        echo -e "   ${CYAN}ℹ️  Not found: $description${NC}"
    fi
}

# Backend cleanup
echo -e "${WHITE}🐍 Backend Cleanup${NC}"
echo -e "${CYAN}==================${NC}"

if [ -d "backend" ]; then
    cd backend

    # Python cache files
    clean_item "__pycache__" "Python cache files"
    find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
    find . -name "*.pyc" -delete 2>/dev/null || true
    find . -name "*.pyo" -delete 2>/dev/null || true

    # Test artifacts
    clean_item ".pytest_cache" "Pytest cache"
    clean_item ".coverage" "Coverage data"
    clean_item "htmlcov" "Coverage HTML report"
    clean_item "profile.stats" "Profiling data"

    # Build artifacts
    clean_item "build" "Build directory"
    clean_item "dist" "Distribution directory"
    clean_item "*.egg-info" "Egg info directories"

    # Logs
    clean_item "*.log" "Log files"
    clean_item "logs" "Logs directory"

    echo -e "   ${GREEN}✅ Python cache files cleaned${NC}"

    cd ..
else
    echo -e "   ${YELLOW}⚠️  Backend directory not found${NC}"
fi

echo ""

# Frontend cleanup
echo -e "${WHITE}⚡ Frontend Cleanup${NC}"
echo -e "${CYAN}===================${NC}"

if [ -d "frontend" ]; then
    cd frontend

    # Build artifacts
    clean_item "build" "Production build"
    clean_item "dist" "Distribution directory"

    # Node.js cache
    clean_item ".npm" "NPM cache"
    clean_item "node_modules/.cache" "Node modules cache"

    # Test coverage
    clean_item "coverage" "Test coverage reports"

    # Logs
    clean_item "npm-debug.log*" "NPM debug logs"
    clean_item "yarn-debug.log*" "Yarn debug logs"
    clean_item "yarn-error.log*" "Yarn error logs"
    clean_item "lerna-debug.log*" "Lerna debug logs"

    # OS generated files
    clean_item ".DS_Store" "macOS .DS_Store files"
    find . -name ".DS_Store" -delete 2>/dev/null || true

    cd ..
else
    echo -e "   ${YELLOW}⚠️  Frontend directory not found${NC}"
fi

echo ""

# Project-wide cleanup
echo -e "${WHITE}🗂️  Project-wide Cleanup${NC}"
echo -e "${CYAN}========================${NC}"

# Git artifacts (temporary)
clean_item ".git/index.lock" "Git index lock"

# Editor files
clean_item ".vscode/settings.json.bak" "VSCode backup settings"
clean_item "*.swp" "Vim swap files"
clean_item "*.swo" "Vim backup files"
clean_item "*~" "Editor backup files"

# Temporary files
clean_item "*.tmp" "Temporary files"
clean_item "*.temp" "Temporary files"
clean_item ".tmp" "Temporary directory"

# OS files
find . -name ".DS_Store" -delete 2>/dev/null || true
find . -name "Thumbs.db" -delete 2>/dev/null || true

echo ""

# Optional: Heavy cleanup (ask user)
echo -e "${WHITE}🔄 Optional Heavy Cleanup${NC}"
echo -e "${CYAN}=========================${NC}"

read -p "$(echo -e ${YELLOW}Do you want to remove node_modules and Python virtual environment? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -d "frontend/node_modules" ]; then
        clean_item "frontend/node_modules" "Node.js dependencies"
        echo -e "   ${YELLOW}ℹ️  Run 'npm install' in frontend/ to restore${NC}"
    fi

    if [ -d "backend/.venv" ]; then
        clean_item "backend/.venv" "Python virtual environment"
        echo -e "   ${YELLOW}ℹ️  Run '.warp/scripts/setup-dev.sh' to restore environment${NC}"
    fi
    echo ""
else
    echo -e "   ${CYAN}ℹ️  Skipping heavy cleanup${NC}"
    echo ""
fi

# Docker cleanup (if Docker is available)
if command -v docker >/dev/null 2>&1; then
    echo -e "${WHITE}🐳 Docker Cleanup${NC}"
    echo -e "${CYAN}=================${NC}"

    read -p "$(echo -e ${YELLOW}Do you want to clean Docker artifacts? [y/N]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Clean dangling images
        DANGLING=$(docker images -f "dangling=true" -q | wc -l | tr -d ' ')
        if [ "$DANGLING" -gt 0 ]; then
            docker rmi $(docker images -f "dangling=true" -q) 2>/dev/null || true
            echo -e "   ${GREEN}✅ Cleaned $DANGLING dangling Docker images${NC}"
        fi

        # Clean build cache
        docker builder prune -f 2>/dev/null || true
        echo -e "   ${GREEN}✅ Cleaned Docker build cache${NC}"
    else
        echo -e "   ${CYAN}ℹ️  Skipping Docker cleanup${NC}"
    fi
    echo ""
fi

# Summary
echo -e "${VELO_GREEN}🎉 Cleanup Complete!${NC}"
echo -e "${WHITE}====================${NC}"
echo -e "   ${CYAN}Items cleaned:${NC} $CLEANED_ITEMS"
echo ""

# Helpful next steps
echo -e "${VELO_ORANGE}Next steps (if needed):${NC}"
echo -e "• Run ${WHITE}.warp/scripts/setup-dev.sh${NC} to restore development environment"
echo -e "• Run ${WHITE}npm install${NC} in frontend/ to restore Node.js dependencies"
echo -e "• Run ${WHITE}.warp/scripts/project-info.sh${NC} to check project status"
echo ""
echo -e "${VELO_GREEN}Project cleaned and ready for fresh start! 🚀${NC}"
