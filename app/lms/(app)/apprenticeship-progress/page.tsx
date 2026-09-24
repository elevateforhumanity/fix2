import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic='force-dynamic';

export default async function ApprenticeshipProgressPage(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect('/login');
  const {data:enrollment}=await supabase.from('enrollments').select('id,program_id,program_slug,status').eq('user_id',user.id).order('created_at',{ascending:false}).limit(1).maybeSingle();
  const {data:standards}=await supabase.from('apprenticeship_standard_competencies').select('competency_key,source_label,category,description,display_order').like('standard_key','barber-%').order('display_order');
  const {data:signoffs}=await supabase.from('ojt_competency_signoffs').select('competency_id,status,date_verified,supervisor_name,hours_logged,notes').eq('student_id',user.id);
  const signed=new Map((signoffs??[]).map(s=>[s.competency_id,s]));
  const {data:services}=enrollment?.id?await supabase.from('apprentice_service_logs').select('hours,total_services,services_performed,logged_at').eq('enrollment_id',enrollment.id).order('logged_at',{ascending:false}):{data:[] as any[]};
  const totalServices=(services??[]).reduce((n,s)=>n+(s.total_services||0),0);
  const serviceHours=(services??[]).reduce((n,s)=>n+(s.hours||0),0);
  const pct=(standards?.length??0)>0?Math.round((signed.size/(standards?.length??1))*100):0;
  return <main className="mx-auto max-w-6xl space-y-6 p-6">
    <header><p className="text-sm font-semibold uppercase text-blue-700">Registered Apprenticeship</p><h1 className="text-3xl font-bold">My Apprenticeship Progress</h1><p className="mt-2 text-slate-600">Host-shop verification appears here as soon as your supervisor signs off a competency.</p></header>
    <section className="grid gap-4 md:grid-cols-4"><div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Verified competencies</div><div className="text-2xl font-bold">{signed.size}/{standards?.length??0}</div></div><div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Competency progress</div><div className="text-2xl font-bold">{pct}%</div></div><div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Services logged</div><div className="text-2xl font-bold">{totalServices}</div></div><div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Practical hours</div><div className="text-2xl font-bold">{serviceHours}</div></div></section>
    <section className="rounded-xl border bg-white"><div className="border-b p-5"><h2 className="text-xl font-bold">Appendix A competencies</h2></div><div className="divide-y">{(standards??[]).map(s=>{const v=signed.get(s.competency_key);return <article key={s.competency_key} className="p-5"><div className="flex items-start justify-between gap-4"><div><div className="font-semibold">{s.source_label?`${s.source_label}. `:''}{s.category}</div><p className="mt-1 text-sm text-slate-600">{s.description}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${v?'bg-green-100 text-green-800':'bg-slate-100 text-slate-600'}`}>{v?'Verified':'In progress'}</span></div>{v&&<p className="mt-2 text-sm text-green-700">Signed by {v.supervisor_name||'host-shop supervisor'} {v.date_verified?`on ${v.date_verified}`:''}</p>}</article>})}</div></section>
  </main>;
}
