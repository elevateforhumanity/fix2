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
          Post-Graduation Staffing for Internships & On-the-Job Training
        </p>
        
        <p className="text-sm text-slate-600 max-w-3xl">
          ElevateLearn2Earn is our staffing service that places program graduates with employer partners for internships, on-the-job training (OJT), and permanent positions. When students complete their training, we align them with jobs that match their skills and career goals.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-10">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            How ElevateLearn2Earn Works
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Our staffing service bridges the gap between training completion and career placement. Here's how we support both students and employer partners:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-lg border border-blue-200 p-4">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">Students Complete Training</h3>
              <p className="text-sm text-slate-700">
                Students finish their program with certifications, hands-on experience, and job-ready skills.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-blue-200 p-4">
              <div className="text-2xl mb-2">🤝</div>
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">We Match & Place</h3>
              <p className="text-sm text-slate-700">
                Our team aligns graduates with employer partners for internships, OJT positions, or direct hire opportunities.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-blue-200 p-4">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">Ongoing Support</h3>
              <p className="text-sm text-slate-700">
                Case managers stay involved to support both the graduate and employer through onboarding and beyond.
              </p>
            </div>
          </div>
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

      {/* Placement Types */}
      <section className="mb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Placement Options for Graduates
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Internships</h3>
                <p className="text-sm text-slate-700">
                  Short-term placements (typically 3-6 months) where graduates gain real-world experience with employer partners while receiving mentorship and support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">On-the-Job Training (OJT)</h3>
                <p className="text-sm text-slate-700">
                  Paid training positions where graduates learn company-specific skills while earning wages. Employers may qualify for OJT reimbursement through workforce funding.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Direct Hire Placements</h3>
                <p className="text-sm text-slate-700">
                  Permanent positions where graduates transition directly into full-time employment with ongoing support from our case management team.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-semibold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Apprenticeships</h3>
                <p className="text-sm text-slate-700">
                  DOL-registered apprenticeship placements where graduates earn while they continue learning advanced skills in their field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="mb-10">
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Benefits for Employer Partners
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Pre-Trained Candidates</h3>
                <p className="text-sm text-slate-700">
                  Graduates arrive with certifications, hands-on training, and industry-specific skills already in place.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">OJT Funding Available</h3>
                <p className="text-sm text-slate-700">
                  Eligible employers can receive reimbursement for on-the-job training costs through workforce programs.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Case Management Support</h3>
                <p className="text-sm text-slate-700">
                  Our team stays involved to help both the graduate and employer navigate challenges and ensure success.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Retention Support</h3>
                <p className="text-sm text-slate-700">
                  Regular check-ins at 30, 60, and 90 days help address issues early and improve long-term retention.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Build Your Pipeline</h3>
                <p className="text-sm text-slate-700">
                  Partner with us to create a steady pipeline of trained talent aligned with your specific needs.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-orange-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Community Impact</h3>
                <p className="text-sm text-slate-700">
                  Hiring our graduates supports workforce development and creates opportunities for underserved communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section className="mb-10">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Support for Program Graduates
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Job Matching</h3>
                <p className="text-sm text-slate-700">
                  We align your skills and career goals with employer partners looking for your specific training.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Interview Preparation</h3>
                <p className="text-sm text-slate-700">
                  Get coaching on resumes, interview skills, and professional communication before meeting employers.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Ongoing Coaching</h3>
                <p className="text-sm text-slate-700">
                  Your case manager stays with you through placement and beyond to help you succeed in your new role.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Career Advancement</h3>
                <p className="text-sm text-slate-700">
                  We help you plan next steps, whether that's moving from internship to full-time or advancing in your field.
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
            Partner with ElevateLearn2Earn
          </h2>
          <p className="text-sm text-slate-700 mb-5 max-w-2xl mx-auto">
            Whether you're an employer looking for trained talent or a graduate ready for placement, our staffing team connects the right people with the right opportunities.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/employers/hire-graduates"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
            >
              Employers: Hire Graduates
            </Link>
            <Link
              href="/student/portal"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Students: Access Portal
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
