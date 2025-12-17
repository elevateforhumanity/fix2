import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, metadata, slug, title } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing course id' }, { status: 400 });
    }

    const supabase = await createClient();

    const updateData: unknown = {};
    // @ts-expect-error TS2339: Property 'metadata' does not exist on type 'unknown'.
    if (metadata) updateData.metadata = metadata;
    // @ts-expect-error TS2339: Property 'slug' does not exist on type 'unknown'.
    if (slug) updateData.slug = slug;
    // @ts-expect-error TS2339: Property 'title' does not exist on type 'unknown'.
    if (title) updateData.title = title;

    const { data, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Supabase error:', error);
      return NextResponse.json(
        { error: toErrorMessage(error) },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, course: data });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('Save course error:', error);
    return NextResponse.json(
      { error: 'Failed to save course', message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}
