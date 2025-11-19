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
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  },
  {
    slug: 'barber',
    name: 'Barber Apprenticeship',
    blurb:
      'State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.',
    funding: 'DOL Apprenticeship • WIOA',
    duration: '12–18 Months • On-the-Job + Classroom',
    image:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
  },
  {
    slug: 'hvac',
    name: 'HVAC Technician',
    blurb:
      'Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.',
    funding: 'Workforce Grants • Employer Sponsors',
    duration: '4–9 Months • Lab + Field',
    image:
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
  },
  {
    slug: 'building-tech',
    name: 'Building Maintenance Technician',
    blurb:
      'Training for building systems, repairs, and facility maintenance to keep properties safe and functional.',
    funding: 'Workforce Grants • Apprenticeship',
    duration: '4–9 Months • Hands-On',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness and Re-Entry',
    blurb:
      'Rebuild, reset, and re-enter the workforce with coaching, skills training, and real employment connections.',
    funding: 'Support Services • Referrals',
    duration: '4–12 Weeks • Coaching + Workshops',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Coursera Style with Video Background */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Students learning together"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Learn without limits
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Start, switch, or advance your career with free and funded
                workforce training, apprenticeships, and real job connections.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <Link
                  href="/apply"
                  className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg"
                >
                  Join for Free
                </Link>
                <Link
                  href="#programs"
                  className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
                >
                  Explore Programs
                </Link>
              </div>

              {/* Segmented CTAs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
                <Link
                  href="/programs"
                  className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition group"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">
                      I'm a Learner
                    </div>
                    <div className="text-xs text-blue-100">
                      Explore programs
                    </div>
                  </div>
                </Link>

                <Link
                  href="/partners"
                  className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition group"
                >
                  <svg
                    className="w-6 h-6 text-white"
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
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">
                      I'm a Case Manager
                    </div>
                    <div className="text-xs text-blue-100">Partner with us</div>
                  </div>
                </Link>

                <Link
                  href="/employers"
                  className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition group"
                >
                  <svg
                    className="w-6 h-6 text-white"
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
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">
                      I'm an Employer
                    </div>
                    <div className="text-xs text-blue-100">Hire talent</div>
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  State-Approved Programs
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  WRG • WIOA Funding
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Real Job Connections
                </span>
              </div>
            </div>

            {/* Right Image - Hands-on Training */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                  alt="Hands-on vocational training"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Video Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="/video"
                  className="bg-white/90 hover:bg-white rounded-full p-6 shadow-2xl transition transform hover:scale-110"
                >
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </Link>
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
              <div className="text-3xl font-bold text-gray-900">1,000+</div>
              <div className="text-sm text-gray-600">Students Trained</div>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Employer Partners</div>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
            <div>
              <div className="text-3xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Job Placement Rate</div>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
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
              Real people, real results. See how our graduates are building
              careers.
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
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  Marcus J.
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  Barber Apprenticeship Graduate
                </p>
                <p className="text-gray-600 text-sm">
                  "From incarceration to owning my own chair. Elevate gave me
                  the structure and support I needed."
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
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  Sarah M.
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  Medical Assistant Graduate
                </p>
                <p className="text-gray-600 text-sm">
                  "Single mom to certified MA in 5 months. Now working at a
                  clinic with benefits for my family."
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
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  James T.
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  HVAC Technician Graduate
                </p>
                <p className="text-gray-600 text-sm">
                  "Went from warehouse work to skilled trades. Making 2x my old
                  salary with room to grow."
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
