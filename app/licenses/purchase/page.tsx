'use client';
import { useEffect,useState } from 'react';

export default function PurchaseLicensePage(){
 const [programs,setPrograms]=useState<any[]>([]);const [selectedProgram,setSelectedProgram]=useState('');const [licenseType,setLicenseType]=useState('internal');const [loading,setLoading]=useState(false);const [error,setError]=useState('');
 const options=[['external','External LMS (Free)',0],['internal','Internal LMS',99],['scorm_only','SCORM Only',149],['hybrid','Hybrid',199],['unlimited','Unlimited',499]] as const;
 useEffect(()=>{fetch('/api/programs').then(r=>r.json()).then(d=>setPrograms(d.programs||[]));},[]);
 async function purchase(){if(!selectedProgram){setError('Please select a program');return;}setLoading(true);setError('');try{
  const r=await fetch('/api/licenses/purchase',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({program_id:selectedProgram,license_type:'multi',lms_model:licenseType})});
  const d=await r.json();if(!r.ok)throw new Error(d.error||'Purchase failed');if(d.url){window.location.href=d.url;return;}window.location.href='/licenses?success=true';
 }catch(e:any){setError(e?.message||'Purchase failed');setLoading(false);}}
 return <div className="min-h-screen bg-gray-50 py-12"><div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md"><h1 className="mb-6 text-3xl font-bold">Purchase Program License</h1>
  <label className="mb-2 block font-medium">Program</label><select value={selectedProgram} onChange={e=>setSelectedProgram(e.target.value)} className="mb-6 w-full rounded border p-3"><option value="">Select program</option>{programs.map(p=><option key={p.id} value={p.id}>{p.title||p.name}</option>)}</select>
  <div className="mb-6 grid gap-3">{options.map(([value,label,price])=><label key={value} className="flex items-center justify-between rounded border p-4"><span><input type="radio" name="license" checked={licenseType===value} onChange={()=>setLicenseType(value)}/> {label}</span><strong>{price===0?'Free':'$'+price+'/mo'}</strong></label>)}</div>
  {error&&<p className="mb-3 text-sm text-red-600">{error}</p>}<button onClick={purchase} disabled={loading} className="w-full rounded bg-blue-700 px-6 py-3 font-semibold text-white disabled:opacity-50">{loading?'Processing...':'Continue'}</button>
  <p className="mt-3 text-center text-xs text-gray-500">Paid licenses are invoiced in QuickBooks and collected through PayPal.</p>
 </div></div>;
}
