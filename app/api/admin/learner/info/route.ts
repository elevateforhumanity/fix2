import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { data: prof } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (prof?.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  const url = new URL(req.url);
  const user_id = url.searchParams.get('user_id');

  if (!user_id) {
    return new Response('Missing user_id', { status: 400 });
  }

  // Get user info from auth.users
  const { data: userData, error } = await supabase
    .from('auth.users')
    .select('id, email')
    .eq('id', user_id)
    .maybeSingle();

  if (error) return new Response(error.message, { status: 500 });
  if (!userData) return new Response('User not found', { status: 404 });

  return Response.json({
    id: userData.id,
    email: userData.email
  });
}
