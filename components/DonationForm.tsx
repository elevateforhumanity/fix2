'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const DONATION_AMOUNTS=[25,50,100,250,500,1000];

export default function DonationForm(){
  const [selectedAmount,setSelectedAmount]=useState<number|null>(100);
  const [customAmount,setCustomAmount]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  async function donate(){
    const amount=customAmount?parseFloat(customAmount):(selectedAmount||0);
    if(!amount||amount<1){setError('Please enter a valid donation amount');return;}
    setLoading(true);setError('');
    try{
      const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        amount,productName:'Elevate for Humanity Donation',productId:'donation',fulfillmentType:'donation'
      })});
      const data=await r.json();
      if(!r.ok||!data.url) throw new Error(data.error||'Unable to start donation');
      window.location.href=data.url;
    }catch(e:any){setError(e?.message||'Unable to process donation');setLoading(false);}
  }

  return <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
    <h3 className="mb-6 text-2xl font-bold text-slate-900">Choose Your Donation Amount</h3>
    <div className="mb-6 grid grid-cols-3 gap-4">{DONATION_AMOUNTS.map(amount=><button key={amount} onClick={()=>{setSelectedAmount(amount);setCustomAmount('')}} className={'rounded-lg px-6 py-4 text-lg font-semibold '+(selectedAmount===amount&&!customAmount?'bg-orange-600 text-white':'bg-slate-100 text-slate-700')}>{amount{'}'}</button>)}</div>
    <div className="mb-6"><label className="mb-2 block text-sm font-semibold">Or enter a custom amount:</label><input type="number" min="1" step="1" value={customAmount} onChange={e=>{setCustomAmount(e.target.value);setSelectedAmount(null)}} className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-lg"/></div>
    {error&&<div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
    <button onClick={donate} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-4 text-lg font-bold text-white disabled:opacity-50">{loading?<><Loader2 className="h-5 w-5 animate-spin"/>Processing...</>:<>Donate {customAmount||selectedAmount||0{'}'}</>}</button>
    <p className="mt-4 text-center text-xs text-slate-500">Secure PayPal collection with QuickBooks accounting.</p>
  </div>;
}
