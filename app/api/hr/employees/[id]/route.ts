import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// GET /api/hr/employees/[id] - Get single employee
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data: employee, error } = await supabase
      .from('employees')
      .select(
        `
        *,
        profile:profiles(*),
        department:departments(*),
        position:positions(*),
        manager:employees!manager_id(
          id,
          employee_number,
          profile:profiles(full_name, email)
        ),
        direct_reports:employees!manager_id(
          id,
          employee_number,
          profile:profiles(full_name, email),
          position:positions(title)
        ),
        leave_balances(
          *,
          policy:leave_policies(*)
        ),
        salary_history(
          *,
          approved_by_profile:profiles!approved_by(full_name)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ employee });
  } catch (error: unknown) {
    logger.error('Error fetching employee:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch employee' },
      { status: 500 }
    );
  }
}

// PATCH /api/hr/employees/[id] - Update employee
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    // Don't allow updating certain fields directly
    const {
      id: bodyId,
      profile_id,
      employee_number,
      created_at,
      ...updateFields
    } = body;

    const { data: employee, error } = await supabase
      .from('employees')
      .update(updateFields)
      .eq('id', id)
      .select(
        `
        *,
        profile:profiles(*),
        department:departments(*),
        position:positions(*)
      `
      )
      .single();

    if (error) throw error;

    return NextResponse.json({ employee });
  } catch (error: unknown) {
    logger.error('Error updating employee:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update employee' },
      { status: 500 }
    );
  }
}

// DELETE /api/hr/employees/[id] - Soft delete (terminate) employee
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const terminationDate =
      searchParams.get('termination_date') ||
      new Date().toISOString().split('T')[0];

    const { data: employee, error } = await supabase
      .from('employees')
      .update({
        employment_status: 'terminated',
        termination_date: terminationDate,
        is_active: false,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Terminate active benefits
    await supabase
      .from('benefits_enrollments')
      .update({
        status: 'terminated',
        termination_date: terminationDate,
      })
      .eq('employee_id', id)
      .eq('status', 'active');

    return NextResponse.json({
      message: 'Employee terminated successfully',
      employee,
    });
  } catch (error: unknown) {
    logger.error('Error terminating employee:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to terminate employee' },
      { status: 500 }
    );
  }
}
