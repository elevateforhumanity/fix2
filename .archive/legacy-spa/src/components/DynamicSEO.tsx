// =============================
// File: src/components/DynamicSEO.tsx
// Description: Dynamic SEO component with React Helmet for per-page optimization
// =============================
import { Helmet } from 'react-helmet-async';

export interface DynamicSEOProps {
  // Basic SEO
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;

  // Open Graph
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;

  // Structured Data
  structuredData?: Record<string, any>;

  // Additional
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_TITLE =
  'Elevate for Humanity LMS | Workforce Training & Apprenticeship Platform';
const DEFAULT_DESCRIPTION =
  'Enterprise-grade LMS for workforce training, apprenticeships, and government programs. Built with React 19, Supabase, and Stripe Connect. 106+ certifications, 92% job placement.';
const DEFAULT_KEYWORDS = [
  'React LMS',
  'Workforce Development',
  'Apprenticeship',
  'DOL Compliance',
  'ETPL Provider',
  'Career Training',
  'Online Learning',
  'Elevate for Humanity',
];
const SITE_URL = 'https://elevateproduction.netlify.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function DynamicSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  structuredData,
  noindex = false,
  nofollow = false,
}: DynamicSEOProps) {
  // Build full title
  const fullTitle = title ? `${title} | Elevate for Humanity` : DEFAULT_TITLE;

  // Use provided or default description
  const metaDescription = description || DEFAULT_DESCRIPTION;

  // Combine keywords
  const allKeywords = keywords
    ? [...DEFAULT_KEYWORDS, ...keywords]
    : DEFAULT_KEYWORDS;

  // Build canonical URL
  const canonicalUrl = canonical
    ? `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : SITE_URL;

  // Use provided or default OG image
  const ogImageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE;

  // Build robots meta
  const robotsContent =
    noindex || nofollow
      ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
      : 'index,follow';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsContent} />
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content={ogImageWidth.toString()} />
      <meta property="og:image:height" content={ogImageHeight.toString()} />
      <meta property="og:site_name" content="Elevate for Humanity" />
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// =============================
// Helper Functions for Common Schemas
// =============================

export function createCourseSchema(course: {
  title: string;
  description: string;
  url: string;
  image?: string;
  duration?: string;
  price?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    url: course.url,
    image: course.image,
    provider: {
      '@type': 'Organization',
      name: 'Elevate for Humanity',
      url: 'https://elevateproduction.netlify.app',
    },
    ...(course.duration && { timeRequired: course.duration }),
    ...(course.price !== undefined && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'USD',
      },
    }),
  };
}

export function createProgramSchema(program: {
  title: string;
  description: string;
  url: string;
  image?: string;
  courses?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: program.title,
    description: program.description,
    url: program.url,
    image: program.image,
    provider: {
      '@type': 'Organization',
      name: 'Elevate for Humanity',
      url: 'https://elevateproduction.netlify.app',
    },
    ...(program.courses && { numberOfCourses: program.courses }),
  };
}

export function createArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'Elevate for Humanity',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elevate for Humanity',
      url: 'https://elevateproduction.netlify.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elevateproduction.netlify.app/logo.png',
      },
    },
  };
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
