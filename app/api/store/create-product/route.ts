import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export async function POST(req:NextRequest){
 const {title,price,repo,description}=await req.json();
 if(!title||!price||!repo) return NextResponse.json({error:'Missing required fields'},{status:400});
 const s=await createClient();
 const slug=String(title).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const {data,error}=await s.from('products').insert({name:title,title,slug,description,price:Number(price),repo,provider_product_id:null,provider_price_id:null,is_active:true}).select().single();
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({ok:true,productId:data.id});
}
