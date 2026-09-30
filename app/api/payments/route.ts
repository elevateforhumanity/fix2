export const runtime='nodejs';
import { NextRequest,NextResponse } from 'next/server';
import { apiAuthGuard } from '@/lib/authGuards';
import { createClient } from '@/lib/supabase/server';

export async function GET(request:NextRequest){
 const auth=await apiAuthGuard({requireAuth:true});
 if(!auth.authorized) return NextResponse.json({error:auth.error},{status:401});
 const s=await createClient();
 const limit=parseInt(new URL(request.url).searchParams.get('limit')||'50');
 const {data,error}=await s.from('billing_invoices').select('*').eq('customer_email',auth.user.email).order('created_at',{ascending:false}).limit(limit);
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({payments:data||[]});
}

export async function POST(request:NextRequest){
 const auth=await apiAuthGuard({requireAuth:true});
 if(!auth.authorized) return NextResponse.json({error:auth.error},{status:401});
 const body=await request.json();
 if(body.action==='history') return GET(request);
 if(body.action==='create-intent'||body.action==='create-subscription-intent'){
   const amount=Number(body.amount||body.subscriptionAmount||0);
   const name=String(body.courseName||body.planId||'Elevate purchase');
   const reference=String(body.courseId||body.planId||'purchase');
   const q=new URLSearchParams({name,program:reference,amount:String(amount)});
   return NextResponse.json({provider:'quickbooks_paypal',url:'/checkout/payment?'+q.toString()});
 }
 return NextResponse.json({error:'Unsupported payment action. Use commerce checkout.'},{status:400});
}
