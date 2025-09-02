import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-blue-600 rounded-lg">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to VeloCollab
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to track your fitness journey and collaborate with others
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Authentication Coming Soon
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Google OAuth authentication will be implemented in Phase 4 of development.
                For now, you can explore the app as a guest user.
              </p>

              {/* Placeholder buttons */}
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google (Coming Soon)
                </button>

                <button
                  disabled
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white cursor-not-allowed"
                >
                  📧 Sign in with Email (Coming Soon)
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <a
                  href="/"
                  className="w-full flex justify-center items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  🏠 Continue as Guest
                </a>
              </div>
            </div>
          </div>

          {/* Development Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-blue-500 text-xl">ℹ️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Development Roadmap
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Phase 1: ✅ Project Foundation</li>
                    <li>Phase 2: 🔄 Basic UI Framework (Current)</li>
                    <li>Phase 3: 📋 Mock Data & API Endpoints</li>
                    <li>Phase 4: 🔐 Authentication System</li>
                    <li>Phase 5: 🗄️ Database & Data Models</li>
                    <li>Phase 6: 💪 Core Workout Features</li>
                    <li>Phase 7: 🚀 Polish & Deploy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
