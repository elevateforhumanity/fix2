import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function EnrollmentCheckout({program,onSuccess,onCancel}){
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const isFree=!program.price||program.price===0;

  async function enroll(){
    setLoading(true);setError(null);
    try{
      if(isFree){
        const r=await fetch('/api/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({programId:program.id,paymentStatus:'free'})});
        const d=await r.json(); if(!r.ok) throw new Error(d.error||'Enrollment failed'); onSuccess?.(d.enrollmentId); return;
      }
      const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:program.price,programId:program.id,programName:program.title,programSlug:program.slug||program.id,fulfillmentType:'enrollment'})});
      const d=await r.json(); if(!r.ok||!d.url) throw new Error(d.error||'Unable to start payment'); window.location.href=d.url;
    }catch(e){setError(e?.message||'Enrollment failed');setLoading(false);}
  }

  return <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
    <h3 className="mb-2 text-2xl font-bold">{program.title}</h3><p className="mb-4 text-sm">{program.description}</p>
    <div className="mb-6 rounded-lg bg-blue-50 p-4"><div className="flex justify-between"><span>Total:</span><strong>{isFree?'FREE':'$'+program.price}</strong></div></div>
    <div className="mb-6 space-y-2 text-sm"><div className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-500"/>Course access and learner support</div><div className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-500"/>Dashboard payment tracking</div></div>
    {error&&<p className="mb-3 text-sm text-red-600">{error}</p>}
    <button onClick={enroll} disabled={loading} className="w-full rounded-lg bg-blue-700 px-6 py-3 font-bold text-white disabled:opacity-50">{loading?'Processing...':isFree?'Enroll':'Continue to PayPal'}</button>
    {onCancel&&<button onClick={onCancel} className="mt-3 w-full text-sm text-gray-600">Cancel</button>}
  </div>;
}
