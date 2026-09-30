import { createAdminClient } from '@/lib/supabase/admin';
import { generateLicenseKey, hashLicenseKey } from '@/lib/store/license';
import { randomBytes } from 'node:crypto';

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
  if(i.fulfillment_type==='marketplace' && p.product_id && p.creator_id) {
    const {data:creator}=await s.from('marketplace_creators').select('revenue_split').eq('id',p.creator_id).maybeSingle();
    const split=creator?.revenue_split||0.7;
    const total=Number(i.total_cents||0);
    const creatorEarnings=Math.floor(total*split);
    const platformEarnings=total-creatorEarnings;
    const token=randomBytes(32).toString('hex');
    const expires=new Date(); expires.setDate(expires.getDate()+30);
    await s.from('marketplace_sales').insert({product_id:p.product_id,creator_id:p.creator_id,buyer_email:i.customer_email||'',amount_cents:total,creator_earnings_cents:creatorEarnings,platform_earnings_cents:platformEarnings,download_token:token,download_expires_at:expires.toISOString()});
  }
  if(i.fulfillment_type==='license' && p.organization_name) {
    const slug=String(p.organization_name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const {data:tenant}=await s.from('tenants').insert({name:p.organization_name,slug,status:'active'}).select().single();
    if(tenant){
      const validUntil=new Date(); validUntil.setFullYear(validUntil.getFullYear()+1);
      const tier=p.license_type==='enterprise'?'enterprise':p.license_type==='school'?'pro':'basic';
      await s.from('licenses').insert({tenant_id:tenant.id,tier,status:'active',valid_from:now,valid_until:validUntil.toISOString()});
    }
  }
  if(i.fulfillment_type==='donation') {
    await s.from('donations').insert({email:i.customer_email,amount:Number(i.total_cents||0)/100,status:'completed',created_at:now}).catch(()=>{});
  }
  return true;
}
