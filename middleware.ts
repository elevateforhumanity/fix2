import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUSPICIOUS_USER_AGENTS = [
  'scrapy',
  'python-requests',
  'curl',
  'wget',
  'bot',
  'crawler',
  'spider',
  'scraper',
  'headless',
  'phantom',
  'selenium',
  'puppeteer',
];

const ALLOWED_BOTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'whatsapp',
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const path = request.nextUrl.pathname;
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Skip middleware for static files and public routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/static') ||
    path.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if it's a suspicious bot
  const isSuspicious = SUSPICIOUS_USER_AGENTS.some((bot) =>
    userAgent.includes(bot)
  );

  // Check if it's an allowed bot
  const isAllowed = ALLOWED_BOTS.some((bot) => userAgent.includes(bot));

  if (isSuspicious && !isAllowed) {
    console.warn(`Blocked suspicious bot: ${userAgent} from ${ip}`);
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // Check for missing or suspicious headers
  if (!userAgent || userAgent.length < 10) {
    console.warn(`Blocked request with invalid user agent from ${ip}`);
    return NextResponse.json({ error: 'Invalid request' }, { status: 403 });
  }

  // Add security headers to response
  const response = NextResponse.next();

  // Add fingerprint header for tracking
  const fingerprint = generateFingerprint(request);
  response.headers.set('X-Request-ID', fingerprint);

  return response;
}

function generateFingerprint(req: NextRequest): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  const components = [
    req.headers.get('user-agent') || '',
    req.headers.get('accept-language') || '',
    req.headers.get('accept-encoding') || '',
    ip,
    Date.now().toString(),
  ];

  // Simple hash function
  let hash = 0;
  const str = components.join('|');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
}

export const config = {
  matcher: [
    '/api/:path*',
    '/student/:path*',
    '/admin/:path*',
    '/employer/:path*',
    '/program-holder/:path*',
    // Note: /lms routes removed - they should be publicly accessible
  ],
};
