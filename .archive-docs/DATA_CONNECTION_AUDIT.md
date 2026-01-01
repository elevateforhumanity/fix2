# Data Connection Audit Report

**Date:** December 31, 2025  
**Status:** Environment verification complete, data connection analysis in progress

---

## Environment Status

### ⚠️ Dev Container Issues

- **Status:** PHASE_FAILED
- **Issue:** Node.js not installed despite devcontainer.json configuration
- **Impact:** Cannot run npm commands or start development server
- **Resolution Needed:** Dev container rebuild or manual Node.js installation

### Configuration Files Present

- ✅ `.devcontainer/devcontainer.json` - Valid configuration
- ✅ `.env.example` - Template with all required variables
- ✅ `package.json` - Dependencies defined
- ✅ Database schema files in `supabase/` and `database/`

---

## Database Schema Analysis

### Core Tables Identified

1. **programs** - Training program catalog
2. **courses** - Individual courses within programs
3. **enrollments** - Student enrollments
4. **profiles** - User profiles
5. **assignments** - Course assignments
6. **submissions** - Student submissions
7. **certificates** - Issued certificates
8. **applications** - Program applications

### Schema Locations

- `database/schema.sql` - Main schema definition
- `supabase/001_initial_schema.sql` - Initial migration
- `supabase/migrations/` - Migration history

---

## Pages Using Placeholder/Mock Data

### 1. Mock Data Files

- **`lib/mock-courses.ts`** - Contains 17 hardcoded courses
  - HVAC Technician
  - Barber Apprenticeship
  - Medical Assistant
  - Business Start-Up & Marketing
  - Direct Support Professional
  - Professional Esthetician
  - Tax Preparation
  - And 10 more...

### 2. Pages with Hardcoded Data

#### `/app/programs-catalog/page.tsx`

- **Issue:** Hardcoded program listings in JSX
- **Data:** State programs (WRG, DWD), Federal programs (WIOA, DOL)
- **Needs:** Query from `programs` table with filtering by funding source

#### `/app/programs/page.tsx`

- **Issue:** Static navigation links only
- **Needs:** Dynamic program listing

#### Pages without database queries (found 20+):

- `app/calendar/page.tsx`
- `app/staff-portal/campaigns/page.tsx`
- `app/sheets/page.tsx`
- `app/booking/page.tsx`
- `app/downloads/page.tsx`
- And 15+ more...

### 3. Pages with Database Queries (Working)

- `app/staff-portal/students/page.tsx` - Queries `profiles`
- `app/staff-portal/courses/page.tsx` - Queries `courses`
- `app/staff-portal/page.tsx` - Queries `enrollments`
- `app/onboarding/start/page.tsx` - Multiple table queries

---

## Data Connection Requirements

### Environment Variables Needed

From `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
POSTGRES_URL=
```

### Supabase Client Files

Located in `lib/supabase/`:

- `client.ts` - Client-side queries
- `server.ts` - Server-side queries
- `admin.ts` - Admin operations
- `static.ts` - Static data

---

## Recommended Actions

### Phase 1: Environment Setup

1. Fix dev container or install Node.js manually
2. Set up `.env.local` with Supabase credentials
3. Verify database connection
4. Run migrations if needed

### Phase 2: Replace Mock Data

1. **Priority 1:** Programs catalog page
   - Replace hardcoded programs with database queries
   - Add filtering by funding source (WIOA, WRG, DOL, etc.)
   - Implement search and category filters

2. **Priority 2:** Course listings
   - Replace `mock-courses.ts` usage with real queries
   - Update all pages importing mock data

3. **Priority 3:** Dynamic content pages
   - Calendar events
   - Staff campaigns
   - Booking system
   - Downloads

### Phase 3: OCR Setup

- Identify documents requiring OCR
- Set up OCR service (Tesseract.js, Google Vision API, or AWS Textract)
- Create document processing pipeline

---

## Files Requiring Updates

### High Priority

1. `app/programs-catalog/page.tsx` - Replace hardcoded programs
2. `lib/mock-courses.ts` - Remove or mark as deprecated
3. Pages importing mock-courses (need to identify all)

### Medium Priority

4. `app/calendar/page.tsx` - Add event queries
5. `app/booking/page.tsx` - Add booking queries
6. `app/downloads/page.tsx` - Add document queries

### Low Priority

7. Static content pages that may not need database queries

---

## Next Steps

1. **Immediate:** Fix Node.js installation to enable development
2. **Setup:** Configure environment variables for Supabase
3. **Test:** Verify database connection with existing working pages
4. **Migrate:** Start replacing mock data with real queries
5. **OCR:** Define OCR requirements and implementation plan

---

## Notes

- The platform has a solid database schema already defined
- Many pages already use real database queries successfully
- The main issue is inconsistent data source usage (some pages use DB, others use mock data)
- RLS (Row Level Security) policies are in place
- The codebase is well-structured with clear separation of concerns
