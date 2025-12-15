import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Update onboarding record
    const { error } = await supabase
      .from('student_onboarding')
      .update({ handbook_reviewed: true })
      .eq('student_id', userId);

    if (error) {
      // Error: $1
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Error: $1
    return NextResponse.json(
      { error: error.message || 'Failed to acknowledge handbook' },
      { status: 500 }
    );
  }
}
