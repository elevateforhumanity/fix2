'use client';
import { useState } from 'react';

interface Props{programName:string;programSlug:string;price:number;duration:string;}
export default function ProgramPaymentOptions({programName,programSlug,price,duration}:Props){
 const [plan,setPlan]=useState<'full'|'plan'>('full'); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
 const amount=plan==='full'?price:Math.ceil(price/4);
 async function pay(){setLoading(true);setError('');try{
  const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({programName,programSlug,price,paymentType:plan,fulfillmentType:'program'})});
  const d=await r.json(); if(!r.ok||!d.url) throw new Error(d.error||'Unable to start payment'); window.location.href=d.url;
 }catch(e:any){setError(e?.message||'Unable to start payment');setLoading(false);}}
 return <div className="rounded-xl border-2 border-orange-600 bg-white p-8 shadow-xl">
  <h3 className="mb-2 text-center text-2xl font-bold">Self-Pay Options</h3><p className="mb-6 text-center text-gray-600">{duration}</p>
  <div className="mb-6 text-center text-5xl font-bold text-orange-600">${price.toLocaleString(){'}'}</div>
  <div className="mb-6 grid gap-3 sm:grid-cols-2">
   <button onClick={()=>setPlan('full')} className={'rounded-lg border-2 p-4 text-left '+(plan==='full'?'border-green-600 bg-green-50':'border-gray-300')}><strong>Pay in Full</strong><div>${price.toLocaleString(){'}'}</div></button>
   <button onClick={()=>setPlan('plan')} className={'rounded-lg border-2 p-4 text-left '+(plan==='plan'?'border-blue-600 bg-blue-50':'border-gray-300')}><strong>Payment Plan</strong><div>Starting at ${Math.ceil(price/4).toLocaleString(){'}'}</div></button>
  </div>
  {error&&<p className="mb-3 text-sm text-red-600">{error}</p>}
  <button onClick={pay} disabled={loading} className="w-full rounded-lg bg-blue-700 px-6 py-4 font-bold text-white disabled:opacity-50">{loading?'Processing...':`Continue to PayPal - $${amount.toLocaleString()}`}</button>
  <p className="mt-3 text-center text-xs text-gray-500">QuickBooks invoice and payment progress appear in your dashboard.</p>
 </div>;
}
