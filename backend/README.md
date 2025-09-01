# VeloCollab Backend

FastAPI-based backend for the VeloCollab fitness tracking application.

## Setup

1. **Create and activate virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the development server:**
   ```bash
   uvicorn src.app.main:app --reload --host 127.0.0.1 --port 8000
   ```

4. **Run tests:**
   ```bash
   pytest tests -v
   ```

5. **Code formatting and linting:**
   ```bash
   black src tests
   ruff check src tests
   ```

6. **Pre-commit hooks (optional but recommended):**
   ```bash
   pre-commit install  # Install hooks
   pre-commit run --all-files  # Run on all files
   ```

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/status` - API status and version info

## Development

The backend is built with:
- FastAPI for the web framework
- Uvicorn as the ASGI server
- Pydantic for data validation
- pytest for testing
- Black for code formatting
- Ruff for linting

The API will be available at http://localhost:8000 with automatic API docs at http://localhost:8000/docs
