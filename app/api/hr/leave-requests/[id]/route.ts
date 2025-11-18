import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { status, rejection_reason } = body;

    if (!['approved', 'rejected', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get existing leave request
    const { data: existing, error: existingError } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('id', params.id)
      .single();

    if (existingError) throw existingError;
    if (!existing) {
      return NextResponse.json(
        { error: 'Leave request not found' },
        { status: 404 }
      );
    }

    // Update leave request
    const { data: updated, error: updateError } = await supabase
      .from('leave_requests')
      .update({
        status,
        reviewed_by: user?.id ?? null,
        reviewed_at: new Date().toISOString(),
        rejection_reason: status === 'rejected' ? rejection_reason : null,
      })
      .eq('id', params.id)
      .select('*')
      .single();

    if (updateError) throw updateError;

    // If approved, update leave balance
    if (status === 'approved') {
      const { error: balanceError } = await supabase.rpc(
        'apply_leave_request_to_balance',
        {
          p_employee_id: existing.employee_id,
          p_policy_id: existing.policy_id,
          p_year: new Date(existing.start_date).getFullYear(),
          p_hours: existing.total_hours,
        }
      );
      if (balanceError) {
        console.error('Error updating leave balance:', balanceError);
      }
    }

    return NextResponse.json({ leaveRequest: updated });
  } catch (error: any) {
    console.error('Error updating leave request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update leave request' },
      { status: 500 }
    );
  }
}
