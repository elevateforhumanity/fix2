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

export default function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const path = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Handle LMS domain - route to /lms
  if (hostname.includes('elevateforhumanityeducation.com')) {
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
  
  // Consolidate student portals - redirect /student/* and /lms/* to /portal/student/*
  // BUT keep admin/instructor tools in their original locations
  if (path.startsWith('/student/') && !path.startsWith('/students')) {
    const newPath = path.replace('/student/', '/portal/student/');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }
  
  if (path.startsWith('/lms/')) {
    // Keep builder and admin tools at /lms
    const adminLmsPaths = ['/lms/builder', '/lms/course-authoring'];
    const isAdminPath = adminLmsPaths.some(p => path.startsWith(p));
    
    if (!isAdminPath) {
      const newPath = path.replace('/lms/', '/portal/student/');
      return NextResponse.redirect(new URL(newPath, request.url), 301);
    }
  }
  
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
  
  // Check for missing or suspicious headers
  if (!userAgent || userAgent.length < 10) {
    console.warn(`Blocked request with invalid user agent from ${ip}`);
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
