'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, HelpCircle } from 'lucide-react';
import {
  headerNavigation,
  utilityNavigation,
} from '@/lib/navigation/site-nav.config';

/**
 * SITE HEADER
 *
 * Global header for marketing site with:
 * - Utility bar (phone, help, login)
 * - Main navigation with dropdowns
 * - Mobile menu
 * - Responsive design
 */

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Utility Bar */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-4">
              <a
                href={utilityNavigation.phone.href}
                className="flex items-center gap-1 hover:text-blue-400 transition"
              >
                <Phone className="w-4 h-4" />
                {utilityNavigation.phone.label}
              </a>
              <Link
                href={utilityNavigation.help.href}
                className="flex items-center gap-1 hover:text-blue-400 transition"
              >
                <HelpCircle className="w-4 h-4" />
                {utilityNavigation.help.label}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={utilityNavigation.login.href}
                className="hover:text-blue-400 transition"
              >
                {utilityNavigation.login.label}
              </Link>
              <Link
                href={utilityNavigation.apply.href}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded transition"
              >
                {utilityNavigation.apply.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-bold text-gray-900">Elevate</div>
                <div className="text-xs text-gray-600 -mt-1">For Humanity</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {headerNavigation.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  {group.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === group.label && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <div className="font-medium">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {headerNavigation.map((group) => (
              <div key={group.label}>
                <div className="font-semibold text-gray-900 mb-2">
                  {group.label}
                </div>
                <div className="space-y-1 ml-4">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
