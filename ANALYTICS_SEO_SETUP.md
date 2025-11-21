# Analytics & SEO Configuration Guide

## Overview

This guide covers setting up comprehensive analytics, SEO, and search engine optimization for the LMS platform.

## Current Status

### ✅ Already Implemented

- **Meta Tags**: Title, description, keywords in `app/layout.tsx`
- **Open Graph**: Social media sharing metadata
- **Twitter Cards**: Twitter-specific metadata
- **Robots**: Search engine indexing enabled
- **Theme Color**: Brand color for mobile browsers
- **Favicon**: Logo configured

### ⚠️ Needs Configuration

- **Google Analytics**: Not yet implemented
- **Bing Webmaster Tools**: Not configured
- **Google Search Console**: Needs verification
- **Structured Data**: Schema.org markup missing
- **Sitemap**: Needs generation
- **robots.txt**: Needs creation

---

## Part 1: Google Analytics Setup

### Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com/
2. Click **Start measuring**
3. Account name: `Elevate for Humanity`
4. Property name: `Elevate LMS`
5. Reporting time zone: `United States - Eastern Time`
6. Currency: `US Dollar`
7. Industry: `Education`
8. Business size: `Small`
9. Click **Create**
10. Accept Terms of Service

### Step 2: Set Up Data Stream

1. Choose platform: **Web**
2. Website URL: `https://www.elevateforhumanity.org
3. Stream name: `Elevate LMS Production`
4. Click **Create stream**
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Add to GitHub Secrets and Netlify environment variables.

### Step 4: Install Google Analytics Component

Create `components/GoogleAnalytics.tsx`:

```typescript
'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
```

### Step 5: Add to Root Layout

Update `app/layout.tsx`:

```typescript
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo-efh.svg" />
        <meta name="theme-color" content="#2563EB" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
```

### Step 6: Track Custom Events

Create `lib/analytics.ts`:

```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events
export const trackCourseEnrollment = (courseId: string, courseName: string) => {
  event({
    action: 'enroll',
    category: 'Course',
    label: courseName,
    value: 1,
  });
};

export const trackCourseCompletion = (courseId: string, courseName: string) => {
  event({
    action: 'complete',
    category: 'Course',
    label: courseName,
    value: 1,
  });
};

export const trackCertificateDownload = (certificateId: string) => {
  event({
    action: 'download',
    category: 'Certificate',
    label: certificateId,
  });
};

export const trackPayment = (amount: number, courseId: string) => {
  event({
    action: 'purchase',
    category: 'Payment',
    label: courseId,
    value: amount,
  });
};

export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
  });
};
```

Add TypeScript types in `types/gtag.d.ts`:

```typescript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export {};
```

### Step 7: Use Analytics in Components

```typescript
import { trackCourseEnrollment } from '@/lib/analytics';

function EnrollButton({ courseId, courseName }: { courseId: string; courseName: string }) {
  const handleEnroll = async () => {
    // ... enrollment logic
    trackCourseEnrollment(courseId, courseName);
  };

  return <button onClick={handleEnroll}>Enroll Now</button>;
}
```

---

## Part 2: Bing Webmaster Tools Setup

### Step 1: Create Bing Webmaster Account

1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Click **Add a site**
4. Enter URL: `https://www.elevateforhumanity.org
5. Choose verification method

### Step 2: Verify Site Ownership

**Option A: Meta Tag (Recommended)**

1. Bing will provide a meta tag like:

   ```html
   <meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
   ```

2. Add to `app/layout.tsx`:

   ```typescript
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
           {/* ... other meta tags */}
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

3. Deploy site
4. Return to Bing Webmaster Tools and click **Verify**

**Option B: XML File**

1. Download verification file from Bing
2. Place in `public/` directory
3. Deploy site
4. Click **Verify**

### Step 3: Submit Sitemap

1. In Bing Webmaster Tools, go to **Sitemaps**
2. Submit: `https://www.elevateforhumanity.org/sitemap.xml
3. Bing will crawl and index your site

### Step 4: Configure Bing Settings

- **Crawl Control**: Set to normal
- **URL Inspection**: Check key pages
- **Index Now**: Enable for instant indexing
- **Keyword Research**: Use Bing's keyword tool

---

## Part 3: Google Search Console Setup

### Step 1: Add Property

1. Go to https://search.google.com/search-console
2. Click **Add property**
3. Choose **URL prefix**: `https://www.elevateforhumanity.org
4. Verify ownership (similar to Bing)

### Step 2: Submit Sitemap

1. Go to **Sitemaps** in left sidebar
2. Enter: `sitemap.xml`
3. Click **Submit**

### Step 3: Monitor Performance

- **Performance**: Track clicks, impressions, CTR
- **Coverage**: Check indexed pages
- **Enhancements**: Fix mobile usability issues
- **Core Web Vitals**: Monitor page speed

---

## Part 4: Generate Sitemap

### Create Dynamic Sitemap

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const supabase = createBuildTimeSupabaseClient();

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/programs',
    '/pricing',
    '/login',
    '/signup',
    '/privacy-policy',
    '/lms',
    '/lms/courses',
    '/lms/dashboard',
    '/program-holder/apply',
  ];

  // Get dynamic program pages
  const { data: programs } = await supabase
    .from('programs')
    .select('slug, updated_at')
    .eq('status', 'active');

  // Get dynamic course pages
  const { data: courses } = await supabase
    .from('courses')
    .select('id, updated_at')
    .eq('published', true);

  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),

    // Program pages
    ...(programs || []).map((program) => ({
      url: `${baseUrl}/programs/${program.slug}`,
      lastModified: new Date(program.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Course pages
    ...(courses || []).map((course) => ({
      url: `${baseUrl}/lms/courses/${course.id}`,
      lastModified: new Date(course.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  return sitemap;
}
```

This will automatically generate a sitemap at `/sitemap.xml`.

---

## Part 5: Create robots.txt

Create `app/robots.ts`:

```typescript
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
          '/lms/profile',
          '/lms/messages',
          '/lms/notifications',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://www.elevateforhumanity.org/sitemap.xml',
  };
}
```

This will automatically generate `/robots.txt`.

---

## Part 6: Structured Data (Schema.org)

### Add Organization Schema

Create `components/StructuredData.tsx`:

```typescript
export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/assets/logo-efh.svg',
    description: 'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@elevateforhumanity.org',
    },
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevateforhumanity',
      'https://twitter.com/elevate4humanity',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
```

### Add Course Schema

For individual course pages, add:

```typescript
const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.title,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: 'Elevate for Humanity',
    url: 'https://www.elevateforhumanity.org',
  },
  offers: {
    '@type': 'Offer',
    price: course.price || '0',
    priceCurrency: 'USD',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: `PT${course.duration}H`,
  },
};
```

---

## Part 7: SEO Best Practices

### Page-Specific Metadata

For each page, add specific metadata:

```typescript
// app/programs/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createServerSupabaseClient();
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!program) return {};

  return {
    title: `${program.title} | Elevate for Humanity`,
    description: program.summary,
    keywords: program.keywords || [],
    openGraph: {
      title: program.title,
      description: program.summary,
      images: [program.image_url],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: program.title,
      description: program.summary,
      images: [program.image_url],
    },
  };
}
```

### URL Structure

✅ **Good URLs**:

- `/programs/workforce-readiness`
- `/lms/courses/hvac-fundamentals`
- `/about`

❌ **Bad URLs**:

- `/programs?id=123`
- `/course/view/456`
- `/page.php?name=about`

### Content Optimization

1. **Title Tags**: 50-60 characters, include keywords
2. **Meta Descriptions**: 150-160 characters, compelling CTA
3. **Headings**: Use H1, H2, H3 hierarchy
4. **Alt Text**: Describe all images
5. **Internal Links**: Link related content
6. **External Links**: Link to authoritative sources
7. **Mobile-Friendly**: Responsive design
8. **Page Speed**: Optimize images, lazy load

---

## Part 8: Performance Monitoring

### Core Web Vitals

Monitor these metrics:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Tools

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **Lighthouse**: Built into Chrome DevTools
3. **GTmetrix**: https://gtmetrix.com/
4. **WebPageTest**: https://www.webpagetest.org/

### Optimization Tips

1. **Images**: Use Next.js Image component, WebP format
2. **Fonts**: Use `next/font` for font optimization
3. **Code Splitting**: Automatic with Next.js
4. **Caching**: Configure in `next.config.mjs`
5. **CDN**: Netlify provides global CDN

---

## Part 9: Local SEO

### Google Business Profile

1. Create profile: https://www.google.com/business/
2. Add business info:
   - Name: Elevate for Humanity
   - Category: Educational Institution
   - Address: Your physical location
   - Phone: Contact number
   - Website: https://www.elevateforhumanity.org
3. Verify ownership
4. Add photos, hours, services

### Local Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Elevate for Humanity",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Indianapolis",
    "addressRegion": "IN",
    "postalCode": "46204",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.7684",
    "longitude": "-86.1581"
  },
  "telephone": "+1-317-XXX-XXXX",
  "openingHours": "Mo-Fr 09:00-17:00"
}
```

---

## Part 10: Social Media Integration

### Open Graph Tags (Already Implemented)

```typescript
openGraph: {
  title: 'Elevate for Humanity',
  description: 'Career & Technical training that elevates communities',
  url: 'https://www.elevateforhumanity.org',
  siteName: 'Elevate for Humanity',
  images: [
    {
      url: 'https://www.elevateforhumanity.org/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Elevate for Humanity',
    },
  ],
  locale: 'en_US',
  type: 'website',
}
```

### Twitter Cards (Already Implemented)

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'Elevate for Humanity',
  description: 'Career & Technical training that elevates communities',
  images: ['https://www.elevateforhumanity.org/twitter-image.jpg'],
  creator: '@elevate4humanity',
}
```

### Create Social Images

Create `public/og-image.jpg` and `public/twitter-image.jpg`:

- Dimensions: 1200x630px (OG), 1200x600px (Twitter)
- Include logo, tagline, brand colors
- Use tools like Canva or Figma

---

## Part 11: Analytics Dashboard

### Key Metrics to Track

1. **Traffic**:
   - Total visitors
   - Page views
   - Bounce rate
   - Session duration

2. **Engagement**:
   - Course enrollments
   - Course completions
   - Certificate downloads
   - Time on course pages

3. **Conversions**:
   - Sign-ups
   - Enrollments
   - Payments
   - Application submissions

4. **User Behavior**:
   - Most popular courses
   - Search queries
   - Navigation paths
   - Exit pages

### Create Analytics API

Create `app/api/analytics/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  // Get enrollment stats
  const { data: enrollments, count: enrollmentCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact' })
    .gte(
      'created_at',
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    );

  // Get completion stats
  const { data: completions, count: completionCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact' })
    .eq('status', 'completed')
    .gte(
      'completed_at',
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    );

  // Get popular courses
  const { data: popularCourses } = await supabase
    .from('enrollments')
    .select('course_id, courses(title)')
    .gte(
      'created_at',
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    );

  return NextResponse.json({
    enrollments: enrollmentCount,
    completions: completionCount,
    popularCourses,
  });
}
```

---

## Part 12: Checklist

### Initial Setup

- [ ] Create Google Analytics account
- [ ] Add GA measurement ID to environment variables
- [ ] Install GoogleAnalytics component
- [ ] Add to root layout
- [ ] Test analytics tracking

### Search Engines

- [ ] Verify site with Google Search Console
- [ ] Verify site with Bing Webmaster Tools
- [ ] Submit sitemap to both
- [ ] Create robots.txt
- [ ] Add structured data

### SEO Optimization

- [ ] Optimize all page titles
- [ ] Write compelling meta descriptions
- [ ] Add alt text to all images
- [ ] Create internal linking strategy
- [ ] Optimize page speed
- [ ] Ensure mobile responsiveness

### Social Media

- [ ] Create social media images (OG, Twitter)
- [ ] Test social sharing on Facebook
- [ ] Test social sharing on Twitter
- [ ] Test social sharing on LinkedIn

### Monitoring

- [ ] Set up Google Analytics goals
- [ ] Configure conversion tracking
- [ ] Monitor Core Web Vitals
- [ ] Review Search Console weekly
- [ ] Track keyword rankings

---

## Support Resources

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Bing Webmaster Tools](https://www.bing.com/webmasters/help)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

**Status**: ⚠️ Needs configuration - Add Google Analytics and verify search engines
**Priority**: High - Essential for tracking and growth
**Estimated Setup Time**: 2-3 hours
