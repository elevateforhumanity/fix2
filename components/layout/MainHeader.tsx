"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/funding", label: "Funding" },
    { href: "/student-portal", label: "Student Portal" },
    { href: "/staff-portal", label: "Staff & Program Holders" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-500 text-white font-bold text-sm">
            EFH
          </div>
          <span className="hidden text-base font-semibold text-slate-900 sm:inline">
            Elevate For Humanity
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                isActive(link.href)
                  ? "text-orange-500"
                  : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/lms"
            className="hidden rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 md:inline-block"
          >
            Go to LMS
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lms"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
            >
              Go to LMS
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
