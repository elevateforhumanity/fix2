import Link from "next/link";
import { demoStudentProfile, getStudentProgramOverview } from "@/lms-data/studentProfile";
import ContentProtection from "@/components/protection/ContentProtection";
import AIBlockMeta from "@/components/protection/AIBlockMeta";

export const metadata = {
  title: "My Learning Hub | Elevate for Humanity",
  description:
    "Student view of programs, funding, and courses at Elevate for Humanity.",
};

const statusLabel: Record<string, string> = {
  interested: "Interested",
  applied: "Applied",
  enrolled: "Enrolled",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusColor: Record<string, string> = {
  interested: "border-slate-700 text-slate-200",
  applied: "border-blue-500 text-blue-200",
  enrolled: "border-green-500 text-green-200",
  "in-progress": "border-yellow-500 text-yellow-200",
  completed: "border-emerald-500 text-emerald-200",
};

export default function StudentHubPage() {
  const overview = getStudentProgramOverview();

  return (
    <>
      <AIBlockMeta />
      <ContentProtection level="maximum" showWatermark={true}>
        <main className="min-h-screen bg-slate-900 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Student
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Hi, {demoStudentProfile.firstName} – this is your Elevate hub.
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Here&apos;s where you can see your programs, applications, courses,
            and next steps. As we connect more systems, this page will show live
            progress, funding, and placements.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/programs"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Explore All Programs
            </Link>
            <Link
              href="/apply"
              className="rounded-md bg-orange-400 px-4 py-2 font-semibold text-white hover:bg-orange-500"
            >
              Start / Update Application
            </Link>
            <Link
              href="/funding"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Learn About Funding
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAM CARDS */}
      <section className="bg-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-4 text-xs">
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">Your Programs</p>
            <p className="mt-1 text-[11px] text-slate-300">
              These are the programs Elevate currently has you tagged for.
              Statuses here are demo-only until we connect your real login and
              data.
            </p>
          </section>

          <div className="grid gap-3 md:grid-cols-2">
            {overview.map(({ status, program, tuition, courses }) => (
              <article
                key={status.programId}
                className="flex flex-col rounded-xl border border-slate-700 bg-slate-900/90 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-100">
                      {program ? program.title : status.programId}
                    </p>
                    {program?.shortDescription && (
                      <p className="mt-1 text-[10px] text-slate-300">
                        {program.shortDescription}
                      </p>
                    )}
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${statusColor[status.status]}`}
                  >
                    {statusLabel[status.status] ?? status.status}
                  </span>
                </div>

                {status.notes && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    {status.notes}
                  </p>
                )}

                {tuition && (
                  <div className="mt-2 rounded-md border border-slate-700 bg-slate-900/80 p-2 text-[10px] text-slate-200">
                    <p className="font-semibold text-slate-100">
                      Tuition Snapshot
                    </p>
                    <p className="text-green-300">{tuition.baseTuition}</p>
                    {tuition.notes && (
                      <p className="mt-1 text-slate-300">{tuition.notes}</p>
                    )}
                  </div>
                )}

                {courses && courses.length > 0 && (
                  <div className="mt-2 rounded-md border border-slate-700 bg-slate-900/80 p-2 text-[10px] text-slate-200">
                    <p className="font-semibold text-slate-100">
                      Linked Course Shells
                    </p>
                    <ul className="mt-1 list-disc pl-4">
                      {courses.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/courses/${c.slug}`}
                            className="text-orange-300 hover:text-orange-200"
                          >
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-[10px] text-slate-400">
                      These courses sit on top of your credential partners
                      (Milady, IRS Link & Learn, JRI, etc.) and organize your
                      journey.
                    </p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <Link
                    href={`/checkout/${status.programId}`}
                    className="rounded-md bg-orange-400 px-3 py-1 font-semibold text-white hover:bg-orange-500"
                  >
                    View Costs & Options
                  </Link>
                  <Link
                    href="/apply"
                    className="rounded-md border border-slate-700 px-3 py-1 font-semibold text-slate-100 hover:bg-slate-800"
                  >
                    Update Application
                  </Link>
                  {courses && courses.length > 0 && (
                    <Link
                      href={`/courses/${courses[0].slug}`}
                      className="rounded-md border border-slate-700 px-3 py-1 font-semibold text-slate-100 hover:bg-slate-800"
                    >
                      Go to Course
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
      </ContentProtection>
    </>
  );
}
