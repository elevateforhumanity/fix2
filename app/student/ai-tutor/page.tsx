"use client";

import { useState } from "react";
import { aiInstructors } from "@/lms-data/aiInstructors";

export default function StudentAiTutorPage() {
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>(
    aiInstructors[0]?.courseSlug ?? "",
  );
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const selectedInstructor = aiInstructors.find(
    (inst) => inst.courseSlug === selectedCourseSlug,
  );

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourseSlug || !message.trim()) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/ai-tutor-basic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: selectedCourseSlug,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAnswer(
          data?.error ??
            "Something went wrong asking your AI instructor. Please try again.",
        );
      } else {
        setAnswer(data.answer ?? "No answer returned, please try again.");
      }
    } catch (err) {
      console.error(err);
      setAnswer("Network error talking to the AI tutor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            AI Instructor
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            Ask Your AI Instructor a Question
          </h1>
          <p className="mt-2 text-xs text-slate-300 max-w-2xl">
            Choose your course, type a question, and your AI instructor will
            answer in plain language using the tone and focus Elevate set for
            that pathway.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-6 space-y-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-200">
                  Choose a course
                </p>
                <select
                  value={selectedCourseSlug}
                  onChange={(e) => setSelectedCourseSlug(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100"
                >
                  {aiInstructors.map((inst) => (
                    <option key={inst.id} value={inst.courseSlug}>
                      {inst.displayName} – {inst.courseSlug}
                    </option>
                  ))}
                </select>
              </div>

              {selectedInstructor && (
                <div className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-[11px] text-slate-300 max-w-xs">
                  <p className="font-semibold text-slate-100">
                    {selectedInstructor.displayName}
                  </p>
                  <p className="mt-1 text-[11px]">
                    {selectedInstructor.expertiseSummary}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleAsk} className="space-y-2">
              <label className="text-[11px] text-slate-200">
                Your question
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100"
                placeholder="Ask about a concept, assignment, or workplace scenario..."
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="mt-1 rounded-md bg-red-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Asking AI Instructor..." : "Ask AI Instructor"}
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-[11px] font-semibold text-slate-200">
              AI Instructor Response
            </p>
            <div className="mt-2 min-h-[80px] rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 whitespace-pre-wrap">
              {loading && "Thinking..."}
              {!loading && answer && <>{answer}</>}
              {!loading && !answer && (
                <span className="text-slate-500">
                  Your instructor&apos;s answer will appear here.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
