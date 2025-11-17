// Generate JSON-LD structured data for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate Connects Directory',
    description: 'WIOA-funded workforce training programs in Wisconsin',
    url: 'https://elevateconnects.org',
    logo: 'https://elevateconnects.org/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Milwaukee',
      addressRegion: 'WI',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-608-555-0100',
      contactType: 'Customer Service',
      email: 'info@elevateconnects.org',
    },
    sameAs: [
      'https://facebook.com/elevateconnects',
      'https://twitter.com/elevateconnects',
      'https://linkedin.com/company/elevateconnects',
    ],
  };
}

export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
  duration?: string;
  cost?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      duration: course.duration,
    },
    offers: {
      '@type': 'Offer',
      price: course.cost === 'WIOA Funded' ? '0' : course.cost,
      priceCurrency: 'USD',
    },
  };
}

export function generateJobPostingSchema(job: {
  title: string;
  description: string;
  location: string;
  salary?: string;
  datePosted: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'YEAR',
      },
    } : undefined,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Elevate Connects Directory',
    },
  };
}
