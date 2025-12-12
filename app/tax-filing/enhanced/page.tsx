// app/tax-filing/enhanced/page.tsx - Enhanced Tax Filing Page with Hero Banners
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/tax-filing/enhanced",
  },
  title: 'Professional Tax Filing $100 | Drake Software | EPS Financial',
  description: 'File your taxes with certified preparers. Drake Software powered. EPS Financial refund advances. Maximum refund guaranteed.',
};

export default function TaxFilingEnhancedPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative h-[700px]     overflow-hidden">
        {/* Background Pattern */}
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
          <p className="text-xl mb-8 text-gray-100">Transform your career with free training</p>
        </div>
      </section>

          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
          <div className="grid md:grid-cols-2 gap-12 h-full items-center">
            {/* Left Column - Text */}
            <div>
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-sm font-semibold">IRS Certified</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <span className="text-white text-sm font-semibold">Drake Software</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <span className="text-white text-sm font-semibold">EPS Financial</span>
                </div>
              </div>

              <h1 className="text-6xl font-bold mb-6 text-white leading-tight text-4xl md:text-5xl lg:text-6xl">
                File Your Taxes
                <span className="block text-orange-400">For Just $100</span>
              </h1>
              
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Professional tax preparation powered by Drake Software. Federal + State included. Maximum refund guaranteed. Get your refund up to 4 days early with EPS Financial.
              </p>

              {/* Key Features Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">$100</div>
                  <div className="text-xs text-blue-200">Fed + State</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">24hrs</div>
                  <div className="text-xs text-blue-200">Processing</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">4 Days</div>
                  <div className="text-xs text-blue-200">Early Refund</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/tax-filing/apply"
                  className="group px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-2xl hover:shadow-orange-600/50 hover:scale-105 flex items-center gap-2"
                >
                  Start Your Return
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/vita"
                  className="px-8 py-4 bg-green-600/20 backdrop-blur-sm border-2 border-green-400/30 text-green-100 font-bold rounded-xl hover:bg-green-600/30 transition-all"
                >
                  Free VITA Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-blue-100 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>10,000+ Returns Filed</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>IRS Approved</span>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing Card */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Pricing Card */}
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                      Most Popular
                    </div>
                    <div className="text-5xl font-bold text-gray-900 mb-2 text-3xl md:text-4xl lg:text-5xl">
                      $100
                    </div>
                    <div className="text-gray-600">Federal + State Included</div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Drake Software</div>
                        <div className="text-sm text-gray-600">Professional tax preparation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Maximum Refund</div>
                        <div className="text-sm text-gray-600">Guaranteed or it's free</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">IRS E-File</div>
                        <div className="text-sm text-gray-600">Direct electronic filing</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Expert Support</div>
                        <div className="text-sm text-gray-600">Certified tax preparers</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Refund Advances</div>
                        <div className="text-sm text-gray-600">Get money before IRS pays</div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/tax-filing/apply"
                    className="block w-full py-4    text-white font-bold rounded-xl text-center hover:shadow-lg transition-all"
                  >
                    Get Started →
                  </Link>

                  <div className="mt-6 text-center text-sm text-gray-500">
                    No hidden fees • Secure payment • Money-back guarantee
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-50 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"
className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* EPS Financial Products Highlight */}
      <section className="py-20   ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Powered by EPS Financial
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-2xl md:text-3xl lg:text-4xl">
              Get Your Refund Faster
            </h2>
            <p className="text-xl text-gray-600">
              Choose from multiple refund options powered by EPS Financial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* E-Advance */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-green-200">
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">E-Advance</h3>
              <p className="text-gray-600 mb-6">
                Get up to $7,500 before your refund arrives. No cost option available.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  Same-day funding
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  0% APR options
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  No marketing fees
                </li>
              </ul>
              <div className="text-3xl font-bold text-green-600 mb-2">$0 - $7,500</div>
              <div className="text-sm text-gray-500">Loan amount</div>
            </div>

            {/* E-Collect */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-blue-200">
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">E-Collect</h3>
              <p className="text-gray-600 mb-6">
                Simple, low-cost refund transfer. Pay your tax prep fee from your refund.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  Only $20 fee
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  No upfront payment
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  Simple process
                </li>
              </ul>
              <div className="text-3xl font-bold text-blue-600 mb-2">$20</div>
              <div className="text-sm text-gray-500">Transfer fee</div>
            </div>

            {/* FasterMoney Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-purple-200">
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">FasterMoney® Card</h3>
              <p className="text-gray-600 mb-6">
                Get your refund up to 4 days early on a prepaid Visa card.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  4 days early access
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  Reloadable Visa card
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                  No bank account needed
                </li>
              </ul>
              <div className="text-3xl font-bold text-purple-600 mb-2">4 Days</div>
              <div className="text-sm text-gray-500">Earlier access</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tax-filing/apply"
              className="inline-flex items-center gap-2 px-8 py-4    text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              Start Your Tax Return
              <svg className="w-5 h-5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted Partners</h3>
            <p className="text-gray-600">Industry-leading software and financial services</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">Drake</div>
              <div className="text-sm text-gray-600">Tax Software</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">EPS</div>
              <div className="text-sm text-gray-600">Financial Services</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">Pathward®</div>
              <div className="text-sm text-gray-600">FDIC Member</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-orange-600 mb-2">IRS</div>
              <div className="text-sm text-gray-600">Approved Provider</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
