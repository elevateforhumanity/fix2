import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignoffForm from './signoff-form';

export const dynamic = 'force-dynamic';

export default async function ApprenticeProgress({ params }: { params: Promise<{ apprentice_id: string }> }) {
  const { apprentice_id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: shops } = await supabase.from('host_shops').select('id,name').eq('owner_id', user.id);
  const shopIds = (shops ?? []).map((s) => s.id);
  if (!shopIds.length) redirect('/shop/onboarding');

  const { data: assignment } = await supabase.from('host_shop_apprentices')
    .select('id,host_shop_id,apprentice_id,status,start_date')
    .eq('apprentice_id', apprentice_id).in('host_shop_id', shopIds).maybeSingle();
  if (!assignment) redirect('/shop/dashboard');

  const { data: apprentice } = await supabase.from('profiles').select('id,full_name,email').eq('id', apprentice_id).single();
  const { data: enrollment } = await supabase.from('enrollments').select('id,program_id,program_slug,status').eq('user_id', apprentice_id).order('created_at',{ascending:false}).limit(1).maybeSingle();
  const { data: standards } = await supabase.from('apprenticeship_standard_competencies').select('competency_key,source_label,category,description,display_order').like('standard_key','barber-%').order('display_order');
  const { data: signoffs } = await supabase.from('ojt_competency_signoffs').select('competency_id,status,date_verified,supervisor_name,hours_logged,notes').eq('student_id', apprentice_id);
  const signed = new Map((signoffs ?? []).map((s) => [s.competency_id,s]));
  const { data: services } = enrollment?.id ? await supabase.from('apprentice_service_logs').select('hours,total_services,services_performed,logged_at').eq('enrollment_id', enrollment.id) : { data: [] as any[] };
  const totalServices=(services ?? []).reduce((n,s)=>n+(s.total_services||0),0);
  const serviceHours=(services ?? []).reduce((n,s)=>n+(s.hours||0),0);

  return <main className="mx-auto max-w-6xl space-y-6 p-6">
    <header><p className="text-sm font-semibold uppercase text-blue-700">Host Shop · Apprentice Record</p><h1 className="text-3xl font-bold">{apprentice?.full_name || apprentice?.email || 'Apprentice'}</h1><p className="text-slate-600">The sign-offs below become part of the apprentice's progress record.</p></header>
    <section className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Competencies signed</div><div className="text-2xl font-bold">{signed.size}/{standards?.length ?? 0}</div></div>
      <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Services logged</div><div className="text-2xl font-bold">{totalServices}</div></div>
      <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Service hours</div><div className="text-2xl font-bold">{serviceHours}</div></div>
      <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Enrollment</div><div className="text-lg font-bold">{enrollment?.status || 'Not linked'}</div></div>
    </section>
    <section className="rounded-xl border bg-white">
      <div className="border-b p-5"><h2 className="text-xl font-bold">Appendix A competency sign-off</h2><p className="text-sm text-slate-600">Verify only work personally observed. Existing verified records are shown immediately.</p></div>
      <div className="divide-y">{(standards ?? []).map((s)=>{
        const v=signed.get(s.competency_key);
        return <article key={s.competency_key} className="grid gap-4 p-5 lg:grid-cols-[1fr_360px]">
          <div><div className="font-semibold">{s.source_label ? `${s.source_label}. ` : ''}{s.category}</div><p className="mt-1 text-sm text-slate-600">{s.description}</p>{v && <p className="mt-2 text-sm font-semibold text-green-700">Verified {v.date_verified || ''} by {v.supervisor_name || 'host-shop supervisor'}</p>}</div>
          {!v && enrollment?.program_id ? <SignoffForm apprenticeId={apprentice_id} programId={enrollment.program_id} competencyId={s.competency_key} /> : null}
        </article>
      })}</div>
    </section>
  </main>;
}
