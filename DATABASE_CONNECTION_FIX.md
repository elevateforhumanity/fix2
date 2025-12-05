# Database Connection Fix - Critical Issues

## Problem Summary
Frontend is querying for `status = 'published'` but the database uses `moderation_status = 'approved'`

---

## Issue 1: Wrong Field Name ❌

**Current Code:**
```typescript
const { data: courses } = await supabase
  .from('courses')
  .select('*')
  .eq('status', 'published')  // ❌ WRONG FIELD
```

**Database Schema:**
```sql
ALTER TABLE courses ADD COLUMN moderation_status TEXT DEFAULT 'approved' 
  CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged', 'removed'));
```

**Fix:**
```typescript
const { data: courses } = await supabase
  .from('courses')
  .select('*')
  .eq('moderation_status', 'approved')  // ✅ CORRECT
```

---

## Issue 2: Missing Fields in Schema

**Frontend expects:**
- `status` or `moderation_status`
- `thumbnail_url`
- `category`
- `duration_hours`
- `level`

**Database has:**
- `moderation_status` ✅
- `thumbnail_url` ❓ (need to check)
- `category` ❓ (need to check)
- `duration_weeks` ✅ (not duration_hours)
- `level` ❓ (need to check)

---

## Issue 3: No Seed Data

**Problem:** Courses table is empty

**Solution:** Run seed scripts

**Available Seeds:**
1. `scripts/seed-courses.ts` - Seeds modules and lessons
2. `supabase/seed-rich-content.sql` - Rich course content
3. `supabase/seed/programs_seed.sql` - Program data

---

## Files That Need Fixing

### 1. `/app/courses/page.tsx`
```typescript
// Line 16 - WRONG
.eq('status', 'published')

// FIX TO:
.eq('moderation_status', 'approved')
```

### 2. `/app/lms/courses/page.tsx`
```typescript
// Line 40 - WRONG
.eq('status', 'published')

// FIX TO:
.eq('moderation_status', 'approved')
```

### 3. Any other files querying courses

---

## Migration Needed

Add missing fields to courses table:

```sql
-- Add missing fields
ALTER TABLE courses 
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS duration_hours INTEGER,
  ADD COLUMN IF NOT EXISTS level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced'));

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_courses_moderation_status 
  ON courses (moderation_status);

CREATE INDEX IF NOT EXISTS idx_courses_category 
  ON courses (category);
```

---

## Seed Data Script

```sql
-- Insert sample courses
INSERT INTO courses (title, slug, description, duration_weeks, moderation_status, category, level, thumbnail_url)
VALUES
  ('CNA Training', 'cna-training', 'Certified Nursing Assistant training program', 6, 'approved', 'Healthcare', 'beginner', '/images/programs/efh-cna-hero.jpg'),
  ('HVAC Technician', 'hvac-technician', 'Heating, Ventilation, and Air Conditioning training', 12, 'approved', 'Skilled Trades', 'intermediate', '/images/programs/hvac-hero.jpg'),
  ('Barber Apprenticeship', 'barber-apprenticeship', 'Professional barber training and apprenticeship', 52, 'approved', 'Beauty & Wellness', 'beginner', '/images/programs/barber-hero.jpg')
ON CONFLICT (slug) DO NOTHING;
```

---

## Action Plan

### Step 1: Fix Frontend Queries ✅
- [x] Update `/app/courses/page.tsx`
- [x] Update `/app/lms/courses/page.tsx`
- [ ] Search for all other `eq('status', 'published')` queries

### Step 2: Add Missing Fields
- [ ] Run migration to add thumbnail_url, category, level, duration_hours
- [ ] Or map duration_weeks to duration_hours in frontend

### Step 3: Seed Data
- [ ] Run seed scripts in Supabase SQL editor
- [ ] Verify courses appear in database
- [ ] Test frontend displays courses

### Step 4: Verify
- [ ] Check `/courses` page shows courses
- [ ] Check `/lms/courses` shows enrolled courses
- [ ] Check course detail pages work

---

## Quick Test Query

Run in Supabase SQL Editor:

```sql
-- Check if courses exist
SELECT id, title, moderation_status, category, thumbnail_url 
FROM courses 
LIMIT 10;

-- Check what fields exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'courses' 
ORDER BY ordinal_position;
```

---

## Status

- ❌ Frontend queries wrong field
- ❌ Missing fields in schema
- ❌ No seed data
- ✅ Schema exists
- ✅ Supabase connection works

**Priority:** CRITICAL - Fix immediately for launch
