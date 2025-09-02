import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const sidebarItems = [
    {
      category: 'Main',
      items: [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/workouts', label: 'My Workouts', icon: '💪' },
        { path: '/exercises', label: 'Exercise Library', icon: '🏋️' },
      ],
    },
    {
      category: 'Progress',
      items: [
        { path: '/progress', label: 'Statistics', icon: '📈' },
        { path: '/history', label: 'Workout History', icon: '📅' },
        { path: '/goals', label: 'Goals', icon: '🎯' },
      ],
    },
    {
      category: 'Social',
      items: [
        { path: '/friends', label: 'Friends', icon: '👥' },
        { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
        { path: '/challenges', label: 'Challenges', icon: '⚡' },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-lg font-bold text-gray-800">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {sidebarItems.map((category) => (
              <div key={category.category} className="mb-8">
                <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Guest User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Not signed in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
