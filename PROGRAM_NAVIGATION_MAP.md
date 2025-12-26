# PROGRAM NAVIGATION MAP - Site Structure to LMS Mapping

**Date:** December 26, 2025  
**Purpose:** Map website navigation to actual LMS-backed programs  
**Status:** AUTHORITATIVE REFERENCE

---

## NAVIGATION HIERARCHY

```
SITE HEADER
│
├── PROGRAMS (Mega Menu)
│   │
│   ├── Healthcare → /programs/healthcare
│   │   ├── ✅ CNA Training (DB: cna-training, Site: cna)
│   │   ├── ❌ Home Health Aide (Site only, no DB)
│   │   ├── ❌ Phlebotomy Technician (Site only, no DB)
│   │   ├── ❌ Medical Assistant (Course only, no program)
│   │   └── ❌ Patient Care Technician (API only, no site)
│   │
│   ├── Skilled Trades → /programs/skilled-trades
│   │   ├── ✅ HVAC Technician (DB: hvac-technician, Site: hvac-technician)
│   │   ├── ✅ Building Technician (DB: building-technician, Site: building-maintenance)
│   │   └── ❌ Welding (Missing everywhere)
│   │
│   ├── Beauty & Wellness → /programs/beauty-wellness
│   │   ├── ✅ Barber Apprenticeship (DB: barber-apprenticeship, Site: barber-apprenticeship)
│   │   ├── ❌ Esthetician Apprenticeship (Site only, no DB)
│   │   ├── ❌ Nail Technician Apprenticeship (Site only, no DB)
│   │   └── ❌ Professional Esthetician (Site only, no DB)
│   │
│   ├── Business & Finance → /programs/business-finance
│   │   ├── ❌ Business Startup & Marketing (Site only, no DB)
│   │   ├── ❌ Tax Prep & Financial Services (Site only, no DB)
│   │   └── ❌ Entrepreneurship (API only, no site)
│   │
│   ├── Technology → /programs/technology
│   │   ├── ❌ IT Support Specialist (API only, no site)
│   │   ├── ❌ Cybersecurity Fundamentals (API only, no site)
│   │   └── ❌ Microsoft Office Specialist (API only, no site)
│   │
│   └── All Programs → /programs
│       └── Lists all 21 site programs (not synced with DB)
│
├── HOW IT WORKS
│   ├── Application Process → /how-it-works#application
│   ├── Funding Options → /how-it-works#funding
│   ├── Partner Training → /how-it-works#partners
│   └── Job Placement → /how-it-works#placement
│
├── FOR EMPLOYERS
│   ├── Hire Graduates → /hire-graduates
│   ├── Host Apprentices → /employers/apprenticeships
│   ├── OJT/WEX Programs → /employers/ojt-wex
│   └── Employer Portal → /employer/dashboard
│
├── RESOURCES
│   ├── Success Stories → /success-stories
│   ├── FAQ → /faq
│   ├── Career Center → /career-center
│   └── Financial Aid → /financial-aid
│
└── ABOUT
    ├── Our Mission → /about
    ├── Leadership Team → /about/team
    ├── Partners → /partners
    └── Contact Us → /contact
```

---

## PROGRAM STATUS LEGEND

- ✅ **VERIFIED** - Exists in database, has site page, fully functional
- ⚠️ **PARTIAL** - Exists in one system but not others
- ❌ **ORPHANED** - Site page exists but no database backing
- 🔒 **HIDDEN** - Database entry exists but no site page
- 🚧 **INCOMPLETE** - Missing critical components

---

## DETAILED PROGRAM MAPPING

### Healthcare Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| CNA Training | `cna-training` | `cna` | `cna-certification` | ⚠️ SLUG MISMATCH | Programs → Healthcare |
| Home Health Aide | - | `home-health-aide` | - | ❌ ORPHANED | Programs → Healthcare |
| Phlebotomy Technician | - | `phlebotomy-technician` | `phlebotomy-technician` | ❌ ORPHANED | Programs → Healthcare |
| Medical Assistant | - | - | `medical-administrative-assistant` | 🔒 HIDDEN | Missing |
| Patient Care Technician | - | - | `patient-care-technician` | 🔒 HIDDEN | Missing |
| Dental Assistant | - | - | `dental-assistant` | 🔒 HIDDEN | Missing |
| Pharmacy Technician | - | - | `pharmacy-technician` | 🔒 HIDDEN | Missing |
| Community Health Worker | - | - | `certified-community-healthcare-worker` | 🔒 HIDDEN | Missing |
| Emergency Health & Safety | - | `emergency-health-safety-tech` | `emergency-health-safety-tech` | ❌ ORPHANED | Programs → Healthcare |

### Skilled Trades Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| HVAC Technician | `hvac-technician` | `hvac-technician` | `hvac-technician` | ✅ VERIFIED | Programs → Skilled Trades |
| Building Technician | `building-technician` | `building-maintenance` | `building-maintenance-tech` | ⚠️ SLUG MISMATCH | Programs → Skilled Trades |
| Welding | - | - | - | ❌ MISSING | Programs → Skilled Trades |
| Electrical | - | - | - | ❌ MISSING | Programs → Skilled Trades |
| Plumbing | - | - | - | ❌ MISSING | Programs → Skilled Trades |

### Beauty & Wellness Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| Barber Apprenticeship | `barber-apprenticeship` | `barber-apprenticeship` | `barber-apprenticeship` | ✅ VERIFIED | Programs → Beauty & Wellness |
| Esthetician Apprenticeship | - | `esthetician-apprenticeship` | - | ❌ ORPHANED | Programs → Beauty & Wellness |
| Nail Technician Apprenticeship | - | `nail-technician-apprenticeship` | - | ❌ ORPHANED | Programs → Beauty & Wellness |
| Professional Esthetician | - | `professional-esthetician` | `professional-esthetician` | ❌ ORPHANED | Programs → Beauty & Wellness |
| Beauty Career Educator | - | `beauty-career-educator` | `beauty-career-educator` | ❌ ORPHANED | Programs → Beauty & Wellness |
| Cosmetology | - | - | - | ❌ MISSING | Programs → Beauty & Wellness |

### Transportation Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| CDL & Transportation | `cdl-and-transport` | `cdl` | `cdl-training` | ⚠️ SLUG MISMATCH | Programs → Transportation |
| Forklift Operator | - | - | - | ❌ MISSING | Programs → Transportation |

### Business & Finance Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| Business Startup & Marketing | - | `business-startup-marketing` | `business-startup-marketing` | ❌ ORPHANED | Programs → Business & Finance |
| Tax Prep & Financial Services | - | `tax-prep-financial-services` | `tax-prep-financial-services` | ❌ ORPHANED | Programs → Business & Finance |
| Entrepreneurship | - | - | `entrepreneurship-business` | 🔒 HIDDEN | Missing |

### Technology Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| IT Support Specialist | - | - | `it-support-specialist` | 🔒 HIDDEN | Missing |
| Cybersecurity Fundamentals | - | - | `cybersecurity-fundamentals` | 🔒 HIDDEN | Missing |
| Microsoft Office Specialist | - | - | `microsoft-office-mos` | 🔒 HIDDEN | Missing |
| Web Development | - | - | - | ❌ MISSING | Missing |

### Social Services Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| Direct Support Professional | - | `direct-support-professional` | `direct-support-professional` | ❌ ORPHANED | Programs → Social Services |
| Peer Recovery Coach | - | `peer-recovery-coach` | `certified-peer-recovery-coach` | ❌ ORPHANED | Programs → Social Services |
| Peer Support Professional | - | - | `certified-peer-support-professional` | 🔒 HIDDEN | Missing |
| Reentry Specialist | - | - | `public-safety-reentry-specialist` | 🔒 HIDDEN | Missing |

### Career Readiness Programs

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| Career Readiness & Life Design | `career-readiness` | - | - | 🔒 HIDDEN | Missing |
| Workforce Readiness | - | `workforce-readiness` | - | ❌ ORPHANED | Programs → Career Readiness |

### Certifications (Short Programs)

| Program Name | DB Slug | Site Slug | API Slug | Status | Navigation Path |
|--------------|---------|-----------|----------|--------|-----------------|
| CPR Certification | - | `cpr-certification` | `cpr-certification` | ❌ ORPHANED | Programs → Certifications |
| OSHA 10 | - | - | `osha-10-certification` | 🔒 HIDDEN | Missing |
| OSHA 30 | - | - | `osha-30-careersafe` | 🔒 HIDDEN | Missing |
| Rise Up Certificate | - | - | `rise-up-certificate` | 🔒 HIDDEN | Missing |

---

## STATIC VS DYNAMIC PAGES

### Static Program Pages (Hardcoded)
These pages exist as individual files and may not match database slugs:

```
/app/programs/
├── barber-apprenticeship/page.tsx ✅ (matches DB)
├── barber-apprenticeship-new/page.tsx ⚠️ (duplicate?)
├── business-financial/page.tsx ❌ (category page, not program)
├── business-startup/page.tsx ⚠️ (slug mismatch)
├── cdl-transportation/page.tsx ⚠️ (slug mismatch)
├── cna/page.tsx ⚠️ (slug mismatch)
├── direct-support-professional/page.tsx ❌ (no DB)
├── drug-collector/page.tsx ❌ (no DB)
├── healthcare/page.tsx ❌ (category page, not program)
├── home-health-aide/page.tsx ❌ (no DB)
├── jri/page.tsx ❌ (partner program, not LMS)
├── skilled-trades/page.tsx ❌ (category page, not program)
├── tax-entrepreneurship/page.tsx ❌ (category page, not program)
└── tax-preparation/page.tsx ⚠️ (slug mismatch)
```

### Dynamic Program Page
```
/app/programs/[slug]/page.tsx
```
- Uses `/app/data/programs.ts` (21 programs)
- Does NOT query database
- Generates static params at build time
- Returns 404 for database-only programs

---

## ENROLLMENT FLOW MAPPING

### Application Submission
```
User fills form → /apply
  ↓
POST /api/applications
  ↓
INSERT INTO applications (program_id = slug)
  ↓
Status: pending
```

**ISSUE:** `program_id` is TEXT slug, not UUID foreign key to programs table

### Enrollment Creation
```
Admin approves application
  ↓
POST /api/enrollments
  ↓
INSERT INTO program_enrollments (program_id = slug)
  ↓
Status: INTAKE
```

**ISSUE:** No foreign key constraint, can enroll in non-existent programs

### Course Access
```
Enrollment approved
  ↓
User navigates to /student/courses
  ↓
GET /api/courses (filters by enrollment?)
  ↓
Display available courses
```

**ISSUE:** No program_courses junction table, unclear which courses belong to which programs

---

## MISSING RELATIONSHIPS

### Critical Gap: Program-Course Junction Table

**Current State:**
- Programs table exists (6 entries)
- Courses table exists (17 entries)
- NO relationship table

**Required Schema:**
```sql
CREATE TABLE program_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  order_number INTEGER NOT NULL,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(program_id, course_id)
);
```

**Example Relationships:**
```sql
-- HVAC Technician Program
INSERT INTO program_courses (program_id, course_id, order_number, is_required)
VALUES 
  ('hvac-program-uuid', 'hvac-course-uuid', 1, true);

-- Barber Apprenticeship Program
INSERT INTO program_courses (program_id, course_id, order_number, is_required)
VALUES 
  ('barber-program-uuid', 'barber-course-uuid', 1, true);

-- CNA Training Program
INSERT INTO program_courses (program_id, course_id, order_number, is_required)
VALUES 
  ('cna-program-uuid', 'medical-assistant-course-uuid', 1, true);
```

---

## RECOMMENDED NAVIGATION STRUCTURE

### Proposed Header Menu (Database-Driven)

```
PROGRAMS
│
├── Featured Programs (is_featured = true)
│   ├── HVAC Technician
│   ├── Barber Apprenticeship
│   └── CNA Training
│
├── All Programs (is_active = true)
│   ├── Healthcare (filter by category)
│   ├── Skilled Trades (filter by category)
│   ├── Beauty & Wellness (filter by category)
│   ├── Transportation (filter by category)
│   └── Career Readiness (filter by category)
│
└── Browse by
    ├── Duration (filter by duration)
    ├── Funding (filter by funding_options)
    └── Format (filter by format)
```

### Implementation
```typescript
// Fetch from database instead of static file
const { data: programs } = await supabase
  .from('programs')
  .select('*')
  .eq('is_active', true)
  .order('display_order');

// Generate navigation dynamically
const featuredPrograms = programs.filter(p => p.is_featured);
const allPrograms = programs;
```

---

## ACTION ITEMS

### Phase 1: Data Consolidation (Week 1)
1. ✅ Audit complete - this document
2. ⬜ Migrate all 31 API programs to database
3. ⬜ Migrate all 21 site programs to database
4. ⬜ Standardize slugs across all systems
5. ⬜ Create slug redirect mapping

### Phase 2: Relationship Building (Week 2)
1. ⬜ Create program_courses junction table
2. ⬜ Map courses to programs
3. ⬜ Define course prerequisites
4. ⬜ Set course ordering within programs

### Phase 3: Site Updates (Week 3)
1. ⬜ Update /app/programs/page.tsx to query database
2. ⬜ Update /app/programs/[slug]/page.tsx to query database
3. ⬜ Remove static program pages (or redirect to dynamic)
4. ⬜ Update Header.tsx to use database programs
5. ⬜ Implement category filtering

### Phase 4: Enrollment Flow (Week 4)
1. ⬜ Add foreign key constraints to applications.program_id
2. ⬜ Add foreign key constraints to program_enrollments.program_id
3. ⬜ Update enrollment API to validate program existence
4. ⬜ Implement course access based on program enrollment
5. ⬜ Add progress tracking per program

---

## VERIFICATION CHECKLIST

### Database Integrity
- [ ] All programs have unique slugs
- [ ] All programs have valid is_active status
- [ ] All programs have display_order set
- [ ] All featured programs are active
- [ ] All program CTAs point to valid URLs

### Site Navigation
- [ ] All header links point to existing pages
- [ ] All program pages query database
- [ ] All category pages filter database correctly
- [ ] All static pages redirect to dynamic routes
- [ ] 404 pages show for inactive programs

### Enrollment Flow
- [ ] Applications validate program_id exists
- [ ] Enrollments validate program_id exists
- [ ] Course access checks enrollment status
- [ ] Progress tracking works per program
- [ ] Certificates reference correct program

### API Consistency
- [ ] /api/programs returns database data
- [ ] /api/courses returns database data
- [ ] /api/enrollments validates relationships
- [ ] /api/applications validates relationships
- [ ] All APIs use consistent slug format

---

## CONCLUSION

**Current State:**
- 3 separate program systems (Database, API, Site)
- 6 database programs vs 31 API programs vs 21 site programs
- No program-course relationships
- Slug inconsistencies
- Orphaned pages and hidden programs

**Target State:**
- 1 authoritative program source (Database)
- All programs in database with consistent slugs
- Program-course junction table
- Dynamic site navigation from database
- Validated enrollment flow

**Priority:** HIGH - This is blocking proper enrollment and course access functionality.

---

**Document Created:** December 26, 2025  
**Last Updated:** December 26, 2025  
**Status:** AUTHORITATIVE REFERENCE  
**Next Review:** After Phase 1 completion
