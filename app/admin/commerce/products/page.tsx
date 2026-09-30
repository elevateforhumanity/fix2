import { createClient } from '@/lib/supabase/server';
export const dynamic='force-dynamic';
export default async function ProductsPage(){
 const s=await createClient();
 const {data}=await s.from('products').select('id,name,slug,price,currency,is_active,billing_type,provider_product_id,provider_price_id,stripe_product_id,stripe_price_id').order('name');
 return <main className="p-6"><h1 className="text-3xl font-bold mb-2">Products & Cart</h1><p className="text-slate-600 mb-6">Provider IDs drive the current catalog. Stripe IDs remain visible only as legacy migration references.</p><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Product</th><th className="p-2">Price</th><th className="p-2">Billing</th><th className="p-2">Status</th></tr></thead><tbody>{(data||[]).map((p:any)=><tr key={p.id} className="border-b"><td className="p-2"><div className="font-medium">{p.name}</div><div className="text-xs text-slate-500">{p.slug}</div></td><td className="p-2">${Number(p.price||0).toFixed(2)} {(p.currency||'usd').toUpperCase()}</td><td className="p-2">{p.billing_type||'one_time'}</td><td className="p-2">{p.is_active?'Active':'Inactive'}</td></tr>)}</tbody></table></div></main>
}
