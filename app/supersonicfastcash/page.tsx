// app/supersonicfastcash/page.tsx - Professional Tax Preparation (H&R Block Style)
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

export const metadata: Metadata = {

export default function SupersonicFastCashPage() {

  return (
    <main className="min-h-screen bg-white">
      {/* Hero - H&R Block Style */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome</h1>
          <p className="text-xl mb-8 text-gray-100">Transform your career with free training</p>
        </div>
      </section>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get Your Taxes Done Right
              </h1>
              <p className="text-2xl mb-8 font-light">
                Professional tax preparation by certified experts. Maximum refund guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/supersonicfastcash/start"
                  className="px-10 py-5 bg-orange-600 text-white font-bold text-xl rounded-lg hover:bg-orange-700 transition text-center"
                >
                  Start Your Taxes →
                </Link>
                <Link
                  href="/supersonicfastcash/pricing"
                  className="px-10 py-5 bg-white text-green-700 font-bold text-xl rounded-lg hover:bg-gray-100 transition text-center"
                >
                  See Pricing
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Maximum refund guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>100% accuracy</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 hidden md:block">
              <Image
                src="/media-backup-20251128-043832/programs/tax-prep-hd.jpg"
                alt="Professional tax preparation"
                fill
                className="object-cover rounded-lg shadow-2xl"
              
          sizes="100vw"
        /
          quality={100}
        >
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={50} suffix="+" />
              </div>
              <div className="text-sm text-slate-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={10000} suffix="+" />
              </div>
              <div className="text-sm text-slate-600">Returns Filed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="text-sm text-slate-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                $<CountUp end={3500} />
              </div>
              <div className="text-sm text-slate-600">Avg Refund</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - H&R Block Style */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Choose Your Tax Preparation Service
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* In-Person */}
              <div className="border-2 border-slate-200 rounded-lg p-8 hover:border-green-600 hover:shadow-xl transition">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">In-Person</h3>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    Starting at $89
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Meet with a tax pro in person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Certified tax professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Same-day appointments available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Maximum refund guaranteed</span>
                  </li>
                </ul>
                <Link
                  href="/supersonicfastcash/book-appointment"
                  className="block w-full px-6 py-3 bg-green-600 text-white font-bold text-center rounded-lg hover:bg-green-700 transition"
                >
                  Book Appointment
                </Link>
              </div>

              {/* Online with Tax Pro */}
              <div className="border-2 border-green-600 rounded-lg p-8 shadow-xl relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 text-white text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Online with Tax Pro</h3>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    Starting at $69
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Video chat with tax expert</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Upload documents securely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Done from home</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Maximum refund guaranteed</span>
                  </li>
                </ul>
                <Link
                  href="/supersonicfastcash/start-online"
                  className="block w-full px-6 py-3 bg-green-600 text-white font-bold text-center rounded-lg hover:bg-green-700 transition"
                >
                  Start Online
                </Link>
              </div>

              {/* Drop-Off */}
              <div className="border-2 border-slate-200 rounded-lg p-8 hover:border-green-600 hover:shadow-xl transition">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Drop-Off</h3>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    Starting at $59
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Drop off your documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>We prepare your return</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Pick up when ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Most affordable option</span>
                  </li>
                </ul>
                <Link
                  href="/supersonicfastcash/drop-off"
                  className="block w-full px-6 py-3 bg-green-600 text-white font-bold text-center rounded-lg hover:bg-green-700 transition"
                >
                  Find Location
                </Link>
              </div>
            </div>

            {/* Self-Prep Option */}
            <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Prefer to Do It Yourself?</h3>
                  <p className="text-slate-700 mb-4">
                    Use our TurboTax-style self-preparation software. Easy, guided, and accurate.
                  </p>
                  <Link
                    href="/tax-self-prep"
                    className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                  >
                    Try Self-Prep (Free to Start) →
                  </Link>
                </div>
                <div className="hidden md:block text-6xl">
                  💻
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Why Choose Us */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Choose SupersonicFastCash?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Maximum Refund Guaranteed</h3>
                <p className="text-slate-600">
                  We guarantee you'll get the maximum refund you're entitled to, or we'll refund your service fee.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">100% Secure</h3>
                <p className="text-slate-600">
                  Bank-level encryption protects your personal and financial information.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Refunds</h3>
                <p className="text-slate-600">
                  E-file and get your refund in as little as 8 days with direct deposit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="py-20 bg-green-700 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Your Maximum Refund?
          </h2>
          <p className="text-xl mb-8">
            Start your taxes today with certified tax professionals.
          </p>
          <Link
            href="/supersonicfastcash/start"
            className="inline-block px-12 py-5 bg-orange-600 text-white font-bold text-xl rounded-lg hover:bg-orange-700 transition shadow-2xl"
          >
            Start Your Taxes Now →
          </Link>
          <p className="mt-6 text-sm opacity-90">
            Questions? Call (555) TAX-HELP or chat with us 24/7
          </p>
        </div>
      </section>
    </main>
  );

}
