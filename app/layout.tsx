import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './ui-fixes.css';
import '@/branding/brand.css';
import '@/styles/tiktok-animations.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';
import StructuredData from '@/components/StructuredData';
import CourseraStyleHeader from '@/components/CourseraStyleHeader';
import CourseraStyleFooter from '@/components/CourseraStyleFooter';
import { ElevateChatWidget } from '@/components/ElevateChatWidget';
import { CookieBanner } from '@/components/CookieBanner';
import { Toaster } from 'react-hot-toast';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: 'Elevate for Humanity | 100% Free Career Training',
    description:
      '100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting in Marion County, Indiana.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.elevateforhumanity.org/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - 100% Free Career Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity | 100% Free Career Training',
    description: '100% FREE career training through WIOA, WRG, and JRI funding. No tuition, no debt. Real jobs waiting.',
    images: ['https://www.elevateforhumanity.org/og-image.svg'],
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
      <body className={`${inter.className} antialiased bg-white`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <FacebookPixel />
        <CourseraStyleHeader />
        <main id="main-content">{children}</main>
        <CourseraStyleFooter />
        <ElevateChatWidget />
        <CookieBanner />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontSize: "0.875rem",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
