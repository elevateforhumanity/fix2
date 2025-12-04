# Copy-Paste SQL Scripts

## Quick Deployment - Copy & Paste These in Order

---

## Step 1: Create Tables and Functions

**Copy this entire block → Paste into Supabase SQL Editor → Run**

```sql
-- ============================================================================
-- EXTERNAL PARTNER MODULES - COMPLETE SETUP
-- ============================================================================

-- 1. Status enum for progress
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'external_module_status') THEN
    CREATE TYPE external_module_status AS ENUM (
      'not_started',
      'in_progress',
      'submitted',
      'approved'
    );
  END IF;
END $$;

-- 2. Delivery mode enum (API or link-based)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'partner_delivery_mode') THEN
    CREATE TYPE partner_delivery_mode AS ENUM (
      'api',
      'link',
      'hybrid'
    );
  END IF;
END $$;

-- 3. External partner module definition
CREATE TABLE IF NOT EXISTS public.external_partner_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  partner_name TEXT NOT NULL,
  partner_type TEXT,
  delivery_mode partner_delivery_mode NOT NULL DEFAULT 'link',
  launch_url TEXT NOT NULL,
  external_course_code TEXT,
  description TEXT,
  hours NUMERIC,
  requires_proof BOOLEAN DEFAULT TRUE,
  is_required BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Student progress for each external module
CREATE TABLE IF NOT EXISTS public.external_partner_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.external_partner_modules(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status external_module_status NOT NULL DEFAULT 'not_started',
  proof_file_url TEXT,
  notes TEXT,
  external_enrollment_id TEXT,
  external_account_id TEXT,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  certificate_number TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (module_id, user_id)
);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_external_modules_course ON public.external_partner_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_external_modules_partner ON public.external_partner_modules(partner_type);
CREATE INDEX IF NOT EXISTS idx_external_progress_module ON public.external_partner_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_external_progress_user ON public.external_partner_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_external_progress_status ON public.external_partner_progress(status);

-- 6. RLS policies
ALTER TABLE public.external_partner_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_partner_progress ENABLE ROW LEVEL SECURITY;

-- Students can view modules in their enrolled courses
CREATE POLICY "students_can_view_course_modules"
ON public.external_partner_modules
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.program_id = external_partner_modules.course_id
    AND enrollments.user_id = auth.uid()
  )
);

-- Admins can manage all modules
CREATE POLICY "admins_can_manage_modules"
ON public.external_partner_modules
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'instructor')
  )
);

-- Students can manage their own progress
CREATE POLICY "students_can_manage_own_progress"
ON public.external_partner_progress
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all progress
CREATE POLICY "admins_can_manage_all_progress"
ON public.external_partner_progress
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'instructor')
  )
);

-- 7. Add internal_complete flag to enrollments
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' 
    AND column_name = 'internal_complete'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN internal_complete BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_enrollments_internal_complete ON enrollments(internal_complete);

-- 8. Function: Check if all external modules are approved
CREATE OR REPLACE FUNCTION public.external_modules_complete(
  p_course_id UUID,
  p_user_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  total_required INT;
  total_approved INT;
BEGIN
  SELECT COUNT(*)
  INTO total_required
  FROM public.external_partner_modules
  WHERE course_id = p_course_id
    AND is_required = TRUE;

  IF total_required = 0 THEN
    RETURN TRUE;
  END IF;

  SELECT COUNT(*)
  INTO total_approved
  FROM public.external_partner_progress
  WHERE user_id = p_user_id
    AND status = 'approved'
    AND module_id IN (
      SELECT id
      FROM public.external_partner_modules
      WHERE course_id = p_course_id
        AND is_required = TRUE
    );

  RETURN total_approved >= total_required;
END;
$$;

-- 9. Function: Get external module summary
CREATE OR REPLACE FUNCTION public.external_modules_summary(
  p_course_id UUID,
  p_user_id UUID
) RETURNS TABLE (
  total_required INT,
  total_approved INT,
  is_complete BOOLEAN,
  pending_modules JSONB
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_total_required INT;
  v_total_approved INT;
  v_pending JSONB;
BEGIN
  SELECT COUNT(*)
  INTO v_total_required
  FROM public.external_partner_modules
  WHERE course_id = p_course_id
    AND is_required = TRUE;

  SELECT COUNT(*)
  INTO v_total_approved
  FROM public.external_partner_progress
  WHERE user_id = p_user_id
    AND status = 'approved'
    AND module_id IN (
      SELECT id
      FROM public.external_partner_modules
      WHERE course_id = p_course_id
        AND is_required = TRUE
    );

  SELECT JSONB_AGG(
    JSONB_BUILD_OBJECT(
      'id', epm.id,
      'title', epm.title,
      'partner_name', epm.partner_name,
      'status', COALESCE(epp.status, 'not_started')
    )
  )
  INTO v_pending
  FROM public.external_partner_modules epm
  LEFT JOIN public.external_partner_progress epp 
    ON epp.module_id = epm.id 
    AND epp.user_id = p_user_id
  WHERE epm.course_id = p_course_id
    AND epm.is_required = TRUE
    AND (epp.status IS NULL OR epp.status != 'approved');

  RETURN QUERY SELECT 
    v_total_required,
    v_total_approved,
    (v_total_approved >= v_total_required) AS is_complete,
    COALESCE(v_pending, '[]'::JSONB) AS pending_modules;
END;
$$;

-- 10. Function: Check course completion
CREATE OR REPLACE FUNCTION public.check_course_completion(
  p_course_id UUID,
  p_user_id UUID
) RETURNS TABLE (
  can_complete BOOLEAN,
  internal_complete BOOLEAN,
  external_complete BOOLEAN,
  missing_requirements TEXT[]
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_internal_complete BOOLEAN;
  v_external_complete BOOLEAN;
  v_missing TEXT[];
BEGIN
  SELECT e.internal_complete
  INTO v_internal_complete
  FROM enrollments e
  WHERE e.user_id = p_user_id
    AND e.program_id = p_course_id
  LIMIT 1;

  v_internal_complete := COALESCE(v_internal_complete, FALSE);
  v_external_complete := public.external_modules_complete(p_course_id, p_user_id);
  v_missing := ARRAY[]::TEXT[];
  
  IF NOT v_internal_complete THEN
    v_missing := ARRAY_APPEND(v_missing, 'Internal course modules not complete');
  END IF;

  IF NOT v_external_complete THEN
    v_missing := ARRAY_APPEND(v_missing, 'Required partner modules not approved');
  END IF;

  RETURN QUERY SELECT
    (v_internal_complete AND v_external_complete) AS can_complete,
    v_internal_complete,
    v_external_complete,
    v_missing;
END;
$$;

-- 11. Grant permissions
GRANT EXECUTE ON FUNCTION public.external_modules_complete TO authenticated;
GRANT EXECUTE ON FUNCTION public.external_modules_summary TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_course_completion TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ External partner modules setup complete!';
  RAISE NOTICE 'Next: Create storage bucket "external-proof"';
END $$;
```

---

## Step 2: Get Your Program IDs

**Copy this → Paste into Supabase SQL Editor → Run → Save the results**

```sql
-- Get all your programs
SELECT 
  id,
  slug,
  title,
  category
FROM programs
ORDER BY category, title;
```

**Save the IDs - you'll need them for Step 3!**

---

## Step 3: Add Partner Modules

**IMPORTANT:** Replace `'REPLACE-WITH-YOUR-PROGRAM-ID'` with actual UUIDs from Step 2

**Copy this entire block → Replace IDs → Paste into Supabase SQL Editor → Run**

```sql
-- ============================================================================
-- ADD PARTNER MODULES TO YOUR PROGRAMS
-- ============================================================================
-- Replace 'REPLACE-WITH-YOUR-XXX-PROGRAM-ID' with actual UUIDs from Step 2

-- ============================================================================
-- HEALTHCARE PROGRAMS
-- ============================================================================

-- CNA Program - HSI CPR/First Aid
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CNA-PROGRAM-ID',
  'CPR, AED & First Aid Certification',
  'HSI (Health & Safety Institute)',
  'hsi',
  'hybrid',
  'https://hsi.com/solutions/cpr-aed-first-aid-training/elevate-for-humanity-career-training-institute-nts-class-sign-up',
  'CPR-AED-ADULT',
  'American Heart Association CPR, AED, and First Aid certification',
  4,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- CNA Program - CareerSafe Healthcare Safety
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CNA-PROGRAM-ID',
  'Healthcare Safety & Bloodborne Pathogens',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'HEALTHCARE-SAFETY',
  'OSHA-compliant healthcare safety training',
  8,
  TRUE,
  TRUE,
  101
) ON CONFLICT DO NOTHING;

-- CNA Program - NDS Drug-Free Workplace
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CNA-PROGRAM-ID',
  'Drug-Free Workplace Training for Healthcare',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-HEALTHCARE',
  'Drug-free workplace compliance training',
  4,
  TRUE,
  TRUE,
  102
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- BEAUTY/BARBER PROGRAMS
-- ============================================================================

-- Barbering Program - Milady RISE
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-BARBERING-PROGRAM-ID',
  'Client Well-Being & Safety',
  'Milady RISE',
  'milady',
  'link',
  'https://miladytraining.com',
  'Essential safety training for barbers. Use promo code: efhcti-rise295',
  3.5,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- Barbering Program - NDS Drug-Free Workplace
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-BARBERING-PROGRAM-ID',
  'Drug-Free Workplace Training for Barber/Beauty',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-BARBER-BEAUTY',
  'Drug-free workplace compliance training',
  2,
  TRUE,
  TRUE,
  101
) ON CONFLICT DO NOTHING;

-- Cosmetology Program - Milady RISE
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-COSMETOLOGY-PROGRAM-ID',
  'Client Well-Being & Safety',
  'Milady RISE',
  'milady',
  'link',
  'https://miladytraining.com',
  'Essential safety training for cosmetologists. Use promo code: efhcti-rise295',
  3.5,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- SKILLED TRADES PROGRAMS
-- ============================================================================

-- HVAC Program - CareerSafe OSHA 10
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-HVAC-PROGRAM-ID',
  'OSHA 10-Hour Construction Safety',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-10-CONSTRUCTION',
  'OSHA 10-hour safety training for HVAC workers',
  10,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- HVAC Program - NDS Drug-Free Workplace
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-HVAC-PROGRAM-ID',
  'Drug-Free Workplace Training for Skilled Trades',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-SKILLED-TRADES',
  'Drug-free workplace compliance training',
  2,
  TRUE,
  TRUE,
  102
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- IT/BUSINESS PROGRAMS
-- ============================================================================

-- IT Support Program - Certiport Microsoft Office
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-IT-PROGRAM-ID',
  'Microsoft Office Specialist Certification',
  'Certiport (Pearson VUE)',
  'certiport',
  'hybrid',
  'https://certiport.com/portal',
  'MOS-WORD-2019',
  'Industry-recognized Microsoft Office certification',
  15,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- Customer Service Program - Certiport Customer Service
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CUSTOMER-SERVICE-PROGRAM-ID',
  'Customer Service Certification',
  'Certiport (Pearson VUE)',
  'certiport',
  'hybrid',
  'https://certiport.com/portal',
  'CUSTOMER-SERVICE-CERT',
  'Professional customer service certification',
  15,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- JANITORIAL PROGRAMS
-- ============================================================================

-- Janitorial Program - JRI Training
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-JANITORIAL-PROGRAM-ID',
  'Professional Janitorial Training',
  'JRI (Janitorial Resource Institute)',
  'jri',
  'hybrid',
  'https://jri.org',
  'JRI-BASIC',
  'Professional janitorial and custodial training. Free course.',
  8,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- RETAIL PROGRAMS
-- ============================================================================

-- Retail Program - NRF RISE Up
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-RETAIL-PROGRAM-ID',
  'Retail Industry Fundamentals',
  'NRF RISE Up',
  'nrf',
  'hybrid',
  'https://nrf.com/riseup',
  'NRF-FUNDAMENTALS',
  'Retail industry skills and education. Free training from NRF.',
  10,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Partner modules added!';
  RAISE NOTICE 'Run verification query to confirm.';
END $$;
```

---

## Step 4: Verify Partner Modules Were Added

**Copy this → Paste into Supabase SQL Editor → Run**

```sql
-- Verify partner modules were added
SELECT 
  p.title AS program_title,
  epm.title AS module_title,
  epm.partner_name,
  epm.delivery_mode,
  epm.hours,
  epm.is_required
FROM external_partner_modules epm
JOIN programs p ON p.id = epm.course_id
ORDER BY p.title, epm.sort_order;
```

**You should see all the partner modules you added!**

---

## Step 5: Create Storage Bucket

**Go to Supabase Dashboard → Storage → Create Bucket**

- Name: `external-proof`
- Public: ✅ Yes

**Then run this to set up policies:**

```sql
-- Storage policies for external-proof bucket
CREATE POLICY "students_can_upload_proof"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'external-proof' AND
  auth.uid()::TEXT = (storage.foldername(name))[2]
);

CREATE POLICY "students_can_view_own_proof"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'external-proof' AND
  auth.uid()::TEXT = (storage.foldername(name))[2]
);

CREATE POLICY "admins_can_view_all_proof"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'external-proof' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'instructor')
  )
);
```

---

## Quick Test Query

**Test if everything is working:**

```sql
-- Test the completion check function
SELECT * FROM check_course_completion(
  (SELECT id FROM programs LIMIT 1),
  auth.uid()
);

-- See all partner modules
SELECT COUNT(*) AS total_modules FROM external_partner_modules;

-- See programs with partner modules
SELECT 
  p.title,
  COUNT(epm.id) AS module_count
FROM programs p
LEFT JOIN external_partner_modules epm ON epm.course_id = p.id
GROUP BY p.id, p.title
ORDER BY module_count DESC;
```

---

## Done! 🎉

**What you just deployed:**
- ✅ External partner module tables
- ✅ Progress tracking system
- ✅ Course completion functions
- ✅ Partner modules for your programs
- ✅ Storage bucket for proof uploads

**Next steps:**
1. Test with a student account
2. Upload a test certificate
3. Approve it as admin at `/admin/external-progress`
4. Check course completion

**Need help?** See `DEPLOYMENT_GUIDE_PARTNER_INTEGRATION.md`
