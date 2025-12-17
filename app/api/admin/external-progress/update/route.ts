// app/api/admin/external-progress/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';

export const POST = withAuth(
  async (req: NextRequest, user) => {
    type Status = 'approved' | 'in_progress';
    try {
      const body = await req.json();
      const { id, status } = body as { id: string; status: Status };

      if (!id || !status) {
        return NextResponse.json(
          { error: 'id and status are required' },
          { status: 400 }
        );
      }

      if (status !== 'approved' && status !== 'in_progress') {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }

      // Build update object based on status
      if (status === 'approved') {
        const { error } = await (supabaseAdmin as any)
          .from('external_partner_progress')
          .update({
            status,
            approved_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) {
          logger.error('Error updating external progress', error);
          return NextResponse.json(
            { error: 'Failed to update status' },
            { status: 500 }
          );
        }
      } else {
        // status === "in_progress"
        const { error } = await (supabaseAdmin as any)
          .from('external_partner_progress')
          .update({
            status,
            proof_file_url: null,
            approved_at: null,
            approved_by: null,
          })
          .eq('id', id);

        if (error) {
          logger.error('Error updating external progress', error);
          return NextResponse.json(
            { error: 'Failed to update status' },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({ success: true });
    } catch (err: unknown) {
      // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'string'.
      logger.error(err);
      return NextResponse.json(
        // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
        { error: err?.message ?? 'Unexpected error' },
        { status: 500 }
      );
    }
  },
  { roles: ['admin', 'super_admin'] }
);
