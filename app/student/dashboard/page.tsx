// app/student/dashboard/page.tsx

import Link from "next/link";
import { allCourses } from "@/lms-data/courses";

export default function StudentDashboardPage() {
  const inProgress = allCourses.slice(0, 2); // replace with real progress later
  const recommended = allCourses.slice(2, 5);

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Your Learning Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              This is your hub for courses, next steps, and progress. Take it
              one step at a time — we&apos;re here to walk with you.
            </p>
          </div>
          <div className="flex gap-2 text-xs">
            <Link
              href="/programs"
              className="inline-flex items-center rounded-md bg-white px-3 py-1.5 font-semibold text-slate-800 shadow-sm hover:bg-slate-100"
            >
              Browse Programs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 font-semibold text-blue-700 hover:bg-blue-100"
            >
              Talk To A Coach
            </Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Left: in-progress */}
          <section className="md:col-span-2">
            <h2 className="text-sm font-semibold text-slate-900">
              Programs In Progress
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Once you&apos;re officially enrolled, your active programs will
              show here with clearer progress bars and due dates.
            </p>

            <div className="mt-3 space-y-3">
              {inProgress.map((course) => (
                <article
                  key={course.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {course.shortTitle ?? course.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-600">
                        {course.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-[11px] text-slate-500 md:items-end">
                      <span>{course.hoursTotal} hours total</span>
                      <span>Progress: coming soon</span>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2 text-[11px]">
                    <Link
                      href={course.lmsPath}
                      className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700"
                    >
                      Go To This Program
                    </Link>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Right: recommended / quick info */}
          <aside className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Funding & Support
              </h2>
              <p className="mt-1 text-[11px] text-slate-600">
                Many EFH programs can use WIOA, WRG, JRI, WEX, or employer
                funding. If you&apos;re not sure what you qualify for, mention it
                when you talk with a coach and we&apos;ll walk you through the
                options in plain language.
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Suggested Programs For You
              </h2>
              <ul className="mt-2 space-y-2">
                {recommended.map((course) => (
                  <li key={course.id} className="flex flex-col rounded-lg bg-slate-50 p-2">
                    <span className="text-[11px] font-semibold text-slate-900">
                      {course.shortTitle ?? course.title}
                    </span>
                    <div className="mt-1 flex justify-between text-[11px] text-slate-600">
                      <span>{course.hoursTotal} hrs</span>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
