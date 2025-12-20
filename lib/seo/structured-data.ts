// Schema.org Structured Data for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    alternateName: 'Elevate for Humanity Technical & Career Institute',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/images/logo.png',
    description: 'DOL-approved workforce development and career training programs in Indianapolis, Indiana.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8888 Keystone Crossing, Suite 1300',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46240',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-317-314-3757',
      contactType: 'Admissions',
      email: 'info@elevateforhumanity.org',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevate-for-humanity',
    ],
  };
}

export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
  duration: string;
  cost: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
      sameAs: 'https://www.elevateforhumanity.org',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      duration: course.duration,
      price: course.cost,
      priceCurrency: 'USD',
    },
    url: course.url,
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
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
