// app/employers/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function EmployersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            For Employers & Hiring Managers
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl lg:text-5xl">
            Build a Talent Pipeline with Elevate For Humanity™
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            We partner with employers to connect you with candidates who&apos;ve
            completed training, understand expectations, and have been supported
            through real-life barriers.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              Healthcare · Trades · Transportation · Facilities
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Start a hiring conversation
            </Link>
            <Link
              href="/employer/dashboard"
              className="rounded-full border-2 border-orange-500 px-6 py-3 text-sm font-semibold text-orange-300 hover:bg-orange-500/10 transition"
            >
              Employer Portal
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ELEVATE */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Why partner with Elevate?
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 hover:border-orange-400/50 transition">
              <div className="w-12 h-12 bg-orange-400/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-orange-300">
                Pre-screened Candidates
              </h3>
              <p>
                Candidates have completed or are completing training and have
                had expectations clearly explained before they&apos;re in front of you.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 hover:border-orange-400/50 transition">
              <div className="w-12 h-12 bg-orange-400/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-orange-300">
                Barrier-Aware Support
              </h3>
              <p>
                We work with learners on transportation, communication, and soft
                skills so your supervisors aren&apos;t alone in managing challenges.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 hover:border-orange-400/50 transition">
              <div className="w-12 h-12 bg-orange-400/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-orange-300">
                Workforce & Community Alignment
              </h3>
              <p>
                Show community impact while filling roles—our documentation and
                reporting help with stories, grants, and board updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            How employer partnerships work
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Connect with us</h3>
              <p className="text-sm text-slate-300">
                Share your hiring needs, company culture, and role requirements.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">We train candidates</h3>
              <p className="text-sm text-slate-300">
                Learners complete industry-aligned training with your needs in mind.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Meet qualified talent</h3>
              <p className="text-sm text-slate-300">
                Review pre-screened candidates ready for interviews and placement.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Ongoing support</h3>
              <p className="text-sm text-slate-300">
                We provide retention support and track outcomes for reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING OPTIONS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Leverage workforce funding
          </h2>
          <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
            Reduce your hiring costs by tapping into government-funded training programs
            and on-the-job training (OJT) reimbursements.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-3 text-orange-300">
                On-the-Job Training (OJT)
              </h3>
              <p className="text-sm text-slate-200 mb-4">
                Get reimbursed for up to 50-75% of a new hire&apos;s wages during their
                training period. We handle the paperwork and compliance.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reduce training costs significantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Build custom training plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Improve retention and loyalty</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-3 text-orange-300">
                Work Experience (WEX) & Apprenticeships
              </h3>
              <p className="text-sm text-slate-200 mb-4">
                Host learners for paid work experience or registered apprenticeships.
                Build your pipeline while they gain real-world skills.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Try before you hire</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Develop talent your way</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access tax credits and incentives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="border-b border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Industries we serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🏥</div>
              <h3 className="font-semibold text-sm">Healthcare</h3>
              <p className="text-xs text-slate-400 mt-1">CNA, MA, Phlebotomy, Home Health</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🔧</div>
              <h3 className="font-semibold text-sm">Skilled Trades</h3>
              <p className="text-xs text-slate-400 mt-1">HVAC, Electrical, Plumbing, Welding</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🚛</div>
              <h3 className="font-semibold text-sm">Transportation</h3>
              <p className="text-xs text-slate-400 mt-1">CDL-A, CDL-B, Forklift, Logistics</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-sm">Business & Tech</h3>
              <p className="text-xs text-slate-400 mt-1">IT Support, Customer Service, Admin</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🏗️</div>
              <h3 className="font-semibold text-sm">Construction</h3>
              <p className="text-xs text-slate-400 mt-1">OSHA, Carpentry, Heavy Equipment</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🍽️</div>
              <h3 className="font-semibold text-sm">Hospitality</h3>
              <p className="text-xs text-slate-400 mt-1">Food Service, Hotel Management</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🏭</div>
              <h3 className="font-semibold text-sm">Manufacturing</h3>
              <p className="text-xs text-slate-400 mt-1">Production, Quality Control, Safety</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-orange-400/50 transition">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-semibold text-sm">Green Jobs</h3>
              <p className="text-xs text-slate-400 mt-1">Solar, Sustainability, Energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-10 md:px-10 lg:px-12 lg:py-14 text-center">
          <div className="text-orange-400 text-5xl mb-4">"</div>
          <blockquote className="text-lg md:text-xl text-slate-200 mb-6">
            Elevate For Humanity helped us find reliable, trained candidates when we
            needed them most. The support doesn&apos;t stop after placement—they stay
            involved to ensure success for both the employee and our team.
          </blockquote>
          <div className="text-sm text-slate-400">
            <p className="font-semibold text-white">Sarah Johnson</p>
            <p>HR Director, Regional Healthcare System</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange-500/10 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 lg:px-12 lg:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to build your workforce pipeline?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your hiring needs and how Elevate For Humanity can
            connect you with trained, motivated candidates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold bg-orange-500 text-white hover:bg-orange-400 transition shadow-lg"
            >
              Schedule a consultation
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border-2 border-orange-500 text-orange-300 hover:bg-orange-500/10 transition"
            >
              View training programs
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Questions? Email us at employers@elevateforhumanity.org or call (555) 123-4567
          </p>
        </div>
      </section>
    </main>
  );
}
