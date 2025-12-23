# EXISTING PROGRAM HOLDER PAGES ANALYSIS

**Date:** 2025-12-23  
**Purpose:** Document what tables the existing pages expect vs what may exist in database

## TABLES EXPECTED BY EXISTING PAGES

### verification/page.tsx
**Queries:**
- `profiles` (role check)
- `program_holders` (user_id → program holder record)
- `program_holder_documents` (uploaded verification documents)

### students/page.tsx
**Queries:**
- `profiles` (role check)
- `program_holders` (user_id → program holder record)
- `program_holder_students` (enrolled students with joins to profiles and programs)
  - Joins: `profiles!student_id`, `programs`
  - Filters: `program_holder_id`, `status='active'`

### students/pending/page.tsx
**Queries:**
- `profiles` (role check)
- `program_holders` (user_id → program holder record)
- `program_holder_students` (with `status='pending'`)
  - Joins: `profiles!student_id`, `programs`

### reports/page.tsx
**Queries:**
- `profiles` (role check)
- `program_holders` (user_id → program holder record)
- `apprentice_weekly_reports` (⚠️ WRONG TABLE - should be program_holder_reports)
  - Filters: `program_holder_id`, `week_ending`, `status`

### reports/new/page.tsx
**Not examined yet** - Need to check what table it inserts into

### compliance/page.tsx
**Not examined yet** - Need to check what it queries

### documentation/page.tsx
**Not examined yet** - Likely just static content with links

### support/page.tsx
**Not examined yet** - Need to check if it has a form or just contact info

## CRITICAL FINDINGS

### 1. Reports Page Uses Wrong Table
**Problem:** `reports/page.tsx` queries `apprentice_weekly_reports` instead of `program_holder_reports`

**Evidence:**
```typescript
const { data: reports, count: totalReports } = await supabase
  .from('apprentice_weekly_reports')  // ❌ WRONG TABLE
  .select('*', { count: 'exact' })
  .eq('program_holder_id', programHolder.id)
```

**Fix Required:** Change to `program_holder_reports` or create that table if it doesn't exist

### 2. Unknown Table Existence
**Cannot verify without database access:**
- Does `program_holders` table exist?
- Does `program_holder_students` table exist?
- Does `program_holder_documents` table exist?
- Does `program_holder_reports` table exist?
- Does `apprentice_weekly_reports` have a `program_holder_id` column?

### 3. Foreign Key Relationships
**Expected relationships:**
- `program_holder_students.student_id` → `profiles.id`
- `program_holder_students.program_holder_id` → `program_holders.id`
- `program_holder_students` may have `program_id` → `programs.id`

## REQUIRED VERIFICATION STEPS

### Step 1: Check Table Existence
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'program_holders',
  'program_holder_students',
  'program_holder_documents',
  'program_holder_reports',
  'apprentice_weekly_reports'
)
ORDER BY table_name;
```

### Step 2: Check Column Existence
```sql
-- If program_holders exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'program_holders';

-- If program_holder_students exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'program_holder_students';

-- If apprentice_weekly_reports exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'apprentice_weekly_reports';
```

### Step 3: Check RLS Policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN (
  'program_holders',
  'program_holder_students',
  'program_holder_documents',
  'program_holder_reports'
)
ORDER BY tablename, policyname;
```

### Step 4: Runtime Test
```bash
# Start dev server
npm run dev

# Create test program_holder user in Supabase dashboard:
# 1. Go to Authentication > Users
# 2. Create new user with email test-holder@example.com
# 3. Go to Table Editor > profiles
# 4. Insert row: id=<user-id>, role='program_holder'
# 5. Go to Table Editor > program_holders (if exists)
# 6. Insert row: user_id=<user-id>, status='verified_no_students'

# Login and test each page:
# /program-holder/dashboard
# /program-holder/verification
# /program-holder/students
# /program-holder/students/pending
# /program-holder/reports
# /program-holder/reports/new
# /program-holder/compliance
# /program-holder/documentation
# /program-holder/support

# Document for each page:
# - HTTP status (200, 500, 404)
# - Browser console errors
# - Terminal errors
# - What renders (data, empty state, error message)
```

## MINIMAL FIXES REQUIRED

### If Tables Don't Exist
Run the SQL schema provided in the handoff document to create:
- `program_holders`
- `program_holder_students`
- `program_holder_documents`
- `program_holder_reports`
- `program_holder_verification_items`
- `program_holder_compliance_issues`

Plus RLS policies for each.

### If Tables Exist But Have Different Names
Update the page queries to match actual table names.

### If Reports Page Uses Wrong Table
**Option A:** Change query to use `program_holder_reports`
**Option B:** Add `program_holder_id` column to `apprentice_weekly_reports` if that's the canonical table

## NEXT ACTIONS

1. **Lizzy:** Run Step 1-3 SQL queries and paste results
2. **Lizzy:** Run Step 4 runtime test and document results
3. **Ona:** Based on results, write minimal fixes (not full rewrites)

## WHAT WE KNOW FOR CERTAIN

✅ Pages exist with real Supabase queries (not placeholders)
✅ Layout with persistent navigation exists (commit b1c26ccd3)
✅ All wrong role links fixed
✅ Build passes

❌ Cannot verify tables exist without database access
❌ Cannot verify RLS policies without database access
❌ Cannot verify pages load without runtime test
❌ Reports page definitely queries wrong table name
