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

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=(self)',
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
    "upgrade-insecure-requests"
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

// Bot detection patterns
const botPatterns = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
];

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isBot(userAgent: string): boolean {
  return botPatterns.some(pattern => pattern.test(userAgent));
}

function isSuspiciousRequest(url: string): boolean {
  return suspiciousPatterns.some(pattern => pattern.test(url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIp(request);

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
    console.warn(`[SECURITY] Blocked suspicious request from ${ip}: ${pathname}`);
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Bot detection (allow legitimate bots, block scrapers)
  const isLegitimateBot = /googlebot|bingbot|slurp|duckduckbot/i.test(userAgent);
  if (isBot(userAgent) && !isLegitimateBot) {
    console.log(`[SECURITY] Bot detected: ${userAgent} from ${ip}`);
    
    // Block bots from sensitive areas
    if (pathname.startsWith('/admin') || 
        pathname.startsWith('/api') || 
        pathname.startsWith('/student') ||
        pathname.startsWith('/portal')) {
      return new NextResponse('Forbidden', { status: 403 });
    }
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

  // Add comprehensive security headers to response
  const response = NextResponse.next();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add cache control for static assets
  if (pathname.startsWith('/_next/static') || 
      pathname.startsWith('/images') || 
      pathname.startsWith('/videos')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Prevent caching of sensitive pages
  if (pathname.startsWith('/admin') || 
      pathname.startsWith('/student') || 
      pathname.startsWith('/portal')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
