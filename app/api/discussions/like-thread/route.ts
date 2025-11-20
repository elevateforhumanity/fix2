import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { threadId } = await request.json();

    if (!threadId) {
      return NextResponse.json({ error: 'Missing threadId' }, { status: 400 });
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('discussion_likes')
      .select('id')
      .eq('thread_id', threadId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('discussion_likes')
        .delete()
        .eq('thread_id', threadId)
        .eq('user_id', user.id);

      return NextResponse.json({ liked: false });
    } else {
      // Like
      await supabase.from('discussion_likes').insert({
        thread_id: threadId,
        user_id: user.id,
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in like-thread route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
