import Link from "next/link";
import { getAllInstructors } from "@/lms-data/instructors";

export const metadata = {
  title: "AI Instructors | Elevate for Humanity",
  description:
    "Meet your AI instructors for each Elevate program and open a chat to ask questions about the pathway, expectations, and coursework.",
};

export default function AllInstructorsPage() {
  const instructors = getAllInstructors();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Student Tools
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            AI Instructors for Elevate Programs
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Each program has an AI instructor you can chat with about
            coursework, expectations, and how to succeed. These AI instructors
            support your learning but do not replace your human instructors,
            coaches, or site supervisors.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Pick the instructor that matches your program to open a chat.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            {instructors.map((instr) => {
              const program = instr.program;
              if (!program) return null;

              return (
                <article
                  key={instr.id}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg">
                      {instr.avatarEmoji || "🎓"}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-100">
                        {instr.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {instr.title}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300">
                    <p className="font-semibold text-slate-100">
                      Program: {program.title}
                    </p>
                    <p className="mt-1 line-clamp-3 text-slate-300">
                      {program.description}
                    </p>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-200">
                    <p className="font-semibold">Specialties:</p>
                    <p className="mt-0.5 text-slate-300">
                      {instr.specialties.join(" • ")}
                    </p>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-200">
                    <p className="font-semibold">Ask me things like:</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-slate-300">
                      {instr.examplePrompts.slice(0, 2).map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 flex justify-between gap-2 text-[11px]">
                    <Link
                      href={`/student/instructor/${program.id}`}
                      className="rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white hover:bg-red-700"
                    >
                      Open Chat with {instr.shortName}
                    </Link>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
                    >
                      View Program
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
