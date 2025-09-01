# VeloCollab Warp Configuration

This directory contains all Warp terminal configurations for the VeloCollab fitness platform project.

## 🎯 Overview

VeloCollab is optimized for **Warp terminal** with custom:
- 🔄 **Workflows** - Automated development tasks
- 🎨 **Themes** - VeloCollab brand colors
- 🚀 **Launch Configurations** - Pre-configured development environments
- 🛠️ **Scripts** - Helper utilities for common tasks

## 📁 Directory Structure

```
.warp/
├── workflows.yaml              # Warp workflow definitions
├── themes/
│   └── velocollab.yaml        # Custom VeloCollab theme
├── launch_configurations.yaml  # Warp launch configs
├── scripts/
│   ├── project-info.sh        # Project status dashboard
│   ├── setup-dev.sh          # Development environment setup
│   ├── start-full-stack.sh   # Parallel server startup
│   ├── test-all.sh           # Comprehensive test suite
│   └── clean-all.sh          # Cleanup build artifacts
└── README.md                  # This file
```

## ⚡ Quick Start

### 1. Install Theme
```bash
# Copy theme to Warp themes directory
mkdir -p ~/.warp/themes
cp .warp/themes/velocollab.yaml ~/.warp/themes/
```

### 2. Use Workflows
```bash
# Start full development environment
warp workflow start-full-stack

# Or start individual components
warp workflow start-backend
warp workflow start-frontend
```

### 3. Launch Pre-configured Environment
```bash
# Full-stack development setup
warp launch velocollab-fullstack
```

## 🔄 Available Workflows

### Development
| Workflow | Description |
|----------|-------------|
| `setup-dev-environment` | Complete development environment setup |
| `start-backend` | Launch FastAPI development server |
| `start-frontend` | Launch React development server |
| `start-full-stack` | Launch both servers in parallel |
| `backend-shell` | Open backend shell with venv activated |

### Testing & Quality
| Workflow | Description |
|----------|-------------|
| `test-all` | Run comprehensive test suite |
| `test-backend` | Run backend tests with pytest |
| `test-frontend` | Run frontend tests with Jest |
| `lint-backend` | Format with black & lint with ruff |
| `dev-test-suite` | Enhanced version of existing dev-test.sh |

### Utilities
| Workflow | Description |
|----------|-------------|
| `project-info` | Display project status dashboard |
| `clean-all` | Clean all build artifacts and caches |
| `git-status-all` | Check git status across all components |

## 🚀 Launch Configurations

### `velocollab-fullstack`
Complete development environment with 5 tabs:
- **📋 Overview** - Project status and info
- **🚀 Backend** - FastAPI server
- **⚡ Frontend** - React dev server
- **🧪 Testing** - Test environment
- **📊 Monitoring** - Health checks and logs

### `velocollab-backend`
Backend-focused development with 4 tabs:
- **🚀 Server** - FastAPI with auto-reload
- **🧪 Tests** - pytest environment
- **🔍 Lint** - Code formatting and linting
- **📊 DB** - Database management

### `velocollab-frontend`
Frontend-focused development with 4 tabs:
- **⚡ Dev Server** - React with hot reload
- **🧪 Tests** - Jest test runner
- **🏗️ Build** - Production builds
- **📦 Packages** - Dependency management

### `velocollab-testing`
Testing and QA environment with 4 tabs:
- **🧪 Full Test Suite** - Complete test runner
- **🐍 Backend Tests** - Python/pytest
- **⚡ Frontend Tests** - React/Jest
- **🔍 Code Quality** - Linting and formatting

## 🎨 VeloCollab Theme

The custom theme uses VeloCollab brand colors:

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Orange** | #FF6B35 | Keywords, highlights, cursor |
| **Deep Blue** | #004E89 | Functions, types |
| **Growth Green** | #1A936F | Strings, success states |
| **Dark Navy** | #0A0E1A | Background |
| **Light Blue** | #E8F4F8 | Text |

### Theme Features
- ✅ Optimized for Python, JavaScript, TypeScript
- ✅ Enhanced Git status colors
- ✅ Fitness/health domain keyword highlighting
- ✅ High contrast for accessibility
- ✅ Brand-consistent terminal experience

## 🛠️ Custom Scripts

### `project-info.sh`
Comprehensive project status dashboard showing:
- 📊 Repository status
- 🐍 Backend health (FastAPI, venv, dependencies)
- ⚡ Frontend status (Node.js, build status)
- 🛠️ Development tools availability
- 🚀 Quick start commands

### `setup-dev.sh`
Automated development environment setup:
- ✅ Prerequisites checking
- 🐍 Python virtual environment creation
- 📦 Dependency installation (backend + frontend)
- 🔧 Environment file configuration
- 🧪 Installation verification

### `start-full-stack.sh`
Parallel server startup with:
- 🔍 Port availability checking
- 🐍 Backend server startup (port 8000)
- ⚡ Frontend server startup (port 3000)
- 📊 Health monitoring
- 🛑 Graceful shutdown handling

### `test-all.sh`
Comprehensive test suite with:
- 🧪 Backend tests (pytest)
- ⚡ Frontend tests (Jest)
- 🔍 Code quality checks (black, ruff, TypeScript)
- 🔗 Integration tests (if servers running)
- 🔒 Security checks
- 📊 Detailed test reporting

### `clean-all.sh`
Smart cleanup utility:
- 🧹 Python cache files (__pycache__, .pyc)
- 🗂️ Build artifacts (build/, dist/)
- 📊 Test coverage reports
- 🐳 Optional Docker cleanup
- 💾 Size reporting for cleaned items

## 🎯 Benefits

### ⚡ Speed
- **10x faster startup** - Launch full environment in seconds
- **Instant workflows** - No more memorizing complex commands
- **Parallel operations** - Start multiple services simultaneously

### 🎨 Consistency
- **Brand-aligned theme** - VeloCollab colors throughout terminal
- **Unified experience** - Same look across all development tasks
- **Professional appearance** - Polished, fitness-focused aesthetics

### 🔄 Automation
- **One-command setup** - From zero to development in minutes
- **Automated testing** - Comprehensive test suite execution
- **Smart cleanup** - Intelligent artifact removal
- **Status monitoring** - Real-time project health dashboard

## 🚀 Getting Started

1. **First time setup:**
   ```bash
   warp workflow setup-dev-environment
   ```

2. **Daily development:**
   ```bash
   warp launch velocollab-fullstack
   ```

3. **Quick backend work:**
   ```bash
   warp workflow start-backend
   ```

4. **Project status check:**
   ```bash
   .warp/scripts/project-info.sh
   ```

## 💡 Pro Tips

1. **Use launch configs for context switching** - Different configs for different work types
2. **Leverage workflows for repetitive tasks** - Avoid manual command typing
3. **Apply the custom theme** - Enhanced readability for fitness domain code
4. **Use project-info script regularly** - Stay aware of project health
5. **Clean up regularly** - Use clean-all script to maintain performance

---

**Happy coding with Warp! Building the future of fitness tracking! 💪**
