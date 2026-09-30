import { NextRequest,NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createPayPalOrder } from '@/lib/commerce/paypal';
import { createQuickBooksInvoice } from '@/lib/commerce/quickbooks';

export async function POST(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const s=createAdminClient();
  const {data:i}=await s.from('billing_invoices').select('*').eq('id',id).single();
  if(!i) return NextResponse.json({error:'Invoice not found'},{status:404});
  if(i.status==='paid') return NextResponse.json({error:'Invoice already paid'},{status:400});
  const amount=Number(i.total_cents||0)/100;
  const name=i.provider_payload?.name||i.invoice_number||'Elevate purchase';
  let qboId=i.provider_invoice_id;
  let paypalId=i.provider_payment_id;
  let url=i.payment_url;

  try{
    if(!qboId){
      const qbo=await createQuickBooksInvoice({email:i.customer_email,description:name,amount});
      qboId=String(qbo.Id);
      await s.from('billing_invoices').update({provider_invoice_id:qboId,invoice_number:qbo.DocNumber||null}).eq('id',id);
    }
    if(!paypalId||!url){
      const order=await createPayPalOrder({invoiceId:id,amount,currency:i.currency||'USD',description:name});
      paypalId=order.id; url=order.url;
      await s.from('billing_invoices').update({provider_payment_id:paypalId,payment_url:url,provider_payment_status:order.status||'CREATED'}).eq('id',id);
    }
    return NextResponse.json({url,paypalOrderId:paypalId,quickbooksInvoiceId:qboId});
  }catch(e:any){
    return NextResponse.json({error:e?.message||'Unable to prepare payment'},{status:502});
  }
}
