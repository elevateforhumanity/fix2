# Supabase Setup - Copy/Paste Guide

## 🎯 Quick Setup (3 Steps)

### Step 1: Run Migration (Create Table)

**Option A: Using Supabase CLI**
```bash
cd /workspaces/fix2
supabase db push
```

**Option B: Copy/Paste in Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/20251205_programs_complete.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

---

### Step 2: Seed Data (Insert Programs)

**Option A: Using Supabase CLI**
```bash
cd /workspaces/fix2
supabase db execute -f supabase/seed/programs_seed.sql
```

**Option B: Copy/Paste in Supabase Dashboard**

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/seed/programs_seed.sql`
4. Paste into the SQL editor
5. Click **Run**

You should see output showing 6 programs inserted.

---

### Step 3: Verify Data

**In Supabase Dashboard:**

1. Go to **Table Editor** in left sidebar
2. Find and click **programs** table
3. You should see 6 rows:
   - hvac-technician
   - barber-apprenticeship
   - cna-training
   - building-technician
   - cdl-and-transport
   - career-readiness

**Or run this query in SQL Editor:**

```sql
SELECT 
  slug, 
  name, 
  level, 
  duration,
  is_active, 
  is_featured
FROM programs
ORDER BY display_order;
```

---

## 📋 What Was Created

### Database Table: `programs`

**Columns:**
- `id` - UUID primary key
- `slug` - URL-friendly identifier (unique)
- `name` - Program name
- `short_tagline` - Brief description
- `hero_image` - Image path
- `hero_image_alt` - Image alt text
- `level` - Difficulty level
- `duration` - Time to complete
- `format` - Delivery format
- `schedule` - When it runs
- `tuition_notes` - Funding info
- `funding_options` - Array of funding sources
- `who_it_is_for` - Array of target audiences
- `outcomes` - Array of learning outcomes
- `highlights` - Array of program highlights
- `cta_primary_label` - Primary button text
- `cta_primary_href` - Primary button link
- `cta_secondary_label` - Secondary button text
- `cta_secondary_href` - Secondary button link
- `is_active` - Published status
- `is_featured` - Featured on homepage
- `display_order` - Sort order
- `created_at` - Timestamp
- `updated_at` - Timestamp (auto-updates)

**Indexes:**
- `idx_programs_slug` - Fast slug lookups
- `idx_programs_active` - Filter active programs
- `idx_programs_featured` - Filter featured programs
- `idx_programs_display_order` - Sort by order

**Security:**
- Row Level Security (RLS) enabled
- Public can view active programs
- Authenticated users can view all programs
- Only admins can insert/update/delete

---

## 🔧 Troubleshooting

### Error: "relation 'programs' already exists"

The table already exists. You have two options:

**Option 1: Drop and recreate (CAUTION: Deletes all data)**
```sql
DROP TABLE IF EXISTS programs CASCADE;
-- Then run the migration again
```

**Option 2: Just run the seed file**
If the table structure is correct, skip the migration and just run the seed file.

---

### Error: "permission denied for table programs"

You need to be authenticated as a user with admin role. Check your RLS policies:

```sql
-- Temporarily disable RLS for testing (re-enable after)
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;

-- Run your seed data

-- Re-enable RLS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
```

---

### Error: "duplicate key value violates unique constraint"

The data already exists. Clear it first:

```sql
TRUNCATE programs CASCADE;
-- Then run the seed file again
```

---

## 🎨 Next Steps After Database Setup

### 1. Add Hero Images

Create these images in `public/programs/`:
- `hvac-hero.jpg`
- `barber-hero.jpg`
- `cna-hero.jpg`
- `building-tech-hero.jpg`
- `cdl-hero.jpg`
- `career-readiness-hero.jpg`

**Image specs:**
- Aspect ratio: 3:2 or 16:9
- Size: 1200x800px or 1600x900px
- Format: JPG or WebP
- Content: Students/trainees in action

---

### 2. Test the Pages

```bash
npm run dev
```

Visit:
- http://localhost:3000/programs
- http://localhost:3000/programs/hvac-technician
- http://localhost:3000/programs/barber-apprenticeship
- http://localhost:3000/programs/cna-training
- http://localhost:3000/programs/building-technician
- http://localhost:3000/programs/cdl-and-transport
- http://localhost:3000/programs/career-readiness

---

### 3. Update API Adapter (Optional)

If you want to use the database instead of the JSON file, update your API adapter:

**In `lib/apiAdapter.ts`:**

```typescript
// Add programs methods
async listPrograms() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[EFH API] listPrograms error:", error);
    return [];
  }
  return data || [];
}
```

---

## 📊 Database vs JSON File

You now have **two options** for program data:

### Option 1: JSON File (Current)
- ✅ Fast (no database queries)
- ✅ Easy to edit (just edit config/programs.json)
- ✅ Works without Supabase
- ❌ Can't update without redeploying

**Files:**
- `config/programs.json`
- `lib/programs.ts`

### Option 2: Supabase Database
- ✅ Update without redeploying
- ✅ Admin interface can edit programs
- ✅ Track changes over time
- ❌ Requires database connection

**Files:**
- `supabase/migrations/20251205_programs_complete.sql`
- `supabase/seed/programs_seed.sql`
- `lib/apiAdapter.ts` (add programs methods)

**Recommendation:** Start with JSON file for speed, migrate to database when you need admin editing.

---

## ✅ Verification Checklist

- [ ] Migration ran successfully (table created)
- [ ] Seed data inserted (6 programs visible)
- [ ] RLS policies working (public can view active programs)
- [ ] Hero images added to public/programs/
- [ ] /programs page loads and shows all 6 programs
- [ ] Individual program pages load (test at least 2)
- [ ] CTAs link correctly to /apply and /contact
- [ ] Mobile responsive (test on phone or resize browser)

---

## 🚀 You're Done!

Your programs system is now:
- ✅ Database-backed (optional)
- ✅ JSON-backed (current)
- ✅ Human, sale-ready copy
- ✅ WIOA/ETPL aligned
- ✅ Ready for Dec 17th presentation

**Both systems work independently.** Use JSON for speed, use database for admin editing.
