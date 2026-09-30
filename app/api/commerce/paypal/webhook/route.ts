import { NextRequest,NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyPayPalWebhook } from '@/lib/commerce/paypal';
import { fulfillCommerceInvoice } from '@/lib/commerce/fulfillment';

export async function POST(req:NextRequest){
  const raw=await req.text();
  let event:any;
  try{event=JSON.parse(raw);}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  const valid=await verifyPayPalWebhook(req.headers,event);
  if(!valid) return NextResponse.json({error:'Invalid signature'},{status:400});

  const s=createAdminClient();
  const type=event.event_type;
  const resource=event.resource||{};
  const invoiceId=resource?.custom_id||resource?.supplementary_data?.related_ids?.order_id||resource?.purchase_units?.[0]?.custom_id||null;
  if(type==='PAYMENT.CAPTURE.COMPLETED'&&invoiceId){
    const {data:i}=await s.from('billing_invoices').select('id,status').eq('id',invoiceId).maybeSingle();
    if(i&&i.status!=='paid'){
      await s.from('billing_invoices').update({
        status:'paid',paid_at:new Date().toISOString(),provider_payment_status:'COMPLETED',provider_payment_id:resource.id||null
      }).eq('id',invoiceId);
      await fulfillCommerceInvoice(invoiceId);
    }
  } else if((type==='PAYMENT.CAPTURE.DENIED'||type==='CHECKOUT.PAYMENT-APPROVAL.REVERSED')&&invoiceId){
    await s.from('billing_invoices').update({provider_payment_status:type,status:'open'}).eq('id',invoiceId);
  } else if(type==='PAYMENT.CAPTURE.REFUNDED'&&invoiceId){
    await s.from('billing_invoices').update({provider_payment_status:'REFUNDED',status:'refunded'}).eq('id',invoiceId);
  }
  return NextResponse.json({ok:true});
}
