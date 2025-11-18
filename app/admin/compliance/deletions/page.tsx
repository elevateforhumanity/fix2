// app/admin/compliance/deletions/page.tsx
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/auth/getSession';
import { redirect } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getDeletionRequests() {
  const { data } = await supabase
    .from('account_deletion_requests')
    .select('*')
    .order('requested_at', { ascending: false })
    .limit(100);

  return data || [];
}

export default async function DeletionsPage() {
  const session = await requireAuth();
  if (!(session as any)?.isAdmin) {
    redirect('/');
  }

  const requests = await getDeletionRequests();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Account Deletion Requests
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review and track GDPR/FERPA-style account deletion requests.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Requested At
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r: any) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{r.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(r.requested_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        r.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : r.status === 'processed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {r.notes || <span className="text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No deletion requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
