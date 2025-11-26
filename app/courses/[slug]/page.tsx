// app/courses/[slug]/page.tsx

import { getCourseBySlug, allCourses } from "@/lms-data/courses";
import type { Course } from "@/types/course";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allCourses
    .filter((c) => c.isPublished)
    .map((course) => ({ slug: course.slug }));
}

function formatFundingLabel(code: string): string {
  switch (code) {
    case "WIOA_ADULT":
      return "WIOA Adult";
    case "WIOA_YOUTH":
      return "WIOA Youth";
    case "WIOA_DW":
      return "WIOA Dislocated Worker";
    case "WRG":
      return "Workforce Ready Grant (WRG)";
    case "JRI":
      return "Justice Reinvestment Initiative (JRI)";
    case "WEX":
      return "Paid Work Experience (WEX)";
    case "APPRENTICESHIP":
      return "Registered Apprenticeship";
    case "SELF_PAY":
      return "Self-Pay / Employer-Sponsored";
    default:
      return code;
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course: Course | undefined = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <section className="w-full border-b bg-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Elevate For Humanity · Career Training Program
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              {course.title}
            </h1>
            {course.externalCredentialName && (
              <p className="mt-1 text-sm text-gray-600">
                Aligned with:{" "}
                <span className="font-semibold">
                  {course.externalCredentialName}
                </span>
              </p>
            )}
            {course.locationLabel && (
              <p className="mt-1 text-sm text-gray-600">
                Location: {course.locationLabel}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                {course.hoursTotal} Training Hours
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                {course.deliveryMode === "IN_PERSON"
                  ? "In-Person"
                  : course.deliveryMode === "HYBRID"
                  ? "Hybrid"
                  : "Online"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.fundingEligible.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
                  {formatFundingLabel(f)}
                </span>
              ))}
            </div>

            <a
              href={course.lmsPath}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-brandPrimary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brandPrimaryDark"
            >
              Start / Continue This Program
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
        {/* Left column */}
        <div className="w-full md:w-2/3 md:pr-6">
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Program Overview
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {course.description}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              What You Will Be Able To Do
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {course.outcomes.map((o, idx) => (
                <li key={idx}>{o}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Program Modules
            </h2>
            <div className="space-y-4">
              {course.modules.map((m) => (
                <div
                  key={m.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-gray-900">
                    {m.title}
                  </h3>
                  {m.description && (
                    <p className="mt-1 text-xs text-gray-600">
                      {m.description}
                    </p>
                  )}
                  <ul className="mt-2 space-y-1 text-xs text-gray-700">
                    {m.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex justify-between">
                        <span>
                          • {lesson.title}
                          {lesson.partnerRefCode && (
                            <span className="ml-1 text-[11px] text-gray-500">
                              ({lesson.partnerRefCode})
                            </span>
                          )}
                        </span>
                        {lesson.durationMinutes && (
                          <span className="text-[11px] text-gray-500">
                            {lesson.durationMinutes} min
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="w-full md:w-1/3 md:border-l md:border-gray-100 md:pl-6">
          <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Who This Program Is For
            </h3>
            <ul className="list-disc space-y-1 pl-4">
              {course.targetAudience.map((tag, idx) => (
                <li key={idx}>{tag}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Ready To Get Started?
            </h3>
            <p className="mb-3 text-xs text-gray-700">
              Click the button below to go to your Elevate For Humanity
              learning portal. If you don&apos;t have an account yet, you&apos;ll be
              able to create one or finish your enrollment paperwork.
            </p>
            <a
              href={course.lmsPath}
              className="inline-flex w-full items-center justify-center rounded-md bg-brandPrimary px-3 py-2 text-xs font-semibold text-white hover:bg-brandPrimaryDark"
            >
              Go To This Program In The Portal
            </a>
          </section>
        </aside>
      </main>
    </div>
  );
}
