import { createAdminClient } from '@/lib/supabase/admin';
import { generateLicenseKey, hashLicenseKey } from '@/lib/store/license';

export async function fulfillCommerceInvoice(invoiceId:string) {
  const s=createAdminClient();
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
  if(p.product_id && i.customer_email) {
    const {data:product}=await s.from('products').select('*').eq('id',p.product_id).maybeSingle();
    if(product){
      await s.from('purchases').insert({email:i.customer_email,product_id:p.product_id,repo:product.repo||null});
      const key=generateLicenseKey();
      await s.from('licenses').insert({email:i.customer_email,product_id:p.product_id,license_key:hashLicenseKey(key)});
      try{
        await fetch((process.env.NEXT_PUBLIC_SITE_URL||'https://www.elevateforhumanity.org')+'/api/email/send',{
          method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
            to:i.customer_email,subject:'Your '+(product.title||product.name)+' License Key',template:'license-delivery',
            data:{productName:product.title||product.name,licenseKey:key,repo:product.repo,downloadUrl:product.download_url||null}
          })
        });
      }catch{}
    }
  }
  if(i.fulfillment_type==='donation') {
    await s.from('donations').insert({email:i.customer_email,amount:Number(i.total_cents||0)/100,status:'completed',created_at:now}).catch(()=>{});
  }
  return true;
}
