import { NextResponse } from 'next/server';
export async function POST(req:Request){
  const b=await req.json();
  const name=String(b.productTitle||'Marketplace purchase');
  const productId=String(b.productId||'purchase');
  const creatorId=String(b.creatorId||'');
  const amount=Number(b.priceCents?b.priceCents/100:(b.amount||b.total||b.price||0));
  if(!productId||!creatorId||amount<=0) return NextResponse.json({error:'Missing marketplace purchase details'},{status:400});
  const q=new URLSearchParams({name,program:productId,amount:String(amount),productId,creatorId,fulfillmentType:'marketplace'});
  return NextResponse.json({provider:'commerce',url:'/checkout/payment?'+q.toString()});
}
