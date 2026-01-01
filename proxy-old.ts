import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Check if this is a white-label deployment (not main site)
function isWhiteLabelDeployment(request: NextRequest): boolean {
  const hostname = request.headers.get('host') || '';
  const mainDomains = [
    'elevateforhumanity.org',
    'www.elevateforhumanity.org',
    'localhost',
    '127.0.0.1',
  ];

  return !mainDomains.some((domain) => hostname.includes(domain));
}

// Anti-scraping detection
function detectScraping(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const scraperPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /wget/i,
    /curl/i,
    /python/i,
    /java(?!script)/i,
    /httrack/i,
    /download/i,
  ];
  return scraperPatterns.some((pattern) => pattern.test(userAgent));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip license check for public routes
  const publicRoutes = [
    '/api/health',
    '/api/store/license',
    '/_next',
    '/favicon.ico',
    '/images',
    '/fonts',
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Anti-scraping check (for all deployments)
  if (!isPublicRoute && detectScraping(request)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Access Denied',
        message: 'Automated access not permitted',
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Admin routes - require admin role
  if (path.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = new URL('/admin-login', request.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (
      !profile ||
      !['admin', 'super_admin', 'org_admin'].includes(profile.role)
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Dashboard routes - require authentication
  if (
    path.startsWith('/dashboard') ||
    path.startsWith('/student/dashboard') ||
    path.startsWith('/program-holder/dashboard')
  ) {
    if (!user) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('next', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // LMS course content - require authentication
  // But allow /lms landing page to be public
  if (path.startsWith('/lms/') && !path.startsWith('/lms/page')) {
    if (!user) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('next', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Student portal - require authentication
  if (path.startsWith('/student') && !path.startsWith('/student-handbook')) {
    if (!user) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('next', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Program holder portal - require authentication
  if (path.startsWith('/program-holder')) {
    if (!user) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('next', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Staff portal - require authentication
  if (path.startsWith('/staff-portal')) {
    if (!user) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('next', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

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
