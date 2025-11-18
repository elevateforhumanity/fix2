// app/api/account/delete/route.ts
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/getSession';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  const session = await requireAuth();
  const email = session.user?.email;

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', email)
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  await supabase.from('account_deletion_requests').insert({
    user_id: user.id,
    email: user.email,
  });

  return NextResponse.json({
    ok: true,
    message:
      'Your account deletion request has been recorded. A data privacy officer will review and process it according to our policy.',
  });
}
