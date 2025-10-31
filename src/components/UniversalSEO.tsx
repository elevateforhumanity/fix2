import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface UniversalSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

/**
 * Universal SEO component that provides default meta tags for all pages
 * Can be overridden with custom props
 */
export default function UniversalSEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
}: UniversalSEOProps) {
  const location = useLocation();

  const pageTitle = title || generateTitleFromRoute(location.pathname);
  const pageDescription = description;
  const pageKeywords = keywords;
  const pageImage = image;
  const canonicalUrl = `https://www.elevateforhumanity.org${location.pathname}`;

  return (
    <Helmet>
      {title && <title>{pageTitle} - Elevate for Humanity</title>}
      {title && (
        <meta name="title" content={`${pageTitle} - Elevate for Humanity`} />
      )}
      {description && <meta name="description" content={pageDescription} />}
      {keywords && <meta name="keywords" content={pageKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {type && <meta property="og:type" content={type} />}
      <meta property="og:url" content={canonicalUrl} />
      {title && (
        <meta
          property="og:title"
          content={`${pageTitle} - Elevate for Humanity`}
        />
      )}
      {description && (
        <meta property="og:description" content={pageDescription} />
      )}
      {image && <meta property="og:image" content={pageImage} />}
      <meta property="og:site_name" content="Elevate for Humanity" />
    </Helmet>
  );
}

/**
 * Generate a readable title from the route path
 */
function generateTitleFromRoute(pathname: string): string {
  // Remove leading slash and split by slashes
  const parts = pathname.replace(/^\//, '').split('/');

  // Get the last part (most specific)
  const lastPart = parts[parts.length - 1] || 'Home';

  // Convert kebab-case or snake_case to Title Case
  return lastPart
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
