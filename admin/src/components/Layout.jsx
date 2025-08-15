// src/components/Layout.jsx
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 text-lg">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* Mobile Header */}
      <header className="md:hidden bg-gray-800 text-white p-5 flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Rental Admin</h1>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xl">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-20`}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Rental Admin</h1>
          <p className="text-lg text-gray-400 truncate">Welcome, {user?.email}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="flex items-center px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg"
              >
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="flex items-center px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg"
              >
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Properties
              </Link>
            </li>
            <li>
              <Link
                to="/filters"
                className="flex items-center px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg"
              >
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg"
              >
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="md:ml-72 transition-all duration-300 ease-in-out">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-5 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
            <div className="flex items-center space-x-6">
              <span className="text-lg text-gray-600 truncate max-w-xs">{user?.email}</span>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xl">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}