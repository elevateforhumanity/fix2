import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgramBySlug } from "@/lms-data/programs";
import { HeroBanner } from "@/components/HeroBanner";
import { ContentWithImage } from "@/components/ContentWithImage";
import { getProgramVisualsBySlug } from "@/lib/pageVisuals";

interface PageProps {
  params: { slug: string };
}

export default function ProgramDetailPage({ params }: PageProps) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const visuals = getProgramVisualsBySlug(params.slug);

  const coreInfoSection = {
    id: "program-core-info",
    title: "Program Snapshot",
    bullets: [
      program.description,
      `Tuition: $${program.salePrice.toFixed(2)} (tuition-based program).`,
      program.isStateTuitionFunded
        ? "This program may be eligible for state or workforce tuition support, depending on individual eligibility."
        : "Tuition is self-pay or employer-pay. Funding support may still be available for work experience, stipends, and OJT.",
    ],
    imageSrc: undefined as string | undefined,
    imageAlt: "",
  };

  const partnerSection =
    program.partners.length > 0
      ? {
          id: "program-partners",
          title: "Credential Partners Included",
          bullets: program.partners.map((pc) => {
            const system = pc.partnerSystem.replace("_", " ");
            return `${pc.title} (${system}, approx. ${pc.hours} hours).`;
          }),
          imageSrc: undefined as string | undefined,
          imageAlt: "",
        }
      : null;

  return (
    <main className="bg-slate-950 text-white">
      {/* If we have visual config for this program, show hero banners */}
      {visuals ? (
        <>
          {visuals.heroes.map((hero) => (
            <HeroBanner key={hero.id} hero={hero} />
          ))}
        </>
      ) : (
        <section className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-bold">{program.title}</h1>
          {program.subtitle && (
            <p className="mt-2 text-sm text-slate-300">{program.subtitle}</p>
          )}
        </section>
      )}

      {/* Program core info + partners */}
      <div className="bg-slate-100 text-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm md:col-span-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Program Details
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                {program.description}
              </p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-[11px]">
                <p className="font-semibold text-slate-900">Tuition</p>
                <p className="mt-1">
                  ${program.salePrice.toFixed(2)} (tuition-based program)
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 text-[11px] shadow-sm">
              <p className="text-[11px] font-semibold uppercase text-slate-500">
                Enroll
              </p>
              <p className="mt-1 text-[11px] text-slate-700">
                Choose pay in full or an automatic payment plan. Payment
                processing is handled securely by Stripe.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <form
                  action={`/api/enroll?program=${program.id}&mode=full`}
                  method="POST"
                >
                  <button
                    type="submit"
                    className="w-full rounded-md bg-red-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-red-700"
                  >
                    Enroll – Pay in Full
                  </button>
                </form>
                <form
                  action={`/api/enroll?program=${program.id}&mode=plan`}
                  method="POST"
                >
                  <button
                    type="submit"
                    className="w-full rounded-md border border-red-600 px-3 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                  >
                    Enroll – Payment Plan
                  </button>
                </form>
                <Link
                  href="/contact"
                  className="mt-1 inline-flex w-full items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Talk to an Advisor
                </Link>
              </div>
            </div>
          </div>

          {/* Partner credentials section inline on the page */}
          {partnerSection && (
            <div className="mt-8 rounded-xl bg-white p-4 text-xs shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Credential Partner Content
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-700">
                {partnerSection.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Any extra visual sections defined for this program */}
      {visuals && visuals.sections.length > 0 && (
        <div className="bg-white">
          {visuals.sections.map((section, idx) => (
            <ContentWithImage
              key={section.id}
              section={section}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
      )}
    </main>
  );
}
