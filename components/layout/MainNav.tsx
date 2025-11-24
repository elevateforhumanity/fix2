// components/layout/MainNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

// Student Portal URL
const STUDENT_PORTAL_URL = "/portal";

// Programs dropdown items
const programsLinks = [
  { href: "/programs/medical-assistant", label: "Medical Assistant" },
  { href: "/programs/phlebotomy", label: "Phlebotomy Technician" },
  { href: "/programs/ekg-technician", label: "EKG Technician" },
  { href: "/programs/pharmacy-technician", label: "Pharmacy Technician" },
  { href: "/programs/dental-assistant", label: "Dental Assistant" },
  { href: "/programs/patient-care-technician", label: "Patient Care Technician" },
  { href: "/programs/sterile-processing", label: "Sterile Processing Technician" },
  { href: "/programs/healthcare-administration", label: "Healthcare Administration" },
];

// Funding dropdown items
const fundingLinks = [
  { href: "/funding/state-programs", label: "State Programs" },
  { href: "/funding/federal-programs", label: "Federal Programs" },
];

const mainLinks = [
  { href: "/students", label: "For Students" },
  { href: "/employers", label: "For Employers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [fundingOpen, setFundingOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileFundingOpen, setMobileFundingOpen] = useState(false);

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
    setProgramsOpen(false);
    setFundingOpen(false);
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
            {/* Programs Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button
                className={clsx(
                  "flex items-center gap-1 transition hover:text-emerald-600",
                  pathname?.startsWith("/programs")
                    ? "text-emerald-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-expanded={programsOpen}
                aria-haspopup="true"
              >
                Programs
                <ChevronDown size={14} className={clsx("transition-transform", programsOpen && "rotate-180")} />
              </button>
              
              {programsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  {programsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "block px-4 py-2 text-xs transition hover:bg-emerald-50 hover:text-emerald-600",
                        pathname === link.href
                          ? "text-emerald-600 font-semibold bg-emerald-50"
                          : "text-slate-700"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Funding Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setFundingOpen(true)}
              onMouseLeave={() => setFundingOpen(false)}
            >
              <button
                className={clsx(
                  "flex items-center gap-1 transition hover:text-emerald-600",
                  pathname?.startsWith("/funding")
                    ? "text-emerald-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-expanded={fundingOpen}
                aria-haspopup="true"
              >
                Funding
                <ChevronDown size={14} className={clsx("transition-transform", fundingOpen && "rotate-180")} />
              </button>
              
              {fundingOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  {fundingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "block px-4 py-2 text-xs transition hover:bg-emerald-50 hover:text-emerald-600",
                        pathname === link.href
                          ? "text-emerald-600 font-semibold bg-emerald-50"
                          : "text-slate-700"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Main Links */}
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

            {/* Strong CTA – APPLY */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-emerald-600 transition"
              aria-label="Apply for training or refer someone"
            >
              Apply Now
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
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto" role="navigation" aria-label="Mobile navigation">
                {/* Programs Section */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition touch-manipulation"
                  >
                    <span>Programs</span>
                    <ChevronDown size={16} className={clsx("transition-transform", mobileProgramsOpen && "rotate-180")} />
                  </button>
                  {mobileProgramsOpen && (
                    <div className="pl-4 space-y-1">
                      {programsLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={clsx(
                            "block py-2 px-4 rounded-lg text-sm transition touch-manipulation",
                            pathname === link.href
                              ? "bg-emerald-50 text-emerald-600 font-medium"
                              : "text-slate-600 hover:bg-slate-50"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Funding Section */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileFundingOpen(!mobileFundingOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition touch-manipulation"
                  >
                    <span>Funding</span>
                    <ChevronDown size={16} className={clsx("transition-transform", mobileFundingOpen && "rotate-180")} />
                  </button>
                  {mobileFundingOpen && (
                    <div className="pl-4 space-y-1">
                      {fundingLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={clsx(
                            "block py-2 px-4 rounded-lg text-sm transition touch-manipulation",
                            pathname === link.href
                              ? "bg-emerald-50 text-emerald-600 font-medium"
                              : "text-slate-600 hover:bg-slate-50"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Links */}
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
