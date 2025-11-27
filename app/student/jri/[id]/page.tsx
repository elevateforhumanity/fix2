"use client";

import { useEffect, useState } from "react";
import { scormPackages } from "../../../../lms-data/scormPackages";

interface Props {
  params: { id: string };
}

export default function JriModulePage({ params }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const pkg = scormPackages.find((p) => p.id === params.id);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  if (!pkg) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
            JRI Module
          </p>
          <h1 className="mt-3 text-2xl font-bold">Module not found</h1>
          <p className="mt-2 text-xs text-slate-300">
            If you believe this is an error, please contact Elevate support.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Student • Job Ready Indy (JRI)
          </p>
          <h1 className="mt-1 text-xl font-bold">{pkg.label}</h1>
          <p className="mt-1 text-[11px] text-slate-300">{pkg.description}</p>
          {pkg.estimatedMinutes && (
            <p className="mt-1 text-[10px] text-slate-400">
              Estimated time: {pkg.estimatedMinutes} minutes
            </p>
          )}
          <p className="mt-2 text-[10px] text-slate-400">
            This content is provided by Job Ready Indy and runs inside Elevate&apos;s
            LMS. Please complete the full module and follow any instructions on
            the screen.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-2 py-4 text-[11px]">
          <div className="rounded-xl border border-slate-800 bg-slate-950">
            {isLoading ? (
              <div className="flex h-[70vh] items-center justify-center">
                <p className="text-xs text-slate-400">
                  Loading JRI module, please wait...
                </p>
              </div>
            ) : (
              <iframe
                src={pkg.launchPath}
                className="h-[80vh] w-full rounded-xl border-0"
                title={pkg.label}
              />
            )}
          </div>
          <p className="mt-2 text-[10px] text-slate-500">
            NOTE: You must allow this page to load fully. Do not close it until
            you see a completion screen inside the module.
          </p>
        </div>
      </section>
    </main>
  );
}
