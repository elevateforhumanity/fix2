import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';
import StructuredData from '@/components/StructuredData';

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
        {children}
      </body>
    </html>
  );
}
