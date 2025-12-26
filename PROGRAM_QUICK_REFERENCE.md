# PROGRAM QUICK REFERENCE - Developer Guide

**Date:** December 26, 2025  
**Purpose:** Quick lookup for program data sources and relationships  
**Audience:** Developers working on program/course features

---

## WHERE TO FIND PROGRAM DATA

### 1. Database Programs (6 programs) ✅ AUTHORITATIVE
**Location:** PostgreSQL `programs` table  
**Seed File:** `/supabase/seed/programs_seed.sql`  
**Schema:** `/supabase/migrations/20251205_programs_complete.sql`

**Query:**
```sql
SELECT * FROM programs WHERE is_active = true ORDER BY display_order;
```

**Programs:**
1. `hvac-technician` - HVAC Technician Training
2. `barber-apprenticeship` - Barber Apprenticeship Pathway
3. `cna-training` - Certified Nursing Assistant (CNA) Training
4. `building-technician` - Building Technician & Maintenance
5. `cdl-and-transport` - CDL & Transportation Careers
6. `career-readiness` - Career Readiness & Life Design

---

### 2. API Programs (31 programs) ⚠️ DEPRECATED
**Location:** `/lib/programs-data-complete.ts`  
**API Route:** `/app/api/programs/route.ts`  
**Interface:** `ProgramData`

**Usage:**
```typescript
import { COMPLETE_PROGRAMS } from '@/lib/programs-data-complete';

// Get all programs
const programs = COMPLETE_PROGRAMS;

// Get by slug
const program = COMPLETE_PROGRAMS.find(p => p.slug === 'hvac-technician');
```

**Status:** Should be migrated to database

---

### 3. Site Programs (21 programs) ⚠️ DEPRECATED
**Location:** `/app/data/programs.ts`  
**Used By:** `/app/programs/[slug]/page.tsx`  
**Interface:** `Program`

**Usage:**
```typescript
import { programs } from '@/app/data/programs';

// Get all programs
const allPrograms = programs;

// Get by slug
const program = programs.find(p => p.slug === 'hvac-technician');
```

**Status:** Should be migrated to database

---

### 4. LMS Programs (13 programs) ⚠️ INTERNAL
**Location:** `/lms-data/programs.ts`  
**Interface:** `Program`, `ProgramWithPartners`

**Usage:**
```typescript
import { getProgramBySlug } from '@/lms-data/programs';

const program = getProgramBySlug('cna');
```

**Status:** Internal models, should reference database

---

## WHERE TO FIND COURSE DATA

### 1. Database Courses (17 courses) ✅ AUTHORITATIVE
**Location:** PostgreSQL `courses` table  
**Seed File:** `/supabase/CREATE_COURSES_TABLE.sql`  
**API Route:** `/app/api/courses/route.ts`

**Query:**
```sql
SELECT * FROM courses WHERE status = 'published' ORDER BY created_at DESC;
```

**API Usage:**
```typescript
const response = await fetch('/api/courses');
const { courses } = await response.json();
```

---

### 2. Partner Courses (External) 🔗 REFERENCE
**Location:** `/lms-data/partners/sample-partners.ts`  
**Interface:** `PartnerCourse`

**Systems:**
- HSI (Health & Safety Institute)
- NATIONAL_DRUG (Drug Screening)
- CAREERSAFE (OSHA Training)
- MILADY (Beauty Education)
- RISE (NRF RISE Up)
- CERTIPORT (Microsoft Office)

---

## SLUG REFERENCE TABLE

| Program Name | Database Slug | Site Slug | API Slug | Use This |
|--------------|---------------|-----------|----------|----------|
| HVAC Technician | `hvac-technician` | `hvac-technician` | `hvac-technician` | ✅ All match |
| Barber Apprenticeship | `barber-apprenticeship` | `barber-apprenticeship` | `barber-apprenticeship` | ✅ All match |
| CNA Training | `cna-training` | `cna` | `cna-certification` | ⚠️ Use `cna-training` |
| Building Tech | `building-technician` | `building-maintenance` | `building-maintenance-tech` | ⚠️ Use `building-technician` |
| CDL Training | `cdl-and-transport` | `cdl` | `cdl-training` | ⚠️ Use `cdl-and-transport` |
| Career Readiness | `career-readiness` | - | - | ✅ Database only |

---

## COMMON QUERIES

### Get All Active Programs
```sql
SELECT 
  slug,
  name,
  short_tagline,
  duration,
  is_featured,
  display_order
FROM programs
WHERE is_active = true
ORDER BY display_order;
```

### Get Featured Programs
```sql
SELECT * FROM programs
WHERE is_active = true AND is_featured = true
ORDER BY display_order;
```

### Get Program by Slug
```sql
SELECT * FROM programs
WHERE slug = 'hvac-technician' AND is_active = true;
```

### Get All Courses
```sql
SELECT 
  slug,
  title,
  subtitle,
  duration_hours,
  level,
  is_free
FROM courses
WHERE status = 'published'
ORDER BY created_at DESC;
```

### Get Course with Lessons
```sql
SELECT 
  c.*,
  json_agg(
    json_build_object(
      'id', l.id,
      'title', l.title,
      'order_number', l.order_number,
      'duration', l.duration
    ) ORDER BY l.order_number
  ) as lessons
FROM courses c
LEFT JOIN lessons l ON l.course_id = c.id
WHERE c.slug = 'hvac-technician'
GROUP BY c.id;
```

### Get User's Enrollments
```sql
SELECT 
  pe.*,
  p.name as program_name,
  p.slug as program_slug
FROM program_enrollments pe
JOIN programs p ON p.slug = pe.program_id
WHERE pe.student_id = 'user-uuid'
ORDER BY pe.created_at DESC;
```

---

## API ENDPOINTS

### Programs
```
GET  /api/programs              - List all programs
GET  /api/programs/featured     - List featured programs
POST /api/programs              - Create program (admin)
GET  /api/programs/[slug]       - Get program by slug
PUT  /api/programs/[slug]       - Update program (admin)
```

### Courses
```
GET  /api/courses               - List all courses
POST /api/courses               - Create course (admin)
GET  /api/courses/[courseId]    - Get course by ID
PUT  /api/courses/[courseId]    - Update course (admin)
```

### Enrollments
```
GET  /api/enrollments           - List user's enrollments
POST /api/enrollments           - Create enrollment
GET  /api/enrollments/[id]      - Get enrollment details
PUT  /api/enrollments/[id]      - Update enrollment status
```

### Applications
```
GET  /api/applications          - List applications (admin)
POST /api/applications          - Submit application
GET  /api/applications/[id]     - Get application details
PUT  /api/applications/[id]     - Update application status
```

---

## FRONTEND ROUTES

### Public Pages
```
/programs                       - Programs listing
/programs/[slug]                - Program detail page
/programs/healthcare            - Healthcare category
/programs/skilled-trades        - Skilled trades category
/programs/beauty-wellness       - Beauty & wellness category
/programs/business-finance      - Business & finance category
/programs/technology            - Technology category
```

### Student Portal
```
/student/dashboard              - Student dashboard
/student/courses                - My courses
/student/courses/[courseId]     - Course detail
/student/programs/[slug]        - Program detail
/student/progress               - Progress tracking
/student/certificates           - My certificates
```

### Admin Portal
```
/admin/programs                 - Manage programs
/admin/courses                  - Manage courses
/admin/enrollments              - Manage enrollments
/admin/applications             - Manage applications
```

---

## TYPESCRIPT INTERFACES

### Program (Database)
```typescript
interface Program {
  id: string;
  slug: string;
  name: string;
  short_tagline: string;
  hero_image: string;
  hero_image_alt: string;
  level: string;
  duration: string;
  format: string;
  schedule: string;
  tuition_notes: string;
  funding_options: string[];
  who_it_is_for: string[];
  outcomes: string[];
  highlights: string[];
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
```

### Course (Database)
```typescript
interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  status: 'draft' | 'published' | 'archived';
  is_free: boolean;
  created_at: string;
  updated_at: string;
}
```

### Enrollment
```typescript
interface ProgramEnrollment {
  id: string;
  student_id: string;
  program_id: string; // slug, not UUID
  funding_source: 'SELF_PAY' | 'EMPLOYER' | 'WRG' | 'WIOA' | 'SCHOLARSHIP';
  status: 'INTAKE' | 'AWAITING_FUNDING' | 'AWAITING_SEATS' | 'READY_TO_START' | 'IN_PROGRESS' | 'COMPLETED' | 'SUSPENDED';
  stripe_ref_id: string | null;
  payment_mode: 'full' | 'plan' | null;
  created_at: string;
  updated_at: string;
}
```

### Application
```typescript
interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  program_id: string; // slug, not UUID
  status: 'pending' | 'approved' | 'rejected' | 'contacted';
  submitted_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
```

---

## SUPABASE CLIENT USAGE

### Fetch Programs
```typescript
import { createServerSupabaseClient } from '@/lib/auth';

const supabase = await createServerSupabaseClient();

const { data: programs, error } = await supabase
  .from('programs')
  .select('*')
  .eq('is_active', true)
  .order('display_order');
```

### Fetch Courses
```typescript
const { data: courses, error } = await supabase
  .from('courses')
  .select('*')
  .eq('status', 'published')
  .order('created_at', { ascending: false });
```

### Create Enrollment
```typescript
const { data: enrollment, error } = await supabase
  .from('program_enrollments')
  .insert({
    student_id: userId,
    program_id: 'hvac-technician',
    funding_source: 'WIOA',
    status: 'INTAKE'
  })
  .select()
  .single();
```

### Submit Application
```typescript
const { data: application, error } = await supabase
  .from('applications')
  .insert({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '555-1234',
    program_id: 'hvac-technician',
    status: 'pending'
  })
  .select()
  .single();
```

---

## MIGRATION CHECKLIST

### When Adding a New Program

1. **Add to Database**
```sql
INSERT INTO programs (
  slug, name, short_tagline, hero_image, hero_image_alt,
  level, duration, format, schedule, tuition_notes,
  funding_options, who_it_is_for, outcomes, highlights,
  cta_primary_label, cta_primary_href,
  cta_secondary_label, cta_secondary_href,
  is_active, is_featured, display_order
) VALUES (
  'new-program-slug',
  'New Program Name',
  -- ... rest of fields
);
```

2. **Create Program Page** (if custom layout needed)
```bash
mkdir -p app/programs/new-program-slug
touch app/programs/new-program-slug/page.tsx
```

3. **Add to Navigation** (if featured)
Update `/components/ui/Header.tsx` dropdown

4. **Create Associated Courses**
```sql
INSERT INTO courses (slug, title, subtitle, description, level, duration_hours)
VALUES ('new-program-course', 'Course Title', ...);
```

5. **Link Program to Courses** (when junction table exists)
```sql
INSERT INTO program_courses (program_id, course_id, order_number)
VALUES ('program-uuid', 'course-uuid', 1);
```

---

## TROUBLESHOOTING

### Program Not Showing on Site
1. Check `is_active = true` in database
2. Verify slug matches in all systems
3. Check if page exists: `/app/programs/[slug]/page.tsx`
4. Verify navigation includes program category

### Enrollment Failing
1. Verify program_id slug exists in programs table
2. Check user has valid student_id
3. Verify funding_source is valid enum value
4. Check RLS policies allow insert

### Course Not Accessible
1. Verify course status = 'published'
2. Check user has enrollment in parent program
3. Verify lesson_progress table has user entry
4. Check RLS policies allow select

### Slug Mismatch Errors
1. Use database slug as source of truth
2. Create redirects for old slugs
3. Update all references to use database slug
4. Add slug validation in application forms

---

## BEST PRACTICES

### Always Use Database as Source of Truth
```typescript
// ❌ DON'T
import { programs } from '@/app/data/programs';

// ✅ DO
const { data: programs } = await supabase
  .from('programs')
  .select('*')
  .eq('is_active', true);
```

### Validate Program Exists Before Enrollment
```typescript
// ✅ DO
const { data: program } = await supabase
  .from('programs')
  .select('id')
  .eq('slug', programSlug)
  .eq('is_active', true)
  .single();

if (!program) {
  throw new Error('Program not found');
}

// Then create enrollment
```

### Use Consistent Slugs
```typescript
// ✅ DO - Use database slug everywhere
const programSlug = 'hvac-technician';

// ❌ DON'T - Mix different slug formats
const programSlug = 'hvac-tech'; // Wrong!
```

### Cache Program Data
```typescript
// ✅ DO - Cache for performance
import { unstable_cache } from 'next/cache';

const getPrograms = unstable_cache(
  async () => {
    const { data } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true);
    return data;
  },
  ['programs'],
  { revalidate: 3600 } // 1 hour
);
```

---

## QUICK LINKS

- **Database Schema:** `/supabase/migrations/20251205_programs_complete.sql`
- **Seed Data:** `/supabase/seed/programs_seed.sql`
- **API Routes:** `/app/api/programs/` and `/app/api/courses/`
- **Frontend Pages:** `/app/programs/`
- **Student Portal:** `/app/student/`
- **Admin Portal:** `/app/admin/`

---

## SUPPORT

For questions or issues:
1. Check this reference guide
2. Review `/LMS_PROGRAM_COURSE_AUDIT.md` for detailed audit
3. Review `/PROGRAM_NAVIGATION_MAP.md` for navigation mapping
4. Check database schema files in `/supabase/migrations/`
5. Review API route implementations in `/app/api/`

---

**Last Updated:** December 26, 2025  
**Maintained By:** Development Team  
**Status:** Living Document - Update as system evolves
