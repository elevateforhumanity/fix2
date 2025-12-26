# MEDIA STRATEGY - 10/10 ENTERPRISE GRADE

## Executive Summary

**Current State:** System is advanced. Media looks beginner.
**Target State:** Media matches platform sophistication.

**Core Problems:**

1. Technical: Images too large, not optimized, slow on mobile
2. Brand: Generic stock photos, no specificity, "smiling people in classrooms"
3. Mobile: Videos dominate, push content down, increase scroll
4. Mismatch: Copy is institutional, visuals are soft/vague

**Solution:** Operational media, not inspirational marketing.

---

## PART 1: VISUAL STYLE GUIDE (NON-GENERIC)

### The Rule

> Every image or video must answer: "What part of the workforce system is this?"

If it can't answer that question → remove it.

### Visual Categories (ONLY THESE)

#### 1. Training Environments (Operational)

**What to show:**

- Actual training labs (HVAC, welding, barber)
- Equipment in use
- Class-in-session (not posed)
- Hands-on work

**NOT:**

- Generic classroom stock photos
- Posed "diversity" shots
- Vague "people learning"

**Example captions:**

- "HVAC apprenticeship lab – Indianapolis"
- "Welding certification training – Partner facility"
- "Barber apprenticeship – On-site instruction"

#### 2. Employer Sites (Contextual)

**What to show:**

- Partner employer locations
- On-the-job training environments
- Actual work settings
- Real equipment/facilities

**NOT:**

- Generic office buildings
- Stock "workplace" imagery
- Vague "professional" shots

**Example captions:**

- "Employer partner site – Manufacturing"
- "On-the-job training location – Healthcare"
- "Apprenticeship host facility"

#### 3. Credential Moments (Outcomes)

**What to show:**

- Certificate presentations
- License displays
- Graduation moments
- Credential verification

**NOT:**

- Generic "success" imagery
- Vague celebration shots
- Stock diploma photos

**Example captions:**

- "CNA certification earned – 2024"
- "DOL registered apprenticeship completion"
- "State-licensed barber credential"

#### 4. System Operations (Instrumentation)

**What to show:**

- Dashboard screenshots
- Workflow diagrams
- Compliance tracking
- Real platform interfaces

**NOT:**

- Generic "technology" stock
- Vague "data" imagery
- Non-specific screens

**Example captions:**

- "Student progress dashboard"
- "Program holder compliance tracking"
- "Automated reporting interface"

#### 5. Partner Logos (Proof)

**What to show:**

- Employer partner logos
- Training provider logos
- Government agency seals
- Accreditation badges

**NOT:**

- Generic "partnership" imagery
- Vague collaboration photos

**Example captions:**

- "DOL Registered Apprenticeship Sponsor"
- "ETPL Approved Provider – Indiana DWD"
- "Partner employers hiring graduates"

### Visual Tone Rules

**DO:**

- Operational (shows work being done)
- Specific (names, locations, programs)
- Documentary (real moments, not staged)
- Institutional (serious, credible)

**DON'T:**

- Inspirational (vague motivation)
- Generic (could be any organization)
- Decorative (adds no information)
- Emotional (soft, non-specific)

---

## PART 2: PAGE-BY-PAGE MEDIA REPLACEMENT RULES

### Homepage

**Current Issues:**

- Generic hero image
- Stock "diversity" photos
- Vague "success" imagery

**Replacement Rules:**

1. **Hero:** Video of actual training environment OR specific program in action
2. **Who We Serve:** Replace generic photos with role-specific imagery
   - Students: Training lab in use
   - Employers: Partner facility
   - Agencies: Compliance dashboard
3. **Featured Programs:** Each program gets specific environment photo
   - Barber: Actual barber shop/training
   - HVAC: HVAC lab with equipment
   - CNA: Healthcare training facility
4. **By the Numbers:** Replace with proof imagery
   - Partner logos
   - Credential displays
   - DOL/ETPL badges

**Image Count:** Reduce from ~15 to ~8 (cut 47%)

### For Students Page

**Current Issues:**

- Generic "student success" stock
- Vague classroom imagery

**Replacement Rules:**

1. **Hero:** Specific training environment (rotate by program)
2. **Eligibility Checker:** Remove decorative images
3. **Programs Grid:** Each program = specific environment photo
4. **Journey Timeline:** Replace with workflow diagram (not people)

**Image Count:** Reduce from ~20 to ~10 (cut 50%)

### For Employers Page

**Current Issues:**

- Generic "workplace" stock
- Vague "hiring" imagery

**Replacement Rules:**

1. **Hero:** Partner employer facility OR apprenticeship site
2. **Three Problems:** Replace with icons (not photos)
3. **Apprenticeship Section:** Real apprenticeship environment
4. **Proof:** Partner employer logos (not stock photos)

**Image Count:** Reduce from ~12 to ~6 (cut 50%)

### For Agencies Page

**Current Issues:**

- Generic "government" imagery
- Vague "partnership" photos

**Replacement Rules:**

1. **Hero:** Compliance dashboard screenshot OR system overview
2. **Alignment Points:** Government seals/badges (DOL, ETPL, WIOA)
3. **Platform Capabilities:** Dashboard screenshots (not stock)
4. **Proof:** Actual metrics dashboard

**Image Count:** Reduce from ~10 to ~5 (cut 50%)

### Program Pages (All 20)

**Current Issues:**

- Generic program imagery
- Stock "training" photos

**Replacement Rules:**

1. **Hero:** Specific program environment (400px height)
   - Barber: Barber shop/training facility
   - HVAC: HVAC lab with equipment
   - CNA: Healthcare training facility
   - CDL: Truck/training yard
   - Welding: Welding lab with equipment
2. **Remove all other images** (text-only sections)
3. **Add credential display** at bottom (actual certificate/license)

**Image Count per page:** 2 maximum (hero + credential)

### Store Page

**Current Issues:**

- Generic "shopping" imagery
- Decorative product photos

**Replacement Rules:**

1. **Hero:** Mission impact photo (students in training)
2. **Impact Metrics:** Remove decorative images (numbers only)
3. **Products:** Icon-based (not photos)
4. **Transparency:** Actual impact report screenshot

**Image Count:** Reduce from ~15 to ~4 (cut 73%)

### Demos Page

**Current Issues:**

- Generic "technology" stock
- Vague "demo" imagery

**Replacement Rules:**

1. **Hero:** System dashboard screenshot
2. **Workflow Demos:** Actual workflow diagrams (not photos)
3. **Remove all decorative imagery**
4. **Add real dashboard screenshots** for each workflow

**Image Count:** Reduce from ~10 to ~5 (cut 50%)

---

## PART 3: MOBILE-FIRST MEDIA OPTIMIZATION CHECKLIST

### Technical Requirements

#### Image Optimization

- [ ] Convert all images to WebP (with JPEG fallback)
- [ ] Generate AVIF versions for modern browsers
- [ ] Create responsive sizes: 320px, 768px, 1024px, 1920px
- [ ] Compress all images (target: <100KB for most, <200KB for heroes)
- [ ] Add explicit width/height attributes (prevent layout shift)
- [ ] Implement lazy loading for all below-fold images
- [ ] Use `loading="eager"` only for hero images
- [ ] Add proper `sizes` attribute for responsive images

#### Video Optimization

- [ ] Remove autoplay on mobile (all videos)
- [ ] Add poster images for all videos
- [ ] Compress videos (target: <5MB for 30-second clips)
- [ ] Use `preload="none"` (load on interaction only)
- [ ] Add play button overlay (clear interaction)
- [ ] Provide video transcripts (accessibility + SEO)
- [ ] Host videos on CDN (not raw uploads)
- [ ] Add mute toggle (if autoplay on desktop)

#### Mobile-Specific Rules

- [ ] Hero images: Max 600px height on mobile (not 800px+)
- [ ] Remove all decorative images on mobile
- [ ] Stack images vertically (never side-by-side)
- [ ] Reduce image count by 50% on mobile breakpoint
- [ ] Hide videos on mobile (show poster + "Watch Video" button)
- [ ] Lazy load everything except hero
- [ ] Use smaller image sizes on mobile (320px width)

### Performance Targets

**Desktop:**

- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1

**Mobile:**

- LCP: <3.0s
- FID: <100ms
- CLS: <0.1
- Total page weight: <2MB

### Implementation Checklist

#### Phase 1: Audit (Week 1)

- [ ] List all images across site
- [ ] Identify generic/stock photos
- [ ] Mark images for removal
- [ ] Mark images for replacement
- [ ] Calculate current page weights

#### Phase 2: Replace (Week 2)

- [ ] Remove generic stock photos
- [ ] Replace with operational imagery
- [ ] Add contextual captions
- [ ] Reduce image count by 40%

#### Phase 3: Optimize (Week 3)

- [ ] Convert to WebP/AVIF
- [ ] Generate responsive sizes
- [ ] Compress all images
- [ ] Implement lazy loading
- [ ] Add proper attributes

#### Phase 4: Video (Week 4)

- [ ] Remove autoplay on mobile
- [ ] Add poster images
- [ ] Compress videos
- [ ] Implement load-on-interaction
- [ ] Add transcripts

#### Phase 5: Test (Week 5)

- [ ] Test on mobile (320px, 375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1920px)
- [ ] Run Lighthouse audits
- [ ] Measure page weights
- [ ] Test load times on 3G

#### Phase 6: Deploy (Week 6)

- [ ] Deploy optimized images
- [ ] Deploy video changes
- [ ] Monitor performance
- [ ] Fix any issues
- [ ] Document changes

---

## PART 4: SPECIFIC FIXES BY PAGE

### Homepage

**Remove:**

- Generic "diversity" stock photos (3 images)
- Vague "success" imagery (2 images)
- Decorative section backgrounds (4 images)

**Replace:**

- Hero: Video of actual training environment
- Who We Serve: Role-specific operational photos (3)
- Featured Programs: Specific environment photos (4)

**Add:**

- Partner employer logos (proof)
- DOL/ETPL badges (credibility)
- Actual credential displays (outcomes)

**Result:** 15 images → 8 images (47% reduction)

### For Students Page

**Remove:**

- Generic "student success" stock (5 images)
- Vague classroom imagery (3 images)
- Decorative backgrounds (2 images)

**Replace:**

- Hero: Specific training environment
- Programs: Environment photos (12)

**Add:**

- Workflow diagram (journey timeline)
- Credential examples (outcomes)

**Result:** 20 images → 10 images (50% reduction)

### For Employers Page

**Remove:**

- Generic "workplace" stock (4 images)
- Vague "hiring" imagery (3 images)
- Decorative backgrounds (2 images)

**Replace:**

- Hero: Partner facility photo
- Apprenticeship: Real environment

**Add:**

- Partner employer logos (proof)
- Metrics dashboard (outcomes)

**Result:** 12 images → 6 images (50% reduction)

### For Agencies Page

**Remove:**

- Generic "government" imagery (3 images)
- Vague "partnership" photos (2 images)
- Decorative backgrounds (2 images)

**Replace:**

- Hero: Compliance dashboard screenshot
- Proof: Government seals/badges

**Add:**

- Platform screenshots (capabilities)
- Actual metrics (outcomes)

**Result:** 10 images → 5 images (50% reduction)

---

## PART 5: BRAND CONSISTENCY RULES

### Image Sourcing Priority

1. **First choice:** Actual photos from your programs/partners
2. **Second choice:** Specific industry/trade imagery (labeled)
3. **Third choice:** Icons/diagrams (operational, not decorative)
4. **Last resort:** High-quality stock (must be specific, not generic)

### Never Use

- Generic "diversity" stock photos
- Vague "success" imagery
- Posed "classroom" shots
- Non-specific "workplace" photos
- Decorative backgrounds
- Emotional/inspirational imagery
- Stock "technology" photos
- Vague "partnership" imagery

### Always Include

- Contextual captions (program, location, date)
- Specific labels (what part of system)
- Operational context (what's happening)
- Outcome indicators (credential, placement, metric)

---

## PART 6: SUCCESS METRICS

### Before (Current State)

- Average page weight: ~4-6MB
- Mobile LCP: ~4-5s
- Image count per page: 10-20
- Generic imagery: ~60%
- Mobile scroll: Excessive

### After (Target State)

- Average page weight: <2MB
- Mobile LCP: <3s
- Image count per page: 5-10
- Generic imagery: <10%
- Mobile scroll: Reduced 40%

### Credibility Impact

- **Before:** "Media looks beginner"
- **After:** "Media matches platform sophistication"

### Licensing Impact

- **Before:** "Visuals are soft/vague"
- **After:** "Visuals are operational/specific"

---

## IMPLEMENTATION TIMELINE

**Week 1:** Audit all images, identify replacements
**Week 2:** Remove generic stock, replace with operational imagery
**Week 3:** Optimize all images (WebP, responsive, lazy load)
**Week 4:** Fix video delivery (no autoplay mobile, posters, compress)
**Week 5:** Test performance (mobile, tablet, desktop)
**Week 6:** Deploy and monitor

**Total time:** 6 weeks to 10/10 media strategy

---

## THE SHIFT

**Before:**

- System is advanced
- Media looks beginner
- Gap creates doubt

**After:**

- System is advanced
- Media is operational
- Alignment creates trust

**This is the difference between credible and polished.**
