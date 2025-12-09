import { NextRequest, NextResponse } from 'next/server';
import { exportUserData, requestDataPortability } from '@/lib/gdpr';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { format = 'json' } = await request.json();
    const result = await requestDataPortability(user.id, format);

    if (!result.success) {
      return NextResponse.json({ error: (result as any).error || 'Export failed' }, { status: 500 });
    }

    return new NextResponse((result as any).data, {
      headers: {
        'Content-Type': (result as any).contentType,
        'Content-Disposition': `attachment; filename="${(result as any).filename}"`,
      },
    });
  } catch (error) {
    logger.error('Error exporting user data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
