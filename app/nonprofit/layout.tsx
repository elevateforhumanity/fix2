'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function NonprofitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [founderOpen, setFounderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/nonprofit" className="text-xl font-bold text-gray-900">
              Selfish Inc.(dba)Rise Forward Foundation
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/nonprofit" className="text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link href="/nonprofit/mental-wellness" className="text-gray-700 hover:text-purple-600">
                Mental Wellness
              </Link>
              <Link href="/nonprofit/workshops" className="text-gray-700 hover:text-purple-600">
                Workshops
              </Link>
              <Link href="/nonprofit/sign-up" className="text-gray-700 hover:text-purple-600">
                Sign up for workshops
              </Link>
              <Link href="/nonprofit/donations" className="text-gray-700 hover:text-purple-600">
                Donations
              </Link>
              <Link href="/nonprofit/healing-products" className="text-gray-700 hover:text-purple-600">
                Healing Products
              </Link>
              
              {/* Our Programs Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-purple-600 flex items-center gap-1">
                  Our Programs
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/nonprofit/our-programs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    All Programs
                  </Link>
                  <Link href="/nonprofit/divorce-counseling" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Divorce Counseling
                  </Link>
                  <Link href="/nonprofit/young-adult-wellness" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Young adult wellness support
                  </Link>
                </div>
              </div>

              {/* Meet the Founder Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-purple-600 flex items-center gap-1">
                  Meet the Founder
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/nonprofit/meet-the-founder" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Meet the Founder
                  </Link>
                  <Link href="/nonprofit/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    About us
                  </Link>
                </div>
              </div>

              <Link href="/nonprofit/program-list" className="text-gray-700 hover:text-purple-600">
                Program List
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              <Link href="/nonprofit" className="block py-2 text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link href="/nonprofit/mental-wellness" className="block py-2 text-gray-700 hover:text-purple-600">
                Mental Wellness
              </Link>
              <Link href="/nonprofit/workshops" className="block py-2 text-gray-700 hover:text-purple-600">
                Workshops
              </Link>
              <Link href="/nonprofit/sign-up" className="block py-2 text-gray-700 hover:text-purple-600">
                Sign up for workshops
              </Link>
              <Link href="/nonprofit/donations" className="block py-2 text-gray-700 hover:text-purple-600">
                Donations
              </Link>
              <Link href="/nonprofit/healing-products" className="block py-2 text-gray-700 hover:text-purple-600">
                Healing Products
              </Link>
              
              {/* Our Programs Mobile */}
              <div>
                <button
                  onClick={() => setProgramsOpen(!programsOpen)}
                  className="w-full text-left py-2 text-gray-700 hover:text-purple-600 flex items-center justify-between"
                >
                  Our Programs
                  <ChevronDown className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`} />
                </button>
                {programsOpen && (
                  <div className="pl-4 space-y-2">
                    <Link href="/nonprofit/our-programs" className="block py-2 text-gray-600 hover:text-purple-600">
                      All Programs
                    </Link>
                    <Link href="/nonprofit/divorce-counseling" className="block py-2 text-gray-600 hover:text-purple-600">
                      Divorce Counseling
                    </Link>
                    <Link href="/nonprofit/young-adult-wellness" className="block py-2 text-gray-600 hover:text-purple-600">
                      Young adult wellness support
                    </Link>
                  </div>
                )}
              </div>

              {/* Meet the Founder Mobile */}
              <div>
                <button
                  onClick={() => setFounderOpen(!founderOpen)}
                  className="w-full text-left py-2 text-gray-700 hover:text-purple-600 flex items-center justify-between"
                >
                  Meet the Founder
                  <ChevronDown className={`w-4 h-4 transition-transform ${founderOpen ? 'rotate-180' : ''}`} />
                </button>
                {founderOpen && (
                  <div className="pl-4 space-y-2">
                    <Link href="/nonprofit/meet-the-founder" className="block py-2 text-gray-600 hover:text-purple-600">
                      Meet the Founder
                    </Link>
                    <Link href="/nonprofit/about-us" className="block py-2 text-gray-600 hover:text-purple-600">
                      About us
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/nonprofit/program-list" className="block py-2 text-gray-700 hover:text-purple-600">
                Program List
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 text-center">
        <p className="text-sm text-gray-600">
          Do Not Sell My Personal Information
        </p>
      </footer>
    </div>
  );
}
