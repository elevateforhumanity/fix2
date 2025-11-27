import Link from "next/link";
import Image from "next/image";
import { allPrograms } from "@/lms-data/programs";
import { getProgramVisualsBySlug } from "@/lib/pageVisuals";

export default function ProgramsCatalogPage() {
  const visiblePrograms = allPrograms.filter((p) => p.visiblePublic);
  const sortedPrograms = [...visiblePrograms].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-700/40 via-slate-950 to-blue-900/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Elevate For Humanity Programs
          </p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Choose a Pathway That Matches Where You Want to Go.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-100/90">
            Every program is a real career pathway, paired with credential partners
            and employer connections. Tuition is clear, funding and Earn While You
            Learn options are explained, and support is available the whole way.
          </p>
        </div>
      </section>

      <section className="bg-slate-100 text-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedPrograms.map((program) => {
              const visuals = getProgramVisualsBySlug(program.slug);
              const primaryHeroImage =
                visuals?.heroes[0]?.imageSrc || "/images/home/program-collage.jpg";

              return (
                <article
                  key={program.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={primaryHeroImage}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-4 text-xs">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-red-600">
                      Career Pathway
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-slate-900">
                      {program.title}
                    </h2>
                    {program.subtitle && (
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-700">
                        {program.subtitle}
                      </p>
                    )}

                    <div className="mt-2 rounded-lg bg-slate-50 p-2 text-[11px]">
                      <p className="font-semibold text-slate-900">Tuition</p>
                      <p className="mt-1 text-slate-800">
                        ${program.salePrice.toFixed(2)} (tuition-based program)
                      </p>
                      {program.earnWhileYouLearnNotes && (
                        <p className="mt-1 text-slate-600">
                          <span className="font-semibold">
                            Earn While You Learn:
                          </span>{" "}
                          {program.earnWhileYouLearnNotes}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="inline-flex flex-1 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-red-700"
                      >
                        View Program
                      </Link>
                      <form
                        action={`/api/enroll?program=${program.id}&mode=full`}
                        method="POST"
                        className="flex-1"
                      >
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-md border border-red-600 px-3 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                        >
                          Enroll – Pay in Full
                        </button>
                      </form>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-500">
                      Payment plans, funding support, and Earn While You Learn
                      options may be available depending on your eligibility and
                      location.
                    </p>
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
