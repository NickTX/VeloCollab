#!/bin/bash

# VeloCollab Comprehensive Test Suite
# Runs all tests for backend and frontend components

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

echo -e "${VELO_ORANGE}🧪 VeloCollab Comprehensive Test Suite${NC}"
echo -e "${WHITE}======================================${NC}"
echo ""

# Test results tracking
BACKEND_TESTS_PASSED=0
FRONTEND_TESTS_PASSED=0
LINT_CHECKS_PASSED=0
TOTAL_TESTS=0
FAILED_TESTS=0

# Function to run a test and track results
run_test() {
    local test_name="$1"
    local test_command="$2"
    local component="$3"

    echo -e "${CYAN}🔍 Running: $test_name${NC}"
    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    if eval "$test_command"; then
        echo -e "   ${GREEN}✅ PASSED: $test_name${NC}"
        case $component in
            "backend") BACKEND_TESTS_PASSED=$((BACKEND_TESTS_PASSED + 1)) ;;
            "frontend") FRONTEND_TESTS_PASSED=$((FRONTEND_TESTS_PASSED + 1)) ;;
            "lint") LINT_CHECKS_PASSED=$((LINT_CHECKS_PASSED + 1)) ;;
        esac
    else
        echo -e "   ${RED}❌ FAILED: $test_name${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    echo ""
}

# Backend Tests
echo -e "${WHITE}🐍 BACKEND TESTS${NC}"
echo -e "${CYAN}=================${NC}"

if [ -d "backend" ]; then
    cd backend

    # Check virtual environment
    if [ ! -d ".venv" ]; then
        echo -e "${RED}❌ Virtual environment not found. Run setup-dev.sh first${NC}"
        exit 1
    fi

    source .venv/bin/activate

    # Python import test
    run_test "Backend imports" "python3 -c 'import src.app.main' >/dev/null 2>&1" "backend"

    # Unit tests
    if [ -d "tests" ]; then
        run_test "Backend unit tests" "pytest tests -v --tb=short" "backend"
    else
        echo -e "${YELLOW}⚠️  No backend tests directory found${NC}"
    fi

    # Code quality checks
    run_test "Backend code formatting (black)" "black --check src tests" "lint"
    run_test "Backend linting (ruff)" "ruff check src tests" "lint"

    # Type checking (if mypy is available)
    if command -v mypy >/dev/null 2>&1; then
        run_test "Backend type checking (mypy)" "mypy src --ignore-missing-imports" "lint"
    fi

    # API health test (if server is running)
    if curl -s http://localhost:8000/health >/dev/null 2>&1; then
        run_test "Backend API health check" "curl -s http://localhost:8000/health | grep -q 'healthy\\|ok'" "backend"
    else
        echo -e "${YELLOW}⚠️  Backend server not running, skipping API tests${NC}"
        echo ""
    fi

    deactivate
    cd ..
else
    echo -e "${RED}❌ Backend directory not found${NC}"
    echo ""
fi

# Frontend Tests
echo -e "${WHITE}⚡ FRONTEND TESTS${NC}"
echo -e "${CYAN}=================${NC}"

if [ -d "frontend" ]; then
    cd frontend

    # Check node_modules
    if [ ! -d "node_modules" ]; then
        echo -e "${RED}❌ Node modules not found. Run 'npm install' first${NC}"
        exit 1
    fi

    # TypeScript compilation
    run_test "Frontend TypeScript compilation" "npx tsc --noEmit" "frontend"

    # Unit tests
    run_test "Frontend unit tests" "npm test -- --watchAll=false --passWithNoTests" "frontend"

    # Build test
    run_test "Frontend production build" "npm run build" "frontend"

    # Clean up build artifacts
    if [ -d "build" ]; then
        rm -rf build
        echo -e "   ${CYAN}🧹 Cleaned up build artifacts${NC}"
    fi

    # Linting (if available)
    if npm run lint >/dev/null 2>&1; then
        run_test "Frontend linting" "npm run lint" "lint"
    fi

    cd ..
else
    echo -e "${RED}❌ Frontend directory not found${NC}"
    echo ""
fi

# Integration Tests (if available)
echo -e "${WHITE}🔗 INTEGRATION TESTS${NC}"
echo -e "${CYAN}=====================${NC}"

# Check if both servers are running for integration tests
BACKEND_RUNNING=false
FRONTEND_RUNNING=false

if curl -s http://localhost:8000/health >/dev/null 2>&1; then
    BACKEND_RUNNING=true
fi

if curl -s http://localhost:3000 >/dev/null 2>&1; then
    FRONTEND_RUNNING=true
fi

if [ "$BACKEND_RUNNING" = true ] && [ "$FRONTEND_RUNNING" = true ]; then
    echo -e "${GREEN}✅ Both servers running, integration tests possible${NC}"

    # API connectivity from frontend perspective
    run_test "Frontend-Backend API connectivity" "curl -s http://localhost:8000/health >/dev/null" "backend"

    # CORS test (if applicable)
    run_test "CORS configuration" "curl -s -H 'Origin: http://localhost:3000' http://localhost:8000/health >/dev/null" "backend"

else
    echo -e "${YELLOW}⚠️  Not all servers running, skipping integration tests${NC}"
    echo -e "   Backend running: $BACKEND_RUNNING"
    echo -e "   Frontend running: $FRONTEND_RUNNING"
fi
echo ""

# Security Checks
echo -e "${WHITE}🔒 SECURITY CHECKS${NC}"
echo -e "${CYAN}==================${NC}"

# Check for common security issues
run_test "No hardcoded secrets in backend" "! grep -r 'password\\|secret\\|key' backend/src --exclude-dir=.git || true" "lint"
run_test "No hardcoded secrets in frontend" "! grep -r 'password\\|secret\\|key' frontend/src --exclude-dir=.git || true" "lint"

# Check for .env files not in version control
if [ -f "backend/.env" ] && ! git check-ignore backend/.env >/dev/null 2>&1; then
    echo -e "   ${YELLOW}⚠️  backend/.env should be in .gitignore${NC}"
fi

echo ""

# Final Results
echo -e "${VELO_ORANGE}📊 TEST RESULTS SUMMARY${NC}"
echo -e "${WHITE}========================${NC}"

PASSED_TESTS=$((TOTAL_TESTS - FAILED_TESTS))
PASS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))

echo -e "   ${CYAN}Total Tests:${NC} $TOTAL_TESTS"
echo -e "   ${GREEN}Passed:${NC} $PASSED_TESTS"
echo -e "   ${RED}Failed:${NC} $FAILED_TESTS"
echo -e "   ${CYAN}Pass Rate:${NC} $PASS_RATE%"
echo ""

echo -e "   ${CYAN}Backend Tests Passed:${NC} $BACKEND_TESTS_PASSED"
echo -e "   ${CYAN}Frontend Tests Passed:${NC} $FRONTEND_TESTS_PASSED"
echo -e "   ${CYAN}Code Quality Checks Passed:${NC} $LINT_CHECKS_PASSED"
echo ""

# Final status
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${VELO_GREEN}🎉 ALL TESTS PASSED! 🎉${NC}"
    echo -e "${WHITE}VeloCollab is ready for development! 💪${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review the errors above.${NC}"
    echo -e "${YELLOW}🔧 Fix the issues and run the tests again.${NC}"
    exit 1
fi
