import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      apprentice_id,
      funding_source,
      ita_number,
      approved_amount,
      status,
      case_manager,
      workone_region,
      approval_date,
    } = body;

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('funding_cases')
      .upsert(
        {
          apprentice_id,
          funding_source,
          ita_number,
          approved_amount,
          status,
          case_manager,
          workone_region,
          approval_date,
        },
        { onConflict: 'apprentice_id,funding_source' }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, funding: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('funding_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ funding_cases: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
