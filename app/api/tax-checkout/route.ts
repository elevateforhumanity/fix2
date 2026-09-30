import { NextResponse } from 'next/server';
export async function POST(req: Request) {
 let b:any={}; try{b=await req.json()}catch{}
 const q=new URLSearchParams({name:String(b.service_type||'Purchase'),program:String(b.intake_id||'purchase'),amount:String(Number(b.amount||0))});
 return NextResponse.json({provider:'commerce',url:'/checkout/payment?'+q.toString()});
}
