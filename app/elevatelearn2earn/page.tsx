import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ElevateLearn2Earn - Staffing Solutions | Elevate For Humanity",
  description:
    "Connect with pre-screened, trained talent through ElevateLearn2Earn staffing services. Hire graduates from our workforce training programs.",
};

export default function ElevateLearn2EarnPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Tagline + breadcrumb */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
        <span className="uppercase tracking-wide">
          ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span>Staffing Solutions</span>
      </div>

      {/* Hero */}
      <section className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700 border border-orange-100 uppercase tracking-wide mb-4">
          Staffing & Talent Solutions
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          ElevateLearn2Earn
        </h1>
        
        <p className="text-lg text-slate-700 mb-2">
          Staffing Solutions That Connect Training to Employment
        </p>
        
        <p className="text-sm text-slate-600 max-w-3xl">
          ElevateLearn2Earn is our staffing division that connects employers with job-ready talent from our workforce training programs. Every candidate comes pre-screened, trained, and supported by our case management team.
        </p>
      </section>

      {/* Key Features */}
      <section className="grid gap-6 md:grid-cols-3 mb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-3">🎯</div>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            Pre-Screened Candidates
          </h2>
          <p className="text-sm text-slate-700">
            Every candidate has completed our training programs and passed background checks, drug screenings, and skills assessments.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-3">📚</div>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            Trained & Certified
          </h2>
          <p className="text-sm text-slate-700">
            Candidates come with industry-recognized certifications and hands-on training in healthcare, trades, transportation, and more.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-2xl mb-3">🤝</div>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            Ongoing Support
          </h2>
          <p className="text-sm text-slate-700">
            Our case managers stay connected with both employers and employees to ensure successful placements and retention.
          </p>
        </div>
      </section>

      {/* Available Talent Pools */}
      <section className="mb-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Available Talent Pools
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Healthcare</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Medical Assistants</li>
                <li>• CNAs (Certified Nursing Assistants)</li>
                <li>• Patient Care Technicians</li>
                <li>• Phlebotomists</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Skilled Trades</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• HVAC Technicians</li>
                <li>• Building Maintenance Techs</li>
                <li>• Licensed Barbers</li>
                <li>• Welders</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Transportation</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• CDL Class A Drivers</li>
                <li>• Local Delivery Drivers</li>
                <li>• Logistics Coordinators</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Business Services</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Tax Preparers (VITA Certified)</li>
                <li>• Administrative Assistants</li>
                <li>• Customer Service Reps</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Entry-Level</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Workforce Ready Graduates</li>
                <li>• Re-entry Program Participants</li>
                <li>• Youth Program Graduates</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Apprenticeships</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Barber Apprentices</li>
                <li>• Trade Apprentices</li>
                <li>• On-the-Job Training Candidates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            How ElevateLearn2Earn Works
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Tell Us Your Needs</h3>
                <p className="text-sm text-slate-700">
                  Share your job requirements, skills needed, and timeline. We'll match you with candidates from our training programs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Review Pre-Screened Candidates</h3>
                <p className="text-sm text-slate-700">
                  We send you profiles of qualified candidates who have completed training, passed background checks, and are ready to work.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Interview & Hire</h3>
                <p className="text-sm text-slate-700">
                  Conduct interviews with candidates you like. We coordinate scheduling and provide additional information as needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Onboard with Support</h3>
                <p className="text-sm text-slate-700">
                  Our case managers stay involved during onboarding to ensure smooth transitions and address any early challenges.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                5
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Ongoing Check-Ins</h3>
                <p className="text-sm text-slate-700">
                  We follow up with both you and the employee at 30, 60, and 90 days to support retention and address any issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-10">
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Why Employers Choose ElevateLearn2Earn
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Reduce Time-to-Hire</h3>
                <p className="text-sm text-slate-700">
                  Skip the lengthy screening process. Our candidates are already trained and vetted.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Lower Training Costs</h3>
                <p className="text-sm text-slate-700">
                  Candidates arrive with industry certifications and hands-on experience.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Improve Retention</h3>
                <p className="text-sm text-slate-700">
                  Our ongoing support helps employees succeed and stay with your company longer.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Access Diverse Talent</h3>
                <p className="text-sm text-slate-700">
                  We serve underrepresented communities and provide pathways for re-entry populations.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Funding Support</h3>
                <p className="text-sm text-slate-700">
                  Eligible employers may qualify for OJT reimbursement and other workforce incentives.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Mission-Driven Partnership</h3>
                <p className="text-sm text-slate-700">
                  Hiring through us supports workforce development and community impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Ready to Hire Job-Ready Talent?
          </h2>
          <p className="text-sm text-slate-700 mb-5 max-w-2xl mx-auto">
            Connect with our staffing team to discuss your hiring needs and get matched with pre-screened candidates from our training programs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/employers/hire-graduates"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
            >
              Start Hiring Now
            </Link>
            <Link
              href="/employers/post-job"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
            >
              Post a Job Opening
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
            >
              Contact Staffing Team
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Get in Touch
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">ElevateLearn2Earn Staffing</h3>
              <p className="text-sm text-slate-700">
                8888 Keystone Crossing Suite 1300<br />
                Indianapolis, IN 46240<br />
                (317) 314-3757
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Quick Links</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>
                  <Link href="/employers" className="text-orange-600 hover:text-orange-700">
                    Employer Overview →
                  </Link>
                </li>
                <li>
                  <Link href="/employers/ojt-funding" className="text-orange-600 hover:text-orange-700">
                    OJT Funding Options →
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-orange-600 hover:text-orange-700">
                    View Training Programs →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
