import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

/**
 * License Validation Middleware
 * Enforces license validation for white-label deployments
 * Prevents unauthorized use and scraping
 */

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

// Validate license from database
async function validateLicense(request: NextRequest): Promise<{
  valid: boolean;
  reason?: string;
  tier?: string;
}> {
  try {
    const { supabase } = createClient(request);
    const hostname = request.headers.get('host') || '';

    // Check if license exists for this domain
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('domain', hostname)
      .eq('status', 'active')
      .single();

    if (error || !license) {
      return {
        valid: false,
        reason: 'No valid license found for this domain',
      };
    }

    // Check expiration
    const expiresAt = new Date(license.expires_at);
    if (expiresAt < new Date()) {
      // Mark as expired
      await supabase
        .from('licenses')
        .update({ status: 'expired' })
        .eq('id', license.id);

      return {
        valid: false,
        reason: 'License has expired',
      };
    }

    // Check if license is suspended
    if (license.status === 'suspended') {
      return {
        valid: false,
        reason: 'License has been suspended',
      };
    }

    return {
      valid: true,
      tier: license.tier,
    };
  } catch (error) {
    console.error('License validation error:', error);
    return {
      valid: false,
      reason: 'License validation failed',
    };
  }
}

// Anti-scraping protection
function detectScraping(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';

  // Common scraper patterns
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

  // Check user agent
  const isSuspiciousUA = scraperPatterns.some((pattern) =>
    pattern.test(userAgent)
  );

  // Check for rapid requests (would need rate limiting)
  // This is a basic check - enhance with Redis for production

  return isSuspiciousUA;
}

// Public routes that don't require license validation
const publicRoutes = [
  '/api/health',
  '/api/store/license/validate',
  '/api/store/license/generate',
  '/_next',
  '/favicon.ico',
  '/images',
  '/fonts',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Skip license check for main site
  if (!isWhiteLabelDeployment(request)) {
    return NextResponse.next();
  }

  // Anti-scraping check
  if (detectScraping(request)) {
    console.warn('Potential scraping detected:', {
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
      path: pathname,
    });

    return new NextResponse(
      JSON.stringify({
        error: 'Access Denied',
        message: 'Automated access is not permitted',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Validate license for white-label deployments
  const validation = await validateLicense(request);

  if (!validation.valid) {
    // Return license error page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>License Required</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
              max-width: 600px;
            }
            h1 {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            p {
              font-size: 1.25rem;
              margin-bottom: 2rem;
              opacity: 0.9;
            }
            .reason {
              background: rgba(255, 255, 255, 0.1);
              padding: 1rem;
              border-radius: 8px;
              margin-bottom: 2rem;
            }
            a {
              display: inline-block;
              padding: 1rem 2rem;
              background: white;
              color: #667eea;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              transition: transform 0.2s;
            }
            a:hover {
              transform: translateY(-2px);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔒 License Required</h1>
            <p>This site requires a valid license to operate.</p>
            <div class="reason">
              <strong>Reason:</strong> ${validation.reason}
            </div>
            <a href="https://www.elevateforhumanity.org/shop">Purchase License</a>
          </div>
        </body>
      </html>
      `,
      {
        status: 403,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }

  // License is valid - allow request
  const response = NextResponse.next();

  // Add license info to headers for debugging
  response.headers.set('X-License-Tier', validation.tier || 'unknown');
  response.headers.set('X-License-Valid', 'true');

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
