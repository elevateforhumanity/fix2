export const runtime='nodejs';
import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request:NextRequest){
 try{
  const b=await request.json();
  const amount=Number(b.amount||b.total||b.price||(b.priceCents?b.priceCents/100:0));
  const name=String(b.programName||b.productName||b.productTitle||b.description||'Elevate purchase');
  const slug=String(b.programSlug||b.productId||b.programId||b.courseId||'purchase');
  const paymentType=String(b.paymentType||'full');
  if(amount<=0)return NextResponse.json({error:'Valid amount is required'},{status:400});
  const s=await createClient(); const {data:{user}}=await s.auth.getUser();
  let email=b.email||user?.email||null;
  if(user){const {data:p}=await s.from('profiles').select('email').eq('id',user.id).maybeSingle();email=p?.email||email;}
  const cents=Math.round((paymentType==='plan'?Math.ceil(amount/4):amount)*100);
  const key='commerce:'+slug+':'+(user?.id||email||'guest')+':'+Date.now();
  const {data:invoice,error}=await s.from('billing_invoices').insert({
    provider:'quickbooks',idempotency_key:key,customer_email:email,total_cents:cents,currency:'USD',status:'open',
    collection_provider:'paypal',provider_payment_status:'pending',
    provider_payload:{source:'commerce',name,slug,paymentType,quickbooks_sync_status:'pending'},
    fulfillment_type:b.fulfillmentType||'purchase',
    fulfillment_payload:{user_id:user?.id||null,program_id:b.programId||null,product_id:b.productId||null,course_id:b.courseId||null}
  }).select('id').single();
  if(error)throw error;
  const q=new URLSearchParams({invoiceId:invoice.id,name,program:slug,amount:String(cents/100),provider:'paypal'});
  return NextResponse.json({provider:'quickbooks_paypal',invoiceId:invoice.id,url:'/checkout/payment?'+q.toString(),amount:cents/100,paymentType});
 }catch(e:any){return NextResponse.json({error:e?.message||'Unable to start checkout'},{status:500});}
}
