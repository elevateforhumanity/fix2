import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/student',
  '/dashboard',
  '/courses/my',
  '/admin',
  '/instructor',
  '/program-holder',
  '/delegate',
];

// Admin-only routes
const ADMIN_ROUTES = [
  '/admin',
  '/dev-admin',
];

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets and Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos')
  ) {
    return NextResponse.next();
  }

  // === AUTHENTICATION & AUTHORIZATION ===
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute || isAdminRoute) {
    // Verify authentication
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For admin routes, verify admin role
    if (isAdminRoute) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }

  const ip = getClientIp(request);

  // Tight limits for auth endpoints
  if (
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/signup')
  ) {
    const rate = await checkRateLimit({
      key: `auth:${ip}`,
      limit: 5,
      windowSeconds: 15 * 60,
    });

    if (!rate.ok) {
      return NextResponse.json(
        { error: 'Too many auth attempts. Please try again later.' },
        { status: 429 }
      );
    }
  }

  // Moderate limits for general API
  if (pathname.startsWith('/api')) {
    const rate = await checkRateLimit({
      key: `api:${ip}`,
      limit: 200,
      windowSeconds: 60 * 60,
    });

    if (!rate.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429 }
      );
    }
  }

  // Subdomain routing
  const hostname = request.headers.get('host') || '';

  if (hostname.includes('elevateconnectsdirectory.org')) {
    return NextResponse.rewrite(new URL('/admin', request.url));
  }

  // Add security headers to response
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
