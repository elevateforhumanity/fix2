import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function HostShopDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: shops } = await supabase
    .from('host_shops')
    .select('id,name,owner_id,approval_status,is_approved,verified')
    .eq('owner_id', user.id);

  const shopIds = (shops ?? []).map((s) => s.id);
  if (!shopIds.length) redirect('/shop/onboarding');

  const { data: assigned } = await supabase
    .from('host_shop_apprentices')
    .select('id,host_shop_id,apprentice_id,status,start_date')
    .in('host_shop_id', shopIds)
    .order('created_at', { ascending: false });

  const apprenticeIds = [...new Set((assigned ?? []).map((a) => a.apprentice_id))];
  const { data: profiles } = apprenticeIds.length
    ? await supabase.from('profiles').select('id,full_name,email').in('id', apprenticeIds)
    : { data: [] as any[] };
  const names = new Map((profiles ?? []).map((p) => [p.id, p]));

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="rounded-2xl bg-slate-950 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Registered Apprenticeship</p>
        <h1 className="mt-2 text-3xl font-bold">Host Shop Dashboard</h1>
        <p className="mt-2 max-w-3xl text-slate-200">Review the same training standards your apprentices see, document services and hours, and sign off only on work you directly observed.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5"><div className="text-sm text-slate-500">Host shops</div><div className="text-3xl font-bold">{shops?.length ?? 0}</div></div>
        <div className="rounded-xl border bg-white p-5"><div className="text-sm text-slate-500">Assigned apprentices</div><div className="text-3xl font-bold">{assigned?.length ?? 0}</div></div>
        <Link href="/shop/syllabus" className="rounded-xl border bg-white p-5 hover:border-blue-500"><div className="font-semibold">Program syllabus</div><div className="mt-1 text-sm text-slate-600">Appendix A competencies, RTI and practical requirements</div></Link>
      </section>

      <section className="rounded-xl border bg-white">
        <div className="border-b p-5"><h2 className="text-xl font-bold">Apprentices</h2><p className="text-sm text-slate-600">Live assignments from Supabase. No demo records.</p></div>
        <div className="divide-y">
          {(assigned ?? []).map((a) => {
            const p = names.get(a.apprentice_id);
            return <div key={a.id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
              <div><div className="font-semibold">{p?.full_name || p?.email || 'Apprentice'}</div><div className="text-sm text-slate-500">Status: {a.status} · Start: {a.start_date || 'Not recorded'}</div></div>
              <Link className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700" href={`/shop/apprentices/${a.apprentice_id}`}>Open progress & sign-off</Link>
            </div>;
          })}
          {!assigned?.length && <div className="p-8 text-center text-slate-500">No apprentices are currently assigned to this host shop.</div>}
        </div>
      </section>
    </main>
  );
}
