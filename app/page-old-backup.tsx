'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="relative min-h-[500px] sm:min-h-[600px] md:h-screen overflow-hidden border-b border-slate-800">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-banner.png"
            alt="Professional training and career development"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center py-12 md:py-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-orange-400 uppercase mb-3 md:mb-4">
                Government-funded workforce ecosystem
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Elevate For Humanity is a{" "}
                <span className="text-orange-400">
                  funded training platform
                </span>{" "}
                that connects students, employers, and workforce boards.
              </h1>
              <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-slate-200 max-w-3xl">
                We blend real classrooms, trusted partners, and a modern SaaS
                portal so people can earn credentials, employers can grow their
                teams, and workforce boards can see outcomes in one place. Many
                programs are eligible for WIOA, workforce grants, OJT, and other
                funding—often at little to no cost to the learner.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <Link
                  href="/directory"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition shadow-lg"
                >
                  Explore funded programs
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-slate-400 text-slate-100 hover:border-emerald-400 hover:text-orange-300 transition"
                >
                  See the Elevate platform
                </Link>
              </div>
              <p className="mt-6 text-xs text-slate-400 max-w-2xl">
                Serving learners, employers, and communities with pathways in
                healthcare, skilled trades, CDL, re-entry, youth, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-8 md:py-12 bg-slate-900 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <p className="text-center text-xs sm:text-sm text-slate-400 mb-6 md:mb-8">
            Trusted by workforce boards, training providers, and employers across Indiana
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 items-center opacity-70">
            {/* Placeholder partner logos */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src={`https://placehold.co/200x100/334155/94a3b8?text=Partner+${i}`}
                  alt={`Partner ${i}`}
                  width={200}
                  height={100}
                  className="opacity-60 hover:opacity-100 transition w-full h-auto max-w-[150px] md:max-w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Light Section */}
      <section className="py-12 md:py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs font-semibold tracking-wide text-red-600 uppercase mb-3 md:mb-4">
              What we do
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 px-4">
              A complete workforce development ecosystem
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Elevate For Humanity combines training programs, technology, and support services
              to help people build careers while helping employers find qualified talent.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                🎓 Training Programs
              </h3>
              <p className="text-slate-700 mb-4">
                We offer 20+ workforce-aligned training programs in healthcare, skilled trades,
                transportation, and more. Programs include:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Certified Nursing Assistant (CNA), Medical Assistant, Phlebotomy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>CDL-A and CDL-B truck driving, Forklift certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>HVAC, Electrical, Plumbing, Welding, Construction trades</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>IT Support, Customer Service, Business Administration</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                💰 Funding Support
              </h3>
              <p className="text-slate-700 mb-4">
                Most programs are funded through government workforce programs, making training
                affordable or free for eligible learners:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>WIOA (Workforce Innovation and Opportunity Act)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Workforce Readiness Grants and state funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>On-the-Job Training (OJT) and Work Experience (WEX)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Employer sponsorships and scholarships</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                🤝 Support Services
              </h3>
              <p className="text-slate-700 mb-4">
                We help learners overcome barriers to success with wraparound support:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Career counseling and job placement assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Transportation and childcare support coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Soft skills training and professional development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Retention support after job placement</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                💻 Technology Platform
              </h3>
              <p className="text-slate-700 mb-4">
                Our SaaS platform connects everyone in the workforce ecosystem:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Student portal for course access, progress tracking, and certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Employer portal for job posting and candidate matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Workforce board dashboard for real-time outcomes reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Partner portal for training providers and instructors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs with Images */}
      <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 px-4">
              Popular Training Programs
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600 px-4">
              Explore our most in-demand career training programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* CNA Program */}
            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/efh-cna-hero.jpg"
                    alt="Certified Nursing Assistant Training"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Certified Nursing Assistant (CNA)
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Hands-on clinical training for entry-level healthcare roles
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold text-sm">Learn more →</span>
                    <span className="text-xs text-slate-500">4-6 weeks</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* CDL Program */}
            <Link href="/programs/cdl" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/split/piece-5.png"
                    alt="Commercial Driver's License Training"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    CDL / Truck Driving
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Get your Commercial Driver's License and start a high-demand career
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold text-sm">Learn more →</span>
                    <span className="text-xs text-slate-500">3-4 weeks</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* HVAC Program */}
            <Link href="/programs/hvac" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/split/piece-6.png"
                    alt="HVAC Technician Training"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    HVAC Technician
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Learn heating, cooling, and refrigeration systems
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold text-sm">Learn more →</span>
                    <span className="text-xs text-slate-500">8-12 weeks</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Barber Program */}
            <Link href="/programs/barber" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/efh-barber-hero.jpg"
                    alt="Barber Apprenticeship Training"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    State-approved apprenticeship in real barbershops
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold text-sm">Learn more →</span>
                    <span className="text-xs text-slate-500">12-18 months</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Building Maintenance */}
            <Link href="/programs/building-maintenance" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/efh-building-tech-hero.jpg"
                    alt="Building Maintenance Technician Training"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Building Maintenance Technician
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Training for building systems, repairs, and facility maintenance
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold text-sm">Learn more →</span>
                    <span className="text-xs text-slate-500">6-8 weeks</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Medical Assistant */}
            <Link href="/programs/medical-assistant" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/split/piece-7.png"
                    alt="Medical Assistant Training"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Medical Assistant
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Clinical and administrative training for healthcare settings
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold text-sm">Learn more →</span>
                    <span className="text-xs text-slate-500">4-6 months</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              View all 20+ programs
            </Link>
          </div>
        </div>
      </section>

      {/* Three-Column Value Prop */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              One platform. Three audiences. Real results.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Elevate connects the dots between learners, employers, and
              workforce boards.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Learners */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-400/50 transition">
              <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                For Learners
              </h3>
              <p className="text-slate-400 mb-4">
                Access funded training programs in healthcare, skilled trades,
                CDL, and more. Track your progress, earn credentials, and
                connect with employers—all in one place.
              </p>
              <Link
                href="/directory"
                className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-2"
              >
                Browse programs
                <svg
                  className="w-4 h-4"
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
            </div>

            {/* For Employers */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-400/50 transition">
              <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                For Employers
              </h3>
              <p className="text-slate-400 mb-4">
                Post jobs, connect with trained candidates, and leverage OJT
                and apprenticeship funding. Build your workforce pipeline with
                skilled, job-ready talent.
              </p>
              <Link
                href="/employers"
                className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-2"
              >
                Learn more
                <svg
                  className="w-4 h-4"
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
            </div>

            {/* For Workforce Boards */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-400/50 transition">
              <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                For Workforce Boards
              </h3>
              <p className="text-slate-400 mb-4">
                Track outcomes, manage funding, and see real-time data on
                enrollments, completions, and placements. One dashboard for all
                your workforce programs.
              </p>
              <Link
                href="/workforce-boards"
                className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-2"
              >
                See the dashboard
                <svg
                  className="w-4 h-4"
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
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              How Elevate works
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              From enrollment to employment, we handle the entire journey—so
              you can focus on learning and growing.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Apply for funding
              </h3>
              <p className="text-slate-400 text-sm">
                We help you apply for WIOA, WRG, or other workforce grants.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Enroll in training
              </h3>
              <p className="text-slate-400 text-sm">
                Choose from healthcare, skilled trades, CDL, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Earn credentials
              </h3>
              <p className="text-slate-400 text-sm">
                Complete your program and earn industry-recognized
                certifications.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Get hired
              </h3>
              <p className="text-slate-400 text-sm">
                Connect with employers and start your new career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See Elevate in action
            </h2>
            <p className="text-lg text-slate-400">
              Watch how our platform connects learners, employers, and
              workforce boards.
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <video
              className="w-full h-full"
              controls
              poster="/images/video-thumbnail.jpg"
            >
              <source src="/videos/elevate-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">
                500+
              </div>
              <div className="text-slate-400">Learners enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">
                50+
              </div>
              <div className="text-slate-400">Employer partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">
                85%
              </div>
              <div className="text-slate-400">Completion rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">
                $2M+
              </div>
              <div className="text-slate-400">In workforce funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories with Photos */}
      <section className="py-12 md:py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 px-4">
              Real People. Real Results.
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600 px-4">
              See how our graduates are building successful careers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Marcus - Barber */}
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/images/Success_Story_Portrait_Marcus_112c6bbd.png"
                  alt="Marcus J. - Barber Graduate"
                  fill
                  className="rounded-full object-cover border-4 border-emerald-400"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Marcus J.</h3>
              <p className="text-sm text-red-600 font-semibold mb-4">Barber Apprenticeship Graduate</p>
              <p className="text-slate-700 italic mb-4">
                "From incarceration to owning my own chair. Elevate gave me the structure and support I needed."
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Now owns his own barbershop</span>
              </div>
            </div>

            {/* Sarah - Medical Assistant */}
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/images/Success_Story_Portrait_Sarah_fc9f8fd1.png"
                  alt="Sarah M. - Medical Assistant Graduate"
                  fill
                  className="rounded-full object-cover border-4 border-emerald-400"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sarah M.</h3>
              <p className="text-sm text-red-600 font-semibold mb-4">Medical Assistant Graduate</p>
              <p className="text-slate-700 italic mb-4">
                "Single mom to certified MA in 5 months. Now working at a clinic with benefits for my family."
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Full-time at regional clinic</span>
              </div>
            </div>

            {/* Lisa - HVAC */}
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/images/Success_Story_Portrait_Lisa_9a59d350.png"
                  alt="Lisa T. - HVAC Technician Graduate"
                  fill
                  className="rounded-full object-cover border-4 border-emerald-400"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Lisa T.</h3>
              <p className="text-sm text-red-600 font-semibold mb-4">HVAC Technician Graduate</p>
              <p className="text-slate-700 italic mb-4">
                "Went from retail to skilled trades. Making 2x my old salary with room to grow."
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>EPA-certified technician</span>
              </div>
            </div>
          </div>

          {/* Video Testimonial Placeholder */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-2xl overflow-hidden">
              <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-lg">Watch Success Stories</p>
                    <p className="text-slate-400 text-sm mt-2">Video testimonials coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/success-stories"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Read more success stories
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-4 py-2 mb-6">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                </svg>
                <span className="text-orange-400 text-sm font-semibold">Now Available</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Take Elevate with you
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Access your training programs, track progress, and stay connected—right from your phone. Install our app for the best mobile experience.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-200">Access courses offline</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-200">Get push notifications for deadlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-200">Track your progress on the go</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-200">Quick access from your home screen</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    if ('serviceWorker' in navigator) {
                      alert('To install: Tap Share → Add to Home Screen (iOS) or tap Menu → Install App (Android)');
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-300 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  Install App
                </button>
                <p className="text-xs text-slate-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Works on iPhone & Android
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative mx-auto max-w-sm">
                {/* Phone mockup */}
                <div className="relative bg-slate-950 rounded-[3rem] p-4 shadow-2xl border-8 border-slate-800">
                  <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden">
                    {/* Phone notch */}
                    <div className="bg-slate-950 h-8 flex items-center justify-center">
                      <div className="w-32 h-6 bg-slate-950 rounded-b-3xl"></div>
                    </div>
                    {/* Phone screen content */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 h-[600px] overflow-hidden">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-emerald-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Elevate</h3>
                        <p className="text-slate-400 text-sm">Career Training</p>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-400/20 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-slate-700 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-400/20 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-slate-700 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-400/20 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-slate-700 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-emerald-400 text-slate-950 rounded-full p-3 shadow-lg animate-bounce">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with Background Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-banner.jpg"
            alt="Join Elevate For Humanity"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-slate-950/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-200 mb-8">
            Whether you're a learner, employer, or workforce board, Elevate has
            a solution for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition shadow-lg"
            >
              Browse programs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-slate-950 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
