import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware must use Edge Runtime
export const runtime = 'edge';

// AI scrapers and bots to block
const BLOCKED_USER_AGENTS = [
  'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web',
  'Google-Extended', 'PerplexityBot', 'Omgilibot', 'FacebookBot',
  'Bytespider', 'Amazonbot', 'meta-externalagent', 'Applebot-Extended',
  'cohere-ai', 'Diffbot', 'ImagesiftBot', 'Scrapy', 'python-requests',
  'AI2Bot', 'Ai2Bot-Dolma'
];

// Rate limiting map (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// High-risk countries for scraping (based on common scraping origins)
// Note: This is for bot protection, not discrimination. Legitimate users can still access.
const HIGH_RISK_COUNTRIES = [
  'CN', // China - high bot activity
  'RU', // Russia - high bot activity
  'VN', // Vietnam - scraping farms
  'IN', // India - scraping farms (but allow for legitimate users)
];

// Suspicious patterns in requests
const SUSPICIOUS_PATTERNS = [
  /wget/i,
  /curl/i,
  /scrapy/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /headless/i,
];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const country = request.geo?.country || 'unknown';
  
  // Check for suspicious patterns in user agent
  const hasSuspiciousPattern = SUSPICIOUS_PATTERNS.some(pattern => 
    pattern.test(userAgent)
  );
  
  if (hasSuspiciousPattern) {
    console.log(`Blocked suspicious user agent from ${ip}: ${userAgent}`);
    return new NextResponse('Access Denied - Suspicious Activity', {
      status: 403,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
  
  // Geo-fencing: Extra scrutiny for high-risk regions
  // Note: We don't block entirely, just apply stricter rate limits
  const isHighRisk = HIGH_RISK_COUNTRIES.includes(country);
  const rateLimit = isHighRisk ? 50 : 100; // Stricter limit for high-risk regions
  
  // Block AI scrapers
  for (const blockedAgent of BLOCKED_USER_AGENTS) {
    if (userAgent.toLowerCase().includes(blockedAgent.toLowerCase())) {
      return new NextResponse('Access Denied - AI Scraping Not Allowed', {
        status: 403,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        }
      });
    }
  }
  
  // Rate limiting (dynamic based on risk level)
  const now = Date.now();
  const rateLimitEntry = rateLimitMap.get(ip);
  
  if (rateLimitEntry) {
    if (now < rateLimitEntry.resetTime) {
      if (rateLimitEntry.count >= rateLimit) {
        console.log(`Rate limit exceeded for ${ip} (${country}): ${rateLimitEntry.count} requests`);
        return new NextResponse('Rate Limit Exceeded', { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitEntry.resetTime - now) / 1000)),
            'X-RateLimit-Limit': String(rateLimit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimitEntry.resetTime)
          }
        });
      }
      rateLimitEntry.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
  }
  
  // Handle elevateconnectsdirectory.org subdomain
  if (hostname.includes('elevateconnectsdirectory.org')) {
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
  
  // Handle directory.elevateforhumanity.org subdomain
  if (hostname.startsWith('directory.')) {
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
  
  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noai, noimageai');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add rate limit headers for transparency
  const currentRateLimit = rateLimitMap.get(ip);
  if (currentRateLimit) {
    response.headers.set('X-RateLimit-Limit', String(rateLimit));
    response.headers.set('X-RateLimit-Remaining', String(Math.max(0, rateLimit - currentRateLimit.count)));
    response.headers.set('X-RateLimit-Reset', String(currentRateLimit.resetTime));
  }
  
  // Add geo-location header for debugging (remove in production if privacy concern)
  if (isHighRisk) {
    response.headers.set('X-Risk-Level', 'high');
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
