'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO BANNER */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        {/* No background overlay */}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-bold text-blue-900">
                🎓 100% Free Training • No Student Debt
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              We See Your Potential,
              <br />
              Not Your Past
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Real training. Real jobs. Real support. And it's 100% free.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold mb-1 text-blue-600">100%</div>
                <div className="text-sm text-gray-700">Free Training</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold mb-1 text-blue-600">4-12</div>
                <div className="text-sm text-gray-700">Weeks</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold mb-1 text-blue-600">14+</div>
                <div className="text-sm text-gray-700">Programs</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold mb-1 text-blue-600">90%</div>
                <div className="text-sm text-gray-700">Job Placement</div>
              </div>
            </div>

            {/* Credentials Badge */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-blue-900">
                  Registered Apprenticeship Sponsor & ETPL-Approved Provider.
                </strong>{' '}
                We are a registered apprenticeship sponsor and ETPL-approved
                provider in Indiana, making our programs eligible for WIOA and
                WRG funding through WorkOne regions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
              >
                Explore Programs
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                Apply Now - It's Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Powered by Industry Leaders
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Access 1,200+ courses from top training providers
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {/* Milady */}
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-4xl mb-2">💇</div>
                <div className="text-sm font-semibold">Milady</div>
              </div>
            </div>

            {/* HSI */}
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <div className="text-sm font-semibold">HSI Safety</div>
              </div>
            </div>

            {/* Certiport */}
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-4xl mb-2">💻</div>
                <div className="text-sm font-semibold">Certiport</div>
              </div>
            </div>

            {/* CareerSafe */}
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div className="text-sm font-semibold">CareerSafe</div>
              </div>
            </div>

            {/* NRF */}
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-4xl mb-2">🛍️</div>
                <div className="text-sm font-semibold">NRF</div>
              </div>
            </div>

            {/* JRI */}
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-4xl mb-2">⚖️</div>
                <div className="text-sm font-semibold">JRI</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/admin/partners"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All Partners →
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION - Moved below hero */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              See How We're Changing Lives
            </h2>
            <p className="text-lg text-slate-600">
              Watch our story and meet the people we serve
            </p>
          </div>
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: '500px' }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
              poster="/images/video-poster.jpg"
              controlsList="nodownload"
            >
              <source src="/videos/hero-home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* MISSION & STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            We See Your Potential, Not Your Past
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            At Elevate for Humanity, we believe everyone deserves a shot at a
            better future. Whether you're starting over, breaking barriers, or
            building something new—we're here to help you get there.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                100%
              </div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                4-12
              </div>
              <div className="text-sm text-slate-600">Weeks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                $0
              </div>
              <div className="text-sm text-slate-600">Debt</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                Real
              </div>
              <div className="text-sm text-slate-600">Jobs Waiting</div>
            </div>
          </div>
          <p className="text-lg text-slate-600">
            Through partnerships with WIOA, WRG, JRI, and registered
            apprenticeships, most students pay{' '}
            <span className="font-bold text-slate-900">
              nothing out of pocket
            </span>
            . No loans. No debt. Just real training and real opportunity.
          </p>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Skills. Real Careers. Real Fast.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our programs are designed for people with real lives—parents,
              workers, people starting over. Train online at your pace, practice
              hands-on, and step into a career that's waiting for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-6.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Work in a real barbershop. Get paid while you train. Build
                    your clientele. Own your chair or open your own shop. 12-18
                    months.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white font-bold text-base rounded-lg">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-2.jpg"
                    alt="CNA Healthcare Training"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get certified fast. Work in hospitals, nursing homes, or
                    home health. Stable income, flexible schedules, room to
                    grow. 4-8 weeks.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white font-bold text-base rounded-lg">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-3.jpg"
                    alt="HVAC Technician"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Learn heating, cooling, and refrigeration. High demand, good
                    pay, job security. Start your own business or work for a
                    company. 8-12 weeks.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white font-bold text-base rounded-lg">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-brand-orange-600 font-semibold hover:text-brand-orange-700"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              You Don't Need Perfect. You Just Need to Start.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We work with people who've been told "no" their whole lives.
              Justice-involved individuals. Parents juggling childcare. People
              with gaps in their work history. You're welcome here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Second Chances
              </h3>
              <p className="text-sm text-slate-700">
                Through our JRI partnership, justice-involved individuals get
                free training, certifications, and wrap-around support. Everyone
                deserves a path forward.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Parents & Caregivers
              </h3>
              <p className="text-sm text-slate-700">
                Our hybrid programs let you train online at your own pace and
                complete hands-on requirements on a flexible schedule. We get
                it—life is complicated.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Career Changers
              </h3>
              <p className="text-sm text-slate-700">
                Stuck in a dead-end job? Starting completely over? Our
                short-term programs (4-12 weeks) get you into a new career
                fast—no years wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ELEVATION MESSAGE - Second Hero */}
      <section className="py-20 bg-brand-orange-600 text-white px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            This Is Not Graduation.
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            This Is Elevation.
          </h2>
          <p className="text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
            We don't just hand you a certificate. We elevate you to a new
            level—with skills, confidence, and a career that changes everything.
          </p>
        </div>
      </section>

      {/* MORE PROGRAMS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              More Ways to Build Your Future
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/programs/tax-preparation" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-4.jpg"
                    alt="Tax Business Training"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-orange-600 transition">
                    Tax & Finance
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Launch your own tax prep business. Work from home. Earn
                    $40k-$100k+ per year. Tax season is busy, but the rest of
                    the year is yours.
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-orange-600 font-semibold">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/programs/business-startup" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-5.jpg"
                    alt="Business & Entrepreneurship"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-orange-600 transition">
                    Business Startup
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Turn your idea into a real business. Learn marketing,
                    branding, finances, and how to actually make money doing
                    what you love.
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-orange-600 font-semibold">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-brand-orange-600 font-semibold hover:text-brand-orange-700 text-lg"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Most students qualify for 100% free training through WIOA, WRG, JRI,
            or DOL-registered apprenticeships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-orange-600 bg-white rounded-lg hover:bg-slate-50 transition"
            >
              Apply Now
            </Link>
            <a
              href="https://www.indianacareerconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg hover:bg-white/20 transition"
            >
              Schedule at IndianaCareerConnect.com
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            📞 Call us at{' '}
            <a
              href="tel:3173143757"
              className="font-semibold text-white underline"
            >
              317-314-3757
            </a>
          </p>
          <p className="mt-2 text-xs text-slate-600">
            DOL Approved | DWD Approved | DOE Approved | WIOA Eligible | WRG
            Approved | JRI Partner
          </p>
        </div>
      </section>

      {/* AI FEATURES SECTION */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                🤖 AI-Powered Learning
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Your Personal AI Tutor
              </h2>
              <p className="text-xl mb-6 text-white/90">
                Get instant help, personalized explanations, and 24/7 support
                from our AI tutor. Never get stuck again.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Instant answers to your questions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Personalized learning recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Available 24/7, never sleeps</span>
                </li>
              </ul>
              <Link
                href="/ai-tutor"
                className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Try AI Tutor Now
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <div className="font-semibold">AI Tutor</div>
                    <div className="text-sm text-white/70">
                      Always here to help
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-sm text-white/70 mb-1">You asked:</div>
                    <div>"How do I calculate percentages?"</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-sm text-white/70 mb-1">AI Tutor:</div>
                    <div>"Let me break it down for you step by step..."</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAMIFICATION SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learn, Compete, Achieve</h2>
            <p className="text-xl text-gray-600">
              Earn badges, climb leaderboards, and unlock achievements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Badges */}
            <Link
              href="/student/badges"
              className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl hover:shadow-lg transition"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Earn Badges</h3>
              <p className="text-gray-600 mb-4">
                Complete courses and unlock achievement badges
              </p>
              <span className="text-blue-600 font-semibold">View Badges →</span>
            </Link>

            {/* Leaderboard */}
            <Link
              href="/student/leaderboard"
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Climb Leaderboards</h3>
              <p className="text-gray-600 mb-4">
                Compete with peers and see your ranking
              </p>
              <span className="text-blue-600 font-semibold">
                View Leaderboard →
              </span>
            </Link>

            {/* Points */}
            <Link
              href="/lms/(app)/achievements"
              className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-lg transition"
            >
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Collect Points</h3>
              <p className="text-gray-600 mb-4">
                Earn points for every activity and milestone
              </p>
              <span className="text-blue-600 font-semibold">
                View Achievements →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE APP DOWNLOAD SECTION */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📱 Learn Anywhere with Our Mobile App
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take your learning on the go. Download courses, earn badges, and
              track progress offline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📥</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Offline Learning
                  </h3>
                  <p className="text-gray-600">
                    Download courses and learn without internet connection
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Push Notifications
                  </h3>
                  <p className="text-gray-600">
                    Stay updated with course deadlines and achievements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Biometric Login
                  </h3>
                  <p className="text-gray-600">
                    Secure access with Face ID, Touch ID, or Fingerprint
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    AI Tutor
                  </h3>
                  <p className="text-gray-600">
                    Get instant help and explanations from AI assistant
                  </p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-8">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Download Now
                </h3>
                <p className="text-gray-600">Available for iOS and Android</p>
              </div>

              <div className="space-y-4">
                {/* App Store Button */}
                <a
                  href="#"
                  className="block w-full bg-black text-white rounded-xl px-6 py-4 hover:bg-gray-800 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Coming soon to the App Store!');
                  }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  className="block w-full bg-black text-white rounded-xl px-6 py-4 hover:bg-gray-800 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Coming soon to Google Play!');
                  }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Free to download • No in-app purchases
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
