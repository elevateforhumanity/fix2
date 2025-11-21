import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of old URLs that should return 410 Gone (permanently removed)
  const goneUrls = [
    '/health-services',
    '/advertise-with-us',
    '/career-training-programs---wrg---wioa-approved/state-funded-courses',
    '/programs/cna-hha',
  ];

  // Check if URL is in the gone list
  if (goneUrls.some(url => pathname.startsWith(url))) {
    return new NextResponse('This page has been permanently removed', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Redirect blog post URLs to main blog page
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
