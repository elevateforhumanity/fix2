import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function HostShopSyllabus() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: shop } = await supabase.from('host_shops').select('id').eq('owner_id', user.id).limit(1).maybeSingle();
  if (!shop) redirect('/shop/onboarding');

  const { data: standards } = await supabase
    .from('apprenticeship_standard_competencies')
    .select('competency_key,source_label,category,description,display_order')
    .like('standard_key', 'barber-%')
    .order('display_order');

  return <main className="mx-auto max-w-5xl space-y-6 p-6">
    <header><p className="text-sm font-semibold uppercase text-blue-700">Barber Registered Apprenticeship</p><h1 className="text-3xl font-bold">Host Shop Training Syllabus</h1><p className="mt-2 text-slate-600">This screen is generated from the apprenticeship standard stored in the production database so host-shop review and apprentice progress use the same competency source.</p></header>
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-bold">Program requirements</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div><div className="text-sm text-slate-500">Total hours</div><div className="text-2xl font-bold">1,500</div></div>
        <div><div className="text-sm text-slate-500">Related instruction</div><div className="text-2xl font-bold">225</div></div>
        <div><div className="text-sm text-slate-500">On-the-job training</div><div className="text-2xl font-bold">1,275</div></div>
        <div><div className="text-sm text-slate-500">Competencies</div><div className="text-2xl font-bold">{standards?.length ?? 0}</div></div>
      </div>
    </section>
    <section className="rounded-xl border bg-white">
      <div className="border-b p-5"><h2 className="text-xl font-bold">Appendix A / OJT competencies</h2></div>
      <div className="divide-y">{(standards ?? []).map((s) => <article key={s.competency_key} className="p-5"><div className="font-semibold">{s.source_label ? `${s.source_label}. ` : ''}{s.category}</div><p className="mt-1 text-sm text-slate-600">{s.description}</p></article>)}</div>
    </section>
  </main>;
}
