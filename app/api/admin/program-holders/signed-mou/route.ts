import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/auth';
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (req, { user }) => {
    const supabase = await createRouteHandlerClient({ cookies });
      const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return new Response('Filename required', { status: 400 });
    }

    // Download from storage
    const { data, error } = await supabase.storage
      .from('mous')
      .download(filename);

    if (error || !data) {
      console.error('Download error:', error);
      return new Response('File not found', { status: 404 });
    }

    // Return PDF
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

    },
    { roles: ['admin', 'super_admin'] }
);
