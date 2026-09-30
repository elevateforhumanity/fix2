import { NextRequest,NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request:NextRequest){
  const {userId}=await request.json();
  if(!userId) return NextResponse.json({error:'Missing userId'},{status:400});
  const s=createAdminClient();
  const {data:sub}=await s.from('store_subscriptions').select('id,status,provider_subscription_id').eq('user_id',userId).in('status',['active','pending','suspended']).maybeSingle();
  if(!sub) return NextResponse.json({error:'No active billing account found'},{status:404});
  return NextResponse.json({url:'/store/subscriptions?manage='+sub.id});
}
