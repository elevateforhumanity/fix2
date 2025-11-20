// app/admin/compliance/exports/page.tsx
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/auth/getSession';
import { redirect } from 'next/navigation';

async function getExportEvents() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase
    .from('account_export_events')
    .select('*')
    .order('exported_at', { ascending: false })
    .limit(100);

  return data || [];
}

export default async function ExportsPage() {
  const session = await requireAuth();
  if (!(session as any)?.isAdmin) {
    redirect('/');
  }

  const events = await getExportEvents();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Data Export History
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Log of account data exports for audit and privacy compliance.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Exported At
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Format
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((e: any) => (
                <tr key={e.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{e.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(e.exported_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {e.format}
                    </span>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No export events yet.
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
