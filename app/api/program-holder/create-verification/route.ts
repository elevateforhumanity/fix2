export const runtime='nodejs';
import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request:NextRequest){
  const {userId}=await request.json();
  if(!userId) return NextResponse.json({error:'userId required'},{status:400});
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user||user.id!==userId) return NextResponse.json({error:'Unauthorized'},{status:401});
  await s.from('program_holder_verification').insert({
    program_holder_id:userId,
    verification_type:'manual_document',
    status:'pending',
    created_at:new Date().toISOString()
  });
  await s.from('program_holders').update({verification_status:'pending'}).eq('user_id',userId);
  return NextResponse.json({url:'/program-holder/verify-identity?method=manual'});
}
