import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgramBySlug } from "@/lms-data/programs";

interface PageProps {
  params: { slug: string };
}

export default function ProgramDetailPage({ params }: PageProps) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-slate-900">
      <h1 className="text-2xl font-bold">{program.title}</h1>
      {program.subtitle && (
        <p className="mt-2 text-sm text-slate-600">{program.subtitle}</p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        {program.description}
      </p>

      <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs">
        <p className="font-semibold text-slate-900">Tuition</p>
        <p className="mt-1">
          <span className="font-semibold">${program.salePrice.toFixed(2)}</span>{" "}
          (tuition-based program)
        </p>
        {program.earnWhileYouLearnNotes && (
          <p className="mt-2 text-slate-700">
            <span className="font-semibold">Earn While You Learn:</span>{" "}
            {program.earnWhileYouLearnNotes}
          </p>
        )}
      </div>

      {program.partners.length > 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 p-4 text-xs">
          <p className="font-semibold text-slate-900">
            Credentialed Partner Content Included
          </p>
          <ul className="mt-2 space-y-1 list-disc pl-4">
            {program.partners.map((pc) => (
              <li key={pc.id}>
                <span className="font-semibold">{pc.title}</span>{" "}
                <span className="text-slate-500">
                  ({pc.partnerSystem}, approx. {pc.hours} hrs)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3 text-xs">
        <form action={`/api/enroll?program=${program.id}&mode=full`} method="POST">
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Enroll – Pay in Full
          </button>
        </form>

        <form action={`/api/enroll?program=${program.id}&mode=plan`} method="POST">
          <button
            type="submit"
            className="rounded-md border border-red-600 px-4 py-2 font-semibold text-red-600 hover:bg-red-50"
          >
            Enroll – Payment Plan
          </button>
        </form>

        <Link
          href="/contact"
          className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Talk to an advisor
        </Link>
      </div>
    </div>
  );
}
