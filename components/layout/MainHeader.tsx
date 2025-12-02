"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { headerNav } from "@/config/navigation";

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MainHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-white/95 backdrop-blur z-50 sticky top-0 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Elevate For Humanity"
                width={48}
                height={48}
                className="h-12 w-12"
                priority
              />
              <div className="leading-tight">
                <div className="font-semibold text-slate-900 text-sm sm:text-base">
                  Elevate For Humanity
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">
                  Career & Technical Institute
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {headerNav.map((section) => {
              const isActive =
                section.href && pathname?.startsWith(section.href);

              if (!section.items || section.items.length === 0) {
                return (
                  <Link
                    key={section.label}
                    href={section.href || "/"}
                    className={classNames(
                      "text-sm font-medium hover:text-orange-600 transition-colors",
                      isActive && "text-orange-600"
                    )}
                  >
                    {section.label}
                  </Link>
                );
              }

              const isOpen = openMenu === section.label;

              return (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(section.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className={classNames(
                      "inline-flex items-center gap-1 text-sm font-medium hover:text-orange-600 transition-colors",
                      isActive && "text-orange-600"
                    )}
                  >
                    {section.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={classNames(
                      "absolute left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 py-2 z-50",
                      !isOpen && "hidden"
                    )}
                  >
                    {section.href && (
                      <Link
                        href={section.href}
                        className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-orange-600"
                      >
                        Overview
                      </Link>
                    )}
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={classNames(
                          "block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700",
                          pathname === item.href && "bg-orange-50 text-orange-700"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right side CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/student/dashboard"
              className="text-xs font-medium text-slate-700 hover:text-orange-600"
            >
              Student Portal
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition-colors"
            >
              Apply Now – It&apos;s Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex lg:hidden items-center justify-center rounded-md border border-slate-300 p-1.5 text-slate-700"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle main menu"
          >
            {mobileOpen ? (
              <span className="text-lg">✕</span>
            ) : (
              <span className="text-lg">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-4">
            {headerNav.map((section) => {
              const hasChildren = section.items && section.items.length > 0;
              const expanded = openMenu === section.label;

              return (
                <div key={section.label} className="border-b border-slate-100 pb-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-800"
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === section.label ? null : section.label
                      )
                    }
                  >
                    <span>{section.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={classNames(
                          "h-4 w-4 transition-transform",
                          expanded && "rotate-180"
                        )}
                      />
                    )}
                  </button>

                  {section.href && (
                    <Link
                      href={section.href}
                      className="mt-1 block text-xs text-orange-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      Go to {section.label} overview
                    </Link>
                  )}

                  {hasChildren && expanded && (
                    <div className="mt-2 space-y-1">
                      {section.items!.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-slate-700 pl-3 py-1 rounded hover:bg-orange-50"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/student/dashboard"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-800"
              >
                Student Portal
              </Link>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center rounded-full bg-orange-600 px-4 py-2 text-xs font-semibold text-white"
              >
                Apply Now – It&apos;s Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

