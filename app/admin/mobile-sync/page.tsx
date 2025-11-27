import Link from "next/link";

export const metadata = {
  title: "Mobile App Sync | Elevate for Humanity Admin",
  description:
    "Admin overview of how the Elevate mobile app connects to the LMS via the mobile manifest and AI tutor endpoint.",
};

export default function AdminMobileSyncPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin • Mobile Integration
          </p>
          <h1 className="mt-2 text-2xl font-bold">Mobile App Sync Overview</h1>
          <p className="mt-2 text-xs text-slate-300 max-w-3xl">
            This page explains how the Elevate mobile app reads configuration
            from your LMS and how it connects to the AI Instructor system so
            learners get a consistent experience across web and mobile.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-6 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2">
            <p className="text-sm font-semibold text-white">
              1. Mobile Manifest Endpoint
            </p>
            <p className="text-[11px] text-slate-300">
              The mobile app reads a JSON manifest from:
            </p>
            <pre className="mt-2 rounded-md bg-slate-900 px-3 py-2 text-[11px] text-slate-100">
              /mobile/manifest
            </pre>
            <p className="text-[11px] text-slate-300">
              You can control what appears in the app by editing:
            </p>
            <pre className="mt-1 rounded-md bg-slate-900 px-3 py-2 text-[11px] text-slate-100">
              lms-data/mobileAppConfig.ts
            </pre>
            <p className="text-[10px] text-slate-400">
              Mobile engineers can call this endpoint at startup to decide which
              programs to show, which course to open by default, and which
              features (lessons, notifications) are enabled.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2">
            <p className="text-sm font-semibold text-white">
              2. AI Instructor Endpoint for Mobile
            </p>
            <p className="text-[11px] text-slate-300">
              The same AI instructor system used on the web can be called from
              the mobile app at:
            </p>
            <pre className="mt-2 rounded-md bg-slate-900 px-3 py-2 text-[11px] text-slate-100">
              /api/ai-tutor-basic
            </pre>
            <p className="text-[11px] text-slate-300">
              It expects a JSON body like:
            </p>
            <pre className="mt-2 rounded-md bg-slate-900 px-3 py-2 text-[11px] text-slate-100">
{`{
  "courseSlug": "job-ready-indy-core",
  "message": "Explain soft skills for healthcare."
}`}
            </pre>
            <p className="text-[10px] text-slate-400">
              The persona and tone for each course-slug is defined in{" "}
              <span className="font-mono">lms-data/aiInstructors.ts</span>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2">
            <p className="text-sm font-semibold text-white">
              3. Where to edit settings
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <span className="font-mono">lms-data/mobileAppConfig.ts</span>{" "}
                – app name, bundle IDs, and which programs appear in mobile.
              </li>
              <li>
                <span className="font-mono">lms-data/aiInstructors.ts</span> –
                which courses have AI instructors and how they talk.
              </li>
              <li>
                Environment variable <span className="font-mono">OPENAI_API_KEY</span>{" "}
                must be set in your hosting provider for AI to work.
              </li>
            </ul>
            <p className="mt-2 text-[10px] text-slate-400">
              Once your mobile app is pointed at this domain, any changes you
              make to these configs will flow down automatically without
              reinstalling the app.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 text-[11px] text-slate-300">
            <p className="text-sm font-semibold text-white">
              4. Quick links inside the LMS
            </p>
            <ul className="mt-1 list-disc pl-5">
              <li>
                <Link
                  href="/student/ai-tutor"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Student AI Tutor page
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile/manifest"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Mobile manifest JSON
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
