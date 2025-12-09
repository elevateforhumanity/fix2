# Design Audit & Improvement Plan

## Current Status Analysis

### ✅ What's Working:
1. **Hero Banner** - Using high-quality Unsplash images (1920x1080, q=90)
2. **Mobile Responsive** - Proper breakpoints and sizing
3. **Modern Layout** - Clean grid system with proper spacing
4. **Image Optimization** - Next.js Image component with proper sizes

### 🔧 Areas for Improvement:

## 1. Hero Banner Quality
**Current:** Using Unsplash stock photo
**Target:** Crystal clear, bright, professional branded images

### Action Items:
- [ ] Replace hero banner with custom high-resolution image (2400x1350 minimum)
- [ ] Ensure image is bright, well-lit, and shows real students/programs
- [ ] Add proper alt text for accessibility
- [ ] Optimize for Core Web Vitals (LCP < 2.5s)

## 2. Profile Pictures
**Current:** Need to identify where profile pictures are used
**Target:** Professional headshots, consistent sizing

### Action Items:
- [ ] Audit all pages with profile/team images
- [ ] Replace with high-quality professional photos
- [ ] Standardize dimensions (e.g., 400x400 for profiles)
- [ ] Ensure consistent lighting and background

## 3. Program Pages Hero Banners
**Current:** Need to audit each program page
**Target:** Unique, relevant, high-quality hero for each program

### Programs to Check:
- [ ] Barber Apprenticeship
- [ ] CNA/Healthcare
- [ ] Construction
- [ ] Culinary
- [ ] IT/Technology
- [ ] All other programs

### Requirements:
- Minimum 1920x1080 resolution
- Bright, clear, professional
- Relevant to program content
- Consistent overlay/text treatment

## 4. Layout & Sizing Issues

### Forms:
- [ ] Audit all form pages
- [ ] Check input field sizing consistency
- [ ] Verify mobile responsiveness
- [ ] Test submit button placement

### Gaps & Spacing:
- [ ] Check for unwanted whitespace
- [ ] Verify consistent padding/margins
- [ ] Test on multiple screen sizes
- [ ] Fix any layout shifts

## 5. Infrastructure Comparison

### Enterprise-Level Features to Add:
1. **Navigation**
   - Mega menu for programs
   - Sticky header on scroll
   - Mobile hamburger menu

2. **Content Sections**
   - Stats/metrics section
   - Testimonials carousel
   - Partner logos grid
   - Video backgrounds

3. **Interactive Elements**
   - Smooth scroll animations
   - Hover effects
   - Loading states
   - Micro-interactions

4. **Performance**
   - Image lazy loading
   - Code splitting
   - CDN optimization
   - Caching strategy

## 6. Missing Features Checklist

Compare against enterprise sites:
- [ ] Live chat widget
- [ ] Search functionality
- [ ] Breadcrumb navigation
- [ ] Social proof badges
- [ ] Trust indicators
- [ ] Newsletter signup
- [ ] Social media integration
- [ ] Accessibility features (WCAG 2.1 AA)

## Implementation Priority

### Phase 1: Critical (Do First)
1. Replace hero banner with crystal clear image
2. Fix any layout gaps/sizing issues
3. Audit and fix all program page heroes

### Phase 2: Important
1. Replace profile pictures
2. Standardize form layouts
3. Add missing navigation features

### Phase 3: Enhancement
1. Add interactive elements
2. Implement animations
3. Add social proof elements

## Image Requirements

### Hero Banners:
- **Resolution:** 2400x1350 minimum (16:9 ratio)
- **Format:** WebP with JPEG fallback
- **Quality:** 85-90
- **File Size:** < 300KB after optimization
- **Content:** Bright, clear, professional, relevant

### Profile Pictures:
- **Resolution:** 800x800 minimum (1:1 ratio)
- **Format:** WebP with JPEG fallback
- **Quality:** 90
- **File Size:** < 100KB after optimization
- **Content:** Professional headshot, consistent background

### Program Cards:
- **Resolution:** 1200x800 (3:2 ratio)
- **Format:** WebP with JPEG fallback
- **Quality:** 85
- **File Size:** < 200KB after optimization
- **Content:** Action shots, relevant to program

## Next Steps

1. **Provide Your Live URL** - Need to see actual deployed site
2. **Screenshot Current Issues** - Drag into VSCode to show specific problems
3. **Identify Priority Pages** - Which pages need immediate attention
4. **Source New Images** - Where to get replacement images
