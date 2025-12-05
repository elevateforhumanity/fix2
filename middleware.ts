import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLicense, isDomainAuthorized, logLicenseWarning } from "./lib/license";

export function middleware(req: NextRequest) {
  const license = getLicense();
  const hostname = req.nextUrl.hostname;

  // Check domain authorization
  if (!isDomainAuthorized(hostname)) {
    logLicenseWarning(`Unauthorized domain access`, { 
      hostname, 
      path: req.nextUrl.pathname 
    });
    
    // Don't block - just log for now
    // In the future, you could add a banner or redirect
  }

  // Check license status
  if (license.status === "suspended") {
    logLicenseWarning(`Suspended license in use`, { hostname });
    req.headers.set("X-EFH-License-Suspended", "true");
  }

  if (license.status === "expired") {
    logLicenseWarning(`Expired license in use`, { hostname });
    req.headers.set("X-EFH-License-Expired", "true");
  }

  // Add license ID to response headers (for your tracking)
  const response = NextResponse.next();
  response.headers.set("X-EFH-License-ID", license.licenseId);
  
  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
