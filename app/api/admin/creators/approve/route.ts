import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { logAuditEvent, AuditActions, getRequestMetadata } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin =
      user.email?.includes('admin') || user.email?.includes('elevate');
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { creatorId } = await req.json();
    const { ipAddress } = getRequestMetadata(req);

    const { error } = await supabase
      .from('marketplace_creators')
      .update({ status: 'approved' })
      .eq('id', creatorId);

    if (error) throw error;

    // Audit log
    await logAuditEvent({
      userId: user.id,
      action: AuditActions.MARKETPLACE_CREATOR_APPROVED,
      resourceType: 'marketplace_creator',
      resourceId: creatorId,
      ipAddress,
    });

    // TODO: Send approval email to creator

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
