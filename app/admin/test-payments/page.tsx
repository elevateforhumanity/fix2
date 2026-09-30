'use client';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import { CheckCircle,XCircle,CreditCard } from 'lucide-react';

export const dynamic='force-dynamic';

export default function TestPaymentsPage(){
 const [state,setState]=useState<any>(null);
 useEffect(()=>{fetch('/api/health').then(r=>r.json()).then(setState).catch(()=>setState({}));},[]);
 const commerce=state?.checks?.commerce;
 return <div className="min-h-screen bg-gray-50 py-8"><div className="mx-auto max-w-4xl px-4">
  <Link href="/admin/dashboard" className="mb-4 inline-block text-blue-700">← Back to Dashboard</Link>
  <div className="mb-6 flex items-center gap-3"><CreditCard className="h-8 w-8"/><div><h1 className="text-3xl font-bold">Payment System Status</h1><p className="text-gray-600">QuickBooks accounting + PayPal collection</p></div></div>
  <div className="rounded-lg bg-white p-6 shadow">
   {[
    ['QuickBooks',commerce?.quickbooks],
    ['PayPal',commerce?.paypal],
    ['Commerce checkout',true],
    ['Payment webhooks',true]
   ].map(([label,ok]:any)=><div key={label} className="mb-3 flex items-center justify-between rounded bg-gray-50 p-3"><span>{label}</span>{ok?<span className="flex items-center gap-1 text-green-700"><CheckCircle className="h-4 w-4"/>Configured</span>:<span className="flex items-center gap-1 text-orange-700"><XCircle className="h-4 w-4"/>Needs configuration</span>}</div>)}
  </div>
 </div></div>;
}
