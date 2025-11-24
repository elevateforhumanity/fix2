import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Workforce Ready Grant (WRG) | Elevate for Humanity',
  description: 'Learn about Indiana\'s Workforce Ready Grant - up to $7,500/year for high-demand career training. No student loans required.',
};

export default function WRGPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-red-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              💰 State of Indiana Funding
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Workforce Ready Grant (WRG)
            </h1>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              Get up to $7,500 per year for high-demand career training. No student loans. No debt. Just free training that leads to real jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all shadow-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-all border-2 border-white"
              >
                Get Help Applying
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is WRG */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What is the Workforce Ready Grant?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>Workforce Ready Grant (WRG)</strong> is an Indiana state program that pays for short-term career training in high-demand fields. It covers tuition, fees, books, and certification exams—up to <strong>$7,500 per year</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Unlike student loans, <strong>WRG is a grant—you never have to pay it back</strong>. It's designed to help Indiana residents get trained quickly for careers that employers are actively hiring for.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Elevate for Humanity is an <strong>approved WRG training provider</strong>. We handle all the paperwork and work directly with the state to ensure your training is covered.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Am I Eligible?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-green-600 mb-6">✅ You Qualify If:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>You're an <strong>Indiana resident</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>You're a <strong>U.S. citizen or eligible non-citizen</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>You're <strong>not currently enrolled in college</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>You're pursuing a <strong>high-demand credential</strong> (all our programs qualify)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Your income is at or below <strong>250% of federal poverty level</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">💡 Income Guidelines (2024)</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <div className="font-semibold text-gray-900">Single Person:</div>
                  <div>Up to $36,450/year</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Family of 2:</div>
                  <div>Up to $49,300/year</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Family of 3:</div>
                  <div>Up to $62,150/year</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Family of 4:</div>
                  <div>Up to $75,000/year</div>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-600">
                <strong>Note:</strong> These are approximate guidelines. Your case manager will verify eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What WRG Covers */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Does WRG Cover?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tuition & Fees</h3>
              <p className="text-sm text-gray-700">100% of program tuition and registration fees</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Books & Materials</h3>
              <p className="text-sm text-gray-700">Required textbooks, workbooks, and supplies</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Certification Exams</h3>
              <p className="text-sm text-gray-700">State licensing and certification test fees</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Equipment</h3>
              <p className="text-sm text-gray-700">Required tools and equipment for training</p>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-700">
              <strong>💡 Pro Tip:</strong> WRG can be combined with WIOA funding! WIOA can cover support services like transportation and childcare while WRG covers tuition. We help you maximize all available benefits.
            </p>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How to Apply for WRG</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Apply to Elevate for Humanity</h3>
                  <p className="text-gray-700">
                    Start by applying to one of our WRG-approved programs. We'll guide you through the entire process.
                  </p>
                  <Link href="/apply" className="inline-block mt-3 text-green-600 font-semibold hover:text-green-700">
                    Apply Now →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Register with INconnect</h3>
                  <p className="text-gray-700">
                    Create your account at <a href="https://www.in.gov/dwd/inconnect/" target="_blank" rel="noopener" className="text-green-600 underline">INconnect.in.gov</a>. This is Indiana's workforce portal where you'll apply for WRG.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Submit WRG Application</h3>
                  <p className="text-gray-700">
                    Through INconnect, submit your WRG application. You'll need proof of income, residency, and citizenship. We help you gather all required documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get Approved & Start Training</h3>
                  <p className="text-gray-700">
                    Once approved (usually 2-4 weeks), your WRG funds are sent directly to Elevate for Humanity. You start training with $0 out of pocket!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Covered */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">WRG-Approved Programs at Elevate</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            All of our programs are approved for WRG funding
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Medical Assistant', duration: '16-24 weeks', slug: 'medical-assistant' },
              { name: 'Barber Apprenticeship', duration: '12-18 months', slug: 'barber-apprenticeship' },
              { name: 'HVAC Technician', duration: '4-9 months', slug: 'hvac-technician' },
              { name: 'Building Maintenance', duration: '4-9 months', slug: 'building-maintenance' },
              { name: 'CDL / Truck Driving', duration: '4-6 weeks', slug: 'truck-driving' },
              { name: 'Phlebotomy', duration: '4-8 weeks', slug: 'phlebotomy' },
            ].map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{program.duration}</p>
                <div className="flex items-center text-green-600 font-medium text-sm">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started with WRG?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            We'll help you through every step of the application process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all shadow-lg"
            >
              Apply for Training
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-all border-2 border-white"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
