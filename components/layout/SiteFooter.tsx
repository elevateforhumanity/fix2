import Link from 'next/link';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:justify-between">
        {/* Brand + mission */}
        <div className="max-w-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 font-bold text-xs text-white">
              EFH
            </div>
            <div>
              <p className="text-sm font-semibold">Elevate For Humanity</p>
              <p className="text-xs text-slate-400">Career & Technical Institute</p>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Free and funded career training, built for real life. We connect job seekers, employers, and community
            partners through state-funded workforce programs and employer-backed training pathways.
          </p>
          <p className="text-[11px] text-slate-400">
            A workforce development program of SELFISH INC, an IRS-recognized 501(c)(3) public charity. Official
            documentation available upon request.
          </p>
        </div>

        {/* Columns */}
        <div className="grid flex-1 gap-8 text-xs md:grid-cols-3">
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Programs</h4>
            <ul className="space-y-1 text-slate-300">
              <li><Link href="/programs" className="hover:text-white">View All Programs</Link></li>
              <li><Link href="/programs/medical-assistant" className="hover:text-white">Medical Assistant</Link></li>
              <li><Link href="/programs/barber-apprenticeship" className="hover:text-white">Barber Apprenticeship</Link></li>
              <li><Link href="/programs/hvac-technician" className="hover:text-white">HVAC Technician</Link></li>
              <li><Link href="/programs/workforce-readiness" className="hover:text-white">Workforce Readiness & Re-Entry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Funding & Partners
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li><Link href="/financial-aid" className="hover:text-white">Funding Options (WRG, WIOA, Apprenticeship)</Link></li>
              <li><Link href="/employer" className="hover:text-white">Employers & OJT / WEX</Link></li>
              <li><Link href="/partner-application" className="hover:text-white">Become a Program Partner</Link></li>
              <li><a href="https://intraining.dwd.in.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Indiana ETPL</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Platform & Legal
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li><Link href="/login" className="hover:text-white">Student Portal</Link></li>
              <li><Link href="/admin" className="hover:text-white">Admin Portal</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white">Terms of Use</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p className="text-[11px] text-slate-500">
            © {currentYear} Elevate For Humanity. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>ByBlack Certified</span>
            <span>NRF Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
