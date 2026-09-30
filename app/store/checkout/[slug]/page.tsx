'use client';
import { useParams,useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDigitalProduct } from '@/lib/store/digital-products';
import { CommercePayButton } from '@/components/payments/CommercePayButton';

export default function CheckoutPage(){
 const params=useParams(); const router=useRouter(); const slug=params.slug as string; const product:any=getDigitalProduct(slug);
 if(!product){ if(typeof window!=='undefined') router.push('/store'); return null; }
 const amount=Number(product.price||0);
 return <div className="min-h-screen bg-slate-50 py-12"><div className="mx-auto max-w-3xl px-6">
  <Link href="/store" className="mb-6 inline-block text-sm text-slate-600">← Back to store</Link>
  <div className="rounded-xl bg-white p-8 shadow">
    <h1 className="mb-2 text-3xl font-bold">{product.name||product.title}</h1>
    <p className="mb-6 text-slate-600">{product.description}</p>
    <div className="mb-6 flex justify-between border-y py-4"><span>Total</span><strong>{amount.toFixed(2){'}'}</strong></div>
    <CommercePayButton amount={amount} name={product.name||product.title} reference={product.slug||slug} productId={product.id} fulfillmentType="digital_product">Continue to PayPal</CommercePayButton>
    <p className="mt-4 text-center text-xs text-slate-500">QuickBooks invoice and payment status will be available in your dashboard.</p>
  </div>
 </div></div>;
}
