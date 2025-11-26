import Link from "next/link";

export default function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.svg" 
                alt="Elevate For Humanity" 
                className="h-10 w-auto"
              />
              <span className="text-base font-semibold text-slate-900">
                Elevate For Humanity
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Workforce training and career pathways for adults, working families, and returning citizens.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs" className="text-slate-600 hover:text-orange-500">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/funding" className="text-slate-600 hover:text-orange-500">
                  Funding
                </Link>
              </li>
              <li>
                <Link href="/student-portal" className="text-slate-600 hover:text-orange-500">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/staff-portal" className="text-slate-600 hover:text-orange-500">
                  Staff & Program Holders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-orange-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-orange-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Legal & Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-orange-500">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-slate-600 hover:text-orange-500">
                  Refund Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@elevateforhumanity.org"
                  className="text-slate-600 hover:text-orange-500"
                >
                  info@elevateforhumanity.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © {currentYear} Elevate For Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
