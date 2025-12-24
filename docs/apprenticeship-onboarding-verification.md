# Apprenticeship Onboarding Flow - Verification

**Date:** 2024-12-24  
**Status:** IMPLEMENTED  
**Purpose:** Document the complete apprenticeship onboarding flow for employers

---

## ROUTES IMPLEMENTED

### Step 1: Shop Creation
**Route:** `/employer/shop/create`  
**Method:** Form POST to server action  
**Server Action:** `app/employer/shop/create/_actions/create-shop.ts`

**Writes:**
- `shops` table: Creates new shop with employer details
- `shop_staff` table: Creates owner relationship (user_id, shop_id, role='owner')

**Reads:**
- `profiles` table: Verifies user role is 'employer'
- `shop_staff` table: Checks if user already has shop access

**Access Control:**
- Requires `profiles.role = 'employer'`
- Redirects to `/unauthorized` if not employer
- Redirects to `/employer/dashboard` if shop already exists

---

### Step 2: Create Placement
**Route:** `/employer/apprenticeships/new`  
**Method:** Form POST to server action  
**Server Action:** `app/employer/apprenticeships/new/_actions/create-placement.ts`

**Writes:**
- `apprentice_placements` table: Creates placement record

**Reads:**
- `profiles` table: Verifies employer role, looks up student by email
- `shop_staff` table: Verifies employer has access to selected shop
- `shops` table: Loads shop list for dropdown

**Access Control:**
- Requires `profiles.role = 'employer'`
- Verifies shop access via `shop_staff.user_id = auth.uid()`
- Only allows placements in shops where user is staff member

---

### Step 3: Submit Weekly Report
**Route:** `/employer/apprenticeships/[placement_id]/weekly-report/new`  
**Method:** Form POST to server action  
**Server Action:** `app/employer/apprenticeships/[placement_id]/weekly-report/new/_actions/submit-weekly-report.ts`

**Writes:**
- `apprentice_weekly_reports` table: Creates weekly report

**Reads:**
- `profiles` table: Verifies employer role
- `apprentice_placements` table: Gets placement details, verifies shop_id
- `shop_staff` table: Verifies employer has access to placement's shop

**Access Control:**
- Requires `profiles.role = 'employer'`
- Verifies shop access via `shop_staff` before allowing report submission
- Shop-scoped: Can only submit reports for placements in accessible shops

---

### Dashboard Display
**Route:** `/employer/dashboard`  
**File:** `app/employer/dashboard/page.tsx`

**Reads:**
- `shop_staff` table: Gets shops user has access to
- `shops` table: Gets shop details
- `apprentice_placements` table: Gets placements for accessible shops
- `apprentice_weekly_reports` table: Gets reports for those placements

**Displays:**
- Shop setup CTA (if no shops)
- Placement count metric
- Placements list with:
  - Program name
  - Start date
  - Total hours (sum of all reports)
  - Report count
  - "Submit Report" button
- "Add Placement" button (if shops exist)

---

## RLS POLICIES REQUIRED

### shops table
```sql
-- SELECT: Users can see shops they have staff access to
CREATE POLICY shops_select_staff ON shops
FOR SELECT
USING (
  id IN (
    SELECT shop_id FROM shop_staff WHERE user_id = auth.uid()
  )
);

-- INSERT: Employers can create shops
CREATE POLICY shops_insert_employer ON shops
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'employer'
  )
);
```

### shop_staff table
```sql
-- SELECT: Users can see their own staff memberships
CREATE POLICY shop_staff_select_own ON shop_staff
FOR SELECT
USING (user_id = auth.uid());

-- INSERT: Can be created during shop creation
-- (May need service role or special handling)
CREATE POLICY shop_staff_insert_owner ON shop_staff
FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'employer'
  )
);
```

### apprentice_placements table
```sql
-- SELECT: Employers can see placements in their shops
CREATE POLICY placements_select_shop_staff ON apprentice_placements
FOR SELECT
USING (
  shop_id IN (
    SELECT shop_id FROM shop_staff WHERE user_id = auth.uid()
  )
);

-- INSERT: Employers can create placements in their shops
CREATE POLICY placements_insert_shop_staff ON apprentice_placements
FOR INSERT
WITH CHECK (
  shop_id IN (
    SELECT shop_id FROM shop_staff WHERE user_id = auth.uid()
  )
);
```

### apprentice_weekly_reports table
```sql
-- SELECT: Employers can see reports for placements in their shops
CREATE POLICY reports_select_shop_staff ON apprentice_weekly_reports
FOR SELECT
USING (
  placement_id IN (
    SELECT id FROM apprentice_placements
    WHERE shop_id IN (
      SELECT shop_id FROM shop_staff WHERE user_id = auth.uid()
    )
  )
);

-- INSERT: Employers can submit reports for placements in their shops
CREATE POLICY reports_insert_shop_staff ON apprentice_weekly_reports
FOR INSERT
WITH CHECK (
  placement_id IN (
    SELECT id FROM apprentice_placements
    WHERE shop_id IN (
      SELECT shop_id FROM shop_staff WHERE user_id = auth.uid()
    )
  ) AND
  submitted_by_user_id = auth.uid()
);
```

---

## END-TO-END VERIFICATION CHECKLIST

### ✅ Step 1: Shop Creation
- [ ] Employer navigates to `/employer/dashboard`
- [ ] Sees "Set Up Your Shop" CTA (if no shops)
- [ ] Clicks "Create Shop" → redirects to `/employer/shop/create`
- [ ] Fills form (name, address, phone, email, etc.)
- [ ] Submits form
- [ ] **Expected:** Shop created in `shops` table
- [ ] **Expected:** `shop_staff` row created with role='owner'
- [ ] **Expected:** Redirects to `/employer/dashboard`
- [ ] **Expected:** Shop setup CTA no longer shows

### ✅ Step 2: Create Placement
- [ ] Employer on dashboard sees "Add Placement" button
- [ ] Clicks button → redirects to `/employer/apprenticeships/new`
- [ ] Selects shop from dropdown (only shows accessible shops)
- [ ] Enters student email (must be registered student)
- [ ] Selects program (barbering, cosmetology, etc.)
- [ ] Enters start date
- [ ] Submits form
- [ ] **Expected:** Placement created in `apprentice_placements` table
- [ ] **Expected:** Redirects to `/employer/dashboard`
- [ ] **Expected:** Placement appears in "Apprentice Placements" section
- [ ] **Expected:** Shows program name, start date, 0 hours, 0 reports

### ✅ Step 3: Submit Weekly Report
- [ ] Employer sees placement on dashboard
- [ ] Clicks "Submit Report" button
- [ ] Redirects to `/employer/apprenticeships/[id]/weekly-report/new`
- [ ] Enters week start/end dates
- [ ] Enters OJT hours and related instruction hours
- [ ] Optionally enters notes
- [ ] Submits form
- [ ] **Expected:** Report created in `apprentice_weekly_reports` table
- [ ] **Expected:** `hours_total` = hours_ojt + hours_related
- [ ] **Expected:** `submitted_by_user_id` = current user
- [ ] **Expected:** `submitted_at` = current timestamp
- [ ] **Expected:** `status` = 'submitted'
- [ ] **Expected:** Redirects to `/employer/dashboard`
- [ ] **Expected:** Placement now shows updated hours and report count

### ✅ Dashboard Summary
- [ ] Placement count metric shows correct number
- [ ] Each placement shows:
  - [ ] Program name
  - [ ] Start date
  - [ ] Total hours (sum of all reports)
  - [ ] Report count
  - [ ] "Submit Report" button
- [ ] Can click "Submit Report" to add another week

---

## BLOCKERS & NEXT ACTIONS

### Potential RLS Blockers

**If shop creation fails:**
- Check if `shops` INSERT policy allows employer role
- Check if `shop_staff` INSERT policy allows self-assignment
- May need to use service role for shop_staff creation

**If placement creation fails:**
- Check if `apprentice_placements` INSERT policy exists
- Verify shop_staff SELECT policy allows reading shop access
- Check if student lookup works (profiles SELECT policy)

**If weekly report submission fails:**
- Check if `apprentice_weekly_reports` INSERT policy exists
- Verify placement SELECT policy allows reading placement details
- Check if submitted_by_user_id constraint exists

### Required Migrations

If RLS policies don't exist, create migration:

```sql
-- File: supabase/migrations/YYYYMMDD_apprenticeship_rls.sql

-- Enable RLS
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprentice_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprentice_weekly_reports ENABLE ROW LEVEL SECURITY;

-- Add policies (see RLS POLICIES REQUIRED section above)
```

### Testing Steps

1. **Create test employer user:**
   ```sql
   UPDATE profiles SET role = 'employer' WHERE email = 'test@employer.com';
   ```

2. **Create test student user:**
   ```sql
   UPDATE profiles SET role = 'student' WHERE email = 'test@student.com';
   ```

3. **Run through flow:**
   - Log in as employer
   - Create shop
   - Create placement (use student email)
   - Submit weekly report
   - Verify all data appears on dashboard

4. **Verify access control:**
   - Log in as different employer
   - Should NOT see other employer's shops/placements
   - Should NOT be able to submit reports for other shops

---

## SCHEMA TRUTH

**Correct query path:**
```
employer user (profiles.id)
  → shop_staff.user_id
  → shop_staff.shop_id
  → apprentice_placements.shop_id
  → apprentice_weekly_reports.placement_id
```

**DO NOT:**
- ❌ Query by `apprenticeship_programs` (table doesn't exist)
- ❌ Assume `profiles.id === employers.id`
- ❌ Query placements without shop_staff filter

**DO:**
- ✅ Always filter by shop_staff membership
- ✅ Verify shop access before any placement/report operation
- ✅ Use server actions for all writes
- ✅ Enforce role guards on all routes

---

## SIGN-OFF

- [x] Shop creation route implemented
- [x] Placement creation route implemented
- [x] Weekly report submission route implemented
- [x] Dashboard displays real data
- [x] Role guards on all routes
- [x] Shop-scoped access control
- [x] Server actions for all writes
- [x] No mock data or placeholders
- [x] Documentation complete

**Status:** READY FOR TESTING

**Next Steps:**
1. Apply RLS policies if not already present
2. Test end-to-end flow with real employer user
3. Verify access control (employer A cannot see employer B's data)
4. Monitor for RLS policy errors in logs

**Implemented by:** Ona  
**Date:** 2024-12-24
