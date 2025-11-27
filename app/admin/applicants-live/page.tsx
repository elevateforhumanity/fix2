import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import ContentProtection from "@/components/protection/ContentProtection";

export const metadata = {
  title: "Applicants (Live) | Admin | Elevate for Humanity",
  description:
    "Live view of Elevate program applicants pulled directly from Supabase.",
};

type ApplicationRow = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  program_id: string;
  preferred_start: string | null;
  heard_about_us: string | null;
  youth: boolean | null;
  reentry: boolean | null;
  interested_in_jri: boolean | null;
  interested_in_wex: boolean | null;
  interested_in_ojt: boolean | null;
  needs_support: string[] | null;
  status: string;
};

export default async function AdminApplicantsLivePage() {
  if (!supabase) {
    return (
      <main className="min-h-screen bg-slate-900 text-white">
        <section className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto max-w-5xl px-4 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              Admin – Applicants (Live)
            </p>
            <h1 className="mt-1 text-2xl font-bold">Applications – Live View</h1>
            <p className="mt-2 text-xs text-slate-300">
              Supabase is not configured. Set{" "}
              <code className="rounded bg-slate-800 px-1">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              and{" "}
              <code className="rounded bg-slate-800 px-1">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>{" "}
              in your environment, and make sure the{" "}
              <code className="rounded bg-slate-800 px-1">applications</code>{" "}
              table exists.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <Link
                href="/admin/applicants"
                className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
              >
                View Demo Applicants
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[AdminApplicantsLive] Supabase error:", error);
    return (
      <main className="min-h-screen bg-slate-900 text-white">
        <section className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto max-w-5xl px-4 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              Admin – Applicants (Live)
            </p>
            <h1 className="mt-1 text-2xl font-bold">Applications – Live View</h1>
            <p className="mt-2 text-xs text-red-400">
              There was an error reading from Supabase: {error.message}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <Link
                href="/admin/applicants"
                className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
              >
                View Demo Applicants
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const apps = (data || []) as ApplicationRow[];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin – Applicants (Live)
          </p>
          <h1 className="mt-1 text-2xl font-bold">Applications – Live View</h1>
          <p className="mt-2 text-xs text-slate-300">
            These records are coming directly from your Supabase{" "}
            <code className="rounded bg-slate-800 px-1">applications</code>{" "}
            table. This is the version staff can use to review and triage.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/admin/applicants"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              View Demo Applicants
            </Link>
            <Link
              href="/apply"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              View Application Form
            </Link>
            <Link
              href="/admin/dashboard-enhanced"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          {apps.length === 0 ? (
            <p className="text-slate-300">
              No applications found yet. Submit a test application on{" "}
              <Link
                href="/apply"
                className="text-orange-300 underline hover:text-orange-200"
              >
                /apply
              </Link>{" "}
              and refresh this page.
            </p>
          ) : (
            <div className="space-y-3">
              {apps.map((app) => (
                <article
                  key={app.id}
                  className="rounded-xl border border-slate-700 bg-slate-900/90 p-3"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-100">
                        {app.first_name} {app.last_name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {app.email}
                        {app.phone ? ` • ${app.phone}` : ""}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-300">
                        Program: {app.program_id}
                      </p>
                      {app.preferred_start && (
                        <p className="text-[10px] text-slate-400">
                          Preferred start: {app.preferred_start}
                        </p>
                      )}
                      {app.heard_about_us && (
                        <p className="text-[10px] text-slate-400">
                          Heard about us: {app.heard_about_us}
                        </p>
                      )}
                      <p className="mt-1 text-[10px] text-slate-400">
                        Youth: {app.youth ? "Yes" : "No"} • Re-entry:{" "}
                        {app.reentry ? "Yes" : "No"}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-300">
                        {app.interested_in_jri && (
                          <span className="rounded-full border border-slate-700 px-2 py-0.5">
                            JRI
                          </span>
                        )}
                        {app.interested_in_wex && (
                          <span className="rounded-full border border-slate-700 px-2 py-0.5">
                            WEX
                          </span>
                        )}
                        {app.interested_in_ojt && (
                          <span className="rounded-full border border-slate-700 px-2 py-0.5">
                            OJT
                          </span>
                        )}
                      </div>
                      {app.needs_support && app.needs_support.length > 0 && (
                        <p className="mt-1 text-[10px] text-slate-400">
                          Needs support with: {app.needs_support.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2 text-[10px] md:items-end">
                      <span className="rounded-full border border-slate-700 px-2 py-0.5 text-slate-200">
                        Status: {app.status}
                      </span>
                      <Link
                        href={`/checkout/${app.program_id}`}
                        className="rounded-md bg-orange-400 px-3 py-1 text-[11px] font-semibold text-white hover:bg-orange-500"
                      >
                        View Program Checkout
                      </Link>
                    </div>
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
