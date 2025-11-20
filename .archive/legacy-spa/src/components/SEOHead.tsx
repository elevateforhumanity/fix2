/**
 * SEO Head Component
 * Comprehensive SEO meta tags and structured data
 */

import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import {
  injectStructuredData,
  removeStructuredData,
} from '../utils/structuredData';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course';
  structuredData?: any;
  noindex?: boolean;
  canonical?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  structuredData,
  noindex = false,
  canonical,
}: SEOHeadProps) {
  const siteUrl = 'https://elevateforhumanity.org';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullTitle = title.includes('Elevate for Humanity')
    ? title
    : `${title} | Elevate for Humanity`;

  // Inject structured data
  useEffect(() => {
    if (structuredData) {
      injectStructuredData(structuredData);
    }

    return () => {
      if (structuredData) {
        removeStructuredData();
      }
    };
  }, [structuredData]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && <link rel="canonical" href={fullUrl} />}
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Elevate for Humanity" />
      <meta property="og:locale" content="en_US" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@elevate4humanity" />
      <meta name="twitter:creator" content="@elevate4humanity" />
      {/* Additional Meta Tags */}
      <meta name="author" content="Elevate for Humanity" />
      <meta name="publisher" content="Elevate for Humanity" />
      <meta name="copyright" content="© 2025 Elevate for Humanity" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      {/* Mobile Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Elevate for Humanity" />
      {/* Theme Color */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      {/* Geo Tags */}
      <meta name="geo.region" content="US-IN" />
      <meta name="geo.placename" content="Indianapolis" />
      <meta name="geo.position" content="39.7684;-86.1581" />
      <meta name="ICBM" content="39.7684, -86.1581" />
    </Helmet>
  );
}
