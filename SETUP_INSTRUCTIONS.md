# 🚀 Setup Instructions for Barber Program Launch

## Step 1: Add Environment Variables to Vercel

### **CRON_SECRET**
```
Vyi2/MKIhgOcxxrjHzZMtAZUFeW3AqW5Pa1IOmFYEHo=
```

**How to add:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - Name: `CRON_SECRET`
   - Value: `Vyi2/MKIhgOcxxrjHzZMtAZUFeW3AqW5Pa1IOmFYEHo=`
   - Environment: Production, Preview, Development (select all)
5. Click **Save**

### **Email Service (Resend)**

**Sign up for Resend (FREE):**
1. Go to https://resend.com
2. Sign up with your email
3. Verify email
4. Go to **API Keys** in dashboard
5. Create new API key
6. Copy the key (starts with `re_`)

**Add to Vercel:**
1. Go to **Settings** → **Environment Variables**
2. Add new variable:
   - Name: `RESEND_API_KEY`
   - Value: `re_your_api_key_here`
   - Environment: Production, Preview, Development (select all)
3. Click **Save**

---

## Step 2: Link Barber Courses in Database

**Open Supabase SQL Editor:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in left sidebar
4. Click **New Query**

**Paste this SQL:**

```sql
-- ============================================
-- LINK BARBER PROGRAM TO MILADY RISE COURSES
-- Complete theory integration
-- ============================================

DO $$
DECLARE
  barber_id UUID;
  milady_provider_id UUID;
  milady_dv_id UUID;
  milady_ht_id UUID;
  milady_ic_id UUID;
  jri_comm_id UUID;
  jri_prof_id UUID;
  jri_career_id UUID;
  hsi_bbp_id UUID;
BEGIN
  -- Get Barber program (try multiple slugs)
  SELECT id INTO barber_id 
  FROM programs 
  WHERE slug IN ('barber', 'barber-apprenticeship', 'barber-apprenticeship-program')
     OR name ILIKE '%barber%'
  LIMIT 1;
  
  IF barber_id IS NULL THEN
    RAISE NOTICE 'Barber program not found!';
    RETURN;
  END IF;
  
  RAISE NOTICE 'Found Barber program: %', barber_id;
  
  -- Get Milady provider
  SELECT id INTO milady_provider_id 
  FROM partner_lms_providers 
  WHERE provider_type = 'milady' 
  LIMIT 1;
  
  -- Get Milady course IDs
  SELECT id INTO milady_dv_id 
  FROM partner_courses 
  WHERE provider_id = milady_provider_id 
    AND (course_code = 'MILADY-DV' OR course_name ILIKE '%domestic violence%')
  LIMIT 1;
  
  SELECT id INTO milady_ht_id 
  FROM partner_courses 
  WHERE provider_id = milady_provider_id 
    AND (course_code = 'MILADY-HT' OR course_name ILIKE '%human trafficking%')
  LIMIT 1;
  
  SELECT id INTO milady_ic_id 
  FROM partner_courses 
  WHERE provider_id = milady_provider_id 
    AND (course_code = 'MILADY-IC' OR course_name ILIKE '%infection control%')
  LIMIT 1;
  
  -- Get JRI course IDs
  SELECT id INTO jri_comm_id FROM partner_courses WHERE course_code = 'JRI-COMM' LIMIT 1;
  SELECT id INTO jri_prof_id FROM partner_courses WHERE course_code = 'JRI-PROF' LIMIT 1;
  SELECT id INTO jri_career_id FROM partner_courses WHERE course_code = 'JRI-CAREER' LIMIT 1;
  
  -- Get HSI Bloodborne Pathogens
  SELECT id INTO hsi_bbp_id FROM partner_courses WHERE course_code = 'HSI-BBP' LIMIT 1;
  
  -- Clear existing links for this program
  DELETE FROM program_required_courses WHERE program_id = barber_id;
  
  -- Link JRI Soft Skills (Required)
  IF jri_comm_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, jri_comm_id, true, 1);
    RAISE NOTICE 'Linked JRI Communication';
  END IF;
  
  IF jri_prof_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, jri_prof_id, true, 2);
    RAISE NOTICE 'Linked JRI Professionalism';
  END IF;
  
  IF jri_career_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, jri_career_id, true, 3);
    RAISE NOTICE 'Linked JRI Career Management';
  END IF;
  
  -- Link Milady RISE Courses (Required for Theory)
  IF milady_dv_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, milady_dv_id, true, 4);
    RAISE NOTICE 'Linked Milady Domestic Violence';
  END IF;
  
  IF milady_ht_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, milady_ht_id, true, 5);
    RAISE NOTICE 'Linked Milady Human Trafficking';
  END IF;
  
  IF milady_ic_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, milady_ic_id, true, 6);
    RAISE NOTICE 'Linked Milady Infection Control';
  END IF;
  
  -- Link HSI Bloodborne Pathogens (Required)
  IF hsi_bbp_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, hsi_bbp_id, true, 7);
    RAISE NOTICE 'Linked HSI Bloodborne Pathogens';
  END IF;
  
  RAISE NOTICE 'Barber program fully linked!';
  
END $$;

-- Verify Barber program courses
SELECT 
  p.name as program,
  pc.course_name,
  plp.provider_name as provider,
  CASE WHEN prc.is_required THEN 'Required' ELSE 'Optional' END as requirement,
  prc.order_index as sequence
FROM programs p
JOIN program_required_courses prc ON prc.program_id = p.id
JOIN partner_courses pc ON pc.id = prc.partner_course_id
JOIN partner_lms_providers plp ON plp.id = pc.provider_id
WHERE p.slug IN ('barber', 'barber-apprenticeship', 'barber-apprenticeship-program')
   OR p.name ILIKE '%barber%'
ORDER BY prc.order_index;
```

**Click "Run" and verify output shows:**
- ✅ Found Barber program
- ✅ Linked JRI Communication
- ✅ Linked JRI Professionalism
- ✅ Linked JRI Career Management
- ✅ Linked Milady Domestic Violence
- ✅ Linked Milady Human Trafficking
- ✅ Linked Milady Infection Control
- ✅ Linked HSI Bloodborne Pathogens

---

## Step 3: Deploy to Production

**From your terminal:**

```bash
cd /workspaces/fix2
vercel --prod
```

**After deployment:**
1. Go to Vercel dashboard
2. Click **Settings** → **Cron Jobs**
3. Verify you see 3 cron jobs:
   - Morning reminders (8 AM Mon-Fri)
   - Missed check-ins (10 AM Mon-Fri)
   - End of day summary (5 PM Mon-Fri)

---

## ✅ Verification Checklist

After completing steps above:

- [ ] CRON_SECRET added to Vercel
- [ ] RESEND_API_KEY added to Vercel
- [ ] SQL executed successfully in Supabase
- [ ] Deployed to production
- [ ] Cron jobs visible in Vercel dashboard
- [ ] Site loads without errors

---

## 🎯 What's Next

After environment setup is complete, we'll build:
1. Student hours logging UI (check-in/check-out)
2. Employer hours approval UI
3. Expanded barber-apprenticeship page

**Ready to proceed once you confirm the environment variables are added!**
