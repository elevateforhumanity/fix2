// @ts-nocheck
import { createClient } from '@/lib/supabase/server';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from('media')
    .list('', { recursive: true });

  if (error) {
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }

  return Response.json(data ?? []);
}
