import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force cache bust - build timestamp
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      'recharts',
    ],
    webpackBuildWorker: true,
    // optimizeCss: true, // Disabled - requires critters package
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      },
    };
    return config;
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self' https://burst.shopifycdn.com https://images.pexels.com; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 180,
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.node'],
  },
  
  // Redirects for consolidated routes
  async redirects() {
    return [
      // Dashboard consolidation
      { source: '/portal/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/student/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/students/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/learners/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/program-holder-portal/:path*', destination: '/program-holder/:path*', permanent: true },
      { source: '/admin-portal/:path*', destination: '/admin/:path*', permanent: true },
      { source: '/dashboard', destination: '/lms/dashboard', permanent: false },
      
      // Tax consolidation
      { source: '/tax-filing/:path*', destination: '/tax/:path*', permanent: true },
      { source: '/tax-services/:path*', destination: '/tax/:path*', permanent: true },
      { source: '/tax-software/:path*', destination: '/tax/:path*', permanent: true },
      { source: '/vita/:path*', destination: '/tax/:path*', permanent: true },
      
      // Program consolidation
      { source: '/programs-catalog/:path*', destination: '/programs/:path*', permanent: true },
      { source: '/program-finder/:path*', destination: '/programs/:path*', permanent: true },
      { source: '/compare-programs/:path*', destination: '/programs/:path*', permanent: true },
      
      // Career consolidation
      { source: '/career-center/:path*', destination: '/career-services/:path*', permanent: true },
      { source: '/career-fair/:path*', destination: '/career-services/:path*', permanent: true },
      
      // Partner consolidation
      { source: '/partner-with-us/:path*', destination: '/partners/:path*', permanent: true },
      { source: '/partner-application/:path*', destination: '/partners/:path*', permanent: true },
      { source: '/partner-courses/:path*', destination: '/partners/:path*', permanent: true },
      { source: '/partner-playbook/:path*', destination: '/partners/:path*', permanent: true },
      
      // Auth consolidation
      { source: '/forgotpassword', destination: '/auth/forgot-password', permanent: true },
      { source: '/resetpassword', destination: '/auth/reset-password', permanent: true },
      { source: '/verifyemail', destination: '/auth/verify-email', permanent: true },
      
      // Legal consolidation
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },
      
      // Verify consolidation
      { source: '/verifycertificate/:path*', destination: '/verify/:path*', permanent: true },
      
      // Misc redirects
      { source: '/for-students', destination: '/lms', permanent: true },
      { source: '/dashboards/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/portals/:path*', destination: '/lms/:path*', permanent: true },
      
      // Removed businesses
      { source: '/serene-comfort-care/:path*', destination: '/programs', permanent: true },
      { source: '/kingdom-konnect/:path*', destination: '/programs', permanent: true },
      { source: '/urban-build-crew/:path*', destination: '/programs', permanent: true },
      { source: '/selfish-inc/:path*', destination: '/rise-foundation/:path*', permanent: true },
      
      // Removed routes
      { source: '/financial-aid/:path*', destination: '/funding/:path*', permanent: true },
      { source: '/forums/:path*', destination: '/community/:path*', permanent: true },
      { source: '/alumni/:path*', destination: '/community/:path*', permanent: true },
      { source: '/board/:path*', destination: '/admin/:path*', permanent: true },
      { source: '/receptionist/:path*', destination: '/staff-portal/:path*', permanent: true },
      { source: '/delegate/:path*', destination: '/admin/:path*', permanent: true },
      { source: '/study-groups/:path*', destination: '/community/:path*', permanent: true },
      { source: '/forum/:path*', destination: '/community/:path*', permanent: true },
      { source: '/volunteer/:path*', destination: '/community/:path*', permanent: true },
      { source: '/news/:path*', destination: '/blog/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, must-revalidate',
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
            value: 'public, max-age=60, must-revalidate',
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
            value: 'noai, noimageai',
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
        destination: 'https://elevateforhumanity.org/:path*',
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

// Sentry configuration
const sentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
