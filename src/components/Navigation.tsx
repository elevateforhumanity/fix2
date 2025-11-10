/**
 * Navigation Component
 * Professional LMS-style navigation with student portal access and role-based links
 * Copyright (c) 2025 Elevate for Humanity
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { mainNavigation, authButtons, branding, type NavLink } from '../config/navigation';
import { useAuth } from '../contexts/AuthContext';

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const isActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(to);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className={`bg-white shadow-sm sticky top-0 z-50 ${className}`}>
      <div className="container-efh">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt={logoAlt}
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const container = document.createElement('div');
                  container.className = 'flex flex-col';
                  
                  const nameSpan = document.createElement('span');
                  nameSpan.className = 'text-xl font-bold text-brand';
                  nameSpan.textContent = branding.name;
                  
                  const subtitleSpan = document.createElement('span');
                  subtitleSpan.className = 'text-xs text-text-secondary';
                  subtitleSpan.textContent = branding.subtitle;
                  
                  container.appendChild(nameSpan);
                  container.appendChild(subtitleSpan);
                  parent.appendChild(container);
                }
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <div key={link.to} className="relative">
                {link.items ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className={`flex items-center gap-1 text-base font-medium transition-colors ${
                        isActive(link.to)
                          ? 'text-brand'
                          : 'text-text-primary hover:text-brand'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card py-2">
                        {link.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block px-4 py-2 text-sm text-text-primary hover:bg-surface-elevated hover:text-brand transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className={`text-base font-medium transition-colors ${
                      isActive(link.to)
                        ? 'text-brand'
                        : 'text-text-primary hover:text-brand'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {role && (
                  <span className="px-3 py-1 bg-brand-light text-brand rounded-full text-sm font-medium">
                    {role}
                  </span>
                )}
                <Link
                  to="/my-certificates"
                  className="text-base font-medium text-text-primary hover:text-brand transition-colors"
                >
                  My Certificates
                </Link>
                {(role === 'staff' || role === 'admin') && (
                  <Link
                    to="/staff"
                    className="text-base font-medium text-text-primary hover:text-brand transition-colors"
                  >
                    Staff Panel
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  className="text-base font-medium text-text-primary hover:text-brand transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to={authButtons.signIn.to}
                  className="text-base font-medium text-text-primary hover:text-brand transition-colors"
                >
                  {authButtons.signIn.label}
                </Link>
                <Link
                  to={authButtons.signUp.to}
                  className="btn btn-primary"
                >
                  {authButtons.signUp.label}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-text-primary hover:bg-surface-elevated focus-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container-efh py-4 space-y-1">
            {links.map((link) => (
              <div key={link.to}>
                {link.items ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-text-primary hover:bg-surface-elevated rounded-lg transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="pl-4 space-y-1 mt-1">
                        {link.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-elevated hover:text-brand rounded-lg transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.to)
                        ? 'bg-red-50 text-brand'
                        : 'text-text-primary hover:bg-surface-elevated'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {user ? (
                <>
                  {role && (
                    <div className="px-4 py-2 text-center">
                      <span className="inline-block px-3 py-1 bg-brand-light text-brand rounded-full text-sm font-medium">
                        {role}
                      </span>
                    </div>
                  )}
                  <Link
                    to="/my-certificates"
                    className="block px-4 py-3 text-center rounded-lg text-base font-medium text-text-primary hover:bg-surface-elevated transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Certificates
                  </Link>
                  {(role === 'staff' || role === 'admin') && (
                    <Link
                      to="/staff"
                      className="block px-4 py-3 text-center rounded-lg text-base font-medium text-text-primary hover:bg-surface-elevated transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Staff Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-center rounded-lg text-base font-medium text-text-primary hover:bg-surface-elevated transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={authButtons.signIn.to}
                    className="block px-4 py-3 text-center rounded-lg text-base font-medium text-text-primary hover:bg-surface-elevated transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {authButtons.signIn.label}
                  </Link>
                  <Link
                    to={authButtons.signUp.to}
                    className="block px-4 py-3 text-center rounded-lg text-base font-semibold bg-brand text-white hover:bg-brand-primary-hover transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {authButtons.signUp.label}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
