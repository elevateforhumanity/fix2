import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: students, error } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('role', 'student')
      .limit(20)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching students:', error);
      return NextResponse.json({ students: [] });
    }

    return NextResponse.json({ students: students || [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ students: [] });
  }
}
