import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/hr/leave-requests?employee_id=&status=
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const params = request.nextUrl.searchParams;

    const employeeId = params.get('employee_id');
    const status = params.get('status');

    let query = supabase
      .from('leave_requests')
      .select(
        `
        *,
        employee:employees(
          id,
          employee_number,
          profile:profiles(full_name, email)
        ),
        policy:leave_policies(*)
      `
      )
      .order('created_at', { ascending: false });

    if (employeeId) query = query.eq('employee_id', employeeId);
    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ leaveRequests: data });
  } catch (error: any) {
    console.error('Error fetching leave requests:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch leave requests' },
      { status: 500 }
    );
  }
}

// POST /api/hr/leave-requests
// Body: { employee_id, policy_id, start_date, end_date, total_hours, reason }
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      employee_id,
      policy_id,
      start_date,
      end_date,
      total_hours,
      reason,
    } = body;

    if (
      !employee_id ||
      !policy_id ||
      !start_date ||
      !end_date ||
      !total_hours
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: employee_id, policy_id, start_date, end_date, total_hours',
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('leave_requests')
      .insert({
        employee_id,
        policy_id,
        start_date,
        end_date,
        total_hours,
        reason,
        status: 'pending',
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ leaveRequest: data }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating leave request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create leave request' },
      { status: 500 }
    );
  }
}
