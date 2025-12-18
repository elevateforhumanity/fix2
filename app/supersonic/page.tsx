import { Metadata } from 'next';

import Image from 'next/image';

import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title:
    'Supersonic Tax Service - Tax Refund Advance Indianapolis | Same Day Cash Advance',
  description:
    'Get your tax refund advance in Indianapolis TODAY! Same-day cash advances on your tax return. No waiting for IRS. Fast tax refund loans and anticipation loans in Indianapolis, IN. Walk in, walk out with cash!',
  keywords:
    'tax refund advance Indianapolis, tax refund loan Indianapolis, fast cash advance, same day tax refund, tax anticipation loan, Indianapolis tax services, quick tax refund, refund advance Indiana, tax cash advance near me, Indianapolis IN',
  openGraph: {
    title: 'Supersonic Tax Service - Same Day Tax Refund Advance Indianapolis',
    description:
      'Get cash TODAY! Tax refund advances in Indianapolis. No waiting for IRS. Fast, reliable service.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Supersonic Tax Service',
    url: 'https://elevateforhumanity.org/supersonic',
  },

  alternates: {
    canonical: 'https://elevateforhumanity.org/supersonic',
  },
};

export default function SupersonicFastCashPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Supersonic Tax Service',
    description:
      'Tax refund advance and cash advance services in Indianapolis. Same-day refund anticipation loans from $250 to $7,500.',
    url: 'https://elevateforhumanity.org/supersonic',
    telephone: '+1-317-314-3757',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8888 Keystone Crossing Suite 1300',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46240',
      addressCounstart: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '39.9186',
      longitude: '-86.1139',
    },
    areaServed: {
      '@type': 'City',
      name: 'Indianapolis',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: ['https://www.facebook.com/share/14NGKwHMrdq/'],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative min-h-[700px] flex items-center    ">
        <div className="absolute inset-0 opacity-10">
          {/* Hero Section */}
          <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
            <Image
              src="/images/gallery/image8.jpg"
              alt="Hero"
              fill
              className="object-cover"
              quality={100}
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0   " />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome</h1>
              <p className="text-base md:text-lg mb-8 text-gray-100">
                Transform your career with free training
              </p>
            </div>
          </section>

          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] bg-repeat" />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
                SUPERSONIC
                <span className="block text-yellow-400">FAST CASH</span>
              </h1>
              <p className="text-3xl md:text-4xl font-bold text-blue-200">
                Tax Refund Cash Advance - Same Day!
              </p>
            </div>

            <p className="text-base md:text-lg mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto">
              <strong className="text-yellow-400">Get Cash TODAY!</strong> Tax
              refund advances and anticipation loans in Indianapolis. Don't wait
              for the IRS - walk in with your documents, walk out with cash.
              Professional tax preparation with instant refund advances
              available!
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a
                href="https://calendly.com/supersonicfastcash/tax-appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 transition text-xl shadow-2xl"
              >
                BOOK APPOINTMENT NOW
              </a>
              <Link
                href="/supersonic/upload"
                className="px-10 py-5 bg-white text-blue-900 font-bold rounded-full hover:bg-slate-100 transition text-xl shadow-2xl"
              >
                UPLOAD DOCUMENTS
              </Link>
              <a
                href="https://www.facebook.com/share/14NGKwHMrdq/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition text-xl shadow-2xl"
              >
                VISIT US ON FACEBOOK
              </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-bold">IRS E-File Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-bold">Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-bold">Refund in 24-48 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Refund Options - EPS Partnership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Tax Refund Cash Advances - Get Money TODAY!
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-4">
                Powered by EPS Financial & Pathward Bank - Over $2 Billion in
                Taxpayer Advances
              </p>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                <strong>Don't wait weeks for the IRS!</strong> Get a cash
                advance on your tax refund the same day. Loans from $250 to
                $7,500 available to qualified taxpayers. Walk in, get approved,
                walk out with cash!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* E-Collect */}
              <div className="   rounded-2xl p-8 shadow-xl border-2 border-blue-200">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-sm mb-4">
                    LOW COST
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    E-Collect
                  </h3>
                  <p className="text-lg font-bold text-blue-600">Only $20</p>
                </div>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Simple, low-cost refund transfer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Pay tax prep fees from your refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Get refund in 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Direct deposit or prepaid card</span>
                  </li>
                </ul>
              </div>

              {/* E-Advance - CASH ADVANCE */}
              <div className="   rounded-2xl p-8 shadow-xl border-4 border-green-400">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-green-600 text-white font-bold rounded-full text-sm mb-4">
                    💰 CASH ADVANCE - MOST POPULAR
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    Refund Advance Loan
                  </h3>
                  <p className="text-lg font-bold text-green-600">
                    $250 - $7,500 Same Day!
                  </p>
                </div>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      <strong>CASH ADVANCE on your tax refund</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Get money TODAY - don't wait for IRS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Loans: $250, $500, $1,000, or up to $7,500</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>0% APR on $250-$1,000 loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Subject to approval - high approval rates</span>
                  </li>
                </ul>
              </div>

              {/* FasterMoney Card */}
              <div className="   rounded-2xl p-8 shadow-xl border-2 border-purple-200">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-purple-600 text-white font-bold rounded-full text-sm mb-4">
                    FASTEST
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    FasterMoney®
                  </h3>
                  <p className="text-lg font-bold text-purple-600">
                    Visa® Prepaid Card
                  </p>
                </div>
                <ul className="space-y-3 text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      <strong>Refund up to 4 days early</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Use anywhere Visa is accepted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>No bank account needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Secure and convenient</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-slate-600 mb-4">
                Powered by <strong>EPS Financial</strong> and{' '}
                <strong>Pathward®, N.A.</strong> - Member FDIC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              Who Qualifies for Refund Advance Loans?
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
              <h3 className="text-lg md:text-lg font-bold text-blue-800 mb-6">
                Loan Qualification Requirements
              </h3>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Expected Tax Refund:</strong> Must have an expected
                    federal tax refund. Loan amounts based on refund size.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Valid ID:</strong> Government-issued photo
                    identification required
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Tax Documents:</strong> W-2s, 1099s, and other
                    income documents
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Subject to Approval:</strong> Underwriting standards
                    apply. High approval rates for qualified applicants.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Loan Options:</strong> $250, $500, $1,000 (0% APR)
                    or 25%, 50%, 75% of expected refund up to $7,500 (36% APR)
                  </span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-lg text-slate-700 mb-6">
                <strong>Ready to get your cash advance?</strong> Book an
                appointment or upload your documents to start now today!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://calendly.com/supersonicfastcash/tax-appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition"
                >
                  Book Appointment
                </a>
                <Link
                  href="/supersonic/upload"
                  className="px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                >
                  Upload Documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
              Our Services
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-4">
                  Tax Preparation
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Individual tax returns (1040)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Self-employment income (Schedule C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Rental property income (Schedule E)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Investment income and capital gains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>All tax credits and deductions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-4">
                  Financial Services
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Rapid refund processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Refund advance loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Prepaid debit cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Check cashing services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Payment processing (credit/debit)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powered By */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg md:text-lg font-bold text-center text-slate-900 mb-8">
              Powered By Indusstart Leaders
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center p-8 bg-slate-50 rounded-xl">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  EPS Financial
                </h4>
                <p className="text-slate-600 text-sm">
                  Trusted by 44,000+ tax offices nationwide. Indusstart-leading
                  refund transfer programs and taxpayer advance loans.
                </p>
              </div>
              <div className="text-center p-8 bg-slate-50 rounded-xl">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Drake Software
                </h4>
                <p className="text-slate-600 text-sm">
                  Professional tax preparation software trusted by tax
                  professionals across America.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-center mb-12">
              How It Works
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center font-bold text-base">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    Book Your Appointment
                  </h3>
                  <p className="text-white/90">
                    Schedule online or call us. Same-day appointments available
                    during tax season.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center font-bold text-base">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    Upload Your Documents
                  </h3>
                  <p className="text-white/90">
                    Securely upload your W-2s, 1099s, and other tax documents
                    before your appointment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center font-bold text-base">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    We Prepare Your Return
                  </h3>
                  <p className="text-white/90">
                    Our certified tax professionals prepare your return
                    accurately and maximize your refund.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center font-bold text-base">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    Get Your Money FAST
                  </h3>
                  <p className="text-white/90">
                    Choose rapid refund, advance loan, or prepaid card. Get your
                    money in 24-48 hours!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-2xl md:text-3xl md:text-3xl md:text-2xl md:text-3xl font-bold text-blue-900 mb-6">
              Ready to Get Your Money?
            </h2>
            <p className="text-base md:text-lg text-blue-900 mb-8">
              Don't wait weeks for your refund. Get it in days with Supersonic
              Tax Service!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://calendly.com/supersonicfastcash/tax-appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition text-xl shadow-2xl"
              >
                BOOK APPOINTMENT
              </a>
              <a
                href="tel:3173143757"
                className="px-10 py-5 bg-white text-blue-900 font-bold rounded-full hover:bg-slate-100 transition text-xl shadow-2xl"
              >
                CALL 317-314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg md:text-lg font-bold mb-4">
              Supersonic Tax Service
            </h3>
            <p className="text-slate-300 mb-2">
              8888 Keystone Crossing Suite 1300
            </p>
            <p className="text-slate-300 mb-4">Indianapolis, IN 46240</p>
            <p className="text-slate-300 mb-4">
              Phone:{' '}
              <a
                href="tel:3173143757"
                className="text-yellow-400 font-bold hover:underline"
              >
                317-314-3757
              </a>
            </p>

            <div className="flex justify-center gap-4 mb-4">
              <a
                href="https://www.facebook.com/share/14NGKwHMrdq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Follow Us on Facebook
              </a>
            </div>

            <p className="text-slate-300 text-sm">
              Tax Season Hours: Monday-Saturday 9AM-7PM | Sunday 12PM-5PM
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
