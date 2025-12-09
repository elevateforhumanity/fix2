# Fix All Issues - Action Plan

## Issues to Fix:

1. ⚠️ Middleware deprecation warning
2. ❌ Application form not submitting
3. ❌ Programs table schema error (column programs.title does not exist)
4. 🖼️ Hero banner missing from home page
5. 🖼️ Images too large - need resizing

## Fixes Applied:

### 1. ✅ Middleware Deprecation
- Renamed `middleware.ts` to `proxy.ts`
- Next.js 16 requires this naming convention

### 2. 🔍 Application Form Issue
**Problem**: Form submits to `/api/applications` but may be failing silently

**Check needed**:
- Verify `applications` table exists in Supabase
- Check table has correct columns: `full_name`, `email`, `phone`, `program_interest`, `referral_source`
- Enable RLS policies for public insert

**SQL to run in Supabase**:
```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'applications';

-- If missing, create it:
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_interest TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (applications)
CREATE POLICY "Allow public to submit applications"
ON applications FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read their own
CREATE POLICY "Users can read own applications"
ON applications FOR SELECT
TO authenticated
USING (email = auth.jwt() ->> 'email');

-- Allow admins to read all
CREATE POLICY "Admins can read all applications"
ON applications FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);
```

### 3. 🔍 Programs Table Schema Error
**Problem**: `column programs.title does not exist`

**SQL to check and fix**:
```sql
-- Check what columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'programs'
ORDER BY ordinal_position;

-- If 'title' is missing but 'name' exists, add alias or rename:
-- Option 1: Add title column
ALTER TABLE programs ADD COLUMN IF NOT EXISTS title TEXT;
UPDATE programs SET title = name WHERE title IS NULL;

-- Option 2: Or find where code references 'title' and change to 'name'
```

### 4. 🖼️ Hero Banner on Home Page
**Files to check**:
- `app/page.tsx` - Main home page
- `app/(marketing)/page.tsx` - If using route groups
- `components/HeroBanner.tsx` or similar

**Need to**:
- Restore hero banner component
- Add cache-busting parameter to video/image URLs
- Ensure video is optimized and loads properly

### 5. 🖼️ Image Optimization
**Large images found - need to resize**:

**Tools to use**:
```bash
# Install sharp if not already
pnpm add sharp

# Create image optimization script
node scripts/optimize-images.js
```

**Next.js Image Component**:
- Use `<Image>` from `next/image` instead of `<img>`
- Automatically optimizes and resizes
- Lazy loads images

## Next Steps:

1. Run SQL fixes in Supabase dashboard
2. Check home page for hero banner
3. Optimize large images
4. Test application form submission
5. Deploy and verify

