"use client";

import Link from "next/link";
import { useState } from "react";

const mainNav = [
  { label: "Programs", href: "/programs" },
  { label: "Courses", href: "/courses" },
  { label: "Funding", href: "/financial-aid" },
  { label: "Employers", href: "/employers" },
  { label: "Resources", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileOnlyNav = [
  { label: "Success Stories", href: "/success-stories" },
  { label: "Student Hub", href: "/student/hub" },
  { label: "Career Services", href: "/career-services" },
  { label: "Hire Graduates", href: "/hire-graduates" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
];

const authNav = [
  { label: "Student Portal", href: "/student/dashboard" },
  { label: "Admin Portal", href: "/admin/dashboard" },
];

export function MainHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
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
        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-red-600"
            >
              {item.label}
            </Link>
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
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="space-y-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-slate-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
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
