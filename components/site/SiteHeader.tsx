'use client';

import Link from 'next/link';
import { useState } from 'react';
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-zinc-900 tracking-tight">
          Elevate for Humanity
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="font-bold text-zinc-800 hover:text-zinc-950 transition"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/platform/licensing"
            className="hidden sm:inline-flex rounded-xl border border-zinc-300 bg-white px-4 py-2 font-extrabold hover:bg-zinc-50 transition"
          >
            License
          </Link>
          <Link
            href="/apply"
            className="inline-flex rounded-xl bg-zinc-900 text-white px-4 py-2 font-extrabold hover:bg-zinc-800 transition"
          >
            Apply
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition relative z-50"
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
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
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
              <div className="pt-4 space-y-2">
                <Link
                  href="/platform/licensing"
                  className="block text-center rounded-xl border border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  License
                </Link>
                <Link
                  href="/apply"
                  className="block text-center rounded-xl bg-zinc-900 text-white px-4 py-3 font-extrabold hover:bg-zinc-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apply
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
