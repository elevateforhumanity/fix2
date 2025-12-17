import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

// GET /api/events
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status') || 'published';
    const upcomingOnly = searchParams.get('upcoming') === 'true';
    const eventType = searchParams.get('event_type');

    let query = supabase
      .from('events')
      .select('*')
      .eq('status', status)
      .order('start_at', { ascending: true });

    if (upcomingOnly) {
      query = query.gte('start_at', new Date().toISOString());
    }

    if (eventType) {
      query = query.eq('event_type', eventType);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ events: data });
  } catch (err: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('GET /events error', err);
    return NextResponse.json(
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      { error: err.message || 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events (admin-only via RBAC/RLS)
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const {
      title,
      description,
      event_type,
      location_type,
      location_address,
      virtual_link,
      start_at,
      end_at,
      capacity,
      allow_waitlist,
    } = body;

    if (!title || !start_at || !end_at) {
      return NextResponse.json(
        { error: 'Missing required fields: title, start_at, end_at' },
        { status: 400 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('events')
      .insert({
        title,
        description,
        event_type,
        location_type,
        location_address,
        virtual_link,
        start_at,
        end_at,
        capacity,
        allow_waitlist,
        created_by: user?.id ?? null,
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ event: data }, { status: 201 });
  } catch (err: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('POST /events error', err);
    return NextResponse.json(
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      { error: err.message || 'Failed to create event' },
      { status: 500 }
    );
  }
}
