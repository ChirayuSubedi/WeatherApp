import React from 'react';
import { Cloud } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">WeatherView</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/maps"
              className={`px-3 py-2 rounded-md ${
                isActive('/maps') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Maps
            </Link>
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md ${
                isActive('/settings') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}