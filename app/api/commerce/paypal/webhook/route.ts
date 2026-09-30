import { NextRequest,NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyPayPalWebhook } from '@/lib/commerce/paypal';
import { createQuickBooksInvoice,createQuickBooksPayment,getQuickBooksInvoice } from '@/lib/commerce/quickbooks';
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
    const {data:i}=await s.from('billing_invoices').select('*').eq('id',invoiceId).maybeSingle();
    if(i&&i.status!=='paid'){
      try{
        if(i.provider_invoice_id){
          const qbo=await getQuickBooksInvoice(String(i.provider_invoice_id));
          const customerId=qbo?.CustomerRef?.value;
          if(customerId) await createQuickBooksPayment({invoiceId:String(i.provider_invoice_id),customerId,amount:Number(i.total_cents||0)/100});
        }
      }catch{}
      await s.from('billing_invoices').update({
        status:'paid',paid_at:new Date().toISOString(),provider_payment_status:'COMPLETED',provider_payment_id:resource.id||i.provider_payment_id
      }).eq('id',invoiceId);
      await fulfillCommerceInvoice(invoiceId);
    }
  } else if((type==='PAYMENT.CAPTURE.DENIED'||type==='CHECKOUT.PAYMENT-APPROVAL.REVERSED')&&invoiceId){
    await s.from('billing_invoices').update({provider_payment_status:type,status:'open'}).eq('id',invoiceId);
  } else if(type==='PAYMENT.CAPTURE.REFUNDED'&&invoiceId){
    await s.from('billing_invoices').update({provider_payment_status:'REFUNDED',status:'refunded'}).eq('id',invoiceId);
  }

  if(type==='BILLING.SUBSCRIPTION.ACTIVATED'){
    const subId=resource.id;
    await s.from('billing_schedules').update({provider_status:'ACTIVE',status:'active',activated_at:new Date().toISOString(),last_provider_sync_at:new Date().toISOString()}).eq('provider_subscription_id',subId);
    await s.from('store_subscriptions').update({status:'active',current_period_start:new Date().toISOString()}).eq('provider_subscription_id',subId);
  }

  if(['BILLING.SUBSCRIPTION.CANCELLED','BILLING.SUBSCRIPTION.SUSPENDED','BILLING.SUBSCRIPTION.EXPIRED'].includes(type)){
    const subId=resource.id;
    const status=type.includes('CANCELLED')?'cancelled':type.includes('SUSPENDED')?'suspended':'expired';
    await s.from('billing_schedules').update({provider_status:status.toUpperCase(),status,last_provider_sync_at:new Date().toISOString()}).eq('provider_subscription_id',subId);
    await s.from('store_subscriptions').update({status,canceled_at:status==='cancelled'?new Date().toISOString():null}).eq('provider_subscription_id',subId);
  }

  if(type==='PAYMENT.SALE.COMPLETED'){
    const subId=resource.billing_agreement_id||resource.billing_agreement_id;
    if(subId){
      const {data:schedule}=await s.from('billing_schedules').select('*').eq('provider_subscription_id',subId).maybeSingle();
      if(schedule){
        const amount=Number(resource.amount?.total||schedule.amount_cents/100);
        try{
          const qbo=await createQuickBooksInvoice({
            email:schedule.customer_email,
            name:schedule.customer_name||undefined,
            description:schedule.product_name||'Subscription payment',
            amount
          });
          const customerId=qbo?.CustomerRef?.value;
          if(customerId) await createQuickBooksPayment({invoiceId:String(qbo.Id),customerId,amount});
          await s.from('billing_invoices').insert({
            provider:'quickbooks',
            provider_invoice_id:String(qbo.Id),
            invoice_number:qbo.DocNumber||null,
            idempotency_key:'paypal-sale:'+String(resource.id),
            customer_external_key:schedule.customer_external_key,
            customer_email:schedule.customer_email,
            total_cents:Math.round(amount*100),
            currency:String(resource.amount?.currency||'USD'),
            status:'paid',
            paid_at:new Date().toISOString(),
            billing_schedule_id:schedule.id,
            collection_provider:'paypal',
            provider_payment_id:String(resource.id),
            provider_payment_status:'COMPLETED',
            fulfillment_type:schedule.fulfillment_type,
            fulfillment_payload:schedule.fulfillment_payload
          });
        }catch{}
      }
    }
  }

  return NextResponse.json({ok:true});
}
