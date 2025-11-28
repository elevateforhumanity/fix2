import Link from "next/link";
import { getAllCoursesWithProgramMeta } from "@/lms-data/courses";

export const metadata = {
  title: "Courses | Elevate for Humanity",
  description:
    "Browse Elevate for Humanity courses that sit on top of credential partners like Choice Medical Institute, Milady, IRS VITA, Intuit and more.",
};

export default function CoursesCatalogPage() {
  const allCourses = getAllCoursesWithProgramMeta();
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Courses
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Elevate Course Library (Layered on Partner Content)
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            These courses are designed to sit on top of industry content from
            credential partners like Choice Medical Institute, Milady, IRS
            VITA/Link & Learn, Intuit, HSI, CareerSafe, National Drug and more.
            Elevate keeps everything organized and workforce-aligned.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-4 md:grid-cols-3 text-xs">
            {allCourses.map(({ course, program }) => (
              <article
                key={course.id}
                className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/90 p-3"
              >
                <p className="text-[11px] font-semibold text-slate-100">
                  {course.title}
                </p>
                <p className="mt-1 text-[11px] text-slate-300 line-clamp-3">
                  {course.shortDescription}
                </p>
                {program && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Program:{" "}
                    <span className="text-slate-200">{program.title}</span>
                  </p>
                )}
                {course.estimatedWeeks && course.estimatedHoursPerWeek && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Pace: approx. {course.estimatedHoursPerWeek} hrs/week for{" "}
                    {course.estimatedWeeks} weeks
                  </p>
                )}
                {course.primaryCredentialPartner && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Partner:{" "}
                    <span className="text-slate-200">
                      {course.primaryCredentialPartner}
                    </span>
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="rounded-md bg-orange-500 px-3 py-1 text-[11px] font-semibold text-white hover:bg-orange-600"
                  >
                    View Course
                  </Link>
                  {program && (
                    <Link
                      href={`/programs/${program.slug}`}
                      className="rounded-md border border-slate-600 px-3 py-1 text-[11px] font-semibold text-slate-100 hover:bg-slate-900"
                    >
                      View Program
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
