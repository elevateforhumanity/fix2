import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';

// POST /api/wioa/support-services/[id]/approve - Approve/deny support service
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createSupabaseClient();
  try {
    const { id } = await params;
    const body = await request.json();
    const { approved, approvedAmount, approvedBy, notes, denialReason } = body;

    const updateData = {
      status: approved ? 'approved' : 'denied',
      approved_amount: approvedAmount,
      approved_by: approvedBy,
      approval_date: new Date().toISOString(),
      approval_notes: notes,
      denial_reason: denialReason,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('support_services')
      .update(updateData)
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
