# Migrations & Seeding Checklist

## ✅ RAPIDS Number Added to Vercel
- `NEXT_PUBLIC_RAPIDS_PROGRAM_NUMBER=2025-IN-132301`
- `NEXT_PUBLIC_RAPIDS_SPONSOR_NAME=2Exclusive LLC`
- `NEXT_PUBLIC_RTI_PROVIDER_ID=208029`

---

## 🗄️ NEW MIGRATIONS TO RUN (Indiana Apprenticeship System)

Run these **8 migrations** in Supabase SQL Editor in this exact order:

### 1. Indiana Enrollment Fields
**File:** `supabase/migrations/20231214_indiana_enrollment_fields.sql`

```sql
-- Indiana Apprenticeship Enrollment Fields
ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS state_code TEXT DEFAULT 'IN',
ADD COLUMN IF NOT EXISTS apprenticeship BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS rapids_registered BOOLEAN DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_enrollments_state_code ON enrollments(state_code);

COMMENT ON COLUMN enrollments.state_code IS 'State jurisdiction for compliance (locked to IN for Indiana)';
COMMENT ON COLUMN enrollments.apprenticeship IS 'DOL Registered Apprenticeship program flag';
COMMENT ON COLUMN enrollments.rapids_registered IS 'RAPIDS system registration status';
```

### 2. Student Onboarding
**File:** `supabase/migrations/20251218_student_onboarding.sql`
- Copy entire file contents and run in SQL Editor

### 3. Shop Placements
**File:** `supabase/migrations/20251218_shop_placements.sql`
- Copy entire file contents and run in SQL Editor

### 4. Shop Partner Portal
**File:** `supabase/migrations/20251218_shop_partner_portal.sql`
- Copy entire file contents and run in SQL Editor

### 5. Shop Partner RLS
**File:** `supabase/migrations/20251218_shop_partner_rls.sql`
- Copy entire file contents and run in SQL Editor

### 6. Shop Onboarding Documents
**File:** `supabase/migrations/20251219_shop_onboarding_docs.sql`
- Copy entire file contents and run in SQL Editor

### 7. Shop Document Requirements
**File:** `supabase/migrations/20251219_shop_doc_types_and_requirements.sql`
- Copy entire file contents and run in SQL Editor

### 8. Non-Compete Agreement
**File:** `supabase/migrations/20251220_add_non_compete.sql`
- Copy entire file contents and run in SQL Editor

---

## 🌱 SEEDING DATA TO RUN

### 1. Create State Compliance Table & Seed Indiana Data

```sql
-- Create state_compliance table
CREATE TABLE IF NOT EXISTS state_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code TEXT NOT NULL UNIQUE,
  state_name TEXT NOT NULL,
  required_hours INTEGER NOT NULL,
  classroom_hours INTEGER NOT NULL,
  on_the_job_hours INTEGER NOT NULL,
  exam_required BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert Indiana compliance with RAPIDS hours (260 classroom)
INSERT INTO state_compliance (
  state_code,
  state_name,
  required_hours,
  classroom_hours,
  on_the_job_hours,
  exam_required,
  active,
  notes
)
VALUES (
  'IN',
  'Indiana',
  2000,
  260,
  1740,
  true,
  true,
  'Indiana PLA – Barber Apprenticeship. RAPIDS Program: 2025-IN-132301. RTI Provider: Elevate for Humanity Career and Training Institute (208029)'
)
ON CONFLICT (state_code) DO UPDATE SET
  classroom_hours = 260,
  on_the_job_hours = 1740,
  notes = 'Indiana PLA – Barber Apprenticeship. RAPIDS Program: 2025-IN-132301. RTI Provider: Elevate for Humanity Career and Training Institute (208029)';
```

### 2. Update Programs to DOL Registered

```sql
-- Update all 8 RAPIDS programs to dol_registered = true
UPDATE programs
SET 
  dol_registered = true,
  state_code = 'IN',
  training_hours = 2000
WHERE slug IN (
  'barber-apprenticeship',
  'building-maintenance-wrg',
  'emt-apprenticeship',
  'esthetician-apprenticeship',
  'hair-stylist-esthetician-apprenticeship',
  'hair-stylist-nail-tech-apprenticeship',
  'nail-tech-apprenticeship',
  'youth-culinary-apprenticeship'
);

-- Verify
SELECT title, slug, state_code, dol_registered, training_hours
FROM programs 
WHERE dol_registered = true
ORDER BY title;
```

### 3. Seed AI Instructor (Indiana-specific)

```sql
-- Check if ai_instructors table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'ai_instructors'
);

-- If it exists, insert Indiana AI instructor
INSERT INTO ai_instructors (
  name,
  role,
  specialty,
  system_prompt,
  active
)
VALUES (
  'Master Barber Coach – EFH',
  'AI Instructor',
  'Barber Apprenticeship',
  'You are a licensed Indiana barber instructor. You follow Indiana PLA rules, DOL RAPIDS standards, and Milady RISE curriculum requirements. You guide apprentices toward Indiana licensure. You are supportive, clear, and compliant with state apprenticeship standards.',
  true
)
ON CONFLICT DO NOTHING;
```

---

## 📦 STORAGE BUCKET TO CREATE

**In Supabase Dashboard → Storage:**

1. Click "New bucket"
2. Name: `shop-onboarding`
3. Public: **OFF** (keep private)
4. Click "Create bucket"

**Then add RLS policies:**

```sql
-- Allow shop staff to upload documents
CREATE POLICY "Shop staff can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'shop-onboarding' AND
  (storage.foldername(name))[1] LIKE 'shop_%'
);

-- Allow shop staff and admins to view documents
CREATE POLICY "Shop staff can view their documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'shop-onboarding' AND
  (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    OR
    (storage.foldername(name))[1] LIKE 'shop_%'
  )
);

-- Allow admins to delete documents
CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'shop-onboarding' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
```

---

## ✅ VERIFICATION QUERIES

After running all migrations and seeding, verify everything:

```sql
-- 1. Check all new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'state_compliance',
  'student_onboarding',
  'shop_placements',
  'shops',
  'shop_staff',
  'shop_applications',
  'shop_documents',
  'shop_document_requirements',
  'shop_onboarding',
  'shop_signatures',
  'apprentice_placements',
  'apprentice_weekly_reports',
  'apprentice_wage_updates'
)
ORDER BY table_name;
-- Should return 13 tables

-- 2. Check Indiana compliance
SELECT * FROM state_compliance WHERE state_code = 'IN';
-- Should show 2000 hours, 260 classroom, 1740 OJT

-- 3. Check DOL registered programs
SELECT title, slug, dol_registered, training_hours
FROM programs 
WHERE dol_registered = true
ORDER BY title;
-- Should show 8 programs

-- 4. Check shop document requirements
SELECT document_type, display_name, required
FROM shop_document_requirements
WHERE state = 'IN'
ORDER BY required DESC, display_name;
-- Should show 10 document types (6 required, 4 optional)

-- 5. Check storage bucket exists
SELECT * FROM storage.buckets WHERE name = 'shop-onboarding';
-- Should return 1 row
```

---

## 🚀 AFTER EVERYTHING IS DONE

You'll be ready to:
1. ✅ Enroll students in any of your 8 RAPIDS programs
2. ✅ Onboard barbershops/salons as training partners
3. ✅ Track weekly hours and attendance
4. ✅ Submit RAPIDS reports
5. ✅ Issue completion certificates

---

## 📝 QUICK CHECKLIST

- [ ] Run 8 migrations in order
- [ ] Run state compliance seed
- [ ] Update programs to dol_registered
- [ ] Seed AI instructor
- [ ] Create storage bucket
- [ ] Add RLS policies to bucket
- [ ] Run verification queries
- [ ] Test enrollment flow

**Estimated time: 30-45 minutes**
