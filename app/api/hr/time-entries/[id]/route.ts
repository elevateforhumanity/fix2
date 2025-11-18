import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { clock_in, clock_out, break_minutes, lunch_minutes, status, notes } =
      body;

    const update: any = {
      clock_in,
      clock_out,
      break_minutes,
      lunch_minutes,
      status,
      notes,
    };

    // recompute hours if both provided
    if (clock_in && clock_out) {
      const start = new Date(clock_in).getTime();
      const end = new Date(clock_out).getTime();
      const diffMs = end - start;
      const diffHours = diffMs / 1000 / 60 / 60;
      const regHours = Math.max(
        0,
        diffHours - (break_minutes || 0 + (lunch_minutes || 0)) / 60
      );
      update.regular_hours = regHours;
      update.total_hours = regHours;
    }

    const { data, error } = await supabase
      .from('time_entries')
      .update(update)
      .eq('id', params.id)
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ timeEntry: data });
  } catch (error: any) {
    console.error('Error updating time entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update time entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('time_entries')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ message: 'Time entry deleted' });
  } catch (error: any) {
    console.error('Error deleting time entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete time entry' },
      { status: 500 }
    );
  }
}
