'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PaymentPage(){
  const q=useSearchParams();
  const name=q.get('name')||'Elevate purchase';
  const program=q.get('program')||'purchase';
  const amount=Number(q.get('amount')||0);
  const invoiceId=q.get('invoiceId');
  const productId=q.get('productId');
  const creatorId=q.get('creatorId');
  const fulfillmentType=q.get('fulfillmentType')||'purchase';
  const organizationName=q.get('organizationName');
  const licenseType=q.get('licenseType');
  const email=q.get('email');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  async function continuePayment(){
    setLoading(true);setError('');
    try{
      if(invoiceId){
        const r=await fetch('/api/commerce/invoices/'+invoiceId+'/pay',{method:'POST'});
        const d=await r.json(); if(!r.ok||!d.url) throw new Error(d.error||'Unable to load payment');
        window.location.href=d.url; return;
      }
      const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        amount,programName:name,programSlug:program,productId,creatorId,fulfillmentType,organizationName,licenseType,email
      })});
      const d=await r.json(); if(!r.ok||!d.url) throw new Error(d.error||'Unable to start payment');
      window.location.href=d.url;
    }catch(e:any){setError(e?.message||'Unable to start payment');setLoading(false);}
  }

  return <main className="min-h-screen bg-slate-50 px-4 py-16">
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold">Secure Payment</h1>
      <p className="mt-2 text-slate-600">QuickBooks invoice + PayPal collection.</p>
      <div className="my-6 flex justify-between border-y py-4"><span>{name}</span><strong>{'$'}{amount.toFixed(2)}</strong></div>
      {error&&<p className="mb-3 text-sm text-red-600">{error}</p>}
      <button onClick={continuePayment} disabled={loading||amount<=0} className="w-full rounded-xl bg-blue-700 px-6 py-4 font-bold text-white disabled:opacity-50">{loading?'Opening PayPal...':'Continue to PayPal'}</button>
    </div>
  </main>;
}
