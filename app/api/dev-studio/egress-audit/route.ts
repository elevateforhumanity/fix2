import { NextResponse } from 'next/server';

import { requireDevStudioAccess } from '@/lib/auth/dev-studio-access';
import { auditContainerEgress } from '@/lib/network/egress-audit';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET() {
  const unauthorized = await requireDevStudioAccess();
  if (unauthorized) return unauthorized;

  const audit = await auditContainerEgress();

  return NextResponse.json(audit, {
    status: audit.ok ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
