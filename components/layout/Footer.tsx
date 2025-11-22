// components/layout/Footer.tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-4 text-xs text-slate-300">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 text-xs font-black uppercase">
                EFH
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Elevate For Humanity
                </div>
                <div className="text-[11px] text-slate-400">
                  Career &amp; Technical Institute
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs">
              Workforce-aligned training, barrier-aware support, and employer
              partnerships — starting in Marion County and expanding as
              approvals are added.
            </p>
          </div>

          {/* Learners */}
          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Learners
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/apply"
                  className="hover:text-emerald-300 transition"
                >
                  Apply / Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/directory"
                  className="hover:text-emerald-300 transition"
                >
                  Explore Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="hover:text-emerald-300 transition"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-emerald-300 transition"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers & Workforce */}
          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Employers &amp; Partners
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/employers"
                  className="hover:text-emerald-300 transition"
                >
                  Employer Partnerships
                </Link>
              </li>
              <li>
                <Link
                  href="/partners/workforce"
                  className="hover:text-emerald-300 transition"
                >
                  Workforce &amp; Case Managers
                </Link>
              </li>
              <li>
                <Link
                  href="/ojt-and-funding"
                  className="hover:text-emerald-300 transition"
                >
                  OJT, WEX &amp; Funding Options
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-300 transition"
                >
                  Request a Meeting
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / App */}
          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Support &amp; Platform
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/help"
                  className="hover:text-emerald-300 transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-emerald-300 transition"
                >
                  Community &amp; Events
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-app"
                  className="hover:text-emerald-300 transition"
                >
                  Mobile App
                </Link>
              </li>
              <li className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} Elevate For Humanity. All rights
                reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
