import { NextResponse } from 'next/server';

const states = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
  'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire',
  'new-jersey', 'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota',
  'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west-virginia',
  'wisconsin', 'wyoming'
];

export async function GET() {
  const baseUrl = 'https://elevateforhumanity.org';
  
  const urls = [
    // Main pages
    { loc: `${baseUrl}/tax-filing`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/tax-filing/start`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/tax-filing/join-team`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/tax-filing/locations`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/supersonic-cash`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/supersonic-cash/apply`, priority: '0.8', changefreq: 'daily' },
    
    // State pages
    ...states.map(state => ({
      loc: `${baseUrl}/tax-filing/locations/${state}`,
      priority: '0.8',
      changefreq: 'weekly'
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
