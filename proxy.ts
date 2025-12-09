import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
