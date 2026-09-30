import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  let b:any={}; try { b=await req.json(); } catch {}
  const name=String(b.productTitle||b.productName||b.programName||b.description||'Purchase');
  const program=String(b.productId||b.programId||b.programSlug||b.courseId||'purchase');
  const amount=Number(b.amount||b.total||b.price||0);
  const q=new URLSearchParams({name,program,amount:String(amount)});
  return NextResponse.json({provider:'commerce',url:'/checkout/payment?'+q.toString()});
}
