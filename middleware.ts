import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const { pathname } = request.nextUrl;

  // Public routes that don't require auth
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/about',
    '/contact',
    '/faq',
    '/blog',
    '/programs',
    '/pricing',
    '/demo',
    '/compare',
    '/privacy-policy',
    '/terms-of-service',
    '/cert/verify',
  ];

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Add security headers to all responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Allow public routes without Supabase check
  if (isPublicRoute) {
    return response;
  }

  // Check if Supabase environment variables are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables not configured');
    // Redirect to login for protected routes
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('error', 'configuration');
    return NextResponse.redirect(redirectUrl);
  }

  let session = null;
  let profile = null;

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
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
          remove(name: string, options: any) {
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

    const { data: { session: authSession } } = await supabase.auth.getSession();
    session = authSession;

    // Get user profile if session exists
    if (session) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      profile = profileData;
    }
  } catch (error) {
    console.error('Middleware Supabase error:', error);
    // On error, redirect to login for protected routes
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('error', 'auth');
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to login if not authenticated
  if (!session) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const role = profile?.role;

  // Role-based route protection
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/program-holder') && role !== 'program_holder' && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/delegate') && role !== 'delegate' && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/lms') && role !== 'student' && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Add additional security headers for authenticated routes
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

// Configure which routes use middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
