import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'What We Offer | Elevate for Humanity',
  description: 'Discover our comprehensive workforce training programs, support services, and career pathways. 100% funded through WIOA, WRG, JRI, and DOL programs.',
,
  openGraph: {
    images: ["/images/team-new/team-5.jpg"],
    type: "website",
  }};

export default function WhatWeOfferPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              What We Offer
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive workforce training, support services, and career pathways—all 100% funded through government programs.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                More Than Just Training
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Elevate for Humanity is your <strong>complete workforce development partner</strong>. We don't just provide training—we connect you to funding, remove barriers, and support you from application to employment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Whether you're a student looking for free career training, an employer seeking trained workers, or a partner organization serving your community, we have solutions designed for you.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services Include:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>12+ Career Training Programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Funding Navigation (WIOA, WRG, JRI, DOL)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Case Management & Coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Support Services (Transportation, Childcare, Work Clothing)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Job Placement Assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Employer Partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Career Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All programs are ETPL-approved and eligible for WIOA, WRG, and other workforce funding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Healthcare */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Healthcare</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Medical Assistant (16-24 weeks)</li>
                <li>• Phlebotomy Technician (4-8 weeks)</li>
                <li>• Pharmacy Technician (12-16 weeks)</li>
              </ul>
              <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                View Healthcare Programs →
              </Link>
            </div>

            {/* Skilled Trades */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skilled Trades</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• HVAC Technician (4-9 months)</li>
                <li>• Welding Technology (12-24 weeks)</li>
                <li>• Electrical Technician (16-24 weeks)</li>
                <li>• Building Maintenance (4-9 months)</li>
              </ul>
              <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                View Trades Programs →
              </Link>
            </div>

            {/* Apprenticeships */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apprenticeships</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Barber Apprenticeship (12-18 months)</li>
                <li>• Earn while you learn</li>
                <li>• DOL registered programs</li>
              </ul>
              <Link href="/programs/barber-apprenticeship" className="text-blue-600 font-semibold hover:text-blue-700">
                View Apprenticeships →
              </Link>
            </div>

            {/* Transportation */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transportation</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• CDL / Truck Driving (4-6 weeks)</li>
                <li>• Class A license training</li>
                <li>• Job placement assistance</li>
              </ul>
              <Link href="/programs/truck-driving" className="text-blue-600 font-semibold hover:text-blue-700">
                View CDL Programs →
              </Link>
            </div>

            {/* Technology */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Technology</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• IT Support Specialist (12-20 weeks)</li>
                <li>• CompTIA A+ certification</li>
                <li>• Help desk & desktop support</li>
              </ul>
              <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                View IT Programs →
              </Link>
            </div>

            {/* Culinary */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Culinary Arts</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Culinary Arts & Food Service (16-24 weeks)</li>
                <li>• Professional kitchen training</li>
                <li>• Restaurant & catering careers</li>
              </ul>
              <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                View Culinary Programs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Wraparound Support Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We remove barriers so you can focus on learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-2">Case Management</h3>
              <p className="text-sm text-gray-700">
                Dedicated case manager to guide you through enrollment, funding, and completion
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">Transportation</h3>
              <p className="text-sm text-gray-700">
                Bus passes, gas cards, or rideshare assistance to get you to training
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-2">Childcare Support</h3>
              <p className="text-sm text-gray-700">
                Childcare assistance so you can attend training without worry
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="font-bold text-gray-900 mb-2">Work Clothing</h3>
              <p className="text-sm text-gray-700">
                Uniforms, safety gear, and professional attire for training and interviews
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-2">Career Coaching</h3>
              <p className="text-sm text-gray-700">
                Resume building, interview prep, and job search strategies
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="font-bold text-gray-900 mb-2">Job Placement</h3>
              <p className="text-sm text-gray-700">
                Direct connections to employers actively hiring in your field
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2">Digital Literacy</h3>
              <p className="text-sm text-gray-700">
                Computer skills training and access to technology for online coursework
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
              <h3 className="font-bold text-gray-900 mb-2">Mental Health Support</h3>
              <p className="text-sm text-gray-700">
                Referrals to counseling and support services when needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Programs */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              100% Funded Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help you access government funding so you pay $0 out of pocket
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/funding/wioa" className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">WIOA Funding</h3>
              <p className="text-gray-700 mb-4">
                Federal workforce program for dislocated workers, low-income adults, and youth. Covers tuition, books, transportation, and childcare.
              </p>
              <div className="text-blue-600 font-semibold">
                Learn More →
              </div>
            </Link>

            <Link href="/funding/wrg" className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Workforce Ready Grant (WRG)</h3>
              <p className="text-gray-700 mb-4">
                Indiana state grant up to $7,500/year for high-demand careers. No student loans required.
              </p>
              <div className="text-blue-600 font-semibold">
                Learn More →
              </div>
            </Link>

            <Link href="/funding/jri" className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Justice Reinvestment Initiative (JRI)</h3>
              <p className="text-gray-700 mb-4">
                Re-entry program for justice-involved individuals. Provides training, support services, and job placement.
              </p>
              <div className="text-blue-600 font-semibold">
                Learn More →
              </div>
            </Link>

            <Link href="/funding/dol" className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">DOL Apprenticeships</h3>
              <p className="text-gray-700 mb-4">
                Department of Labor registered apprenticeships. Earn wages while you learn on the job.
              </p>
              <div className="text-blue-600 font-semibold">
                Learn More →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Apply today and we'll help you access 100% funded training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Apply for Training
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all border-2 border-white"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
