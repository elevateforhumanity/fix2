export const runtime='nodejs';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) return NextResponse.json({error:'Unauthorized'},{status:401});
 const {enrollmentId,paymentMode}=await req.json();
 if(!enrollmentId||!paymentMode) return NextResponse.json({error:'Missing required fields'},{status:400});
 const {data:e}=await supabase.from('enrollments').select('*, course:courses(id,title,slug,partner_id,wholesale_cost_cents,retail_price_cents), student:profiles!enrollments_user_id_fkey(id,email,full_name)').eq('id',enrollmentId).single();
 if(!e) return NextResponse.json({error:'Enrollment not found'},{status:404});
 if(paymentMode==='scholarship'){
   await supabase.from('enrollments').update({status:'active',payment_status:'paid',payment_mode:'scholarship',paid_at:new Date().toISOString(),amount_paid_cents:0}).eq('id',enrollmentId);
   return NextResponse.json({ok:true,enrollmentId,paymentMode});
 }
 const amountCents=paymentMode==='sponsored'?(e.course?.wholesale_cost_cents||0):(e.course?.retail_price_cents||0);
 await supabase.from('enrollments').update({payment_status:'pending',payment_mode:paymentMode,billing_lock:true,billing_lock_at:new Date().toISOString()}).eq('id',enrollmentId);
 await supabase.from('payment_records').insert({user_id:e.user_id,amount:amountCents/100,currency:'usd',status:'pending',description:(paymentMode==='employer'?'Employer invoice: ':'Enrollment: ')+(e.course?.title||'Program'),metadata:{enrollment_id:enrollmentId,provider:'quickbooks_paypal',payment_mode:paymentMode}});
 const q=new URLSearchParams({name:e.course?.title||'Enrollment',program:e.course?.slug||enrollmentId,amount:String(amountCents/100),enrollmentId,paymentMode});
 return NextResponse.json({ok:true,provider:'quickbooks_paypal',checkoutUrl:'/checkout/payment?'+q.toString(),enrollmentId,paymentMode,amountCents});
}
