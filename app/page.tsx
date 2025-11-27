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

      {/* Government Approvals */}
      <section className="border-t border-slate-100 bg-blue-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Approved Workforce Training Provider
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">DOL</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900">DOL Sponsored</p>
                <p className="text-[10px] text-slate-600">Dept. of Labor Approved</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900">WIOA Approved</p>
                <p className="text-[10px] text-slate-600">Federal Workforce Funding</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">WRG</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900">WRG Authorized</p>
                <p className="text-[10px] text-slate-600">Indiana Workforce Ready Grants</p>
              </div>
            </div>
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

      {/* Holistic Support Services */}
      <section className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Complete Support System
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Beyond Career Training
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
              We believe in supporting the whole person. Access mental wellness and physical health resources 
              through our partner organizations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-bold">S</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Selfish Inc - Mental Wellness
                  </h3>
                  <p className="text-xs text-slate-600">Trauma, Divorce & Addiction Support</p>
                </div>
              </div>
              <p className="text-xs text-slate-700">
                Free mental health support including trauma recovery, divorce counseling, and addiction 
                programs. Because career success starts with mental wellness.
              </p>
              <Link
                href="/selfish-inc"
                className="mt-3 inline-block text-xs font-semibold text-purple-600 hover:underline"
              >
                Learn About Mental Wellness Support →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-pink-600 text-lg font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Curvature - Physical Wellness
                  </h3>
                  <p className="text-xs text-slate-600">Body Confidence & Self-Care</p>
                </div>
              </div>
              <p className="text-xs text-slate-700">
                Non-invasive body wellness services supporting physical health and confidence. 
                Feel your best as you pursue your career goals.
              </p>
              <a
                href="https://curvaturebodysculpting.store"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-pink-600 hover:underline"
              >
                Explore Wellness Services →
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              <strong>Mind + Body + Career</strong> = Complete transformation and lasting success
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
