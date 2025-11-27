import Link from "next/link";

export const metadata = {
  title: "Business Support Apprenticeship | Elevate for Humanity",
  description:
    "Business support and office professional apprenticeship pathway with WEX/OJT options, employer sponsorship, and stackable credentials.",
};

export default function BusinessApprenticeshipProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Business Support Apprenticeship
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Business, Office &amp; Customer Care Apprenticeship
          </h1>
          <p className="mt-3 text-sm text-slate-200 max-w-2xl">
            This apprenticeship pathway prepares learners for high-demand roles
            in admin, customer success, call centers, front office, and digital
            operations. Built to combine Elevate&apos;s soft skills training
            with live employer work experience.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-business-apprentice"
              className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Apply for Business Apprenticeship
            </Link>
            <Link
              href="/checkout/prog-business-apprentice"
              className="rounded-md border border-slate-700 px-5 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Tuition &amp; Funding
            </Link>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 grid gap-5 md:grid-cols-[1.5fr,1.5fr] text-xs">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Skills you build in this pathway
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>Professional communication &amp; customer care</li>
              <li>Office technology and productivity tools</li>
              <li>Scheduling, calendars, and basic project support</li>
              <li>Data entry and CRM support tasks</li>
              <li>Workplace problem-solving and conflict resolution</li>
              <li>Job-ready soft skills powered by JRI-style modules</li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-400">
              The learning plan can be tailored for office, remote, or hybrid
              business environments depending on the employer partner.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              How the apprenticeship structure works
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                Learners complete online modules in{" "}
                <span className="font-semibold">business-apprentice-foundations</span>
              </li>
              <li>
                WEX/OJT placements let learners practice skills in a real
                employer setting
              </li>
              <li>
                Employers can sponsor tuition using the{" "}
                <span className="font-semibold">Employer / Sponsor Pays</span> option
              </li>
              <li>
                Payment plans are available when learners do not have an employer
                sponsor at the start
              </li>
            </ul>
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-[10px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Program identifiers
              </p>
              <ul className="mt-1 list-disc pl-5">
                <li>
                  Elevate program ID:{" "}
                  <span className="font-mono text-orange-300">
                    prog-business-apprentice
                  </span>
                </li>
                <li>
                  Auto-enrolled course slug:{" "}
                  <span className="font-mono">business-apprentice-foundations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Ready to grow business-ready talent?
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Learners and employers can connect with Elevate to design
              apprenticeships that combine training, mentoring, and real wages.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-business-apprentice"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Start Application
            </Link>
            <Link
              href="/checkout/prog-business-apprentice"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Tuition Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
