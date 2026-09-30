'use client';
import { useParams,useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { getProductBySlug } from '@/app/data/store-products';

export default function LicenseCheckoutPage(){
 const params=useParams(); const router=useRouter(); const product:any=getProductBySlug(params.slug as string);
 const [info,setInfo]=useState({organizationName:'',contactName:'',email:'',phone:''}); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
 if(!product){if(typeof window!=='undefined')router.push('/store/licenses');return null;}
 async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError('');try{
   const r=await fetch('/api/commerce/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
     amount:Number(product.price||0)/100,productName:product.name,productId:product.id,email:info.email,customerName:info.contactName,fulfillmentType:'license'
   })});
   const d=await r.json();if(!r.ok||!d.url)throw new Error(d.error||'Unable to start payment');window.location.href=d.url;
 }catch(e:any){setError(e?.message||'Unable to start payment');setLoading(false);}}
 return <div className="min-h-screen bg-slate-50 py-12"><div className="mx-auto max-w-3xl px-6">
  <Link href="/store/licenses" className="mb-6 inline-block text-sm text-slate-600">← Back to licenses</Link>
  <form onSubmit={submit} className="rounded-xl bg-white p-8 shadow"><h1 className="mb-2 text-3xl font-bold">{product.name}</h1><p className="mb-6 text-slate-600">{product.description}</p>
   <div className="grid gap-4 sm:grid-cols-2"><input required placeholder="Organization name" value={info.organizationName} onChange={e=>setInfo({...info,organizationName:e.target.value})} className="rounded border p-3"/><input required placeholder="Contact name" value={info.contactName} onChange={e=>setInfo({...info,contactName:e.target.value})} className="rounded border p-3"/><input required type="email" placeholder="Email" value={info.email} onChange={e=>setInfo({...info,email:e.target.value})} className="rounded border p-3"/><input placeholder="Phone" value={info.phone} onChange={e=>setInfo({...info,phone:e.target.value})} className="rounded border p-3"/></div>
   <div className="my-6 flex justify-between border-y py-4"><span>Total</span><strong>${(Number(product.price||0)/100).toLocaleString(){'}'}</strong></div>
   {error&&<p className="mb-3 text-sm text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-lg bg-green-700 px-6 py-4 font-bold text-white disabled:opacity-50">{loading?'Processing...':'Continue to PayPal'}</button>
   <p className="mt-3 text-center text-xs text-slate-500">QuickBooks invoice and payment progress are recorded automatically.</p>
  </form>
 </div></div>;
}
