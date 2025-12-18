/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.netlify.app' },
      { protocol: 'https', hostname: '**.cloudflareusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'cms-artifacts.artlist.io' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noai, noimageai, nosnippet, noarchive',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://api.stripe.com wss://*.supabase.co",
              "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://js.stripe.com",
              "media-src 'self' https: blob:",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect non-www to www for SEO consolidation
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'elevateforhumanity.org',
          },
        ],
        destination: 'https://www.elevateforhumanity.org/:path*',
        permanent: true,
      },

      // ===== DUPLICATE URL CONSOLIDATION =====
      // Privacy Policy - Consolidate to /privacy-policy
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/legal/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },

      // Terms of Service - Consolidate to /terms-of-service
      {
        source: '/terms',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/legal/terms',
        destination: '/terms-of-service',
        permanent: true,
      },

      // Refund Policy - Consolidate to /refund-policy
      {
        source: '/refundpolicy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/refunds',
        destination: '/refund-policy',
        permanent: true,
      },

      // AI Tutor - Consolidate to /ai-tutor
      {
        source: '/aitutor',
        destination: '/ai-tutor',
        permanent: true,
      },

      // Kingdom Konnect - Consolidate to /kingdom-konnect
      {
        source: '/kingdomkonnect',
        destination: '/kingdom-konnect',
        permanent: true,
      },

      // Serene Comfort Care - Consolidate to /serene-comfort-care
      {
        source: '/serenecomfortcare',
        destination: '/serene-comfort-care',
        permanent: true,
      },

      // Urban Build Crew - Consolidate to /urban-build-crew
      {
        source: '/urbanbuildcrew',
        destination: '/urban-build-crew',
        permanent: true,
      },

      // Supersonic Fast Cash - Consolidate to /supersonic-fast-cash
      {
        source: '/supersonic',
        destination: '/supersonic-fast-cash',
        permanent: true,
      },
      {
        source: '/supersonicfastcash',
        destination: '/supersonic-fast-cash',
        permanent: true,
      },
      {
        source: '/supersonic-cash',
        destination: '/supersonic-fast-cash',
        permanent: true,
      },

      // Programs - Consolidate to /programs
      {
        source: '/programs-lms',
        destination: '/programs',
        permanent: true,
      },
      {
        source: '/programs-full',
        destination: '/programs',
        permanent: true,
      },

      // ===== PROGRAM SLUG FIXES =====
      {
        source: '/programs/medical-assistant',
        destination: '/programs/direct-support-professional',
        permanent: true,
      },
      {
        source: '/programs/peer-support-professional',
        destination: '/programs/peer-recovery-coach',
        permanent: true,
      },
      {
        source: '/programs/it',
        destination: '/programs/workforce-readiness',
        permanent: true,
      },
      {
        source: '/programs/tax-prep',
        destination: '/programs/tax-prep-financial-services',
        permanent: true,
      },
      {
        source: '/programs/public-safety-reentry-specialist',
        destination: '/programs/peer-recovery-coach',
        permanent: true,
      },
      {
        source: '/programs/hvac',
        destination: '/programs/hvac-technician',
        permanent: true,
      },
      {
        source: '/programs/hvac-tech',
        destination: '/programs/hvac-technician',
        permanent: true,
      },
      {
        source: '/programs/barber',
        destination: '/programs/barber-apprenticeship',
        permanent: true,
      },
      {
        source: '/programs/esth',
        destination: '/programs/esthetics-apprenticeship',
        permanent: true,
      },
      {
        source: '/programs/esthetician',
        destination: '/programs/professional-esthetician',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
