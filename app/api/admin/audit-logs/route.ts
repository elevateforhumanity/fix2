import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs, getAuditLogStats, exportAuditLogs } from '@/lib/auditLog';
import { requireAdmin } from '@/lib/authGuards';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';

export const GET = withAuth(
  async (request: NextRequest, user) => {

  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const actorId = searchParams.get('actor_id');
    const targetType = searchParams.get('target_type');
    const targetId = searchParams.get('target_id');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit');
    const export_csv = searchParams.get('export');

    if (export_csv === 'true') {
      const result = await exportAuditLogs({ start_date: startDate || undefined, end_date: endDate || undefined });
      
      if (result.success === false) {
        return NextResponse.json(
          { error: ('error' in result ? result.error : 'Export failed') },
          { status: 500 }
        );
      }

      // Use 'in' operator to safely narrow the union
      return new NextResponse(
        'data' in result ? result.data : '',
        {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${'filename' in result ? result.filename : 'audit-logs.csv'}"`,
          },
        }
      );
    }

    const result = await getAuditLogs({
      action: action as any,
      actor_id: actorId || undefined,
      target_type: targetType || undefined,
      target_id: targetId || undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
      limit: limit ? parseInt(limit) : undefined,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Get stats
    const stats = await getAuditLogStats();

    return NextResponse.json({
      logs: result.logs,
      stats,
    });
  } catch (error) {
    logger.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }

  },
  { roles: ['admin', 'super_admin'] }
);
