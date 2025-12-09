import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/auth';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (req, context, user) => {

  const supabase = await createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  // Get path from query params
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');

  if (!path) {
    return new Response('Path required', { status: 400 });
  }

  // Download from storage
  const { data, error } = await supabase.storage
    .from('agreements')
    .download(path);

  if (error || !data) {
    console.error('Download error:', error);
    return new Response('File not found', { status: 404 });
  }

  // Return image
  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });

  },
  { roles: ['admin', 'super_admin'] }
);
