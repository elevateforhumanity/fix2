import Link from "next/link";
import { documentCategories } from "@/lms-data/docs";

export const metadata = {
  title: "Document Center | Elevate for Humanity",
  description:
    "Internal document library for DOL guidance, funding playbooks, employer MOUs, credential partners, and compliance policies."
};

export default function DocumentCenterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Internal – Staff Only
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Document Center
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Your organized library for DOL guidance, WIOA/WRG/JRI docs, funding
            playbooks, employer MOUs, credential partner agreements, IRS VITA
            resources, intake forms, templates, and compliance policies.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            This is your single source of truth for all the documents you need
            when talking to workforce boards, funders, employers, and partners.
            Everything is tagged and searchable.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documentCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/admin/document-center/${cat.id}`}
                className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs shadow-sm transition hover:border-slate-700 hover:bg-slate-950"
              >
                <div className="text-3xl">{cat.icon}</div>
                <h2 className="mt-2 text-sm font-semibold text-white">
                  {cat.title}
                </h2>
                <p className="mt-1 text-[11px] text-slate-300">
                  {cat.description}
                </p>
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-red-400">
                    View Documents →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
