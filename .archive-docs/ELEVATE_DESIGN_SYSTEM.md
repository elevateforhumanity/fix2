# Elevate for Humanity - Design System

**Inspired by SkilledUS, Unique to Elevate**  
**Date:** 2025-12-29

---

## Design Philosophy

**Inspiration:** SkilledUS professional workforce training aesthetic  
**Identity:** Elevate for Humanity's mission of elevation and transformation  
**Approach:** Similar structure, unique branding and content

---

## Color Palette

### Primary Colors

- **Elevate Blue:** `#1e40af` (blue-800) - Trust, professionalism, stability
- **Elevation Orange:** `#f97316` (orange-500) - Action, energy, transformation
- **Success Green:** `#10b981` (emerald-500) - Growth, achievement, progress

### Secondary Colors

- **Deep Blue:** `#1e3a8a` (blue-900) - Headers, gradients
- **Light Blue:** `#3b82f6` (blue-500) - Accents, links
- **Warm Orange:** `#fb923c` (orange-400) - Hover states
- **Dark Orange:** `#ea580c` (orange-600) - Active states

### Neutral Colors

- **Slate 900:** `#0f172a` - Primary text
- **Slate 700:** `#334155` - Secondary text
- **Slate 500:** `#64748b` - Tertiary text
- **Slate 200:** `#e2e8f0` - Borders
- **Slate 50:** `#f8fafc` - Backgrounds
- **White:** `#ffffff` - Cards, sections

---

## Typography

### Headings

- **Style:** UPPERCASE for major headings (H1, H2)
- **Weight:** Bold (700) or Extra Bold (800)
- **Font:** Inter (system default)
- **Tracking:** Wide letter-spacing for UPPERCASE

### Body Text

- **Style:** Sentence case
- **Weight:** Regular (400) or Medium (500)
- **Size:** 16px base, scales responsively
- **Line Height:** 1.6 for readability

### Mobile Optimization

- H1: 2rem (mobile) → 3.75rem (desktop)
- H2: 1.5rem (mobile) → 2.25rem (desktop)
- Body: 1rem (all sizes)

---

## Layout Structure

### Homepage Flow (Elevate-Specific)

1. **Hero Section**
   - Blue gradient background
   - "LIMITLESS OPPORTUNITIES" (inspired by SkilledUS)
   - "WHERE LEARNING LEADS TO EARNING!" (inspired by SkilledUS)
   - Orange "APPLY NOW" button
   - White "HIRE A STUDENT" button
   - Height: 400-450px

2. **Stats Bar** (Unique to Elevate)
   - IRS VITA/TCE Certified
   - WIOA Aligned
   - ACCET Accredited
   - Registered Apprenticeships

3. **Career Opportunities** (3 Cards)
   - Alignment with Industry Needs
   - Find a Location Near You
   - Hire Our Skilled Graduates

4. **Programs Grid** (Unique to Elevate)
   - Dynamic grid showing ALL 18 programs
   - Card-based layout with images
   - Hover effects and transitions

5. **Locations Section**
   - 5 Indiana locations
   - Card-based layout

6. **Testimonials** (Unique to Elevate)
   - Real student success stories
   - Blue border styling
   - 3-5 testimonials

7. **CTA Section**
   - Blue gradient background
   - "Are you ready to change your life?"
   - Orange CTA button

---

## Component Styles

### Buttons

**Primary (Orange):**

```css
bg-orange-500
hover:bg-orange-600
text-white
font-bold
uppercase
px-8 py-3 (mobile) → px-10 py-4 (desktop)
rounded-md
shadow-lg
transition-all
hover:scale-105
```

**Secondary (White Outline):**

```css
border-2 border-white
bg-transparent
text-white
hover:bg-white
hover:text-blue-900
font-bold
uppercase
px-8 py-3 (mobile) → px-10 py-4 (desktop)
rounded-md
transition-all
hover:scale-105
```

### Cards

**Program Cards:**

```css
bg-white
rounded-xl
border border-slate-200
overflow-hidden
hover:shadow-xl
transition-all duration-300
hover:-translate-y-1
```

**Feature Cards:**

```css
bg-white
border-2 border-gray-200
rounded-lg
p-8
text-center
hover:shadow-xl
transition-shadow
```

### Gradients

**Hero Gradient:**

```css
bg-gradient-to-r from-blue-900 to-blue-700
```

**CTA Gradient:**

```css
bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900
```

**Card Image Overlay:**

```css
bg-gradient-to-br from-blue-500 to-blue-700
opacity-80
```

---

## Mobile Responsiveness

### Breakpoints (Tailwind)

- **sm:** 640px - Small phones
- **md:** 768px - Tablets
- **lg:** 1024px - Small laptops
- **xl:** 1280px - Desktops
- **2xl:** 1536px - Large screens

### Mobile-First Approach

1. Design for mobile (320px) first
2. Add complexity at larger breakpoints
3. Stack elements vertically on mobile
4. Use full-width buttons on mobile
5. Reduce padding/margins on mobile

### Key Mobile Optimizations

- Hero text: 3xl (mobile) → 6xl (desktop)
- Buttons: Full width (mobile) → Auto width (desktop)
- Grid: 1 column (mobile) → 2-3 columns (desktop)
- Padding: 4 (mobile) → 8-12 (desktop)
- Images: Aspect ratio maintained, responsive sizing

---

## Unique Elevate Elements

### 1. Mission Statement

"This Is Not Graduation. This Is Elevation."

### 2. Value Propositions

- 100% Free Training
- No Student Debt
- Real Jobs Waiting
- Workforce Innovation & Opportunity Act (WIOA) Aligned

### 3. Certifications (Unique to Elevate)

- IRS VITA/TCE Certified
- ACCET Accredited
- DOL Registered Apprenticeships
- Indiana DWD Approved

### 4. Support Services (Unique to Elevate)

- Case Management
- Justice Navigation
- Transportation Resources
- Childcare Referrals
- Documentation Support

### 5. Ecosystem Integration

- Elevate for Humanity (Training)
- Selfish Inc (Body Sculpting)
- Curvature (Wellness)
- 10% + 1% partnership structure

---

## Content Guidelines

### Voice & Tone

- **Empowering:** "You can do this"
- **Direct:** Clear, actionable language
- **Supportive:** "We're here to help"
- **Professional:** Credible, trustworthy
- **Hopeful:** Focus on transformation

### Messaging Hierarchy

1. **What:** Free career training
2. **Who:** Adults 17+ in Indiana
3. **Why:** Change your life, no debt
4. **How:** Apply, train, get hired
5. **Proof:** Success stories, certifications

### Avoid

- Marketing fluff ("comprehensive," "robust")
- Overpromising
- Jargon without explanation
- Passive voice
- Negative framing

---

## Programs Page Design

### Structure

1. **Hero Section**
   - Video background
   - "Your Future Starts Here"
   - Key highlights (100% Free, No Debt, Real Jobs)

2. **How It Works** (4 Steps)
   - Apply
   - Talk to Us
   - Get Enrolled
   - Start Training

3. **All Programs Grid** (Dynamic)
   - Shows ALL 18 programs
   - Card-based layout
   - Filterable by category
   - Mobile-optimized grid

4. **CTA Section**
   - Contact information
   - Phone, email, apply button

### Program Card Design

- Image with gradient overlay
- Program name (bold)
- Duration and format
- Brief description
- "Learn More" link with arrow
- Hover: Scale up, shadow increase

---

## Individual Program Pages

### Structure

1. Breadcrumbs
2. Appointment banner (WorkOne info)
3. Hero section with program title
4. Program overview
5. What you'll learn
6. Why this program
7. How to enroll
8. Who this is for
9. Funding options
10. CTA section

### Mobile Optimization

- Stack all sections vertically
- Full-width buttons
- Readable text sizes
- Touch-friendly spacing

---

## Accessibility

### Requirements

- WCAG 2.1 AA compliance
- Color contrast ratio 4.5:1 minimum
- Keyboard navigation
- Screen reader support
- Focus indicators
- Alt text on all images
- Semantic HTML

### Implementation

- Use semantic HTML5 elements
- ARIA labels where needed
- Skip to content link
- Proper heading hierarchy
- Form labels and error messages

---

## Performance

### Optimization

- Lazy load images
- Responsive images (srcset)
- Minify CSS/JS
- Cache static assets
- CDN for images
- Compress images (WebP)

### Targets

- Lighthouse score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

---

## Brand Assets

### Logo Usage

- Primary: Full "Elevate for Humanity" logo
- Secondary: "Elevate" wordmark
- Icon: EFH monogram
- Colors: Blue or white versions

### Imagery

- Real students and graduates
- Indiana locations
- Training environments
- Diverse representation
- Professional quality

---

## Implementation Checklist

### Homepage

- [ ] Hero section with blue gradient
- [ ] UPPERCASE headings
- [ ] Orange CTA buttons
- [ ] Stats bar with certifications
- [ ] 3-card career opportunities
- [ ] Dynamic programs grid (18 programs)
- [ ] Locations section
- [ ] Testimonials
- [ ] CTA section
- [ ] Mobile responsive

### Programs Page

- [ ] Video hero
- [ ] How it works section
- [ ] ALL 18 programs displayed
- [ ] Dynamic grid layout
- [ ] Mobile optimized
- [ ] Search/filter functionality

### Individual Program Pages

- [ ] Consistent layout
- [ ] Complete information
- [ ] Mobile optimized
- [ ] Clear CTAs
- [ ] Funding information

### Global

- [ ] Mobile navigation
- [ ] Footer with links
- [ ] Consistent typography
- [ ] Color system applied
- [ ] Accessibility features
- [ ] Performance optimized

---

## Maintenance

### Regular Updates

- Add new programs as available
- Update testimonials quarterly
- Refresh imagery annually
- Review content for accuracy
- Test mobile experience
- Monitor performance metrics

### Quality Assurance

- Test on real devices
- Check all links
- Verify forms work
- Test across browsers
- Validate accessibility
- Monitor analytics

---

**Design System Version:** 1.0  
**Last Updated:** 2025-12-29  
**Maintained By:** Elevate for Humanity Team  
**Reference:** SkilledUS.org (inspiration), Elevate brand guidelines
