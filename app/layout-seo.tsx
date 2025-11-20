import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.elevateforhumanity.org'),
  title: {
    default: 'Elevate for Humanity - Workforce Training & Career Development',
    template: '%s | Elevate for Humanity',
  },
  description: 'Transform your career with funded workforce training programs. Barber apprenticeships, HVAC, medical assistant, CDL training, and more. 100% funded through WIOA, WRG, and workforce grants.',
  keywords: [
    'workforce training',
    'career development',
    'WIOA programs',
    'WRG training',
    'barber apprenticeship',
    'HVAC training',
    'medical assistant program',
    'CDL training',
    'truck driving school',
    'building maintenance',
    'funded training programs',
    'job training',
    'vocational training',
    'career change',
    'workforce development',
    'Indianapolis training',
    'Indiana workforce',
  ],
  authors: [{ name: 'Elevate for Humanity' }],
  creator: 'Elevate for Humanity',
  publisher: 'Elevate for Humanity',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    title: 'Elevate for Humanity - Workforce Training & Career Development',
    description: 'Transform your career with funded workforce training programs. 100% funded through WIOA, WRG, and workforce grants.',
    images: [
      {
        url: 'https://www.elevateforhumanity.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Workforce Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity - Workforce Training & Career Development',
    description: 'Transform your career with funded workforce training programs.',
    images: ['https://www.elevateforhumanity.org/og-image.jpg'],
    creator: '@elevateforhumanity',
  },
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
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Elevate for Humanity',
  description: 'Workforce training and career development programs',
  url: 'https://www.elevateforhumanity.org',
  logo: 'https://www.elevateforhumanity.org/logo.png',
  sameAs: [
    'https://www.facebook.com/elevateforhumanity',
    'https://www.linkedin.com/company/elevateforhumanity',
    'https://twitter.com/elevateforhumanity',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indianapolis',
    addressRegion: 'IN',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX',
    contactType: 'Customer Service',
    email: 'elevateforhumanity@gmail.com',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    price: '0',
    description: '100% funded workforce training programs',
  },
};
