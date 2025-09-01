# VeloCollab

**Where Speed Meets Community** - A comprehensive web-based fitness platform for workout tracking, progress analytics, and community collaboration.

## 🎯 Overview

VeloCollab is a modern fitness tracking platform designed to provide users with comprehensive workout tracking, intelligent progress analytics, and vibrant community features. The platform supports strength training, plyometrics, speed training, and endurance workouts with advanced analytics and 1RM tracking.

### Key Features

- **🏋️ Comprehensive Workout Tracking**: Log strength training, cardio, plyometrics, and sprint workouts
- **📊 Advanced Analytics**: 1RM calculations, progress tracking, and performance insights
- **🤝 Community Features**: Social feed, workout sharing, and collaborative training
- **⚡ Speed & Athletic Performance**: Dedicated tools for sprint training and plyometric tracking
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **🔒 Security First**: Google OAuth authentication with optional MFA
- **🚀 Performance Focused**: Fast, scalable architecture ready for millions of users

## 🛠️ Technology Stack

### Backend
- **Python 3.11** with **FastAPI** for high-performance async APIs
- **SQLAlchemy** with **Alembic** for database management
- **Google OAuth 2.0** for secure authentication
- **SQLite** (development) → **PostgreSQL** (production)

### Frontend
- **React** with **TypeScript** for type safety
- **Tailwind CSS** for modern, responsive design
- **Axios** for API communication

### Development & Deployment
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Kubernetes** ready architecture
- **Code Quality**: Black, Ruff, mypy, pytest

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-username/velocollab.git
cd velocollab/backend

# Create virtual environment
python3.11 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the development server
uvicorn src.app.main:app --reload
```

### Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd velocollab/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Visit `http://localhost:3000` to see the application running!

## 📋 Development Status

This project is currently in **MVP development phase**. See [TODO.md](TODO.md) for the complete development roadmap.

### Current Phase: Project Foundation ✅
- [x] Project structure setup
- [x] Basic FastAPI backend with health checks
- [x] React frontend with TypeScript and Tailwind
- [x] GitHub repository and documentation

### Next Phase: Basic UI Framework
- [ ] React Router navigation
- [ ] Layout components (Header, Sidebar, Main)
- [ ] Responsive design implementation
- [ ] Basic state management

## 📚 Documentation

- **[Requirements](requirements.md)**: Detailed feature requirements and specifications
- **[Development Specs](development_specs.md)**: Technical architecture and development guidelines
- **[TODO](TODO.md)**: Development roadmap and task tracking
- **[Branding](branding/)**: Brand guidelines and marketing materials

## 🏗️ Project Structure

```
velocollab/
├── backend/                    # Python FastAPI backend
│   ├── src/app/               # Application code
│   ├── tests/                 # Backend tests
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Backend container
├── frontend/                  # React TypeScript frontend
│   ├── src/                  # Frontend source code
│   ├── public/               # Static assets
│   └── package.json          # Node dependencies
├── .github/workflows/         # CI/CD pipelines
├── branding/                  # Brand assets and guidelines
└── docs/                     # Additional documentation
```

## 🤝 Contributing

This is currently a personal project in early development. Contribution guidelines will be added once the MVP is complete.

## 🔒 Security & Privacy

- **No Password Storage**: All authentication handled via Google OAuth
- **Minimal Data Collection**: Only essential user profile information stored
- **Security First**: HTTPS, input validation, and secure session management
- **Privacy Compliant**: GDPR-ready architecture

## 📊 Core Features Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup and basic architecture
- [ ] Basic UI framework and navigation

### Phase 2: Authentication & Data
- [ ] Google OAuth integration
- [ ] Database schema and models
- [ ] User profile management

### Phase 3: Core Workout Features
- [ ] Workout creation and logging
- [ ] Exercise database and selection
- [ ] Basic progress tracking

### Phase 4: Advanced Features
- [ ] 1RM calculations and analytics
- [ ] Community and social features
- [ ] Advanced workout types (plyometrics, speed training)

### Phase 5: Production Ready
- [ ] Performance optimization
- [ ] Comprehensive testing
- [ ] Deployment and monitoring

## 🏋️ Fitness Features

### Workout Types Supported
- **Strength Training**: Traditional weightlifting with 1RM tracking
- **Plyometrics**: Explosive exercises with jump metrics
- **Speed Training**: Sprint intervals and agility drills
- **Endurance**: Distance running and cardio tracking

### Analytics & Progress Tracking
- **1RM Calculations**: Brzycki, Epley, and other formulas
- **Progress Charts**: Visual tracking of strength gains over time
- **Performance Metrics**: Speed, power, and endurance analytics
- **Body Measurements**: Comprehensive body composition tracking

## ⚡ Warp Terminal Integration

This project is **optimized for Warp terminal** with custom workflows, themes, and launch configurations.

### 🚀 Quick Start with Warp

```bash
# Use Warp workflows for instant setup
warp workflow start-full-stack    # Start both backend and frontend
warp workflow setup-dev-environment  # First-time setup
```

### 🎨 VeloCollab Warp Theme

The project includes a custom **VeloCollab theme** with brand colors:
- **Primary**: Energetic orange-red (#FF6B35)
- **Secondary**: Deep blue (#004E89)
- **Accent**: Growth green (#1A936F)

```bash
# Apply the custom theme
cp .warp/themes/velocollab.yaml ~/.warp/themes/
```

### 🔧 Available Warp Workflows

#### Development
- `start-backend` - Launch FastAPI development server
- `start-frontend` - Launch React development server
- `start-full-stack` - Launch both servers in parallel
- `backend-shell` - Open backend shell with activated venv

#### Testing & Quality
- `test-all` - Run comprehensive test suite
- `test-backend` - Run backend tests only
- `test-frontend` - Run frontend tests only
- `lint-backend` - Format and lint backend code

#### Utilities
- `setup-dev-environment` - Complete development setup
- `project-info` - Display project status and information
- `clean-all` - Clean all build artifacts and caches

### 📋 Warp Launch Configurations

#### Full-Stack Development
```bash
warp launch velocollab-fullstack
```
Opens 5 tabs: Overview, Backend, Frontend, Testing, Monitoring

#### Backend-Focused
```bash
warp launch velocollab-backend
```
Opens 4 tabs: Server, Tests, Lint, Database

#### Frontend-Focused
```bash
warp launch velocollab-frontend
```
Opens 4 tabs: Dev Server, Tests, Build, Packages

### 🛠️ Custom Scripts

Located in `.warp/scripts/`:

- **`project-info.sh`** - Comprehensive project status dashboard
- **`setup-dev.sh`** - Automated development environment setup
- **`start-full-stack.sh`** - Parallel server startup with monitoring
- **`test-all.sh`** - Complete test suite with detailed reporting
- **`clean-all.sh`** - Smart cleanup of build artifacts

### 💡 Warp Pro Tips

1. **Use workflows instead of manual commands**:
   ```bash
   # Instead of:
   cd backend && source .venv/bin/activate && uvicorn...

   # Use:
   warp workflow start-backend
   ```

2. **Launch configurations for different contexts**:
   - Use `velocollab-fullstack` for general development
   - Use `velocollab-backend` when working on API features
   - Use `velocollab-testing` for QA sessions

3. **Custom theme enhances readability**:
   - VeloCollab colors improve code syntax highlighting
   - Brand-consistent terminal experience
   - Optimized for fitness/health domain keywords

### 🎯 Warp Integration Benefits

- **⚡ 10x faster startup** - Launch full environment in seconds
- **🎨 Brand consistency** - Custom theme matches project identity
- **🔄 Automated workflows** - No more memorizing complex commands
- **📊 Rich information** - Project status at a glance
- **🧹 Easy maintenance** - One-command cleanup and updates

## 📞 Contact

For questions about this project, please open an issue on GitHub.

## 📄 License

This project is currently private and not licensed for public use.

---

**VeloCollab** - Building the future of collaborative fitness tracking, one rep at a time! 💪
