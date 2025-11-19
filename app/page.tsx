import Link from 'next/link';
import Image from 'next/image';

const programs = [
  {
    slug: 'medical-assistant',
    name: 'Medical Assistant',
    blurb:
      'Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.',
    funding: 'WRG • WIOA • Workforce Grants',
    duration: '4–6 Months • Hybrid',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  },
  {
    slug: 'barber',
    name: 'Barber Apprenticeship',
    blurb:
      'State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.',
    funding: 'DOL Apprenticeship • WIOA',
    duration: '12–18 Months • On-the-Job + Classroom',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
  },
  {
    slug: 'hvac',
    name: 'HVAC Technician',
    blurb:
      'Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.',
    funding: 'Workforce Grants • Employer Sponsors',
    duration: '4–9 Months • Lab + Field',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
  },
  {
    slug: 'building-tech',
    name: 'Building Maintenance Technician',
    blurb:
      'Training for building systems, repairs, and facility maintenance to keep properties safe and functional.',
    funding: 'Workforce Grants • Apprenticeship',
    duration: '4–9 Months • Hands-On',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness and Re-Entry',
    blurb:
      'Rebuild, reset, and re-enter the workforce with coaching, skills training, and real employment connections.',
    funding: 'Support Services • Referrals',
    duration: '4–12 Weeks • Coaching + Workshops',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Rich Modern Design */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 py-20 md:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Students learning together"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-6">
                🎓 100% Funded Training Programs
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                  Career Today
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed font-light">
                Free workforce training, apprenticeships, and direct job placement. 
                No cost. No barriers. Just opportunity.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/start"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-red-700 font-bold rounded-xl hover:bg-yellow-400 hover:text-red-900 transition-all shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                >
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="#programs"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-red-700 transition-all"
                >
                  View Programs
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-4xl font-bold text-yellow-300">$0</div>
                  <div className="text-red-100 text-sm">Cost to You</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-300">100%</div>
                  <div className="text-red-100 text-sm">Funded Programs</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="hidden md:block">
              <div className="grid gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Hands-On Training</h3>
                      <p className="text-red-100 text-sm">Real-world skills from industry experts</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Job Placement</h3>
                      <p className="text-red-100 text-sm">Direct connections to employers</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Certifications</h3>
                      <p className="text-red-100 text-sm">Industry-recognized credentials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / STATS STRIP - Coursera Style */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">$0</div>
              <div className="text-sm text-gray-600">Out-of-Pocket Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID - Coursera Style */}
      <section id="programs" className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore our catalog
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Choose from state-approved training programs with workforce
              funding available
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500"
              >
                {/* Course Thumbnail Image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/90 text-xs font-semibold text-blue-700 rounded">
                      {program.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {program.blurb}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Funding: {program.funding}</span>
                    <span className="text-blue-600 font-semibold group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programs"
              className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Coursera Style */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make the process simple. Our team walks with you from interest
              to employment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Connect & Explore
              </h3>
              <p className="text-gray-600">
                Complete a short interest form. Our team reviews funding options
                and program fit with you.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Enroll & Train
              </h3>
              <p className="text-gray-600">
                Enroll with our training partners. Receive coaching, case
                management, and support.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Elevate & Advance
              </h3>
              <p className="text-gray-600">
                Transition into jobs, apprenticeships, or next-level credentials
                with ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES - With Photos */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real people, real results. See how our graduates are building careers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Marcus - Barber Graduate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Marcus J.</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">Barber Apprenticeship Graduate</p>
                <p className="text-gray-600 text-sm">
                  "From incarceration to owning my own chair. Elevate gave me the structure and support I needed."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
                  alt="Sarah - Medical Assistant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Sarah M.</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">Medical Assistant Graduate</p>
                <p className="text-gray-600 text-sm">
                  "Single mom to certified MA in 5 months. Now working at a clinic with benefits for my family."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80"
                  alt="James - HVAC Technician"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">James T.</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">HVAC Technician Graduate</p>
                <p className="text-gray-600 text-sm">
                  "Went from warehouse work to skilled trades. Making 2x my old salary with room to grow."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/success-stories"
              className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Coursera Style */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers with
            free, funded training programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg text-lg"
            >
              Join for Free
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
