export const runtime='nodejs';
import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';

export async function POST(request:Request){
  const auth=request.headers.get('x-internal-token');
  if(auth!==process.env.INTERNAL_CRON_TOKEN) return NextResponse.json({error:'Unauthorized'},{status:401});
  const s=createSupabaseClient();
  const {count,error}=await s.from('tenant_usage').select('*',{count:'exact',head:true});
  if(error) return NextResponse.json({error:'Failed to read usage'},{status:500});
  return NextResponse.json({reported:0,tracked:count||0,provider:'internal_quickbooks'});
}
