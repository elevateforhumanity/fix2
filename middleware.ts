import { NextResponse, NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/student', '/admin', '/api', '/platform', '/shop', '/instructor'];

const SUSPICIOUS_UA = [
  'python',
  'httpclient',
  'curl',
  'wget',
  'scrapy',
  'selenium',
  'playwright',
  'puppeteer',
  'axios',
  'go-http-client',
  'headless',
  'bot',
  'crawler',
  'spider',
  'scraper',
];

// Check if User-Agent looks suspicious
function isSuspiciousUA(ua: string): boolean {
  const u = (ua || '').toLowerCase();
  return SUSPICIOUS_UA.some((s) => u.includes(s));
}

// Check if this looks like a legitimate browser
function isLikelyBrowser(ua: string): boolean {
  const u = (ua || '').toLowerCase();
  return (
    (u.includes('mozilla') || u.includes('chrome') || u.includes('safari') || u.includes('firefox')) &&
    !isSuspiciousUA(ua)
  );
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const ua = req.headers.get('user-agent') || '';
  const accept = req.headers.get('accept') || '';
  const referer = req.headers.get('referer') || '';

  // 1) Block obvious automation UAs
  if (isSuspiciousUA(ua)) {
    console.log(`[BLOCKED] Suspicious UA: ${ua} on ${path}`);
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 2) Block requests that look like "HTML fetchers" but don't accept HTML
  // (many scrapers pull HTML with weird Accept headers)
  const wantsHtml = accept.includes('text/html');
  const isPublicPage = 
    path === '/' || 
    path.startsWith('/programs') || 
    path.startsWith('/about') ||
    path.startsWith('/faq') ||
    path.startsWith('/how-it-works');

  if (isPublicPage && !wantsHtml && !path.includes('.') && isLikelyBrowser(ua)) {
    // Suspicious: browser-like UA but doesn't want HTML
    console.log(`[BLOCKED] No HTML accept on public page: ${path}`);
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 3) Protected areas require authentication
  // (This is a basic check - your actual auth should be in the route handlers)
  if (PROTECTED_PREFIXES.some((p) => path.startsWith(p))) {
    // Check for auth cookie/session
    const hasAuthCookie = req.cookies.has('sb-access-token') || req.cookies.has('sb-refresh-token');
    
    if (!hasAuthCookie && !path.startsWith('/api/')) {
      // Redirect to login for protected pages (not API routes)
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', path);
      return NextResponse.redirect(url);
    }
  }

  // 4) Add anti-scrape headers to all responses
  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noai, noimageai, nosnippet, noarchive');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add rate limit headers (informational)
  res.headers.set('X-RateLimit-Limit', '60');
  res.headers.set('X-RateLimit-Window', '1m');

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|videos|.*\\..*).*)' ,
  ],
};
