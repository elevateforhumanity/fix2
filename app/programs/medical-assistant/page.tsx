// app/programs/medical-assistant/page.tsx
import Link from "next/link";

export default function MedicalAssistantProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Healthcare Pathway
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Medical Assistant Training Pathway
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            A structured Medical Assistant pathway that blends classroom,
            clinical skills, and real-world support so adults, youth, and
            re-entry learners can move into high-demand healthcare roles with
            confidence.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              4–6 months · Hybrid learning
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Partner-delivered instruction · Elevate support
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              WRG · WIOA · Workforce funding friendly
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

      {/* WHO THIS IS FOR + QUICK FACTS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.6fr,1.2fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Who this pathway is for
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Built for people who are ready for a stable healthcare career,
                not just another job.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                This pathway is a strong fit if you:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Enjoy helping people and working in a team environment</li>
                <li>• Want a career with clear growth (LPN, RN, specialty roles)</li>
                <li>• Are okay with both hands-on skills and computer work</li>
                <li>• Need a structured plan, reminders, and real accountability</li>
                <li>
                  • Are re-entry, changing careers, or restarting and want
                  something respected and in demand
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                If you&apos;re not sure whether Medical Assistant or another
                program is the best fit, our team can walk through your story
                and help you decide.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Program snapshot
              </p>
              <ul className="space-y-1.5">
                <li>
                  <span className="font-semibold text-slate-100">
                    Length:
                  </span>{" "}
                  Typically 4–6 months (varies by partner school schedule)
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Format:
                  </span>{" "}
                  Classroom + lab skills, with potential clinical experience
                </li>
                <li>
                  <span className="font-semibold text-slate-100">Location:</span>{" "}
                  Partner training sites coordinated through Elevate
                </li>
                <li>
                  <span className="font-semibold text-slate-100">Support:</span>{" "}
                  Coaching, reminders, barrier support, and employer connections
                  from Elevate
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Funding:
                  </span>{" "}
                  Many learners qualify for little to no out-of-pocket cost
                  through workforce funding.
                </li>
              </ul>
              <p className="mt-3 text-xs text-slate-400">
                *Specific schedules, locations, and clinical details are shared
                with each learner during onboarding and partner selection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              What you&apos;ll learn
            </p>
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">
              Real skills for real clinics, not just test prep.
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Exact topics vary slightly by credentialing partner, but most
              Medical Assistant pathways include:
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Clinical Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• Vital signs & patient intake</li>
                <li>• Basic clinical procedures</li>
                <li>• Rooming patients & exam prep</li>
                <li>• Infection control basics</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Administrative Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• Scheduling & front-desk workflow</li>
                <li>• Electronic records basics</li>
                <li>• Communication with providers</li>
                <li>• Professionalism in healthcare settings</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Career & Life Skills
              </h3>
              <ul className="space-y-1.5">
                <li>• Job search and interview prep</li>
                <li>• Time management and attendance</li>
                <li>• Soft skills for patient care</li>
                <li>• Planning next steps after graduation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW ELEVATE + PARTNER SCHOOL WORK TOGETHER */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Roles & responsibilities
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Elevate is your hub. Our partner school is your classroom.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Elevate For Humanity does not replace your training provider.
                Instead, we remove confusion by coordinating everything around
                the program.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="text-xs font-semibold text-orange-300 mb-1">
                    Elevate For Humanity does:
                  </p>
                  <ul className="space-y-1">
                    <li>• Intake, applications, and referrals</li>
                    <li>• Funding and eligibility coordination</li>
                    <li>• Coaching, case management, and check-ins</li>
                    <li>• Attendance and progress tracking in partnership with the school</li>
                    <li>• Employer outreach and job connections</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="text-xs font-semibold text-orange-300 mb-1">
                    Credentialing partner does:
                  </p>
                  <ul className="space-y-1">
                    <li>• Delivers classroom and lab instruction</li>
                    <li>• Provides training site and equipment</li>
                    <li>• Evaluates skills, grades, and competencies</li>
                    <li>• Issues documentation needed for credentialing or exams</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                For agencies & case managers
              </p>
              <p className="mb-2">
                You get{" "}
                <span className="font-semibold">
                  one point of contact and one reporting hub
                </span>{" "}
                instead of chasing updates from multiple schools.
              </p>
              <ul className="space-y-1.5">
                <li>• Clear program outline and expectations</li>
                <li>• Status updates on enrollment and progress</li>
                <li>• Documentation support for workforce reporting</li>
              </ul>
              <Link
                href="/partners"
                className="mt-3 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                View partner information →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING & COST */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Funding & cost
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Many learners pay little to nothing out of pocket.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Elevate coordinates with workforce boards, training providers,
                and employers to explore funding options such as:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• WorkReady Grants (WRG) and WIOA funding where available</li>
                <li>• Other local and state-approved training funds</li>
                <li>• Employer sponsorship or tuition assistance when possible</li>
                <li>• Payment plans through partner schools if needed</li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                Exact costs depend on your location, funding eligibility, and
                selected training provider. We review options with you before
                you enroll so there are no surprises.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Next step: check eligibility
              </p>
              <p className="mb-3">
                The simplest way to know what you qualify for is to complete a
                short application. We&apos;ll review your situation, funding
                options, and timing with you.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
              >
                Start My Application
              </Link>
              <p className="mt-3 text-xs text-slate-400">
                Case managers and referral partners can also submit referrals
                through our partner form so we can coordinate together.
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
                Ready to explore the Medical Assistant pathway?
              </h2>
              <p className="mt-3 text-sm text-slate-100">
                You don&apos;t have to figure it out on your own. Share a little
                about where you are now and where you&apos;d like to go, and
                we&apos;ll help you build a next step you can actually take.
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
