# Site Architecture Split - Marketing vs App

## Current Problem

- React SPA shows skeleton/loading states
- API calls fail due to wrong URLs or CORS
- SEO suffers because content loads client-side
- First impression is "blank page"

## Solution: Split into Two Sites

### Site 1: www.elevateforhumanity.org (Static Marketing)

**Technology:** Astro (SSG - Static Site Generation)
**Purpose:** Public marketing, SEO, first impressions

**Pages (Static HTML):**

- `/` - Homepage
- `/about` - About Us
- `/programs` - Programs Overview
- `/programs/barber` - Barber Apprenticeship
- `/programs/building-tech` - Building Services
- `/programs/cna` - CNA Training
- `/programs/hvac` - HVAC & Welding
- `/programs/healthcare` - Healthcare
- `/programs/drug-testing` - Drug Testing Business
- `/programs/digital` - Digital Skills
- `/programs/leadership` - Leadership
- `/programs/cprs` - CPRS (launching Dec 2025)
- `/partners` - Partners
- `/contact` - Contact Form
- `/faq` - FAQ
- `/blog` - Blog (if needed)
- `/legal/privacy` - Privacy Policy
- `/legal/terms` - Terms of Service
- `/legal/dmca` - DMCA
- `/legal/ip-notice` - IP Notice

**Benefits:**

- ✅ Instant load (no skeleton)
- ✅ Perfect SEO (pre-rendered HTML)
- ✅ No API dependencies
- ✅ Works without JavaScript
- ✅ Cloudflare/Netlify CDN cached

### Site 2: app.elevateforhumanity.org (React SPA)

**Technology:** React + Vite (current setup)
**Purpose:** Authenticated user features, dynamic content

**Pages (Dynamic/Authenticated):**

- `/dashboard` - Student Dashboard
- `/lms/*` - Learning Management System
  - `/lms/courses` - Course Catalog
  - `/lms/course/:id` - Course Detail
  - `/lms/lesson/:id` - Lesson View
- `/student/*` - Student Portal
  - `/student/grades` - Grades
  - `/student/certificates` - Certificates
  - `/student/profile` - Profile
- `/instructor/*` - Instructor Dashboard
  - `/instructor/courses` - Course Management
  - `/instructor/students` - Student Management
- `/admin/*` - Admin Console
  - `/admin/dashboard` - Admin Dashboard
  - `/admin/users` - User Management
  - `/admin/analytics` - Analytics
- `/auth/*` - Authentication
  - `/auth/login` - Login
  - `/auth/signup` - Signup
  - `/auth/reset-password` - Password Reset
- `/account` - Account Settings
- `/apply` - Application Form (with Supabase)

**Benefits:**

- ✅ Full React features
- ✅ Real-time updates
- ✅ Supabase integration
- ✅ Protected routes
- ✅ No SEO concerns (behind auth)

## Implementation Plan

### Phase 1: Create Astro Marketing Site

```bash
# Create new Astro project
npm create astro@latest marketing-site
cd marketing-site

# Install dependencies
npm install

# Copy content from React pages
# Convert to Astro components
```

### Phase 2: Fix React App Environment

```env
# app.elevateforhumanity.org/.env.production
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Phase 3: DNS Configuration

```
www.elevateforhumanity.org → Netlify (Astro static site)
app.elevateforhumanity.org → Netlify/Cloudflare (React SPA)
api.elevateforhumanity.org → Backend server (optional proxy)
```

### Phase 4: Netlify Configuration

**Marketing Site (www):**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**App Site (app):**

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  VITE_API_URL = "https://api.elevateforhumanity.org"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Migration Strategy

### Week 1: Parallel Deployment

- Deploy Astro site to staging.elevateforhumanity.org
- Test all static pages
- Verify SEO, performance, accessibility

### Week 2: DNS Cutover

- Point www to Astro site
- Point app to React SPA
- Monitor analytics and errors

### Week 3: Optimization

- Add Cloudflare caching
- Optimize images
- Add preload hints
- Monitor Core Web Vitals

## Quick Wins (Today)

### Fix 1: Correct API URLs

```javascript
// src/config.ts
export const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.elevateforhumanity.org';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### Fix 2: Add Loading States with Content

```jsx
// Instead of blank skeleton
<div className="min-h-screen">
  <h1>Programs</h1>
  <p>Loading programs...</p>
  {/* Show static content while loading */}
</div>
```

### Fix 3: Prerender Public Routes

```javascript
// netlify.toml
[[plugins]];
package = '@netlify/plugin-prerender'[plugins.inputs];
routes = ['/', '/programs', '/about', '/contact'];
```

## Expected Results

### Before (Current)

- First Contentful Paint: 3-5s
- Largest Contentful Paint: 5-8s
- Time to Interactive: 6-10s
- SEO Score: 60-70

### After (Split Architecture)

- First Contentful Paint: 0.5-1s
- Largest Contentful Paint: 1-2s
- Time to Interactive: 1-2s
- SEO Score: 95-100

## Cost Analysis

- Astro site: Free (static hosting)
- React app: Free (Netlify/Cloudflare)
- Total additional cost: $0
- Development time: 2-3 days

## Decision

**Recommended:** Implement split architecture (Option A)

- Best user experience
- Best SEO
- Lowest maintenance
- Clearest separation of concerns
