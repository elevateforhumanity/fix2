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
  '/program-holder/dashboard',
  '/program-holder/onboarding',
  '/program-holder/documents',
  '/program-holder/mou',
  '/program-holder/handbook',
  '/program-holder/rights-responsibilities',
  '/program-holder/training',
  '/program-holder/settings',
  '/program-holder/portal',
  '/delegate',
  '/lms/', // Note: /lms itself is public, only /lms/* is protected

  '/employer/dashboard',
  '/workforce-board/dashboard',
  '/staff-portal/dashboard',
  '/board/dashboard',
  '/shop/dashboard',
  '/creator/dashboard',
  '/portal/parent/dashboard',
  '/portal/student/dashboard',
  '/portal/staff/dashboard',
];

// Admin-only routes
const ADMIN_ROUTES = ['/admin', '/dev-admin'];

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'X-Robots-Tag': 'noai, noimageai, nosnippet, noarchive',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(self), payment=(self)',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://js.stripe.com https://cms-artifacts.artlist.io",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob: https://i.imgur.com https://cms-artifacts.artlist.io",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://api.stripe.com wss://*.supabase.co https://cms-artifacts.artlist.io",
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://js.stripe.com",
    "media-src 'self' https: blob: https://cms-artifacts.artlist.io",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ].join('; '),
};

// Suspicious patterns to block
const suspiciousPatterns = [
  /\.\.\//g,
  /<script/gi,
  /union.*select/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
];

// Bot detection patterns (enhanced anti-scrape)
const botPatterns = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /httpclient/i,
  /scrapy/i,
  /selenium/i,
  /playwright/i,
  /puppeteer/i,
  /axios/i,
  /go-http-client/i,
  /headless/i,
];

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isBot(userAgent: string): boolean {
  return botPatterns.some((pattern) => pattern.test(userAgent));
}

function isSuspiciousRequest(url: string): boolean {
  return suspiciousPatterns.some((pattern) => pattern.test(url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIp(request);
  const hostname = request.headers.get('host') || '';

  // === HEALTH CHECK BYPASS ===
  // Health endpoint must NEVER be auth-gated for monitoring
  if (pathname === '/api/health') {
    return NextResponse.next();
  }

  // === DOMAIN-BASED ROUTING ===
  // Admin portal domains
  if (
    hostname === 'elevateconnectsdirectory.org' ||
    hostname === 'www.elevateconnectsdirectory.org'
  ) {
    if (!pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone();
      url.pathname = `/admin${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // LMS portal domains
  if (
    hostname === 'elevateforhumanitylearning.com' ||
    hostname === 'www.elevateforhumanitylearning.com'
  ) {
    if (!pathname.startsWith('/lms')) {
      const url = request.nextUrl.clone();
      url.pathname = `/lms${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle redirects for consolidated pages
  const redirects: Record<string, string> = {
    '/portal/student': '/student/dashboard',
    '/student-portal': '/student/dashboard',
    '/aitutor': '/ai-tutor',
    '/forgotpassword': '/auth/forgot-password',
    '/resetpassword': '/auth/reset-password',
    '/refundpolicy': '/refund-policy',
    '/refunds': '/refund-policy',
    '/privacy-policy': '/privacy',
    '/terms-of-service': '/terms',
  };

  if (redirects[pathname]) {
    return NextResponse.redirect(
      new URL(redirects[pathname], request.url),
      301
    );
  }

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

  // Block suspicious requests
  if (isSuspiciousRequest(pathname)) {
    console.warn(
      `[SECURITY] Blocked suspicious request from ${ip}: ${pathname}`
    );
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Bot detection (allow legitimate bots, block scrapers)
  const isLegitimateBot = /googlebot|bingbot|slurp|duckduckbot/i.test(
    userAgent
  );
  if (isBot(userAgent) && !isLegitimateBot) {
    console.log(`[SECURITY] Bot detected: ${userAgent} from ${ip}`);

    // Block bots from sensitive areas
    if (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/student') ||
      pathname.startsWith('/portal')
    ) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // === AUTHENTICATION & AUTHORIZATION ===
  // Special handling for /lms: public page, but /lms/* is protected
  const isLmsPublic = pathname === '/lms';
  const isLmsProtected =
    pathname.startsWith('/lms/') && !pathname.startsWith('/login');

  const isProtectedRoute =
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) ||
    isLmsProtected;
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  if ((isProtectedRoute || isAdminRoute) && !isLmsPublic) {
    // Check for Supabase SSR cookies first (fast check)
    const cookieNames = Array.from(request.cookies.getAll()).map((c) => c.name);
    const hasSupabaseCookie = cookieNames.some((n) => n.startsWith('sb-'));

    if (!hasSupabaseCookie) {
      // No auth cookie, redirect immediately
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify authentication
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
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

  // Add comprehensive security headers to response
  const response = NextResponse.next();

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add cache control for static assets
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos')
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Prevent caching of sensitive pages
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/portal')
  ) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
