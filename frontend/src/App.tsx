import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">VeloCollab MVP</h1>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Connecting to API...</p>
          </div>
        )}

        {error && (
          <div className="text-red-600 bg-red-100 p-4 rounded border border-red-300">
            <h3 className="font-bold mb-2">❌ Connection Error</h3>
            <p>{error}</p>
            <p className="text-sm mt-2 text-gray-600">
              Make sure the backend is running on http://localhost:8000
            </p>
          </div>
        )}

        {apiStatus && (
          <div className="text-green-600 bg-green-100 p-4 rounded border border-green-300">
            <h3 className="font-bold mb-2">✅ API Connected</h3>
            <p><strong>Service:</strong> {apiStatus.api}</p>
            <p><strong>Version:</strong> {apiStatus.version}</p>
            <p><strong>Environment:</strong> {apiStatus.environment}</p>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Phase 1: Project Foundation Complete</p>
          <p>Ready for Phase 2 development!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
