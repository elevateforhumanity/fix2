import Link from "next/link";
import { allPrograms } from "@/lms-data/programs";
import { getModulesForProgram } from "@/lms-data/course-modules";
import { scormPackages } from "@/lms-data/scorm";

export const metadata = {
  title: "Student Dashboard | Elevate for Humanity",
  description:
    "Your Elevate for Humanity student dashboard: view your programs, modules, and launch courses."
};

export default function StudentDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Student Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Welcome to Elevate for Humanity
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            This is your learning home base. Start with your program, then work
            through the modules. Some modules launch in Elevate, others use
            partner content like Job Ready Indy (JRI) delivered through SCORM.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Progress tracking, badges, and certificates can be layered on next.
            For now, focus on completing each module in order and staying in
            touch with your instructor or advisor.
          </p>
        </div>
      </section>

      {/* PROGRAMS + MODULES */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allPrograms.map((program) => {
              const modules = getModulesForProgram(program.id);

              return (
                <article
                  key={program.id}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs shadow-sm"
                >
                  <p className="text-[11px] font-semibold text-slate-300">
                    Program
                  </p>
                  <h2 className="text-sm font-semibold text-white">
                    {program.title}
                  </h2>
                  {program.subtitle && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      {program.subtitle}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-3 text-[11px] text-slate-400">
                    {program.description}
                  </p>

                  <div className="mt-2">
                    <p className="text-[11px] font-semibold text-slate-200">
                      Modules:
                    </p>
                    {modules.length === 0 ? (
                      <p className="mt-1 text-[11px] text-slate-400">
                        Modules are being loaded for this program. Check back
                        soon or contact support.
                      </p>
                    ) : (
                      <ol className="mt-1 space-y-1 text-[11px] text-slate-300">
                        {modules.map((m) => {
                          const scorm =
                            m.type === "scorm"
                              ? scormPackages.find((p) => p.id === m.scormPackageId)
                              : undefined;

                          return (
                            <li
                              key={m.id}
                              className="flex flex-col rounded-lg bg-slate-900/70 px-2 py-1.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-slate-100">
                                  {m.order}. {m.title}
                                </span>
                                <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-200">
                                  {m.type === "video" && "Video"}
                                  {m.type === "pdf" && "PDF"}
                                  {m.type === "scorm" && "Partner / SCORM"}
                                  {m.type === "quiz" && "Quiz"}
                                  {m.type === "live" && "Live Session"}
                                </span>
                              </div>
                              {m.description && (
                                <p className="mt-0.5 text-[11px] text-slate-300">
                                  {m.description}
                                </p>
                              )}
                              <div className="mt-1 flex flex-wrap gap-2">
                                {m.type === "scorm" && scorm && (
                                  <Link
                                    href={`/student/scorm/${scorm.id}`}
                                    className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                                  >
                                    Launch Partner Course
                                  </Link>
                                )}
                                {m.type === "video" && (
                                  <button
                                    type="button"
                                    className="rounded-md bg-slate-800 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-700"
                                  >
                                    Video coming online (upload via instructor)
                                  </button>
                                )}
                                {m.type === "pdf" && (
                                  <button
                                    type="button"
                                    className="rounded-md bg-slate-800 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-700"
                                  >
                                    PDF / Handout (to be attached)
                                  </button>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                    >
                      View Program Page
                    </Link>
                    <Link
                      href="/student/scorm"
                      className="rounded-md border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-900"
                    >
                      View All Partner Courses
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
