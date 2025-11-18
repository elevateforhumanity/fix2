// middleware.ts
// Enterprise security middleware with headers, session management, and IP whitelist
import { NextResponse, NextRequest } from 'next/server';

const ONE_MINUTE = 60 * 1000;

// Parse comma separated IP whitelist from env
const ADMIN_IP_WHITELIST = (process.env.ADMIN_IP_WHITELIST || '')
  .split(',')
  .map((ip) => ip.trim())
  .filter(Boolean);

const SESSION_MAX_AGE_MINUTES = Number(
  process.env.SESSION_MAX_AGE_MINUTES || 60
);

function isAdminRoute(pathname: string) {
  return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

function addSecurityHeaders(response: NextResponse) {
  // Content Security Policy - strict but allows necessary resources
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      'img-src * blob: data:',
      "font-src 'self' data: https://fonts.gstatic.com",
      'connect-src *',
      "frame-ancestors 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // XSS Protection (legacy but still useful)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // HTTP Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // Permissions Policy (formerly Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Static assets / public files: just add headers and continue
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?)$/)
  ) {
    return addSecurityHeaders(NextResponse.next());
  }

  const res = NextResponse.next();

  // Session timeout (simple cookie-based)
  const sessionCookie = req.cookies.get('session_last_active');
  const now = Date.now();

  if (sessionCookie) {
    const lastActive = Number(sessionCookie.value);
    const maxAgeMs = SESSION_MAX_AGE_MINUTES * ONE_MINUTE;

    if (!Number.isNaN(lastActive) && now - lastActive > maxAgeMs) {
      // Clear auth cookies and redirect to login
      const logoutUrl = req.nextUrl.clone();
      logoutUrl.pathname = '/auth/login';
      logoutUrl.searchParams.set('reason', 'session_expired');

      const redirectRes = NextResponse.redirect(logoutUrl);
      redirectRes.cookies.delete('session_last_active');
      redirectRes.cookies.delete('sb-access-token');
      redirectRes.cookies.delete('sb-refresh-token');
      return addSecurityHeaders(redirectRes);
    }
  }

  // Refresh session_last_active
  res.cookies.set('session_last_active', String(now), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  // Admin IP whitelist (basic protection for admin/ backoffice)
  if (isAdminRoute(pathname) && ADMIN_IP_WHITELIST.length > 0) {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.ip ||
      req.headers.get('x-real-ip') ||
      '';

    if (!ADMIN_IP_WHITELIST.includes(ip)) {
      const forbidden = NextResponse.json(
        { error: 'Admin access restricted by IP whitelist' },
        { status: 403 }
      );
      return addSecurityHeaders(forbidden);
    }
  }

  return addSecurityHeaders(res);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
