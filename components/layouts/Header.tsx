"use client";
import Link from "next/link";
import { useState } from "react";

type NavItem = { label: string; href: string };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  { title: "Programs", items: [
    { label: "All Programs", href: "/programs" },
    { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship" },
    { label: "CNA", href: "/programs/cna" },
    { label: "HVAC", href: "/programs/hvac" },
    { label: "Building Technician", href: "/programs/building-technician" },
    { label: "CDL", href: "/programs/cdl" },
  ]},
  { title: "Funding", items: [
    { label: "Overview", href: "/funding" },
    { label: "WIOA", href: "/funding/wioa" },
    { label: "Workforce Ready Grant", href: "/funding/wrg" },
    { label: "Apprenticeships", href: "/funding/apprenticeship" },
    { label: "Employer Sponsorship", href: "/funding/employer" },
  ]},
  { title: "Students", items: [
    { label: "Student Portal", href: "/student/portal" },
    { label: "Career Services", href: "/career-services" },
    { label: "Courses", href: "/courses/catalog" },
    { label: "Credentials", href: "/credentials" },
  ]},
  { title: "Employers", items: [
    { label: "Hire Graduates", href: "/employers/hire-graduates" },
    { label: "Post a Role", href: "/employers/post" },
    { label: "Partnerships", href: "/partners" },
  ]},
  { title: "Admin & Staff", items: [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "Reports", href: "/reports" },
    { label: "Case Management", href: "/case-management" },
    { label: "Documents", href: "/documents" },
  ]},
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl text-slate-900">
          Elevate <span className="text-orange-600">For</span> Humanity
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {NAV.map((sec) => (
            <div
              key={sec.title}
              className="relative"
              onMouseEnter={() => setOpen(sec.title)}
              onMouseLeave={() => setOpen((o) => (o === sec.title ? null : o))}
            >
              <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full hover:bg-slate-100">
                <span>{sec.title}</span>
                <span className="text-slate-400">▾</span>
              </button>

              {open === sec.title && (
                <div className="absolute left-0 mt-2 w-[320px] rounded-xl border border-slate-200 bg-white shadow-lg p-3 grid grid-cols-1">
                  {sec.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className="rounded-lg px-3 py-2 hover:bg-slate-50"
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/apply" className="rounded-full bg-orange-600 text-white px-4 py-2 hover:bg-orange-700">
            Apply
          </Link>
        </nav>

        {/* Mobile */}
        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button aria-label="Menu" className="p-2 rounded-md border border-slate-200" onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 bg-white border-t border-slate-200">
          <div className="px-4 py-3 grid gap-6">
            {NAV.map((sec) => (
              <div key={sec.title}>
                <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">{sec.title}</div>
                <div className="grid">
                  {sec.items.map((it) => (
                    <Link key={it.href} href={it.href} className="py-2">
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/apply" className="rounded-full bg-orange-600 text-white text-center px-4 py-2">
              Apply
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
