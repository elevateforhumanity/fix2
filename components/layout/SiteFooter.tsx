import Link from "next/link";
import { footerSections } from "@/config/navigation";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand / address column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm">
                EFH
              </span>
              <div>
                <div className="font-semibold text-slate-900 text-sm">
                  Elevate For Humanity
                </div>
                <div className="text-xs text-slate-500">
                  Career & Technical Institute
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              100% FREE career training through WIOA, WRG, and JRI funding. No
              tuition, no debt. Real jobs waiting in Indianapolis, IN.
            </p>

            <p className="text-xs text-slate-500">
              8888 Keystone Crossing Suite 1300
              <br />
              Indianapolis, IN 46240
              <br />
              <a href="tel:317-314-3757" className="hover:text-orange-600">(317) 314-3757</a>
            </p>

            <Link
              href="/contact"
              className="inline-flex text-xs font-medium text-orange-600 hover:text-orange-700"
            >
              Contact Us →
            </Link>

            <Link
              href="/sitemap-page"
              className="block text-[11px] font-semibold text-slate-600 hover:text-orange-700 mt-2"
            >
              View Full Site Map ({footerSections.reduce(
                (n, s) => n + s.items.length,
                0
              )}{" "}
              pages)
            </Link>
          </div>

          {/* Key sections only - compact */}
          <div className="lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {footerSections.slice(0, 8).map((section) => (
                <div key={section.id} className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {section.title}
                  </h3>
                  <ul className="space-y-0.5 text-xs">
                    {section.items.slice(0, 6).map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-slate-700 hover:text-orange-700 hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    {section.items.length > 6 && (
                      <li>
                        <Link
                          href="/sitemap-page"
                          className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                        >
                          +{section.items.length - 6} more →
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {year} Elevate For Humanity. All rights reserved. Empowering
            communities through workforce development.
          </p>
          <p className="text-[10px]">
            ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
          </p>
        </div>
      </div>
    </footer>
  );
}
