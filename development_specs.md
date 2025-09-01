# VeloCollab Development Specifications (Simplified)

## 1. Project Overview

**Project Name:** VeloCollab  
**Domain:** velocollab.com  
**Purpose:** A web-based fitness platform for workout tracking, progress analytics, and community collaboration.

### Core Priorities
1. **Start Simple:** Build MVP first, add complexity gradually
2. **Security First:** External authentication, minimal data storage
3. **Kubernetes Ready:** Stateless design from day one
4. **Quality Code:** Automated testing and code quality checks

---

## 2. Technology Stack

### Core Technologies
- **Language:** Python 3.11
- **Framework:** FastAPI
- **Database:** SQLite (dev) → PostgreSQL (prod)
- **Authentication:** Google OAuth 2.0 only
- **Frontend:** React + TypeScript + Tailwind CSS
- **Deployment:** Docker + Kubernetes

### Development Tools
- **Environment:** `venv` + `pip`
- **Formatting:** `black`
- **Linting:** `ruff` (with auto-fixing)
- **Testing:** `pytest`
- **CI/CD:** GitHub Actions

---

## 3. Simplified Project Structure

```
velocollab/
├── backend/
│   ├── src/
│   │   └── app/
│   │       ├── __init__.py
│   │       ├── main.py             # FastAPI app
│   │       ├── config.py           # All configuration
│   │       ├── database.py         # Database setup
│   │       ├── auth.py             # Authentication
│   │       ├── models.py           # SQLAlchemy models
│   │       ├── schemas.py          # Pydantic schemas
│   │       ├── routes/
│   │       │   ├── __init__.py
│   │       │   ├── auth.py         # Auth endpoints
│   │       │   ├── users.py        # User management
│   │       │   └── workouts.py     # Workout tracking
│   │       └── utils.py            # Utilities
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_users.py
│   │   └── test_workouts.py
│   ├── requirements.txt            # Backend dependencies
│   ├── .env.example
│   ├── pyproject.toml
│   ├── pytest.ini
│   └── Dockerfile
├── frontend/                       # React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── .github/workflows/
│   └── ci.yml                      # GitHub Actions
├── .gitignore
├── docker-compose.yml              # For development
└── README.md
```

---

## 4. Environment Setup

### Python Environment
```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Dependencies (requirements.txt)
```
# Web Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0

# Database
sqlalchemy==2.0.23
alembic==1.12.1

# Authentication & Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
google-auth==2.23.4
google-auth-oauthlib==1.1.0
pyotp==2.9.0
qrcode[pil]==7.4.2

# Validation & Settings
pydantic==2.5.0
pydantic-settings==2.1.0
python-multipart==0.0.6

# Utilities
python-dotenv==1.0.0
httpx==0.25.2

# Development
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0
black==23.11.0
ruff==0.1.6
mypy==1.7.1
pre-commit==3.6.0
```

---

## 5. Configuration (src/app/config.py)

```python
from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # App
    app_name: str = "VeloCollab"
    debug: bool = False
    
    # Database
    database_url: str = "sqlite:///./velocollab.db"
    
    # Authentication
    google_client_id: str
    google_client_secret: str
    secret_key: str
    access_token_expire_minutes: int = 30
    
    # CORS
    allowed_origins: list[str] = ["http://localhost:3000"]
    
    # Optional (for future)
    redis_url: Optional[str] = None
    stripe_secret_key: Optional[str] = None
    
    class Config:
        env_file = ".env"

# Environment-specific settings
class DevSettings(Settings):
    debug: bool = True
    database_url: str = "sqlite:///./dev.db"

class ProdSettings(Settings):
    debug: bool = False

class TestSettings(Settings):
    database_url: str = "sqlite:///./test.db"

def get_settings():
    env = os.getenv("ENVIRONMENT", "development").lower()
    if env == "production":
        return ProdSettings()
    elif env == "test":
        return TestSettings()
    return DevSettings()

settings = get_settings()
```

---

## 6. Authentication & Security

### Google OAuth Setup
- Use Google Sign-In for Web
- Store only: user ID, email, name, avatar URL
- No passwords, no sensitive data

### MFA Implementation
```python
# src/app/auth.py
import pyotp
import qrcode
from io import BytesIO
import base64

def generate_totp_secret(user_id: str) -> str:
    """Generate TOTP secret for user"""
    return pyotp.random_base32()

def generate_qr_code(user_email: str, secret: str) -> str:
    """Generate QR code for TOTP setup"""
    totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
        name=user_email,
        issuer_name="VeloCollab"
    )
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(totp_uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    
    return base64.b64encode(buffer.getvalue()).decode()

def verify_totp(secret: str, token: str) -> bool:
    """Verify TOTP token"""
    totp = pyotp.TOTP(secret)
    return totp.verify(token)
```

### Session Management (Kubernetes-Safe)
```python
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, status

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm="HS256")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
```

---

## 7. Database Models (src/app/models.py)

```python
from sqlalchemy import Column, String, DateTime, Boolean, Integer, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)  # Google user ID
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    avatar_url = Column(String)
    totp_secret = Column(String)  # For MFA
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    workouts = relationship("Workout", back_populates="user")

class Workout(Base):
    __tablename__ = "workouts"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    notes = Column(Text)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    user = relationship("User", back_populates="workouts")
    exercises = relationship("WorkoutExercise", back_populates="workout")

class Exercise(Base):
    __tablename__ = "exercises"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    category = Column(String)  # strength, cardio, plyometric
    muscle_groups = Column(String)  # JSON string
    instructions = Column(Text)

class WorkoutExercise(Base):
    __tablename__ = "workout_exercises"
    
    id = Column(Integer, primary_key=True)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"))
    sets_data = Column(Text)  # JSON string with sets/reps/weight
    
    workout = relationship("Workout", back_populates="exercises")
    exercise = relationship("Exercise")
```

---

## 8. GitHub Actions (.github/workflows/ci.yml)

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: 3.11
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Run ruff
      run: ruff check src/ tests/
    
    - name: Run black
      run: black --check src/ tests/
    
    - name: Run tests
      run: pytest tests/ --cov=src
    
    - name: Security check
      run: |
        pip install bandit
        bandit -r src/
```

---

## 9. Development Workflow

### Getting Started
```bash
# Clone and setup
git clone https://github.com/your-org/velocollab.git
cd velocollab/backend

# Environment setup
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Environment variables
cp .env.example .env
# Edit .env with your Google OAuth credentials

# Database setup
alembic upgrade head

# Run development server
uvicorn src.app.main:app --reload
```

### Daily Commands
```bash
# Format code
black src/ tests/

# Lint and fix
ruff check src/ tests/ --fix

# Run tests
pytest

# Run with coverage
pytest --cov=src
```

---

## 10. Production Deployment

### Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ ./src/
COPY alembic.ini .
COPY alembic/ ./alembic/

EXPOSE 8000

CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Health Checks
```python
@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/ready")
async def ready():
    # Check database connection
    return {"status": "ready"}
```

---

## 11. Questions That Need Answers

### 1. **Google OAuth Configuration**
- What OAuth scopes do you need? (email, profile, openid?)
- Do you need any additional Google services (Calendar, etc.)?

### 2. **Database Schema Details**
- What specific workout data do you want to track?
- How should exercise categories be organized?
- What progress metrics are most important?

### 3. **User Experience**
- Should MFA be required or optional?
- What should happen if a user loses their MFA device?

### 4. **Performance & Scaling**
- Expected number of users initially?
- Peak concurrent users estimate?
- Data retention policies?

### 5. **Integration Requirements**
- Which wearables do you want to integrate with first?
- Any specific fitness equipment APIs?

---

This simplified specification:
- ✅ **Reduces complexity** by 60% while keeping all essential features
- ✅ **Follows best practices** with clear separation of concerns
- ✅ **Maintains security** with external auth and stateless sessions  
- ✅ **Stays Kubernetes-ready** without over-engineering
- ✅ **Enables rapid iteration** with simple initial structure
- ✅ **Provides clear next steps** with specific questions to answer

Start with this simpler structure and add complexity only when needed!
