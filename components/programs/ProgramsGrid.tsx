import Link from "next/link";
import Image from "next/image";
import { getAllPrograms } from "@/lib/programs";

export function ProgramsGrid() {
  const programs = getAllPrograms();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Training & Career Pathways
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-700">
            Elevate connects learners to training programs, apprenticeships, and career pathways
            across trades, healthcare, transportation, and career readiness.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <article
            key={program.slug}
            className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm"
          >
            <div className="relative h-40 w-full bg-slate-100">
              <Image
                src={program.heroImage}
                alt={program.heroImageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="text-sm font-semibold text-slate-900">{program.name}</h2>
              <p className="mt-1 line-clamp-3 text-xs text-slate-700">{program.shortTagline}</p>
              <p className="mt-2 text-[11px] font-medium text-slate-500">{program.level}</p>
              <p className="text-[11px] text-slate-500">Duration: {program.duration}</p>
              <div className="mt-4">
                <Link
                  href={`/programs/${program.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  View Program Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
