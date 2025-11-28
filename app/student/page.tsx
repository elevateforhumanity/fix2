// app/student/page.tsx

import Link from "next/link";
import { courses } from "@/lms-data/courses";

export default function StudentHomePage() {
  const featuredCourses = courses.slice(0, 4); // show first few for now

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-red-600 via-indigo-600 to-purple-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-white md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-wide text-blue-100">
              Elevate For Humanity · Student Portal
            </p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">
              Welcome back. Let&apos;s keep moving you forward.
            </h1>
            <p className="mt-3 text-sm text-blue-50">
              Your courses, progress, and next steps live here. Many programs
              connect to{" "}
              <span className="font-semibold">
                WIOA, WRG, JRI, WEX, and apprenticeship funding
              </span>
              . You focus on learning — we help you navigate the paperwork.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 font-semibold text-brandPrimary shadow-sm hover:bg-blue-50"
              >
                Explore Programs
              </Link>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-transparent px-4 py-2 font-semibold text-white hover:bg-brandPrimary/30"
              >
                Go To My Dashboard
              </Link>
            </div>
          </div>

          {/* Simple hero side card */}
          <div className="mt-6 w-full max-w-sm rounded-2xl bg-white/10 p-4 text-xs backdrop-blur-md md:mt-0">
            <h2 className="text-sm font-semibold text-white">
              Quick Snapshot
            </h2>
            <p className="mt-1 text-[11px] text-blue-100">
              This area can later show live data: courses in progress,
              upcoming deadlines, and messages from your coach.
            </p>
            <ul className="mt-3 space-y-2 text-[11px] text-blue-50">
              <li>• Finish your orientation if you haven&apos;t yet.</li>
              <li>• Check your program page for funding steps.</li>
              <li>• Reach out to staff if you feel stuck at any point.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section>
          <h2 className="text-sm font-semibold text-slate-900">
            Featured Programs You Can Start
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            These programs are structured for real jobs and often come with
            funding options. Tap into what fits your goals.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <article
                key={course.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-sm"
              >
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {course.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-[11px] text-slate-600">
                    {(course as any).subtitle || 'Professional training program'}
                  </p>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-[11px] text-slate-500">
                    {(course as any).duration_hours || 40} hours · Online
                  </p>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-md bg-brandPrimary px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-brandPrimaryDark"
                  >
                    View Program
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
