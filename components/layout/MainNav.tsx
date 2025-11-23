// components/layout/MainNavMobile.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

// Student Portal URL - update this to your actual student portal
const STUDENT_PORTAL_URL = "/app";

const mainLinks = [
  { href: "/directory", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/learners", label: "Learners" },
  { href: "/employers", label: "Employers" },
  { href: "/partners/workforce", label: "Partners" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 shadow-sm" role="banner">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2" aria-label="Elevate For Humanity Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white text-xs font-black uppercase" aria-hidden="true">
              EFH
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                Elevate For Humanity
              </span>
              <span className="text-[11px] text-slate-600">
                Career &amp; Technical Institute
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-xs md:flex" role="navigation" aria-label="Main navigation">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "transition hover:text-emerald-600",
                  pathname?.startsWith(link.href)
                    ? "text-emerald-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-current={pathname?.startsWith(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Student Portal Button */}
            <Link
              href={STUDENT_PORTAL_URL}
              className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-4 py-2 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 transition"
              aria-label="Access Student Portal"
            >
              Student Portal
            </Link>

            {/* Strong CTA – APPLY */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-[11px] font-semibold text-white shadow-lg hover:bg-emerald-600"
              aria-label="Apply for training or refer someone"
            >
              Apply / Refer Now
            </Link>
          </nav>

          {/* Mobile menu button and quick actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/apply"
              className="rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-900 hover:text-emerald-600 transition touch-manipulation"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay and drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 md:hidden overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white text-xs font-black uppercase">
                    EFH
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-900 hover:text-emerald-600 transition touch-manipulation"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 p-6 space-y-2" role="navigation" aria-label="Mobile navigation">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "block py-3 px-4 rounded-lg text-sm font-medium transition touch-manipulation",
                      pathname?.startsWith(link.href)
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              {/* Bottom Actions */}
              <div className="p-6 border-t border-slate-200 space-y-3">
                <Link
                  href={STUDENT_PORTAL_URL}
                  className="block py-3 px-4 text-center border-2 border-emerald-500 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Student Portal
                </Link>
                <Link
                  href="/apply"
                  className="block py-3 px-4 text-center bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition shadow-lg touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apply / Refer Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
