import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add proper admin role check
    const isAdmin =
      user.email?.includes('admin') || user.email?.includes('elevate');
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { creatorId, reason } = await req.json();

    // Delete the creator application (or mark as rejected)
    const { error } = await supabase
      .from('marketplace_creators')
      .delete()
      .eq('id', creatorId);

    if (error) throw error;

    // TODO: Send rejection email to applicant with reason

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
