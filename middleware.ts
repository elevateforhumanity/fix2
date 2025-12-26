import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * MIDDLEWARE - Email Verification Enforcement
 *
 * Blocks unverified users from accessing protected routes
 */

const PROTECTED_ROUTES = [
  '/lms',
  '/program-holder',
  '/admin',
  '/employer',
  '/staff-portal',
  '/instructor',
];

const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/verify-email',
  '/auth',
  '/',
  '/programs',
  '/apply',
  '/about',
  '/contact',
];

export async function middleware(request: NextRequest) {
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => path === route || path.startsWith(route)
  );

  // Allow public routes
  if (isPublicRoute) {
    return response;
  }

  // Require authentication for protected routes
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', path);
    return NextResponse.redirect(redirectUrl);
  }

  // Enforce email verification for authenticated users on protected routes
  if (isProtectedRoute && user) {
    // Check if email is verified
    const emailVerified = user.email_confirmed_at !== null;

    if (!emailVerified) {
      // Redirect to verification page
      const redirectUrl = new URL('/verify-email', request.url);
      redirectUrl.searchParams.set('email', user.email || '');
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
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
