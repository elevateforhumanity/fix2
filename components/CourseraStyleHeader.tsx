'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, ChevronDown, Globe } from 'lucide-react';

export default function CourseraStyleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-600">Elevate</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <div className="relative">
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Explore
                  <ChevronDown className="w-4 h-4" />
                </button>

                {exploreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <Link
                      href="/programs"
                      className="block px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 border-b border-gray-100"
                      onClick={() => setExploreOpen(false)}
                    >
                      📚 View All Programs
                    </Link>
                    <Link
                      href="/programs/medical-assistant"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      🏥 Medical Assistant
                    </Link>
                    <Link
                      href="/programs/barber-apprenticeship"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      ✂️ Barber Apprenticeship
                    </Link>
                    <Link
                      href="/programs/hvac-technician"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      🔧 HVAC Technician
                    </Link>
                    <Link
                      href="/programs/building-maintenance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      🏗️ Building Maintenance
                    </Link>
                    <Link
                      href="/programs/truck-driving"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      🚛 CDL / Truck Driving
                    </Link>
                    <Link
                      href="/programs/workforce-readiness"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      💼 Workforce Readiness
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                href="/partners"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Partners
              </Link>
              <Link
                href="/employers"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                For Employers
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                Log In
              </Link>
              <Link
                href="/apply"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
              >
                Join for Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/programs"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Explore Programs
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              About
            </Link>
            <Link
              href="/partners"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Partners
            </Link>
            <Link
              href="/employers"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              For Employers
            </Link>
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm font-medium text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Log In
              </Link>
              <Link
                href="/apply"
                className="block px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Join for Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
