// app/api/cash-advances/applications/[id]/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { logger } from '@/lib/logger';

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

    // Send approval email to applicant
    if (data.email) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: data.email,
            subject: 'Cash Advance Application Approved',
            template: 'cash-advance-approval',
            data: {
              name: data.full_name,
              amount: approved_amount,
              notes: notes,
            },
          }),
        });
      } catch (emailError) {
        logger.error('Failed to send approval email:', emailError);
      }
    }

    // Note: EOS Financial integration requires API credentials
    // Fund transfer will be initiated manually until API is configured

    return NextResponse.json({
      success: true,
      application: data,
      message: 'Application approved successfully',
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
