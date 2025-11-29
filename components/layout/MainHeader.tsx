"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const mainNav = [
  { 
    label: "Programs", 
    href: "/programs",
    dropdown: [
      { label: "All Programs", href: "/programs" },
      { label: "CNA", href: "/programs/cna" },
      { label: "HVAC Technician", href: "/programs/hvac" },
      { label: "Licensed Barber", href: "/programs/barber" },
      { label: "CDL / Truck Driving", href: "/programs/cdl" },
      { label: "Medical Assistant", href: "/programs/medical-assistant" },
      { label: "Building Maintenance", href: "/programs/building-maintenance" },
      { label: "Phlebotomy", href: "/programs/phlebotomy" },
      { label: "Welding", href: "/programs/welding" },
      { label: "Tax Prep (VITA)", href: "/programs/tax-vita" },
    ]
  },
  { 
    label: "Funding", 
    href: "/funding",
    dropdown: [
      { label: "Funding Overview", href: "/funding" },
      { label: "WIOA Funding", href: "/funding/wioa" },
      { label: "Workforce Ready Grant", href: "/funding/wrg" },
      { label: "Job Ready Indy (JRI)", href: "/funding/jri" },
      { label: "DOL Apprenticeships", href: "/funding/dol" },
    ]
  },
  { 
    label: "For Students", 
    href: "/students",
    dropdown: [
      { label: "Student Portal", href: "/portal/student" },
      { label: "Student Dashboard", href: "/student/dashboard" },
      { label: "LMS", href: "/lms" },
      { label: "My Courses", href: "/student/courses" },
      { label: "Career Services", href: "/career-services" },
      { label: "Job Board", href: "/careers/job-board" },
      { label: "Resources", href: "/student/resources" },
    ]
  },
  { 
    label: "Partners", 
    href: "/employers",
    dropdown: [
      { label: "For Employers", href: "/employers" },
      { label: "Hire Graduates", href: "/hire-graduates" },
      { label: "Program Holders", href: "/program-holders" },
      { label: "Training Providers", href: "/training-providers" },
      { label: "Workforce Partners", href: "/workforce-partners" },
    ]
  },
  { 
    label: "About", 
    href: "/about",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Our Founder", href: "/founder" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Press Kit", href: "/press" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ]
  },
];

const mobileOnlyNav = [
  { label: "Community", href: "/community" },
  { label: "Webinars", href: "/webinars" },
  { label: "Alumni", href: "/alumni" },
];

const authNav = [
  { label: "Admin", href: "/admin" },
];

export function MainHeader() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
            EFH
          </span>
          <span className="text-sm font-semibold text-slate-900 md:text-base">
            Elevate For Humanity
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {mainNav.map((item) => (
            <div 
              key={item.href}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-red-600 flex items-center gap-1"
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-red-600"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Auth + CTA (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          {authNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-slate-700 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <span className="h-0.5 w-4 bg-slate-900" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            {mainNav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm font-bold text-slate-900"
                  onClick={() => !item.dropdown && setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-1.5 text-sm text-slate-600 hover:text-red-600"
                        onClick={() => setOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {mobileOnlyNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-slate-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase">Portals</p>
            <Link
              href="/student/dashboard"
              className="block rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-900"
              onClick={() => setOpen(false)}
            >
              📚 Student LMS Portal
            </Link>
            <Link
              href="/admin/dashboard"
              className="block rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900"
              onClick={() => setOpen(false)}
            >
              ⚙️ Admin Portal
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/apply"
              className="block w-full rounded-full bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default MainHeader;
