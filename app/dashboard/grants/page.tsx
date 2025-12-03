// app/dashboard/grants/page.tsx
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import ActionsBar from './ActionsBar';

async function getData() {
  const { data: grants } = await supabaseAdmin
    .from('grant_opportunities')
    .select('id,title,agency,summary,due_date,url')
    .order('due_date', { ascending: true });

  const { data: matches } = await supabaseAdmin
    .from('grant_matches')
    .select(
      'id,match_score,reasons,grant:grant_opportunities(id,title),entity:entities(id,name)'
    )
    .order('match_score', { ascending: false });

  const { data: apps } = await supabaseAdmin
    .from('grant_applications')
    .select(
      'id,status,grant:grant_opportunities(id,title,due_date),entity:entities(id,name)'
    )
    .order('updated_at', { ascending: false });

  return { grants: grants ?? [], matches: matches ?? [], apps: apps ?? [] };
}

export default async function GrantsDashboardPage() {
  const { grants, matches, apps } = await getData();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Grant Autopilot Dashboard
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          This is your internal control room for Elevate For Humanity, Curvature
          Body Sculpting, and Selfish Inc. Sync grants, run matches, and review
          drafted applications.
        </p>

        <ActionsBar />

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Open Opportunities</p>
            <p className="text-3xl font-semibold">{grants.length}</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Matches Found</p>
            <p className="text-3xl font-semibold">{matches.length}</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Applications Drafted</p>
            <p className="text-3xl font-semibold">{apps.length}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold mb-3">Best Matches</h2>
            <div className="space-y-3">
              {matches.map((m: any) => (
                <div
                  key={m.id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {m.grant?.title}
                  </p>
                  <p className="text-xs text-slate-500 mb-1">
                    For: {m.entity?.name}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mb-1">
                    Match score: {m.match_score} / 100
                  </p>
                  <p className="text-xs text-slate-600">
                    {Array.isArray(m.reasons)
                      ? m.reasons.join(' • ')
                      : m.reasons}
                  </p>
                </div>
              ))}
              {matches.length === 0 && (
                <p className="text-sm text-slate-500">
                  No matches yet. Use the controls above to sync and match.
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Draft Applications</h2>
            <div className="space-y-3">
              {apps.map((a: any) => (
                <div
                  key={a.id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {a.grant?.title}
                  </p>
                  <p className="text-xs text-slate-500 mb-1">
                    For: {a.entity?.name}
                  </p>
                  <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Status: {a.status}
                  </p>
                </div>
              ))}
              {apps.length === 0 && (
                <p className="text-sm text-slate-500">
                  No drafted applications yet. Once you pick a grant and entity,
                  call the /api/grants/draft endpoint to generate a full
                  narrative.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
