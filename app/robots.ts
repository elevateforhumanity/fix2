import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/(dashboard)/',
          '/(partner)/',
          '/workforce-board/',
          '/staff-portal/',
          '/dev-admin/',
        ],
      },
    ],
    sitemap: 'https://www.elevateforhumanity.org/sitemap.xml',
  };
}
