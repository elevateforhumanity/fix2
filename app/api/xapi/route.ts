// app/api/xapi/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  // xAPI endpoint for receiving learning activity statements
  const body = await request.json();

  const statements = Array.isArray(body) ? body : [body];

  const data = statements.map((s: any) => ({
    actor: s.actor,
    verb: s.verb,
    object: s.object,
    context: s.context ?? null,
    result: s.result ?? null,
    timestamp: s.timestamp ?? new Date().toISOString(),
  }));

  if (!data.length) {
    return NextResponse.json({ error: 'No statements' }, { status: 400 });
  }

  const { error } = await supabase.from('xapi_statements').insert(data);

  if (error) {
    console.error('xAPI insert error:', error);
    return NextResponse.json(
      { error: 'Failed to store statements' },
      { status: 500 }
    );
  }

  return NextResponse.json({ stored: data.length });
}

export async function GET(request: Request) {
  // xAPI GET endpoint for retrieving statements
  const { searchParams } = new URL(request.url);
  const actor = searchParams.get('agent');
  const verb = searchParams.get('verb');
  const limit = parseInt(searchParams.get('limit') || '100');

  let query = supabase
    .from('xapi_statements')
    .select('*')
    .order('stored_at', { ascending: false })
    .limit(limit);

  if (actor) {
    query = query.contains('actor', { mbox: actor });
  }

  if (verb) {
    query = query.contains('verb', { id: verb });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve statements' },
      { status: 500 }
    );
  }

  return NextResponse.json({ statements: data });
}
