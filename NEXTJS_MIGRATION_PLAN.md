# Next.js SSG/SSR Migration Plan

## 🎯 Overview

Migrate from React SPA (Vite) to Next.js SSG/SSR to eliminate skeleton pages permanently.

---

## 📦 What We're Getting

### Next.js Starter Features

- ✅ **App Router** with pre-rendered public pages
- ✅ **SSG Pages:** `/`, `/programs`, `/partners`, `/vita`, `/contact`
- ✅ **Security headers** baked in (netlify.toml + \_headers)
- ✅ **API proxy** at `/api/proxy/*` to avoid CORS
- ✅ **SEO-ready** metadata
- ✅ **Works on** Netlify or Cloudflare Pages

### Why This Fixes Skeleton Issues

1. **Pre-rendered pages** - Users see full content immediately (no waiting for JS)
2. **SSG for static content** - Marketing pages load instantly
3. **SSR for dynamic content** - App pages render on server
4. **API proxy** - Eliminates CORS issues completely
5. **No client-side waiting** - Content is in the HTML from the start

---

## 📋 Migration Steps

### Phase 1: Setup (30 min)

1. ✅ Download `efh-next-ssg-ssr.zip`
2. ✅ Extract to `/workspaces/fix2/nextjs-site/`
3. ✅ Review structure and configuration
4. ✅ Install dependencies: `npm install`
5. ✅ Configure `.env.local` with production values

### Phase 2: Content Migration (1-2 hours)

1. ✅ Migrate homepage content from current React app
2. ✅ Migrate programs page and program listings
3. ✅ Migrate partners page
4. ✅ Migrate contact page
5. ✅ Copy images and assets
6. ✅ Update navigation and footer
7. ✅ Migrate SEO metadata

### Phase 3: Testing (30 min)

1. ✅ Test locally: `npm run dev`
2. ✅ Verify all pages load without skeleton
3. ✅ Test API proxy functionality
4. ✅ Check responsive design
5. ✅ Verify SEO metadata
6. ✅ Test security headers

### Phase 4: Deployment (30 min)

1. ✅ Create new Netlify site or update existing
2. ✅ Configure build settings
3. ✅ Set environment variables
4. ✅ Deploy and test
5. ✅ Update DNS (if using custom domain)

---

## 🗂️ Directory Structure

```
nextjs-site/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage (/)
│   ├── programs/
│   │   └── page.tsx        # Programs listing
│   ├── partners/
│   │   └── page.tsx        # Partners page
│   ├── vita/
│   │   └── page.tsx        # VITA page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── api/
│       └── proxy/
│           └── [...path]/route.ts  # API proxy
├── public/
│   ├── images/             # Static images
│   └── _headers            # Security headers
├── .env.example            # Environment variables template
├── .env.local              # Local environment (not committed)
├── netlify.toml            # Netlify configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.elevateforhumanity.org

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Backend API for proxy
BACKEND_API_URL=https://api.elevateforhumanity.org
```

### Netlify Configuration

Build settings:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20.11.1"
```

---

## 🚀 Deployment Options

### Option A: New Netlify Site (Recommended)

1. Create new site: `nextjs-elevateforhumanity`
2. Deploy Next.js app
3. Test thoroughly
4. Update DNS to point to new site
5. Keep old site as backup

### Option B: Replace Existing Site

1. Update existing Netlify site
2. Change build command to `npm run build`
3. Change publish directory to `.next`
4. Deploy
5. Test immediately

### Option C: Cloudflare Pages

1. Create new Cloudflare Pages project
2. Connect repository
3. Set build command: `npm run build`
4. Set environment variables
5. Deploy

---

## 📊 Content Migration Checklist

### Homepage (/)

- [ ] Hero section with title and CTA
- [ ] Programs overview
- [ ] Features section
- [ ] Testimonials
- [ ] Stats section
- [ ] Footer with links

### Programs Page (/programs)

- [ ] Programs listing
- [ ] Program cards with images
- [ ] Program descriptions
- [ ] "Apply Now" buttons
- [ ] Filters/categories (if applicable)

### Partners Page (/partners)

- [ ] Partner logos
- [ ] Partner descriptions
- [ ] Partnership benefits
- [ ] "Become a Partner" CTA

### Contact Page (/contact)

- [ ] Contact form
- [ ] Contact information
- [ ] Map/location (if applicable)
- [ ] Social media links

### Assets

- [ ] Logo and branding
- [ ] Program images
- [ ] Partner logos
- [ ] Icons and graphics
- [ ] Favicon

---

## 🔍 Testing Checklist

### Functionality

- [ ] All pages load without skeleton
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] API proxy works (if used)
- [ ] Links work
- [ ] Images load

### Performance

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 2.5s
- [ ] No layout shifts

### SEO

- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Sitemap generated
- [ ] Robots.txt present

### Security

- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] CSP configured
- [ ] No mixed content

---

## 📈 Expected Improvements

### Before (React SPA)

- ❌ Skeleton pages on load
- ❌ Client-side rendering only
- ❌ CORS issues
- ❌ Poor SEO
- ❌ Slow initial load

### After (Next.js SSG/SSR)

- ✅ Full content on load
- ✅ Server-side rendering
- ✅ No CORS issues (proxy)
- ✅ Excellent SEO
- ✅ Fast initial load
- ✅ Better Core Web Vitals

---

## 🎯 Success Criteria

Migration is successful when:

1. ✅ All pages load without skeleton states
2. ✅ Content visible immediately (< 1 second)
3. ✅ No CORS errors
4. ✅ API calls work through proxy
5. ✅ SEO metadata present
6. ✅ Lighthouse score > 90
7. ✅ All functionality works
8. ✅ Mobile responsive

---

## 📚 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Netlify Next.js:** https://docs.netlify.com/frameworks/next-js/
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/framework-guides/nextjs/

---

## 🔄 Rollback Plan

If issues occur:

1. Keep old React SPA site running
2. Test Next.js site on staging URL
3. Only switch DNS when fully tested
4. Can revert DNS if needed
5. Old site remains as backup

---

## ⏱️ Timeline

- **Setup:** 30 minutes
- **Content Migration:** 1-2 hours
- **Testing:** 30 minutes
- **Deployment:** 30 minutes
- **Total:** 2.5-3.5 hours

---

## 🎉 Benefits

1. **No more skeleton pages** - Content loads immediately
2. **Better SEO** - Pre-rendered HTML for crawlers
3. **Faster performance** - SSG for static content
4. **No CORS issues** - API proxy handles backend calls
5. **Better UX** - Users see content instantly
6. **Future-proof** - Modern Next.js architecture
7. **Easier maintenance** - Clear separation of concerns

---

**Status:** Ready to begin migration  
**Recommended:** Yes - This is the best long-term solution  
**Risk:** Low (can keep old site as backup)  
**Impact:** High (eliminates skeleton pages permanently)
