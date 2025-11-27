import Link from "next/link";
import { siteHealthChecklist } from "../../../lms-data/siteHealth";

export const metadata = {
  title: "Site Health & Launch Checklist | Elevate Admin",
  description:
    "One place to see documentation, content, configuration, and testing status before launch.",
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  "todo": {
    label: "To do",
    className: "bg-slate-800 text-slate-100",
  },
  "in-progress": {
    label: "In progress",
    className: "bg-amber-500/20 text-amber-300",
  },
  "done": {
    label: "Done",
    className: "bg-emerald-500/20 text-emerald-300",
  },
};

export default function SiteHealthPage() {
  const criticalEnvVars = [
    "NEXT_PUBLIC_SITE_URL",
    "STRIPE_SECRET_KEY",
    "OPENAI_API_KEY",
  ] as const;

  const envStatus = criticalEnvVars.map((name) => ({
    name,
    isSet: Boolean(process.env[name]),
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin • Site Health
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            Site Health & Launch Checklist
          </h1>
          <p className="mt-2 text-xs text-slate-300 max-w-3xl">
            This dashboard turns the audit into a living checklist so you and
            your team can see exactly what&apos;s left before launch: docs,
            content, configuration, and testing.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-6 text-[11px]">
          {/* Env Status */}
          <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-white">
              Environment Configuration (Critical)
            </p>
            <p className="mt-2 text-slate-300">
              These values must be set in production before you go live.
            </p>
            <ul className="mt-3 space-y-1 text-[11px]">
              {envStatus.map((env) => (
                <li
                  key={env.name}
                  className="flex items-center justify-between gap-3 rounded-lg bg-slate-900/70 px-3 py-2"
                >
                  <span className="font-mono text-[10px] text-slate-200">
                    {env.name}
                  </span>
                  <span
                    className={
                      env.isSet
                        ? "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300"
                        : "rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] text-red-300"
                    }
                  >
                    {env.isSet ? "Set" : "Missing"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-slate-500">
              Full details in{" "}
              <Link
                href="/docs/ENV_CONFIG.md"
                className="underline underline-offset-2 text-orange-300"
              >
                ENV_CONFIG.md
              </Link>
              .
            </p>
          </article>

          {/* Checklist */}
          <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-white">
              Launch Checklist
            </p>
            <p className="mt-2 text-slate-300">
              Based on your audit: documentation, content, configuration, and
              testing items that need attention.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {siteHealthChecklist.map((item) => {
                const status = STATUS_LABELS[item.status];
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-900/80 p-3"
                  >
                    <div>
                      <p className="text-[10px] uppercase text-slate-400">
                        {item.category}
                      </p>
                      <p className="mt-1 text-[12px] font-semibold text-white">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">
                        {item.description}
                      </p>
                      {item.docsLink && (
                        <p className="mt-1 text-[10px] text-slate-400">
                          See:{" "}
                          <span className="font-mono">{item.docsLink}</span>
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[10px] text-slate-500">
              As we wire Supabase and live data, these statuses can update
              automatically (for example, when JRI SCORM modules are detected or
              when Stripe billing is fully configured).
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
