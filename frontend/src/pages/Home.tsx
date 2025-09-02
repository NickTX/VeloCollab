import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiStatus {
  api: string;
  version: string;
  environment: string;
}

const Home: React.FC = () => {
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

  const stats = [
    { name: 'Total Workouts', value: '0', icon: '💪', color: 'bg-blue-500' },
    { name: 'Exercises Completed', value: '0', icon: '🏋️', color: 'bg-green-500' },
    { name: 'Hours Trained', value: '0', icon: '⏱️', color: 'bg-purple-500' },
    { name: 'Calories Burned', value: '0', icon: '🔥', color: 'bg-red-500' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Welcome to VeloCollab!', time: 'Just now', icon: '🎉' },
    { id: 2, activity: 'Account created successfully', time: '1 minute ago', icon: '✅' },
    { id: 3, activity: 'Ready to start your fitness journey', time: '2 minutes ago', icon: '🚀' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">👋</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to VeloCollab!</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Your fitness collaboration platform is ready. Start tracking your workouts and connect with others!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Status</h3>

          {loading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-sm text-gray-600">Checking API connection...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-500 text-xl">❌</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                    <p className="mt-1">Make sure the backend is running on http://localhost:8000</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {apiStatus && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-green-500 text-xl">✅</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">API Connected</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p><strong>Service:</strong> {apiStatus.api}</p>
                    <p><strong>Version:</strong> {apiStatus.version}</p>
                    <p><strong>Environment:</strong> {apiStatus.environment}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                    <span className="text-white text-lg">{stat.icon}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-100">
                          <span className="text-lg">{activity.icon}</span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{activity.activity}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{activity.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                  <span className="text-2xl">💪</span>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Start Workout</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Begin a new workout session
                </p>
              </div>
            </button>

            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-600 group-hover:bg-green-100">
                  <span className="text-2xl">🏋️</span>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Browse Exercises</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Explore the exercise library
                </p>
              </div>
            </button>

            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-600 group-hover:bg-purple-100">
                  <span className="text-2xl">📊</span>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">View Progress</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Check your fitness stats
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
