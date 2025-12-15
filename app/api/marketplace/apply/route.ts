import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import {
  rateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  RateLimitPresets,
} from '@/lib/rateLimit';

export async function POST(req: Request) {
  // Rate limiting: 3 applications per hour per IP
  const identifier = getClientIdentifier(req.headers);
  const rateLimitResult = rateLimit(identifier, {
    limit: 3,
    window: 60 * 60 * 1000,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many applications. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { displayName, bio, payoutEmail, payoutMethod, productDescription } =
      await req.json();

    if (!displayName || !bio || !payoutEmail || !productDescription) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      );
    }

    // Check if user already has a creator profile
    const { data: existing } = await supabase
      .from('marketplace_creators')
      .select('id, status')
      .eq('user_id', user.id)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error:
            existing.status === 'pending'
              ? 'Application already submitted'
              : 'Creator profile already exists',
        },
        { status: 400 }
      );
    }

    // Create creator application
    const { data, error } = await supabase
      .from('marketplace_creators')
      .insert({
        user_id: user.id,
        display_name: displayName,
        bio,
        payout_email: payoutEmail,
        payout_method: payoutMethod,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to applicant

    return NextResponse.json({ success: true, creator: data });
  } catch (error: any) {
    // Error: $1
    return NextResponse.json(
      { error: error.message || 'Application failed' },
      { status: 500 }
    );
  }
}
