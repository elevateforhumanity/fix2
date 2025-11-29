import Link from "next/link";

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-800">
            Elevate For Humanity
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Free and funded career training, built for real life.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/programs" className="hover:text-red-600">
            Programs
          </Link>
          <Link href="/funding" className="hover:text-red-600">
            Funding Options
          </Link>
          <Link href="/employers" className="hover:text-red-600">
            Employers
          </Link>
          <Link href="/about" className="hover:text-red-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-red-600">
            Contact
          </Link>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-red-600">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-red-600">
            Terms of Use
          </Link>
          <Link href="/refund-policy" className="hover:text-red-600">
            Refund Policy
          </Link>
        </div>
      </div>

      {/* SELFISH INC Family of Services */}
      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-6">
        <div className="text-center">
          <p className="text-xs font-semibold text-slate-700">Part of the SELFISH INC Family of Services</p>
          <div className="mt-4 grid gap-4 text-left md:grid-cols-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Career Training</h3>
              <p className="mt-1 text-[11px] text-slate-600">
                <strong>Elevate for Humanity Training Center</strong>
                <br />
                ETPL Provider ID: 10000949
                <br />
                20+ workforce development programs
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Mental Wellness</h3>
              <p className="mt-1 text-[11px] text-slate-600">
                <strong>Selfish Inc Mental Wellness</strong>
                <br />
                Trauma recovery, divorce support, addiction services
                <br />
                <a href="https://www.selfishinc.org" className="text-red-600 hover:underline">
                  selfishinc.org
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Financial Literacy</h3>
              <p className="mt-1 text-[11px] text-slate-600">
                <strong>RISE Forward Foundation</strong>
                <br />
                IRS-certified VITA tax preparation training & business courses
              </p>
            </div>
          </div>
          <div className="mt-4 border-t border-slate-200 pt-4">
            <p className="text-[11px] text-slate-500">
              <strong>Physical Wellness Partner:</strong> Curvature Body Sculpting - Body contouring and wellness services
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-4">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="text-center text-[11px] text-slate-500 md:text-left">
            <p className="font-semibold text-slate-700">© {currentYear} Elevate For Humanity. All Rights Reserved.</p>
            <p className="mt-1">All content, code, and intellectual property protected by U.S. and international copyright law.</p>
            <p className="mt-1">A workforce development program of <strong>SELFISH INC</strong>, a 501(c)(3) nonprofit organization</p>
            <p className="mt-1 text-[10px]">Unauthorized copying, scraping, or reproduction prohibited. <Link href="/terms-of-service" className="underline hover:text-red-600">Terms of Service</Link></p>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">✓</span>
              </div>
              <span>ByBlack Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white text-[7px] font-bold">NRF</span>
              </div>
              <span>NRF Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
