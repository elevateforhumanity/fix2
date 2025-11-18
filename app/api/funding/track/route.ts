import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('funding_tracking')
    .insert({
      student_id: body.student_id,
      funding_source: body.funding_source, // WIOA, WRG, JRI
      program_id: body.program_id,
      amount: body.amount || 0,
      status: 'active',
      start_date: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, tracking: data });
}

export async function GET() {
  const supabase = await createServerSupabaseClient();
  
  const { data } = await supabase
    .from('funding_tracking')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  
  return NextResponse.json({
    funding_sources: ['WIOA', 'WRG', 'JRI'],
    total_tracked: data?.length || 0,
    records: data,
  });
}
