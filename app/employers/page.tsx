import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Employers | Elevate For Humanity",
  description: "Partner with Elevate For Humanity to hire pre-screened, trained talent. Access OJT funding, apprenticeships, and staffing solutions through ElevateLearn2Earn.",
};

export default function EmployersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Tagline */}
      <div className="mb-3 text-[11px] text-slate-500 uppercase tracking-wide">
        ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
      </div>

      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Hire Job-Ready Talent
        </h1>
        <p className="text-lg text-slate-700 mb-2">
          Partner with Elevate For Humanity to access pre-screened, trained candidates and reduce your time-to-hire.
        </p>
        <p className="text-sm text-slate-600 max-w-3xl">
          We connect employers with graduates from our workforce training programs in healthcare, skilled trades, transportation, and more. Every candidate comes with certifications, hands-on training, and ongoing support.
        </p>
      </section>

      {/* Featured: ElevateLearn2Earn */}
      <section className="mb-10">
        <div className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-4xl">🎯</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                ElevateLearn2Earn Staffing Solutions
              </h2>
              <p className="text-sm text-slate-700 mb-4">
                Our dedicated staffing division connects you with pre-screened, trained talent from our programs. Get access to healthcare workers, skilled tradespeople, CDL drivers, and more—all with ongoing support to ensure successful placements.
              </p>
              <Link
                href="/elevatelearn2earn"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
              >
                Explore ElevateLearn2Earn →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">
          How We Support Employers
        </h2>
        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/employers/hire-graduates"
            className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 mb-2">
              Hire Graduates
            </h3>
            <p className="text-sm text-slate-700">
              Access our talent pool of trained, certified graduates ready to start work immediately.
            </p>
          </Link>

          <Link
            href="/employers/post-job"
            className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 mb-2">
              Post Job Openings
            </h3>
            <p className="text-sm text-slate-700">
              Share your open positions with our students and alumni network.
            </p>
          </Link>

          <Link
            href="/employers/ojt-funding"
            className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 mb-2">
              OJT & Funding
            </h3>
            <p className="text-sm text-slate-700">
              Learn about On-the-Job Training reimbursement and other workforce incentives.
            </p>
          </Link>

          <Link
            href="/employers/placements"
            className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 mb-2">
              Placement Services
            </h3>
            <p className="text-sm text-slate-700">
              Work with our team to match candidates to your specific needs and culture.
            </p>
          </Link>

          <Link
            href="/funding/apprenticeships"
            className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 mb-2">
              Apprenticeships
            </h3>
            <p className="text-sm text-slate-700">
              Host DOL-registered apprentices and build your talent pipeline.
            </p>
          </Link>

          <Link
            href="/employers/dashboard"
            className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700 mb-2">
              Employer Dashboard
            </h3>
            <p className="text-sm text-slate-700">
              Manage job postings, review candidates, and track placements in one place.
            </p>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Why Partner with Elevate For Humanity
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Pre-Screened Candidates</h3>
                <p className="text-sm text-slate-700">
                  All candidates have passed background checks, drug screenings, and skills assessments.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Industry Certifications</h3>
                <p className="text-sm text-slate-700">
                  Graduates arrive with recognized credentials and hands-on training experience.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Ongoing Support</h3>
                <p className="text-sm text-slate-700">
                  Our case managers stay involved to support retention and address challenges.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Funding Opportunities</h3>
                <p className="text-sm text-slate-700">
                  Access OJT reimbursement, apprenticeship grants, and other workforce incentives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Ready to Start Hiring?
          </h2>
          <p className="text-sm text-slate-700 mb-5 max-w-2xl mx-auto">
            Connect with our employer services team to discuss your hiring needs and explore staffing solutions through ElevateLearn2Earn.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/elevatelearn2earn"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
            >
              Visit ElevateLearn2Earn
            </Link>
            <Link
              href="/employers/hire-graduates"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
            >
              Browse Candidates
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
