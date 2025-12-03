// app/programs/barber-apprenticeship/page.tsx
import Link from "next/link";

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Program | Registered Apprenticeship
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Barber Apprenticeship – Federally Aligned, State-Licensed Pathway
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Become a licensed barber through a federal and state–aligned
            apprenticeship program that combines classroom instruction, real
            shop experience, and direct support toward state licensure—with
            funding options that can remove the need for student loans.
          </p>
        </header>

        {/* Overview */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Program Overview</h2>
          <p className="mt-3 text-sm text-slate-700">
            The Elevate for Humanity Barber Apprenticeship is structured as a{" "}
            <span className="font-medium">
              U.S. Department of Labor Registered Apprenticeship
            </span>{" "}
            and aligned with Indiana state barber licensure requirements. The
            program blends classroom learning, supervised on-the-job training,
            and entrepreneurship skills to help you build a sustainable career in
            the grooming industry.
          </p>
          <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-900">Format</dt>
              <dd className="mt-1 text-slate-700">
                Classroom instruction + hands-on training in active
                barbershops/partner locations
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Length</dt>
              <dd className="mt-1 text-slate-700">
                2,000 hours (meets Indiana barber licensure requirements)
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Location</dt>
              <dd className="mt-1 text-slate-700">
                Indianapolis, IN and partner shop locations
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Funding Options</dt>
              <dd className="mt-1 text-slate-700">
                WIOA, Workforce Ready Grant (where eligible), JRI, employer
                sponsorship, and apprenticeship-related funding streams.
              </dd>
            </div>
          </dl>
        </section>

        {/* What you'll learn */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900">
            What You&apos;ll Learn
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            This apprenticeship prepares you with the technical, professional,
            and business skills needed to succeed as a licensed barber and
            potential shop or suite owner.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs">
            <ul className="space-y-1.5 text-slate-700">
              <li>• Classic and modern haircuts, fades, tapers, and designs</li>
              <li>• Beard shaping, shaving, and grooming services</li>
              <li>• Sanitation, infection control, and state board standards</li>
              <li>• Client consultation and customer service</li>
            </ul>
            <ul className="space-y-1.5 text-slate-700">
              <li>• Shop management, scheduling, and managing client flow</li>
              <li>• Intro to marketing, branding, and building clientele</li>
              <li>• Suite ownership and small business basics</li>
              <li>• State licensing exam preparation and practice</li>
            </ul>
          </div>
        </section>

        {/* Why this program is different */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Why This Apprenticeship is Different
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Federally aligned:</span> Structured
              as a DOL Registered Apprenticeship and listed in RAPIDS.
            </li>
            <li>
              <span className="font-semibold">State-licensure focused:</span>{" "}
              Built to meet Indiana barbering requirements and prepare you for
              the licensing exam.
            </li>
            <li>
              <span className="font-semibold">Workforce-funded:</span> Eligible
              for WIOA, WRG (where applicable), JRI, and other workforce funding
              streams, potentially reducing or eliminating tuition costs.
            </li>
            <li>
              <span className="font-semibold">Earn while you learn:</span> Paid
              apprenticeship opportunities may be available with partner shops.
            </li>
            <li>
              <span className="font-semibold">Second-chance friendly:</span>{" "}
              Structured to work with re-entry programs and justice-involved
              participants who qualify for JRI support.
            </li>
          </ul>
        </section>

        {/* Who it's for */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Who This Program is For
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            This program is designed for individuals who:
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            <li>• Want a hands-on, creative career in the grooming industry</li>
            <li>• Are serious about earning a state-recognized barber license</li>
            <li>• Prefer earning while learning instead of traditional student
              loans</li>
            <li>• May be re-entering the workforce or rebuilding after setbacks</li>
            <li>• Dream of owning a barbershop, suite, or mobile grooming brand</li>
          </ul>
        </section>

        {/* How to enroll */}
        <section className="mb-10 rounded-2xl bg-slate-900 p-5 text-white">
          <h2 className="text-lg font-semibold">How to Get Started</h2>
          <ol className="mt-3 space-y-2 text-xs text-slate-100">
            <li>
              <span className="font-semibold">1. Apply online:</span> Complete
              the Elevate application and select Barber Apprenticeship as your
              program of interest.
            </li>
            <li>
              <span className="font-semibold">2. Meet with an advisor:</span>{" "}
              Review your goals, background, and eligibility for funding (WIOA,
              WRG, JRI, and employer-supported options).
            </li>
            <li>
              <span className="font-semibold">3. Secure funding &amp; enroll:</span>{" "}
              We work with workforce partners and employers to help reduce or
              remove tuition costs where possible.
            </li>
            <li>
              <span className="font-semibold">
                4. Begin your apprenticeship:
              </span>{" "}
              Start training in class and in the shop with a clear plan for
              licensure and career placement.
            </li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Apply for Barber Apprenticeship
            </Link>
            <Link
              href="/advising"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Talk With an Advisor
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
