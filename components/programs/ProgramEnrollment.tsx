'use client';
import { useState } from 'react';

interface Program{id:string;name:string;price:number;isFree:boolean;requirements?:string[];duration?:string;description?:string;}
interface Props{program:Program;userId:string;onEnrollmentComplete:(enrollmentId:string)=>void;}
export default function ProgramEnrollment({program,userId,onEnrollmentComplete}:Props){
 const [plan,setPlan]=useState<'full'|'plan'>('full');const [loading,setLoading]=useState(false);const [error,setError]=useState('');const [meets,setMeets]=useState(false);
 async function enroll(){setLoading(true);setError('');try{
  if(program.requirements?.length&&!meets){throw new Error('Confirm the program requirements before continuing.');}
  if(program.isFree||program.price===0){const r=await fetch('/api/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({programId:program.id,userId,paymentStatus:'free'})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Enrollment failed');onEnrollmentComplete(d.enrollmentId);return;}
  const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:program.price,programName:program.name,programId:program.id,programSlug:program.id,paymentType:plan,fulfillmentType:'enrollment'})});const d=await r.json();if(!r.ok||!d.url)throw new Error(d.error||'Unable to start payment');window.location.href=d.url;
 }catch(e:any){setError(e?.message||'Enrollment failed');setLoading(false);}}
 return <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
  <h2 className="text-3xl font-bold">{program.name}</h2>{program.description&&<p className="mt-2 text-gray-600">{program.description}</p>}
  {program.requirements?.length?<div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4"><ul className="mb-3 list-disc pl-5">{program.requirements.map((r,i)=><li key={i}>{r}</li>)}</ul><label><input type="checkbox" checked={meets} onChange={e=>setMeets(e.target.checked)}/> I meet these requirements</label></div>:null}
  {!program.isFree&&program.price>0&&<div className="my-6 grid gap-3 sm:grid-cols-2"><button onClick={()=>setPlan('full')} className={'rounded-lg border p-4 '+(plan==='full'?'border-blue-600 bg-blue-50':'')}>Pay in full<br/><strong>${program.price.toLocaleString(){'}'}</strong></button><button onClick={()=>setPlan('plan')} className={'rounded-lg border p-4 '+(plan==='plan'?'border-blue-600 bg-blue-50':'')}>Payment plan<br/><strong>${Math.ceil(program.price/4).toLocaleString(){'}'} starting payment</strong></button></div>}
  {error&&<p className="mb-3 text-sm text-red-600">{error}</p>}
  <button onClick={enroll} disabled={loading} className="w-full rounded-lg bg-blue-700 px-6 py-3 font-bold text-white disabled:opacity-50">{loading?'Processing...':program.isFree?'Enroll':'Continue to PayPal'}</button>
 </div>;
}
