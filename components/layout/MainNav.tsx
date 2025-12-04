// components/layout/MainNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import clsx from "clsx";
import { PremiumMobileNav } from "./PremiumMobileNav";

// Student Portal URL
const STUDENT_PORTAL_URL = "/portal";

// Main Programs dropdown items (Elevate-run programs)
const programsLinks = [
  { href: "/programs/medical-assistant", label: "Medical Assistant" },
  { href: "/programs/barber-apprenticeship", label: "Barber Apprenticeship" },
  { href: "/programs/hvac", label: "HVAC Technician" },
  { href: "/programs/building-tech", label: "Building Maintenance Tech" },
  { href: "/programs/cdl", label: "CDL / Transportation" },
  { href: "/programs/workforce-readiness", label: "Workforce Readiness" },
  { href: "/programs", label: "View All Programs →" },
];

// Micro Classes dropdown items (Partner programs)
const microClassesLinks = [
  { href: "/micro-classes#cpr-certification", label: "CPR Certification" },
  { href: "/micro-classes#phlebotomy", label: "Phlebotomy Technician" },
  { href: "/micro-classes#ekg-technician", label: "EKG Technician" },
  { href: "/micro-classes#pharmacy-technician", label: "Pharmacy Technician" },
  { href: "/micro-classes#dental-assistant", label: "Dental Assistant" },
  { href: "/micro-classes#patient-care-technician", label: "Patient Care Technician" },
  { href: "/micro-classes#sterile-processing", label: "Sterile Processing" },
  { href: "/micro-classes#healthcare-administration", label: "Healthcare Administration" },
  { href: "/micro-classes", label: "View All Micro Classes →" },
];

// Funding dropdown items
const fundingLinks = [
  { href: "/funding/state-programs", label: "State Programs" },
  { href: "/funding/federal-programs", label: "Federal Programs" },
];

const mainLinks = [
  { href: "/students", label: "For Students" },
  { href: "/employers", label: "For Employers" },
  { href: "https://elevateforhumanityeducation.com", label: "LMS", external: true },
  { href: "/admin", label: "Admin" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const portalLinks = [
  { href: "/portal/student/dashboard", label: "Student Portal" },
  { href: "/lms/dashboard", label: "LMS" },
  { href: "/admin/dashboard", label: "Admin" },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [microClassesOpen, setMicroClassesOpen] = useState(false);
  const [fundingOpen, setFundingOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileMicroClassesOpen, setMobileMicroClassesOpen] = useState(false);
  const [mobileFundingOpen, setMobileFundingOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [mobilePortalsOpen, setMobilePortalsOpen] = useState(false);
  
  // Timeout refs for delayed closing - use useRef instead of useState
  const [programsTimeoutRef, setProgramsTimeoutRef] = useState<NodeJS.Timeout | null>(null);
  const [microClassesTimeoutRef, setMicroClassesTimeoutRef] = useState<NodeJS.Timeout | null>(null);
  const [fundingTimeoutRef, setFundingTimeoutRef] = useState<NodeJS.Timeout | null>(null);

  // Helper functions for delayed dropdown closing
  const handleProgramsEnter = () => {
    if (programsTimeoutRef) clearTimeout(programsTimeoutRef);
    setProgramsOpen(true);
  };
  
  const handleProgramsLeave = () => {
    const timeout = setTimeout(() => setProgramsOpen(false), 500);
    setProgramsTimeoutRef(timeout);
  };

  const handleMicroClassesEnter = () => {
    if (microClassesTimeoutRef) clearTimeout(microClassesTimeoutRef);
    setMicroClassesOpen(true);
  };
  
  const handleMicroClassesLeave = () => {
    const timeout = setTimeout(() => setMicroClassesOpen(false), 500);
    setMicroClassesTimeoutRef(timeout);
  };

  const handleFundingEnter = () => {
    if (fundingTimeoutRef) clearTimeout(fundingTimeoutRef);
    setFundingOpen(true);
  };
  
  const handleFundingLeave = () => {
    const timeout = setTimeout(() => setFundingOpen(false), 500);
    setFundingTimeoutRef(timeout);
  };

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
    setMicroClassesOpen(false);
    setFundingOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40" role="banner">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2" aria-label="Elevate For Humanity Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white text-xs font-black uppercase" aria-hidden="true">
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
              onMouseEnter={handleProgramsEnter}
              onMouseLeave={handleProgramsLeave}
            >
              <button
                className={clsx(
                  "flex items-center gap-1 transition hover:text-red-600",
                  pathname?.startsWith("/programs")
                    ? "text-red-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-expanded={programsOpen}
                aria-haspopup="true"
              >
                Programs
                <ChevronDown size={14} className={clsx("transition-transform", programsOpen && "rotate-180")} />
              </button>
              
              {programsOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                    {programsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                          "block px-4 py-2 text-xs transition hover:bg-red-50 hover:text-red-600",
                          pathname === link.href
                            ? "text-red-600 font-semibold bg-red-50"
                            : "text-slate-700"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Micro Classes Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMicroClassesEnter}
              onMouseLeave={handleMicroClassesLeave}
            >
              <button
                className={clsx(
                  "flex items-center gap-1 transition hover:text-red-600",
                  pathname?.startsWith("/micro-classes")
                    ? "text-red-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-expanded={microClassesOpen}
                aria-haspopup="true"
              >
                Micro Classes
                <ChevronDown size={14} className={clsx("transition-transform", microClassesOpen && "rotate-180")} />
              </button>
              
              {microClassesOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                    {microClassesLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                          "block px-4 py-2 text-xs transition hover:bg-red-50 hover:text-red-600",
                          pathname === link.href
                            ? "text-red-600 font-semibold bg-red-50"
                            : "text-slate-700"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
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
                  "flex items-center gap-1 transition hover:text-red-600",
                  pathname?.startsWith("/funding")
                    ? "text-red-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-expanded={fundingOpen}
                aria-haspopup="true"
              >
                Funding
                <ChevronDown size={14} className={clsx("transition-transform", fundingOpen && "rotate-180")} />
              </button>
              
              {fundingOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                    {fundingLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                          "block px-4 py-2 text-xs transition hover:bg-red-50 hover:text-red-600",
                          pathname === link.href
                            ? "text-red-600 font-semibold bg-red-50"
                            : "text-slate-700"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Portals Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPortalsOpen(true)}
              onMouseLeave={() => setPortalsOpen(false)}
            >
              <button
                className={clsx(
                  "flex items-center gap-1 transition hover:text-red-600",
                  (pathname?.startsWith("/portal") || pathname?.startsWith("/lms") || pathname?.startsWith("/admin"))
                    ? "text-red-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-expanded={portalsOpen}
                aria-haspopup="true"
              >
                Portals
                <ChevronDown size={14} className={clsx("transition-transform", portalsOpen && "rotate-180")} />
              </button>
              
              {portalsOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                    {portalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                          "block px-4 py-2 text-xs transition hover:bg-red-50 hover:text-red-600",
                          pathname === link.href
                            ? "text-red-600 font-semibold bg-red-50"
                            : "text-slate-700"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Links */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={clsx(
                  "transition hover:text-red-600",
                  pathname?.startsWith(link.href)
                    ? "text-red-600 font-semibold"
                    : "text-slate-700"
                )}
                aria-current={pathname?.startsWith(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search programs..."
                className="w-48 pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    if (query) window.location.href = `/search?q=${encodeURIComponent(query)}`;
                  }
                }}
              />
            </div>

            {/* Strong CTA – APPLY */}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-red-600 transition"
              aria-label="Apply for training or refer someone"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile menu button and quick actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/apply"
              className="rounded-full bg-red-500 px-3 py-1.5 text-[11px] font-semibold hover:bg-red-600 transition-colors"
              style={{ color: '#FFFFFF' }}
            >
              Apply
            </Link>
            <PremiumMobileNav />
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white text-xs font-black uppercase">
                    EFH
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-900 hover:text-red-600 transition touch-manipulation"
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
                              ? "bg-red-50 text-red-600 font-medium"
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

                {/* Micro Classes Section */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileMicroClassesOpen(!mobileMicroClassesOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition touch-manipulation"
                  >
                    <span>Micro Classes</span>
                    <ChevronDown size={16} className={clsx("transition-transform", mobileMicroClassesOpen && "rotate-180")} />
                  </button>
                  {mobileMicroClassesOpen && (
                    <div className="pl-4 space-y-1">
                      {microClassesLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={clsx(
                            "block py-2 px-4 rounded-lg text-sm transition touch-manipulation",
                            pathname === link.href
                              ? "bg-red-50 text-red-600 font-medium"
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
                              ? "bg-red-50 text-red-600 font-medium"
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
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={clsx(
                      "block py-3 px-4 rounded-lg text-sm font-medium transition touch-manipulation",
                      pathname?.startsWith(link.href)
                        ? "bg-red-50 text-red-600 border border-red-200"
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
                  className="block py-3 px-4 text-center border-2 border-emerald-500 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Student Portal
                </Link>
                <Link
                  href="/apply"
                  className="block py-3 px-4 text-center bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow-lg touch-manipulation"
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
