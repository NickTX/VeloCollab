#!/bin/bash

echo "🚀 VeloCollab Phase 1 Development Test"
echo "======================================"

# Test backend
echo ""
echo "📋 Testing Backend..."
cd backend
source .venv/bin/activate

echo "✅ Running backend tests..."
if pytest tests -v --tb=short; then
    echo "✅ Backend tests passed!"
else
    echo "❌ Backend tests failed!"
    exit 1
fi

echo ""
echo "✅ Testing backend startup..."
echo "Starting FastAPI server (this will run for 5 seconds)..."
timeout 5s uvicorn src.app.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!
sleep 2

if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend API is responding!"
else
    echo "❌ Backend API not responding!"
fi

# Cleanup backend
kill $BACKEND_PID 2>/dev/null
cd ..

# Test frontend
echo ""
echo "📋 Testing Frontend..."
cd frontend

echo "✅ Installing frontend dependencies..."
npm ci --silent

echo "✅ Testing frontend build..."
if npm run build --silent; then
    echo "✅ Frontend builds successfully!"
    rm -rf build
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo ""
echo "🎉 Phase 1 Complete!"
echo "==================="
echo ""
echo "To run the development environment:"
echo ""
echo "Backend:"
echo "  cd backend"
echo "  source .venv/bin/activate"
echo "  uvicorn src.app.main:app --reload --host 127.0.0.1 --port 8000"
echo ""
echo "Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then visit http://localhost:3000 to see the API connectivity test!"
