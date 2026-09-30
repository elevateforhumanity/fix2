import { NextRequest,NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getQuickBooksInvoice,verifyQuickBooksWebhook } from '@/lib/commerce/quickbooks';
import { fulfillCommerceInvoice } from '@/lib/commerce/fulfillment';

export async function POST(req:NextRequest){
  const raw=await req.text();
  if(!verifyQuickBooksWebhook(raw,req.headers.get('intuit-signature'))){
    return NextResponse.json({error:'Invalid signature'},{status:400});
  }
  let body:any;
  try{body=JSON.parse(raw);}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  const s=createAdminClient();
  const entities=(body?.eventNotifications||[]).flatMap((n:any)=>n?.dataChangeEvent?.entities||[]);
  for(const e of entities){
    if(e?.name!=='Invoice'||!e?.id) continue;
    const {data:row}=await s.from('billing_invoices').select('id,status').eq('provider','quickbooks').eq('provider_invoice_id',String(e.id)).maybeSingle();
    if(!row) continue;
    try{
      const invoice=await getQuickBooksInvoice(String(e.id));
      const paid=Number(invoice?.Balance||0)<=0&&Number(invoice?.TotalAmt||0)>0;
      await s.from('billing_invoices').update({
        invoice_number:invoice?.DocNumber||null,
        status:paid?'paid':'open',
        paid_at:paid?new Date().toISOString():null,
        provider_payload:{quickbooks_sync_status:'synced',quickbooks_balance:invoice?.Balance,quickbooks_total:invoice?.TotalAmt}
      }).eq('id',row.id);
      if(paid&&row.status!=='paid') await fulfillCommerceInvoice(row.id);
    }catch{}
  }
  return NextResponse.json({ok:true});
}
