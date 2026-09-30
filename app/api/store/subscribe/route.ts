import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createPayPalSubscription } from '@/lib/commerce/paypal';

export async function POST(req:Request){
  const b=await req.json();
  const priceId=b.priceId;
  const userId=b.userId;
  const email=b.userEmail;
  if(!priceId||!userId||!email) return NextResponse.json({error:'Missing subscription details'},{status:400});

  const s=createAdminClient();
  const {data:plan}=await s.from('store_subscription_pricing').select('*').eq('price_id',priceId).maybeSingle();
  if(!plan) return NextResponse.json({error:'Subscription plan not found'},{status:404});

  const amount=Number(plan.amount_dollars||Number(plan.amount_cents||0)/100);
  const cadence=String(plan.interval||'month').toLowerCase();
  const interval=cadence==='year'?'YEAR':cadence==='week'?'WEEK':cadence==='day'?'DAY':'MONTH';
  const key='store:'+userId+':'+String(priceId);

  try{
    const sub=await createPayPalSubscription({
      name:plan.product_name||'Elevate subscription',
      description:plan.description||undefined,
      amount,
      interval:interval as 'DAY'|'WEEK'|'MONTH'|'YEAR',
      customId:key
    });

    const {data:schedule}=await s.from('billing_schedules').insert({
      customer_external_key:userId,
      customer_name:b.userName||email,
      customer_email:email,
      canonical_product_key:String(plan.product_id),
      product_name:plan.product_name,
      product_description:plan.description,
      provider:'quickbooks',
      amount_cents:Math.round(amount*100),
      cadence,
      status:'pending',
      collection_mode:'automatic',
      collection_provider:'paypal',
      provider_product_id:sub.productId,
      provider_plan_id:sub.planId,
      provider_subscription_id:sub.subscriptionId,
      provider_status:sub.status,
      provider_approval_url:sub.url,
      fulfillment_type:'store_subscription',
      fulfillment_payload:{user_id:userId,store_product_id:plan.product_id,price_id:priceId}
    }).select().single();

    await s.from('store_subscriptions').insert({
      user_id:userId,
      store_product_id:plan.product_id,
      status:'pending',
      provider_subscription_id:sub.subscriptionId,
      provider_price_id:sub.planId,
      metadata:{billing_schedule_id:schedule?.id||null,collection_provider:'paypal'}
    });

    return NextResponse.json({provider:'paypal',subscriptionId:sub.subscriptionId,url:sub.url});
  }catch(e:any){
    return NextResponse.json({error:e?.message||'Unable to start subscription'},{status:502});
  }
}
