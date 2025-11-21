// Generate JSON-LD structured data for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    description: 'WIOA, WRG, and JRI-funded workforce training programs in Marion County and Indianapolis, Indiana',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46204',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-317-314-3757',
      contactType: 'Customer Service',
      email: 'Elevate4humanityedu@gmail.com',
    },
    sameAs: [
      'https://facebook.com/elevateforhumanity',
      'https://twitter.com/elevate4humanity',
      'https://linkedin.com/company/elevateforhumanity',
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
      name: 'Elevate for Humanity',
    },
  };
}
