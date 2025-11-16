import type { Metadata } from 'next';
import './globals.css';
import '@/branding/brand.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';
import StructuredData from '@/components/StructuredData';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import OfflineIndicator from '@/components/OfflineIndicator';
import NotificationPrompt from '@/components/NotificationPrompt';

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
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo-efh.svg" />
        <meta name="theme-color" content="#2563EB" />
        <StructuredData />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <FacebookPixel />
        <ServiceWorkerRegistration />
        <OfflineIndicator />
        <NotificationPrompt />
        {children}
      </body>
    </html>
  );
}
