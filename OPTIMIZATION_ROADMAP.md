# OPTIMIZATION ROADMAP - Top 15 Tasks

**Date**: December 30, 2025  
**Status**: 📋 **PRIORITIZED ACTION PLAN**  
**Goal**: More applications + Partner trust + Speed + Brand polish

---

## OPTIMIZATION PRIORITIES

We're optimizing for ALL FOUR:
1. ✅ More applications (conversion)
2. ✅ Partner trust (credentials + proof)
3. ✅ Speed + mobile performance
4. ✅ Brand polish (CSS + consistency)

---

## TOP 15 TASKS (In Order)

### 🔥 CRITICAL (Do First - Week 1)

#### 1. ✅ Make "Verify Credential" Real (DONE)
**Status**: ✅ COMPLETE  
**Impact**: Partner trust + Credibility  
**What was done**:
- ✅ Real credential lookup input
- ✅ Result states: Valid/Expired/Revoked/Not Found
- ✅ Minimal public details (issuer, title, issued date)
- ✅ Audit logging for verification attempts
- ✅ /verify-credential page with full UI

**Files**: app/verify-credential/page.tsx, app/api/credentials/verify/route.ts

---

#### 2. Create Consistent CTA Component (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + Brand polish  
**Time**: 2 hours  

**What to build**:
```typescript
// components/ui/CTA.tsx
interface CTAProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

// Usage:
<CTA variant="primary" size="lg" href="/apply">
  Apply Now
</CTA>
```

**Variants**:
- Primary: Blue gradient, white text, shadow
- Secondary: White bg, blue text, border
- Outline: Transparent, blue border, blue text

**Apply to**: All pages (replace inconsistent buttons)

---

#### 3. Create Consistent Badge System (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + Brand polish  
**Time**: 1 hour  

**What to build**:
```typescript
// components/ui/Badge.tsx
interface BadgeProps {
  type: 'free' | 'funded' | 'online' | 'in-person' | 'hybrid' | 'fast-track';
  size?: 'sm' | 'md';
}

// Usage:
<Badge type="free" />
<Badge type="funded" />
<Badge type="online" />
```

**Styles**:
- Free: Green bg, white text
- Funded: Blue bg, white text
- Online: Purple bg, white text
- In-Person: Orange bg, white text
- Hybrid: Teal bg, white text
- Fast-Track: Red bg, white text

**Apply to**: Program cards, program pages, search results

---

#### 4. Create "At a Glance" Program Card Component (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + Consistency  
**Time**: 3 hours  

**What to build**:
```typescript
// components/programs/ProgramGlance.tsx
interface ProgramGlanceProps {
  duration: string;
  location: string;
  modality: 'online' | 'in-person' | 'hybrid';
  prerequisites: string;
  fundingOptions: string[];
  nextSteps: string;
}
```

**Design**:
- Card with icon grid
- Duration: Clock icon + "8 weeks"
- Location: Pin icon + "Indianapolis"
- Modality: Badge component
- Prerequisites: List icon + text
- Funding: Dollar icon + badges
- Next Steps: Arrow icon + CTA

**Apply to**: All program pages (barber, CNA, HVAC, etc.)

---

#### 5. Implement next/image Everywhere (CRITICAL)
**Status**: ⏳ TODO  
**Impact**: Speed + Mobile performance  
**Time**: 4 hours  

**What to do**:
1. Find all `<img>` tags: `grep -r "<img" app/`
2. Replace with `<Image>` from next/image
3. Add proper `width`, `height`, `sizes` props
4. Use `priority` for above-fold images
5. Use `loading="lazy"` for below-fold images

**Priority images** (add `priority` prop):
- Hero images on all pages
- Program card images
- Logo

**Lazy images** (default):
- Testimonials
- Blog images
- Footer images

**Example**:
```typescript
// Before
<img src="/images/hero.jpg" alt="Hero" />

// After
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  sizes="100vw"
/>
```

---

### ⚠️ HIGH PRIORITY (Do Next - Week 2)

#### 6. Create Eligibility Alert Component (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + Legal protection  
**Time**: 1 hour  

**What to build**:
```typescript
// components/ui/EligibilityAlert.tsx
interface EligibilityAlertProps {
  type: 'info' | 'warning' | 'success';
  message: string;
}

// Usage:
<EligibilityAlert 
  type="warning"
  message="Funding eligibility varies by state, income, and employment status. Complete our pre-qualification to learn if you qualify."
/>
```

**Apply to**:
- All program pages
- Funding pages
- Apply pages

---

#### 7. Add Program Filtering/Search (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + UX  
**Time**: 4 hours  

**What to build**:
- Filter by duration (< 4 weeks, 4-12 weeks, > 12 weeks)
- Filter by location (Indianapolis, Online, Statewide)
- Filter by modality (Online, In-Person, Hybrid)
- Filter by funding (WIOA, State Grant, Employer, Self-Pay)
- Search by keyword

**Design**:
- Sidebar filters on desktop
- Drawer filters on mobile
- Real-time results update
- Show count: "Showing 12 of 45 programs"

**Apply to**: /programs page

---

#### 8. Implement next/font (CRITICAL)
**Status**: ⏳ TODO  
**Impact**: Speed + Brand polish  
**Time**: 1 hour  

**What to do**:
```typescript
// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Update CSS**:
```css
/* globals.css */
body {
  font-family: var(--font-inter), sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins), sans-serif;
}
```

---

#### 9. Create "How It Works" Stepper Component (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + UX  
**Time**: 2 hours  

**What to build**:
```typescript
// components/ui/Stepper.tsx
interface Step {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  variant?: 'horizontal' | 'vertical';
}
```

**Design**:
- Numbered circles with connecting lines
- Icon + title + description
- Responsive (horizontal on desktop, vertical on mobile)
- Active state highlighting

**Apply to**:
- All program pages
- Apply page
- Funding pages

---

#### 10. Improve Typography Scale (CRITICAL)
**Status**: ⏳ TODO  
**Impact**: Brand polish + Readability  
**Time**: 2 hours  

**What to do**:
```css
/* globals.css - New typography scale */
h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
}

h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.3;
  font-weight: 600;
}

p {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 65ch;
}

/* Consistent spacing */
.section {
  padding: clamp(3rem, 8vw, 6rem) 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}
```

**Apply to**: All pages via globals.css

---

### 📊 MEDIUM PRIORITY (Do After - Week 3)

#### 11. Add Lazy Loading to Heavy Sections (CRITICAL)
**Status**: ⏳ TODO  
**Impact**: Speed + Mobile performance  
**Time**: 2 hours  

**What to do**:
```typescript
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div>Loading...</div>,
});

const VideoGallery = dynamic(() => import('@/components/VideoGallery'));
```

**Apply to**:
- Testimonials sections
- Video galleries
- Blog post lists
- Resource libraries

---

#### 12. Create Content-Specific Hero System (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Brand polish + Conversion  
**Time**: 4 hours  

**What to build**:
```typescript
// components/heroes/ProgramHero.tsx
// components/heroes/FundingHero.tsx
// components/heroes/CredentialHero.tsx
// components/heroes/BlogHero.tsx
```

**Program Hero**:
- Large image/video background
- Title + subtitle
- Badge (Free, Funded, etc.)
- CTA (Apply Now, Learn More)
- Quick stats (Duration, Location, Modality)

**Funding Hero**:
- Icon + title
- Eligibility summary
- CTA (Check Eligibility)
- Trust indicators (WIOA approved, etc.)

**Credential Hero**:
- Shield icon + title
- Verification input
- Trust message

**Blog Hero**:
- Category badge
- Title + author + date
- Reading time
- Share buttons

---

#### 13. Add "Last Updated" to Content Pages (MEDIUM ROI)
**Status**: ⏳ TODO  
**Impact**: Trust + SEO  
**Time**: 2 hours  

**What to do**:
```typescript
// Add to all content pages
<div className="text-sm text-gray-600 mb-4">
  Last updated: {new Date(page.updatedAt).toLocaleDateString()}
</div>
```

**Apply to**:
- Funding pages
- Policy pages
- Resource pages
- Blog posts

---

#### 14. Clarify LMS vs Programs (HIGH ROI)
**Status**: ⏳ TODO  
**Impact**: Conversion + UX  
**Time**: 3 hours  

**What to do**:
1. Add clear messaging on /programs:
   > "Programs are career pathways. Courses are learning modules inside programs."

2. Add visual distinction:
   - Programs: Briefcase icon
   - Courses: Book icon

3. Create handoff page:
   - /lms-handoff explaining transition
   - "You're entering the learning management system"
   - Clear navigation back to platform

4. Unify styling:
   - Same header/footer
   - Same color scheme
   - Same typography

---

#### 15. Audit Third-Party Scripts (CRITICAL)
**Status**: ⏳ TODO  
**Impact**: Speed + Privacy  
**Time**: 1 hour  

**What to do**:
1. List all third-party scripts:
   ```bash
   grep -r "script src=" app/ public/
   ```

2. Categorize:
   - Essential (analytics, error tracking)
   - Nice-to-have (chat, social)
   - Unnecessary (remove)

3. Optimize loading:
   ```typescript
   // Use next/script with strategy
   <Script 
     src="https://analytics.com/script.js"
     strategy="afterInteractive"
   />
   ```

4. Remove:
   - Unused analytics
   - Duplicate tracking
   - Abandoned integrations

---

## IMPLEMENTATION SCHEDULE

### Week 1 (Critical)
- Day 1: ✅ Verify Credential (DONE)
- Day 2: CTA Component + Badge System
- Day 3: Program Glance Card
- Day 4: next/image conversion (start)
- Day 5: next/image conversion (finish)

### Week 2 (High Priority)
- Day 1: Eligibility Alert + next/font
- Day 2: Program Filtering/Search
- Day 3: How It Works Stepper
- Day 4: Typography Scale
- Day 5: Lazy Loading

### Week 3 (Medium Priority)
- Day 1: Content-Specific Heroes (Program + Funding)
- Day 2: Content-Specific Heroes (Credential + Blog)
- Day 3: Last Updated dates
- Day 4: LMS Clarity
- Day 5: Third-Party Script Audit

---

## SUCCESS METRICS

### Conversion (Applications)
- **Before**: Baseline TBD
- **Target**: +25% application starts
- **Measure**: Track /apply page visits and completions

### Partner Trust (Credentials)
- **Before**: 0 verifications/month
- **Target**: 50+ verifications/month
- **Measure**: audit_log credential_viewed events

### Speed (Performance)
- **Before**: Lighthouse score TBD
- **Target**: 90+ on mobile
- **Measure**: Core Web Vitals (LCP, FID, CLS)

### Brand Polish (Consistency)
- **Before**: Inconsistent CTAs, badges, typography
- **Target**: 100% consistent components
- **Measure**: Visual audit of all pages

---

## WHAT NOT TO DO (Yet)

### ❌ Don't Bother With:
1. **Sitemap cleanup** - Do after conversion optimization
2. **Canonical tags** - Do after content is stable
3. **Internal linking optimization** - Do after key pages convert
4. **Archive old pages** - Do after analytics show low traffic
5. **Accessibility deep dive** - Do basics first, deep dive later

### ✅ Do These Instead:
1. Focus on conversion (CTAs, badges, program cards)
2. Focus on speed (images, fonts, lazy loading)
3. Focus on consistency (components, typography)
4. Focus on trust (verify credential, eligibility alerts)

---

## QUICK WINS (Do Today)

If you only have 2 hours today, do these:

1. **CTA Component** (30 min) - Highest ROI
2. **Badge System** (30 min) - Highest ROI
3. **next/font** (30 min) - Easiest performance win
4. **Typography Scale** (30 min) - Biggest visual impact

---

## STATUS TRACKING

- ✅ Task 1: Verify Credential - COMPLETE
- ⏳ Task 2: CTA Component - TODO
- ⏳ Task 3: Badge System - TODO
- ⏳ Task 4: Program Glance Card - TODO
- ⏳ Task 5: next/image - TODO
- ⏳ Task 6: Eligibility Alert - TODO
- ⏳ Task 7: Program Filtering - TODO
- ⏳ Task 8: next/font - TODO
- ⏳ Task 9: Stepper Component - TODO
- ⏳ Task 10: Typography Scale - TODO
- ⏳ Task 11: Lazy Loading - TODO
- ⏳ Task 12: Content Heroes - TODO
- ⏳ Task 13: Last Updated - TODO
- ⏳ Task 14: LMS Clarity - TODO
- ⏳ Task 15: Script Audit - TODO

**Progress**: 1/15 (7%)  
**Estimated Time**: 35 hours  
**Timeline**: 3 weeks

---

**Next Action**: Start with Task 2 (CTA Component) - 30 minutes, highest ROI

