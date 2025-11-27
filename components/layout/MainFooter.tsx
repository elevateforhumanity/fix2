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
          <p className="mt-2 text-[11px] text-slate-500">
            7009 East 56th Street, Suite EE1<br />
            Indianapolis, IN 46226
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            <a href="tel:+13173143757" className="hover:text-red-600">
              (317) 314-3757
            </a>
            {" • "}
            <a href="mailto:elevate4humanityedu@gmail.com" className="hover:text-red-600">
              elevate4humanityedu@gmail.com
            </a>
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
          <Link href="/privacy-policy" className="hover:text-red-600">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-red-600">
            Terms of Service
          </Link>
          <Link href="/refundpolicy" className="hover:text-red-600">
            Refund Policy
          </Link>
        </div>
      </div>

      
      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-4">
        <div className="text-center text-[11px] text-slate-500">
          © {currentYear} 2EXCLUSIVE LLC-S d/b/a Elevate For Humanity. All rights reserved.
          <br />
          <span className="text-[10px]">
            EIN: 88-2609728 • UEI: VX2GK5S8SZH8 • CAGE: 0QH19 • SAM.gov Registered
          </span>
          <br />
          <span className="text-[10px]">
            Elevate Ecosystem Partners: RISE Foundation/SELFISH INC (501(c)(3) EIN: 99-3483511, UEI: H3NUZZ6BMDA7, CAGE: 0Q856) • Curvature Body Sculpting LLC (EIN: 92-2314136, UEI: RNXZUZW7FA63, CAGE: 9XV55)
          </span>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
