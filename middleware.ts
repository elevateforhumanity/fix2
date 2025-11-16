import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of known bot user agents to block
const BLOCKED_USER_AGENTS = [
  'scrapy',
  'crawler',
  'spider',
  'scraper',
  'bot',
  'curl',
  'wget',
  'python-requests',
  'axios',
  'node-fetch',
  'got',
  'httpx',
  'aiohttp',
];

// List of allowed bots (search engines, social media)
const ALLOWED_BOTS = [
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

  // Check if it's an allowed bot
  const isAllowedBot = ALLOWED_BOTS.some((bot) => userAgent.includes(bot));

  if (isAllowedBot) {
    return NextResponse.next();
  }

  // Check if it's a blocked bot/scraper
  const isBlockedBot = BLOCKED_USER_AGENTS.some((bot) =>
    userAgent.includes(bot)
  );

  if (isBlockedBot) {
    console.log(
      `Blocked scraper attempt from IP: ${ip}, User-Agent: ${userAgent}`
    );
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Rate limiting
  const now = Date.now();
  const clientKey = `${ip}-${userAgent}`;
  const clientData = requestCounts.get(clientKey);

  if (clientData) {
    if (now < clientData.resetTime) {
      if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
        console.log(`Rate limit exceeded for IP: ${ip}`);
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'Retry-After': String(
              Math.ceil((clientData.resetTime - now) / 1000)
            ),
          },
        });
      }
      clientData.count++;
    } else {
      // Reset window
      clientData.count = 1;
      clientData.resetTime = now + RATE_LIMIT_WINDOW;
    }
  } else {
    requestCounts.set(clientKey, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
  }

  // Clean up old entries (every 1000 requests)
  if (requestCounts.size > 1000) {
    for (const [key, data] of requestCounts.entries()) {
      if (now > data.resetTime) {
        requestCounts.delete(key);
      }
    }
  }

  // Add security headers
  const response = NextResponse.next();

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  );

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
