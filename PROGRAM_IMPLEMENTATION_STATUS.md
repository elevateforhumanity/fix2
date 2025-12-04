# Program Implementation Status

## Overview

This document shows which programs have partner modules configured and which still need implementation.

---

## Implementation Status

### ✅ Framework Complete (100%)

**All infrastructure is ready:**
- ✅ Database tables created
- ✅ Student interface built
- ✅ Admin review dashboard built
- ✅ API routes created
- ✅ 7 partner implementations ready
- ✅ Course completion logic ready
- ✅ Documentation complete

### ⚠️ Partner Modules: Ready to Add

**SQL provided for these programs:**
- ✅ CNA (Certified Nursing Assistant)
- ✅ Home Health Aide
- ✅ Barbering
- ✅ Cosmetology
- ✅ Curvature Body Sculpting
- ✅ HVAC Technician
- ✅ Building Maintenance
- ✅ IT Support
- ✅ Customer Service
- ✅ Janitorial/Custodial
- ✅ Retail/Sales
- ✅ CDL/Transportation

**Status:** SQL script ready in `supabase/migrations/20241203_integrate_all_partners.sql`

**Action Required:** Update course IDs to match your actual programs

---

## How to Check Your Programs

### Step 1: List All Programs in Database

Run this in Supabase SQL Editor:

```sql
SELECT 
  id,
  slug,
  title,
  category
FROM programs
ORDER BY category, title;
```

This shows all programs currently in your database.

### Step 2: Check Which Have Partner Modules

```sql
SELECT 
  p.title as program_title,
  COUNT(epm.id) as partner_modules_count,
  STRING_AGG(epm.partner_name, ', ') as partners
FROM programs p
LEFT JOIN external_partner_modules epm ON epm.course_id = p.id
GROUP BY p.id, p.title
ORDER BY p.title;
```

This shows which programs have partner modules configured.

### Step 3: See All Partner Modules

```sql
SELECT 
  p.title as program_title,
  epm.title as module_title,
  epm.partner_name,
  epm.delivery_mode,
  epm.is_required,
  epm.hours
FROM external_partner_modules epm
JOIN programs p ON p.id = epm.course_id
ORDER BY p.title, epm.sort_order;
```

This shows detailed list of all partner modules.

---

## Adding Partner Modules to Your Programs

### Option 1: Use Provided SQL (Recommended)

**File:** `supabase/migrations/20241203_integrate_all_partners.sql`

**Steps:**
1. Run Step 1 query above to get your program IDs
2. Open the SQL file
3. Replace the course ID lookups with your actual IDs:

**Before:**
```sql
(SELECT id FROM courses WHERE title ILIKE '%CNA%' LIMIT 1)
```

**After:**
```sql
'your-actual-cna-program-uuid'
```

4. Run the modified SQL in Supabase SQL Editor

### Option 2: Add Manually

**Template:**
```sql
INSERT INTO external_partner_modules (
  course_id,
  title,
  partner_name,
  partner_type,
  delivery_mode,
  launch_url,
  external_course_code,
  description,
  hours,
  requires_proof,
  is_required,
  sort_order
) VALUES (
  'your-program-uuid',
  'Module Title',
  'Partner Name',
  'partner_type',
  'link',  -- or 'api' or 'hybrid'
  'https://partner-url.com',
  NULL,  -- or course code for API mode
  'Description of what students will learn',
  4,  -- hours
  true,  -- requires proof upload
  true,  -- required for completion
  100  -- sort order
);
```

---

## Program-Specific Recommendations

### Healthcare Programs

**CNA, Home Health Aide, Medical Assistant:**

**Required Partners:**
1. HSI - CPR & First Aid (4 hours)
2. CareerSafe - Healthcare Safety (8 hours)
3. NDS - Drug-Free Workplace (4 hours)

**Total External Hours:** 16 hours

**Revenue Impact:** $180/student

### Beauty/Barber Programs

**Barbering, Cosmetology, Curvature Body Sculpting:**

**Required Partners:**
1. Milady RISE - Client Well-Being & Safety (3.5 hours)
2. NDS - Drug-Free Workplace (2 hours)

**Total External Hours:** 5.5 hours

**Revenue Impact:** $100/student

### Skilled Trades

**HVAC, Building Maintenance, Electrical:**

**Required Partners:**
1. CareerSafe - OSHA 10 (10 hours)
2. NDS - Drug-Free Workplace (2 hours)

**Total External Hours:** 12 hours

**Revenue Impact:** $150/student

### IT/Business

**IT Support, Customer Service:**

**Required Partners:**
1. Certiport - Microsoft Office Specialist (15 hours)
2. Optional: NRF RISE Up - Retail Customer Service (8 hours)

**Total External Hours:** 15-23 hours

**Revenue Impact:** $200/student

### Transportation

**CDL, Commercial Driver:**

**Required Partners:**
1. NDS - DOT/CDL Drug & Alcohol Awareness (3 hours)

**Total External Hours:** 3 hours

**Revenue Impact:** $35/student

### Janitorial/Custodial

**Janitorial, Custodial Services:**

**Required Partners:**
1. JRI - Professional Janitorial Training (8 hours) - FREE
2. Optional: CareerSafe - OSHA 10 General Industry (10 hours)

**Total External Hours:** 8-18 hours

**Revenue Impact:** $0-$70/student

---

## Implementation Checklist

### For Each Program:

- [ ] **Identify Program**
  - Get program ID from database
  - Confirm program title and category
  - Review program requirements

- [ ] **Select Partners**
  - Choose appropriate partners for industry
  - Determine required vs. optional
  - Calculate total external hours

- [ ] **Add Partner Modules**
  - Use SQL template or provided script
  - Set delivery mode (link/api/hybrid)
  - Configure launch URLs
  - Set hours and requirements

- [ ] **Test Integration**
  - Enroll test student
  - Verify modules appear in course
  - Test launch URLs
  - Test upload process
  - Test admin approval

- [ ] **Update Documentation**
  - Update course syllabus
  - Add to student handbook
  - Update program marketing
  - Train instructors

- [ ] **Notify Students**
  - Email enrolled students
  - Post announcement
  - Update orientation materials
  - Provide support resources

---

## Quick Add Examples

### Add Milady RISE to Barbering Program

```sql
-- 1. Get your barbering program ID
SELECT id, title FROM programs WHERE title ILIKE '%barber%';

-- 2. Add Milady RISE module (replace 'your-barber-program-id')
INSERT INTO external_partner_modules (
  course_id,
  title,
  partner_name,
  partner_type,
  delivery_mode,
  launch_url,
  description,
  hours,
  requires_proof,
  is_required,
  sort_order
) VALUES (
  'your-barber-program-id',
  'Client Well-Being & Safety',
  'Milady RISE',
  'milady',
  'link',
  'https://miladytraining.com',
  'Essential safety and wellness training for barbers. Use promo code: efhcti-rise295',
  3.5,
  true,
  true,
  100
);

-- 3. Verify it was added
SELECT * FROM external_partner_modules 
WHERE course_id = 'your-barber-program-id';
```

### Add HSI to CNA Program

```sql
-- 1. Get your CNA program ID
SELECT id, title FROM programs WHERE title ILIKE '%cna%';

-- 2. Add HSI module (replace 'your-cna-program-id')
INSERT INTO external_partner_modules (
  course_id,
  title,
  partner_name,
  partner_type,
  delivery_mode,
  launch_url,
  external_course_code,
  description,
  hours,
  requires_proof,
  is_required,
  sort_order
) VALUES (
  'your-cna-program-id',
  'CPR, AED & First Aid Certification',
  'HSI (Health & Safety Institute)',
  'hsi',
  'hybrid',
  'https://hsi.com/courses/cpr-aed',
  'CPR-AED-ADULT',
  'American Heart Association CPR and AED training',
  4,
  true,
  true,
  100
);

-- 3. Verify it was added
SELECT * FROM external_partner_modules 
WHERE course_id = 'your-cna-program-id';
```

---

## Bulk Implementation Script

If you want to add partner modules to ALL programs at once:

```sql
-- This is a template - customize for your programs

-- Get all program IDs
WITH program_ids AS (
  SELECT 
    id,
    title,
    category
  FROM programs
)

-- Add appropriate partners based on category
INSERT INTO external_partner_modules (
  course_id,
  title,
  partner_name,
  partner_type,
  delivery_mode,
  launch_url,
  description,
  hours,
  requires_proof,
  is_required,
  sort_order
)
-- Healthcare programs get HSI
SELECT 
  id,
  'CPR & First Aid Certification',
  'HSI',
  'hsi',
  'hybrid',
  'https://hsi.com/courses/cpr-aed',
  'CPR and First Aid training',
  4,
  true,
  true,
  100
FROM program_ids
WHERE category = 'healthcare'

UNION ALL

-- Beauty/Barber programs get Milady
SELECT 
  id,
  'Client Well-Being & Safety',
  'Milady RISE',
  'milady',
  'link',
  'https://miladytraining.com',
  'Safety training for beauty professionals',
  3.5,
  true,
  true,
  100
FROM program_ids
WHERE category = 'barber_beauty'

-- Add more UNION ALL blocks for other categories
;
```

---

## Verification Queries

### Check Total Partner Modules

```sql
SELECT 
  COUNT(*) as total_modules,
  COUNT(DISTINCT course_id) as programs_with_modules,
  COUNT(DISTINCT partner_type) as unique_partners
FROM external_partner_modules;
```

### Check Coverage by Category

```sql
SELECT 
  p.category,
  COUNT(DISTINCT p.id) as total_programs,
  COUNT(DISTINCT epm.course_id) as programs_with_modules,
  ROUND(COUNT(DISTINCT epm.course_id)::numeric / COUNT(DISTINCT p.id) * 100, 1) as coverage_percent
FROM programs p
LEFT JOIN external_partner_modules epm ON epm.course_id = p.id
GROUP BY p.category
ORDER BY coverage_percent DESC;
```

### List Programs Without Partner Modules

```sql
SELECT 
  p.id,
  p.title,
  p.category
FROM programs p
LEFT JOIN external_partner_modules epm ON epm.course_id = p.id
WHERE epm.id IS NULL
ORDER BY p.category, p.title;
```

---

## Summary

### Current Status

**Framework:** ✅ 100% Complete

**Partner Modules:** ⚠️ Ready to Add

**Action Required:**
1. Run query to get your program IDs
2. Update SQL script with actual IDs
3. Run SQL to add partner modules
4. Test with pilot students
5. Roll out to all programs

**Timeline:** 1-2 hours to add all partner modules

**Files to Use:**
- `supabase/migrations/20241203_integrate_all_partners.sql` - Pre-configured SQL
- `PARTNER_COURSE_EXAMPLES.md` - Detailed configurations
- This document - Implementation guide

**Next Step:** Run the verification queries above to see your current programs, then add partner modules using the provided SQL.

---

## Support

Need help adding partner modules to your specific programs?

1. Run the verification queries above
2. Share the output
3. We'll provide exact SQL for your programs

**Contact:** support@elevateforhumanity.org
