export const runtime='nodejs';
import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req:NextRequest){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user) return NextResponse.json({error:'Unauthorized'},{status:401});
  const product=await req.json();
  const {data,error}=await s.from('store_products').upsert({
    title:product.title,
    description:product.description,
    features:product.features,
    pricing:product.pricing,
    demo_enabled:product.demo?.enabled||false,
    demo_url:product.demo?.url||null,
    published:true,
    updated_at:new Date().toISOString()
  }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({success:true,url:'/store/codebase-clone',productId:data.id});
}
