import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUI } from '../../contexts/AppContext';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useUI();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex h-screen pt-16"> {/* pt-16 to account for fixed header */}
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
          {/* Sidebar Toggle Button for Mobile */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </button>
          </div>

          {/* Page Content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
