# 🚀 FULL DATABASE MIGRATION SCRIPTS

## Copy these scripts directly into Supabase SQL Editor

---

## SCRIPT 1: BASE SCHEMA (Required First)

**File:** `supabase/001_initial_schema.sql`

**Location:** `/workspaces/fix2/supabase/001_initial_schema.sql`

**What it does:** Creates all base tables, indexes, RLS policies

**Copy command:**
```bash
cat /workspaces/fix2/supabase/001_initial_schema.sql
```

---

## SCRIPT 2: PROGRAMS DATA

**File:** `supabase/SIMPLE_MIGRATION.sql`

**Location:** `/workspaces/fix2/supabase/SIMPLE_MIGRATION.sql`

**What it does:** Inserts 16 programs + 17 courses

**Copy command:**
```bash
cat /workspaces/fix2/supabase/SIMPLE_MIGRATION.sql
```

---

## SCRIPT 3: RICH CONTENT (Optional)

**File:** `supabase/seed-rich-content.sql`

**Location:** `/workspaces/fix2/supabase/seed-rich-content.sql`

**What it does:** Adds detailed lesson content with videos

**Copy command:**
```bash
cat /workspaces/fix2/supabase/seed-rich-content.sql
```

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com
2. Select your project
3. Click "SQL Editor" in left sidebar
4. Click "New Query"

### Step 2: Run Base Schema
```bash
# In your terminal, run:
cat /workspaces/fix2/supabase/001_initial_schema.sql

# Copy the output
# Paste into Supabase SQL Editor
# Click "Run"
```

### Step 3: Run Programs Data
```bash
# In your terminal, run:
cat /workspaces/fix2/supabase/SIMPLE_MIGRATION.sql

# Copy the output
# Paste into Supabase SQL Editor
# Click "Run"
```

### Step 4: Verify
```sql
-- Run these queries to verify:
SELECT COUNT(*) FROM programs;  -- Should show 16
SELECT COUNT(*) FROM courses;   -- Should show 17
SELECT slug, title FROM programs ORDER BY title;
```

---

## 🎯 ALTERNATIVE: Use Complete Migration

**File:** `supabase/COMPLETE_MIGRATION.sql`

**Location:** `/workspaces/fix2/supabase/COMPLETE_MIGRATION.sql`

**Copy command:**
```bash
cat /workspaces/fix2/supabase/COMPLETE_MIGRATION.sql
```

This file includes more detailed program metadata.

---

## 📁 ALL AVAILABLE MIGRATION FILES

```
/workspaces/fix2/supabase/
├── 001_initial_schema.sql          ⭐ START HERE
├── SIMPLE_MIGRATION.sql            ⭐ THEN THIS
├── COMPLETE_MIGRATION.sql          (Alternative to SIMPLE)
├── seed-rich-content.sql           (Optional - adds lesson content)
└── migrations/
    └── RUN_ALL_MIGRATIONS.sql      (Alternative approach)
```

---

## ⚡ FASTEST METHOD

Run these 3 commands in your terminal:

```bash
# 1. View base schema
cat /workspaces/fix2/supabase/001_initial_schema.sql

# 2. View programs data
cat /workspaces/fix2/supabase/SIMPLE_MIGRATION.sql

# 3. View verification queries
echo "SELECT COUNT(*) FROM programs; SELECT COUNT(*) FROM courses;"
```

Copy each output and paste into Supabase SQL Editor.

---

## 🔍 FILE SIZES

- `001_initial_schema.sql` - 8.5 KB (base tables)
- `SIMPLE_MIGRATION.sql` - 6.4 KB (programs + courses)
- `COMPLETE_MIGRATION.sql` - 14 KB (detailed programs)
- `seed-rich-content.sql` - 45 KB (lesson content)

---

## ✅ VERIFICATION QUERIES

After running migrations, verify with:

```sql
-- Count records
SELECT 
  (SELECT COUNT(*) FROM programs) as programs,
  (SELECT COUNT(*) FROM courses) as courses,
  (SELECT COUNT(*) FROM lessons) as lessons;

-- List programs
SELECT slug, title, status FROM programs ORDER BY title;

-- List courses
SELECT slug, title, status FROM courses ORDER BY title;

-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

---

## 🚀 READY TO LAUNCH

After running these migrations:
1. ✅ Visit `/programs` - should show 16 programs
2. ✅ Visit `/courses` - should show 17 courses
3. ✅ Test student enrollment flow
4. ✅ Create test user accounts
5. 🎉 **LAUNCH!**

---

**Total time: 5-10 minutes** ⚡
