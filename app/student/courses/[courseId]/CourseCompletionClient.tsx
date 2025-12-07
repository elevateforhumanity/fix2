"use client";

import Link from "next/link";
import { useState } from "react";

type Module = {
  id: string;
  title: string;
  partner_name: string;
  is_required: boolean;
};

type ProgressRow = {
  module_id: string;
  status: "not_started" | "in_progress" | "submitted" | "approved";
};

type Enrollment = {
  status: "active" | "completed" | "withdrawn" | "paused";
  internal_complete: boolean;
  completed_at: string | null;
};

type Course = {
  id: string;
  title: string;
  description: string | null;
};

type ServerData = {
  course: Course | null;
  enrollment: Enrollment | null;
  modules: Module[];
  progressRows: ProgressRow[];
};

type Props = {
  courseId: string;
  userId: string;
  serverData: ServerData;
};

export default function CourseCompletionClient({
  courseId,
  serverData,
}: Props) {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(
    serverData.enrollment
  );
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const totalModules = serverData.modules.filter((m) => m.is_required).length;
  const approvedCount = serverData.modules.filter((m) => {
    if (!m.is_required) return false;
    const p = serverData.progressRows.find((row) => row.module_id === m.id);
    return p?.status === "approved";
  }).length;

  const internalDone = enrollment?.internal_complete ?? false;
  const completed = enrollment?.status === "completed";

  async function handleCheckCompletion() {
    start {
      setChecking(true);
      setMessage(null);

      const res = await fetch(`/api/courses/${courseId}/check-completion`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.pending_modules && data.pending_modules.length > 0) {
          const pendingList = data.pending_modules
            .map((m: any) => `• ${m.title} (${m.partner_name}) - ${m.status}`)
            .join("\n");
          setMessage(
            `${data.error}\n\nPending modules:\n${pendingList}`
          );
        } else {
          setMessage(data.error || "Cannot mark course complete yet.");
        }
        return;
      }

      setMessage(data.message || "Course marked as completed!");
      setEnrollment((prev) =>
        prev
          ? {
              ...prev,
              status: "completed",
              completed_at: new Date().toISOString(),
            }
          : prev
      );
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message ?? "Unexpected error.");
    } finally {
      setChecking(false);
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      not_started: (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
          Not Started
        </span>
      ),
      in_progress: (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
          In Progress
        </span>
      ),
      submitted: (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
          Submitted
        </span>
      ),
      approved: (
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
          ✓ Approved
        </span>
      ),
    };
    return badges[status as keyof typeof badges] || badges.not_started;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-[0.2em] mb-1">
          Elevate Course
        </p>
        <h1 className="text-2xl font-semibold mb-1">
          {serverData.course?.title || "Course"}
        </h1>
        {serverData.course?.description && (
          <p className="text-sm text-slate-600 max-w-2xl">
            {serverData.course.description}
          </p>
        )}
      </div>

      {/* Completion Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Internal Progress */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-700">
              Internal Lessons
            </p>
            {internalDone ? (
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-slate-600">
            {internalDone
              ? "All internal lessons complete"
              : "Complete all lessons to proceed"}
          </p>
        </div>

        {/* External Modules */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-700">
              Partner Modules
            </p>
            {approvedCount === totalModules && totalModules > 0 ? (
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <span className="text-xs font-semibold text-slate-600">
                {approvedCount}/{totalModules}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mb-1">
            {approvedCount} of {totalModules} partner modules approved
          </p>
          <p className="text-[11px] text-slate-500">
            Includes Milady RISE and other partner credentials
          </p>
        </div>

        {/* Course Completion */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-700">
              Course Status
            </p>
            {completed && (
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-slate-600 mb-3">
            {completed ? "Completed" : "In progress"}
          </p>
          <button
            type="button"
            onClick={handleCheckCompletion}
            disabled={checking || completed}
            className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {completed
              ? "✓ Course Complete"
              : checking
              ? "Checking..."
              : "Check Completion"}
          </button>
        </div>
      </div>

      {/* Partner Modules List */}
      {totalModules > 0 && (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Partner Modules in this Course
          </p>
          <div className="space-y-2">
            {serverData.modules
              .filter((m) => m.is_required)
              .map((m) => {
                const p = serverData.progressRows.find(
                  (row) => row.module_id === m.id
                );
                const status = p?.status || "not_started";
                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between border-b last:border-b-0 border-slate-100 pb-3 last:pb-0"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{m.title}</div>
                      <div className="text-xs text-slate-600">
                        Partner: {m.partner_name}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(status)}
                      <Link
                        href={`/student/courses/${courseId}/external/${m.id}`}
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 underline"
                      >
                        Open module
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div
          className={`rounded-lg border p-4 ${
            message.includes("completed")
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p
            className={`text-sm whitespace-pre-wrap ${
              message.includes("completed")
                ? "text-emerald-800"
                : "text-amber-800"
            }`}
          >
            {message}
          </p>
        </div>
      )}

      {/* Completion Certificate Preview */}
      {completed && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="text-center space-y-3">
            <svg
              className="w-16 h-16 mx-auto text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-emerald-900">
              Congratulations!
            </h3>
            <p className="text-sm text-emerald-800">
              You've completed all requirements for {serverData.course?.title}.
              Your certificate with stacked credentials is ready.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
