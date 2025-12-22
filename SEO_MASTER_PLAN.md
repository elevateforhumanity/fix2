# SEO MASTER PLAN - Elevate for Humanity

## Platform Information

**Platform:** Next.js 15 (App Router) with Turbopack  
**Database:** Supabase (PostgreSQL)  
**Hosting:** Vercel  
**Domain:** elevateforhumanity.org  
**Current Status:** Live and functional

**Analytics Status:**
- Google Search Console: ⏳ NEEDS VERIFICATION
- Google Analytics 4: ⏳ NEEDS INSTALLATION
- Bing Webmaster Tools: ⏳ NEEDS SETUP

---

## PHASE 1: TECHNICAL SEO FOUNDATION (CRITICAL)

### 1. Global Technical SEO Audit

**Current State Analysis:**

#### ✅ What's Already Good:
- Next.js 15 with App Router (modern, SEO-friendly)
- Server-side rendering (SSR) enabled
- Metadata API implemented
- Sitemap.ts exists
- Canonical tags in place
- Open Graph tags implemented
- Mobile responsive design
- Fast build times with Turbopack

#### ⚠️ What Needs Immediate Attention:

**Critical Issues:**
1. **No robots.txt** - Search engines have no crawl guidance
2. **Analytics not installed** - No visibility into performance
3. **Search Console not verified** - Can't see indexing status
4. **Limited structured data** - Missing rich results opportunities
5. **No XML sitemap submission** - Search engines may not find all pages
6. **No performance monitoring** - Core Web Vitals unknown

**High Priority:**
1. Multiple service workers (need consolidation)
2. Static cache names (need versioning)
3. No offline fallback page
4. Hardcoded asset paths in service workers
5. Blog content in markdown (not in database for dynamic SEO)

**Medium Priority:**
1. Image optimization (need next/image everywhere)
2. Font optimization (need next/font)
3. No preconnect/dns-prefetch for external resources
4. Missing security headers (CSP, HSTS)

---

## PHASE 2: META TAG & STRUCTURE CONTROL

### Current Meta Implementation:

**✅ Already Implemented:**
- Metadata API in use
- Title tags on most pages
- Meta descriptions on most pages
- Open Graph tags
- Canonical URLs

**❌ Needs Optimization:**

#### Page Type Meta Strategy:

**Homepage:**
```typescript
title: "Free Job Training Programs | Elevate for Humanity"
description: "Get trained for free in high-demand careers. WIOA-funded programs in barbering, healthcare, HVAC, and more. No debt. Real careers. Indiana."
keywords: "free job training, WIOA programs, workforce development, career training Indiana"
```

**Program Pages:**
```typescript
title: "[Program Name] Training | Free Certification | Elevate for Humanity"
description: "Free [Program] training with [credential]. [Duration], [funding source]. Start your career in [industry]. Apply now."
```

**Blog Posts:**
```typescript
title: "[Post Title] | Elevate for Humanity Blog"
description: "[150-160 char excerpt optimized for click-through]"
article:published_time, article:author, article:section
```

**Application Page:**
```typescript
title: "Apply for Free Job Training | Elevate for Humanity"
description: "Apply now for free workforce training. WIOA, WRG, and JRI funding available. Start your career transformation today."
```

---

## PHASE 3: CONTENT HIERARCHY & CHRONOLOGY

### Current Site Structure:

```
elevateforhumanity.org/
├── / (Homepage)
├── /programs/ (Program catalog)
│   ├── /programs/barber
│   ├── /programs/dsp
│   ├── /programs/hvac
│   └── ... (10+ programs)
├── /blog/ (Blog index)
│   ├── /blog/[slug] (Individual posts)
│   ├── /blog/category/[category]
│   └── /blog/author/[author]
├── /apply (Application form)
├── /contact (Contact form)
├── /about (About us)
├── /grants (SAM.gov opportunities)
├── /forums (Community forums)
├── /policies/ (25 policy pages)
└── /admin/ (Admin dashboard - noindex)
```

### Recommended Topical Silos:

**Silo 1: Programs (Transactional)**
```
/programs/ (pillar page)
  ├── /programs/barber (program page)
  ├── /programs/dsp (program page)
  └── /programs/compare (comparison tool)
```

**Silo 2: Resources (Informational)**
```
/resources/ (pillar page - NEW)
  ├── /resources/how-to-apply-wioa
  ├── /resources/career-guides
  └── /resources/success-stories
```

**Silo 3: Blog (Authority Building)**
```
/blog/ (pillar page)
  ├── /blog/workforce-development/ (category)
  ├── /blog/career-advice/ (category)
  └── /blog/industry-trends/ (category)
```

**Silo 4: Grants (Specialized)**
```
/grants/ (pillar page)
  ├── /grants/federal (SAM.gov)
  ├── /grants/state (Indiana)
  └── /grants/how-to-apply
```

---

## PHASE 4: GLOBAL XML SITEMAP SYSTEM

### Current Sitemap:
- Single sitemap.ts file
- Generates all URLs dynamically
- No sitemap index

### Recommended Structure:

**Sitemap Index** (`/sitemap.xml`):
```xml
<sitemapindex>
  <sitemap><loc>https://elevateforhumanity.org/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>https://elevateforhumanity.org/sitemap-programs.xml</loc></sitemap>
  <sitemap><loc>https://elevateforhumanity.org/sitemap-blog.xml</loc></sitemap>
  <sitemap><loc>https://elevateforhumanity.org/sitemap-policies.xml</loc></sitemap>
  <sitemap><loc>https://elevateforhumanity.org/sitemap-grants.xml</loc></sitemap>
</sitemapindex>
```

**Priority Rules:**
- Homepage: 1.0
- Programs: 0.9
- Blog posts: 0.7
- Policies: 0.5
- Admin pages: excluded

**Change Frequency:**
- Homepage: daily
- Programs: weekly
- Blog: daily
- Policies: monthly

---

## PHASE 5: SCHEMA & STRUCTURED DATA

### Current Implementation:
- Basic Organization schema
- Some page-specific schema

### Required Schema Types:

**Organization (Global):**
```json
{
  "@type": "Organization",
  "name": "Elevate for Humanity",
  "url": "https://elevateforhumanity.org",
  "logo": "https://elevateforhumanity.org/logo.png",
  "sameAs": [
    "https://www.facebook.com/elevateforhumanity",
    "https://www.linkedin.com/company/elevateforhumanity",
    "https://www.instagram.com/elevateforhumanity"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-317-314-3757",
    "contactType": "Admissions"
  }
}
```

**EducationalOrganization (Programs):**
```json
{
  "@type": "EducationalOrganization",
  "name": "Elevate for Humanity",
  "offers": {
    "@type": "Offer",
    "category": "Workforce Training",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**Course (Each Program):**
```json
{
  "@type": "Course",
  "name": "Barber Apprenticeship",
  "description": "1,500-hour barber apprenticeship...",
  "provider": {
    "@type": "Organization",
    "name": "Elevate for Humanity"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**Article (Blog Posts):**
```json
{
  "@type": "Article",
  "headline": "Post Title",
  "author": {
    "@type": "Organization",
    "name": "Elevate for Humanity Team"
  },
  "datePublished": "2024-12-22",
  "image": "https://...",
  "publisher": {
    "@type": "Organization",
    "name": "Elevate for Humanity",
    "logo": {...}
  }
}
```

**FAQPage (Program Pages):**
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much does the program cost?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Free for eligible students through WIOA funding."
    }
  }]
}
```

**BreadcrumbList (All Pages):**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://elevateforhumanity.org"
  }]
}
```

---

## PHASE 6: ANALYTICS STACK

### Required Setup:

**1. Google Analytics 4:**
- Property ID needed
- Event tracking for:
  - Application submissions
  - Program views
  - Blog post reads
  - Contact form submissions
  - Certificate downloads

**2. Google Search Console:**
- Domain verification
- Sitemap submission
- Performance monitoring
- Index coverage tracking

**3. Bing Webmaster Tools:**
- Site verification
- Sitemap submission
- SEO reports

**4. Google Tag Manager:**
- Container setup
- Event tracking
- Conversion tracking

### KPIs to Track:
- Organic traffic
- Keyword rankings
- Application conversion rate
- Program page engagement
- Blog post performance
- Bounce rate by page type
- Core Web Vitals

---

## PHASE 7: KEYWORD STRATEGY

### Primary Keywords by Page Type:

**Homepage:**
- Primary: "free job training"
- Secondary: "workforce development programs", "WIOA training", "career training Indiana"

**Program Pages:**
- Barber: "free barber training", "barber apprenticeship Indiana"
- DSP: "direct support professional training", "DSP certification"
- HVAC: "free HVAC training", "HVAC certification Indiana"

**Blog Categories:**
- Workforce Development: "workforce training trends", "job training programs"
- Career Advice: "career change guide", "how to choose training program"
- Success Stories: "career transformation stories", "job training success"

**Application Page:**
- Primary: "apply for job training"
- Secondary: "WIOA application", "free training application"

### Keyword Mapping (No Cannibalization):
- Each page targets ONE primary keyword
- Supporting keywords are related but distinct
- Internal linking uses keyword-rich anchor text

---

## PHASE 8: CONTENT AUTHORITY ENGINE

### Cornerstone Content Strategy:

**Pillar 1: Workforce Development**
- Main: "Complete Guide to Workforce Development in Indiana"
- Supporting: 10 blog posts on specific programs, funding, success

**Pillar 2: Career Training**
- Main: "How to Choose the Right Career Training Program"
- Supporting: 10 blog posts on different careers, industries

**Pillar 3: Funding & Financial Aid**
- Main: "Complete Guide to Free Job Training Funding"
- Supporting: WIOA guide, WRG guide, JRI guide, employer sponsorship

**Publishing Cadence:**
- 3-5 blog posts per month
- 1 cornerstone page per quarter
- Weekly program updates

**Internal Linking Strategy:**
- Every blog post links to 2-3 program pages
- Every program page links to relevant blog posts
- Cornerstone pages link to all supporting content

---

## PHASE 9: LOCAL + NATIONAL SEO

### Local SEO (Indiana Focus):

**Google Business Profile:**
- Create/claim listing
- Add all locations (if multiple)
- Post weekly updates
- Collect reviews

**NAP Consistency:**
- Name: Elevate for Humanity
- Address: [Physical address needed]
- Phone: (317) 314-3757

**Location Pages:**
- /locations/indianapolis
- /locations/fort-wayne
- /locations/evansville
- etc.

### National SEO:

**Broad Keywords:**
- "free job training"
- "workforce development programs"
- "career training online"

**Authority Signals:**
- Partner with national organizations
- Get listed in training directories
- Earn backlinks from .edu and .gov sites

---

## PHASE 10: SEO RISK PREVENTION

### Current Risks:

**Low Risk:**
- Duplicate content (policies are unique)
- Thin content (blog posts are substantial)

**Medium Risk:**
- Multiple service workers (could confuse crawlers)
- Admin pages not properly noindexed
- Some pages missing meta descriptions

**High Risk:**
- No robots.txt (crawlers may waste budget)
- No analytics (can't detect issues)

### Safe Practices:
- Never buy links
- Never keyword stuff
- Never cloak content
- Never use AI content without editing
- Always disclose sponsored content

---

## IMMEDIATE NEXT ACTIONS

### Week 1 (This Week):
1. Create robots.txt
2. Install Google Analytics 4
3. Verify Google Search Console
4. Submit sitemaps
5. Set up Bing Webmaster Tools

### Week 2:
6. Implement comprehensive Schema.org
7. Optimize all meta tags
8. Create sitemap index system
9. Set up Google Tag Manager

### Week 3:
10. Build cornerstone content
11. Implement internal linking strategy
12. Create location pages
13. Set up Google Business Profile

### Week 4:
14. Monitor Core Web Vitals
15. Fix technical issues
16. Start content publishing cadence
17. Begin backlink outreach

---

## MEASUREMENT & ITERATION

### Weekly Check:
- Google Search Console performance
- GA4 traffic and conversions
- Keyword ranking changes
- Technical issues

### Monthly Review:
- Content performance
- Backlink profile
- Competitor analysis
- Strategy adjustments

### Quarterly Audit:
- Full technical SEO audit
- Content gap analysis
- Keyword strategy review
- ROI assessment

---

**Status:** READY TO EXECUTE  
**Platform:** Next.js 15 + Supabase + Vercel  
**Analytics:** NEEDS SETUP  
**Next Step:** Install analytics and verify Search Console

**This is the foundation for #1 rankings. Let's build it right.**
