/**
 * Structured Data (JSON-LD) for SEO
 * Helps Google understand and display our content better
 */

import type { Organization, Course, EducationalOrganization, WebSite, BreadcrumbList } from 'schema-dts';

/**
 * Organization Schema
 * Shows up in Google Knowledge Panel
 */
export function getOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    '@id': 'https://www.elevateforhumanity.org/#organization',
    name: 'Elevate for Humanity',
    legalName: 'Elevate for Humanity Career & Technical Institute',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/logo.png',
    description: '100% government-funded career training in healthcare, skilled trades, and beauty. WIOA-approved programs with job placement assistance.',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8888 Keystone Crossing, Suite 1300',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46240',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-317-314-3757',
        contactType: 'customer service',
        email: 'info@elevateforhumanity.org',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-317-314-3757',
        contactType: 'admissions',
        email: 'admissions@elevateforhumanity.org',
        areaServed: 'US',
      },
    ],
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevateforhumanity',
      'https://www.instagram.com/elevateforhumanity',

    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Educational Organization Schema
 * Specific to training/education providers
 */
export function getEducationalOrganizationSchema(): EducationalOrganization {
  return {
    '@type': 'EducationalOrganization',
    '@id': 'https://www.elevateforhumanity.org/#educationalorganization',
    name: 'Elevate for Humanity',
    url: 'https://www.elevateforhumanity.org',
    description: 'WIOA-approved career training center offering 28+ programs in healthcare, skilled trades, and beauty.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8888 Keystone Crossing, Suite 1300',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46240',
      addressCountry: 'US',
    },
    telephone: '+1-317-314-3757',
    email: 'info@elevateforhumanity.org',
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'WIOA Approved Provider',
        recognizedBy: {
          '@type': 'Organization',
          name: 'U.S. Department of Labor',
        },
      },
    ],
  };
}

/**
 * Website Schema
 * Helps with site-wide search
 */
export function getWebSiteSchema(): WebSite {
  return {
    '@type': 'WebSite',
    '@id': 'https://www.elevateforhumanity.org/#website',
    url: 'https://www.elevateforhumanity.org',
    name: 'Elevate for Humanity',
    description: '100% funded career training programs',
    publisher: {
      '@id': 'https://www.elevateforhumanity.org/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.elevateforhumanity.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Course Schema
 * For individual program pages
 */
export function getCourseSchema(program: {
  name: string;
  slug: string;
  description: string;
  duration: string;
  hours: number;
  cost: number;
  certifications: string[];
  jobTitles: string[];
  salary: { min: number; max: number };
  provider: string;
}): Course {
  return {
    '@type': 'Course',
    '@id': `https://www.elevateforhumanity.org/programs/${program.slug}#course`,
    name: program.name,
    description: program.description,
    provider: {
      '@type': 'Organization',
      name: program.provider || 'Elevate for Humanity',
      sameAs: 'https://www.elevateforhumanity.org',
    },
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price: program.cost.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'blended'],
      courseWorkload: `PT${program.hours}H`,
      instructor: {
        '@type': 'Person',
        name: 'Certified Instructors',
      },
    },
    educationalCredentialAwarded: program.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: cert,
    })),
    occupationalCredentialAwarded: program.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert,
    })),
    timeToComplete: program.duration,
    totalHistoricalEnrollment: 500, // Update with real data
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '45',
    },
  };
}

/**
 * Breadcrumb Schema
 * Shows breadcrumb trail in search results
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]): BreadcrumbList {
  return {
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
 * FAQ Schema
 * Shows FAQ accordion in search results
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Job Posting Schema
 * For career outcomes
 */
export function getJobPostingSchema(job: {
  title: string;
  description: string;
  salary: { min: number; max: number };
  location: string;
}) {
  return {
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Various Employers',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressRegion: 'IN',
        addressCountry: 'US',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: 'YEAR',
      },
    },
    employmentType: 'FULL_TIME',
    educationRequirements: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
    },
  };
}

/**
 * Helper to inject structured data into page
 */
export function injectStructuredData(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      ...data,
    }),
  };
}

/**
 * Complete program page structured data
 */
export function getProgramPageStructuredData(program: {
  name: string;
  slug: string;
  description: string;
  duration: string;
  hours: number;
  cost: number;
  certifications: string[];
  jobTitles: string[];
  salary: { min: number; max: number };
  provider: string;
  prerequisites: string[];
  outcomes: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      getCourseSchema(program),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://www.elevateforhumanity.org' },
        { name: 'Programs', url: 'https://www.elevateforhumanity.org/programs' },
        { name: program.name, url: `https://www.elevateforhumanity.org/programs/${program.slug}` },
      ]),
    ],
  };
}
