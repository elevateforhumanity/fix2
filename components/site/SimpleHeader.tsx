'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-900">
              Elevate for Humanity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Primary Links - Student First */}
            <Link
              href="/programs"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Programs
            </Link>
            <Link
              href="/apply"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Apply
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>

            {/* Partners Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPartnersOpen(!partnersOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
              >
                Partners
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {partnersOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/employers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setPartnersOpen(false)}
                  >
                    For Employers
                  </Link>
                  <Link
                    href="/providers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setPartnersOpen(false)}
                  >
                    For Training Providers
                  </Link>
                  <Link
                    href="/workforce-boards"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setPartnersOpen(false)}
                  >
                    For Workforce Boards
                  </Link>
                </div>
              )}
            </div>

            {/* Login */}
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>

            {/* CTA Button */}
            <Link
              href="/apply"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/programs"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/apply"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Partners Section */}
            <div className="px-4 py-2">
              <div className="text-sm font-semibold text-gray-500 mb-2">Partners</div>
              <Link
                href="/employers"
                className="block py-1 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Employers
              </Link>
              <Link
                href="/providers"
                className="block py-1 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Providers
              </Link>
              <Link
                href="/workforce-boards"
                className="block py-1 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Workforce Boards
              </Link>
            </div>

            <Link
              href="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/apply"
              className="block mx-4 px-4 py-2 bg-orange-500 text-white text-center rounded-lg font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
