# URL CANONICALIZATION & DUPLICATE ELIMINATION

## Platform: Next.js 15 + Vercel

**Current Domain:** elevateforhumanity.org  
**Hosting:** Vercel  
**Framework:** Next.js 15 (App Router)

---

## STEP 1: CANONICAL URL FORMAT (THE ONE TRUE FORMAT)

### Defined Standard:

```
https://elevateforhumanity.org/[path]
```

**Rules:**

- ✅ HTTPS only (never HTTP)
- ✅ Non-www (elevateforhumanity.org, NOT www.elevateforhumanity.org)
- ✅ No trailing slash (except root)
- ✅ Lowercase only
- ✅ No file extensions
- ✅ Clean paths (no /index, no .html)

**Examples:**

```
✅ CORRECT: https://elevateforhumanity.org/programs/barber
❌ WRONG:   https://www.elevateforhumanity.org/programs/barber
❌ WRONG:   http://elevateforhumanity.org/programs/barber
❌ WRONG:   https://elevateforhumanity.org/programs/barber/
❌ WRONG:   https://elevateforhumanity.org/Programs/Barber
❌ WRONG:   https://elevateforhumanity.org/programs/barber.html
```

---

## STEP 2: CURRENT DUPLICATE URL AUDIT

### Identified Duplicate Patterns:

**1. WWW vs Non-WWW:**

- ⚠️ Both resolve currently
- Need: Redirect www → non-www

**2. HTTP vs HTTPS:**

- ✅ Vercel handles this automatically
- All HTTP → HTTPS redirects working

**3. Trailing Slash Inconsistencies:**

- ⚠️ Some pages work with/without trailing slash
- Need: Standardize to no trailing slash

**4. Case Sensitivity:**

- ✅ Next.js routes are case-sensitive by default
- Need: Verify no uppercase URLs in sitemap/links

**5. Parameter URLs:**

- ⚠️ UTM parameters may create duplicates
- ⚠️ Pagination parameters (?page=2)
- ⚠️ Sort/filter parameters (?sort=name)
- Need: Canonical tags strip parameters

**6. Index Pages:**

- ✅ Next.js doesn't create /index variants
- No action needed

**7. Legacy URLs:**

- ⚠️ Old blog URLs may exist
- ⚠️ Renamed program pages
- Need: 301 redirect map

---

## STEP 3: CANONICAL TAG IMPLEMENTATION

### Current Status:

**✅ Already Implemented:**

- Canonical tags in metadata API
- Most pages have canonical URLs

**❌ Needs Fixing:**

- Some pages missing canonical tags
- Parameter URLs not stripping parameters
- Need verification across all page types

### Implementation (Next.js 15):

**Global Canonical Pattern:**

```typescript
// app/[...path]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const canonicalUrl = `https://elevateforhumanity.org/${params.path.join('/')}`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
```

**Parameter Stripping:**

```typescript
// Strip UTM and tracking parameters
const cleanUrl = url.split('?')[0].split('#')[0];
const canonical = `https://elevateforhumanity.org${cleanUrl}`;
```

**Verification Checklist:**

- [ ] Homepage has canonical
- [ ] All program pages have canonical
- [ ] All blog posts have canonical
- [ ] All policy pages have canonical
- [ ] Dynamic routes have canonical
- [ ] Canonical matches final URL exactly
- [ ] No canonical loops
- [ ] No canonicals to redirected URLs

---

## STEP 4: 301 REDIRECT MATRIX

### Required Redirects:

**1. WWW to Non-WWW:**

```
https://www.elevateforhumanity.org/* → https://elevateforhumanity.org/*
```

**2. Trailing Slash Removal:**

```
https://elevateforhumanity.org/programs/ → https://elevateforhumanity.org/programs
https://elevateforhumanity.org/blog/ → https://elevateforhumanity.org/blog
```

**3. Uppercase to Lowercase:**

```
https://elevateforhumanity.org/Programs → https://elevateforhumanity.org/programs
https://elevateforhumanity.org/APPLY → https://elevateforhumanity.org/apply
```

**4. Legacy URLs (if any):**

```
/old-program-name → /programs/new-program-name
/blog/old-slug → /blog/new-slug
```

### Implementation (Vercel):

**Option A: vercel.json (Recommended)**

```json
{
  "redirects": [
    {
      "source": "/:path*/",
      "destination": "/:path*",
      "permanent": true
    },
    {
      "source": "/Programs/:path*",
      "destination": "/programs/:path*",
      "permanent": true
    },
    {
      "source": "/APPLY",
      "destination": "/apply",
      "permanent": true
    }
  ]
}
```

**Option B: Next.js Middleware**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Remove trailing slash
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Lowercase URLs
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
```

**Option C: Vercel Domain Settings**

- Configure www → non-www redirect in Vercel dashboard
- Settings → Domains → Redirect www to apex

---

## STEP 5: SITEMAP DEDUPLICATION

### Current Sitemap Issues:

**❌ Problems Found:**

- Some URLs may have trailing slashes
- Need to verify no duplicates
- Need to verify all URLs are canonical

### Sitemap Standards:

**Rules:**

- Only canonical URLs
- No trailing slashes (except root)
- No parameters
- No redirected URLs
- No duplicate entries
- Lowercase only

**Implementation:**

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elevateforhumanity.org';

  // Ensure no trailing slashes
  const cleanUrl = (path: string) => {
    const clean = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    return `${baseUrl}${clean}`;
  };

  return [
    {
      url: cleanUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: cleanUrl('/programs'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // ... all other URLs
  ];
}
```

**Verification:**

```bash
# Download and check sitemap
curl https://elevateforhumanity.org/sitemap.xml | grep -E "(www\.|/$|[A-Z]|\?)"
# Should return nothing
```

---

## STEP 6: INTERNAL LINK HYGIENE

### Current Issues:

**❌ Problems to Fix:**

- Some internal links may have trailing slashes
- Some may use relative paths inconsistently
- Need to verify all links point to canonical URLs

### Link Standards:

**Rules:**

- Always use canonical format
- No trailing slashes
- Lowercase only
- No parameters (unless intentional)
- Use relative paths for same-domain links

**Good Examples:**

```tsx
<Link href="/programs/barber">Barber Program</Link>
<Link href="/blog/success-story-marcus">Read Story</Link>
<Link href="/apply">Apply Now</Link>
```

**Bad Examples:**

```tsx
<Link href="/programs/barber/">Bad - trailing slash</Link>
<Link href="/Programs/Barber">Bad - uppercase</Link>
<Link href="https://elevateforhumanity.org/apply">Bad - absolute when relative works</Link>
```

### Audit Script:

```bash
# Find all internal links
grep -r "href=" app/ components/ --include="*.tsx" --include="*.ts" | \
  grep -E "(href=\"/[^\"]*/$|href=\"/[^\"]*[A-Z])" | \
  wc -l
# Should be 0
```

---

## STEP 7: SEARCH CONSOLE CONFIGURATION

### Google Search Console Setup:

**1. Property Configuration:**

- Add property: `elevateforhumanity.org` (non-www)
- Verify ownership via DNS or HTML file
- Set preferred domain: non-www

**2. Sitemap Submission:**

```
https://elevateforhumanity.org/sitemap.xml
https://elevateforhumanity.org/sitemap-pages.xml
https://elevateforhumanity.org/sitemap-programs.xml
https://elevateforhumanity.org/sitemap-blog.xml
```

**3. URL Parameters:**

- Configure parameter handling
- Set `utm_*` parameters to "Let Googlebot decide"
- Set `page` parameter to "Paginate"
- Set `sort` parameter to "No URLs"

**4. Coverage Monitoring:**

- Check for "Duplicate, Google chose different canonical"
- Check for "Submitted URL not selected as canonical"
- Fix any issues immediately

### Bing Webmaster Tools Setup:

**1. Site Verification:**

- Add site: `elevateforhumanity.org`
- Verify via XML file or meta tag

**2. Sitemap Submission:**

- Same sitemaps as Google

**3. URL Normalization:**

- Verify preferred domain
- Check for duplicate content warnings

---

## STEP 8: PARAMETER CONTROL

### Parameter Strategy:

**UTM Parameters (Tracking):**

```
?utm_source=facebook
?utm_medium=social
?utm_campaign=spring2024
```

- **Action:** Canonical strips parameters
- **Robots:** Allow crawling
- **Index:** Canonical to clean URL

**Pagination Parameters:**

```
?page=2
?page=3
```

- **Action:** Self-canonical (each page is unique)
- **Robots:** Allow crawling
- **Index:** Yes, but with rel="next/prev"

**Filter/Sort Parameters:**

```
?sort=name
?filter=category
```

- **Action:** Canonical to base URL
- **Robots:** Noindex
- **Index:** No

### Implementation:

**Canonical with Parameter Stripping:**

```typescript
export async function generateMetadata({
  params,
  searchParams,
}): Promise<Metadata> {
  // Strip tracking parameters
  const cleanPath = params.path.join('/');
  const canonical = `https://elevateforhumanity.org/${cleanPath}`;

  // Exception: pagination is self-canonical
  if (searchParams.page) {
    canonical += `?page=${searchParams.page}`;
  }

  return {
    alternates: {
      canonical,
    },
    robots: {
      index: !searchParams.sort && !searchParams.filter,
      follow: true,
    },
  };
}
```

**Robots Meta for Parameters:**

```typescript
// For filtered/sorted pages
<meta name="robots" content="noindex, follow" />
```

---

## STEP 9: TESTING & VERIFICATION

### Pre-Launch Checklist:

**1. Redirect Testing:**

```bash
# Test www redirect
curl -I https://www.elevateforhumanity.org
# Should return 301 to https://elevateforhumanity.org

# Test trailing slash
curl -I https://elevateforhumanity.org/programs/
# Should return 301 to https://elevateforhumanity.org/programs

# Test uppercase
curl -I https://elevateforhumanity.org/Programs
# Should return 301 to https://elevateforhumanity.org/programs
```

**2. Canonical Verification:**

```bash
# Check canonical tags
curl -s https://elevateforhumanity.org/programs/barber | \
  grep -o '<link rel="canonical"[^>]*>' | \
  head -1
# Should match exact URL
```

**3. Sitemap Validation:**

```bash
# Download sitemap
curl https://elevateforhumanity.org/sitemap.xml > sitemap.xml

# Check for issues
grep -E "(www\.|/$|[A-Z]|\?)" sitemap.xml
# Should return nothing
```

**4. Internal Link Audit:**

```bash
# Scan for bad internal links
grep -r "href=" app/ --include="*.tsx" | \
  grep -E "(href=\"/[^\"]*/$|href=\"/[^\"]*[A-Z])"
# Should return nothing
```

### Post-Launch Monitoring:

**Week 1:**

- Check Search Console for canonical issues
- Monitor for 404s from old URLs
- Verify redirects working

**Week 2:**

- Check indexation status
- Verify canonical coverage
- Fix any reported issues

**Monthly:**

- Audit for new duplicate URLs
- Check for canonical drift
- Verify redirect chain health

---

## IMPLEMENTATION PRIORITY

### Immediate (This Week):

1. ✅ Configure www → non-www redirect in Vercel
2. ✅ Add trailing slash redirect to middleware
3. ✅ Verify all canonical tags
4. ✅ Clean sitemap URLs
5. ✅ Submit to Search Console

### Short Term (Next 2 Weeks):

6. ✅ Audit all internal links
7. ✅ Fix any non-canonical links
8. ✅ Configure parameter handling
9. ✅ Set up monitoring
10. ✅ Document standards

### Ongoing:

11. ✅ Monitor Search Console weekly
12. ✅ Audit new pages for canonical compliance
13. ✅ Maintain redirect map
14. ✅ Update documentation

---

## VERCEL-SPECIFIC IMPLEMENTATION

### Domain Configuration:

**1. Vercel Dashboard:**

- Go to Project Settings → Domains
- Add: `elevateforhumanity.org` (primary)
- Add: `www.elevateforhumanity.org` (redirect to primary)
- Vercel handles HTTPS automatically

**2. vercel.json Redirects:**

```json
{
  "redirects": [
    {
      "source": "/:path((?!.*\\.).*)",
      "has": [
        {
          "type": "host",
          "value": "www.elevateforhumanity.org"
        }
      ],
      "destination": "https://elevateforhumanity.org/:path*",
      "permanent": true
    },
    {
      "source": "/:path*/",
      "destination": "/:path*",
      "permanent": true
    }
  ]
}
```

**3. Headers for SEO:**

```json
{
  "headers": [
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "index, follow"
        }
      ]
    },
    {
      "source": "/admin/:path*",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}
```

---

## SUCCESS CRITERIA

### When Complete:

✅ **Every page has ONE canonical URL**  
✅ **All variants redirect with 301**  
✅ **Sitemap contains only canonical URLs**  
✅ **Internal links point to canonical URLs**  
✅ **Search Console shows clean coverage**  
✅ **No duplicate content warnings**  
✅ **Parameters handled correctly**  
✅ **Monitoring in place**

---

**Platform:** Next.js 15 + Vercel  
**Status:** READY TO IMPLEMENT  
**Priority:** CRITICAL (Foundation Work)  
**Timeline:** 1 week to complete

**This eliminates silent SEO killers and locks down your URL structure.**
