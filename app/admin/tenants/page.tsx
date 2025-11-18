// app/admin/tenants/page.tsx
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/auth/getSession';
import { redirect } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getTenantStats() {
  const { data: tenants } = await supabase
    .from('tenants')
    .select('id, name, slug, max_active_learners, max_courses, max_storage_gb');

  if (!tenants) return [];

  const stats = await Promise.all(
    tenants.map(async (tenant) => {
      const [{ count: users }, { count: courses }, { count: enrollments }] =
        await Promise.all([
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', tenant.id),
          supabase
            .from('courses')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', tenant.id),
          supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', tenant.id),
        ]);

      return {
        ...tenant,
        users: users || 0,
        courses: courses || 0,
        enrollments: enrollments || 0,
      };
    })
  );

  return stats;
}

export default async function TenantsPage() {
  const session = await requireAuth();
  if (!(session as any)?.isAdmin) {
    redirect('/');
  }

  const tenants = await getTenantStats();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Tenant Analytics
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Overview of usage, enrollments, and quotas across all tenants.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Tenant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Users
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Courses
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Enrollments
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Quota (Learners)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Quota (Courses)
                </th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t: any) => (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{t.users}</td>
                  <td className="px-4 py-3 text-slate-700">{t.courses}</td>
                  <td className="px-4 py-3 text-slate-700">{t.enrollments}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {t.max_active_learners ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {t.max_courses ?? '—'}
                  </td>
                </tr>
              ))}
              {tenants.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No tenants found.
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
