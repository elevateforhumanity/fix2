import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    // Try to insert test data
    const { data, error } = await supabase
      .from('applications')
      .insert({
        first_name: body.firstName || 'Test',
        last_name: body.lastName || 'User',
        phone: body.phone || '3175551234',
        email: body.email || 'test@example.com',
        program_id: body.program || 'test-program',
        notes: 'Test insert from diagnostic endpoint',
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          full: error,
        },
      });
    }

    // Delete the test record
    await supabase.from('applications').delete().eq('id', data.id);

    return NextResponse.json({
      success: true,
      message: 'Insert test successful (record deleted)',
      insertedId: data.id,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
}
