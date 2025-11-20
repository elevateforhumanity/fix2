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

    const { replyId } = await request.json();

    if (!replyId) {
      return NextResponse.json({ error: 'Missing replyId' }, { status: 400 });
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('reply_likes')
      .select('id')
      .eq('reply_id', replyId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('reply_likes')
        .delete()
        .eq('reply_id', replyId)
        .eq('user_id', user.id);

      return NextResponse.json({ liked: false });
    } else {
      // Like
      await supabase.from('reply_likes').insert({
        reply_id: replyId,
        user_id: user.id,
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in like-reply route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
