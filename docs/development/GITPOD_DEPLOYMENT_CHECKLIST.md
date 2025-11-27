# Gitpod Deployment Checklist - Elevate Platform Redesign

## ✅ Complete Platform Redesign - Ready for Deployment

This checklist covers the complete Coursera-style platform redesign with navigation, footer, homepage, and video pages.

---

## 📋 Pre-Deployment Checklist

### 1. Pull Latest Code
```bash
git pull origin main
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Verify Environment Variables
All required environment variables should already be set in Vercel. No action needed unless you see build errors.

---

## 🎨 What Was Built

### Navigation & Layout Components

#### ✅ MainNav Component (`components/layout/MainNav.tsx`)
- **Features:**
  - Desktop navigation with Programs, Learners, Employers, Workforce Partners
  - Prominent "Apply / Refer Now" CTA button
  - Mobile-responsive with simplified menu
  - Active link highlighting
  - Dark theme with emerald accents

#### ✅ SiteFooter Component (`components/layout/Footer.tsx`)
- **Features:**
  - 4-column layout: Brand, Learners, Employers & Partners, Support
  - Organized links for all stakeholder groups
  - Apply/Get Started prominently featured under Learners
  - Workforce & Case Managers link under Employers & Partners
  - Copyright and branding

#### ✅ Layout Integration (`app/layout.tsx`)
- **Changes:**
  - Replaced old CourseraStyleHeader with MainNav
  - Replaced old CourseraStyleFooter with SiteFooter
  - Updated body background to slate-950 for dark theme
  - All pages now use consistent navigation and footer

---

### Homepage Redesign (`app/page.tsx`)

#### ✅ Hero Section
- **Features:**
  - Split layout: text on left, image on right
  - Dual CTAs: "Get started free" and "Explore all programs"
  - Floating stats card (100% funded, 12+ programs)
  - Gradient background with emerald accent
  - Mobile-responsive stacking

#### ✅ Partner Logos Section
- **Features:**
  - 6 placeholder logos in grid
  - Ready for real partner logos
  - Hover effects and opacity transitions

#### ✅ Featured Programs Grid
- **Features:**
  - 6 program cards with images
  - Visual tags (Healthcare, Apprenticeship, Skilled Trades, etc.)
  - Chips for key features (Clinical skills, Cert prep, High-demand)
  - Duration and "Learn more" links
  - Hover effects with image zoom
  - White background section for contrast

**Programs Featured:**
1. Medical Assistant / CNA
2. Barber Apprenticeship
3. HVAC Technician
4. Building Maintenance Technician
5. CDL / Truck Driving
6. Workforce Readiness & Re-Entry

#### ✅ What We Do Section
- **Features:**
  - 4 pillars: Training Programs, Funding & Access, Barrier-Aware Support, Technology Platform
  - Dark background with card layout
  - Bullet points for each pillar

#### ✅ Success Stories Section
- **Features:**
  - 3 testimonial cards with photos
  - Name, role, quote, and badge
  - White background for contrast
  - Link to full success stories page

**Stories Featured:**
1. Marcus J. - Barber Apprenticeship Graduate (Re-entry)
2. Sarah M. - Medical Assistant Graduate (Single parent)
3. James T. - HVAC Technician Graduate (Career change)

#### ✅ Video Highlights Section
- **Features:**
  - 3 video slots with thumbnails
  - Large featured video (Elevate Overview)
  - 2 smaller videos (Barber Spotlight, Employer Pipeline)
  - Play button overlays
  - Duration pills
  - Links to dedicated video pages

#### ✅ Final CTA Section
- **Features:**
  - Dual CTAs: "Apply / Refer Now" and "For workforce & case managers"
  - Gradient background
  - Clear messaging about next steps

---

### Video Detail Pages

#### ✅ Elevate Overview (`app/videos/elevate-overview/page.tsx`)
- **Features:**
  - Breadcrumb navigation
  - Large video player area (placeholder ready for real video)
  - Video metadata (tags, duration, audience)
  - Right sidebar with description and CTAs
  - Video breakdown section (4 beats: 0-15s, 15-35s, 35-50s, 50-60s)
  - Audience guidance (Learners, Employers, Workforce Partners)
  - Usage recommendations (QR codes, social, presentations)
  - Multiple CTAs throughout

#### ✅ Barber Spotlight (`app/videos/barber-spotlight/page.tsx`)
- **Features:**
  - Orange accent color theme (matching barber branding)
  - Re-entry focused messaging
  - Video breakdown (4 beats: 0-20s, 20-45s, 45-70s, 70-90s)
  - Who to feature section (Graduate, Barber mentor, Elevate team)
  - Usage recommendations for re-entry contexts
  - Links to Barber Apprenticeship program page

#### ✅ Employer Pipeline (`app/videos/employer-pipeline/page.tsx`)
- **Features:**
  - Emerald accent color theme (matching employer branding)
  - B2B focused messaging
  - Video breakdown (4 beats: 0-15s, 15-40s, 40-70s, 70-90s)
  - Who to feature section (Employer, Workforce board, Elevate team)
  - Usage recommendations for employer/partner contexts
  - Links to Employers and Workforce Partners pages

---

## 🚀 Deployment Steps

### Step 1: Verify Build Locally
```bash
pnpm build
```

**Expected Output:**
- Build should complete successfully
- All pages should compile without errors
- Check for any TypeScript or import errors

### Step 2: Test Key Routes Locally (Optional)
```bash
pnpm dev
```

**Routes to Test:**
- `/` - Homepage
- `/apply` - Application form
- `/directory` - Program directory
- `/employers` - Employer partnerships
- `/partners/workforce` - Workforce partners
- `/videos/elevate-overview` - Elevate overview video
- `/videos/barber-spotlight` - Barber spotlight video
- `/videos/employer-pipeline` - Employer pipeline video

### Step 3: Commit and Push
```bash
git add -A
git commit -m "feat: add video detail pages for all three spotlight videos

Video Pages:
- /videos/elevate-overview - Main 60-second overview
- /videos/barber-spotlight - Barber apprenticeship & re-entry
- /videos/employer-pipeline - Employer & workforce partnerships

Each page includes:
- Netflix-style video player area (placeholder for real video)
- Detailed breakdown of video structure
- Audience-specific messaging guidance
- Usage recommendations (QR codes, social, presentations)
- Multiple CTAs for next steps

All pages ready for InVideo exports to replace placeholders.

Co-authored-by: Ona <no-reply@ona.com>"

git push origin main
```

### Step 4: Verify Vercel Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project
3. Wait for deployment to complete (usually 2-3 minutes)
4. Click "Visit" to see live site

### Step 5: Test Live Site
Visit these URLs on your live site:
- `https://www.elevateforhumanity.org/`
- `https://www.elevateforhumanity.org/apply`
- `https://www.elevateforhumanity.org/directory`
- `https://www.elevateforhumanity.org/employers`
- `https://www.elevateforhumanity.org/partners/workforce`
- `https://www.elevateforhumanity.org/videos/elevate-overview`
- `https://www.elevateforhumanity.org/videos/barber-spotlight`
- `https://www.elevateforhumanity.org/videos/employer-pipeline`

---

## 📸 Next Steps: Replace Placeholders with Real Media

### Images to Replace

#### Homepage Hero
- **Current:** `/images/efh-hero-learners.jpg`
- **Replace with:** Real photo of learners in training
- **Dimensions:** 960x640px (or larger, 3:2 aspect ratio)

#### Program Cards
1. **Medical Assistant / CNA**
   - **Current:** `/images/efh-cna-hero.jpg`
   - **Replace with:** Real photo of MA/CNA training

2. **Barber Apprenticeship**
   - **Current:** `https://placehold.co/600x380/f97316/0f172a?text=Barber+Apprenticeship`
   - **Replace with:** Real photo of barber apprentice working
   - **Upload to:** `/public/images/programs/barber-apprenticeship.jpg`

3. **HVAC Technician**
   - **Current:** `https://placehold.co/600x380/0f172a/f97316?text=HVAC+Technician`
   - **Replace with:** Real photo of HVAC training
   - **Upload to:** `/public/images/programs/hvac-technician.jpg`

4. **Building Maintenance**
   - **Current:** `https://placehold.co/600x380/1e293b/e5e7eb?text=Building+Maintenance`
   - **Replace with:** Real photo of building maintenance work
   - **Upload to:** `/public/images/programs/building-maintenance.jpg`

5. **CDL / Transportation**
   - **Current:** `https://placehold.co/600x380/0f172a/bae6fd?text=CDL+%2F+Transportation`
   - **Replace with:** Real photo of CDL training
   - **Upload to:** `/public/images/programs/cdl-training.jpg`

6. **Workforce Readiness**
   - **Current:** `https://placehold.co/600x380/022c22/a7f3d0?text=Workforce+Readiness+%26+Re-Entry`
   - **Replace with:** Real photo of workforce readiness training
   - **Upload to:** `/public/images/programs/workforce-readiness.jpg`

#### Partner Logos
- **Current:** 6 placeholder logos
- **Replace with:** Real partner logos
- **Upload to:** `/public/images/partners/partner-1.png`, etc.
- **Dimensions:** 200x80px (or similar, maintain aspect ratio)

#### Success Stories
1. **Marcus J.**
   - **Current:** `https://placehold.co/300x300/0f172a/e5e7eb?text=Marcus`
   - **Replace with:** Real photo (with permission and release)
   - **Upload to:** `/public/images/success-stories/marcus-j.jpg`

2. **Sarah M.**
   - **Current:** `https://placehold.co/300x300/1e293b/f97316?text=Sarah`
   - **Replace with:** Real photo (with permission and release)
   - **Upload to:** `/public/images/success-stories/sarah-m.jpg`

3. **James T.**
   - **Current:** `https://placehold.co/300x300/022c22/a7f3d0?text=James`
   - **Replace with:** Real photo (with permission and release)
   - **Upload to:** `/public/images/success-stories/james-t.jpg`

### Videos to Replace

#### 1. Elevate Overview Video
- **Page:** `/videos/elevate-overview`
- **Current:** Placeholder image
- **Replace with:** Real InVideo export

**Steps:**
1. Export video from InVideo as MP4
2. Upload to `/public/videos/elevate-overview.mp4`
3. Create thumbnail: `/public/images/videos/elevate-overview-thumb.jpg`
4. Update `app/videos/elevate-overview/page.tsx`:
   ```tsx
   // Replace the placeholder <div> with:
   <video
     controls
     className="h-full w-full"
     poster="/images/videos/elevate-overview-thumb.jpg"
   >
     <source src="/videos/elevate-overview.mp4" type="video/mp4" />
   </video>
   ```

#### 2. Barber Spotlight Video
- **Page:** `/videos/barber-spotlight`
- **Current:** Placeholder image
- **Replace with:** Real InVideo export

**Steps:**
1. Export video from InVideo as MP4
2. Upload to `/public/videos/barber-spotlight.mp4`
3. Create thumbnail: `/public/images/videos/barber-spotlight-thumb.jpg`
4. Update `app/videos/barber-spotlight/page.tsx` (same pattern as above)

#### 3. Employer Pipeline Video
- **Page:** `/videos/employer-pipeline`
- **Current:** Placeholder image
- **Replace with:** Real InVideo export

**Steps:**
1. Export video from InVideo as MP4
2. Upload to `/public/videos/employer-pipeline.mp4`
3. Create thumbnail: `/public/images/videos/employer-pipeline-thumb.jpg`
4. Update `app/videos/employer-pipeline/page.tsx` (same pattern as above)

---

## 🎯 QR Code Strategy

Once videos are live, create QR codes for:

### Elevate Overview
- **URL:** `https://www.elevateforhumanity.org/videos/elevate-overview`
- **Use on:** General flyers, posters, mailers, business cards

### Barber Spotlight
- **URL:** `https://www.elevateforhumanity.org/videos/barber-spotlight`
- **Use on:** Re-entry flyers, transitional housing materials, barber shop posters

### Employer Pipeline
- **URL:** `https://www.elevateforhumanity.org/videos/employer-pipeline`
- **Use on:** Employer proposals, chamber presentations, workforce board materials

---

## 🐛 Troubleshooting

### Build Fails
- Check for TypeScript errors: `pnpm lint`
- Verify all imports are correct
- Check that all image paths exist

### Images Not Loading
- Verify images are in `/public/images/` directory
- Check file names match exactly (case-sensitive)
- Clear browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### Videos Not Playing
- Verify video files are in `/public/videos/` directory
- Check video format is MP4 (H.264 codec recommended)
- Test video file plays locally before uploading

### Navigation Not Showing
- Clear browser cache
- Check that MainNav is imported in `app/layout.tsx`
- Verify no CSS conflicts with existing styles

---

## ✅ Deployment Complete Checklist

- [ ] Code pulled from main branch
- [ ] Dependencies installed (`pnpm install`)
- [ ] Build successful locally (`pnpm build`)
- [ ] Changes committed and pushed to main
- [ ] Vercel deployment completed successfully
- [ ] Homepage loads correctly
- [ ] Navigation shows all links
- [ ] Footer shows all sections
- [ ] Apply page loads
- [ ] Directory page loads
- [ ] Employers page loads
- [ ] Workforce Partners page loads
- [ ] All 3 video pages load
- [ ] Mobile responsive on all pages
- [ ] No console errors in browser

---

## 📞 Support

If you encounter any issues during deployment:

1. Check the Vercel deployment logs for specific errors
2. Verify all environment variables are set in Vercel dashboard
3. Test the build locally first before pushing to production
4. Review this checklist to ensure all steps were followed

---

## 🎉 What's Next

After deployment is complete and verified:

1. **Replace placeholder images** with real photos
2. **Create InVideo exports** for all 3 videos
3. **Upload videos** and update video pages
4. **Generate QR codes** for each video page
5. **Test QR codes** on mobile devices
6. **Share links** with team and stakeholders
7. **Gather feedback** and iterate

---

**Last Updated:** 2024-11-22
**Version:** 1.0
**Status:** ✅ Ready for Deployment
