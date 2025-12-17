import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';

export const GET = withAuth(
  // @ts-expect-error TS2345: Argument of type '(req: any, context: any, user: any) => Promise<NextResponse...
  async (req, context, user) => {
    try {
      const supabase = await createClient();

      // Note: Add authentication check here
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user || user.role !== 'admin') {
      //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      // }

      const { data, error } = await supabase
        .from('program_holder_acknowledgements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Supabase query error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch acknowledgements' },
          { status: 500 }
        );
      }

      return NextResponse.json({ acknowledgements: data || [] });
    } catch (err: unknown) {
      // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
      logger.error('API error:', err);
      return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
  },
  { roles: ['admin', 'super_admin'] }
);
