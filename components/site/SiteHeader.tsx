'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const nav = [
  { href: '/programs', label: 'Programs' },
  { href: '/funding', label: 'Funding' },
  { href: '/platform', label: 'Platform' },
  { href: '/store', label: 'Store' },
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
          className="font-black text-zinc-900 tracking-tight flex-shrink-0 text-sm sm:text-base"
        >
          Elevate for Humanity
        </Link>

        {/* Desktop Nav - Spread across */}
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
            href="/platform/licensing"
            className="inline-flex rounded-xl border border-zinc-300 bg-white px-4 py-2 font-extrabold hover:bg-zinc-50 transition whitespace-nowrap"
          >
            License
          </Link>
          <Link
            href="/apply"
            className="inline-flex rounded-xl bg-zinc-900 text-white px-4 py-2 font-extrabold hover:bg-zinc-800 transition whitespace-nowrap"
          >
            Apply
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition relative z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto safe-area-inset">
            <nav className="px-4 py-6 space-y-2 pb-safe">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="block px-4 py-4 rounded-lg font-bold text-zinc-800 hover:bg-zinc-50 transition min-h-[48px] flex items-center text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {i.label}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <Link
                  href="/platform/licensing"
                  className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-4 font-extrabold hover:bg-zinc-50 transition min-h-[52px] text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  License
                </Link>
                <Link
                  href="/apply"
                  className="block text-center rounded-xl bg-zinc-900 text-white px-4 py-4 font-extrabold hover:bg-zinc-800 transition min-h-[52px] text-lg shadow-lg"
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
