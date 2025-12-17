import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgContext } from '@/lib/org/getOrgContext';
import { requireReportAccess, toCsv, getCsvHeaders } from '@/lib/reports';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ctx = await getOrgContext(supabase, user.id);
    requireReportAccess(ctx.role);

    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');

    const { data, error } = await supabase
      .from('reporting_completions')
      .select('*')
      .eq('organization_id', ctx.organization_id)
      .order('completed_count', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (format === 'csv') {
      const csv = toCsv(data || []);
      return new NextResponse(csv, {
        headers: getCsvHeaders('completions.csv'),
      });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
