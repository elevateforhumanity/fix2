import { notFound } from "next/navigation";
import Link from "next/link";
import { allPrograms } from "@/lms-data/programs";
import { getInstructorByProgramId } from "@/lms-data/instructors";
import { AIInstructorPanel } from "@/components/AIInstructorPanel";

interface PageProps {
  params: { programId: string };
}

export function generateMetadata({ params }: PageProps) {
  const program = allPrograms.find((p) => p.id === params.programId);
  const instr = program ? getInstructorByProgramId(program.id) : undefined;

  if (!program || !instr) return {};

  return {
    title: `${instr.shortName} – AI Instructor for ${program.title}`,
    description: `Chat with ${instr.shortName}, the AI instructor for the ${program.title} program at Elevate for Humanity.`,
  };
}

export default function ProgramInstructorPage({ params }: PageProps) {
  const program = allPrograms.find((p) => p.id === params.programId);
  if (!program) notFound();

  const instructor = getInstructorByProgramId(program.id);
  if (!instructor) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            AI Instructor – {program.title}
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Chat with {instructor.shortName}
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            {instructor.name} is your AI instructor for this program. You can
            ask questions about the course modules, expectations, and what it
            looks like to succeed in this pathway. Responses are for learning
            and guidance only.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            This AI instructor is aligned to:{" "}
            {instructor.primaryStandards.join(" • ")} and draws from Partner
            sources like: {instructor.partnerSources.join(" • ")}.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/student/instructor"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              All AI Instructors
            </Link>
            <Link
              href="/student/dashboard"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Student Dashboard
            </Link>
            <Link
              href={`/programs/${program.slug}`}
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Program Overview
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <AIInstructorPanel instructor={instructor} programTitle={program.title} />
        </div>
      </section>
    </main>
  );
}
