import Link from "next/link";
import { scormPackages } from "../../../lms-data/scormPackages";

export const metadata = {
  title: "JRI Modules & SCORM Hosting | Elevate Admin",
  description:
    "Admin view of Job Ready Indy SCORM modules and where they should be hosted inside the Elevate LMS.",
};

export default function AdminJriPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin • JRI / SCORM
          </p>
          <h1 className="mt-2 text-2xl font-bold">Job Ready Indy (JRI) Modules</h1>
          <p className="mt-2 text-xs text-slate-300 max-w-3xl">
            This page documents how your JRI SCORM packages should be hosted in
            the LMS. After unzipping each SCORM package into the{" "}
            <span className="font-mono">/public/scorm/jri/</span> folder, use the
            links below to test the modules from the student view.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-4 text-[11px]">
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Setup Instructions (Once SCORM Zip is Downloaded)
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-300">
              <li>
                In your repo, create folders like{" "}
                <span className="font-mono">public/scorm/jri/module-1</span>,{" "}
                <span className="font-mono">module-2</span>, etc.
              </li>
              <li>
                Unzip each JRI SCORM package into the matching folder so that
                the main entry file is{" "}
                <span className="font-mono">index.html</span>.
              </li>
              <li>
                Confirm that{" "}
                <span className="font-mono">
                  https://yourdomain.org/scorm/jri/module-1/index.html
                </span>{" "}
                loads.
              </li>
              <li>
                Then test the student-facing view using the links below.
              </li>
            </ol>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {scormPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="text-[12px] font-semibold text-white">
                  {pkg.label}
                </p>
                <p className="mt-1 text-[11px] text-slate-300">
                  {pkg.description}
                </p>
                <p className="mt-2 text-[10px] text-slate-400">
                  Launch path (public):{" "}
                  <span className="font-mono">{pkg.launchPath}</span>
                </p>
                <Link
                  href={`/student/jri/${pkg.id}`}
                  className="mt-3 inline-flex rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                >
                  Open in Student View
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
