import type { Metadata, Viewport } from 'next';
// Image asset: /images/programs-new/program-11.jpg
import { Libre_Baskerville } from 'next/font/google';
import './globals.css';
import './ui-fixes.css';
import './print.css';
import './mobile-fixes.css';
import './animations.css';
import '@/branding/brand.css';
import '@/styles/tiktok-animations.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';
import StructuredData from '@/components/StructuredData';
import { MainNav } from '@/components/layout/MainNav';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import { SiteFooter } from '@/components/layout/Footer';
import SiteHeader from '@/components/site/SiteHeader';
import NewSiteFooter from '@/components/site/SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ElevateChatWidget } from '@/components/ElevateChatWidget';
import AILiveChat from '@/components/chat/AILiveChat';
import { CookieBanner } from '@/components/CookieBanner';
import { Toaster } from 'react-hot-toast';
// import PWAInstallPrompt from '@/components/PWAInstallPrompt'; // Disabled - causing issues
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import {
  InvisibleWatermark,
  DMCATrackingPixel,
} from '@/components/InvisibleWatermark';
import { ScraperDetection } from '@/components/ScraperDetection';
import { CopyrightProtection } from '@/components/CopyrightProtection';
import { SecurityMonitor, SecurityBadge } from '@/components/SecurityMonitor';

// Professional serif font for government/institutional compliance
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-serif',
});

// Viewport configuration (separate from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Cache bust: 2025-11-22T09:14:55Z
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'
  ),
  title: 'Elevate for Humanity | Workforce Training & Career Development',
  description:
    'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
  keywords: [
    'workforce training',
    'career development',
    'WIOA',
    'job training',
    'technical education',
    'apprenticeships',
    'Marion County',
    'Indiana',
  ],
  authors: [{ name: 'Elevate for Humanity' }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
  openGraph: {
    title: 'Elevate for Humanity | 100% Free Career Training',
    description:
      '100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting in 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/heroes/hero-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - 100% Free Career Training',
      },
    ],
  },

  facebook: {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Elevate',
  },
  verification: {
    google: '9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <meta name="theme-color" content="#10b981" />
        <StructuredData />
      </head>
      <body
        className={`${libreBaskerville.className} antialiased bg-white`}
        style={{ fontSize: '16px' }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brandPrimary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <FacebookPixel />
        <SecurityMonitor />
        <CopyrightProtection />
        <InvisibleWatermark owner="Elizabeth L. Greene / Elevate for Humanity" siteId="EFH-ORIGINAL-2024" />
        <DMCATrackingPixel />
        <ScraperDetection />
        <SecurityBadge />
        <SiteHeader />
        <Breadcrumbs />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <NewSiteFooter />
        <AILiveChat />
        <CookieBanner />
        {/* <PWAInstallPrompt /> */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontSize: '0.875rem',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
// Cache bust: 2025-12-09T14:30:00Z
// Force rebuild: VIDEO BANNER DEPLOYMENT
// Force deployment: 2025-12-09T14:30:00Z
