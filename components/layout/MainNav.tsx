// components/layout/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Student Portal URL - update this to your actual student portal
const STUDENT_PORTAL_URL = "/app"; // or "https://students.elevateforhumanity.org"

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

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur" role="banner">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Elevate For Humanity Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 text-xs font-black uppercase" aria-hidden="true">
            EFH
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">
              Elevate For Humanity
            </span>
            <span className="text-[11px] text-slate-400">
              Career & Technical Institute
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
                "transition hover:text-emerald-300",
                pathname?.startsWith(link.href)
                  ? "text-emerald-300 font-semibold"
                  : "text-slate-300"
              )}
              aria-current={pathname?.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Student Portal Button */}
          <Link
            href={STUDENT_PORTAL_URL}
            className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-4 py-2 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/10 transition"
            aria-label="Access Student Portal"
          >
            Student Portal
          </Link>

          {/* Strong CTA – APPLY */}
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-[11px] font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            aria-label="Apply for training or refer someone"
          >
            Apply / Refer Now
          </Link>
        </nav>

        {/* Simple mobile link */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={STUDENT_PORTAL_URL}
            className="rounded-full border border-emerald-400 px-3 py-1.5 text-[11px] text-emerald-300"
          >
            Portal
          </Link>
          <Link
            href="/apply"
            className="rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-slate-950"
          >
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}
