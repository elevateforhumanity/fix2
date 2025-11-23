// app/employers/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Skilled Workers - Employer Portal",
  description: "Connect with job-ready candidates trained in healthcare, skilled trades, and more. Post jobs, access talent pipeline, and build your workforce with WIOA funding support.",
  keywords: ["employer portal", "hire workers", "talent pipeline", "workforce solutions", "OJT", "work experience", "apprenticeships"],
  openGraph: {
    title: "Hire Skilled Workers - Employer Portal | Elevate for Humanity",
    description: "Connect with job-ready candidates trained in healthcare, skilled trades, and more. Post jobs and access talent pipeline.",
    images: ["/images/homepage/employer-partnerships.png"],
    type: "website",
  },
};

const employerStats = [
  { label: "Learners ready for placement", value: "250+" },
  { label: "Active employer partners", value: "40+" },
  { label: "Funding pathways supported", value: "10+" },
  { label: "Average wage gain", value: "$6–$12/hr" },
];

const fundingOptions = [
  {
    title: "On-the-Job Training (OJT)",
    points: [
      "Reimbursement of 50–75% of wages during training period",
      "Customized training plans aligned to your roles",
      "We handle compliance and paperwork with workforce boards",
    ],
  },
  {
    title: "Work Experience (WEX)",
    points: [
      "Short-term, paid work experience with learners",
      "Try out candidates before making long-term hires",
      "Ideal for new or entry-level roles",
    ],
  },
  {
    title: "Apprenticeships & Earn-and-Learn",
    points: [
      "Formal pathways in trades, healthcare, and more",
      "Blend classroom, on-the-job learning, and mentorship",
      "Stackable credentials and long-term talent pipelines",
    ],
  },
  {
    title: "Upskilling Your Existing Staff",
    points: [
      "Train current employees in new skills or credentials",
      "Leverage grants and tuition assistance where available",
      "Customized cohorts built around your schedule",
    ],
  },
];

const industries = [
  {
    icon: "🏥",
    label: "Healthcare",
    text: "Hospitals, clinics, long-term care, home health agencies.",
  },
  {
    icon: "🏗️",
    label: "Construction & Trades",
    text: "HVAC, facilities, electrical, maintenance, and more.",
  },
  {
    icon: "🚛",
    label: "Transportation & Logistics",
    text: "CDL drivers, warehouse, logistics support roles.",
  },
  {
    icon: "🏭",
    label: "Manufacturing",
    text: "Production, quality, machine operation, safety.",
  },
  {
    icon: "🍽️",
    label: "Hospitality & Service",
    text: "Hotels, food service, customer-facing roles.",
  },
  {
    icon: "💼",
    label: "Business & Admin",
    text: "Customer service, admin, basic IT and office roles.",
  },
];

export default function EmployersPage() {
  return (
    <main className="bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/images/split/piece-13.png"
            alt="Employers partnering with Elevate For Humanity"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-slate-950/95" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:px-12 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-3 inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Employers & workforce partners
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Build a reliable talent pipeline with{" "}
              <span className="text-emerald-400">funded training & support</span>.
            </h1>
            <p className="mt-4 text-sm text-slate-200 sm:text-base">
              Elevate For Humanity connects you with pre-screened talent in
              healthcare, trades, transportation, and more—backed by funding
              options, coaching, and retention support.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
              >
                Start a hiring conversation
              </Link>
              <Link
                href="/employer/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300"
              >
                Employer portal
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              OJT · WEX · apprenticeships · re-entry · youth · upskilling cohorts.
            </p>
          </div>

          {/* Right: highlight card */}
          <div className="relative flex-1">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
              <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-4">
                What you get with Elevate
              </p>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>• Candidates who have been coached on expectations and soft skills.</li>
                <li>• Funding options that reduce your training and onboarding costs.</li>
                <li>• A partner that stays involved after the hire to support retention.</li>
                <li>• Documentation and data you can share with boards, funders, and HR.</li>
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs text-slate-400">
                <div>
                  <p className="font-semibold text-emerald-300">Ready-to-hire talent</p>
                  <p>Graduates and in-training learners across key roles.</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Barrier-aware support</p>
                  <p>We help with communication, attendance, and problem-solving.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-slate-800 bg-slate-950/90">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-6 px-6 py-6 md:px-12 md:py-8">
            {employerStats.map((s) => (
              <div key={s.label} className="min-w-[150px] flex-1">
                <p className="text-lg font-semibold text-emerald-400">
                  {s.value}
                </p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner with Elevate */}
      <section className="border-b border-slate-800 bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why employers work with Elevate
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              You get more than resumes. You get a partner focused on retention,
              performance, and impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                <span className="text-lg">✅</span>
              </div>
              <h3 className="text-sm font-semibold">Pre-screened, coached candidates</h3>
              <p className="mt-3 text-xs text-slate-300">
                Learners understand workplace expectations, communication, and
                attendance before they&apos;re in front of your supervisors.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                <span className="text-lg">🤝</span>
              </div>
              <h3 className="text-sm font-semibold">Barrier-aware wraparound support</h3>
              <p className="mt-3 text-xs text-slate-300">
                We stay engaged with both the learner and your team to address early
                issues before they turn into turnover.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                <span className="text-lg">📊</span>
              </div>
              <h3 className="text-sm font-semibold">Documentation & impact reporting</h3>
              <p className="mt-3 text-xs text-slate-300">
                Track hires, retention, and advancement for internal reporting, board
                updates, and funding partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How partnership works */}
      <section className="border-b border-slate-200 bg-white py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              How an employer partnership works
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Simple, transparent steps from first conversation to ongoing talent pipeline.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-slate-950">
                1
              </div>
              <h3 className="text-sm font-semibold">Connect with us</h3>
              <p className="mt-2 text-xs text-slate-600">
                Share your roles, schedules, and what &quot;successful&quot; looks like in
                your environment.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-slate-950">
                2
              </div>
              <h3 className="text-sm font-semibold">Align programs & funding</h3>
              <p className="mt-2 text-xs text-slate-600">
                We map your roles to existing programs and identify OJT, WEX, or other
                funding options.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-slate-950">
                3
              </div>
              <h3 className="text-sm font-semibold">Interview and onboard</h3>
              <p className="mt-2 text-xs text-slate-600">
                You interview candidates who have been prepped on your expectations and
                the support available.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-slate-950">
                4
              </div>
              <h3 className="text-sm font-semibold">Support & retention</h3>
              <p className="mt-2 text-xs text-slate-600">
                We partner with you on check-ins, problem-solving, and advancement
                pathways for your new hires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding options */}
      <section className="border-b border-slate-800 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Leverage workforce funding, not just your budget
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              We help you braid together grants, OJT, WEX, and apprenticeships so you
              can hire confidently.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {fundingOptions.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <h3 className="text-sm font-semibold text-emerald-300">
                  {f.title}
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-200">
                  {f.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="border-b border-slate-200 bg-white py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Industries we serve</h2>
            <p className="mt-3 text-sm text-slate-600">
              If you hire entry- and mid-level talent, we can help you build a pipeline.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {industries.map((i) => (
              <div
                key={i.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-3xl">{i.icon}</div>
                <h3 className="mt-3 text-sm font-semibold">{i.label}</h3>
                <p className="mt-2 text-xs text-slate-600">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer testimonial */}
      <section className="border-b border-slate-800 bg-slate-950 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/split/piece-14.png"
              alt="HR Director"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-5xl text-emerald-400 mb-4">&ldquo;</p>
          <blockquote className="text-lg text-slate-100">
            Elevate For Humanity helped us fill critical frontline roles with candidates
            who were prepared for the reality of the work. They stayed involved with our
            supervisors and new hires, which made all the difference in retention.
          </blockquote>
          <div className="mt-4 text-xs text-slate-400">
            <p className="font-semibold text-white">Sarah Johnson</p>
            <p>HR Director, Regional Healthcare System</p>
          </div>
        </div>
      </section>

      {/* Final CTA for employers */}
      <section className="bg-gradient-to-br from-emerald-500/15 via-slate-950 to-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let&apos;s build your workforce pipeline together
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            Share your openings, shifts, and priorities. We&apos;ll help you design a
            funded talent pathway that fits your reality on the ground.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Schedule a conversation
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
            >
              View training programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Need MOUs, OJT templates, or reporting language? We can provide those as part
            of partnership onboarding.
          </p>
        </div>
      </section>
    </main>
  );
}
