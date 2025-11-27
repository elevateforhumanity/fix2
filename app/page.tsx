import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Elevate For Humanity
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-4xl">
            Free and funded career training that leads to real jobs.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            We connect you to approved training, workforce grants, and employers
            so you can start a new career in healthcare, trades, beauty, business, and more.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Apply Now
            </Link>
            <Link
              href="/funding"
              className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-800 hover:border-red-300"
            >
              How Funding Works
            </Link>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Indiana residents may qualify for Workforce Ready Grants, WIOA funding, or paid apprenticeships.
          </p>
        </div>
      </section>

      {/* 3 highlights */}
      <section className="py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold text-red-600">Programs</p>
            <h2 className="mt-1 text-sm font-semibold text-slate-900">
              20+ Career Pathways
            </h2>
            <p className="mt-1 text-xs text-slate-700">
              CNA, HVAC, Building Maintenance, Barber, CDL, Tax Prep, and more.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold text-orange-500">Funding</p>
            <h2 className="mt-1 text-sm font-semibold text-slate-900">
              Grants & Paid Training
            </h2>
            <p className="mt-1 text-xs text-slate-700">
              Many programs are covered through state and federal workforce funding.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold text-blue-600">Support</p>
            <h2 className="mt-1 text-sm font-semibold text-slate-900">
              Case Management & Employers
            </h2>
            <p className="mt-1 text-xs text-slate-700">
              We work with workforce boards, case managers, and employers to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t border-slate-100 bg-slate-50 py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900">ByBlack Certified</p>
                <p className="text-[10px] text-slate-600">Black-Owned Business</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">NRF</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900">NRF Foundation Partner</p>
                <p className="text-[10px] text-slate-600">RISE Up Training Provider</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
