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

// Import Inter for clean, modern sans-serif
import { Inter } from 'next/font/google';

// Modern sans-serif font for the entire site
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ],
});

// Professional serif font for specific use cases
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  display: 'optional',
  weight: ['400', '700'],
  variable: '--font-serif',
  fallback: ['Georgia', 'serif'],
});

// Viewport configuration (separate from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Cache bust: 2025-12-18T00:08:00Z
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'
  ),
  title:
    'Free Career Training Indianapolis | WIOA Programs Indiana | Elevate for Humanity',
  description:
    '100% FREE career training in Indianapolis. WIOA-funded programs in HVAC, healthcare, barbering, and trades. No tuition, no debt. Job placement assistance. Start your career today in Marion County, Indiana.',
  keywords: [
    'free career training Indianapolis',
    'WIOA programs Indiana',
    'free job training Marion County',
    'HVAC training Indianapolis',
    'barber school Indianapolis',
    'healthcare training Indiana',
    'free trade school Indianapolis',
    'workforce development Indianapolis',
    'apprenticeship programs Indiana',
    'free CNA training Indianapolis',
    'free CDL training Indiana',
    'job placement Indianapolis',
    'career change Indianapolis',
    'second chance jobs Indiana',
    'reentry programs Indianapolis',
    'free esthetician school Indianapolis',
    'WIOA eligible programs',
    'WorkOne Indianapolis',
    'free vocational training Indiana',
    'paid training programs Indianapolis',
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
    title:
      'Free Career Training Indianapolis | 100% WIOA Funded | Elevate for Humanity',
    description:
      '100% FREE career training in Indianapolis, IN. WIOA-funded HVAC, healthcare, barbering & trade programs. No tuition, no debt. Job placement guaranteed. Located at 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/heroes/hero-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Career Training Indianapolis - WIOA Programs Indiana',
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
        {/* Preload critical assets to prevent FOUC */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
        className={`${inter.variable} ${libreBaskerville.variable} font-sans antialiased bg-white`}
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
        <InvisibleWatermark
          owner="Elizabeth L. Greene / Elevate for Humanity"
          siteId="EFH-ORIGINAL-2024"
        />
        <DMCATrackingPixel />
        <ScraperDetection />
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
