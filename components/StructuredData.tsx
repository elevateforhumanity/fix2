export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    legalName: '2EXCLUSIVE LLC-S',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/assets/logo-efh.svg',
    description:
      'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'UEI',
      value: 'VX2GK5S8SZH8'
    },
    founder: {
      '@type': 'Person',
      name: 'Elizabeth Lene Greene'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7009 East 56th Street, Suite EE1',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46226',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+1-317-314-3757',
      email: 'Elevate4humanityedu@gmail.com',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61571046346179',
      'https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/',
      'https://x.com/Elevate4Humani1',
      'https://www.youtube.com/@elevateforhumanity',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
