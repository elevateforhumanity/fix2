'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      // Force cleanup on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Force cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[90]">
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
                onBlur={() => setTimeout(() => setPartnersOpen(false), 200)}
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
              >
                Partners
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {partnersOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-[100] border border-gray-200">
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

        {/* Mobile Navigation - Full Screen Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-4 space-y-2 px-2">
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
                  <div className="text-sm font-semibold text-gray-500 mb-2">
                    Partners
                  </div>
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
