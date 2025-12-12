'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { headerNav } from '@/config/navigation';
import { SiteLogo } from '@/components/site/logo';
import SiteSearch from '@/components/SiteSearch';

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MainHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-white z-50 sticky top-0 shadow-md border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo Only */}
          <div className="flex items-center">
            <SiteLogo className="h-12 w-auto" />
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
                    href={section.href || '/'}
                    className={classNames(
                      'text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors',
                      isActive && 'text-blue-600'
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
                      'inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors',
                      isActive && 'text-blue-600'
                    )}
                  >
                    {section.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={classNames(
                      'absolute left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 py-2 z-50',
                      !isOpen && 'hidden'
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
                          'block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700',
                          pathname === item.href &&
                            'bg-orange-50 text-orange-700'
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
            <SiteSearch />
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-700 transition-all hover:shadow-md"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button - Enhanced touch target */}
          <button
            type="button"
            className="inline-flex lg:hidden items-center justify-center rounded-lg border-2 border-slate-300 p-3 text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition min-w-[44px] min-h-[44px]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle main menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel - Enhanced scrollable with better spacing */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
          <div className="mx-auto max-w-6xl px-4 py-6 space-y-2">
            {headerNav.map((section) => {
              const hasChildren = section.items && section.items.length > 0;
              const expanded = openMenu === section.label;

              return (
                <div
                  key={section.label}
                  className="border-b border-slate-100 pb-4"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-800 py-3 px-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition min-h-[44px]"
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
                          'h-5 w-5 transition-transform',
                          expanded && 'rotate-180'
                        )}
                      />
                    )}
                  </button>

                  {section.href && (
                    <Link
                      href={section.href}
                      className="mt-2 block text-sm text-orange-600 font-semibold py-2 px-2 rounded-lg hover:bg-orange-50 active:bg-orange-100 transition min-h-[44px] flex items-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Go to {section.label} overview
                    </Link>
                  )}

                  {hasChildren && expanded && (
                    <div className="mt-3 space-y-1 pl-2">
                      {section.items!.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-base text-slate-700 py-3 px-3 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition min-h-[44px] flex items-center"
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
