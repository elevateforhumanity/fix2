# Domain Architecture - Marketing Site + LMS Platform

## Current Setup (Correct Architecture)

### Marketing Site (Durablesites.co)

- **www.elevateforhumanity.org** → Marketing/public website
- Hosted on: Durablesites.co
- Purpose: Public-facing marketing, information, lead generation

### LMS Platform (Netlify - This Repository)

- **Should be on**: `lms.elevateforhumanity.org` or `app.elevateforhumanity.org`
- Hosted on: Netlify
- Purpose: Learning Management System, courses, student portal

---

## Recommended Domain Structure

```
www.elevateforhumanity.org          → Marketing site (Durablesites.co)
lms.elevateforhumanity.org          → LMS Platform (Netlify - this repo)
app.elevateforhumanity.org          → Alternative for LMS
api.elevateforhumanity.org          → API endpoints (if needed separately)
admin.elevateforhumanity.org        → Admin portal (if needed separately)
```

---

## Option 1: Use lms.elevateforhumanity.org (Recommended)

### Benefits

- Clear separation: marketing vs application
- Users understand they're in the learning platform
- SEO: Both sites can rank independently
- No conflicts with marketing site

### Setup

#### Step 1: Add DNS Record

In your DNS provider (Durable Technologies):

```
Type   Name   Content                          TTL
CNAME  lms    elevateproduction.netlify.app    Auto
```

#### Step 2: Configure Netlify

1. Go to Netlify Dashboard
2. Select your site (ID: `12f120ab-3f63-419b-bc49-430f043415c1`)
3. **Domain settings** → **Add custom domain**
4. Enter: `lms.elevateforhumanity.org`
5. Verify DNS
6. Enable HTTPS

#### Step 3: Update Environment Variables

Update all environment variables to use the LMS subdomain:

```bash
# .env.local and Netlify
NEXT_PUBLIC_APP_URL=https://lms.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://lms.elevateforhumanity.org
```

#### Step 4: Update Code URLs

Update these files to use `lms.elevateforhumanity.org`:

1. `app/sitemap.ts`
2. `app/robots.ts`
3. `app/layout.tsx`
4. `components/StructuredData.tsx`

---

## Option 2: Use app.elevateforhumanity.org

Same as Option 1, but use `app` instead of `lms`:

```
CNAME  app    elevateproduction.netlify.app
```

Then update all URLs to `https://app.elevateforhumanity.org`

---

## Option 3: Use elevateconnectsdirectory.org

Keep the secondary domain for the LMS:

```
elevateconnectsdirectory.org        → LMS Platform (Netlify)
www.elevateforhumanity.org          → Marketing site (Durablesites.co)
```

This is already configured in DNS, so no changes needed.

---

## Recommended: Option 1 (lms.elevateforhumanity.org)

This is the cleanest architecture:

### Final Domain Structure

```
www.elevateforhumanity.org          → Marketing (Durablesites.co)
lms.elevateforhumanity.org          → LMS Platform (Netlify)
elevateconnectsdirectory.org        → Redirect to lms.elevateforhumanity.org
```

### DNS Configuration

**elevateforhumanity.org**:

```
Type   Name   Content                                      Priority
A      @      172.66.0.42                                  -
CNAME  www    Durablesites.co                              -
CNAME  lms    elevateproduction.netlify.app                -
MX     @      SMTP.GOOGLE.COM                              1
TXT    @      google-site-verification=9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so
TXT    @      google-site-verification=e05R0DWw4zbryQeir_hCg57NUx47Ul_TVJcgpsiegA4
```

**elevateconnectsdirectory.org** (redirect to LMS):

```
Type   Name   Content                          Priority
A      @      75.2.60.5                        -
CNAME  www    elevateproduction.netlify.app    -
```

### netlify.toml Redirects

```toml
# Redirect secondary domain to LMS subdomain
[[redirects]]
  from = "https://www.elevateconnectsdirectory.org/*"
  to = "https://lms.elevateforhumanity.org/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.elevateconnectsdirectory.org/*"
  to = "https://lms.elevateforhumanity.org/:splat"
  status = 301
  force = true

# Redirect apex domain to marketing site
[[redirects]]
  from = "https://elevateforhumanity.org/*"
  to = "https://www.elevateforhumanity.org/:splat"
  status = 301
  force = true
```

---

## Implementation Steps

### 1. Add DNS Record (2 minutes)

Contact your DNS provider or access DNS settings:

**Add this record**:

```
Type: CNAME
Name: lms
Content: elevateproduction.netlify.app
TTL: Auto
```

### 2. Update Netlify Domain (2 minutes)

1. Go to Netlify Dashboard
2. Domain settings → Add custom domain
3. Enter: `lms.elevateforhumanity.org`
4. Verify DNS
5. Enable HTTPS

### 3. Update Environment Variables (5 minutes)

**GitHub Secrets**:

```
NEXT_PUBLIC_APP_URL=https://lms.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://lms.elevateforhumanity.org
```

**Netlify Environment Variables**:

```
NEXT_PUBLIC_APP_URL=https://lms.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://lms.elevateforhumanity.org
```

**Local .env.local**:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Update Code URLs (5 minutes)

I'll create a script to update all URLs automatically.

### 5. Deploy (1 minute)

```bash
git add .
git commit -m "Configure LMS subdomain"
git push
```

---

## User Journey

### Marketing Site (www.elevateforhumanity.org)

1. User visits marketing site
2. Learns about programs
3. Clicks "Enroll Now" or "Login"
4. Redirected to `lms.elevateforhumanity.org`

### LMS Platform (lms.elevateforhumanity.org)

1. User logs in
2. Browses courses
3. Enrolls in programs
4. Completes training
5. Downloads certificates

### Navigation Between Sites

- Marketing site has link: "Access LMS" → `https://lms.elevateforhumanity.org`
- LMS has link: "Back to Main Site" → `https://www.elevateforhumanity.org`

---

## SEO Considerations

### Marketing Site (www.elevateforhumanity.org)

- Focus: Brand awareness, program information, lead generation
- Keywords: "workforce training", "career development", "WIOA programs"
- Content: Blog posts, program descriptions, testimonials

### LMS Platform (lms.elevateforhumanity.org)

- Focus: Application functionality, course content
- Keywords: "online learning", "course portal", "student dashboard"
- Content: Course pages, lesson content, resources

### Benefits of Subdomain

- ✅ Both sites can rank independently
- ✅ Clear separation of concerns
- ✅ Marketing site can be optimized for conversions
- ✅ LMS can be optimized for user experience
- ✅ No conflicts with marketing site structure

---

## Quick Decision Guide

**Use `lms.elevateforhumanity.org` if**:

- ✅ You want clear separation between marketing and application
- ✅ You want both sites to rank in search engines
- ✅ You want professional subdomain structure
- ✅ You plan to keep marketing site on Durablesites.co

**Use `elevateconnectsdirectory.org` if**:

- You want a completely separate domain for LMS
- You don't mind managing two domains
- You want to rebrand the LMS separately

**My Recommendation**: Use `lms.elevateforhumanity.org`

- Professional
- Clear purpose
- Easy to remember
- Consistent branding

---

## Next Steps

1. **Decide on subdomain**: `lms` or `app`?
2. **Add DNS record**: CNAME for chosen subdomain
3. **Configure Netlify**: Add custom domain
4. **Update environment variables**: Use new subdomain URL
5. **Update code**: I'll help update all URLs
6. **Deploy and test**

Let me know which subdomain you prefer, and I'll update all the URLs in the code!
