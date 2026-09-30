import { createClient } from '@/lib/supabase/client';

export interface PaymentRequest { studentId:string; providerId:string; programId?:string; amount:number; currency?:string; successUrl:string; cancelUrl:string; }
export interface PaymentResult { success:boolean; checkoutUrl?:string; sessionId?:string; error?:string; }

export async function createPartnerPaymentSession(request:PaymentRequest):Promise<PaymentResult>{
 try{
  const s=createClient();
  const {data:provider}=await s.from('partner_lms_providers').select('*').eq('id',request.providerId).single();
  if(!provider) throw new Error('Provider not found');
  const {data:e,error}=await s.from('partner_lms_enrollments').insert({provider_id:request.providerId,student_id:request.studentId,program_id:request.programId,status:'payment_pending',enrolled_at:new Date().toISOString(),metadata:{payment_amount:request.amount,payment_currency:request.currency||'usd',provider:'quickbooks_paypal'}}).select().single();
  if(error) throw error;
  const q=new URLSearchParams({name:provider.provider_name+' Certification',program:request.programId||request.providerId,amount:String(request.amount),enrollmentId:e.id});
  return {success:true,checkoutUrl:'/checkout/payment?'+q.toString(),sessionId:e.id};
 }catch(error:any){return {success:false,error:error?.message||'Payment setup failed'};}
}
export async function handlePaymentSuccess(referenceId:string):Promise<void>{
 const s=createClient(); await s.from('partner_lms_enrollments').update({status:'active',payment_status:'paid'}).eq('id',referenceId);
}
export async function handlePaymentFailure(referenceId:string):Promise<void>{
 const s=createClient(); await s.from('partner_lms_enrollments').update({status:'payment_failed',payment_status:'failed'}).eq('id',referenceId);
}
export async function getProviderPricing(providerId:string){
 const s=createClient(); const {data:p}=await s.from('partner_lms_providers').select('requires_payment,payment_amount').eq('id',providerId).single();
 if(!p) throw new Error('Provider not found'); return {amount:p.payment_amount||0,currency:'usd',requiresPayment:p.requires_payment||false};
}
export async function hasStudentPaid(studentId:string,providerId:string){
 const s=createClient(); const {data}=await s.from('partner_lms_enrollments').select('payment_status').eq('student_id',studentId).eq('provider_id',providerId).eq('payment_status','paid'); return (data?.length||0)>0;
}
export async function createPaymentLink(providerId:string,amount:number){
 const q=new URLSearchParams({program:providerId,amount:String(amount)}); return {url:'/checkout/payment?'+q.toString(),id:'commerce:'+providerId};
}
