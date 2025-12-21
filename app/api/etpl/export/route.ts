import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { auditExport } from '@/lib/auditLog';

export async function GET(req: Request) {
  try {
    const supabase = createAdminClient();

    // Get ETPL metrics
    const { data: metrics, error } = await supabase
      .from('etpl_metrics')
      .select('*')
      .order('quarter', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Log the export
    await auditExport(
      'audit_snapshot',
      req.headers.get('x-user-id') || undefined,
      'sponsor',
      req
    );

    return NextResponse.json({
      metrics: metrics || [],
      generated_at: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
