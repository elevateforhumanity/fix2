import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Back office domain - require authentication for everything
  if (hostname.includes('elevateconnectsdirectory.org')) {
    // Allow login pages
    if (pathname.startsWith('/admin/login') || 
        pathname.startsWith('/program-holder/login') ||
        pathname.startsWith('/staff/login') ||
        pathname.startsWith('/workforce-board/login') ||
        pathname === '/login') {
      return NextResponse.next();
    }

    // Check authentication
    const token = request.cookies.get('auth-token') || 
                  request.cookies.get('admin-token') ||
                  request.cookies.get('staff-token') ||
                  request.cookies.get('program-holder-token');
    
    if (!token) {
      // Redirect to appropriate login based on path
      if (pathname.startsWith('/admin')) {
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/program-holder')) {
        const url = new URL('/program-holder/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/staff')) {
        const url = new URL('/staff/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/workforce-board')) {
        const url = new URL('/workforce-board/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      // Default to admin login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Main public domain - protect specific internal routes
  if (hostname.includes('elevateforhumanity.org')) {
    // Protect admin routes on public domain
    if (pathname.startsWith('/admin') || 
        pathname.startsWith('/program-holder') ||
        pathname.startsWith('/staff-portal') ||
        pathname.startsWith('/workforce-board')) {
      
      const token = request.cookies.get('admin-token') ||
                    request.cookies.get('staff-token') ||
                    request.cookies.get('program-holder-token');
      
      if (!token && !pathname.includes('/login')) {
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/program-holder/:path*',
    '/staff-portal/:path*',
    '/staff/:path*',
    '/workforce-board/:path*',
    '/digital-binders/:path*',
    '/course-builder/:path*',
  ],
};
