'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { headerNav } from '@/config/navigation';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >(null);

  // Debug: Check if headerNav is loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('HeaderNav loaded:', headerNav?.length, 'sections');
      console.log('First section:', headerNav?.[0]);
    }
  }, []);

  // Fix mobile nav overlay blocking clicks
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        if (mobileMenuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    } catch (error) {
      console.warn('Failed to set body overflow:', error);
    }

    // Cleanup on unmount
    return () => {
      try {
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, [mobileMenuOpen]);

  try {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 relative">
          <Link
            href="/"
            className="font-black text-zinc-900 tracking-tight flex-shrink-0 text-base sm:text-lg"
          >
            Elevate for Humanity
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-6">
            {headerNav && headerNav.length > 0 ? (
              headerNav.map((section) => (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(section.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {section.items && section.items.length > 0 ? (
                    <>
                      <button
                        type="button"
                        className="font-bold text-zinc-800 hover:text-zinc-950 transition flex items-center gap-1 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        {section.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {openDropdown === section.label && (
                        <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl py-2 z-[100] max-h-[80vh] overflow-y-auto">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={section.href || '/'}
                      className="font-bold text-zinc-800 hover:text-zinc-950 transition py-2"
                    >
                      {section.label}
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">Loading navigation...</div>
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/dashboard"
              className="inline-flex rounded-xl border border-zinc-300 bg-white px-4 py-2 font-extrabold hover:bg-zinc-50 transition whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="inline-flex rounded-xl border border-zinc-300 bg-white px-4 py-2 font-extrabold hover:bg-zinc-50 transition whitespace-nowrap"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto pb-safe">
              <nav className="px-4 py-6 space-y-2 min-h-full">
                {/* All Navigation Sections */}
                {headerNav?.map((section) => (
                  <div
                    key={section.label}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    {section.items && section.items.length > 0 ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobileSection(
                              expandedMobileSection === section.label
                                ? null
                                : section.label
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition"
                        >
                          <span>{section.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              expandedMobileSection === section.label
                                ? 'rotate-180'
                                : ''
                            }`}
                          />
                        </button>
                        {expandedMobileSection === section.label && (
                          <div className="bg-gray-50 py-2">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setExpandedMobileSection(null);
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : section.href ? (
                      <Link
                        href={section.href}
                        className="block px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {section.label}
                      </Link>
                    ) : null}
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="border-t pt-4 space-y-3">
                  <Link
                    href="/dashboard"
                    className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/login"
                    className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    );
  } catch (error) {
    console.error('SiteHeader render failed:', error);
    // Fallback minimal header
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-zinc-900">
            Elevate for Humanity
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="border border-zinc-300 bg-white px-4 py-2 rounded-xl font-bold"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="border border-zinc-300 bg-white px-4 py-2 rounded-xl font-bold"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
