# Route Audit Report - Elevate for Humanity

## Navigation Links (Header)

### Desktop Navigation
- ✅ `/` - Home
- ✅ `/programs` - Explore Programs dropdown
  - ✅ `/programs/medical-assistant`
  - ✅ `/programs/hvac`
  - ✅ `/programs/barber`
  - ✅ `/programs/truck-driving`
- ✅ `/about` - About
- ✅ `/partners` - Partners
- ✅ `/employers` - For Employers
- ✅ `/login` - Log In
- ✅ `/apply` - Join for Free

## Footer Links

### Column 1 - Elevate
- ✅ `/about`
- ✅ `/programs`
- ✅ `/partners`
- ✅ `/careers`

### Column 2 - Community
- ✅ `/student/dashboard`
- ✅ `/employers`
- ✅ `/program-holder/dashboard`
- ✅ `/blog`

### Column 3 - More
- ✅ `/contact`
- ✅ `/faq`
- ✅ `/financial-aid`
- ✅ `/success-stories`

### Column 4 - Programs
- ✅ `/programs/medical-assistant`
- ✅ `/programs/hvac`
- ✅ `/programs/barber`
- ✅ `/programs/truck-driving`

### Column 5 - Mobile App
- ⚠️ App Store badge - links to `#` (placeholder)
- ⚠️ Google Play badge - links to `#` (placeholder)

### Bottom Legal Links
- ✅ `/privacy-policy`
- ✅ `/terms-of-service`
- ❌ `/accessibility` - NEEDS CHECKING

### Social Links
- ⚠️ All social links point to `#` (placeholders)

## Homepage CTAs and Links

### Hero Section
- ✅ `/apply` - Join for Free
- ✅ `#programs` - Explore Programs (anchor link)

### Segmented CTAs
- ✅ `/programs` - Learner CTA
- ✅ `/partners` - Case Manager CTA
- ✅ `/employers` - Employer CTA

### Program Cards (5 programs)
- ✅ `/programs/medical-assistant`
- ✅ `/programs/barber`
- ✅ `/programs/hvac`
- ✅ `/programs/building-tech`
- ✅ `/programs/workforce-readiness`

## Issues Found

### Critical (404s)
1. `/accessibility` - Footer link but no page exists

### Warnings (Placeholder Links)
1. App Store badge in footer - links to `#`
2. Google Play badge in footer - links to `#`
3. All social media icons - link to `#`

### Program Route Inconsistencies
1. Footer links to `/programs/hvac` but page is at `/programs/hvac-technician`
2. Multiple program pages exist with similar names:
   - `/programs/hvac` vs `/programs/hvac-tech` vs `/programs/hvac-technician`
   - `/programs/barber` vs `/programs/barber-apprenticeship`
   - `/programs/building-tech` vs `/programs/building-maintenance`

### Recommendations
1. Create `/accessibility` page
2. Standardize program routes (choose one naming convention)
3. Update footer to use correct program routes
4. Either link mobile app badges to actual stores or hide them
5. Add real social media URLs or remove the icons

## Button and CTA Audit

### Homepage (app/page.tsx)

#### Hero Section CTAs
- ✅ `/apply` - "Join for Free" (primary CTA)
- ✅ `#programs` - "Explore Programs" (anchor link)

#### Segmented CTAs (below hero)
- ✅ `/programs` - "I'm a Learner"
- ✅ `/partners` - "I'm a Case Manager"
- ✅ `/employers` - "I'm an Employer"

#### Program Cards (5 cards)
- ✅ `/programs/medical-assistant`
- ✅ `/programs/barber`
- ✅ `/programs/hvac`
- ✅ `/programs/building-tech`
- ✅ `/programs/workforce-readiness`

#### Section CTAs
- ✅ `/programs` - "View All Programs"
- ✅ `/success-stories` - "Read More Stories"
- ✅ `/apply` - "Join for Free" (bottom CTA)
- ✅ `/contact` - "Talk to an Advisor"

### About Page
- ✅ `/programs` - Navigation
- ✅ `/#how-it-works` - Navigation (anchor link)
- ✅ `/partners` - Navigation
- ✅ `/about` - Navigation
- ✅ `/terms` - Footer
- ✅ `/privacy` - Footer
- ✅ `/contact` - Footer

### Partners Page
- ✅ `/programs` - Navigation
- ✅ `/#how-it-works` - Navigation (anchor link)
- ✅ `/partners` - Navigation
- ✅ `/about` - Navigation
- ✅ `/terms` - Footer
- ✅ `/privacy` - Footer
- ✅ `/contact` - Footer

### Employers Page
- Need to check this page for CTAs

## CTA Issues Found

### Route Inconsistencies
1. Homepage links to `/programs/hvac` but should link to actual page
2. Homepage links to `/programs/building-tech` but page is at `/programs/building-maintenance`
3. Footer links to `/programs/hvac` and `/programs/barber` (short versions)

### Missing Pages
1. `/terms` - linked from about/partners pages
2. `/privacy` - linked from about/partners pages

### Recommendations
1. Standardize all program routes to use full names:
   - `/programs/barber-apprenticeship` (not `/programs/barber`)
   - `/programs/hvac-technician` (not `/programs/hvac`)
   - `/programs/building-maintenance` (not `/programs/building-tech`)
2. Create `/terms` page (or redirect to `/terms-of-service`)
3. Create `/privacy` page (or redirect to `/privacy-policy`)
4. Update all links to use consistent routes

## Video Routing Audit

### Video Pages
- ✅ `/video` - Video meeting page exists and functional
- ✅ `/admin/videos/upload` - Admin video upload page exists
- ✅ `/api/admin/videos/upload` - API route exists

### Video Links
- ✅ Homepage links to `/video` from video play button overlay

### Status
No video routing issues found. All video-related routes are properly configured.
