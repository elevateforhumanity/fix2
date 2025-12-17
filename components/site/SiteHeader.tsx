'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const nav = [
  { href: '/programs', label: 'Programs' },
  { href: '/micro-classes', label: 'Micro Courses' },
  { href: '/funding', label: 'Funding' },
  { href: '/platform', label: 'Platform' },
  { href: '/licensing', label: 'Partners' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fix mobile nav overlay blocking clicks
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="font-bold text-zinc-800 hover:text-zinc-950 transition whitespace-nowrap"
            >
              {i.label}
            </Link>
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
            <nav className="px-4 py-6 space-y-2">
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
}
