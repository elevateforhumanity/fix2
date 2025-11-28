import { notFound } from "next/navigation";
import Link from "next/link";
import { getScormPackageById } from "@/lms-data/scorm";
import { ScormPlayer } from "@/components/ScormPlayer";

interface PageProps {
  params: { scormId: string };
}

export const metadata = {
  title: "SCORM Course Player | Elevate for Humanity",
};

export default function ScormPlayerPage({ params }: PageProps) {
  const pkg = getScormPackageById(params.scormId);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              SCORM Course
            </p>
            <h1 className="text-lg font-semibold text-white">
              {pkg.title}
            </h1>
            <p className="mt-1 text-[11px] text-slate-300">
              {pkg.title} - SCORM Package
            </p>
          </div>
          <div className="hidden flex-col items-end gap-2 text-[11px] md:flex">
            <Link
              href="/student/scorm"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Back to SCORM Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          {pkg.launchUrl ? (
            <>
              <ScormPlayer launchUrl={pkg.launchUrl} title={pkg.title} />
              <div className="mt-3 flex flex-wrap justify-between gap-2 text-[11px] text-slate-400">
                <p>
                  If the course does not load, confirm that the SCORM package is
                  unzipped under <code className="font-mono text-[10px]">public{pkg.launchUrl}</code> and that
                  the launch file is named <code className="font-mono text-[10px]">index.html</code>.
                </p>
                <Link
                  href="/student/scorm"
                  className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
                >
                  Back to SCORM Catalog
                </Link>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
              <p className="font-semibold text-white">Launch URL Not Configured</p>
              <p className="mt-2 text-slate-300">
                This SCORM package does not have a launch URL configured yet. 
                Contact Elevate staff to connect the SCORM host.
              </p>
              {pkg.notes && (
                <p className="mt-2 text-[10px] text-slate-400">{pkg.notes}</p>
              )}
              <Link
                href="/student/scorm"
                className="mt-3 inline-block rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
              >
                Back to SCORM Catalog
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
