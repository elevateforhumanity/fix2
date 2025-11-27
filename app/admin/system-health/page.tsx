"use client";

import Link from "next/link";

const checks = [
  {
    name: "ESLint (Code Quality)",
    id: "lint",
    description: "Catches bad imports, unused variables, and common React mistakes.",
  },
  {
    name: "TypeScript Type Check",
    id: "type-check",
    description: "Ensures there are no type errors in .ts / .tsx files.",
  },
  {
    name: "Unit Tests",
    id: "test",
    description: "Verifies that key components and logic behave correctly.",
  },
  {
    name: "E2E Tests",
    id: "test:e2e",
    description: "Simulates real user flows across the app.",
  },
  {
    name: "Next.js Build",
    id: "build",
    description: "Ensures the app can compile and is ready for deployment.",
  },
];

export default function SystemHealthPage() {
  // In the future you can wire this to an API that reads latest GitHub Action status
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-100 bg-slate-50 py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-2xl font-bold md:text-3xl">System Health</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-700 md:text-base">
            Overview of key checks that must pass before Elevate For Humanity is deployed.
            These align with your GitHub Actions healthcheck pipeline.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl space-y-6 px-4">
          {checks.map((check) => (
            <div
              key={check.id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {check.name}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Script name: <code className="text-[11px] bg-slate-50 px-1 py-0.5 rounded">{check.id}</code>
                </p>
                <p className="mt-1 text-sm text-slate-700">{check.description}</p>
              </div>
              <div className="flex flex-col items-start gap-2 text-xs md:items-end">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                  Status: <span className="ml-1 font-semibold">Sync with GitHub Actions</span>
                </span>
                <Link
                  href="https://github.com/elevateforhumanity/fix2/actions"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View latest run on GitHub →
                </Link>
              </div>
            </div>
          ))}

          <p className="text-[11px] text-slate-500">
            To update real-time status here, you can later connect this page to a small API route
            that reads the latest GitHub Actions run via the GitHub REST API.
          </p>
        </div>
      </section>
    </main>
  );
}
