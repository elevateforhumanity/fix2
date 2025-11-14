import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';

export async function GET(request: NextRequest) {
  const supabase = createSupabaseClient();
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    // Exchange code for session with Supabase
    // const supabase = createClient();
    // await supabase.auth.exchangeCodeForSession(code);

    return NextResponse.redirect(new URL(next, request.url));
  }

  // Return error if no code
  return NextResponse.redirect(
    new URL('/login?error=auth_failed', request.url)
  );
}
