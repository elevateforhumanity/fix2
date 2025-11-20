import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { threadId, body } = await request.json();

    if (!threadId || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: reply, error } = await supabase
      .from('discussion_replies')
      .insert({
        thread_id: threadId,
        author_id: user.id,
        body,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating reply:', error);
      return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
    }

    // Send email notification to thread author
    // TODO: Implement email notification

    return NextResponse.json({ reply }, { status: 201 });
  } catch (error) {
    console.error('Error in reply route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
