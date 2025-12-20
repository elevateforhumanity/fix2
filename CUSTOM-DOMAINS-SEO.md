# Custom Domains - SEO & Indexing Configuration

## Custom Domains Setup

### Primary Domain

- **Main Site**: www.elevateforhumanity.org
- **Alternate**: elevateforhumanity.org (301 redirect to www)

### Tax Service Domains

1. **SupersonicFastCash.com** → Tax refund advance services
2. **RiseFoundation.org** → Free VITA tax preparation
3. **ElevateForHumanity.org/tax** → General tax services

### Program Domains (Optional)

- **ElevateTraining.org** → Workforce training programs
- **ElevateApprenticeships.org** → DOL apprenticeship programs

---

## DNS Configuration

### For Each Custom Domain:

#### A Records (Point to hosting)

```
Type: A
Name: @
Value: [Your hosting IP]
TTL: 3600
```

#### CNAME Records (www subdomain)

```
Type: CNAME
Name: www
Value: elevateforhumanity.org
TTL: 3600
```

#### TXT Records (Verification)

```
Type: TXT
Name: @
Value: google-site-verification=[your-code]
TTL: 3600
```

---

## Google Search Console Setup

### 1. Add Each Domain Property

**For www.elevateforhumanity.org:**

1. Go to Google Search Console
2. Add Property → Domain Property
3. Enter: elevateforhumanity.org
4. Verify via DNS TXT record
5. Submit sitemap: https://www.elevateforhumanity.org/sitemap.xml

**For SupersonicFastCash.com:**

1. Add Property → Domain Property
2. Enter: supersonicfastcash.com
3. Verify via DNS TXT record
4. Submit sitemap: https://supersonicfastcash.com/sitemap.xml

**For RiseFoundation.org:**

1. Add Property → Domain Property
2. Enter: risefoundation.org
3. Verify via DNS TXT record
4. Submit sitemap: https://risefoundation.org/sitemap.xml

### 2. Submit Sitemaps

For each domain, submit:

- Main sitemap: `/sitemap.xml`
- Image sitemap: `/sitemap-images.xml` (if applicable)
- Video sitemap: `/sitemap-videos.xml` (if applicable)

### 3. Request Indexing

**Priority Pages to Index First:**

1. Homepage
2. About page
3. Programs page
4. Contact page
5. Tax services pages
6. Apprenticeship pages
7. Application pages

**How to Request Indexing:**

1. Go to URL Inspection tool
2. Enter URL
3. Click "Request Indexing"
4. Repeat for all priority pages

---

## Robots.txt Configuration

### Main Site (elevateforhumanity.org)

```txt
# Elevate for Humanity - Main Site
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /student/
Disallow: /portal/
Disallow: /delegate/
Disallow: /_next/
Disallow: /private/

# Block AI scrapers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

# Sitemaps
Sitemap: https://www.elevateforhumanity.org/sitemap.xml
Sitemap: https://www.elevateforhumanity.org/sitemap-images.xml

# Crawl-delay for aggressive bots
User-agent: *
Crawl-delay: 1
```

### SupersonicFastCash.com

```txt
# Supersonic Fast Cash - Tax Services
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

# Sitemaps
Sitemap: https://supersonicfastcash.com/sitemap.xml

# Crawl-delay
User-agent: *
Crawl-delay: 1
```

### RiseFoundation.org

```txt
# RISE Foundation - Free Tax Help
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

# Sitemaps
Sitemap: https://risefoundation.org/sitemap.xml

# Crawl-delay
User-agent: *
Crawl-delay: 1
```

---

## Sitemap Configuration

### Dynamic Sitemap Generation

Create `/app/sitemap.xml/route.ts` for each domain:

```typescript
import { MetadataRoute } from 'next';

export async function GET() {
  const baseUrl = 'https://www.elevateforhumanity.org';

  const routes = [
    '',
    '/about',
    '/programs',
    '/contact',
    '/apply',
    '/apprenticeships',
    '/tax-services',
    '/supersonic-fast-cash',
    '/rise',
    '/accreditation',
    '/faq',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

---

## Canonical URLs

### Ensure Proper Canonicalization

**In every page metadata:**

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/page-path',
  },
  // ... other metadata
};
```

**For custom domains:**

```typescript
// SupersonicFastCash.com pages
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://supersonicfastcash.com/page-path',
  },
};
```

---

## Structured Data (Schema.org)

### Organization Schema

Add to every page:

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Elevate for Humanity",
  "alternateName": "Elevate for Humanity Technical & Career Institute",
  "url": "https://www.elevateforhumanity.org",
  "logo": "https://www.elevateforhumanity.org/images/logo.png",
  "description": "DOL-approved workforce development and career training programs in Indianapolis, Indiana.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3737 N Meridian St",
    "addressLocality": "Indianapolis",
    "addressRegion": "IN",
    "postalCode": "46208",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-317-314-3757",
    "contactType": "Admissions",
    "email": "info@elevateforhumanity.org",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.facebook.com/elevateforhumanity",
    "https://www.linkedin.com/company/elevateforhumanity",
    "https://www.youtube.com/@elevateforhumanity"
  ],
  "accreditedBy": [
    {
      "@type": "Organization",
      "name": "U.S. Department of Labor",
      "identifier": "RAPIDS ID: 2025-IN-132301"
    },
    {
      "@type": "Organization",
      "name": "Indiana Department of Workforce Development",
      "identifier": "INTraining Location ID: 10004621"
    }
  ]
}
```

### LocalBusiness Schema (Tax Services)

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Supersonic Fast Cash",
  "url": "https://supersonicfastcash.com",
  "telephone": "+1-317-314-3757",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7009 E 56th St, Suite EE1",
    "addressLocality": "Indianapolis",
    "addressRegion": "IN",
    "postalCode": "46226",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.8386",
    "longitude": "-86.0586"
  },
  "priceRange": "$49-$149",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ]
}
```

---

## Cross-Domain Linking Strategy

### Internal Links Between Domains

**From Main Site to Tax Sites:**

```html
<a href="https://supersonicfastcash.com" rel="noopener">
  Get Your Tax Refund Today
</a>
```

**From Tax Sites to Main Site:**

```html
<a href="https://www.elevateforhumanity.org/programs" rel="noopener">
  Explore All Programs
</a>
```

### Breadcrumb Navigation

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.elevateforhumanity.org"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tax Services",
      "item": "https://www.elevateforhumanity.org/tax-services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Supersonic Fast Cash",
      "item": "https://supersonicfastcash.com"
    }
  ]
}
```

---

## Google Business Profile

### Main Location

- **Name**: Elevate for Humanity
- **Address**: 8888 Keystone Crossing, Suite 1300, Indianapolis, IN 46240
- **Phone**: 317-314-3757
- **Website**: https://www.elevateforhumanity.org
- **Categories**:
  - Vocational School
  - Training Center
  - Educational Institution
  - Career Counseling Service

### Tax Services Location

- **Name**: Supersonic Fast Cash
- **Address**: 7009 E 56th St, Suite EE1, Indianapolis, IN 46226
- **Phone**: 317-314-3757
- **Website**: https://supersonicfastcash.com
- **Categories**:
  - Tax Preparation Service
  - Financial Service
  - Tax Consultant

---

## Bing Webmaster Tools

### Setup for Each Domain

1. Go to Bing Webmaster Tools
2. Add site
3. Verify via:
   - XML file upload
   - Meta tag
   - DNS TXT record
4. Submit sitemap
5. Configure crawl settings

---

## Social Media Integration

### Open Graph Tags

```html
<meta
  property="og:title"
  content="Elevate for Humanity - Workforce Development"
/>
<meta
  property="og:description"
  content="DOL-approved training programs in Indianapolis"
/>
<meta property="og:url" content="https://www.elevateforhumanity.org" />
<meta property="og:type" content="website" />
<meta
  property="og:image"
  content="https://www.elevateforhumanity.org/images/og-image.jpg"
/>
<meta property="og:site_name" content="Elevate for Humanity" />
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@elevateforhumanity" />
<meta name="twitter:title" content="Elevate for Humanity" />
<meta name="twitter:description" content="DOL-approved training programs" />
<meta
  name="twitter:image"
  content="https://www.elevateforhumanity.org/images/twitter-card.jpg"
/>
```

---

## Monitoring & Analytics

### Google Analytics 4

**Setup for Each Domain:**

```javascript
// Main site
gtag('config', 'G-XXXXXXXXXX', {
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname,
});

// Cross-domain tracking
gtag('config', 'G-XXXXXXXXXX', {
  linker: {
    domains: [
      'elevateforhumanity.org',
      'supersonicfastcash.com',
      'risefoundation.org',
    ],
  },
});
```

### Google Tag Manager

**Container for Each Domain:**

- Main site: GTM-XXXXXX1
- SupersonicFastCash: GTM-XXXXXX2
- RiseFoundation: GTM-XXXXXX3

---

## Indexing Checklist

### Week 1: Setup

- [ ] Configure DNS for all domains
- [ ] Set up SSL certificates (HTTPS)
- [ ] Create robots.txt for each domain
- [ ] Generate sitemaps for each domain
- [ ] Add canonical URLs to all pages
- [ ] Implement structured data (Schema.org)

### Week 2: Verification

- [ ] Verify all domains in Google Search Console
- [ ] Verify all domains in Bing Webmaster Tools
- [ ] Submit sitemaps to Google
- [ ] Submit sitemaps to Bing
- [ ] Set up Google Analytics 4
- [ ] Configure Google Tag Manager

### Week 3: Indexing

- [ ] Request indexing for homepage (all domains)
- [ ] Request indexing for top 10 pages (each domain)
- [ ] Monitor indexing status in Search Console
- [ ] Check for crawl errors
- [ ] Fix any indexing issues

### Week 4: Optimization

- [ ] Analyze search performance
- [ ] Optimize low-performing pages
- [ ] Build backlinks to custom domains
- [ ] Create content for each domain
- [ ] Monitor rankings for target keywords

---

## Backlink Strategy for Custom Domains

### SupersonicFastCash.com

1. **Local Directories**:
   - Yelp (Tax Preparation)
   - Yellow Pages
   - Better Business Bureau
   - Chamber of Commerce

2. **Tax Industry Directories**:
   - IRS Directory of Preparers
   - TaxBuzz
   - FindATaxPro

3. **Local News**:
   - Indianapolis Star (tax season articles)
   - IBJ (business tax tips)

### RiseFoundation.org

1. **Nonprofit Directories**:
   - GuideStar
   - Charity Navigator
   - GreatNonprofits

2. **VITA Program**:
   - IRS VITA Site Locator
   - 211 Indiana
   - United Way

3. **Community Resources**:
   - Local libraries
   - Community centers
   - Churches

---

## Performance Monitoring

### Key Metrics to Track

1. **Indexing Status**:
   - Pages indexed vs. submitted
   - Crawl errors
   - Coverage issues

2. **Search Performance**:
   - Impressions
   - Clicks
   - Average position
   - Click-through rate (CTR)

3. **Technical Health**:
   - Page speed (Core Web Vitals)
   - Mobile usability
   - HTTPS status
   - Structured data errors

4. **Rankings**:
   - Target keyword positions
   - Competitor comparisons
   - Local pack rankings

---

## Troubleshooting

### If Pages Aren't Indexing:

1. **Check robots.txt**: Ensure pages aren't blocked
2. **Check canonical URLs**: Ensure they point to correct domain
3. **Check for duplicate content**: Use canonical tags
4. **Check for crawl errors**: Fix in Search Console
5. **Request indexing manually**: Use URL Inspection tool
6. **Build backlinks**: Help Google discover pages
7. **Create internal links**: Link from indexed pages
8. **Submit sitemap again**: Force re-crawl

### If Rankings Are Low:

1. **Optimize content**: Add target keywords
2. **Improve page speed**: Optimize images, code
3. **Build quality backlinks**: Get links from authority sites
4. **Enhance user experience**: Improve navigation, design
5. **Add structured data**: Help Google understand content
6. **Create fresh content**: Publish regularly
7. **Optimize for mobile**: Ensure mobile-friendly
8. **Fix technical issues**: Resolve errors in Search Console

---

## Next Steps

1. ✅ Configure DNS for custom domains
2. ✅ Set up SSL certificates
3. ✅ Create robots.txt files
4. ✅ Generate sitemaps
5. [ ] Verify domains in Google Search Console
6. [ ] Submit sitemaps
7. [ ] Request indexing for priority pages
8. [ ] Monitor indexing status
9. [ ] Build backlinks
10. [ ] Track rankings and optimize

---

**Last Updated**: December 2024
**Owner**: Elizabeth Greene, Elevate for Humanity
**Contact**: elizabeth@elevateforhumanity.org | 317-314-3757
