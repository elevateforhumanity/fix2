import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
const SITE_NAME = 'Elevate For Humanity';
const DEFAULT_IMAGE = '/images/og-default.jpg';

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    keywords = [],
    noindex = false,
  } = config;

  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const metadata: Metadata = {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [
      'workforce development',
      'career training',
      'free training programs',
      'job placement',
      'certifications',
      'apprenticeships',
      'WIOA',
      'career services',
      ...keywords,
    ],
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@elevate4humanity',
      site: '@elevate4humanity',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  };

  return metadata;
}

export function generateStructuredData(config: {
  type: 'Organization' | 'Course' | 'Article' | 'BreadcrumbList' | 'FAQPage' | 'WebPage';
  data: any;
}) {
  const { type, data } = config;

  const baseContext = 'https://schema.org';

  switch (type) {
    case 'Organization':
      return {
        '@context': baseContext,
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description: 'Free workforce development and career training programs',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'info@elevateforhumanity.org',
        },
        sameAs: [
          'https://www.facebook.com/elevate4humanity',
          'https://www.twitter.com/elevate4humanity',
          'https://www.linkedin.com/company/elevate-for-humanity',
        ],
        ...data,
      };

    case 'Course':
      return {
        '@context': baseContext,
        '@type': 'Course',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        ...data,
      };

    case 'Article':
      return {
        '@context': baseContext,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        author: {
          '@type': 'Person',
          name: data.author || SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logo.png`,
          },
        },
        ...data,
      };

    case 'BreadcrumbList':
      return {
        '@context': baseContext,
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      };

    case 'FAQPage':
      return {
        '@context': baseContext,
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      };

    case 'WebPage':
      return {
        '@context': baseContext,
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: `${SITE_URL}${data.path}`,
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...data,
      };

    default:
      return null;
  }
}

export function generateBreadcrumbs(path: string) {
  const segments = path.split('/').filter(Boolean);
  const items = [{ name: 'Home', path: '/' }];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    items.push({ name, path: currentPath });
  });

  return items;
}
