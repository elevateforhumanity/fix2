import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  try {
    const supabase = createMiddlewareClient({ req, res });
    
    // Refresh session if expired
    const { data: { session } } = await supabase.auth.getSession();
    
    const path = req.nextUrl.pathname;
    
    // Protected routes that require authentication
    const protectedRoutes = [
      '/dashboard',
      '/lms',
      '/student',
      '/staff-portal',
      '/program-holder',
      '/partner',
      '/shop/dashboard',
    ];
    
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    
    // If accessing protected route without session, redirect to login
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', path);
      return NextResponse.redirect(redirectUrl);
    }
    
    // If accessing login/signup with active session, redirect to dashboard
    if ((path === '/login' || path === '/signup') && session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, allow request to proceed (fail open for public routes)
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
