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
              Connect With Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lms" className="text-slate-600 hover:text-orange-500">
                  Learning Portal (LMS)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-orange-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/elevateforhumanity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-orange-500 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/elevate-for-humanity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-orange-500 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
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
                  href="mailto:Elevate4humanityedu@gmail.com"
                  className="text-slate-600 hover:text-orange-500"
                >
                  Elevate4humanityedu@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-8 border-t border-slate-200 pt-6 space-y-3">
          <div className="text-center text-xs text-slate-500">
            © {currentYear} Elevate For Humanity. All rights reserved.
          </div>
          
          {/* Partner Disclaimer */}
          <div className="text-center text-xs text-slate-400 max-w-4xl mx-auto">
            <p>
              Elevate for Humanity is an independent training provider. We partner with industry-leading 
              credential providers including Milady, HSI, CareerSafe, Choice Medical Institute, National Drug, 
              Certiport, IRS VITA, and others. All partner names and trademarks are property of their respective 
              owners and are used for descriptive purposes only. Elevate for Humanity is not owned by or 
              affiliated with these organizations beyond our educational partnerships.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <Link href="/terms" className="hover:text-orange-500">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-orange-500">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/copyright" className="hover:text-orange-500">
              Copyright Notice
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-orange-500">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
