import Link from "next/link";
import { getVisibleScormPackages } from "@/lms-data/scorm";

export const metadata = {
  title: "SCORM Courses | Elevate for Humanity",
  description:
    "Browse SCORM-based courses such as Job Ready Indy (JRI) modules and other partner content."
};

export default function ScormCatalogPage() {
  const packages = getVisibleScormPackages();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Student View
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Partner &amp; SCORM-Based Courses
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            These courses are delivered using partner content such as Job Ready
            Indy (JRI) and other credential providers. Your advisor or case
            manager will let you know which modules you must complete for your
            program.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          {packages.length === 0 ? (
            <p className="text-xs text-slate-300">
              No SCORM-based courses are currently visible. Please check back
              later or contact support.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs shadow-sm"
                >
                  <p className="text-[11px] font-semibold text-slate-300">
                    {pkg.provider.toUpperCase()}
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-white">
                    {pkg.title}
                  </h2>
                  <p className="mt-1 line-clamp-3 text-[11px] text-slate-400">
                    {pkg.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/student/scorm/${pkg.id}`}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                    >
                      Launch Course
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
