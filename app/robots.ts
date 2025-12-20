import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/student/',
          '/portal/',
          '/delegate/',
          '/lms/profile',
          '/lms/messages',
          '/lms/notifications',
          '/_next/',
          '/private/',
        ],
      },
      // Block AI scrapers and training bots
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'Google-Extended',
          'PerplexityBot',
          'Omgilibot',
          'FacebookBot',
          'Applebot-Extended',
          'Bytespider',
          'Diffbot',
          'ImagesiftBot',
          'Scrapy',
          'python-requests',
          'curl',
          'wget',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'}/sitemap.xml`,
  };
}
