import Link from "next/link";

const programs = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    blurb: "Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.",
    funding: "WRG • WIOA • Workforce Grants",
    duration: "4–6 Months • Hybrid",
  },
  {
    slug: "barber",
    name: "Barber Apprenticeship",
    blurb: "State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.",
    funding: "DOL Apprenticeship • WIOA",
    duration: "12–18 Months • On-the-Job + Classroom",
  },
  {
    slug: "hvac",
    name: "HVAC Technician",
    blurb: "Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.",
    funding: "Workforce Grants • Employer Sponsors",
    duration: "4–9 Months • Lab + Field",
  },
  {
    slug: "building-tech",
    name: "Building Maintenance Technician",
    blurb: "Training for building systems, repairs, and facility maintenance to keep properties safe and functional.",
    funding: "Workforce Grants • Apprenticeship",
    duration: "4–9 Months • Hands-On",
  },
  {
    slug: "workforce-readiness",
    name: "Workforce Readiness & Re-Entry",
    blurb: "Rebuild, reset, and re-enter the workforce with coaching, skills training, and real employment connections.",
    funding: "Support Services • Referrals",
    duration: "4–12 Weeks • Coaching + Workshops",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Coursera Style */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Learn without limits
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Start, switch, or advance your career with free & funded workforce training, apprenticeships, and real job connections.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
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

              <div className="flex flex-wrap gap-3 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  State-Approved Programs
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  WRG • WIOA Funding
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Real Job Connections
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Students learning together"
                className="rounded-2xl shadow-2xl"
              />
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
              Choose from state-approved training programs with workforce funding available
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
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
              We make the process simple. Our team walks with you from interest to employment.
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
                Complete a short interest form. Our team reviews funding options and program fit with you.
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
                Enroll with our training partners. Receive coaching, case management, and support.
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
                Transition into jobs, apprenticeships, or next-level credentials with ongoing support.
              </p>
            </div>
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
            Join thousands of learners who are advancing their careers with free, funded training programs.
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
