import { createClient } from '@/lib/supabase/server';
export const dynamic='force-dynamic';
export default async function InvoicesPage(){
 const s=await createClient();
 const {data}=await s.from('billing_invoices').select('id,invoice_number,customer_email,total_cents,currency,status,due_at,provider,collection_provider,provider_payment_status').order('due_at',{ascending:false}).limit(500);
 return <main className="p-6"><h1 className="text-3xl font-bold mb-2">Invoices</h1><p className="text-slate-600 mb-6">QuickBooks invoice status with PayPal collection status when available.</p><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Invoice</th><th className="p-2">Customer</th><th className="p-2">Amount</th><th className="p-2">Due</th><th className="p-2">Status</th></tr></thead><tbody>{(data||[]).map((i:any)=><tr key={i.id} className="border-b"><td className="p-2">{i.invoice_number||'—'}</td><td className="p-2">{i.customer_email}</td><td className="p-2">${(Number(i.total_cents||0)/100).toFixed(2)}</td><td className="p-2">{i.due_at||'—'}</td><td className="p-2">{i.status}</td></tr>)}</tbody></table></div></main>
}
