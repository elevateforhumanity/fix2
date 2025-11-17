import Link from "next/link";

const programs = [
  {
    slug: "/programs/barber",
    name: "Barber Apprenticeship (Milady-Powered)",
    tag: "Apprenticeship · License Track",
    summary:
      "Milady curriculum, shop-based experience, and Elevate tracking for learners moving toward real barber careers and licensing support.",
  },
  {
    slug: "/programs/medical-assistant",
    name: "Medical Assistant Pathway",
    tag: "Healthcare · Partner Program",
    summary:
      "Partner medical assistant training wrapped in Elevate onboarding, reminders, and reporting for agencies and healthcare employers.",
  },
  {
    slug: "/programs/hvac",
    name: "HVAC Technician (Partner School)",
    tag: "Skilled Trades · External School",
    summary:
      "Elevate as the front door and connector to a trusted HVAC school, with visibility for case managers and employers.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Elevate programs
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.7rem]">
              Programs that speak the same language as your community.
            </h1>
            <p className="text-sm text-slate-300">
              Every pathway is designed so a learner, a parent, a pastor, and a case manager
              can read it and instantly understand what it is, who it is for, and how it leads
              to work.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:border-emerald-400/70"
              >
                <div className="space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-emerald-300">
                    {program.tag}
                  </p>
                  <h2 className="text-[0.98rem] font-semibold text-slate-50">
                    {program.name}
                  </h2>
                  <p className="text-[0.84rem] text-slate-300">{program.summary}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[0.78rem]">
                  <Link
                    href={program.slug}
                    className="font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    View this pathway →
                  </Link>
                  <span className="text-[0.7rem] text-slate-500">
                    Cohorts · Referrals · Pilots
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
