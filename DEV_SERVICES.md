# Development Services Manager

A comprehensive script to manage VeloCollab backend and frontend services during development.

## 🚀 Quick Start

```bash
# Start both services
./dev-services.sh start

# Check status
./dev-services.sh status

# Stop both services
./dev-services.sh stop
```

## 📋 Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `start` | Start both backend and frontend services | `./dev-services.sh start` |
| `stop` | Stop both backend and frontend services | `./dev-services.sh stop` |
| `restart` | Restart both services (stop + start) | `./dev-services.sh restart` |
| `status` | Show service status (default command) | `./dev-services.sh` |
| `logs [service]` | Show real-time logs for a service | `./dev-services.sh logs backend` |
| `health` | Perform HTTP health checks | `./dev-services.sh health` |
| `cleanup` | Clean up stale PID files and old logs | `./dev-services.sh cleanup` |
| `help` | Show help message | `./dev-services.sh help` |

## 🛠️ Service Information

### Backend Service
- **Port**: 8000
- **URL**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Technology**: FastAPI with Python 3.11
- **Auto-reload**: Enabled for development

### Frontend Service
- **Port**: 3000
- **URL**: http://localhost:3000
- **Technology**: React with TypeScript
- **Hot Reload**: Enabled for development

## 📁 File Structure

The script creates and manages the following directories:

```
VeloCollab/
├── .pids/                 # Process ID files
│   ├── backend.pid
│   └── frontend.pid
├── .logs/                 # Service log files
│   ├── backend.log
│   └── frontend.log
├── dev-services.sh        # Main script
└── DEV_SERVICES.md       # This documentation
```

## 🔧 Features

### Process Management
- **Safe Startup**: Checks for existing processes and dependencies
- **Graceful Shutdown**: Attempts graceful termination before force-killing
- **Process Tracking**: Stores and tracks PIDs for reliable service management
- **Dependency Validation**: Verifies virtual environments and node_modules

### Logging & Monitoring
- **Centralized Logs**: All service logs in `.logs/` directory
- **Real-time Monitoring**: Live log streaming with `logs` command
- **Health Checks**: HTTP endpoint validation
- **Process Information**: Shows PID, runtime, and command details

### Safety & Cleanup
- **Stale PID Detection**: Automatically removes invalid PID files
- **Log Rotation**: Keeps log files manageable (max 10,000 lines)
- **Error Handling**: Comprehensive error messages and validation
- **Color-coded Output**: Visual status indicators

## 🚨 Prerequisites

### Backend Requirements
- Python 3.11+ installed
- Virtual environment created: `cd backend && python -m venv .venv`
- Dependencies installed: `source .venv/bin/activate && pip install -r requirements.txt`

### Frontend Requirements
- Node.js 18+ installed
- Dependencies installed: `cd frontend && npm install`

### System Requirements
- macOS or Linux
- `curl` command (for health checks)
- Bash shell

## 💡 Usage Examples

### Development Workflow
```bash
# Start your development session
./dev-services.sh start

# Work on your code...
# Both services auto-reload on file changes

# Check if everything is running
./dev-services.sh status

# View backend logs in real-time
./dev-services.sh logs backend

# View frontend logs in real-time
./dev-services.sh logs frontend

# Restart services after major changes
./dev-services.sh restart

# End your development session
./dev-services.sh stop
```

### Troubleshooting
```bash
# Check service health
./dev-services.sh health

# Clean up if things get stuck
./dev-services.sh cleanup
./dev-services.sh stop
./dev-services.sh start

# View logs to diagnose issues
./dev-services.sh logs backend
./dev-services.sh logs frontend
```

### CI/CD Integration
```bash
# In your CI scripts
./dev-services.sh start
./dev-services.sh health
# Run tests...
./dev-services.sh stop
```

## 🛡️ Safety Features

1. **Process Validation**: Ensures processes are actually running before attempting to stop them
2. **Graceful Shutdown**: 10-second timeout for graceful termination before force-kill
3. **Dependency Checks**: Validates virtual environments and node modules before starting
4. **Port Availability**: Implicitly checked by service startup (will fail if ports are in use)
5. **Cleanup on Exit**: Removes stale PID files automatically

## 🔍 Troubleshooting

### Common Issues

**"Backend failed to start"**
- Check that you're in the correct directory
- Verify virtual environment: `backend/.venv/bin/activate`
- Install dependencies: `cd backend && pip install -r requirements.txt`
- View logs: `./dev-services.sh logs backend`

**"Frontend failed to start"**
- Check that you're in the correct directory
- Install dependencies: `cd frontend && npm install`
- Clear cache: `cd frontend && rm -rf node_modules && npm install`
- View logs: `./dev-services.sh logs frontend`

**"Process already running"**
- Check status: `./dev-services.sh status`
- Stop existing processes: `./dev-services.sh stop`
- Clean up: `./dev-services.sh cleanup`

**Services won't stop properly**
- Force cleanup: `./dev-services.sh cleanup`
- Manual cleanup: `rm -rf .pids/*.pid`
- Kill processes manually: `pkill -f "uvicorn\|npm start"`

## 🚀 Advanced Usage

### Custom Port Configuration
Edit the script to change default ports:
```bash
BACKEND_PORT="8000"    # Change backend port
FRONTEND_PORT="3000"   # Change frontend port
```

### Log Management
- Logs are automatically rotated when they exceed 10,000 lines
- Manual cleanup: `./dev-services.sh cleanup`
- View log location: Check status output

### Integration with IDEs
Most IDEs can run this script as a build/run configuration:
- **Command**: `./dev-services.sh`
- **Arguments**: `start` (or other commands)
- **Working Directory**: Project root

---

## 📞 Need Help?

If you encounter issues:

1. Check the help: `./dev-services.sh help`
2. View service status: `./dev-services.sh status`
3. Check logs: `./dev-services.sh logs [backend|frontend]`
4. Try cleanup: `./dev-services.sh cleanup`
5. Review this documentation

Happy coding! 🎉
