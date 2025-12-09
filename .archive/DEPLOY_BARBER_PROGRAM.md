# 🚀 Deploy Barber Program - Complete Setup Guide

## Step 1: Add Environment Variables to Vercel

### **Go to Vercel Dashboard:**
1. Visit https://vercel.com/dashboard
2. Select your project (fix2)
3. Click **Settings** → **Environment Variables**

### **Add These Variables:**

#### **CRON_SECRET**
```
Name: CRON_SECRET
Value: Vyi2/MKIhgOcxxrjHzZMtAZUFeW3AqW5Pa1IOmFYEHo=
Environment: Production, Preview, Development (check all 3)
```

#### **Email Service (Choose One)**

**Option A: Resend (Recommended - FREE)**
1. Sign up at https://resend.com
2. Get API key from dashboard
3. Add to Vercel:
```
Name: RESEND_API_KEY
Value: re_your_api_key_here
Environment: Production, Preview, Development (check all 3)
```

**Option B: SendGrid**
```
Name: SENDGRID_API_KEY
Value: your_sendgrid_key
Environment: Production, Preview, Development (check all 3)
```

---

## Step 2: Run SQL in Supabase

### **Open Supabase SQL Editor:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in left sidebar
4. Click **New Query**

### **Paste and Run This SQL:**

```sql
-- ============================================
-- LINK BARBER PROGRAM TO PARTNER COURSES
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
  -- Get Barber program
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
  
  -- Clear existing links
  DELETE FROM program_required_courses WHERE program_id = barber_id;
  
  -- Link JRI Soft Skills
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
  
  -- Link Milady RISE Courses
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
  
  -- Link HSI Bloodborne Pathogens
  IF hsi_bbp_id IS NOT NULL THEN
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index)
    VALUES (barber_id, hsi_bbp_id, true, 7);
    RAISE NOTICE 'Linked HSI Bloodborne Pathogens';
  END IF;
  
  RAISE NOTICE 'Barber program fully linked!';
  
END $$;

-- Verify linked courses
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

### **Expected Output:**
```
NOTICE: Found Barber program: <uuid>
NOTICE: Linked JRI Communication
NOTICE: Linked JRI Professionalism
NOTICE: Linked JRI Career Management
NOTICE: Linked Milady Domestic Violence
NOTICE: Linked Milady Human Trafficking
NOTICE: Linked Milady Infection Control
NOTICE: Linked HSI Bloodborne Pathogens
NOTICE: Barber program fully linked!
```

---

## Step 3: Deploy to Production

### **Push to GitHub (Vercel will auto-deploy):**

```bash
git add .
git commit -m "Add barber apprenticeship features and cron jobs"
git push origin main
```

Vercel will automatically deploy. Check status at https://vercel.com/dashboard

---

## Step 4: Verify Cron Jobs

1. Go to Vercel dashboard
2. Click **Settings** → **Cron Jobs**
3. Verify 3 cron jobs exist:
   - `/api/cron/morning-reminders` - 8 AM Mon-Fri
   - `/api/cron/missed-checkins` - 10 AM Mon-Fri
   - `/api/cron/end-of-day-summary` - 5 PM Mon-Fri

---

## ✅ Verification Checklist

- [ ] CRON_SECRET added to Vercel
- [ ] Email API key added to Vercel
- [ ] SQL executed in Supabase
- [ ] Courses linked successfully
- [ ] Code pushed to GitHub
- [ ] Vercel deployed successfully
- [ ] Cron jobs visible in dashboard

---

## 🎉 Ready to Enroll Students!

Your barber apprenticeship program is now fully operational with:
- ✅ Automated check-in reminders
- ✅ Hours tracking
- ✅ Employer approval workflow
- ✅ Payroll calculations
- ✅ Email notifications
- ✅ Partner course integration

**Start enrolling students today!** 💈
