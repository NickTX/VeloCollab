import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Exercises from './pages/Exercises';
import Login from './pages/Login';
import './App.css';

// Placeholder components for routes that don't exist yet
const Progress = () => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">📊</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracking</h2>
    <p className="text-gray-600">This feature will be implemented in Phase 6.</p>
  </div>
);

const History = () => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">📅</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Workout History</h2>
    <p className="text-gray-600">This feature will be implemented in Phase 6.</p>
  </div>
);

const Goals = () => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">🎯</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Goals & Targets</h2>
    <p className="text-gray-600">This feature will be implemented in Phase 6.</p>
  </div>
);

const Friends = () => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">👥</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Friends & Social</h2>
    <p className="text-gray-600">This feature will be implemented in Phase 6.</p>
  </div>
);

const Leaderboard = () => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">🏆</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard</h2>
    <p className="text-gray-600">This feature will be implemented in Phase 6.</p>
  </div>
);

const Challenges = () => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">⚡</div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Challenges</h2>
    <p className="text-gray-600">This feature will be implemented in Phase 6.</p>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Login route (standalone) */}
            <Route path="/login" element={<Login />} />

            {/* Main app routes (with layout) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="exercises" element={<Exercises />} />
              <Route path="progress" element={<Progress />} />
              <Route path="history" element={<History />} />
              <Route path="goals" element={<Goals />} />
              <Route path="friends" element={<Friends />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="challenges" element={<Challenges />} />
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤔</div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                  <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                  <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    🏠 Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
