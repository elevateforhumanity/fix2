// app/platform/student-portal/page.tsx

export default function StudentPortalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
          Platform • Student Portal
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          Student Portal – funded training with clear next steps.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-200">
          The Elevate For Humanity Student Portal gives learners one place to
          see their funded programs, assignments, attendance, and next steps.
          Whether they are in Medical Assistant, Barber Apprenticeship, HVAC,
          CDL, or another pathway, the experience is consistent and easy to
          follow.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            What students can do inside the portal
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• View all active and past programs in one dashboard.</li>
            <li>
              • See class schedules, locations, and instructor information.
            </li>
            <li>
              • Track attendance, hours, and assignments in real time instead of
              guessing.
            </li>
            <li>
              • Complete online lessons, quizzes, and videos when programs use
              EFH&apos;s digital content.
            </li>
            <li>
              • Download certificates and completion letters for employers and
              case managers.
            </li>
            <li>
              • Receive messages and reminders from Elevate staff and partners.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Designed for funded pathways, not just online courses
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Many students in the Elevate ecosystem are balancing work, family,
            transportation, housing, and justice-involvement while trying to
            upskill. The portal is built to make funded training feel organized
            instead of overwhelming.
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• Clear funding status and contact information for support.</li>
            <li>
              • Easy access to attendance and progress when meeting with case
              managers.
            </li>
            <li>
              • Simple mobile-friendly layout for students using their phone as
              their main device.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Example use cases
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>
              • A re-entry student can see their HVAC class schedule, required
              hours, and which days they were marked present.
            </li>
            <li>
              • A parent in Medical Assistant training can check upcoming
              clinical days and plan childcare ahead of time.
            </li>
            <li>
              • A CDL student can download proof of completion to hand to an
              employer or probation officer.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
