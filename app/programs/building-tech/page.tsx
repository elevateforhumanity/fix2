// app/programs/building-tech/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Maintenance Technician Program - Facilities Career",
  description: "Building maintenance technician training. Learn HVAC, electrical, plumbing, and facilities management. WIOA-funded, 4-9 months. Start your skilled trade career.",
  keywords: ["building maintenance", "facilities technician", "property maintenance", "skilled trade", "WIOA facilities program"],
  openGraph: {
    title: "Building Maintenance Technician Program | Elevate for Humanity",
    description: "Building maintenance technician training. Learn HVAC, electrical, plumbing, and facilities management. WIOA-funded.",
    images: ["/images/homepage/building-maintenance.png"],
    type: "website",
  },
};

export default function BuildingMaintenanceProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Facilities & Property Pathway
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Building Maintenance Technician Pathway
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            A practical training pathway for people who like to fix things,
            solve problems, and keep buildings safe and running—backed by
            Elevate&apos;s support and employer connections.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              4–9 months · On-site & skills-based
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Partner-led instruction · Elevate coordination
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Workforce funding & apprenticeship aligned
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Start My Application
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/5 transition"
            >
              Talk With Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* WHO & SNAPSHOT */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.6fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Who this pathway is for
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Ideal for people who like variety, movement, and solving problems.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                This pathway is a strong fit if you:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Enjoy learning how systems work</li>
                <li>• Don&apos;t want to sit in the same spot all day</li>
                <li>• Like fixing, maintaining, and improving spaces</li>
                <li>• Want a trade that can grow over time</li>
                <li>• Are comfortable learning multiple skills (basic HVAC, plumbing, electrical, etc.)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Program snapshot
              </p>
              <ul className="space-y-1.5">
                <li>• <span className="font-semibold">Length:</span> 4–9 months (varies by partner)</li>
                <li>• <span className="font-semibold">Format:</span> Hands-on tasks + guided instruction</li>
                <li>• <span className="font-semibold">Location:</span> Partner training sites and/or real properties</li>
                <li>• <span className="font-semibold">Support:</span> Elevate coaching, reminders, and employer connections</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              What you'll learn
            </p>
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">
              A mix of skills that keep properties safe and functional.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Practical Maintenance Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• Basic HVAC & filter changes</li>
                <li>• Light plumbing (leaks, clogs, fixtures)</li>
                <li>• Basic electrical (switches, outlets, lighting)</li>
                <li>• General repairs & safety checks</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Building Systems Awareness
              </h3>
              <ul className="space-y-1.5">
                <li>• Reading basic work orders</li>
                <li>• Understanding building layouts</li>
                <li>• Coordinating with vendors</li>
                <li>• Preventive maintenance basics</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Workplace & Career Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• Communication with tenants/teams</li>
                <li>• Documentation of work completed</li>
                <li>• Safety practices and checklists</li>
                <li>• Planning advancement in the trade</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING + CTA */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Funding & employer connections
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Training that points directly toward real building maintenance jobs.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Elevate works with property management companies, facilities
                teams, and maintenance employers to create real opportunities
                after training.
              </p>
              <p className="mt-3 text-sm text-slate-300">
                Many learners may qualify for workforce funding, supportive services,
                or apprenticeship-style placements. Exact details are reviewed
                individually.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Take the next step
              </p>
              <p className="mb-3">
                Share a bit about your background, and we&apos;ll explore if Building
                Maintenance is available and the right fit for you.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
              >
                Start My Application
              </Link>
              <p className="mt-3 text-xs text-slate-400">
                Employers interested in building a maintenance talent pipeline can also contact us.
              </p>
              <Link
                href="/employers"
                className="mt-2 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                Build a talent pipeline →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="rounded-3xl border border-orange-400/50 bg-gradient-to-r from-orange-600/30 via-slate-900 to-slate-950 px-6 py-10 md:px-10 md:py-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to explore Building Maintenance?
              </h2>
              <p className="mt-3 text-sm text-slate-100">
                We&apos;ll help you see if this pathway fits your strengths, your
                goals, and your life right now.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition"
              >
                Start My Application
              </Link>
              <Link
                href="/programs"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/5 transition"
              >
                View all programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
