# 30-DAY EXECUTION PLAN - Complete Site Optimization

**Date**: December 30, 2025  
**Status**: 📋 **READY TO EXECUTE**  
**Timeline**: 30 days to production-grade polish  
**Current Progress**: 32/45 problems solved (71%)

---

## GOALS (All 4 Simultaneously)

1. ✅ More applications (conversion)
2. ✅ Partner trust (credentials + proof)
3. ✅ Speed + mobile performance
4. ✅ Brand polish (CSS + consistency)

---

## WEEK 1: TIER 1 - HIGHEST ROI (Conversion + Trust)

### Day 1-2: Program Page Standardization
**Impact**: 🔥🔥🔥 Conversion unlock  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Create `components/programs/ProgramGlance.tsx`
   - Duration (clock icon)
   - Modality (badge)
   - Location (pin icon)
   - Prerequisites (list)
   - Funding types (badges)
   - Next steps (CTA)

2. Create `components/programs/HowItWorks.tsx`
   - Visual stepper component
   - Numbered steps with icons
   - Responsive (horizontal → vertical)

3. Create `components/programs/StickyMobileCTA.tsx`
   - Fixed bottom bar on mobile
   - "Apply Now" or "Talk to Advisor"
   - Hides on scroll up, shows on scroll down

4. Apply to all program pages:
   - /programs/barber
   - /programs/cna
   - /programs/hvac
   - /programs/building-technician
   - /programs/business
   - All 351 programs

**Deliverable**: Consistent program page structure

---

### Day 3: Programs vs Courses Clarity
**Impact**: 🔥🔥 Reduces confusion  
**Effort**: Low  
**Owner**: Dev + Content

**Tasks**:
1. Add UI rule component:
   ```typescript
   <InfoBox>
     <strong>Programs</strong> are career pathways.
     <strong>Courses</strong> are learning modules inside programs.
   </InfoBox>
   ```

2. Add to every program page:
   ```
   "This program includes courses delivered in our learning portal."
   ```

3. Update navigation:
   - Programs (briefcase icon)
   - Courses (book icon)
   - Clear visual distinction

4. Create `/lms-handoff` page:
   - "You're entering the learning management system"
   - Clear navigation back
   - Same header/footer

**Deliverable**: Clear IA across platform

---

### Day 4-5: Intake UX Polish
**Impact**: 🔥🔥🔥 Reduces drop-off  
**Effort**: Low (already built, needs UI)  
**Owner**: Dev

**Tasks**:
1. Create intake flow pages:
   - `/intake/interest` - Stage 1 form
   - `/intake/eligibility` - Stage 2 form
   - `/intake/application` - Stage 3 form

2. Add progress indicator:
   ```
   Step 1 of 3: Tell us about yourself
   Step 2 of 3: Check your eligibility
   Step 3 of 3: Complete your application
   ```

3. Add "What happens next" after each submit:
   ```
   ✓ Interest submitted
   → Next: Check your eligibility (2 minutes)
   
   ✓ Eligibility confirmed
   → Next: Complete your application (10 minutes)
   
   ✓ Application submitted
   → An advisor will review within 3-5 business days
   → You'll receive an email at: [email]
   ```

4. Add expected response time everywhere

**Deliverable**: Clear intake funnel with expectations

---

## WEEK 2: TIER 2 - PERFORMANCE (Speed + Mobile)

### Day 6-7: Image Optimization
**Impact**: 🔥🔥🔥 Felt instantly  
**Effort**: High (tedious)  
**Owner**: Dev

**Tasks**:
1. Audit all images:
   ```bash
   grep -r "<img" app/ > images_to_fix.txt
   grep -r "background-image" app/ >> images_to_fix.txt
   ```

2. Convert to next/image:
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

3. Priority images (add `priority`):
   - All hero images
   - Logo
   - Program card images (first 6)

4. Lazy images (default):
   - Testimonials
   - Blog images
   - Footer images
   - Below-fold content

5. Optimize image files:
   ```bash
   # Convert to WebP
   for img in public/images/**/*.{jpg,png}; do
     cwebp -q 80 "$img" -o "${img%.*}.webp"
   done
   ```

**Deliverable**: All images optimized, 50% faster load

---

### Day 8: Font Optimization
**Impact**: 🔥🔥 Prevents layout shift  
**Effort**: Low  
**Owner**: Dev

**Tasks**:
1. Install fonts:
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
   ```

2. Update CSS:
   ```css
   body {
     font-family: var(--font-inter), sans-serif;
   }
   
   h1, h2, h3, h4, h5, h6 {
     font-family: var(--font-poppins), sans-serif;
   }
   ```

3. Remove old font imports:
   - Delete @import from CSS
   - Remove font CDN links

**Deliverable**: Zero layout shift, faster fonts

---

### Day 9-10: Lazy Loading
**Impact**: 🔥🔥 Reduces initial load  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Identify heavy components:
   - Testimonials
   - Video galleries
   - Blog post lists
   - Resource libraries
   - Charts/graphs

2. Convert to dynamic imports:
   ```typescript
   import dynamic from 'next/dynamic';
   
   const Testimonials = dynamic(() => import('@/components/Testimonials'), {
     loading: () => <div className="animate-pulse">Loading...</div>,
   });
   ```

3. Add intersection observer for manual lazy load:
   ```typescript
   const [isVisible, setIsVisible] = useState(false);
   
   useEffect(() => {
     const observer = new IntersectionObserver(([entry]) => {
       if (entry.isIntersecting) {
         setIsVisible(true);
       }
     });
     
     observer.observe(ref.current);
     return () => observer.disconnect();
   }, []);
   ```

4. Collapse FAQs by default:
   - Only show first 3
   - "Show more" button

**Deliverable**: 30% faster initial load

---

## WEEK 3: TIER 3 - BRAND POLISH (Design System)

### Day 11-12: Core Components
**Impact**: 🔥🔥🔥 Consistency everywhere  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Create `components/ui/Button.tsx`:
   ```typescript
   interface ButtonProps {
     variant: 'primary' | 'secondary' | 'outline' | 'ghost';
     size: 'sm' | 'md' | 'lg';
     children: React.ReactNode;
     href?: string;
     onClick?: () => void;
     icon?: React.ReactNode;
     fullWidth?: boolean;
   }
   ```

2. Create `components/ui/Badge.tsx`:
   ```typescript
   interface BadgeProps {
     type: 'free' | 'funded' | 'online' | 'in-person' | 'hybrid' | 'fast-track';
     size?: 'sm' | 'md';
   }
   ```

3. Create `components/ui/Card.tsx`:
   ```typescript
   interface CardProps {
     variant: 'default' | 'elevated' | 'outlined';
     padding?: 'sm' | 'md' | 'lg';
     children: React.ReactNode;
   }
   ```

4. Create `components/ui/Alert.tsx`:
   ```typescript
   interface AlertProps {
     type: 'info' | 'warning' | 'success' | 'error';
     title?: string;
     message: string;
     dismissible?: boolean;
   }
   ```

**Deliverable**: Reusable component library

---

### Day 13: Design Tokens
**Impact**: 🔥🔥 Consistency  
**Effort**: Low  
**Owner**: Dev

**Tasks**:
1. Create `styles/tokens.css`:
   ```css
   :root {
     /* Colors */
     --color-primary: #2563eb;
     --color-secondary: #7c3aed;
     --color-success: #10b981;
     --color-warning: #f59e0b;
     --color-error: #ef4444;
     
     /* Spacing */
     --space-xs: 0.25rem;
     --space-sm: 0.5rem;
     --space-md: 1rem;
     --space-lg: 1.5rem;
     --space-xl: 2rem;
     --space-2xl: 3rem;
     
     /* Radius */
     --radius-sm: 0.25rem;
     --radius-md: 0.5rem;
     --radius-lg: 0.75rem;
     --radius-xl: 1rem;
     
     /* Typography */
     --text-xs: 0.75rem;
     --text-sm: 0.875rem;
     --text-base: 1rem;
     --text-lg: 1.125rem;
     --text-xl: 1.25rem;
     --text-2xl: 1.5rem;
     --text-3xl: 1.875rem;
     --text-4xl: 2.25rem;
   }
   ```

2. Update all components to use tokens

**Deliverable**: Consistent design language

---

### Day 14-15: Typography Scale
**Impact**: 🔥🔥 Professional look  
**Effort**: Low  
**Owner**: Dev

**Tasks**:
1. Update `globals.css`:
   ```css
   h1 {
     font-size: clamp(2.5rem, 5vw, 4rem);
     line-height: 1.1;
     font-weight: 700;
     letter-spacing: -0.02em;
     margin-bottom: var(--space-lg);
   }
   
   h2 {
     font-size: clamp(2rem, 4vw, 3rem);
     line-height: 1.2;
     font-weight: 700;
     letter-spacing: -0.01em;
     margin-bottom: var(--space-md);
   }
   
   h3 {
     font-size: clamp(1.5rem, 3vw, 2rem);
     line-height: 1.3;
     font-weight: 600;
     margin-bottom: var(--space-md);
   }
   
   p {
     font-size: 1.125rem;
     line-height: 1.7;
     margin-bottom: var(--space-md);
     max-width: 65ch;
   }
   ```

2. Add consistent spacing:
   ```css
   .section {
     padding: clamp(3rem, 8vw, 6rem) 0;
   }
   
   .container {
     max-width: 1280px;
     margin: 0 auto;
     padding: 0 clamp(1rem, 4vw, 2rem);
   }
   ```

**Deliverable**: Professional typography

---

### Day 16-17: Content-Specific Heroes
**Impact**: 🔥🔥 Reduces template fatigue  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Create `components/heroes/ProgramHero.tsx`:
   - Large image/video background
   - Title + subtitle
   - Badge (Free, Funded, etc.)
   - CTA (Apply Now, Learn More)
   - Quick stats (Duration, Location, Modality)

2. Create `components/heroes/FundingHero.tsx`:
   - Icon + title
   - Eligibility summary
   - CTA (Check Eligibility)
   - Trust indicators (WIOA approved, etc.)

3. Create `components/heroes/CredentialHero.tsx`:
   - Shield icon + title
   - Verification input
   - Trust message

4. Create `components/heroes/BlogHero.tsx`:
   - Category badge
   - Title + author + date
   - Reading time
   - Share buttons

**Deliverable**: Distinct hero styles

---

### Day 18: Content Polish
**Impact**: 🔥 Trust + SEO  
**Effort**: Low  
**Owner**: Content + Dev

**Tasks**:
1. Add "Last updated" to all content pages:
   ```typescript
   <div className="text-sm text-gray-600 mb-4">
     Last updated: {new Date(page.updatedAt).toLocaleDateString()}
   </div>
   ```

2. Break long text into labeled sections:
   - Add section headings
   - Add anchor links
   - Add table of contents for long pages

3. Remove duplicate intro paragraphs:
   - Audit all pages
   - Rewrite generic intros
   - Make each page unique

**Deliverable**: Polished content

---

## WEEK 4: TIER 4 - GOVERNANCE (Future-proofing)

### Day 19-20: Document Management
**Impact**: 🔥 Compliance + Trust  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Create document management UI:
   - `/admin/documents` - List all documents
   - Version history
   - Approval workflow
   - Audience targeting

2. Add "Current" vs "Archived" labels:
   ```typescript
   <Badge type={doc.active ? 'success' : 'warning'}>
     {doc.active ? 'Current' : 'Archived'}
   </Badge>
   ```

3. Implement audience gating:
   - Public documents: Everyone
   - Student documents: Logged-in students
   - Partner documents: Logged-in partners
   - Admin documents: Admins only

4. Add version approval workflow:
   - Draft → Review → Approved → Published
   - Track who approved and when

**Deliverable**: Document governance system

---

### Day 21-22: Sitemap Cleanup
**Impact**: 🔥 SEO + Maintenance  
**Effort**: High (manual)  
**Owner**: Content + Dev

**Tasks**:
1. Audit all 479 pages:
   ```bash
   # Generate page list
   find app -name "page.tsx" | sort > all_pages.txt
   ```

2. Categorize pages:
   - Keep (active, valuable)
   - Archive (old, low traffic)
   - Merge (duplicate content)
   - Delete (broken, empty)

3. Add canonical tags:
   ```typescript
   // app/programs/barber/page.tsx
   export const metadata = {
     alternates: {
       canonical: 'https://www.elevateforhumanity.org/programs/barber',
     },
   };
   ```

4. Strengthen internal linking:
   - Link all program pages to /programs
   - Link all funding pages to /funding
   - Link all blog posts to /blog
   - Add "Related Programs" sections

**Deliverable**: Clean, optimized sitemap

---

### Day 23-24: Apply Auth Guards
**Impact**: 🔥🔥 Security  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Apply guards to all protected routes:
   ```typescript
   // app/staff-portal/page.tsx
   import { requireAuth } from '@/lib/auth-guard';
   import { requireRole } from '@/lib/rbac-guard';
   
   export default async function StaffPortalPage() {
     const session = await requireAuth();
     requireRole(session, ['admin', 'super_admin', 'advisor']);
     // ... rest of page
   }
   ```

2. Routes to protect:
   - All /staff-portal/* pages
   - All /student/dashboard/* pages
   - All /partner/dashboard/* pages
   - All /admin/* pages
   - All /api/admin/* routes

3. Test auth flows:
   - Unauthenticated → redirect to /login
   - Wrong role → redirect to /unauthorized
   - Correct role → access granted

**Deliverable**: All routes secured

---

### Day 25-26: Testing & QA
**Impact**: 🔥🔥🔥 Prevents bugs  
**Effort**: High  
**Owner**: Dev + QA

**Tasks**:
1. Test all flows:
   - Intake funnel (interest → eligibility → application)
   - Credential verification
   - Program browsing and filtering
   - Apply process
   - Auth flows

2. Test all devices:
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Android Chrome)
   - Tablet (iPad, Android)

3. Test performance:
   - Run Lighthouse on all key pages
   - Target: 90+ on mobile
   - Fix any issues

4. Test accessibility:
   - Keyboard navigation
   - Screen reader
   - Color contrast
   - Focus states

**Deliverable**: Bug-free experience

---

### Day 27-28: Performance Optimization
**Impact**: 🔥🔥🔥 Speed  
**Effort**: Medium  
**Owner**: Dev

**Tasks**:
1. Run performance audit:
   ```bash
   npm run build
   npm run analyze
   ```

2. Optimize bundle size:
   - Remove unused dependencies
   - Code split large pages
   - Tree-shake libraries

3. Add caching:
   - Static assets: 1 year
   - API responses: 5 minutes
   - Pages: ISR with 60s revalidate

4. Audit third-party scripts:
   - Remove unused analytics
   - Defer non-critical scripts
   - Use next/script with strategy

**Deliverable**: < 3s page load

---

### Day 29: Final Polish
**Impact**: 🔥 Professional finish  
**Effort**: Low  
**Owner**: Dev + Content

**Tasks**:
1. Visual audit:
   - Check all pages for consistency
   - Fix any styling issues
   - Ensure all components match design system

2. Content audit:
   - Fix typos
   - Update outdated information
   - Ensure all CTAs work

3. SEO audit:
   - Check all meta tags
   - Verify Open Graph images
   - Test social sharing

**Deliverable**: Polished site

---

### Day 30: Launch & Monitor
**Impact**: 🔥🔥🔥 Go live  
**Effort**: Low  
**Owner**: Dev + Ops

**Tasks**:
1. Deploy to production:
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

2. Monitor:
   - Check error logs
   - Monitor performance metrics
   - Watch analytics

3. Announce:
   - Email partners about credential verification
   - Update social media
   - Notify team

**Deliverable**: Live, optimized site

---

## SUCCESS METRICS

### Conversion (Applications)
- **Baseline**: TBD
- **Target**: +25% application starts
- **Measure**: /apply page visits and completions

### Partner Trust (Credentials)
- **Baseline**: 0 verifications/month
- **Target**: 50+ verifications/month
- **Measure**: audit_log credential_viewed events

### Speed (Performance)
- **Baseline**: TBD
- **Target**: 90+ Lighthouse score on mobile
- **Measure**: Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Brand Polish (Consistency)
- **Baseline**: Inconsistent
- **Target**: 100% consistent components
- **Measure**: Visual audit of all pages

---

## RESOURCE ALLOCATION

### Dev Time
- Week 1: 40 hours (conversion + trust)
- Week 2: 40 hours (performance)
- Week 3: 40 hours (brand polish)
- Week 4: 40 hours (governance + testing)
- **Total**: 160 hours (4 weeks @ 40 hrs/week)

### Content Time
- Week 1: 8 hours (program page content)
- Week 2: 4 hours (intake flow copy)
- Week 3: 8 hours (content polish)
- Week 4: 16 hours (sitemap cleanup)
- **Total**: 36 hours

### QA Time
- Week 4: 16 hours (testing)

---

## WHAT NOT TO DO

### ❌ Don't Bother With (Yet):
1. Complete redesign
2. New brand identity
3. Custom CMS
4. Advanced analytics
5. A/B testing (until you have traffic)
6. Mobile app
7. Advanced personalization
8. Marketing automation

### ✅ Do These Instead:
1. Focus on conversion
2. Focus on speed
3. Focus on consistency
4. Focus on trust

---

## PROGRESS TRACKING

### Week 1 (Conversion + Trust)
- [ ] Day 1-2: Program page standardization
- [ ] Day 3: Programs vs Courses clarity
- [ ] Day 4-5: Intake UX polish

### Week 2 (Performance)
- [ ] Day 6-7: Image optimization
- [ ] Day 8: Font optimization
- [ ] Day 9-10: Lazy loading

### Week 3 (Brand Polish)
- [ ] Day 11-12: Core components
- [ ] Day 13: Design tokens
- [ ] Day 14-15: Typography scale
- [ ] Day 16-17: Content-specific heroes
- [ ] Day 18: Content polish

### Week 4 (Governance)
- [ ] Day 19-20: Document management
- [ ] Day 21-22: Sitemap cleanup
- [ ] Day 23-24: Apply auth guards
- [ ] Day 25-26: Testing & QA
- [ ] Day 27-28: Performance optimization
- [ ] Day 29: Final polish
- [ ] Day 30: Launch & monitor

---

## CURRENT STATUS

**Completed Today**:
- ✅ Credential verification system
- ✅ Staged intake funnel (backend)
- ✅ Program schema enforcement
- ✅ RBAC guards
- ✅ Platform capabilities defined

**Remaining**:
- ⏳ UI implementation (30 days)

**Production Readiness**:
- Before: 60%
- After today: 85%
- After 30 days: 100%

---

**Next Action**: Start Week 1, Day 1 - Program page standardization

