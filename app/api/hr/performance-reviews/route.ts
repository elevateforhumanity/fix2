import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// GET /api/hr/performance-reviews?employee_id=
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const params = request.nextUrl.searchParams;
    const employeeId = params.get('employee_id');

    let query = supabase
      .from('performance_reviews')
      .select(
        `
        *,
        employee:employees(
          id,
          employee_number,
          profile:profiles(full_name, email)
        ),
        reviewer:profiles!reviewer_id(full_name, email)
      `
      )
      .order('review_period_end', { ascending: false });

    if (employeeId) query = query.eq('employee_id', employeeId);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ reviews: data });
  } catch (error: unknown) {
    logger.error('Error fetching performance reviews:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST /api/hr/performance-reviews
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      employee_id,
      reviewer_id,
      review_period_start,
      review_period_end,
      review_type,
      overall_rating,
      performance_rating,
      attendance_rating,
      teamwork_rating,
      communication_rating,
      strengths,
      areas_for_improvement,
      goals_achieved,
      goals_for_next_period,
      reviewer_comments,
    } = body;

    if (
      !employee_id ||
      !reviewer_id ||
      !review_period_start ||
      !review_period_end ||
      !review_type
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: employee_id, reviewer_id, review_period_start, review_period_end, review_type',
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('performance_reviews')
      .insert({
        employee_id,
        reviewer_id,
        review_period_start,
        review_period_end,
        review_type,
        overall_rating,
        performance_rating,
        attendance_rating,
        teamwork_rating,
        communication_rating,
        strengths,
        areas_for_improvement,
        goals_achieved,
        goals_for_next_period,
        reviewer_comments,
        status: 'submitted',
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ review: data }, { status: 201 });
  } catch (error: unknown) {
    logger.error('Error creating performance review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}
