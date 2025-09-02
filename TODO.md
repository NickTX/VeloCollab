# VeloCollab MVP Development Plan

## Overview
This plan focuses on building a minimal viable product (MVP) prototype quickly, with decisions about authentication and database schema deferred to their respective implementation phases.

---

## 🎯 MVP Goals
1. **Basic FastAPI backend** with health checks
2. **Simple React frontend** that connects to the API
3. **Basic project structure** following our simplified spec
4. **Development environment** ready for rapid iteration
5. **CI/CD pipeline** for code quality and testing

---

## 📋 Development Phases

### **Phase 1: Project Foundation (Day 1-2)**
**Goal:** Get the basic project structure and development environment working

**Tasks:**
- [x] Create project structure following simplified spec
- [x] Set up Python virtual environment
- [x] Create basic FastAPI application with health endpoints
- [x] Set up basic React frontend
- [x] Configure development tools (black, ruff, pytest)
- [x] Create GitHub repository and CI/CD pipeline

**Deliverables:**
- Working FastAPI server on `localhost:8000`
- React app on `localhost:3000` that can call the API
- GitHub Actions running tests on every push
- Development environment ready

### **Phase 2: Basic UI Framework (Day 2-3)** ✅
**Goal:** Create the basic UI layout and routing

**Tasks:**
- [x] Set up React Router for navigation
- [x] Create basic layout components (Header, Sidebar, Main)
- [x] Design basic pages (Home, Login placeholder, Workouts placeholder)
- [x] Implement responsive design with Tailwind CSS
- [x] Add basic state management (React Context)

**Deliverables:**
- ✅ Navigable React application
- ✅ Responsive design that works on mobile/desktop
- ✅ Basic page structure for future features

**Completed Features:**
- React Router v7 with full routing structure
- Responsive Header with mobile navigation
- Collapsible Sidebar with categorized navigation
- Dashboard with API status and quick actions
- Workouts page with templates and mock data
- Exercises library with search and filtering
- Login placeholder for Phase 4
- Global state management with React Context
- Mobile-first responsive design

### **Phase 3: Mock Data & API Endpoints (Day 3-4)** ✅
**Goal:** Create mock data and API endpoints for testing

**Tasks:**
- [x] Create mock user data
- [x] Create mock workout/exercise data
- [x] Build basic API endpoints for:
  - GET /api/users/me (mock current user)
  - GET /api/workouts (list workouts)
  - GET /api/exercises (list exercises)
  - POST /api/workouts (create workouts)
  - GET /api/workouts/{id} (workout details)
- [x] Enhanced FastAPI app with comprehensive error handling
- [x] Development services manager script for easy development

**Deliverables:**
- ✅ Working API with realistic mock data
- ✅ 5 fully functional REST API endpoints
- ✅ Comprehensive Pydantic schemas for type safety
- ✅ Professional development services management script
- ✅ Complete documentation and troubleshooting guide

**Completed Features:**
- 17 exercises across strength, cardio, plyometric, and speed categories
- 5 realistic workout examples with detailed progressions
- User profiles with workout statistics and streaks
- Workout templates for quick starts
- Performance tracking: 1RM, sprint times, jump distances
- Professional dev-services.sh script with PID tracking, health checks, and logging
- Enhanced error handling and Kubernetes-ready endpoints

### **Phase 4: Authentication System (Day 5-7)**
**Goal:** Implement Google OAuth authentication

**Decision Point:** Configure Google OAuth settings, scopes, and user data storage

**Tasks:**
- [ ] Set up Google OAuth 2.0 credentials
- [ ] Implement Google Sign-In on frontend
- [ ] Create JWT token system for API authentication
- [ ] Add protected routes and authentication middleware
- [ ] Implement logout functionality

**Deliverables:**
- Working Google OAuth login/logout
- Protected API endpoints
- User session management

### **Phase 5: Database & Data Models (Day 8-10)**
**Goal:** Replace mock data with real database

**Decision Point:** Finalize database schema for users, workouts, and exercises

**Tasks:**
- [ ] Set up SQLAlchemy models
- [ ] Create database migrations with Alembic
- [ ] Implement CRUD operations for core entities
- [ ] Replace mock data with database queries
- [ ] Add data validation with Pydantic schemas

**Deliverables:**
- Working SQLite database (development)
- Real data persistence
- Database migrations system

### **Phase 6: Core Workout Features (Day 11-14)**
**Goal:** Implement basic workout tracking functionality

**Tasks:**
- [ ] Create workout creation/editing interface
- [ ] Implement exercise selection and set tracking
- [ ] Add basic timer functionality for rest periods
- [ ] Create workout history view
- [ ] Add basic progress statistics

**Deliverables:**
- Users can create and log workouts
- Basic workout tracking functionality
- Simple progress visualization

### **Phase 7: Polish & Deploy (Day 15-17)**
**Goal:** Prepare for deployment and user testing

**Tasks:**
- [ ] Add comprehensive error handling
- [ ] Implement basic loading and success states
- [ ] Create Docker configuration
- [ ] Set up production environment variables
- [ ] Deploy to staging environment
- [ ] Write basic documentation

**Deliverables:**
- Production-ready MVP
- Deployed staging environment
- Basic user documentation

---

## 🛠️ Phase 1: Project Foundation

Let's start with Phase 1 immediately. Here's what we'll create:

### 1.1 Project Structure
```
velocollab/
├── backend/
│   ├── src/
│   │   └── app/
│   │       ├── __init__.py
│   │       ├── main.py
│   │       └── config.py
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── docker-compose.yml
└── README.md
```

### 1.2 Essential Files to Create

**Backend Dependencies (backend/requirements.txt):**
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
pydantic==2.5.0
pytest==7.4.3
black==23.11.0
ruff==0.1.6
```

**Basic FastAPI App (backend/src/app/main.py):**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="VeloCollab API", version="1.0.0")

# CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "VeloCollab API is running!"}

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "1.0.0"}

@app.get("/api/status")
async def api_status():
    return {
        "api": "VeloCollab",
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development")
    }
```

**Basic Configuration (backend/src/app/config.py):**
```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    app_name: str = "VeloCollab"
    debug: bool = True
    allowed_origins: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

settings = Settings()
```

### 1.3 Frontend Setup

**React App with TypeScript and Tailwind:**
```bash
npx create-react-app frontend --template typescript
cd frontend
npm install -D tailwindcss postcss autoprefixer
npm install axios
npx tailwindcss init -p
```

**Basic API Test Component (frontend/src/App.tsx):**
```typescript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiStatus {
  api: string;
  version: string;
  environment: string;
}

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/status');
        setApiStatus(response.data);
      } catch (err) {
        setError('Failed to connect to API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">VeloCollab MVP</h1>

        {loading && <p className="text-gray-600">Connecting to API...</p>}

        {error && (
          <div className="text-red-600 bg-red-100 p-4 rounded">
            {error}
          </div>
        )}

        {apiStatus && (
          <div className="text-green-600 bg-green-100 p-4 rounded">
            <p>✅ Connected to {apiStatus.api}</p>
            <p>Version: {apiStatus.version}</p>
            <p>Environment: {apiStatus.environment}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

---

## 🚀 Ready to Start?

**Phase 1 Checklist:**
1. Create the project structure above
2. Set up Python virtual environment in `backend/`
3. Install dependencies and test FastAPI server
4. Set up React frontend and test API connection
5. Configure GitHub repository and CI/CD

**Commands to get started:**
```bash
# 1. Create project structure
mkdir -p velocollab/{backend/src/app,backend/tests,frontend,.github/workflows}

# 2. Backend setup
cd velocollab/backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 3. Start backend server
uvicorn src.app.main:app --reload --host 0.0.0.0 --port 8000

# 4. Frontend setup (in new terminal)
cd ../frontend
npx create-react-app . --template typescript
npm start

# 5. Test connection at http://localhost:3000
```

This approach lets us:
- ✅ **Start coding immediately** without waiting for complex decisions
- ✅ **Validate the tech stack** works together
- ✅ **Build momentum** with visible progress
- ✅ **Defer complex decisions** until we need them
- ✅ **Maintain flexibility** for future architectural choices

Ready to create the initial project structure and start Phase 1?
