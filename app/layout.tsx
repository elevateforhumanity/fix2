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
import { CookieBanner } from '@/components/CookieBanner';
import CourseraStyleHeader from '@/components/CourseraStyleHeader';
import CourseraStyleFooter from '@/components/CourseraStyleFooter';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// SEO Optimized - Updated 2025-11-20
export const metadata: Metadata = {
  metadataBase: new URL('https://www.elevateforhumanity.org'),
  title: {
    default: 'Elevate for Humanity - Workforce Training & Career Development Programs',
    template: '%s | Elevate for Humanity',
  },
  description:
    'Transform your career with 100% funded workforce training programs. Barber apprenticeships, HVAC, medical assistant, CDL training & more. WIOA, WRG & workforce grants available. Indianapolis, Indiana.',
  keywords: [
    'workforce training Indianapolis',
    'career development Indiana',
    'WIOA programs',
    'WRG training',
    'barber apprenticeship Indianapolis',
    'HVAC training Indiana',
    'medical assistant program',
    'CDL training Indianapolis',
    'truck driving school',
    'building maintenance training',
    'funded training programs',
    'free job training',
    'vocational training Indiana',
    'career change programs',
    'workforce development',
    'JRI training',
    'EmployIndy programs',
    'DOL apprenticeships',
  ],
  authors: [{ name: 'Elevate for Humanity' }],
  creator: 'Elevate for Humanity',
  publisher: 'Elevate for Humanity',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Elevate for Humanity - Workforce Training & Career Development Programs',
    description:
      'Transform your career with 100% funded workforce training. Barber, HVAC, medical assistant, CDL & more. Indianapolis, Indiana.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.elevateforhumanity.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Workforce Training Programs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity - Workforce Training Programs',
    description: 'Transform your career with 100% funded workforce training programs.',
    images: ['https://www.elevateforhumanity.org/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
  verification: {
    google: '9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so',
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
        <ServiceWorkerRegistration />
        <OfflineIndicator />
        <NotificationPrompt />
        <CourseraStyleHeader />
        <main id="main-content">{children}</main>
        <CourseraStyleFooter />
        <ElevateChatWidget />
        <CookieConsent />
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
