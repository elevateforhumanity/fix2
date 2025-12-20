import { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/rise-foundation',
  },
  title: 'Rise Foundation | Elevate For Humanity',
  description:
    'Explore Rise Foundation and discover opportunities for career growth and development.',
};

export default async function RiseFoundationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Rise Foundation"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Rise Foundation
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Explore Rise Foundation and discover opportunities for career growth
            and development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* VITA Program Section */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                VITA - Volunteer Income Tax Assistance
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                The IRS's Volunteer Income Tax Assistance (VITA) program offers
                free tax help to people who need assistance in preparing their
                own tax returns. RISE Foundation is proud to be a VITA site
                partner, providing free tax preparation services to qualifying
                individuals.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-lg md:text-lg font-bold mb-6">
                  Who Qualifies for VITA?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
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
                    <span>People who generally make $67,000 or less</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
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
                    <span>Persons with disabilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
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
                    <span>Limited English-speaking taxpayers</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
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
                      Seniors (60+) through Tax Counseling for the Elderly (TCE)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="VITA Tax Assistance"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* What to Bring */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-16">
              <h3 className="text-lg md:text-lg font-bold mb-6">
                What to Bring to Your VITA Appointment
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Identification</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Photo ID for you and your spouse</li>
                    <li>• Social Security cards for all family members</li>
                    <li>• Birth dates for everyone on your return</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Income Documents</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• W-2 forms from all employers</li>
                    <li>• 1099 forms (interest, dividends, retirement)</li>
                    <li>• Other income statements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">
                    Deductions & Credits
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Childcare provider info and costs</li>
                    <li>• Education expenses (1098-T)</li>
                    <li>• Health insurance statements (1095-A)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">
                    Banking Information
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bank routing and account numbers</li>
                    <li>• For direct deposit of refund</li>
                    <li>• Last year's tax return (if available)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* VITA Services */}
            <div className="mb-16">
              <h3 className="text-lg md:text-lg font-bold mb-6">
                VITA Services Are:
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="text-4xl mb-4 text-2xl md:text-3xl lg:text-4xl">
                    ✓
                  </div>
                  <h4 className="font-bold text-lg mb-2">100% Free</h4>
                  <p className="text-gray-600">
                    No fees, no hidden costs. Completely free tax preparation
                    and filing.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="text-4xl mb-4 text-2xl md:text-3xl lg:text-4xl">
                    🎓
                  </div>
                  <h4 className="font-bold text-lg mb-2">IRS-Certified</h4>
                  <p className="text-gray-600">
                    All volunteers are IRS-certified and trained in tax law.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="text-4xl mb-4 text-2xl md:text-3xl lg:text-4xl">
                    🔒
                  </div>
                  <h4 className="font-bold text-lg mb-2">Confidential</h4>
                  <p className="text-gray-600">
                    Your information is kept private and secure.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Learn</h3>
                <p className="text-gray-600">
                  Access quality training programs
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Certify</h3>
                <p className="text-gray-600">Earn industry certifications</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Work</h3>
                <p className="text-gray-600">Get hired in your field</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
