import { createClient } from '@/lib/supabase/server';
import { NextRequest,NextResponse } from 'next/server';
export async function POST(request:NextRequest){
 const s=await createClient(); const {data:{user}}=await s.auth.getUser(); if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const {program_id,license_type,lms_model}=await request.json(); if(!program_id||!license_type||!lms_model)return NextResponse.json({error:'Required fields missing'},{status:400});
 const pricing:Record<string,number>={external:0,internal:9900,scorm_only:14900,hybrid:19900,unlimited:49900}; const amount=pricing[lms_model]||0;
 const {data:p}=await s.from('programs').select('title,slug').eq('id',program_id).single(); if(!p)return NextResponse.json({error:'Program not found'},{status:404});
 const key=(amount===0?'FREE-':'PEND-')+Date.now();
 const {data:license,error}=await s.from('program_licenses').insert({program_id,license_holder_id:user.id,license_key:key,license_type,lms_model,can_create_courses:['internal','hybrid','unlimited'].includes(lms_model),can_upload_scorm:['scorm_only','hybrid','unlimited'].includes(lms_model),max_enrollments:lms_model==='unlimited'?null:lms_model==='hybrid'?100:50,status:amount===0?'active':'pending',metadata:{provider:'quickbooks_paypal'}}).select().single();
 if(error)return NextResponse.json({error:error.message},{status:500}); if(amount===0)return NextResponse.json({success:true,license});
 await s.from('payment_records').insert({user_id:user.id,amount:amount/100,currency:'usd',status:'pending',description:'License purchase: '+p.title,metadata:{license_id:license.id,program_id,license_type,lms_model,provider:'quickbooks_paypal'}});
 const q=new URLSearchParams({name:p.title+' - '+lms_model+' license',program:p.slug||program_id,amount:String(amount/100),licenseId:license.id});
 return NextResponse.json({success:true,provider:'quickbooks_paypal',url:'/checkout/payment?'+q.toString(),license});
}
export async function GET(){return NextResponse.json({ok:true});}
