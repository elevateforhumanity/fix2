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
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
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
                <div
                  key={section.label}
                  className="relative"
                  data-dropdown
                >
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
                    <ChevronDown className={classNames(
                      'h-4 w-4 transition-transform',
                      isOpen && 'rotate-180'
                    )} />
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
          <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="font-semibold text-slate-900">Menu</div>
              <button
                className="rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <span className="text-xl font-bold">✕</span>
              </button>
            </div>

            {/* Scrollable content */}
            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
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
                        className="mt-2 block text-sm text-blue-600 font-semibold py-2 px-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition min-h-[44px] flex items-center"
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

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-3 px-4 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-3 px-4 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
