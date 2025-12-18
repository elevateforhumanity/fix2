'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const programCategories = [
  {
    label: 'All Programs',
    href: '/programs',
  },
  {
    label: 'Apprenticeships',
    href: '/programs/apprenticeships',
    subItems: [
      {
        label: 'Barber Apprenticeship',
        href: '/programs/barber-apprenticeship',
      },
      { label: 'HVAC Technician', href: '/programs/hvac-technician' },
      { label: 'Building Maintenance', href: '/programs/building-maintenance' },
      { label: 'Building Technician', href: '/programs/building-technician' },
    ],
  },
  {
    label: 'WIOA Programs (ETPL/WRG)',
    href: '/programs/federal-funded',
    subItems: [
      { label: 'CNA', href: '/programs/cna' },
      {
        label: 'Phlebotomy Technician',
        href: '/programs/phlebotomy-technician',
      },
      { label: 'Home Health Aide', href: '/programs/home-health-aide' },
      {
        label: 'Direct Support Professional',
        href: '/programs/direct-support-professional',
      },
      { label: 'CDL', href: '/programs/cdl' },
      { label: 'CPR Certification', href: '/programs/cpr-certification' },
      { label: 'Peer Recovery Coach', href: '/programs/peer-recovery-coach' },
      {
        label: 'Emergency Health & Safety',
        href: '/programs/emergency-health-safety-tech',
      },
    ],
  },
  {
    label: 'JRI Programs',
    href: '/programs/jri',
    subItems: [
      { label: 'CNA', href: '/programs/cna' },
      {
        label: 'Phlebotomy Technician',
        href: '/programs/phlebotomy-technician',
      },
      { label: 'Home Health Aide', href: '/programs/home-health-aide' },
      {
        label: 'Direct Support Professional',
        href: '/programs/direct-support-professional',
      },
      { label: 'CDL', href: '/programs/cdl' },
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },
      { label: 'Peer Recovery Coach', href: '/programs/peer-recovery-coach' },
    ],
  },
  {
    label: 'Micro Programs',
    href: '/programs/micro-programs',
    subItems: [
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },
      { label: 'Drug Collector', href: '/programs/drug-collector' },
      { label: 'CPR Certification', href: '/programs/cpr-certification' },
      {
        label: 'Emergency Health & Safety',
        href: '/programs/emergency-health-safety-tech',
      },
    ],
  },
];

const partnerPrograms = [
  { label: 'HSI Safety Training', href: '/courses/hsi' },
  { label: 'Milady Beauty & Wellness', href: '/rise' },
  { label: 'CareerSafe OSHA Training', href: '/courses/careersafe' },
  { label: 'NRF Retail Training', href: '/courses/nrf' },
  { label: 'NDS Cosmetology', href: '/courses/nds' },
  { label: 'JRI Programs', href: '/jri' },
];

const nav = [
  { href: '/funding', label: 'Funding' },
  { href: '/platform', label: 'Platform' },
  { href: '/licensing', label: 'Partners' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-6">
          {/* Programs Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown('programs')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="font-bold text-zinc-800 hover:text-zinc-950 transition flex items-center gap-1">
              Programs
              <ChevronDown className="w-4 h-4" />
            </button>

            {openDropdown === 'programs' && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 max-h-[80vh] overflow-y-auto">
                {programCategories.map((category) => (
                  <div key={category.href} className="border-b border-gray-100 last:border-0">
                    <Link
                      href={category.href}
                      className="block px-4 py-2.5 text-sm font-bold text-gray-900 hover:bg-blue-50 transition"
                    >
                      {category.label}
                    </Link>
                    {category.subItems && (
                      <div className="bg-gray-50 pb-2">
                        {category.subItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-6 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            • {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Partner Programs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('partners')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="font-bold text-zinc-800 hover:text-zinc-950 transition flex items-center gap-1">
              Partner Programs
              <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === 'partners' && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                {partnerPrograms.map((partner) => (
                  <Link
                    key={partner.href}
                    href={partner.href}
                    className="block px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {partner.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Nav Items */}
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
}
