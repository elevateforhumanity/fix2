'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { MobileNav } from './MobileNav';

export default function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

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

          {/* Mobile menu button - Only shows hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Separate component handles X and overlay */}
      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
