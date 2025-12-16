'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const nav = [
  { href: '/programs', label: 'Programs' },
  { href: '/micro-classes', label: 'Micro Courses' },
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
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-10 h-16 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="font-black text-zinc-900 tracking-tight flex-shrink-0 text-xs sm:text-sm lg:text-base"
        >
          Elevate for Humanity
        </Link>

        {/* Horizontal Nav - Always visible */}
        <nav className="flex items-center justify-center flex-1 gap-2 sm:gap-4 lg:gap-8 overflow-x-auto">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="font-bold text-zinc-800 hover:text-zinc-950 transition whitespace-nowrap text-xs sm:text-sm lg:text-base"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* CTAs - Always visible */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
          <Link
            href="/platform/licensing"
            className="inline-flex rounded-lg lg:rounded-xl border border-zinc-300 bg-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 font-extrabold hover:bg-zinc-50 transition whitespace-nowrap text-xs sm:text-sm lg:text-base"
          >
            License
          </Link>
          <Link
            href="/apply"
            className="inline-flex rounded-lg lg:rounded-xl bg-zinc-900 text-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 font-extrabold hover:bg-zinc-800 transition whitespace-nowrap text-xs sm:text-sm lg:text-base"
          >
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}
