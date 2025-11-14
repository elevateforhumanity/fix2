import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';

// GET /api/wioa/case-management/[id] - Get case by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createSupabaseClient();
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('case_management')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: error.message },
      },
      { status: 500 }
    );
  }
}

// PUT /api/wioa/case-management/[id] - Update case
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createSupabaseClient();
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from('case_management')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: error.message },
      },
      { status: 500 }
    );
  }
}
