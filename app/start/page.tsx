import Link from "next/link";

export const metadata = {
  title: "Start Your Journey | Elevate for Humanity",
  description: "Choose your path: learner, case manager, or employer. Start your journey with Elevate for Humanity today.",
  openGraph: {
    images: ["/images/facilities-new/facility-19.jpg"],
    type: "website",
  }};

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Hero Section */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the path that's right for you. Whether you're a learner looking for training,
            a case manager supporting clients, or an employer building your team — we're here to help.
          </p>
        </div>
      </section>

      {/* Three Pathways */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Learner Path */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              I'm a Learner
            </h2>
            <p className="text-slate-600 mb-6">
              Explore free and funded training programs in healthcare, trades, CDL, and more.
              Build skills, earn credentials, and connect to real jobs.
            </p>
            <div className="space-y-3">
              <Link
                href="/programs"
                className="block w-full rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Explore Programs
              </Link>
              <Link
                href="/apply"
                className="block w-full rounded-xl border-2 border-blue-600 px-6 py-3 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Case Manager Path */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              I'm a Case Manager
            </h2>
            <p className="text-slate-600 mb-6">
              Refer clients to workforce training, track progress, and access reporting tools.
              Partner with us to support your community.
            </p>
            <div className="space-y-3">
              <Link
                href="/partners"
                className="block w-full rounded-xl bg-red-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Partner Information
              </Link>
              <Link
                href="/workforce-partners"
                className="block w-full rounded-xl border-2 border-red-600 px-6 py-3 text-center text-sm font-semibold text-red-600 hover:bg-red-50 transition"
              >
                Workforce Partners
              </Link>
            </div>
          </div>

          {/* Employer Path */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              I'm an Employer
            </h2>
            <p className="text-slate-600 mb-6">
              Build your talent pipeline with trained, work-ready candidates. Host apprentices,
              interns, or hire directly from our programs.
            </p>
            <div className="space-y-3">
              <Link
                href="/employers"
                className="block w-full rounded-xl bg-orange-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-orange-700 transition"
              >
                Employer Benefits
              </Link>
              <Link
                href="/partners/enroll"
                className="block w-full rounded-xl border-2 border-orange-600 px-6 py-3 text-center text-sm font-semibold text-orange-600 hover:bg-orange-50 transition"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="bg-white border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Not sure where to start?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/contact"
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 hover:bg-slate-100 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Contact Us</h3>
                <p className="text-sm text-slate-600">Get personalized guidance</p>
              </div>
            </Link>

            <Link
              href="/faq"
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 hover:bg-slate-100 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">FAQ</h3>
                <p className="text-sm text-slate-600">Find answers to common questions</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
