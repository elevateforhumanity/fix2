// app/api/cash-advances/applications/[id]/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = supabaseServer();
    const body = await request.json();
    const { approved_amount, notes } = body;

    // Update application status
    const { data, error } = await supabase
      .from('cash_advance_applications')
      .update({
        status: 'approved',
        approved_amount: approved_amount,
        approval_notes: notes,
        approved_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // TODO: Send approval email to applicant
    // TODO: Initiate fund transfer via EOS Financial

    return NextResponse.json({
      success: true,
      application: data,
      message: 'Application approved successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
