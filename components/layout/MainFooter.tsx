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

      
      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-4">
        <div className="text-center text-[11px] text-slate-500">
          © {currentYear} Elevate For Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
