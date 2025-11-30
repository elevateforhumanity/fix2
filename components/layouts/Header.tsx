"use client";
import Link from "next/link";
import { useState } from "react";
import { SITE_MAP, SiteSection } from "@/config/siteMapConfig";

const HEADER_KEYS: SiteSection["key"][] = [
  "programs",
  "funding",
  "students",
  "employers",
  "adminStaff",
];

const headerSections: SiteSection[] = SITE_MAP.filter((sec) =>
  HEADER_KEYS.includes(sec.key)
);

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl text-slate-900">
          Elevate <span className="text-orange-600">For</span> Humanity
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {headerSections.map((sec) => {
            const items = sec.pages.filter(
              (p) => p.showInHeader !== false
            ).slice(0, 8); // cap to avoid huge dropdowns

            return (
              <div
                key={sec.key}
                className="relative"
                onMouseEnter={() => setOpen(sec.key)}
                onMouseLeave={() => setOpen((o) => (o === sec.key ? null : o))}
              >
                <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full hover:bg-slate-100">
                  <span>{sec.title}</span>
                  <span className="text-slate-400">▾</span>
                </button>

                {open === sec.key && items.length > 0 && (
                  <div className="absolute left-0 mt-2 w-[320px] rounded-xl border border-slate-200 bg-white shadow-lg p-3">
                    {items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/apply"
            className="rounded-full bg-orange-600 text-white px-4 py-2 hover:bg-orange-700"
          >
            Apply
          </Link>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label="Menu"
        className="p-2 rounded-md border border-slate-200"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 bg-white border-t border-slate-200">
          <div className="px-4 py-3 grid gap-6 max-h-[70vh] overflow-y-auto">
            {headerSections.map((sec) => {
              const items = sec.pages.filter(
                (p) => p.showInHeader !== false
              );
              return (
                <div key={sec.key}>
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                    {sec.title}
                  </div>
                  <div className="grid">
                    {items.map((it) => (
                      <Link key={it.href} href={it.href} className="py-2">
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <Link
              href="/apply"
              className="rounded-full bg-orange-600 text-white text-center px-4 py-2"
            >
              Apply
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
