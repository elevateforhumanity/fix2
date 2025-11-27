"use client";

import { useState } from "react";

export default function AdminCourseImportPage() {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImport = async (source: string) => {
    setImporting(true);
    setResult(null);

    // Simulate import process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResult(`Successfully imported courses from ${source}. (This is a placeholder - implement real import logic.)`);
    setImporting(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin • Course Management
          </p>
          <h1 className="mt-2 text-2xl font-bold">Course Import & Integration</h1>
          <p className="mt-2 text-xs text-slate-300 max-w-3xl">
            Import courses from external sources like Milady RISE, SCORM packages,
            or CSV files. This page provides a shell for building import workflows
            that populate your course library.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-5 text-[11px]">
          {/* IMPORT OPTIONS */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Import Sources
            </p>
            <p className="mt-1 text-slate-300">
              Choose an import source below. Each option will guide you through
              the specific requirements for that integration.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* MILADY RISE */}
            <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">
                Milady RISE Integration
              </p>
              <p className="mt-2 text-[11px] text-slate-300">
                Import barber and beauty courses from Milady RISE. Requires API
                credentials and course mapping configuration.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[10px] text-slate-400">
                <li>Barber theory modules</li>
                <li>Esthetics curriculum</li>
                <li>Nail technician content</li>
                <li>State board prep materials</li>
              </ul>
              <button
                onClick={() => handleImport("Milady RISE")}
                disabled={importing}
                className="mt-3 inline-flex rounded-md bg-red-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importing ? "Importing..." : "Import from Milady RISE"}
              </button>
            </article>

            {/* SCORM PACKAGES */}
            <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">
                SCORM Package Upload
              </p>
              <p className="mt-2 text-[11px] text-slate-300">
                Upload SCORM 1.2 or SCORM 2004 packages. The system will extract
                metadata and create course entries automatically.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[10px] text-slate-400">
                <li>JRI modules (already configured)</li>
                <li>Third-party SCORM content</li>
                <li>Custom e-learning packages</li>
                <li>Compliance training modules</li>
              </ul>
              <button
                onClick={() => handleImport("SCORM Package")}
                disabled={importing}
                className="mt-3 inline-flex rounded-md bg-slate-700 px-4 py-2 text-[11px] font-semibold text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importing ? "Importing..." : "Upload SCORM Package"}
              </button>
            </article>

            {/* CSV IMPORT */}
            <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">
                CSV Course Import
              </p>
              <p className="mt-2 text-[11px] text-slate-300">
                Bulk import courses from a CSV file. Useful for migrating from
                other LMS platforms or creating courses from spreadsheets.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[10px] text-slate-400">
                <li>Course title, description, duration</li>
                <li>Module and lesson structure</li>
                <li>Prerequisites and sequencing</li>
                <li>Instructor assignments</li>
              </ul>
              <button
                onClick={() => handleImport("CSV File")}
                disabled={importing}
                className="mt-3 inline-flex rounded-md bg-slate-700 px-4 py-2 text-[11px] font-semibold text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importing ? "Importing..." : "Import from CSV"}
              </button>
            </article>

            {/* MANUAL ENTRY */}
            <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">
                Manual Course Builder
              </p>
              <p className="mt-2 text-[11px] text-slate-300">
                Create courses manually using the course authoring interface.
                Best for custom content or when no import source is available.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[10px] text-slate-400">
                <li>Rich text editor for lessons</li>
                <li>Video and media embedding</li>
                <li>Quiz and assessment builder</li>
                <li>Certificate configuration</li>
              </ul>
              <button
                onClick={() => window.location.href = "/admin/courses/create"}
                className="mt-3 inline-flex rounded-md bg-slate-700 px-4 py-2 text-[11px] font-semibold text-white hover:bg-slate-600"
              >
                Open Course Builder
              </button>
            </article>
          </div>

          {/* RESULT MESSAGE */}
          {result && (
            <div className="rounded-xl border border-emerald-800 bg-emerald-900/20 p-4">
              <p className="text-[11px] text-emerald-300">{result}</p>
            </div>
          )}

          {/* IMPLEMENTATION NOTES */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Implementation Notes
            </p>
            <p className="mt-2 text-[11px] text-slate-300">
              This page is a shell for course import functionality. To implement:
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[11px] text-slate-300">
              <li>
                <span className="font-semibold">Milady RISE:</span> Use the
                integration config in{" "}
                <span className="font-mono">
                  lms-data/milady-rise-integration.json
                </span>{" "}
                to build API calls
              </li>
              <li>
                <span className="font-semibold">SCORM:</span> Create an upload
                endpoint that extracts manifest.xml and stores files in{" "}
                <span className="font-mono">public/scorm/</span>
              </li>
              <li>
                <span className="font-semibold">CSV:</span> Define a CSV schema
                and create a parser that inserts into Supabase{" "}
                <span className="font-mono">courses</span> table
              </li>
              <li>
                <span className="font-semibold">Manual:</span> Link to existing
                course builder at{" "}
                <span className="font-mono">/admin/courses/create</span>
              </li>
            </ol>
          </div>

          <p className="text-[10px] text-slate-400">
            TIP: Start with CSV import as it&apos;s the simplest to implement.
            Then add SCORM support, and finally integrate with Milady RISE API
            once you have credentials.
          </p>
        </div>
      </section>
    </main>
  );
}
