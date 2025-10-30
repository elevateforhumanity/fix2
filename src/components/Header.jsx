import React from 'react';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="flex items-center gap-4">
          <Link to="/" className="header-logo">
            <h1>Elevate for Humanity</h1>
          </Link>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-semibold shadow-lg">
            <Award className="h-4 w-4" />
            <span>Buy Black Certified</span>
          </div>
        </div>
        <nav role="navigation" className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
