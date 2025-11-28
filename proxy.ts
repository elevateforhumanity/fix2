import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUSPICIOUS_USER_AGENTS = [
  'scrapy',
  'python-requests',
  // Removed 'curl' and 'wget' - these are legitimate tools
  // Removed 'bot' - too broad, blocks legitimate bots
  'malicious-crawler',
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

// AI scraper bots to block from protected content
const AI_SCRAPER_BOTS = [
  'gptbot',
  'chatgpt',
  'chatgpt-user',
  'ccbot',
  'anthropic',
  'claude-web',
  'google-extended',
  'perplexitybot',
  'omgilibot',
  'bytespider',
  'diffbot',
  'imagesiftbot',
  'cohere-ai',
  'ai2bot',
  'applebot-extended',
];

// Protected paths that should block AI scrapers
const PROTECTED_PATHS = [
  '/student',
  '/course',
  '/courses',
  '/admin',
  '/portal',
  '/delegate',
  '/lms',
];

export default function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const path = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Skip all middleware checks for local development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1') || hostname.includes('gitpod.dev')) {
    return NextResponse.next();
  }

  // Block AI scrapers from protected content
  const isProtectedPath = PROTECTED_PATHS.some(p => path.startsWith(p));
  if (isProtectedPath) {
    const isAIScraper = AI_SCRAPER_BOTS.some(bot => userAgent.includes(bot));
    if (isAIScraper) {
      console.warn(`[Security] Blocked AI scraper: ${userAgent} from ${path} (IP: ${ip})`);
      return new NextResponse('Access Denied - AI scraping not permitted', {
        status: 403,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow, noarchive, noai, noimageai',
          'Content-Type': 'text/plain',
        },
      });
    }
  }
  
  // Handle LMS domain - route to /lms
  if (hostname.includes('elevateforhumanityeducation.com')) {
    // Allow these paths without rewriting (they exist at root level)
    const allowedRootPaths = ['/admin', '/login', '/signup', '/apply', '/api', '/_next', '/static'];
    const isAllowedRoot = allowedRootPaths.some(p => path.startsWith(p));
    
    if (isAllowedRoot) {
      return NextResponse.next();
    }
    
    // If already on /lms path, continue
    if (path.startsWith('/lms')) {
      return NextResponse.next();
    }
    
    // Rewrite root to /lms
    if (path === '/' || path === '') {
      return NextResponse.rewrite(new URL('/lms', request.url));
    }
    
    // Rewrite other paths to /lms/[path]
    return NextResponse.rewrite(new URL(`/lms${path}`, request.url));
  }
  
  // Handle admin subdomain if configured
  if (hostname.includes('admin.elevateforhumanity')) {
    if (path.startsWith('/admin')) {
      return NextResponse.next();
    }
    if (path === '/' || path === '') {
      return NextResponse.rewrite(new URL('/admin', request.url));
    }
    return NextResponse.rewrite(new URL(`/admin${path}`, request.url));
  }
  
  // Handle old URLs with 410 Gone (permanently removed)
  const goneUrls = [
    '/health-services',
    '/advertise-with-us',
    '/career-training-programs---wrg---wioa-approved/state-funded-courses',
    '/programs/cna-hha',
  ];
  
  if (goneUrls.some(url => path.startsWith(url))) {
    return new NextResponse('This page has been permanently removed', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Redirect individual blog posts to main blog page
  if (path.startsWith('/blog/') && path !== '/blog') {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }
  
  // Consolidate student portals - redirect /student/* to /portal/student/*
  // BUT keep /lms/* paths as-is (no redirect)
  if (path.startsWith('/student/') && !path.startsWith('/students')) {
    const newPath = path.replace('/student/', '/portal/student/');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }
  
  // REMOVED: No longer redirecting /lms/* to /portal/student/*
  // LMS routes stay at /lms for better performance and clarity
  
  // Skip middleware for static files and public routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/static') ||
    path.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Allow admin and LMS routes to pass through
  // Auth checks happen in the page layouts, not in middleware
  if (path.startsWith('/admin') || path.startsWith('/lms') || path.startsWith('/create-course')) {
    return NextResponse.next();
  }
  
  // Check if it's a suspicious bot
  const isSuspicious = SUSPICIOUS_USER_AGENTS.some(bot => 
    userAgent.includes(bot)
  );
  
  // Check if it's an allowed bot
  const isAllowed = ALLOWED_BOTS.some(bot => 
    userAgent.includes(bot)
  );
  
  if (isSuspicious && !isAllowed) {
    console.warn(`Blocked suspicious bot: ${userAgent} from ${ip}`);
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }
  
  // Only block completely empty user agents (not short ones)
  // Allow curl, wget, and other legitimate tools
  if (!userAgent) {
    console.warn(`Blocked request with no user agent from ${ip}`);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 403 }
    );
  }
  
  // Add security headers to response
  const response = NextResponse.next();
  
  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Add fingerprint header for tracking
  const fingerprint = generateFingerprint(request);
  response.headers.set('X-Request-ID', fingerprint);
  
  return response;
}

function generateFingerprint(req: NextRequest): string {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
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
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
}

// =====================================================
// ROUTE PROTECTION CONFIGURATION
// =====================================================

const PROTECTED_ROUTES = {
  '/student': ['student'],
  '/instructor': ['instructor', 'admin'],
  '/admin': ['admin'],
  '/program-holder': ['program_holder'],
  '/delegate': ['delegate'],
  '/dashboard': [], // Any authenticated user
};

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/about',
  '/contact',
  '/programs',
  '/courses',
  '/blog',
  '/help',
  '/privacy',
  '/terms',
  '/unauthorized',
];

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
