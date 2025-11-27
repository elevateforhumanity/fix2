import Link from "next/link";
import { aiInstructors } from "../../../lms-data/aiInstructors";

export const metadata = {
  title: "AI Instructor Console | Elevate Admin",
  description:
    "Manage AI instructor personas, review conversations, and configure AI tutor settings.",
};

export default function AdminAiConsolePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin • AI Systems
          </p>
          <h1 className="mt-2 text-2xl font-bold">AI Instructor Console</h1>
          <p className="mt-2 text-xs text-slate-300 max-w-3xl">
            This console lets you manage AI instructor personas, review student
            conversations, and configure AI tutor behavior. Each persona is
            tailored to specific programs and teaching styles.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-5 text-[11px]">
          {/* SUMMARY */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              AI Instructor Personas
            </p>
            <p className="mt-1 text-slate-300">
              These AI personas are configured in{" "}
              <span className="font-mono">lms-data/aiInstructors.ts</span> and
              power the <span className="font-mono">/api/ai-tutor-basic</span>{" "}
              endpoint. Each persona has a unique teaching style, program focus,
              and system prompt.
            </p>
          </div>

          {/* AI INSTRUCTOR CARDS */}
          <div className="grid gap-4 md:grid-cols-2">
            {aiInstructors.map((instructor) => (
              <article
                key={instructor.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {instructor.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {instructor.role}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] text-emerald-50">
                    Active
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">
                      Teaching Style
                    </p>
                    <p className="text-[11px] text-slate-300">
                      {instructor.teachingStyle}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">
                      Specializations
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {instructor.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-100"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">
                      System Prompt (Preview)
                    </p>
                    <p className="text-[10px] text-slate-400 italic line-clamp-3">
                      {instructor.systemPrompt}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={`/api/ai-tutor-basic?instructorId=${instructor.id}`}
                    className="inline-flex rounded-md bg-slate-800 px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-slate-700"
                  >
                    Test API Endpoint
                  </Link>
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-slate-800 px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-slate-700"
                  >
                    View Conversations
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* CONFIGURATION PANEL */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              AI Configuration & Settings
            </p>
            <p className="mt-2 text-[11px] text-slate-300">
              Future enhancements for this console:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-300">
              <li>
                <span className="font-semibold">Conversation logs:</span> Review
                all student-AI interactions with filtering and search
              </li>
              <li>
                <span className="font-semibold">Escalation queue:</span> Flag
                conversations where AI couldn&apos;t help and route to human
                instructors
              </li>
              <li>
                <span className="font-semibold">Prompt tuning:</span> Edit
                system prompts and test responses in real-time
              </li>
              <li>
                <span className="font-semibold">Usage analytics:</span> Track
                which personas are most used, average conversation length, and
                satisfaction ratings
              </li>
              <li>
                <span className="font-semibold">Model selection:</span> Switch
                between GPT-4, GPT-3.5, or other models per persona
              </li>
            </ul>
          </div>

          <p className="text-[10px] text-slate-400">
            NOTE: The AI tutor system requires{" "}
            <span className="font-mono">OPENAI_API_KEY</span> to be set in your
            environment variables. Conversation logs can be stored in Supabase
            for review and analysis.
          </p>
        </div>
      </section>
    </main>
  );
}
