import { createClient } from '@/lib/supabase/server';
export async function POST(req:Request){
 const {productId,email}=await req.json();
 if(!productId) return Response.json({error:'Product ID required'},{status:400});
 const s=await createClient(); const {data:p}=await s.from('products').select('*').eq('id',productId).single();
 if(!p) return Response.json({error:'Product not found'},{status:404});
 const q=new URLSearchParams({name:p.title||p.name,program:p.slug||p.id,amount:String(Number(p.price||0)),productId:p.id,fulfillmentType:'digital_product'});
 if(email) q.set('email',email);
 return Response.json({provider:'commerce',url:'/checkout/payment?'+q.toString()});
}
