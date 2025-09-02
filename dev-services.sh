#!/bin/bash

# VeloCollab Development Services Manager
# Usage: ./dev-services.sh [start|stop|restart|status|logs]

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
PID_DIR="$SCRIPT_DIR/.pids"
LOG_DIR="$SCRIPT_DIR/.logs"

# Service configuration
BACKEND_HOST="0.0.0.0"
BACKEND_PORT="8000"
FRONTEND_PORT="3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Create necessary directories
mkdir -p "$PID_DIR" "$LOG_DIR"

# Utility functions
log() {
    echo -e "${CYAN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if a process is running
is_running() {
    local pid_file="$1"
    if [[ -f "$pid_file" ]]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        else
            # Process not running, clean up stale PID file
            rm -f "$pid_file"
            return 1
        fi
    fi
    return 1
}

# Get process info
get_process_info() {
    local pid="$1"
    if kill -0 "$pid" 2>/dev/null; then
        ps -p "$pid" -o pid,ppid,etime,command 2>/dev/null | tail -n +2
    fi
}

# Start backend service
start_backend() {
    local pid_file="$PID_DIR/backend.pid"
    local log_file="$LOG_DIR/backend.log"

    if is_running "$pid_file"; then
        warning "Backend is already running (PID: $(cat "$pid_file"))"
        return 0
    fi

    log "Starting backend service..."

    # Check if backend directory exists
    if [[ ! -d "$BACKEND_DIR" ]]; then
        error "Backend directory not found: $BACKEND_DIR"
        return 1
    fi

    # Check if virtual environment exists
    if [[ ! -f "$BACKEND_DIR/.venv/bin/activate" ]]; then
        error "Python virtual environment not found. Run: cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
        return 1
    fi

    # Check if requirements are installed
    if ! "$BACKEND_DIR/.venv/bin/python" -c "import fastapi" 2>/dev/null; then
        error "Backend dependencies not installed. Run: cd backend && source .venv/bin/activate && pip install -r requirements.txt"
        return 1
    fi

    # Start backend
    cd "$BACKEND_DIR"
    nohup .venv/bin/uvicorn src.app.main:app \
        --reload \
        --host "$BACKEND_HOST" \
        --port "$BACKEND_PORT" \
        --log-level info \
        > "$log_file" 2>&1 &

    local pid=$!
    echo $pid > "$pid_file"

    # Wait a moment to check if the process started successfully
    sleep 2
    if is_running "$pid_file"; then
        success "Backend started successfully (PID: $pid, Port: $BACKEND_PORT)"
        info "Backend logs: tail -f $log_file"
        info "Backend API docs: http://localhost:$BACKEND_PORT/docs"
    else
        error "Backend failed to start. Check logs: $log_file"
        return 1
    fi
}

# Start frontend service
start_frontend() {
    local pid_file="$PID_DIR/frontend.pid"
    local log_file="$LOG_DIR/frontend.log"

    if is_running "$pid_file"; then
        warning "Frontend is already running (PID: $(cat "$pid_file"))"
        return 0
    fi

    log "Starting frontend service..."

    # Check if frontend directory exists
    if [[ ! -d "$FRONTEND_DIR" ]]; then
        error "Frontend directory not found: $FRONTEND_DIR"
        return 1
    fi

    # Check if node_modules exists
    if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
        error "Frontend dependencies not installed. Run: cd frontend && npm install"
        return 1
    fi

    # Start frontend
    cd "$FRONTEND_DIR"
    nohup npm start > "$log_file" 2>&1 &

    local pid=$!
    echo $pid > "$pid_file"

    # Wait a moment to check if the process started successfully
    sleep 3
    if is_running "$pid_file"; then
        success "Frontend started successfully (PID: $pid, Port: $FRONTEND_PORT)"
        info "Frontend logs: tail -f $log_file"
        info "Frontend app: http://localhost:$FRONTEND_PORT"
    else
        error "Frontend failed to start. Check logs: $log_file"
        return 1
    fi
}

# Stop a service
stop_service() {
    local service_name="$1"
    local pid_file="$PID_DIR/${service_name}.pid"

    if is_running "$pid_file"; then
        local pid=$(cat "$pid_file")
        log "Stopping $service_name (PID: $pid)..."

        # Try graceful shutdown first
        if kill -TERM "$pid" 2>/dev/null; then
            # Wait up to 10 seconds for graceful shutdown
            local count=0
            while kill -0 "$pid" 2>/dev/null && [[ $count -lt 10 ]]; do
                sleep 1
                ((count++))
            done

            # If still running, force kill
            if kill -0 "$pid" 2>/dev/null; then
                warning "Graceful shutdown failed, force killing $service_name..."
                kill -KILL "$pid" 2>/dev/null || true
            fi
        fi

        # Clean up PID file
        rm -f "$pid_file"
        success "$service_name stopped"
    else
        warning "$service_name is not running"
    fi
}

# Show service status
show_status() {
    echo -e "${PURPLE}=== VeloCollab Development Services Status ===${NC}"
    echo

    # Backend status
    local backend_pid_file="$PID_DIR/backend.pid"
    echo -n "Backend Service: "
    if is_running "$backend_pid_file"; then
        local pid=$(cat "$backend_pid_file")
        echo -e "${GREEN}RUNNING${NC} (PID: $pid)"
        echo "  Process Info: $(get_process_info "$pid")"
        echo -e "  URL: ${CYAN}http://localhost:$BACKEND_PORT${NC}"
        echo -e "  API Docs: ${CYAN}http://localhost:$BACKEND_PORT/docs${NC}"
        echo -e "  Logs: ${YELLOW}$LOG_DIR/backend.log${NC}"
    else
        echo -e "${RED}STOPPED${NC}"
    fi
    echo

    # Frontend status
    local frontend_pid_file="$PID_DIR/frontend.pid"
    echo -n "Frontend Service: "
    if is_running "$frontend_pid_file"; then
        local pid=$(cat "$frontend_pid_file")
        echo -e "${GREEN}RUNNING${NC} (PID: $pid)"
        echo "  Process Info: $(get_process_info "$pid")"
        echo -e "  URL: ${CYAN}http://localhost:$FRONTEND_PORT${NC}"
        echo -e "  Logs: ${YELLOW}$LOG_DIR/frontend.log${NC}"
    else
        echo -e "${RED}STOPPED${NC}"
    fi
    echo

    # System info
    echo "System Information:"
    echo "  Script Directory: $SCRIPT_DIR"
    echo "  PID Directory: $PID_DIR"
    echo "  Log Directory: $LOG_DIR"
    echo "  Backend Port: $BACKEND_PORT"
    echo "  Frontend Port: $FRONTEND_PORT"
}

# Show logs
show_logs() {
    local service="$1"
    local log_file=""

    case "$service" in
        "backend"|"be"|"api")
            log_file="$LOG_DIR/backend.log"
            ;;
        "frontend"|"fe"|"ui")
            log_file="$LOG_DIR/frontend.log"
            ;;
        *)
            echo "Usage: $0 logs [backend|frontend]"
            return 1
            ;;
    esac

    if [[ -f "$log_file" ]]; then
        info "Showing logs for $service (Press Ctrl+C to exit)"
        tail -f "$log_file"
    else
        error "Log file not found: $log_file"
        return 1
    fi
}

# Health check
health_check() {
    log "Performing health check..."
    echo

    # Check backend
    if command -v curl >/dev/null 2>&1; then
        echo -n "Backend API Health: "
        if curl -s -f "http://localhost:$BACKEND_PORT/health" >/dev/null; then
            success "OK"
        else
            error "FAILED"
        fi

        echo -n "Frontend Health: "
        if curl -s -f "http://localhost:$FRONTEND_PORT" >/dev/null; then
            success "OK"
        else
            error "FAILED"
        fi
    else
        warning "curl not found, skipping HTTP health checks"
    fi
    echo
}

# Clean up function
cleanup() {
    log "Cleaning up..."

    # Remove stale PID files
    for pid_file in "$PID_DIR"/*.pid; do
        if [[ -f "$pid_file" ]] && ! is_running "$pid_file"; then
            rm -f "$pid_file"
        fi
    done

    # Clean old logs (keep last 5)
    for service in backend frontend; do
        local log_file="$LOG_DIR/${service}.log"
        if [[ -f "$log_file" ]] && [[ $(wc -l < "$log_file") -gt 10000 ]]; then
            tail -n 5000 "$log_file" > "$log_file.tmp"
            mv "$log_file.tmp" "$log_file"
        fi
    done

    success "Cleanup completed"
}

# Main command handling
case "${1:-status}" in
    "start")
        log "Starting VeloCollab development services..."
        echo
        start_backend
        echo
        start_frontend
        echo
        show_status
        echo
        health_check
        ;;

    "stop")
        log "Stopping VeloCollab development services..."
        echo
        stop_service "frontend"
        stop_service "backend"
        echo
        show_status
        ;;

    "restart")
        log "Restarting VeloCollab development services..."
        echo
        stop_service "frontend"
        stop_service "backend"
        echo
        sleep 2
        start_backend
        echo
        start_frontend
        echo
        show_status
        ;;

    "status")
        show_status
        ;;

    "logs")
        show_logs "$2"
        ;;

    "health"|"check")
        health_check
        ;;

    "cleanup"|"clean")
        cleanup
        ;;

    "help"|"-h"|"--help")
        echo -e "${PURPLE}VeloCollab Development Services Manager${NC}"
        echo
        echo "Usage: $0 [command] [options]"
        echo
        echo "Commands:"
        echo "  start         Start both backend and frontend services"
        echo "  stop          Stop both backend and frontend services"
        echo "  restart       Restart both services"
        echo "  status        Show service status (default)"
        echo "  logs [service] Show logs for backend or frontend"
        echo "  health        Perform health check on running services"
        echo "  cleanup       Clean up stale PID files and old logs"
        echo "  help          Show this help message"
        echo
        echo "Examples:"
        echo "  $0                    # Show status"
        echo "  $0 start             # Start both services"
        echo "  $0 stop              # Stop both services"
        echo "  $0 logs backend      # Show backend logs"
        echo "  $0 logs frontend     # Show frontend logs"
        echo
        echo "Service URLs:"
        echo "  Backend API: http://localhost:$BACKEND_PORT"
        echo "  Frontend:    http://localhost:$FRONTEND_PORT"
        echo "  API Docs:    http://localhost:$BACKEND_PORT/docs"
        ;;

    *)
        error "Unknown command: $1"
        echo "Run '$0 help' for usage information"
        exit 1
        ;;
esac
