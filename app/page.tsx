import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import PartnerLogos from '@/components/marketing/PartnerLogos';
import SuccessStoryCards from '@/components/marketing/SuccessStoryCards';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Free Career Training &amp; Apprenticeships Indiana',
  description: 'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more. Get trained, get hired, get paid. No cost, no debt.',
  keywords: [
    'free career training Indianapolis',
    'WIOA programs Indiana',
    'free job training Indianapolis',
    'apprenticeship programs Indiana',
    'free CNA training',
    'free CDL training',
    'free barber school',
    'workforce development Indianapolis',
    'job placement assistance',
    'career change programs',
  ],
  openGraph: {
    title: 'Elevate for Humanity | Free Career Training Indiana',
    description: 'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    images: [
      {
        url: 'https://www.elevateforhumanity.org/images/heroes/hero-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Free Career Training',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity | Free Career Training Indiana',
    description: 'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more.',
    images: ['https://www.elevateforhumanity.org/images/heroes/hero-homepage.jpg'],
  },
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
};

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. HERO BANNER - Static image hero */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 pb-10">
        <div className="relative w-full overflow-hidden rounded-3xl">
          <div className="relative h-[520px] w-full md:h-[600px]">
            <Image
              src="/images/heroes/hero-homepage.jpg"
              alt="Elevate for Humanity - Free Career Training"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Headline and CTAs BELOW the banner */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900">
            Funded Workforce Training for Adults &amp; Working Families
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-700">
            No tuition upfront. Apply now for state-aligned training paths in healthcare, trades, business, and technology.
          </p>
          
          {/* Quick Eligibility Bullets */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>WIOA-Funded Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Job Placement Assistance</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Industry Credentials</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/enroll"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-zinc-800 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 bg-white px-8 py-4 text-base font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              View Programs
            </Link>
            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 bg-white px-8 py-4 text-base font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PERSONA ROUTING - Clear Audience Lanes */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 mb-12">
            Choose Your Path
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="border-2 border-zinc-200 rounded-2xl p-8 hover:border-zinc-900 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">For Students</h3>
              <p className="text-zinc-600 mb-6">
                Free training programs with job placement assistance. No tuition, no debt.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>WIOA-funded programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Industry credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Job placement support</span>
                </li>
              </ul>
              <Link
                href="/enroll"
                className="block w-full text-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                Apply Now
              </Link>
            </div>

            {/* Employers */}
            <div className="border-2 border-zinc-200 rounded-2xl p-8 hover:border-zinc-900 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">For Employers</h3>
              <p className="text-zinc-600 mb-6">
                Access trained, job-ready candidates. Partner with us to build your workforce.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Pre-screened candidates</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Custom training programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No hiring fees</span>
                </li>
              </ul>
              <Link
                href="/employers"
                className="block w-full text-center rounded-xl border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Partner With Us
              </Link>
            </div>

            {/* Agencies/Partners */}
            <div className="border-2 border-zinc-200 rounded-2xl p-8 hover:border-zinc-900 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">For Agencies &amp; Partners</h3>
              <p className="text-zinc-600 mb-6">
                Compliance-ready reporting and outcomes tracking for workforce boards and funders.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>WIOA compliance reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Outcome metrics tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Audit-ready documentation</span>
                </li>
              </ul>
              <Link
                href="/partners"
                className="block w-full text-center rounded-xl border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREDENTIAL BANNER - Subtle, Professional */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 border-y border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm text-zinc-600 mb-4">
            Programs aligned with credentialing and workforce requirements
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* IRS VITA/TCE */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-700">IRS VITA/TCE Certified</span>
            </div>
            {/* WIOA Aligned */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-700">WIOA Aligned</span>
            </div>
            {/* ACCET Accredited */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-700">ACCET Accredited</span>
            </div>
            {/* Registered Apprenticeships */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-700">Registered Apprenticeships</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. STATS SECTION - Social Proof */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-orange-600">10,000+</div>
              <div className="text-sm md:text-base text-slate-700 mt-2">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-orange-600">80%</div>
              <div className="text-sm md:text-base text-slate-700 mt-2">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-orange-600">$45K</div>
              <div className="text-sm md:text-base text-slate-700 mt-2">Average Starting Salary</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-orange-600">500+</div>
              <div className="text-sm md:text-base text-slate-700 mt-2">Employer Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.6. PARTNER LOGOS */}
      <PartnerLogos />

      {/* 3. PLATFORM LICENSING (Moved below primary paths) */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4">
            License the Platform
          </h2>
          <p className="text-lg text-zinc-700 mb-8">
            Deploy a complete workforce operating system for your organization, school, or agency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/platform"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-8 py-4 text-base font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              View Licensing Options
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-900 bg-white px-8 py-4 text-base font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 STEPS) */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            How It Works
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="text-3xl font-black text-zinc-900">1</div>
              <h3 className="mt-3 text-lg font-black text-zinc-900">Enroll</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Students apply once and are matched to training, funding, and
                support services.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="text-3xl font-black text-zinc-900">2</div>
              <h3 className="mt-3 text-lg font-black text-zinc-900">Train</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Hybrid learning, apprenticeships, and hands-on experience —
                tracked in real time.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="text-3xl font-black text-zinc-900">3</div>
              <h3 className="mt-3 text-lg font-black text-zinc-900">
                Report Outcomes
              </h3>
              <p className="mt-2 text-sm text-zinc-700">
                Completion, credentials, placements, and funding reports — ready
                for boards and agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 ELEVATION VIDEO - This Is Not Graduation, This Is Elevation */}
      <section className="w-full bg-slate-900 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-8">
            This Is Not Graduation. This Is Elevation.
          </h2>
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/artlist/hero-training-4.jpg"
              alt="Training providers and workforce solutions"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 4. STUDENT OUTCOMES & SUPPORT */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-zinc-200">
            <Image
              src="/images/artlist/hero-training-5.jpg"
              alt="Student outcomes and support"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              We support the whole learner — not just enrollment.
            </h2>
            <ul className="mt-6 space-y-3 text-zinc-700">
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Career training</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Case management</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Funding navigation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Credential tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Employer connections</span>
              </li>
            </ul>
            <p className="mt-6 text-zinc-700 font-medium">
              Built for real people, real barriers, and real outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. EMPLOYERS & WORKFORCE BOARDS */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              Designed to meet compliance, reporting, and accountability
              requirements.
            </h2>
            <ul className="mt-6 space-y-3 text-zinc-700">
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>WIOA / WRG / JRI aligned</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Registered Apprenticeship compatible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Employer-validated skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Board-ready reporting</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Secure, auditable data</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-zinc-200">
            <Image
              src="/images/artlist/hero-training-6.jpg"
              alt="Employers and workforce boards"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. THE PLATFORM (WHAT YOU'RE LICENSING) */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            This is not just a school website.
          </h2>
          <p className="mt-3 text-xl text-zinc-700 font-semibold">
            It's a Workforce Operating System.
          </p>

          <div className="mt-8 grid md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                Multi-tenant
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                Config-driven
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                License-enforced
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                White-label ready
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                Secure by design
              </div>
            </div>
          </div>

          <p className="mt-6 text-zinc-700">
            Used by training providers, employers, nonprofits, and agencies.
          </p>

          <div className="mt-8">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-6 py-3 font-extrabold hover:bg-zinc-800 inline-flex transition"
              href="/platform"
            >
              View Licensing
            </Link>
          </div>
        </div>
      </section>

      {/* 7. COMPLIANCE & TRUST */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Compliance & Trust
          </h2>

          <div className="mt-8 grid md:grid-cols-2 gap-4 text-left">
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Workforce Innovation & Opportunity Act (WIOA)
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Registered Apprenticeship Programs
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Employer & Board Reporting
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  FERPA-aware student data handling
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Role-based access & RLS security
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Secure, auditable platform
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. SUCCESS STORIES */}
      <SuccessStoryCards />

      {/* 8. FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Start training. Start partnering. Or license the platform.
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-6 py-3 font-extrabold hover:bg-zinc-800 inline-flex justify-center transition"
              href="/apply"
            >
              Apply for Training
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-6 py-3 font-extrabold hover:bg-zinc-50 inline-flex justify-center transition"
              href="/platform"
            >
              License the Platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
