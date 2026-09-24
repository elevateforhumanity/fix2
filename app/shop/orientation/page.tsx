import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { BookOpen, CheckCircle2, ClipboardCheck, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import { BarberExperienceCarousel } from '@/components/programs/BarberExperienceCarousel';

export const dynamic='force-dynamic';

const steps=[
 ['1','Complete host-shop onboarding','Review sponsor expectations, submit required documents, identify the supervisor, and complete reporting readiness before training begins.','/shop/onboarding'],
 ['2','Review the registered training syllabus','Know what the apprentice is expected to learn. Use the Appendix A competency list as the training roadmap—not an informal list of shop tasks.','/shop/syllabus'],
 ['3','Confirm the apprentice assignment','Only supervise apprentices assigned to your shop in the dashboard. Review the apprentice record, start date, and current progress before directing work.','/shop/dashboard'],
 ['4','Train and observe work','Provide supervised hands-on experience. Give the apprentice opportunities to practice the registered competencies and practical services safely and professionally.','/shop/syllabus'],
 ['5','Document hours, attendance and services','Records must reflect work actually performed. Do not estimate, pre-sign, or certify hours/services you did not observe.','/shop/dashboard'],
 ['6','Verify competencies','Open the apprentice record and sign off a competency only after the apprentice demonstrates it. Your verification becomes visible in the apprentice progress dashboard.','/shop/dashboard'],
 ['7','Review progress every week','Compare practical work, competency sign-offs and related instruction. Address missing documentation or skill gaps before they accumulate.','/shop/dashboard'],
 ['8','Escalate changes to the sponsor','Report supervisor changes, leaves, wage changes, safety concerns, separation, or anything that may affect the apprenticeship record. Elevate remains the program sponsor and controls sponsor-level approval.','/shop/dashboard'],
];

export default async function HostShopOrientation(){
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect('/login');
 const {data:shop}=await supabase.from('host_shops').select('id,name').eq('owner_id',user.id).limit(1).maybeSingle(); if(!shop) redirect('/shop/onboarding');
 return <main className="mx-auto max-w-6xl space-y-8 p-6">
  <header className="relative min-h-[420px] overflow-hidden rounded-3xl bg-slate-950 text-white">
    <video autoPlay muted loop playsInline preload="metadata" poster="/images/barber-hero.jpg" className="absolute inset-0 h-full w-full object-cover">
      <source src="/videos/barber-hero-final.mp4" type="video/mp4" />
      <source src="/videos/barber-hero.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
    <div className="relative z-10 max-w-3xl p-8 md:p-12">
      <p className="text-sm font-semibold uppercase tracking-[.22em] text-orange-300">Required host-shop orientation</p>
      <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">How to Run the Apprenticeship at Your Shop</h1>
      <p className="mt-5 text-lg leading-8 text-slate-100">Your shop is where the apprentice turns instruction into demonstrated skill. This orientation shows you exactly how supervision, practical training, documentation, competency verification and sponsor oversight work together.</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"><span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">Supervised OJT</span><span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">Appendix A</span><span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">Weekly records</span><span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">Supervisor sign-off</span></div>
    </div>
  </header>
  <BarberExperienceCarousel />
  <section className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6"><h2 className="text-xl font-bold">Start here: understand the roles</h2><div className="mt-4 grid gap-4 md:grid-cols-3">
   <div className="rounded-lg bg-white p-4"><Users className="mb-2 h-6 w-6 text-blue-700"/><h3 className="font-bold">Host shop / supervisor</h3><p className="mt-1 text-sm text-slate-700">Provide supervised OJT, observe performance, maintain accurate shop records, document services/hours, coach the apprentice, and verify competencies actually demonstrated.</p></div>
   <div className="rounded-lg bg-white p-4"><ShieldCheck className="mb-2 h-6 w-6 text-blue-700"/><h3 className="font-bold">Elevate / sponsor</h3><p className="mt-1 text-sm text-slate-700">Maintains the registered program structure, sponsor oversight, records, standards, approvals, compliance review, and sponsor-level decisions. Host shops do not replace the sponsor.</p></div>
   <div className="rounded-lg bg-white p-4"><GraduationCap className="mb-2 h-6 w-6 text-blue-700"/><h3 className="font-bold">Apprentice</h3><p className="mt-1 text-sm text-slate-700">Completes assigned RTI and OJT, follows shop rules, performs required practical work, maintains accurate records, and monitors verified progress in the learner dashboard.</p></div>
  </div></section>
  <section className="overflow-hidden rounded-2xl border bg-white">
    <div className="grid lg:grid-cols-2">
      <div className="relative min-h-[320px] bg-[url('/images/barber-highlight-2.jpg')] bg-cover bg-center"><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/><div className="absolute bottom-6 left-6 right-6 text-white"><p className="text-sm font-bold uppercase tracking-wider text-orange-300">Observe before you verify</p><h2 className="mt-2 text-3xl font-black">A sign-off means the skill was demonstrated.</h2></div></div>
      <div className="p-7"><h2 className="text-2xl font-bold">What happens when you sign off?</h2><div className="mt-5 space-y-4 text-sm text-slate-700"><p><b>1. Apprentice performs the work.</b> The supervisor observes the practical skill in the shop.</p><p><b>2. Host shop verifies the competency.</b> You record the observation from the apprentice record.</p><p><b>3. Progress updates.</b> The verified competency appears in the apprentice's dashboard against the same registered standard.</p><p><b>4. Sponsor retains oversight.</b> Elevate reviews the apprenticeship record and handles sponsor-level corrections and compliance decisions.</p></div></div>
    </div>
  </section>
  <section><h2 className="text-2xl font-bold">Step-by-step operating workflow</h2><div className="mt-4 space-y-3">{steps.map(([n,t,d,h])=><div key={n} className="grid gap-4 rounded-xl border bg-white p-5 md:grid-cols-[48px_1fr_auto] md:items-center"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold text-white">{n}</div><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{d}</p></div><Link href={h} className="rounded-lg border border-blue-700 px-4 py-2 text-center text-sm font-semibold text-blue-700 hover:bg-blue-50">Open</Link></div>)}</div></section>
  <section className="grid gap-5 lg:grid-cols-2">
   <div className="rounded-xl border bg-white p-6"><ClipboardCheck className="mb-3 h-7 w-7 text-green-700"/><h2 className="text-xl font-bold">What is expected every week</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700"><li>Confirm attendance and actual OJT activity.</li><li>Make sure hours and services match work actually performed.</li><li>Review what the apprentice is learning in RTI and connect shop practice to those skills.</li><li>Coach deficiencies and document meaningful observations.</li><li>Sign off competencies only after direct observation and satisfactory performance.</li><li>Review the apprentice progress screen for missing or pending items.</li></ul></div>
   <div className="rounded-xl border bg-white p-6"><CheckCircle2 className="mb-3 h-7 w-7 text-green-700"/><h2 className="text-xl font-bold">Documentation rules</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700"><li>Never pre-fill future hours or services.</li><li>Never sign another supervisor's observation.</li><li>Use notes to explain unusual schedules, absences, remediation, or progress concerns.</li><li>Keep shop licensing and required documentation current.</li><li>Do not mark a competency complete because the apprentice merely watched it; verification means demonstrated performance.</li><li>Contact the sponsor when a record needs correction rather than creating a duplicate record.</li></ul></div>
  </section>
  <section className="rounded-xl border bg-white p-6"><BookOpen className="mb-3 h-7 w-7 text-blue-700"/><h2 className="text-xl font-bold">Dashboard map</h2><div className="mt-4 grid gap-3 md:grid-cols-2"><Link className="rounded-lg border p-4 hover:border-blue-500" href="/shop/dashboard"><b>Host Shop Dashboard</b><p className="text-sm text-slate-600">Your assigned apprentices and operational starting point.</p></Link><Link className="rounded-lg border p-4 hover:border-blue-500" href="/shop/syllabus"><b>Training Syllabus</b><p className="text-sm text-slate-600">The same registered competency source used for apprentice progress.</p></Link><Link className="rounded-lg border p-4 hover:border-blue-500" href="/shop/onboarding"><b>Onboarding & Documents</b><p className="text-sm text-slate-600">Required shop readiness, documents, handbook and reporting setup.</p></Link><Link className="rounded-lg border p-4 hover:border-blue-500" href="/employer/dashboard"><b>Employer Portal</b><p className="text-sm text-slate-600">Company-level tools separate from apprenticeship training records.</p></Link></div></section>
 </main>;
}
