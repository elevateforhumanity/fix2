'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    // @ts-expect-error TS7030: Not all code paths return a value.
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    // @ts-expect-error TS7030: Not all code paths return a value.
    if (!openMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenu]);

  return (
    <header className="bg-white/95 backdrop-blur-md z-50 sticky top-0 border-b border-slate-200 shadow-sm">
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
                <div key={section.label} className="relative" data-dropdown>
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : section.label)}
                    className={classNames(
                      'inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors',
                      isActive && 'text-blue-600',
                      isOpen && 'bg-slate-50 text-blue-600'
                    )}
                  >
                    {section.label}
                    <ChevronDown
                      className={classNames(
                        'h-4 w-4 transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={classNames(
                      'absolute left-0 mt-2 w-72 rounded-lg border border-slate-200 bg-white shadow-xl py-2 z-50',
                      !isOpen && 'hidden'
                    )}
                  >
                    {section.href && (
                      <Link
                        href={section.href}
                        onClick={() => setOpenMenu(null)}
                        className="block px-4 py-3 text-xs font-bold uppercase tracking-wide text-blue-600 hover:bg-blue-50 transition-colors border-b border-slate-100"
                      >
                        View All {section.label}
                      </Link>
                    )}
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        className={classNames(
                          'block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors',
                          pathname === item.href &&
                            'bg-blue-50 text-blue-700 font-semibold'
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
          <div className="hidden lg:flex items-center gap-4">
            <SiteSearch />
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
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

      {/* Mobile nav panel - Fixed overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm bg-white shadow-xl overflow-y-auto">
            {/* Scrollable content */}
            <nav className="px-4 py-6 space-y-2">
              {headerNav.map((section) => {
                const hasChildren = section.items && section.items.length > 0;
                const expanded = openMenu === section.label;

                return (
                  <div
                    key={section.label}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === section.label ? null : section.label
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition"
                        >
                          <span>{section.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              expanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expanded && (
                          <div className="bg-gray-50 py-2">
                            {section.items!.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setOpenMenu(null);
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : section.href ? (
                      <Link
                        href={section.href}
                        className="block px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {section.label}
                      </Link>
                    ) : null}
                  </div>
                );
              })}

              {/* Action Buttons */}
              <div className="border-t pt-4 space-y-3">
                <Link
                  href="/dashboard"
                  className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
