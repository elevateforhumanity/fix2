'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { headerNav } from '@/config/navigation';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-black text-zinc-900 tracking-tight flex-shrink-0 text-base sm:text-lg"
          >
            Elevate for Humanity
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-6">
            {headerNav?.map((section) => (
            <div
              key={section.label}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(section.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {section.items && section.items.length > 0 ? (
                <>
                  <button className="font-bold text-zinc-800 hover:text-zinc-950 transition flex items-center gap-1">
                    {section.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === section.label && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 max-h-[80vh] overflow-y-auto">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
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
                  className="font-bold text-zinc-800 hover:text-zinc-950 transition"
                >
                  {section.label}
                </Link>
              )}
            </div>
          ))}
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
          <Link
            href="/apply"
            className="inline-flex rounded-xl bg-orange-600 text-white px-4 py-2 font-extrabold hover:bg-orange-700 transition whitespace-nowrap"
          >
            Apply
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
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
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
            <nav className="px-4 py-6 space-y-4">
              {/* Programs Section */}
              <div className="space-y-2">
                <div className="px-4 py-2 font-black text-black text-sm uppercase tracking-wide">
                  Programs
                </div>
                {programCategories.map((category) => (
                  <div key={category.href} className="space-y-1">
                    <Link
                      href={category.href}
                      className="block px-4 py-2 rounded-lg font-bold text-zinc-800 hover:bg-blue-50 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.label}
                    </Link>
                    {category.subItems && (
                      <div className="pl-4 space-y-1">
                        {category.subItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Partner Programs Section */}
              <div className="space-y-2 border-t pt-4">
                <div className="px-4 py-2 font-black text-black text-sm uppercase tracking-wide">
                  Partner Programs
                </div>
                {partnerPrograms.map((partner) => (
                  <Link
                    key={partner.href}
                    href={partner.href}
                    className="block px-4 py-2 rounded-lg font-bold text-zinc-800 hover:bg-blue-50 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {partner.label}
                  </Link>
                ))}
              </div>

              {/* Other Nav Items */}
              <div className="border-t pt-4 space-y-2">
                {nav.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="block px-4 py-3 rounded-lg font-bold text-zinc-800 hover:bg-zinc-50 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
              <div className="pt-4 space-y-3">
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
                <Link
                  href="/apply"
                  className="block text-center rounded-xl bg-orange-600 text-white px-4 py-3 font-extrabold hover:bg-orange-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apply Now
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
          <Link href="/apply" className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold">
            Apply
          </Link>
        </div>
      </header>
    );
  }
}
