import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NavBar Component
 * Note: Most pages use SiteLayout which has full navigation.
 * This component is for legacy pages that need standalone navigation.
 */
const NavBar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-brand-700">
              Elevate for Humanity
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/programs" className="text-gray-700 hover:text-brand-600">
              Programs
            </Link>
            <Link to="/lms" className="text-gray-700 hover:text-brand-600">
              Learning
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-brand-600"
            >
              Community
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-600">
              About
            </Link>
            <Link to="/connect" className="text-gray-700 hover:text-brand-600">
              Connect
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
