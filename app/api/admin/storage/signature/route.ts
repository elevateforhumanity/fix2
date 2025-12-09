import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/auth';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (req, context) => {
    const { user } = context;
      const supabase = await createRouteHandlerClient({ cookies });
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
