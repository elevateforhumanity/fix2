import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import HostShopDashboardTour from './host-shop-tour';
import ProfileImageUpload from '@/components/apprenticeship/ProfileImageUpload';

export const dynamic = 'force-dynamic';

export default async function HostShopDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: shops } = await supabase
    .from('host_shops')
    .select('id,name,owner_id,approval_status,is_approved,verified,image_url')
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
    <main className="mx-auto max-w-7xl space-y-8 p-6" data-tour="overview">
      <HostShopDashboardTour />
      <header className="relative overflow-hidden rounded-3xl bg-slate-950 text-white">
        {shops?.[0]?.image_url ? <img src={shops[0].image_url} alt={shops[0].name || 'Host shop'} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[url('/images/barber-highlight-1.jpg')] bg-cover bg-center" />}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="relative z-10 p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Registered Apprenticeship</p>
        <h1 className="mt-2 text-3xl font-bold">Host Shop Dashboard</h1>
        <p className="mt-2 max-w-3xl text-slate-200">Review the same training standards your apprentices see, document services and hours, and sign off only on work you directly observed.</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full bg-white/15 px-3 py-2">Train</span><span className="rounded-full bg-white/15 px-3 py-2">Observe</span><span className="rounded-full bg-white/15 px-3 py-2">Document</span><span className="rounded-full bg-white/15 px-3 py-2">Verify</span></div>
        </div>
      </header>

      {!shops?.[0]?.image_url && <section className="rounded-xl border-2 border-orange-300 bg-orange-50 p-5"><h2 className="font-bold text-orange-950">To-do: add your shop image</h2><p className="mt-1 text-sm text-orange-900">Upload your logo, storefront, team, or professional shop image. Once uploaded, it replaces the generic banner and represents your shop throughout the host-shop portal.</p><div className="mt-4"><ProfileImageUpload kind="host-shop" currentUrl={shops?.[0]?.image_url} /></div></section>}
      <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-950">Your Registered Apprenticeship Program</h2>
        <p className="mt-2 text-sm leading-6 text-blue-900">Your shop is the apprentice’s worksite and training environment. You may operate your business in the way that fits your shop, but the apprenticeship must follow the registered program standards, the approved work process/competencies, required supervision, accurate OJT/RTI records, wage progression, and applicable federal and state law.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-lg bg-white p-4"><b>Train</b><p className="mt-1 text-sm text-slate-600">Provide supervised, hands-on work tied to the registered competencies.</p></div><div className="rounded-lg bg-white p-4"><b>Document</b><p className="mt-1 text-sm text-slate-600">Keep accurate hours, attendance, services, progress, and wage records.</p></div><div className="rounded-lg bg-white p-4"><b>Pay lawfully</b><p className="mt-1 text-sm text-slate-600">Elevate’s program expectation is at least $10/hour or an approved commission structure. Commission does not waive wage law: total compensation must satisfy the applicable minimum wage/overtime rules and the registered progressive wage schedule. Pay the higher amount when another law or agreement requires more.</p></div></div>
        <div className="mt-4 flex flex-wrap gap-3"><Link href="/shop/orientation" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">How to run the program</Link><Link href="/shop/syllabus" className="rounded-lg border border-blue-700 bg-white px-4 py-2 text-sm font-semibold text-blue-700">Training standards</Link><Link href="/shop/onboarding" className="rounded-lg border border-blue-700 bg-white px-4 py-2 text-sm font-semibold text-blue-700">Complete required actions</Link></div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-5"><div className="text-sm text-slate-500">Host shops</div><div className="text-3xl font-bold">{shops?.length ?? 0}</div></div>
        <div className="rounded-xl border bg-white p-5"><div className="text-sm text-slate-500">Assigned apprentices</div><div className="text-3xl font-bold">{assigned?.length ?? 0}</div></div>
        <Link href="/shop/orientation" data-tour="orientation" className="rounded-xl border-2 border-blue-600 bg-blue-50 p-5 hover:bg-blue-100"><div className="font-semibold text-blue-950">Required orientation</div><div className="mt-1 text-sm text-blue-900">Step-by-step guide to running the apprenticeship, documentation, supervision and weekly expectations.</div></Link>
        <Link href="/shop/syllabus" data-tour="syllabus" className="rounded-xl border bg-white p-5 hover:border-blue-500"><div className="font-semibold">Program syllabus</div><div className="mt-1 text-sm text-slate-600">Appendix A competencies, RTI and practical requirements</div></Link>
      </section>

      <section className="rounded-xl border bg-white" data-tour="apprentices">
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
