# Complete Site Architecture - Elevate Connects Directory

## Based on Coursera Analysis

### CORE PAGES (Must Have)

#### 1. Homepage (/)

- Hero with search bar
- Category browse (Healthcare, Trades, Technology, Business)
- Featured programs (8-12 cards)
- Stats section (students trained, job placement, partners)
- Partner logos
- Student testimonials (3-4 with photos)
- How it works (3 steps)
- CTA section

#### 2. Programs Catalog (/programs)

- Filter sidebar (Category, Duration, Location, Funding Type)
- Search bar with autocomplete
- Sort options (Popular, Newest, A-Z)
- Program cards grid (image, title, provider, duration, funding badge)
- Pagination
- "Load more" button
- Breadcrumbs

#### 3. Individual Program Pages (/programs/[slug])

- Hero with program image
- Program title, provider, duration
- "Apply Now" CTA (sticky)
- Overview tab
- Curriculum tab
- Instructors tab
- Reviews/Testimonials tab
- FAQs tab
- Related programs
- Funding information
- Prerequisites
- Career outcomes

#### 4. Browse by Category (/browse/[category])

- Healthcare
- Skilled Trades
- Technology
- Business
- Each with filtered program list

#### 5. About (/about)

- Mission & Vision
- Our Story
- Team (with photos and bios)
- Stats & Impact
- Partners & Certifications
- Timeline/History
- Values

#### 6. Contact (/contact)

- Contact form (with validation)
- Phone, email, address
- Office hours
- Map integration
- FAQ link
- Live chat widget

#### 7. FAQ (/faq)

- Searchable
- Categories (Eligibility, Application, Programs, Funding, Support)
- Expandable questions
- "Still have questions?" CTA

### USER PORTALS

#### 8. Student Portal (/student)

- Dashboard
  - My Programs
  - Progress tracking
  - Upcoming deadlines
  - Messages
  - Certificates
- Profile
  - Personal info
  - Documents
  - Settings
- Applications
  - Active applications
  - Application history
  - Status tracking

#### 9. Employer Portal (/employer)

- Dashboard
  - Posted jobs
  - Candidate pipeline
  - Analytics
- Post a Job
- Browse Candidates
- Reports

#### 10. Program Holder Portal (/program-holder)

- Dashboard
- Student roster
- Reporting
- Compliance docs

### APPLICATION FLOW

#### 11. Apply (/apply)

- Step 1: Eligibility Check
  - Quick questions
  - Instant results
- Step 2: Program Selection
  - Browse or search
  - Add to application
- Step 3: Personal Information
  - Contact details
  - Demographics
  - Employment history
- Step 4: Documents
  - Upload required docs
  - Document checklist
- Step 5: Review & Submit
  - Summary
  - Terms acceptance
  - Submit button
- Step 6: Confirmation
  - Application number
  - Next steps
  - Timeline

### AUTHENTICATION

#### 12. Login (/login)

- Email/password
- Social login (Google, Facebook)
- "Forgot password" link
- "Create account" link

#### 13. Signup (/signup)

- Account type selection (Student, Employer, Program Holder)
- Registration form
- Email verification

#### 14. Password Reset (/reset-password)

- Email input
- Verification code
- New password

### CONTENT PAGES

#### 15. Blog/Resources (/blog)

- Article list
- Categories
- Search
- Featured articles

#### 16. Success Stories (/success-stories)

- Student testimonials
- Before/after stories
- Video interviews
- Filter by program

#### 17. Partners (/partners)

- Training providers
- Employer partners
- Government agencies
- Become a partner CTA

#### 18. Careers (/careers)

- Job board
- Filter by category, location
- Job detail pages
- Apply button

### LEGAL & SUPPORT

#### 19. Privacy Policy (/privacy)

#### 20. Terms of Service (/terms)

#### 21. Accessibility (/accessibility)

#### 22. Sitemap (/sitemap)

### ERROR PAGES

#### 23. 404 Not Found

#### 24. 500 Server Error

#### 25. Maintenance Mode

---

## COMPONENT LIBRARY

### Navigation

- Header (sticky)
  - Logo
  - Main nav
  - Search
  - User menu
  - CTA button
- Footer
  - 5 columns (Programs, Resources, Company, Legal, Connect)
  - Social links
  - Newsletter signup
  - Copyright

### Cards

- Program Card
  - Image
  - Category badge
  - Title
  - Provider
  - Duration
  - Funding badge
  - CTA button
- Testimonial Card
  - Photo
  - Quote
  - Name
  - Program
  - Rating
- Partner Logo Card
- Blog Card

### Forms

- Input fields
- Select dropdowns
- Checkboxes
- Radio buttons
- File upload
- Form validation
- Error messages
- Success messages

### Buttons

- Primary (blue)
- Secondary (outline)
- Tertiary (text)
- Disabled state
- Loading state

### Modals

- Login modal
- Video modal
- Confirmation modal
- Alert modal

### Other

- Breadcrumbs
- Pagination
- Loading spinner
- Progress bar
- Tabs
- Accordion
- Toast notifications
- Search autocomplete
- Filter sidebar
- Stats counter
- Rating stars
- Badge/Tag

---

## DESIGN SYSTEM

### Colors

```css
/* Primary */
--blue-600: #0056d2;
--blue-700: #004bb8;

/* Neutrals */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-600: #475569;
--slate-700: #334155;
--slate-900: #0f172a;

/* Semantic */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

### Typography

```css
/* Font Family */
font-family:
  Inter,
  system-ui,
  -apple-system,
  sans-serif;

/* Scale */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Breakpoints

```css
--mobile: 640px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
```

---

## FEATURES TO IMPLEMENT

### Search

- Global search in header
- Autocomplete suggestions
- Recent searches
- Popular searches
- Filter by type (Programs, Articles, FAQs)

### Filters

- Category
- Duration
- Location
- Funding type
- Start date
- Difficulty level

### Personalization

- Recommended programs
- Continue where you left off
- Recently viewed
- Saved programs

### Social Proof

- Student count
- Job placement rate
- Partner count
- Average rating
- Testimonials
- Success stories

### Trust Signals

- Partner logos (DWD, WorkOne, DOL)
- Certifications
- Awards
- Press mentions
- Security badges

### Performance

- Image optimization (WebP, lazy loading)
- Code splitting
- CDN for static assets
- Caching strategy
- Preloading critical resources

### SEO

- Meta tags (title, description, OG)
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Alt text for images

### Analytics

- Google Analytics
- Event tracking
- Conversion tracking
- Heatmaps
- User recordings

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus indicators
- Alt text
- ARIA labels
- Color contrast

---

## PRIORITY ORDER

### Phase 1: Core Pages (Week 1)

1. Homepage (complete redesign)
2. Programs catalog
3. Individual program pages
4. About
5. Contact

### Phase 2: User Features (Week 2)

6. Authentication (login/signup)
7. Student portal
8. Application flow
9. Search functionality

### Phase 3: Content & Polish (Week 3)

10. FAQ
11. Success stories
12. Blog/Resources
13. Component library
14. Design system documentation

### Phase 4: Advanced Features (Week 4)

15. Employer portal
16. Program holder portal
17. Advanced search/filters
18. Personalization
19. Analytics integration

### Phase 5: Optimization & Launch (Week 5)

20. Performance optimization
21. SEO implementation
22. Accessibility audit
23. Cross-browser testing
24. Mobile testing
25. Production deployment

---

## SUCCESS METRICS

- Page load time < 2 seconds
- Mobile responsive on all pages
- WCAG 2.1 AA compliant
- 90+ Lighthouse score
- Zero console errors
- All links working
- Forms validated
- Images optimized
- SEO meta tags complete
- Analytics tracking active
