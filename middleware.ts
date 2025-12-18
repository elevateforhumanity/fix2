import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Admin portal domains
  if (
    hostname === 'elevateconnectsdirectory.org' ||
    hostname === 'www.elevateconnectsdirectory.org'
  ) {
    // If already on /admin path, continue
    if (url.pathname.startsWith('/admin')) {
      return NextResponse.next();
    }
    // Rewrite to /admin
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // LMS portal domains
  if (
    hostname === 'elevateforhumanityeducation.com' ||
    hostname === 'www.elevateforhumanityeducation.com'
  ) {
    // If already on /lms path, continue
    if (url.pathname.startsWith('/lms')) {
      return NextResponse.next();
    }
    // Rewrite to /lms
    url.pathname = `/lms${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|.*\\..*$).*)',
  ],
};
