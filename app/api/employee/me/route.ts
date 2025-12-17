// app/api/employee/me/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get employee record for current user
    const { data: employee, error } = await supabase
      .from('employees')
      .select(
        `
        *,
        profile:profiles(*),
        department:departments(*),
        position:positions(*)
      `
      )
      .eq('profile_id', user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: toErrorMessage(error) },
        { status: 404 }
      );
    }

    return NextResponse.json({ employee });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('Error fetching employee:', error);
    return NextResponse.json(
      { error: toErrorMessage(error) || 'Failed to fetch employee data' },
      { status: 500 }
    );
  }
}
