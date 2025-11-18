// app/api/programs/featured/route.ts
// Cached featured programs endpoint
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cacheGet, cacheSet } from '@/lib/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(_req: NextRequest) {
  const cacheKey = 'programs:featured';

  // Try cache first
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json({ programs: cached, cached: true });
  }

  // Fetch from database
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .limit(12);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Cache for 5 minutes
  await cacheSet(cacheKey, data, 300);

  return NextResponse.json({ programs: data, cached: false });
}
