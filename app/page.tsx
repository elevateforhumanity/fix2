import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description:
    "100% free workforce training through WIOA funding. CNA, HVAC, Barber, Tax Prep and more. Real jobs, real credentials, no tuition.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto grid gap-8 px-4 py-12 lg:grid-cols-2 items-center">
          {/* Text side */}
          <div>
            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              100% Free Training
            </span>
            <h1 className="mt-4 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Career Training That Leads to Real Jobs
            </h1>
            <p className="mt-4 text-base lg:text-lg text-slate-700">
              Free workforce training through WIOA funding. No tuition, no debt. 
              Learn healthcare, skilled trades, beauty, business, and more with job placement support.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:border-red-600 hover:text-red-600 transition-colors"
              >
                Browse Programs
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Indianapolis residents may qualify for Workforce Ready Grants, WIOA funding, or paid apprenticeships.
            </p>
          </div>

          {/* Image side */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/facilities-new/facility-1.jpg"
              alt="Elevate for Humanity training facility"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Who We Serve
          </h2>
          <p className="mt-2 text-sm text-slate-600 text-center max-w-2xl mx-auto">
            Elevate for Humanity connects job seekers, employers, and community partners 
            through state-funded workforce training.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Job Seekers</h3>
              <p className="mt-2 text-sm text-slate-700">
                Get free training, earn credentials, and connect with employers hiring in Indianapolis.
              </p>
            </div>

            <div className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Employers</h3>
              <p className="mt-2 text-sm text-slate-700">
                Access trained, job-ready candidates and build your workforce pipeline.
              </p>
            </div>

            <div className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Community Partners</h3>
              <p className="mt-2 text-sm text-slate-700">
                Workforce boards, case managers, and nonprofits helping people access training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                State-Funded Training Programs
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Free or low-cost training through WIOA, Workforce Ready Grants, and apprenticeships.
              </p>
            </div>
            <Link
              href="/programs"
              className="hidden md:inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View All Programs →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* CNA */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/programs-new/program-1.jpg"
                  alt="CNA Training Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">CNA & Healthcare</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Train for Certified Nursing Assistant roles with hands-on clinical experience and job placement.
                </p>
                <Link
                  href="/programs/cna"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Learn More →
                </Link>
              </div>
            </article>

            {/* HVAC */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/programs-new/program-3.jpg"
                  alt="HVAC Training Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">HVAC & Building Tech</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Hands-on training for high-paying technical careers in heating, cooling, and building systems.
                </p>
                <Link
                  href="/programs/hvac"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Learn More →
                </Link>
              </div>
            </article>

            {/* Barber */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/programs/efh-barber-hero.jpg"
                  alt="Barber Apprenticeship Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">Barber Apprenticeship</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Earn while you learn with licensed barbers. FREE apprenticeship with real shop experience.
                </p>
                <Link
                  href="/programs/barber"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Learn More →
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link
              href="/programs"
              className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View All 20+ Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-slate-600 text-center max-w-2xl mx-auto">
            Three simple steps from application to employment
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Choose Your Path</h3>
              <p className="mt-2 text-sm text-slate-700">
                Browse 20+ programs in healthcare, trades, beauty, business, and more. All mapped to real jobs.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Get Funded</h3>
              <p className="mt-2 text-sm text-slate-700">
                We help you access WIOA, Workforce Ready Grants, apprenticeships, and employer sponsorships.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Start Working</h3>
              <p className="mt-2 text-sm text-slate-700">
                Complete training, earn credentials, and connect with employers ready to hire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Real Results, Real Impact
          </h2>
          <p className="mt-2 text-sm text-slate-600 text-center">
            Our programs connect people to careers that change lives
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">500+</div>
              <div className="mt-2 text-sm text-slate-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">85%</div>
              <div className="mt-2 text-sm text-slate-600">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">78%</div>
              <div className="mt-2 text-sm text-slate-600">Job Placement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">$18/hr</div>
              <div className="mt-2 text-sm text-slate-600">Avg Starting Wage</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Start Your Career Journey?
          </h2>
          <p className="mt-4 text-lg text-red-50">
            One application. Multiple programs, funding options, and partner pathways. 
            We'll walk it with you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              Start Application
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
