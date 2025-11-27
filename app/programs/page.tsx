import Link from "next/link";
import Image from "next/image";
import { allPrograms } from "@/lms-data/programs";
import { getProgramVisualsBySlug } from "@/lib/pageVisuals";

export default function ProgramsCatalogPage() {
  const visiblePrograms = allPrograms.filter((p) => p.visiblePublic);
  
  // Separate free/funded programs from tuition-based ETPL programs
  const freePrograms = visiblePrograms.filter((p) => p.salePrice === 0 || p.salePrice < 100);
  const etplPrograms = visiblePrograms.filter((p) => p.salePrice >= 100);
  
  const sortedFreePrograms = [...freePrograms].sort((a, b) => a.title.localeCompare(b.title));
  const sortedEtplPrograms = [...etplPrograms].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-white/90">
            Elevate For Humanity Programs
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Choose a Pathway That Matches Where You Want to Go.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/95">
            Every program is a real career pathway, paired with credential partners
            and employer connections. Free programs funded through WIOA, WRG, and JRI.
            ETPL programs available with payment plans.
          </p>
        </div>
      </section>

      {/* FREE/FUNDED PROGRAMS */}
      <section className="bg-white text-slate-900 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              100% Free Programs (WIOA, WRG, JRI Funded)
            </h2>
            <p className="mt-2 text-slate-600">
              No tuition, no debt. These programs are fully funded for eligible participants.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedFreePrograms.map((program) => {
              const visuals = getProgramVisualsBySlug(program.slug);
              const primaryHeroImage =
                visuals?.heroes[0]?.imageSrc || "/images/home/program-collage.jpg";

              return (
                <article
                  key={program.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg border-2 border-green-500"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={primaryHeroImage}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      100% FREE
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-4">
                    <h2 className="text-lg font-bold text-slate-900">
                      {program.title}
                    </h2>
                    {program.subtitle && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {program.subtitle}
                      </p>
                    )}

                    <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
                      <p className="font-bold text-green-800">FREE with WIOA/WRG/JRI</p>
                      <p className="mt-1 text-sm text-green-700">
                        No tuition for eligible participants
                      </p>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="block w-full text-center rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700"
                      >
                        Learn More & Apply
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ETPL TUITION-BASED PROGRAMS */}
      {sortedEtplPrograms.length > 0 && (
        <section className="bg-slate-50 text-slate-900 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                ETPL Career Training Programs
              </h2>
              <p className="mt-2 text-slate-600">
                Professional certification programs with tuition. Payment plans and employer sponsorship available.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sortedEtplPrograms.map((program) => {
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

                    <div className="mt-4">
                      <Link
                        href={`/apply?program=${program.slug}`}
                        className="block w-full text-center rounded-lg bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700"
                      >
                        Apply Now
                      </Link>
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
      )}
    </main>
  );
}
