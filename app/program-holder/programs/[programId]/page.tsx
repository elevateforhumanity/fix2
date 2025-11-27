import Link from "next/link";
import { notFound } from "next/navigation";
import { allPrograms } from "@/lms-data/programs";
import { getModulesForProgram } from "@/lms-data/course-modules";
import { ModuleListForProgram } from "@/components/ModuleListForProgram";

interface PageProps {
  params: { programId: string };
}

export const metadata = {
  title: "Manage Program Modules | Elevate for Humanity",
};

export default function ProgramModulesPage({ params }: PageProps) {
  const program = allPrograms.find((p) => p.id === params.programId);

  if (!program) {
    notFound();
  }

  const modules = getModulesForProgram(program.id);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              Program Holder – Manage Modules
            </p>
            <h1 className="text-lg font-semibold text-white">
              {program.title}
            </h1>
            {program.subtitle && (
              <p className="mt-1 text-[11px] text-slate-300">
                {program.subtitle}
              </p>
            )}
            <p className="mt-1 text-[11px] text-slate-400">
              Use this page to review the current module structure, see which
              modules use partner content (like JRI), and plan your teaching
              flow. Future versions will allow you to add, edit, and reorder
              modules directly.
            </p>
          </div>
          <div className="hidden flex-col items-end gap-2 text-[11px] md:flex">
            <Link
              href="/program-holder/dashboard"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Back to Program Holder Dashboard
            </Link>
            <Link
              href="/student/dashboard"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Student Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE LIST */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <ModuleListForProgram programId={program.id} modules={modules} />
        </div>
      </section>
    </main>
  );
}
