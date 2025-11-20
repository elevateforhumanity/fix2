/**
 * Structured Data (Schema.org) for SEO
 * Helps search engines understand our content
 */

export interface Organization {
  '@context': 'https://schema.org';
  '@type': 'Organization' | 'EducationalOrganization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: PostalAddress;
  contactPoint?: ContactPoint[];
  sameAs?: string[];
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  email?: string;
}

export interface Course {
  '@context': 'https://schema.org';
  '@type': 'Course';
  name: string;
  description: string;
  provider: Organization;
  offers?: Offer;
  hasCourseInstance?: CourseInstance[];
}

export interface Offer {
  '@type': 'Offer';
  price: string;
  priceCurrency: string;
  availability: string;
}

export interface CourseInstance {
  '@type': 'CourseInstance';
  courseMode: string;
  duration: string;
  instructor?: Person;
}

export interface Person {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
}

export interface WebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction?: SearchAction;
}

export interface SearchAction {
  '@type': 'SearchAction';
  target: string;
  'query-input': string;
}

export interface BreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

/**
 * Generate organization structured data
 */
export function getOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    url: 'https://elevateforhumanity.org',
    logo: 'https://elevateforhumanity.org/images/Elevate_for_Humanity_logo_81bf0fab.png',
    description:
      'Free workforce training and career development programs through WIOA funding. Offering CNA, Barber, Construction, and Technology training.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-317-314-3757',
        contactType: 'Customer Service',
        email: 'info@elevateforhumanity.org',
      },
    ],
    sameAs: [
      'https://facebook.com/elevateforhumanity',
      'https://linkedin.com/company/elevate-for-humanity',
      'https://youtube.com/@elevateforhumanity',
      'https://instagram.com/elevateforhumanity',
      'https://twitter.com/elevate4humanity',
    ],
  };
}

/**
 * Generate website structured data
 */
export function getWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Elevate for Humanity',
    url: 'https://elevateforhumanity.org',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://elevateforhumanity.org/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate course structured data
 */
export function getCourseSchema(course: {
  name: string;
  description: string;
  duration: number;
  price: number;
  instructor?: { name: string; title: string };
}): Course {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: getOrganizationSchema(),
    offers: {
      '@type': 'Offer',
      price: course.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        duration: `PT${course.duration}H`,
        instructor: course.instructor
          ? {
              '@type': 'Person',
              name: course.instructor.name,
              jobTitle: course.instructor.title,
            }
          : undefined,
      },
    ],
  };
}

/**
 * Generate breadcrumb structured data
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbList {
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

/**
 * Inject structured data into page
 */
export function injectStructuredData(data: any): void {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Remove all structured data scripts
 */
export function removeStructuredData(): void {
  if (typeof window === 'undefined') return;

  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  scripts.forEach((script) => script.remove());
}
