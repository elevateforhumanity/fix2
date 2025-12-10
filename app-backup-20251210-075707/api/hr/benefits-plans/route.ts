import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('benefits_plans')
      .select('*')
      .eq('is_active', true)
      .order('plan_name');

    if (error) throw error;

    return NextResponse.json({ plans: data });
  } catch (error: unknown) {
    logger.error('Error fetching benefits plans:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch benefits plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { plan_name, plan_type, carrier_name, plan_code, description } = body;

    if (!plan_name || !plan_type) {
      return NextResponse.json(
        { error: 'plan_name and plan_type are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('benefits_plans')
      .insert({
        plan_name,
        plan_type,
        carrier_name,
        plan_code,
        description,
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ plan: data }, { status: 201 });
  } catch (error: unknown) {
    logger.error('Error creating benefits plan:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create benefits plan' },
      { status: 500 }
    );
  }
}
