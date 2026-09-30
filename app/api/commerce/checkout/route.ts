export const runtime='nodejs';
import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createQuickBooksInvoice } from '@/lib/commerce/quickbooks';
import { createPayPalOrder } from '@/lib/commerce/paypal';

export async function POST(request:NextRequest){
  try{
    const b=await request.json();
    const rawAmount=Number(b.amount||b.total||b.price||(b.priceCents?b.priceCents/100:0));
    const name=String(b.programName||b.productName||b.productTitle||b.description||'Elevate purchase');
    const slug=String(b.programSlug||b.productId||b.programId||b.courseId||'purchase');
    const paymentType=String(b.paymentType||'full');
    if(rawAmount<=0) return NextResponse.json({error:'Valid amount is required'},{status:400});

    const s=await createClient();
    const {data:{user}}=await s.auth.getUser();
    let email=b.email||user?.email||null;
    let fullName=b.customerName||null;
    if(user){
      const {data:p}=await s.from('profiles').select('email,full_name').eq('id',user.id).maybeSingle();
      email=p?.email||email; fullName=p?.full_name||fullName;
    }
    if(!email) return NextResponse.json({error:'Customer email is required'},{status:400});

    const amount=paymentType==='plan'?Math.ceil(rawAmount/4):rawAmount;
    const cents=Math.round(amount*100);
    const key='commerce:'+slug+':'+(user?.id||email)+':'+Date.now();

    const {data:row,error}=await s.from('billing_invoices').insert({
      provider:'quickbooks',
      idempotency_key:key,
      customer_email:email,
      total_cents:cents,
      currency:'USD',
      status:'open',
      collection_provider:'paypal',
      provider_payment_status:'pending',
      provider_payload:{source:'commerce',name,slug,paymentType,quickbooks_sync_status:'pending'},
      fulfillment_type:b.fulfillmentType||'purchase',
      fulfillment_payload:{user_id:user?.id||null,program_id:b.programId||null,product_id:b.productId||null,course_id:b.courseId||null,license_id:b.licenseId||null,enrollment_id:b.enrollmentId||null,creator_id:b.creatorId||null,organization_name:b.organizationName||null,license_type:b.licenseType||null,contact_name:b.customerName||null}
    }).select('id').single();
    if(error) throw error;

    try{
      const qbo=await createQuickBooksInvoice({email,name:fullName||undefined,description:name,amount});
      const paypal=await createPayPalOrder({invoiceId:row.id,amount,currency:'USD',description:name});
      await s.from('billing_invoices').update({
        provider_invoice_id:String(qbo.Id),
        invoice_number:qbo.DocNumber||null,
        payment_url:paypal.url,
        provider_payment_id:paypal.id,
        provider_payment_status:paypal.status||'CREATED',
        provider_payload:{source:'commerce',name,slug,paymentType,quickbooks_sync_status:'synced',quickbooks_balance:qbo.Balance,quickbooks_total:qbo.TotalAmt}
      }).eq('id',row.id);
      return NextResponse.json({provider:'quickbooks_paypal',invoiceId:row.id,quickbooksInvoiceId:String(qbo.Id),paypalOrderId:paypal.id,url:paypal.url,amount,paymentType});
    }catch(providerError:any){
      await s.from('billing_invoices').update({
        provider_payment_status:'error',
        provider_payload:{source:'commerce',name,slug,paymentType,quickbooks_sync_status:'error',error:providerError?.message||'Provider setup failed'}
      }).eq('id',row.id);
      return NextResponse.json({error:providerError?.message||'Payment provider setup failed',invoiceId:row.id},{status:502});
    }
  }catch(e:any){
    return NextResponse.json({error:e?.message||'Unable to start checkout'},{status:500});
  }
}
