import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

// AI scrapers and bots to block
const BLOCKED_USER_AGENTS = [
  'GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot', 'anthropic-ai',
  'Claude-Web', 'cohere-ai', 'Omgilibot', 'FacebookBot', 'Diffbot',
];

// High-risk countries for stricter rate limiting
const HIGH_RISK_COUNTRIES = ['CN', 'RU', 'KP', 'IR'];

// Suspicious patterns (relaxed - removed legitimate testing tools)
const SUSPICIOUS_PATTERNS = [
  /wget/i,
  /scrapy/i,
];

// Initialize Redis (only if configured)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limiting function with Redis
async function checkRateLimit(ip: string, limit: number): Promise<{ limited: boolean; remaining: number }> {
  if (!redis) {
    console.warn('⚠️  Redis not configured, rate limiting disabled');
    return { limited: false, remaining: limit };
  }

  const key = `rate_limit:${ip}`;
  const windowMs = 60 * 60 * 1000; // 1 hour
  const windowSeconds = Math.ceil(windowMs / 1000);

  try {
    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);
    
    const results = await pipeline.exec();
    const count = results[0] as number;
    const ttl = results[1] as number;

    // Set expiry on first request
    if (ttl === -1) {
      await redis.expire(key, windowSeconds);
    }

    const remaining = Math.max(0, limit - count);
    const limited = count > limit;

    return { limited, remaining };
  } catch (error) {
    console.error('Redis error:', error);
    // Fail open - allow request on Redis error
    return { limited: false, remaining: limit };
  }
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const country = request.geo?.country || 'unknown';
  const pathname = request.nextUrl.pathname;

  // EXEMPT CRITICAL ENDPOINTS FROM ALL RESTRICTIONS
  if (
    pathname.startsWith('/api/applications') ||
    pathname.startsWith('/api/enroll') ||
    pathname.startsWith('/apply') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Check for suspicious patterns
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

  // Rate limiting with Redis
  const isHighRisk = HIGH_RISK_COUNTRIES.includes(country);
  const rateLimit = isHighRisk ? 200 : 500;

  const { limited, remaining } = await checkRateLimit(ip, rateLimit);

  if (limited) {
    console.log(`Rate limit exceeded for ${ip} (${country})`);
    return new NextResponse('Rate Limit Exceeded - Please try again in a few minutes. If you need immediate assistance, call 317-314-3757', { 
      status: 429,
      headers: {
        'Retry-After': '3600', // 1 hour
        'X-RateLimit-Limit': String(rateLimit),
        'X-RateLimit-Remaining': '0',
      }
    });
  }

  // Add rate limit headers to response
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(rateLimit));
  response.headers.set('X-RateLimit-Remaining', String(remaining));

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Subdomain handling (with auth check would go here)
  if (hostname.includes('elevateconnectsdirectory.org')) {
    // TODO: Add authentication check before rewriting
    return NextResponse.rewrite(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
