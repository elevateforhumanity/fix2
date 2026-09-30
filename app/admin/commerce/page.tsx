import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function CommerceAdminPage() {
  const supabase = await createClient();
  const [{ count: productCount }, { count: openInvoiceCount }, { count: paidInvoiceCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('billing_invoices').select('*', { count: 'exact', head: true }).in('status', ['open', 'past_due']),
    supabase.from('billing_invoices').select('*', { count: 'exact', head: true }).eq('status', 'paid'),
  ]);

  return <main className="p-6 space-y-6">
    <div>
      <h1 className="text-3xl font-bold">Commerce & Payments</h1>
      <p className="text-slate-600 mt-2">QuickBooks is the invoice system. PayPal is the online collection provider. Stripe IDs are legacy reconciliation data only and are not the checkout authority.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="border rounded-xl p-5"><div className="text-sm text-slate-500">Active products</div><div className="text-3xl font-bold">{productCount ?? 0}</div></div>
      <div className="border rounded-xl p-5"><div className="text-sm text-slate-500">Open invoices</div><div className="text-3xl font-bold">{openInvoiceCount ?? 0}</div></div>
      <div className="border rounded-xl p-5"><div className="text-sm text-slate-500">Paid invoices</div><div className="text-3xl font-bold">{paidInvoiceCount ?? 0}</div></div>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      <Link className="border rounded-xl p-5 hover:bg-slate-50" href="/admin/commerce/products"><h2 className="font-bold text-lg">Products & Shopping Cart</h2><p className="text-sm text-slate-600">Manage the catalog carried forward from the legacy product setup.</p></Link>
      <Link className="border rounded-xl p-5 hover:bg-slate-50" href="/admin/commerce/invoices"><h2 className="font-bold text-lg">Invoices</h2><p className="text-sm text-slate-600">Review QuickBooks-backed paid, open and past-due invoice records.</p></Link>
      <Link className="border rounded-xl p-5 hover:bg-slate-50" href="/store"><h2 className="font-bold text-lg">Public Store</h2><p className="text-sm text-slate-600">Open the live catalog and shopping cart.</p></Link>
    </div>
  </main>;
}
