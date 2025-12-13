import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Create response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/student', '/instructor', '/lms'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check if Supabase env vars are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // In dev without Supabase, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname + search);
      return NextResponse.redirect(url);
    }

    // Create Supabase client
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Not logged in - redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname + search);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/instructor/:path*',
    '/lms/:path*',
  ],
};
