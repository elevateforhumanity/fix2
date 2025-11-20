import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is instructor/admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['instructor', 'admin'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { threadId } = await request.json();

    if (!threadId) {
      return NextResponse.json({ error: 'Missing threadId' }, { status: 400 });
    }

    // Get current pin status
    const { data: thread } = await supabase
      .from('discussion_threads')
      .select('is_pinned')
      .eq('id', threadId)
      .single();

    // Toggle pin status
    const { error } = await supabase
      .from('discussion_threads')
      .update({ is_pinned: !thread?.is_pinned })
      .eq('id', threadId);

    if (error) {
      console.error('Error pinning thread:', error);
      return NextResponse.json({ error: 'Failed to pin thread' }, { status: 500 });
    }

    return NextResponse.json({ pinned: !thread?.is_pinned });
  } catch (error) {
    console.error('Error in pin route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
