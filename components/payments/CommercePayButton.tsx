'use client';
import { useState } from 'react';

export function CommercePayButton(props:{
  amount:number;
  name:string;
  reference:string;
  paymentType?:'full'|'plan';
  programId?:string;
  productId?:string;
  courseId?:string;
  enrollmentId?:string;
  licenseId?:string;
  fulfillmentType?:string;
  className?:string;
  children?:React.ReactNode;
}) {
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  async function pay(){
    setLoading(true); setError('');
    try{
      const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        amount:props.amount,
        programName:props.name,
        programSlug:props.reference,
        paymentType:props.paymentType||'full',
        programId:props.programId,
        productId:props.productId,
        courseId:props.courseId,
        enrollmentId:props.enrollmentId,
        licenseId:props.licenseId,
        fulfillmentType:props.fulfillmentType
      })});
      const data=await r.json();
      if(!r.ok||!data.url) throw new Error(data.error||'Unable to start payment');
      window.location.href=data.url;
    }catch(e:any){setError(e?.message||'Unable to start payment');setLoading(false);}
  }
  return <div>
    <button onClick={pay} disabled={loading} className={props.className||'w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white disabled:opacity-50'}>
      {loading?'Processing...':(props.children||'Continue to payment')}
    </button>
    {error&&<p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>;
}
