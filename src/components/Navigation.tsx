/**
 * Navigation Component
 * Matches elevateforhumanity.org navigation exactly
 * Extracted from: https://www.elevateforhumanity.org
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavigation, branding, type NavLink } from '../config/navigation';

interface NavigationProps {
  logo?: string;
  logoAlt?: string;
  links?: NavLink[];
  className?: string;
}

export default function Navigation({
  logo = '/logo.svg',
  logoAlt = branding.name,
  links = mainNavigation,
  className = '',
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(to);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt={logoAlt}
              className="h-8 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <span class="text-xl font-bold text-[var(--color-brown)]">${logoAlt}</span>
                `;
              }}
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-[var(--color-green-600)]'
                    : 'text-gray-700 hover:text-[var(--color-green-600)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[var(--color-green-600)] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-green-500)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="container py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-[var(--color-green-50)] text-[var(--color-green-700)]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
