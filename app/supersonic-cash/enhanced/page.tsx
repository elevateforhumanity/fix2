// app/supersonic-cash/enhanced/page.tsx - Enhanced Cash Advance Page with Hero Banners
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/supersonic-cash/enhanced",
  },
  title: 'Supersonic Cash Advance - Get Up to $3,500 Fast | EPS Financial',
  description: 'Quick cash advances powered by EPS Financial. Get approved in minutes, funded same day. No hidden fees.',
};

export default function SupersonicCashEnhancedPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative h-[700px]     overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
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

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
          <div className="grid md:grid-cols-2 gap-12 h-full items-center">
            {/* Left Column - Text */}
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white text-sm font-semibold">Powered by EPS Financial</span>
              </div>

              <h1 className="text-6xl font-bold mb-6 text-white leading-tight text-4xl md:text-5xl lg:text-6xl">
                Get Cash
                <span className="block text-yellow-300">Supersonic Fast</span>
              </h1>
              
              <p className="text-xl mb-8 text-green-50 leading-relaxed">
                Need money now? Get up to $3,500 with same-day approval. No hidden fees, flexible repayment, and trusted by thousands.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">5 Min</div>
                      <div className="text-sm text-green-100">Application</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">$3,500</div>
                      <div className="text-sm text-green-100">Max Amount</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Same Day</div>
                      <div className="text-sm text-green-100">Funding</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Secure</div>
                      <div className="text-sm text-green-100">& Private</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/supersonic-cash/apply"
                  className="group px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 flex items-center gap-2"
                >
                  Apply Now - Get Cash Today
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center gap-6 text-green-50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">10,000+ Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium">Bank-Level Security</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual/Image */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Floating Card Mockup */}
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2">Available Amount</div>
                    <div className="text-5xl font-bold text-green-600 mb-1 text-3xl md:text-4xl lg:text-5xl">$3,500</div>
                    <div className="text-sm text-gray-600">Instant approval available</div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Application Fee</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Processing Time</span>
                      <span className="font-semibold">5 minutes</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Funding Speed</span>
                      <span className="font-semibold text-green-600">Same Day</span>
                    </div>
                  </div>

                  <button className="w-full py-4    text-white font-bold rounded-xl hover:shadow-lg transition-all">
                    Get Started →
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>FDIC Insured</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-50 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-30 blur-2xl" />
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

      {/* How It Works Section with Images */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-2xl md:text-3xl lg:text-4xl">
              Get Cash in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Fast, simple, and secure. Get approved in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="   rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply Online</h3>
                <p className="text-gray-600 mb-6">
                  Fill out our simple 5-minute application. No paperwork, no hassle.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Basic personal info
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Income verification
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Bank account details
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="   rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Approved</h3>
                <p className="text-gray-600 mb-6">
                  Receive instant decision powered by EPS Financial's advanced underwriting.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Instant decision
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    No credit check required
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Transparent terms
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="   rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Receive Funds</h3>
                <p className="text-gray-600 mb-6">
                  Money deposited directly to your bank account. Same-day funding available.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Same-day deposit
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Secure ACH transfer
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    Use immediately
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/supersonic-cash/apply"
              className="inline-flex items-center gap-2 px-8 py-4    text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              Start Your Application Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section with Logos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Thousands</h3>
            <p className="text-gray-600">Powered by industry-leading partners</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">EPS</div>
              <div className="text-sm text-gray-600">Financial Partner</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">Pathward®</div>
              <div className="text-sm text-gray-600">FDIC Member</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">256-bit</div>
              <div className="text-sm text-gray-600">SSL Encryption</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-orange-600 mb-2">A+</div>
              <div className="text-sm text-gray-600">BBB Rating</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
