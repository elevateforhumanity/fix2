import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] overflow-hidden border-b border-slate-800">
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
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-7xl px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase mb-4">
                Government-funded workforce ecosystem
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Elevate For Humanity is a{" "}
                <span className="text-emerald-400">
                  funded training platform
                </span>{" "}
                that connects students, employers, and workforce boards.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-3xl">
                We blend real classrooms, trusted partners, and a modern SaaS
                portal so people can earn credentials, employers can grow their
                teams, and workforce boards can see outcomes in one place. Many
                programs are eligible for WIOA, workforce grants, OJT, and other
                funding—often at little to no cost to the learner.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/directory"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition shadow-lg"
                >
                  Explore funded programs
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-slate-400 text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
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

      {/* Three-Column Value Prop */}
      <section className="py-20 border-b border-slate-800">
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
                  className="w-6 h-6 text-emerald-400"
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
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-2"
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
                  className="w-6 h-6 text-emerald-400"
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
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-2"
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
                  className="w-6 h-6 text-emerald-400"
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
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-2"
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
                <span className="text-2xl font-bold text-emerald-400">1</span>
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
                <span className="text-2xl font-bold text-emerald-400">2</span>
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
                <span className="text-2xl font-bold text-emerald-400">3</span>
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
                <span className="text-2xl font-bold text-emerald-400">4</span>
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
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                500+
              </div>
              <div className="text-slate-400">Learners enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                50+
              </div>
              <div className="text-slate-400">Employer partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                85%
              </div>
              <div className="text-slate-400">Completion rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                $2M+
              </div>
              <div className="text-slate-400">In workforce funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
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
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-slate-400 text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
