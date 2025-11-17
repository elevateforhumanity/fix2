import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './ui-fixes.css';
import '@/branding/brand.css';
import '@/styles/tiktok-animations.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';
import StructuredData from '@/components/StructuredData';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import OfflineIndicator from '@/components/OfflineIndicator';
import NotificationPrompt from '@/components/NotificationPrompt';
import { ElevateChatWidget } from '@/components/ElevateChatWidget';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// Cache bust: 2025-11-16-05:36
export const metadata: Metadata = {
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
  manifest: '/manifest.json',
  openGraph: {
    title: 'Elevate for Humanity | Workforce Training & Career Development',
    description:
      'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
    url: 'https://elevateconnectsdirectory.org',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://elevateconnectsdirectory.org/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Workforce Training',
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
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so',
    other: {
      'msvalidate.01': 'add-your-bing-verification-code-here',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/assets/logo-efh.svg" />
        <meta name="theme-color" content="#2563EB" />
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <FacebookPixel />
        <ServiceWorkerRegistration />
        <OfflineIndicator />
        <NotificationPrompt />
        <ElevateChatWidget />
        <CookieConsent />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
