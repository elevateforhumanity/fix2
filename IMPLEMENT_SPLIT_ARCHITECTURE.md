# Implementation Guide: Split Architecture

## Executive Summary

**Problem:** React SPA shows skeleton/blank pages because:
- API URLs point to localhost or wrong endpoints
- CORS blocks cross-origin requests  
- Content loads client-side (bad for SEO and UX)

**Solution:** Split into two sites:
1. **www** → Static marketing (Astro) - instant load, perfect SEO
2. **app** → React SPA (current) - for authenticated features

**Timeline:** 2-3 hours to implement, 30 minutes to deploy

---

## Quick Fix (Do This First - 15 minutes)

### Fix API URLs in Current Site

1. **Update environment variables:**
```bash
cd /workspaces/fix2

# Create .env.production
cat > .env.production << 'EOF'
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx
EOF
```

2. **Update Netlify environment variables:**
```bash
# Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/deploys#environment
# Add these variables (same as above)
```

3. **Rebuild and deploy:**
```bash
pnpm build
git add .env.production
git commit -m "fix: Add production environment variables"
git push origin main
```

**Result:** Site will stop showing skeletons for API-dependent content.

---

## Full Solution: Create Marketing Site (2-3 hours)

### Step 1: Initialize Astro Project (5 minutes)

```bash
cd /workspaces/fix2
mkdir marketing-site
cd marketing-site

# Create Astro project
npm create astro@latest . -- --template minimal --install --typescript strict

# Install Tailwind (to match current styling)
npx astro add tailwind

# Install React (for interactive components if needed)
npx astro add react
```

### Step 2: Copy Styling (10 minutes)

```bash
# Copy Tailwind config
cp ../tailwind.config.js ./

# Copy brand CSS
cp ../src/styles/durable-design.css ./src/styles/

# Copy assets
cp -r ../public/assets ./public/
```

### Step 3: Create Page Structure (30 minutes)

Create these files in `marketing-site/src/pages/`:

**`index.astro`** - Homepage
```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Programs from '../components/Programs.astro';
---

<Layout title="Elevate for Humanity | Workforce Training">
  <Hero />
  <Programs />
  {/* Static content - no API calls */}
</Layout>
```

**`programs/index.astro`** - Programs Overview
**`programs/barber.astro`** - Barber Program
**`programs/building-tech.astro`** - Building Services
**`programs/cna.astro`** - CNA Training
**`about.astro`** - About Us
**`contact.astro`** - Contact Form
**`partners.astro`** - Partners

### Step 4: Create Components (45 minutes)

**`src/layouts/Layout.astro`** - Main layout with header/footer
**`src/components/Hero.astro`** - Hero section
**`src/components/Programs.astro`** - Programs grid
**`src/components/Header.astro`** - Navigation
**`src/components/Footer.astro`** - Footer

### Step 5: Configure Build (5 minutes)

**`astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://www.elevateforhumanity.org',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
```

**`netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Step 6: Deploy Marketing Site (10 minutes)

```bash
# Build locally to test
npm run build
npm run preview

# Create new Netlify site
netlify init

# Deploy
netlify deploy --prod
```

### Step 7: Configure DNS (5 minutes)

**In Cloudflare/DNS Provider:**
```
Type: CNAME
Name: www
Target: [your-netlify-site].netlify.app
TTL: Auto

Type: CNAME  
Name: app
Target: main--elevateforhumanityfix.netlify.app
TTL: Auto
```

### Step 8: Update React App for app.* (15 minutes)

**In main React project:**

1. **Update base URL in `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/',
  // ... rest of config
});
```

2. **Update canonical URLs:**
```javascript
// src/config.ts
export const SITE_URL = 'https://app.elevateforhumanity.org';
export const MARKETING_URL = 'https://www.elevateforhumanity.org';
```

3. **Add redirect from root to app:**
```javascript
// src/App.tsx
if (window.location.pathname === '/' && !isAuthenticated) {
  window.location.href = 'https://www.elevateforhumanity.org';
}
```

---

## Alternative: Quick Prerender Fix (30 minutes)

If you don't want to create a separate site yet:

### Enable Netlify Prerendering

**`netlify.toml`:**
```toml
[[plugins]]
  package = "@netlify/plugin-prerender"
  
  [plugins.inputs]
    # Prerender these routes to static HTML
    routes = [
      "/",
      "/about",
      "/programs",
      "/programs/barber",
      "/programs/building-tech",
      "/programs/cna",
      "/programs/hvac",
      "/programs/healthcare",
      "/programs/drug-testing",
      "/programs/digital",
      "/programs/leadership",
      "/programs/cprs",
      "/partners",
      "/contact",
      "/faq"
    ]
```

**Install plugin:**
```bash
npm install --save-dev @netlify/plugin-prerender
```

**Rebuild:**
```bash
pnpm build
git add netlify.toml package.json
git commit -m "feat: Add prerendering for public pages"
git push origin main
```

**Result:** Public pages will load instantly with full HTML, no skeleton.

---

## Testing Checklist

### Marketing Site (www)
- [ ] Homepage loads in <1s
- [ ] No JavaScript required for content
- [ ] All images load
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Lighthouse score >95

### App Site (app)
- [ ] Login works
- [ ] Dashboard loads
- [ ] Supabase connection works
- [ ] API calls succeed
- [ ] No CORS errors
- [ ] Protected routes work
- [ ] Logout works

---

## Rollback Plan

If something breaks:

1. **Revert DNS:**
```bash
# Point www back to current site
# Remove app subdomain
```

2. **Revert Netlify:**
```bash
netlify rollback
```

3. **Check logs:**
```bash
netlify logs
```

---

## Performance Expectations

### Before (Current SPA)
- First Contentful Paint: 3-5s
- Time to Interactive: 6-10s
- Lighthouse: 60-70

### After (Split Architecture)
- First Contentful Paint: 0.5-1s
- Time to Interactive: 1-2s
- Lighthouse: 95-100

---

## Next Steps

**Choose one:**

1. **Quick fix (15 min):** Fix API URLs + add prerendering
2. **Full solution (3 hours):** Create Astro marketing site
3. **Hybrid (1 hour):** Fix APIs + create simple static homepage

**I recommend:** Start with quick fix today, then build Astro site this week.

---

## Support

- **Astro Docs:** https://docs.astro.build
- **Netlify Prerender:** https://docs.netlify.com/integrations/frameworks/prerender/
- **Current Site:** https://elevateforhumanity.org
- **Netlify Dashboard:** https://app.netlify.com/sites/elevateforhumanityfix
