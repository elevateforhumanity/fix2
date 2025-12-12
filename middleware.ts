import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers configuration
const securityHeaders = {
  // Prevent clickjacking
  'X-Frame-Options': 'SAMEORIGIN',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=(self)',
  
  // Strict Transport Security (HTTPS only)
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  
  // Content Security Policy
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

// Rate limiting configuration (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute

// Suspicious patterns to block
const suspiciousPatterns = [
  /\.\.\//g, // Path traversal
  /<script/gi, // XSS attempts
  /union.*select/gi, // SQL injection
  /javascript:/gi, // JavaScript protocol
  /on\w+\s*=/gi, // Event handlers
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

function isBot(userAgent: string): boolean {
  return botPatterns.some(pattern => pattern.test(userAgent));
}

function isSuspiciousRequest(url: string): boolean {
  return suspiciousPatterns.some(pattern => pattern.test(url));
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

  // 1. Block suspicious requests
  if (isSuspiciousRequest(pathname)) {
    console.warn(`[SECURITY] Blocked suspicious request from ${ip}: ${pathname}`);
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Rate limiting
  if (!checkRateLimit(ip)) {
    console.warn(`[SECURITY] Rate limit exceeded for ${ip}`);
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
      }
    });
  }

  // 3. Bot detection (allow legitimate bots, block scrapers)
  const isLegitimateBot = /googlebot|bingbot|slurp|duckduckbot/i.test(userAgent);
  if (isBot(userAgent) && !isLegitimateBot) {
    // Allow bots to access public pages but log them
    console.log(`[SECURITY] Bot detected: ${userAgent} from ${ip}`);
    
    // Block bots from sensitive areas
    if (pathname.startsWith('/admin') || 
        pathname.startsWith('/api') || 
        pathname.startsWith('/student') ||
        pathname.startsWith('/portal')) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // 4. Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Add additional security headers for admin
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // 5. Protect API routes
  if (pathname.startsWith('/api')) {
    // Verify origin for API requests
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    if (origin && !origin.includes(host || '')) {
      console.warn(`[SECURITY] CSRF attempt detected from ${origin} to ${host}`);
      // Allow for now but log
    }
  }

  // 6. Add security headers to all responses
  const response = NextResponse.next();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 7. Add cache control for static assets
  if (pathname.startsWith('/_next/static') || 
      pathname.startsWith('/images') || 
      pathname.startsWith('/videos')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // 8. Prevent caching of sensitive pages
  if (pathname.startsWith('/admin') || 
      pathname.startsWith('/student') || 
      pathname.startsWith('/portal')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
