// app/api/privacy/delete/route.ts
// GDPR/CCPA: Right to be forgotten
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { logAuditEvent, AuditActions, getRequestMetadata } from '@/lib/audit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, reason } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Find user
  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Soft-delete pattern: anonymize personal identifiers, keep compliance data
  const anonymizedEmail = `deleted+${user.id}@example.local`;

  await supabase
    .from('profiles')
    .update({
      email: anonymizedEmail,
      full_name: 'Deleted User',
      phone: null,
      address: null,
      deleted_at: new Date().toISOString(),
      delete_reason: reason || 'user_request'
    })
    .eq('id', user.id);

  // Log the deletion
  const { ipAddress, userAgent } = getRequestMetadata(req);
  await logAuditEvent({
    tenantId: user.tenant_id,
    userId: user.id,
    action: AuditActions.DATA_DELETED,
    resourceType: 'user',
    resourceId: user.id,
    metadata: { email, reason, anonymized_email: anonymizedEmail },
    ipAddress,
    userAgent
  });

  return NextResponse.json({ 
    status: 'ok',
    message: 'User data has been anonymized and marked for deletion'
  });
}
