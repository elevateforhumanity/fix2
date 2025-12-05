# Supabase Integration Guide - Program Standardization System

## 🎯 Overview

This guide covers the complete Supabase integration for the program standardization system. All components are created and ready for deployment.

---

## ✅ What's Been Created

### 1. Database Schema
**File:** `supabase/migrations/20251205082111_create_programs_table.sql`

Creates `public.programs` table with:
- Core fields: `id`, `slug`, `name`, `short_description`, `long_description`
- Extended fields: `hero_image`, `hero_image_alt`, `duration`, `schedule`, `delivery`, `credential`
- JSON fields: `approvals`, `funding_options`, `highlights`, `what_you_learn`, `outcomes`, `requirements`
- Status fields: `is_active`, `featured`
- Timestamps: `created_at`, `updated_at`
- Indexes on `slug`, `is_active`, `featured`
- Row Level Security (RLS) policies
- Auto-update trigger for `updated_at`

### 2. Seed Data
**File:** `supabase/seed/programs_seed.sql`

Populates all 7 core programs with:
- HVAC Technician
- Barber Apprenticeship (DOL Registered)
- CNA (Certified Nursing Assistant)
- CDL (Commercial Driver Training)
- Building Maintenance Technician
- Building Technician (Advanced Pathway)
- Workforce Readiness (Youth & Adult)

All descriptions are:
- ETPL-safe and workforce-board friendly
- Student-facing and humanized
- Properly formatted with sections and bullets

### 3. Data Access Layer
**Files:**
- `lib/supabaseServer.ts` - Server-side Supabase client (already existed)
- `lib/programs.ts` - NEW: Program data access functions

**Functions:**
- `getAllPrograms()` - Fetches all active programs, ordered by featured then name
- `getProgramBySlugFromDb(slug)` - Fetches single program by slug

### 4. Updated Program Pages
**Files:**
- `app/programs/[slug]/page-supabase-new.tsx` - NEW: Streamlined Supabase version
- `app/programs/[slug]/page-backup-supabase-old.tsx` - Backup of original
- `app/programs/page.tsx` - Needs update to use new data layer

### 5. Admin Interface
**File:** `app/admin/programs/page.tsx`

Features:
- Password protection via `?key=` query parameter
- Lists all programs from Supabase
- Shows status badges (Active/Inactive, Featured)
- "Edit in Supabase" button with direct link
- Empty state message if no programs found

---

## 🚀 Deployment Steps

### Step 1: Run Migrations

**Option A: Using Supabase CLI (Recommended)**
```bash
# Make sure you're in the project root
cd /workspaces/fix2

# Push migration to Supabase
supabase db push
```

**Option B: Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy contents of `supabase/migrations/20251205082111_create_programs_table.sql`
4. Paste and run in SQL Editor

### Step 2: Seed the Database

**Option A: Using Supabase CLI**
```bash
# Reset database (WARNING: This will clear all data)
supabase db reset

# Or manually run seed file
supabase db execute -f supabase/seed/programs_seed.sql
```

**Option B: Using Supabase Dashboard**
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase/seed/programs_seed.sql`
3. Paste and run in SQL Editor

### Step 3: Set Environment Variables

Add these to your `.env.local` (development) and deployment platform (production):

```bash
# Required - Already should exist
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional but recommended
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin page protection
ADMIN_DASHBOARD_PASSWORD=YourSecurePassword123

# Direct link to Supabase table editor (optional)
NEXT_PUBLIC_SUPABASE_PROGRAMS_MANAGE_URL=https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor/YOUR_TABLE_ID
```

**To get the Supabase table URL:**
1. Go to Supabase Dashboard
2. Navigate to Table Editor → programs table
3. Copy the URL from your browser
4. Set as `NEXT_PUBLIC_SUPABASE_PROGRAMS_MANAGE_URL`

### Step 4: Update Program Pages

**Replace the old implementation with the new one:**

```bash
# Backup current implementation (if not already done)
cp app/programs/[slug]/page.tsx app/programs/[slug]/page-backup-current.tsx

# Use the new Supabase version
cp app/programs/[slug]/page-supabase-new.tsx app/programs/[slug]/page.tsx
```

### Step 5: Test Everything

```bash
# Start development server
npm run dev
```

**Test these URLs:**
1. http://localhost:3000/programs - Should list all programs from Supabase
2. http://localhost:3000/programs/hvac-technician - Should show HVAC program
3. http://localhost:3000/programs/barber-apprenticeship - Should show Barber program
4. http://localhost:3000/programs/cna - Should show CNA program
5. http://localhost:3000/programs/cdl - Should show CDL program
6. http://localhost:3000/programs/building-maintenance - Should show Building Maintenance
7. http://localhost:3000/programs/building-technician - Should show Building Technician
8. http://localhost:3000/programs/workforce-readiness - Should show Workforce Readiness
9. http://localhost:3000/admin/programs?key=YOUR_PASSWORD - Should show admin view

**What to check:**
- ✅ All programs load without errors
- ✅ Hero images display correctly
- ✅ Long descriptions format properly (headings, bullets, paragraphs)
- ✅ CTAs link to correct routes
- ✅ Admin page requires password
- ✅ Admin page shows all programs
- ✅ "Edit in Supabase" button works

---

## 🔧 How It Works

### Data Flow

```
User visits /programs/hvac-technician
    ↓
Next.js calls getProgramBySlugFromDb("hvac-technician")
    ↓
lib/programs.ts queries Supabase
    ↓
SELECT * FROM programs WHERE slug = 'hvac-technician' AND is_active = true
    ↓
Returns DbProgram object
    ↓
Page component renders with Supabase data
```

### Admin Workflow

```
Admin visits /admin/programs?key=PASSWORD
    ↓
Page checks ADMIN_DASHBOARD_PASSWORD env var
    ↓
If match: Show programs list
If no match: Show access denied
    ↓
Admin clicks "Edit in Supabase"
    ↓
Opens Supabase table editor in new tab
    ↓
Admin edits program data
    ↓
Saves in Supabase
    ↓
Frontend automatically shows updated data on next page load
```

---

## 📝 Common Tasks

### Add a New Program

**Option 1: Via Supabase Dashboard**
1. Go to Table Editor → programs
2. Click "Insert row"
3. Fill in all required fields:
   - `slug` (URL-friendly, e.g., "new-program")
   - `name` (Display name)
   - `short_description` (Brief summary)
   - `long_description` (Full content with formatting)
   - `is_active` = true
   - `featured` = true/false
4. Save
5. Visit `/programs/new-program` to see it live

**Option 2: Via SQL**
```sql
INSERT INTO public.programs (
  slug,
  name,
  short_description,
  long_description,
  hero_image,
  hero_image_alt,
  is_active,
  featured
) VALUES (
  'new-program',
  'New Program Name',
  'Brief description here',
  'Full description with formatting...',
  '/images/programs/new-program-hero.jpg',
  'Alt text for image',
  true,
  false
);
```

### Update a Program

**Option 1: Via Supabase Dashboard**
1. Go to Table Editor → programs
2. Find the program row
3. Click to edit
4. Update fields
5. Save
6. Changes appear immediately on frontend

**Option 2: Via SQL**
```sql
UPDATE public.programs
SET 
  name = 'Updated Name',
  short_description = 'Updated description',
  updated_at = NOW()
WHERE slug = 'program-slug';
```

### Deactivate a Program

```sql
UPDATE public.programs
SET is_active = false
WHERE slug = 'program-to-hide';
```

The program will no longer appear on `/programs` or be accessible at `/programs/program-to-hide`.

### Feature a Program on Homepage

```sql
UPDATE public.programs
SET featured = true
WHERE slug = 'program-to-feature';
```

Featured programs appear first in the list (if using the featured ordering).

---

## 🐛 Troubleshooting

### Programs Not Loading

**Check 1: Environment Variables**
```bash
# Verify env vars are set
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Check 2: Database Connection**
- Go to Supabase Dashboard
- Check if project is running
- Verify API keys are correct

**Check 3: Table Exists**
```sql
SELECT * FROM public.programs LIMIT 1;
```

If error: Run migration again

**Check 4: Data Exists**
```sql
SELECT COUNT(*) FROM public.programs;
```

If 0: Run seed script

### 404 Errors on Program Pages

**Check 1: Slug Mismatch**
```sql
SELECT slug FROM public.programs;
```

Verify the slug in the URL matches exactly (case-sensitive).

**Check 2: is_active Status**
```sql
SELECT slug, is_active FROM public.programs WHERE slug = 'your-slug';
```

If `is_active = false`, the program won't load.

### Admin Page Not Working

**Check 1: Password Set**
```bash
echo $ADMIN_DASHBOARD_PASSWORD
```

If empty: Set the environment variable

**Check 2: URL Format**
```
Correct: /admin/programs?key=YourPassword
Wrong: /admin/programs?password=YourPassword
```

**Check 3: Password Match**
The `?key=` value must exactly match `ADMIN_DASHBOARD_PASSWORD`.

### Images Not Displaying

**Check 1: Image Files Exist**
```bash
ls -la public/images/programs/*-hero.jpg
```

**Check 2: Image Paths in Database**
```sql
SELECT slug, hero_image FROM public.programs;
```

Paths should start with `/images/programs/`

**Check 3: Next.js Image Optimization**
If using external images, add domains to `next.config.js`:
```javascript
images: {
  domains: ['your-cdn.com'],
}
```

---

## 🔒 Security Considerations

### Row Level Security (RLS)

The migration enables RLS with these policies:
- **Read**: Anyone can read active programs
- **Write**: Only authenticated users can insert/update/delete

### Admin Page Protection

- Uses simple password via query parameter
- Not suitable for highly sensitive data
- For production, consider:
  - Supabase Auth integration
  - Middleware-based protection
  - IP whitelisting

### API Keys

- **Anon Key**: Safe to expose in frontend (limited permissions)
- **Service Role Key**: NEVER expose in frontend (full permissions)
- Use Service Role Key only in server-side code

---

## 📊 Monitoring & Maintenance

### Check Database Health

```sql
-- Count active programs
SELECT COUNT(*) FROM public.programs WHERE is_active = true;

-- Check for missing required fields
SELECT slug, name 
FROM public.programs 
WHERE short_description IS NULL OR long_description IS NULL;

-- View recent updates
SELECT slug, name, updated_at 
FROM public.programs 
ORDER BY updated_at DESC 
LIMIT 10;
```

### Performance Monitoring

- Monitor query performance in Supabase Dashboard → Database → Query Performance
- Check for slow queries
- Verify indexes are being used

### Backup Strategy

- Supabase automatically backs up your database
- For manual backups:
  ```bash
  supabase db dump -f backup.sql
  ```

---

## 🎨 Customization

### Add New Fields to Programs Table

1. Create a new migration:
```bash
supabase migration new add_program_fields
```

2. Add columns:
```sql
ALTER TABLE public.programs
ADD COLUMN new_field TEXT;
```

3. Update TypeScript type in `lib/programs.ts`:
```typescript
export type DbProgram = {
  // ... existing fields
  new_field?: string;
};
```

4. Run migration:
```bash
supabase db push
```

### Customize Admin Page

Edit `app/admin/programs/page.tsx`:
- Add filters/search
- Add inline editing
- Add bulk actions
- Add export functionality

### Add More Admin Pages

Create new pages in `app/admin/`:
- `/admin/applications` - View applications
- `/admin/analytics` - Program analytics
- `/admin/reports` - Generate reports

---

## 📚 Next Steps

### Immediate (Required)
1. ✅ Run migrations
2. ✅ Seed database
3. ✅ Set environment variables
4. ✅ Test all program pages
5. ✅ Test admin page

### Short Term (Recommended)
1. Add inline editing to admin page
2. Add program analytics
3. Set up automated backups
4. Add error monitoring (Sentry)
5. Add performance monitoring

### Long Term (Optional)
1. Build full admin dashboard
2. Add user authentication
3. Add application management
4. Add ETPL export functionality
5. Add workforce board integrations

---

## 🆘 Support

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Files to Reference
- `PROGRAM_STANDARDIZATION_SUMMARY.md` - Complete system overview
- `IMPLEMENTATION_GUIDE.md` - Quick start guide
- `SUPABASE_INTEGRATION_GUIDE.md` - This file

### Common Issues
- Check environment variables first
- Verify Supabase connection
- Check browser console for errors
- Check server logs for API errors

---

**Last Updated:** 2025-12-05
**Status:** Ready for Deployment
**Next Action:** Run migrations and seed database
