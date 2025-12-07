"use client";

import useSWR from "swr";

type PartnerEnrollment = {
  id: string;
  status: "pending" | "active" | "completed" | "failed";
  progress_percentage: number | null;
  enrolled_at: string;
  completed_at: string | null;
  course_name: string | null;
  provider_name: string | null;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function statusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Pending Enrollment";
    case "active":
      return "In Progress";
    case "completed":
      return "Completed";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}

export function PartnerEnrollmentsSection() {
  const { data, isLoading } = useSWR<{ enrollments: PartnerEnrollment[] }>(
    "/api/student/partner-enrollments",
    fetcher
  );

  if (isLoading) {
    return (
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          My Certifications &amp; Partner Courses
        </h2>
        <p className="mt-2 text-sm text-slate-500">Loading…</p>
      </section>
    );
  }

  const enrollments = data?.enrollments ?? [];

  if (!enrollments.length) {
    return (
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          My Certifications &amp; Partner Courses
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          When you enroll in a funded program, your HSI, Certiport, CareerSafe,
          Milady and other partner courses will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900">
        My Certifications &amp; Partner Courses
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        These courses are delivered through Elevate&apos;s indusstart partners but
        tracked here for your WIOA / WRG / Apprenticeship record.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {enrollments.map((enrollment) => {
          const pct = enrollment.progress_percentage ?? 0;
          const isCompleted = enrollment.status === "completed";

          return (
            <article
              key={enrollment.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {enrollment.course_name ?? "Partner Course"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {enrollment.provider_name ?? "Partner Platform"}
                  </p>
                </div>

                <span
                  className={
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                    (isCompleted
                      ? "bg-emerald-50 text-emerald-700"
                      : enrollment.status === "failed"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-sky-50 text-sky-700")
                  }
                >
                  {statusLabel(enrollment.status)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={
                      "h-full rounded-full " +
                      (isCompleted ? "bg-emerald-500" : "bg-sky-500")
                    }
                    style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `/api/partner-launch/${enrollment.id}`,
                      "_blank"
                    )
                  }
                  className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  {isCompleted ? "Review Course" : "Start / Continue Course"}
                </button>

                {isCompleted && (
                  <a
                    href={`/student/certificates`}
                    className="text-[11px] text-slate-500 underline"
                  >
                    View certificate
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
