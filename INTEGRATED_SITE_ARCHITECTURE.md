# Integrated Site Architecture: Marketing + LMS Platform

## Overview

This document outlines the architecture for the integrated Elevate for Humanity platform, combining:
1. **Public Marketing Website** - Program information, funding details, blog, application flow
2. **LMS Platform** - Course delivery, video lessons, analytics, leaderboards
3. **Unified Experience** - Seamless navigation, shared authentication, integrated user journey

---

## Routing Strategy

### Marketing Routes (Public - Root Level)
```
/                           → Marketing homepage
/programs                   → Programs overview
/programs/medical-assistant → Medical Assistant program page
/programs/phlebotomy        → Phlebotomy program page
/programs/ekg-technician    → EKG Technician program page
/programs/pharmacy-technician → Pharmacy Technician program page
/programs/dental-assistant  → Dental Assistant program page
/programs/patient-care-technician → Patient Care Technician program page
/programs/sterile-processing → Sterile Processing program page
/programs/healthcare-administration → Healthcare Administration program page

/funding                    → Funding overview
/funding/state-programs     → State funding (WRG, Next Level Jobs)
/funding/federal-programs   → Federal funding (WIOA, Pell Grants)

/blog                       → Blog listing
/blog/[slug]                → Individual blog posts

/students                   → For Students page
/employers                  → For Employers page
/about                      → About page
/contact                    → Contact page

/apply                      → Application flow (multi-step)
/apply/step-1               → Personal information
/apply/step-2               → Program selection
/apply/step-3               → Funding eligibility
/apply/step-4               → Review & submit

/refund-policy              → Refund policy
/privacy-policy             → Privacy policy
/terms-of-service           → Terms of service
```

### LMS Routes (Authenticated - /lms, /portal, /instructor)
```
/lms                        → LMS landing/redirect
/lms/courses                → Course catalog
/lms/courses/[id]           → Course detail page
/lms/courses/[id]/lessons/[lessonId] → Lesson player

/portal                     → Student dashboard
/portal/courses             → My courses
/portal/progress            → Progress tracking
/portal/achievements        → Achievements & badges
/portal/leaderboard         → Global leaderboard
/portal/settings            → Account settings

/instructor                 → Instructor dashboard
/instructor/courses         → Manage courses
/instructor/analytics       → Course analytics
/instructor/students        → Student management
```

### API Routes
```
/api/auth/*                 → Authentication endpoints
/api/courses/*              → Course management
/api/lessons/*              → Lesson management
/api/progress/*             → Progress tracking
/api/leaderboard/*          → Leaderboard data
/api/analytics/*            → Analytics data
/api/applications/*         → Application submissions
/api/contact/*              → Contact form submissions
```

---

## Component Architecture

### Shared Components (Used Across Marketing + LMS)

#### 1. **MainNav** (Current)
- Location: `components/layout/MainNav.tsx`
- Used in: Root layout
- Features:
  - Programs dropdown with 8 program links
  - Funding dropdown (State/Federal)
  - Main navigation (Students, Employers, About, Contact, Blog)
  - Login/Dashboard button (conditional based on auth state)
  - Mobile responsive menu

#### 2. **SiteFooter** (Current)
- Location: `components/layout/Footer.tsx`
- Used in: Root layout
- Features:
  - Quick links to programs
  - Funding information
  - Legal links
  - Social media
  - Contact information

#### 3. **ElevateChatWidget** (Current)
- Location: `components/ElevateChatWidget.tsx`
- Used in: Root layout
- Features:
  - Floating chat button
  - AI-powered assistance
  - Available on all pages

### Marketing-Specific Components

#### 1. **ProgramHero**
- Location: `components/marketing/ProgramHero.tsx`
- Purpose: Hero section for program landing pages
- Props: title, description, image, ctaText, ctaLink

#### 2. **ProgramOutcomes**
- Location: `components/marketing/ProgramOutcomes.tsx`
- Purpose: Display program outcomes (salary, job titles, duration)
- Props: outcomes array

#### 3. **FundingOptions**
- Location: `components/marketing/FundingOptions.tsx`
- Purpose: Display funding options for programs
- Props: fundingTypes array

#### 4. **ApplicationForm**
- Location: `components/marketing/ApplicationForm.tsx`
- Purpose: Multi-step application form
- Features: Form validation, progress indicator, submission

#### 5. **BlogCard**
- Location: `components/marketing/BlogCard.tsx`
- Purpose: Blog post preview card
- Props: title, excerpt, image, date, author, slug

#### 6. **TestimonialCarousel**
- Location: `components/marketing/TestimonialCarousel.tsx`
- Purpose: Student testimonials
- Props: testimonials array

### LMS-Specific Components (Already Built)

#### 1. **ProfessionalVideoPlayer**
- Location: `components/lms/ProfessionalVideoPlayer.tsx`
- Purpose: Video lesson player with captions
- Features: Playback controls, captions, progress tracking

#### 2. **CourseLeaderboard**
- Location: `components/lms/CourseLeaderboard.tsx`
- Purpose: Course-specific leaderboard
- Props: courseId

#### 3. **GlobalLeaderboard**
- Location: `components/lms/GlobalLeaderboard.tsx`
- Purpose: Platform-wide leaderboard
- Features: Filtering, pagination

#### 4. **InstructorAnalytics**
- Location: `components/lms/InstructorAnalytics.tsx`
- Purpose: Course analytics dashboard
- Features: Charts, metrics, student progress

#### 5. **StudentDashboard**
- Location: `components/portal/StudentDashboard.tsx`
- Purpose: Student portal homepage
- Features: Course progress, achievements, quick actions

---

## Authentication Flow

### User Journey: Marketing → Application → LMS

```
1. User visits marketing site (/)
   ↓
2. Explores programs (/programs/medical-assistant)
   ↓
3. Clicks "Apply Now" → /apply
   ↓
4. Completes application form (4 steps)
   ↓
5. Application submitted → Creates user account
   ↓
6. Email verification sent
   ↓
7. User verifies email → /verify-email?token=xxx
   ↓
8. Redirected to /portal (Student Dashboard)
   ↓
9. Enrollment process begins
   ↓
10. User enrolled in selected program
    ↓
11. Access to /lms/courses/[id]
```

### Authentication States

#### Public (No Auth Required)
- All marketing pages
- Blog
- Program pages
- Funding pages
- Application form (step 1-4)

#### Authenticated (Login Required)
- /portal/* (Student dashboard)
- /lms/* (Course access)
- /instructor/* (Instructor dashboard)

#### Role-Based Access
- **Student**: /portal/*, /lms/courses/[enrolled-courses]
- **Instructor**: /instructor/*, /lms/courses/[teaching-courses]
- **Admin**: /admin/* (all access)

---

## Database Schema Integration

### Marketing → LMS Connection

#### 1. **applications** table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_id UUID REFERENCES programs(id),
  funding_type TEXT, -- 'wioa', 'wrg', 'next-level-jobs', 'self-pay'
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'enrolled'
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. **users** table (Extended)
```sql
-- Add marketing source tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS source TEXT; -- 'marketing', 'direct', 'referral'
ALTER TABLE users ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES applications(id);
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false;
```

#### 3. **programs** table (Shared)
```sql
-- Used by both marketing and LMS
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  duration_weeks INTEGER,
  cost DECIMAL(10,2),
  salary_range TEXT, -- e.g., "$35,000 - $45,000"
  job_titles TEXT[], -- Array of job titles
  outcomes JSONB, -- Detailed outcomes data
  funding_eligible BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Navigation Integration

### MainNav Component Logic

```typescript
// Conditional navigation based on auth state
const MainNav = () => {
  const { user, isLoading } = useAuth();
  
  return (
    <nav>
      {/* Always visible */}
      <ProgramsDropdown />
      <FundingDropdown />
      <Link href="/students">For Students</Link>
      <Link href="/employers">For Employers</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog">Blog</Link>
      
      {/* Conditional based on auth */}
      {!user && !isLoading && (
        <>
          <Link href="/apply">Apply Now</Link>
          <Link href="/login">Login</Link>
        </>
      )}
      
      {user && (
        <>
          <Link href="/portal">Dashboard</Link>
          {user.role === 'instructor' && (
            <Link href="/instructor">Instructor</Link>
          )}
          <UserMenu />
        </>
      )}
    </nav>
  );
};
```

### Programs Dropdown

```typescript
const programsDropdown = [
  { name: 'Medical Assistant', href: '/programs/medical-assistant' },
  { name: 'Phlebotomy Technician', href: '/programs/phlebotomy' },
  { name: 'EKG Technician', href: '/programs/ekg-technician' },
  { name: 'Pharmacy Technician', href: '/programs/pharmacy-technician' },
  { name: 'Dental Assistant', href: '/programs/dental-assistant' },
  { name: 'Patient Care Technician', href: '/programs/patient-care-technician' },
  { name: 'Sterile Processing Technician', href: '/programs/sterile-processing' },
  { name: 'Healthcare Administration', href: '/programs/healthcare-administration' },
];
```

---

## Layout Strategy

### Root Layout (app/layout.tsx)
- **Current**: MainNav + SiteFooter + ElevateChatWidget
- **Applies to**: All pages (marketing + LMS)
- **Features**: Global navigation, footer, chat widget

### LMS Layout (app/lms/layout.tsx)
- **Additional**: LMS-specific sidebar, breadcrumbs
- **Applies to**: /lms/* routes
- **Features**: Course navigation, progress indicator

### Portal Layout (app/portal/layout.tsx)
- **Additional**: Student dashboard sidebar
- **Applies to**: /portal/* routes
- **Features**: Quick actions, notifications, profile

### Instructor Layout (app/instructor/layout.tsx)
- **Additional**: Instructor dashboard sidebar
- **Applies to**: /instructor/* routes
- **Features**: Course management, analytics shortcuts

---

## Styling Consistency

### Design System (Shared)

#### Colors
```css
/* Brand Colors */
--primary: #10b981; /* Green */
--secondary: #3b82f6; /* Blue */
--accent: #f59e0b; /* Amber */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;

/* Neutrals */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;
```

#### Typography
```css
/* Font Family */
font-family: 'Inter', sans-serif;

/* Headings */
h1: 3rem (48px), font-weight: 800
h2: 2.25rem (36px), font-weight: 700
h3: 1.875rem (30px), font-weight: 600
h4: 1.5rem (24px), font-weight: 600

/* Body */
body: 1rem (16px), font-weight: 400
small: 0.875rem (14px)
```

#### Spacing
```css
/* Consistent spacing scale */
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
```

---

## SEO Strategy

### Marketing Pages
- **Meta tags**: Title, description, keywords
- **Open Graph**: Social sharing images
- **Structured data**: Organization, Course, FAQPage
- **Sitemap**: All public pages
- **Robots.txt**: Allow all marketing pages

### LMS Pages
- **Meta tags**: Minimal (authenticated pages)
- **Robots.txt**: Disallow /lms/*, /portal/*, /instructor/*
- **No indexing**: Authenticated content

---

## Performance Optimization

### Marketing Pages
- **Static Generation**: All program pages, blog posts
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Route-based splitting
- **Caching**: Aggressive caching for static content

### LMS Pages
- **Server Components**: Default for data fetching
- **Client Components**: Interactive elements only
- **Streaming**: Progressive rendering for dashboards
- **Prefetching**: Course data on hover

---

## Deployment Strategy

### Single Deployment (Recommended)
- **Platform**: Vercel
- **Domain**: elevateforhumanity.org
- **Environment**: Production
- **Features**:
  - Automatic HTTPS
  - Edge caching for marketing pages
  - Serverless functions for API routes
  - Preview deployments for branches

### Environment Variables
```bash
# Database
DATABASE_URL=
DIRECT_URL=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

---

## Testing Strategy

### Marketing Pages
- **Unit Tests**: Component rendering
- **Integration Tests**: Form submissions
- **E2E Tests**: Application flow
- **Accessibility**: WCAG 2.1 AA compliance

### LMS Pages
- **Unit Tests**: Video player, progress tracking
- **Integration Tests**: Course enrollment, lesson completion
- **E2E Tests**: Complete learning journey
- **Performance**: Load testing for video streaming

---

## Migration Path

### Phase 1: Marketing Site (Current Focus)
1. ✅ Root layout with MainNav + SiteFooter
2. ⏳ Build marketing homepage
3. ⏳ Create 8 program landing pages
4. ⏳ Build funding pages
5. ⏳ Create blog system
6. ⏳ Build application flow

### Phase 2: Integration
1. Connect application form to user creation
2. Email verification flow
3. Redirect to student portal after verification
4. Enrollment process

### Phase 3: LMS Enhancement
1. Improve course catalog
2. Enhanced video player
3. Better analytics
4. Mobile optimization

### Phase 4: Polish
1. Performance optimization
2. SEO improvements
3. Accessibility audit
4. User testing

---

## Success Metrics

### Marketing Site
- **Traffic**: Page views, unique visitors
- **Engagement**: Time on site, bounce rate
- **Conversions**: Application submissions
- **SEO**: Search rankings, organic traffic

### LMS Platform
- **Enrollment**: Active students, course completions
- **Engagement**: Video watch time, lesson completions
- **Performance**: Course completion rates, time to completion
- **Satisfaction**: Student feedback, NPS scores

---

## Next Steps

1. ✅ Complete site structure plan
2. ⏳ Build SiteHeader component with Programs dropdown
3. ⏳ Build SiteFooter component
4. ⏳ Build ChatAssistant component
5. ⏳ Create marketing homepage
6. ⏳ Create program landing pages (8 pages)
7. ⏳ Create funding pages
8. ⏳ Create blog system
9. ⏳ Build application flow
10. ⏳ Integrate authentication
11. ⏳ Test complete user journey

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-23  
**Status**: In Progress
