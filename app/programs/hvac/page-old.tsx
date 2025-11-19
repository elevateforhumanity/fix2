// app/programs/hvac/page.tsx
import Link from "next/link";

export default function HvacProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Skilled Trades Pathway
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            HVAC Technician Training Pathway
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            A partner-led HVAC pathway that combines classroom, lab, and field
            exposure so learners can move into high-demand heating, ventilation,
            and air conditioning careers with real support from Elevate.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              4–9 months · Lab + Classroom
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Partner HVAC school · Elevate support
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Workforce funding & employer sponsorship friendly
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
                For problem-solvers who like hands-on work and being in the field.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                This HVAC pathway is a strong fit if you:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Enjoy fixing things and using tools</li>
                <li>• Don&apos;t want to be stuck at a desk all day</li>
                <li>• Want a trade you can grow in for years</li>
                <li>• Are okay with working indoors and outdoors</li>
                <li>• Are ready for a structured training plan and support</li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                HVAC is a high-demand trade with strong income potential for
                people who like to work with their hands and solve real-world problems.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Program snapshot
              </p>
              <ul className="space-y-1.5">
                <li>• <span className="font-semibold">Length:</span> 4–9 months (varies by partner)</li>
                <li>• <span className="font-semibold">Format:</span> Classroom + lab + hands-on projects</li>
                <li>• <span className="font-semibold">Location:</span> Partner HVAC training sites</li>
                <li>• <span className="font-semibold">Support:</span> Elevate onboarding, reminders, barrier support</li>
                <li>• <span className="font-semibold">Outcome:</span> Prepared for entry-level HVAC roles and further credentialing</li>
              </ul>
              <p className="mt-3 text-xs text-slate-400">
                *Exact courses, certifications, and credential routes depend on the training provider.
              </p>
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
              Build a foundation in a trade that keeps buildings running.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Core Technical Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• HVAC system basics</li>
                <li>• Tools & safety</li>
                <li>• Basic electrical concepts</li>
                <li>• Troubleshooting fundamentals</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Hands-On Lab Experience
              </h3>
              <ul className="space-y-1.5">
                <li>• Working with real or simulated units</li>
                <li>• Practicing diagnostic steps</li>
                <li>• Learning how to follow work orders</li>
                <li>• Taking direction from experienced techs</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Career & Professional Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• Showing up prepared and on time</li>
                <li>• Communicating with customers and supervisors</li>
                <li>• Reading basic diagrams or documentation</li>
                <li>• Planning your next steps in the trade</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Roles & responsibilities
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Elevate is your coordinator. The HVAC school is your training site.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Elevate partners with HVAC schools so learners, case managers, and
                employers have one hub instead of ten phone calls.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="text-xs font-semibold text-orange-300 mb-1">
                    Elevate For Humanity:
                  </p>
                  <ul className="space-y-1">
                    <li>• Intake & interest screening</li>
                    <li>• Funding & referral coordination</li>
                    <li>• Barrier support & coaching</li>
                    <li>• Attendance and progress tracking with the school</li>
                    <li>• Employer introduction and job pathway planning</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="text-xs font-semibold text-orange-300 mb-1">
                    HVAC Training Partner:
                  </p>
                  <ul className="space-y-1">
                    <li>• Provides classroom and lab training</li>
                    <li>• Evaluates technical skills and competencies</li>
                    <li>• Maintains training site, tools, and safety</li>
                    <li>• Shares attendance and completion details with Elevate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                For agencies & partners
              </p>
              <p className="mb-2">
                Elevate keeps your referrals visible through{" "}
                <span className="font-semibold">
                  documented steps and status updates
                </span>
                , instead of "we sent them to a trade school and hope it worked out."
              </p>
              <Link
                href="/partners"
                className="mt-3 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                View partner options →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Funding & cost
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Many learners qualify for support with tuition and tools.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Depending on your region and eligibility, HVAC learners may access:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Workforce training funds (WRG, WIOA, and similar programs)</li>
                <li>• Supportive services for transportation or equipment</li>
                <li>• Employer sponsorship when hiring into HVAC roles</li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                We walk through funding with you before enrollment to help avoid
                surprise costs whenever possible.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Next step
              </p>
              <p className="mb-3">
                Complete a short interest form so we can see if HVAC is available
                in your area and which partner school is the best fit.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
              >
                Start My Application
              </Link>
              <p className="mt-3 text-xs text-slate-400">
                Case managers can also send referrals directly through the partner form.
              </p>
              <Link
                href="/partners"
                className="mt-2 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                Refer a participant →
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
                Ready to explore the HVAC pathway?
              </h2>
              <p className="mt-3 text-sm text-slate-100">
                Share where you are now and where you&apos;d like to go. We&apos;ll
                help you see if HVAC is the right fit and what steps to take next.
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
