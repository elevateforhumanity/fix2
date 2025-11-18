// app/api/help/search/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  const { data: results, error } = await supabase
    .from('help_articles')
    .select('*')
    .or(`title.ilike.%${q}%,body.ilike.%${q}%`)
    .limit(20)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  return NextResponse.json({
    results: (results || []).map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category,
      audience: r.audience,
      snippet: r.body.slice(0, 180),
    })),
  });
}
