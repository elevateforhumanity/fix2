/**
 * Grant Workflow - Unified UI
 * Complete workflow: Intake → Draft → Review → Submit
 */

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Link from 'next/link';

async function getWorkflowData() {
  const { data: grants } = await supabaseAdmin
    .from('grant_opportunities')
    .select('*')
    .gte('due_date', new Date().toISOString().split('T')[0])
    .order('due_date', { ascending: true })
    .limit(20);

  const { data: entities } = await supabaseAdmin
    .from('entities')
    .select('id, name, uei, entity_type');

  const { data: applications } = await supabaseAdmin
    .from('grant_applications')
    .select('*, grant:grant_opportunities(title, due_date), entity:entities(name)')
    .order('updated_at', { ascending: false });

  return {
    grants: grants || [],
    entities: entities || [],
    applications: applications || [],
  };
}

export default async function GrantWorkflowPage() {
  const { grants, entities, applications } = await getWorkflowData();

  const statusCounts = {
    intake: grants.length,
    draft: applications.filter((a: any) => a.status === 'draft').length,
    review: applications.filter((a: any) => a.status === 'review').length,
    ready: applications.filter((a: any) => a.status === 'ready').length,
    submitted: applications.filter((a: any) => a.status === 'submitted').length,
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Grant Autopilot Workflow
          </h1>
          <p className="text-slate-600">
            Complete grant management from discovery to submission
          </p>
        </div>

        {/* Workflow Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                {statusCounts.intake}
              </div>
              <p className="text-sm font-medium text-slate-900">🟡 Intake</p>
              <p className="text-xs text-slate-500">New Opportunities</p>
            </div>
            <div className="flex-shrink-0 w-16 h-1 bg-slate-200"></div>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                {statusCounts.draft}
              </div>
              <p className="text-sm font-medium text-slate-900">🟢 Draft</p>
              <p className="text-xs text-slate-500">AI Generated</p>
            </div>
            <div className="flex-shrink-0 w-16 h-1 bg-slate-200"></div>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                {statusCounts.review}
              </div>
              <p className="text-sm font-medium text-slate-900">🔵 Review</p>
              <p className="text-xs text-slate-500">In Progress</p>
            </div>
            <div className="flex-shrink-0 w-16 h-1 bg-slate-200"></div>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                {statusCounts.ready}
              </div>
              <p className="text-sm font-medium text-slate-900">🟣 Ready</p>
              <p className="text-xs text-slate-500">Package Built</p>
            </div>
            <div className="flex-shrink-0 w-16 h-1 bg-slate-200"></div>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                {statusCounts.submitted}
              </div>
              <p className="text-sm font-medium text-slate-900">✅ Submitted</p>
              <p className="text-xs text-slate-500">Complete</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Stage 1: Intake - New Opportunities */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                🟡 Intake: New Opportunities
              </h2>
              <Link
                href="/admin/grants/intake"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {grants.slice(0, 5).map((grant: any) => (
                <div
                  key={grant.id}
                  className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition"
                >
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {grant.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {grant.agency || 'Federal Agency'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Due: {new Date(grant.due_date).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/admin/grants/intake/${grant.id}`}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      Start Draft
                    </Link>
                  </div>
                </div>
              ))}
              {grants.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">
                  No new opportunities. Run sync to import grants.
                </p>
              )}
            </div>
          </section>

          {/* Stage 2: Draft - AI Generated */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                🟢 Draft: AI Generated
              </h2>
              <Link
                href="/admin/grants/drafts"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {applications
                .filter((a: any) => a.status === 'draft')
                .slice(0, 5)
                .map((app: any) => (
                  <div
                    key={app.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-green-300 transition"
                  >
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {app.grant?.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      For: {app.entity?.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Updated: {new Date(app.updated_at).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/admin/grants/review/${app.id}`}
                        className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              {applications.filter((a: any) => a.status === 'draft').length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">
                  No drafts yet. Start drafting from intake.
                </p>
              )}
            </div>
          </section>

          {/* Stage 3: Review - In Progress */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                🔵 Review: In Progress
              </h2>
              <Link
                href="/admin/grants/review"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {applications
                .filter((a: any) => a.status === 'review')
                .slice(0, 5)
                .map((app: any) => (
                  <div
                    key={app.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition"
                  >
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {app.grant?.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      For: {app.entity?.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Due: {new Date(app.grant?.due_date).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/admin/grants/review/${app.id}`}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                ))}
              {applications.filter((a: any) => a.status === 'review').length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">
                  No applications in review.
                </p>
              )}
            </div>
          </section>

          {/* Stage 4: Ready - Package Built */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                🟣 Ready: Package Built
              </h2>
              <Link
                href="/admin/grants/ready"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {applications
                .filter((a: any) => a.status === 'ready')
                .slice(0, 5)
                .map((app: any) => (
                  <div
                    key={app.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-purple-300 transition"
                  >
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {app.grant?.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      For: {app.entity?.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Due: {new Date(app.grant?.due_date).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/admin/grants/submit/${app.id}`}
                        className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700"
                      >
                        Submit
                      </Link>
                    </div>
                  </div>
                ))}
              {applications.filter((a: any) => a.status === 'ready').length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">
                  No packages ready for submission.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Link
              href="/admin/grants/sync"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition"
            >
              <div className="text-3xl mb-2">🔄</div>
              <div className="font-semibold">Sync Grants</div>
              <div className="text-xs opacity-90">Import new opportunities</div>
            </Link>
            <Link
              href="/admin/grants/match"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition"
            >
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold">Run Matching</div>
              <div className="text-xs opacity-90">Find best fits</div>
            </Link>
            <Link
              href="/admin/grants/eligibility"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition"
            >
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">Check Eligibility</div>
              <div className="text-xs opacity-90">Verify SAM.gov status</div>
            </Link>
            <Link
              href="/admin/grants/submissions"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition"
            >
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold">View History</div>
              <div className="text-xs opacity-90">All submissions</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
