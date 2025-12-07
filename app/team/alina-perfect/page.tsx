// app/team/alina-perfect/page.tsx

export default function AlinaPerfectPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Team Member
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Alina Perfect, PMHNP
          </h1>

          <p className="mt-2 text-xs font-semibold text-indigo-600">
            Perfect Wellness Behavioral Health, LLC
          </p>

          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Alina Perfect is a compassionate and experienced Psychiatric Mental
            Health Nurse Practitioner dedicated to supporting individuals through
            trauma, life transitions, behavioral health challenges, and emotional
            wellness barriers. Through her private practice, Perfect Wellness
            Behavioral Health, LLC, she provides psychiatric evaluation, mental
            health support, and medication management services for eligible
            Elevate students in coordination with our advising and wraparound
            care team.
          </p>

          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Her approach blends evidence-based clinical care with a human-centered
            understanding of the real challenges people face — including stress,
            anxiety, depression, life instability, re-enstart challenges, and
            generational trauma. Alina partners closely with Elevate&apos;s coaches,
            advisors, and case support to ensure students receive the holistic
            support they need to succeed academically, professionally, and
            personally.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Clinical Focus Areas
          </h2>
          <ul className="mt-3 space-y-1 text-xs text-slate-700">
            <li>• Psychiatric evaluations and assessment</li>
            <li>• Medication management (where clinically appropriate)</li>
            <li>• Depression, anxiety, and mood disorders</li>
            <li>• Trauma-informed care and behavioral stabilization</li>
            <li>• Support for justice-involved individuals</li>
            <li>• Wellness planning + stabilization for education success</li>
          </ul>
        </section>

        <section className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">
          <h2 className="text-sm font-semibold">How to Access Services</h2>
          <p className="mt-3 text-xs text-slate-200">
            Students can be referred to Alina through Elevate&apos;s advising team,
            the Support & Wellness page, or by sharing wellness needs on their
            program application.
          </p>
        </section>

      </div>
    </main>
  );
}
