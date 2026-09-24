'use client';

import { useState } from 'react';

export default function SignoffForm({ apprenticeId, programId, competencyId }: { apprenticeId:string; programId:string; competencyId:string }) {
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  async function submit(formData:FormData){
    setSaving(true); setError('');
    const payload={
      apprenticeId, programId, competencyId,
      supervisorName:String(formData.get('supervisorName')||''),
      supervisorTitle:String(formData.get('supervisorTitle')||''),
      dateObserved:String(formData.get('dateObserved')||''),
      hoursLogged:Number(formData.get('hoursLogged')||0),
      notes:String(formData.get('notes')||'')
    };
    const res=await fetch('/api/shop/competency-signoff',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!res.ok){const j=await res.json().catch(()=>({error:'Unable to save sign-off'}));setError(j.error||'Unable to save sign-off');setSaving(false);return;}
    location.reload();
  }
  return <form action={submit} className="space-y-2 rounded-lg bg-slate-50 p-3">
    <input name="supervisorName" required placeholder="Supervisor name" className="w-full rounded border px-3 py-2 text-sm"/>
    <input name="supervisorTitle" required placeholder="Title / license role" className="w-full rounded border px-3 py-2 text-sm"/>
    <div className="grid grid-cols-2 gap-2"><input name="dateObserved" required type="date" className="rounded border px-3 py-2 text-sm"/><input name="hoursLogged" min="0" step="0.25" type="number" placeholder="Hours" className="rounded border px-3 py-2 text-sm"/></div>
    <textarea name="notes" placeholder="Observation / evidence notes" className="w-full rounded border px-3 py-2 text-sm"/>
    {error && <p className="text-xs text-red-700">{error}</p>}
    <button disabled={saving} className="w-full rounded bg-green-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving?'Saving…':'Verify competency'}</button>
  </form>;
}
