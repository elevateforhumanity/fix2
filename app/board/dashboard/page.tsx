import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BoardDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, organization")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "board") {
    redirect("/");
  }

  // Get referral metrics
  const { count: referrals } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("referred_by", profile.organization);

  const { count: completions } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("referred_by", profile.organization)
    .eq("status", "completed");

  const { count: active } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("referred_by", profile.organization)
    .eq("status", "in_progress");

  const rate =
    referrals && referrals > 0
      ? ((completions || 0) / referrals) * 100
      : 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Workforce Board Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Summary of learners referred by {profile.organization || "your board"}{" "}
              and their outcomes.
            </p>
          </div>
          <form action="/api/board/compliance-report" method="get">
            <button
              type="submit"
              className="rounded-2xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              Download Compliance Overview (PDF)
            </button>
          </form>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Stat label="Referrals" value={referrals || 0} />
          <Stat label="Active" value={active || 0} />
          <Stat label="Completions" value={completions || 0} />
          <Stat label="Completion Rate" value={`${rate.toFixed(1)}%`} />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            About This Dashboard
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            This dashboard shows outcomes for learners referred by your
            workforce board. Metrics are updated in real-time as students
            progress through their training programs.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">•</span>
              <span className="text-slate-700">
                <strong>Referrals:</strong> Total learners referred by your
                board
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">•</span>
              <span className="text-slate-700">
                <strong>Active:</strong> Currently enrolled and progressing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">•</span>
              <span className="text-slate-700">
                <strong>Completions:</strong> Successfully completed training
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">•</span>
              <span className="text-slate-700">
                <strong>Completion Rate:</strong> Percentage of referrals who
                completed
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
