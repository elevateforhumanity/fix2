import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: templates, error } = await supabase
      .from('campaign_templates')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ templates: templates || [] });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        err:
          (err instanceof Error ? err.message : String(err)) ||
          'Failed to fetch templates',
      },
      { status: 500 }
    );
  }
}
