import Link from "next/link";

export const metadata = {
  title: "Start Here | Student Onboarding | Elevate for Humanity",
  description:
    "Everything new learners need to know to start with Elevate for Humanity: expectations, support, technology, attendance, and next steps.",
  openGraph: {
    images: ["/images/facilities-new/facility-16.jpg"],
    type: "website",
  }};

const STEPS = [
  "Confirm your contact information and emergency contact",
  "Complete any required intake or funding paperwork with your case manager",
  "Review your program start date, time, and location (in-person or online)",
  "Log in to the Elevate portal and check your first assignments or orientation tasks",
  "Set up transportation, childcare, and your weekly schedule so you can show up consistently",
];

const EXPECTATIONS = [
  "Show up on time, ready to participate and communicate",
  "Let us or your case manager know if something is blocking you (transportation, schedule, tech, etc.)",
  "Respect staff, partners, other learners, and the space you are in",
  "Take care of any paperwork or portal tasks by the deadlines we share",
  "Treat this like an opportunity that can open doors if you stay engaged",
];

const SUPPORT = [
  "Case managers and referring partners (if you have one)",
  "Program staff and instructors at Elevate or partner sites",
  "Digital support for logging into the portal, resetting passwords, or accessing classes",
  "Referrals to community resources for things like childcare, transportation, or basic needs",
];

export default function StudentStartPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Students • Learners • Participants
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Start Here: Your Onboarding Guide
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
            You made a decision to do something for yourself. This page walks
            you through what to expect, what we expect from you, and who is in
            your corner as you start with Elevate for Humanity.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Log In to My Student Portal
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
            >
              I Need Help Getting Started
            </Link>
          </div>
        </div>
      </section>

      {/* FIRST STEPS */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h2 className="text-lg font-semibold text-slate-900">
          First steps after you are accepted
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Once you&apos;re accepted or referred into a program, there are a few
          key steps to complete so you don&apos;t miss your spot.
        </p>
        <ol className="mt-4 space-y-2 text-sm text-slate-700">
          {STEPS.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[3px] flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-semibold text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* EXPECTATIONS & SUPPORT */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                What we expect from you
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We know life is life. We also know opportunities don&apos;t
                always show up twice. Our expectations are about helping you
                actually get to the finish line.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-900/95 p-5 text-sm text-slate-50 shadow-md">
              <h3 className="text-sm font-semibold text-white">
                Who is in your corner
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                You are not doing this alone. Depending on your situation, you
                may have a case manager, an instructor, a site lead, and the
                Elevate team paying attention to your progress.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-100">
                {SUPPORT.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-slate-300">
                If something is going wrong (life event, transportation,
                schedule change), talk to someone early. We can&apos;t help with
                what we don&apos;t know about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              This is your start. We&apos;ll walk with you, but you have to walk.
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Your attendance, communication, and effort matter. The skills,
              certificates, and opportunities on the other side are real. We're
              here to help you get there.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Go to My Student Portal
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              Explore Programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            If you&apos;re not sure what&apos;s next, contact us or your case
            manager. We would rather answer your questions than watch you
            disappear.
          </p>
        </div>
      </section>
    </main>
  );
}
