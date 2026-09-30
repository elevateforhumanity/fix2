import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { capturePayPalOrder } from '@/lib/commerce/paypal';
import { fulfillCommerceInvoice } from '@/lib/commerce/fulfillment';

export async function GET(req:NextRequest){
  const invoiceId=req.nextUrl.searchParams.get('invoiceId');
  const token=req.nextUrl.searchParams.get('token');
  if(!invoiceId||!token) return NextResponse.redirect(new URL('/checkout/payment?error=missing_reference',req.url));
  const s=await createClient();
  const {data:i}=await s.from('billing_invoices').select('*').eq('id',invoiceId).single();
  if(!i||i.provider_payment_id!==token) return NextResponse.redirect(new URL('/checkout/payment?error=invalid_reference',req.url));
  try{
    const result=await capturePayPalOrder(token);
    const capture=result?.purchase_units?.[0]?.payments?.captures?.[0];
    const paid=capture?.status==='COMPLETED'||result?.status==='COMPLETED';
    if(paid){
      await s.from('billing_invoices').update({status:'paid',paid_at:new Date().toISOString(),provider_payment_status:'COMPLETED',provider_payment_id:capture?.id||token}).eq('id',invoiceId);
      await fulfillCommerceInvoice(invoiceId);
      return NextResponse.redirect(new URL('/checkout/success?invoiceId='+invoiceId,req.url));
    }
    await s.from('billing_invoices').update({provider_payment_status:result?.status||'PENDING'}).eq('id',invoiceId);
    return NextResponse.redirect(new URL('/checkout/payment?invoiceId='+invoiceId+'&status=pending',req.url));
  }catch{
    return NextResponse.redirect(new URL('/checkout/payment?invoiceId='+invoiceId+'&error=capture_failed',req.url));
  }
}
