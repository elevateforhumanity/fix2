import { createClient } from '@/lib/supabase/server';

export async function fulfillCommerceInvoice(invoiceId:string) {
  const s=await createClient();
  const {data:i}=await s.from('billing_invoices').select('*').eq('id',invoiceId).single();
  if(!i) throw new Error('Invoice not found');
  const p=i.fulfillment_payload||{};
  const now=new Date().toISOString();

  if(p.enrollment_id) {
    await s.from('enrollments').update({payment_status:'paid',status:'active',paid_at:now,billing_lock:false}).eq('id',p.enrollment_id);
  }
  if(p.license_id) {
    await s.from('program_licenses').update({status:'active'}).eq('id',p.license_id);
  }
  if(p.user_id && p.course_id) {
    await s.from('enrollments').upsert({user_id:p.user_id,course_id:p.course_id,status:'active',enrolled_at:now});
  }
  return true;
}
