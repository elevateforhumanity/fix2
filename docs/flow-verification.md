# Enrollment-Critical Flow Verification

**Date:** 2025-12-23  
**Status:** IN PROGRESS

---

## Flow A: Student Enrollment

### Expected Flow
1. Homepage (`/`) → Browse programs
2. Programs page (`/programs`) → Select program
3. Program detail (`/programs/[slug]`) → Click "Apply"
4. Application page (`/apply/full`) → Fill form
5. Auth gate → Login or create account
6. Submit application → Write to `applications` table
7. Confirmation page → Show next steps
8. Redirect → `/lms/dashboard` (student portal)

### Verification Steps

#### Step 1: Homepage → Programs
- **URL Tested:** `/`
- **Result:** ✅ Homepage loads
- **Links Verified:** 
  - `/programs` link present
  - Hero CTA present

#### Step 2: Programs Listing
- **URL Tested:** `/programs`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** List of all programs with "Apply" CTAs
- **Tables Touched:** `programs` table (read)

#### Step 3: Program Detail
- **URL Tested:** `/programs/barber-apprenticeship`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Program details with "Apply Now" CTA
- **Tables Touched:** `programs` table (read)

#### Step 4: Application Form
- **URL Tested:** `/apply/full`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Multi-step application form
- **Tables Touched:** None (form only)

#### Step 5: Auth Gate
- **URL Tested:** Auth flow during application
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Redirect to `/login` with return URL
- **Tables Touched:** `auth.users`, `profiles`

#### Step 6: Application Submission
- **URL Tested:** POST to application endpoint
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Write to `applications` table
- **Tables Touched:** `applications`, `enrollments` (if auto-approved)
- **RLS Check:** Application scoped to user_id

#### Step 7: Confirmation
- **URL Tested:** `/apply/confirmation` or similar
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Success message with next steps
- **Content Check:** No "Coming Soon" or placeholders

#### Step 8: Dashboard Redirect
- **URL Tested:** `/lms/dashboard`
- **Result:** ✅ ROUTE EXISTS
- **File:** `app/lms/(app)/dashboard/page.tsx`
- **Expected:** Student dashboard with courses/progress
- **Auth Check:** Uses `requireRole` and `getStudentState`
- **Empty State:** State-aware dashboard with orchestrated flow

### Blockers Identified
- [ ] None yet - verification in progress

---

## Flow B: Program Holder Onboarding

### Expected Flow
1. Program holder landing → `/program-holder` or `/partners`
2. Apply/onboarding → `/program-holder/apply` or `/shop/apply`
3. MOU/verification gating → Admin approval required
4. Dashboard access → `/program-holder/dashboard`

### Verification Steps

#### Step 1: Landing Page
- **URL Tested:** `/program-holder`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Orientation page explaining program holder role

#### Step 2: Application
- **URL Tested:** `/shop/apply` or `/program-holder/apply`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Program holder application form
- **Tables Touched:** `program_holders`, `shops`

#### Step 3: Verification Gating
- **URL Tested:** Dashboard before approval
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** "Pending verification" message
- **Tables Touched:** `program_holders.status`

#### Step 4: Dashboard Access
- **URL Tested:** `/program-holder/dashboard`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Program holder dashboard
- **Auth Check:** Requires program_holder role
- **Org Scoping:** Only see own organization data

### Blockers Identified
- [ ] None yet - verification in progress

---

## Flow C: Employer Onboarding

### Expected Flow
1. Employer landing → `/employer` or `/employers`
2. Apply/onboarding → `/employer/apply`
3. Verification gating → Admin approval
4. Dashboard access → `/employer/dashboard`

### Verification Steps

#### Step 1: Landing Page
- **URL Tested:** `/employer`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Employer orientation page

#### Step 2: Application
- **URL Tested:** `/employer/apply`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Employer application form
- **Tables Touched:** `employer_profiles`

#### Step 3: Dashboard Access
- **URL Tested:** `/employer/dashboard`
- **Result:** ⚠️ NEEDS VERIFICATION
- **Expected:** Employer dashboard with job postings
- **Auth Check:** Requires employer role
- **RLS Check:** Only see own job postings

### Blockers Identified
- [ ] None yet - verification in progress

---

## Critical Routes Inventory

### Student Routes
- `/` - Homepage
- `/programs` - Program listing
- `/programs/[slug]` - Program detail
- `/apply/full` - Application form
- `/lms/dashboard` - Student dashboard
- `/student/dashboard` - Legacy student dashboard (redirect?)

### Program Holder Routes
- `/program-holder` - Landing/orientation
- `/program-holder/apply` - Application
- `/program-holder/dashboard` - Dashboard
- `/shop/apply` - Shop application
- `/shop/dashboard` - Shop dashboard
- `/partners/dashboard` - Legacy partner dashboard (redirect?)

### Employer Routes
- `/employer` - Landing/orientation
- `/employer/apply` - Application
- `/employer/dashboard` - Dashboard

### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/applications` - Review applications
- `/admin/enrollments` - Manage enrollments

---

## Next Steps

1. **Manual Testing Required:**
   - Create test accounts for each role
   - Walk through each flow end-to-end
   - Document actual vs expected results
   - Identify broken links or dead ends

2. **Database Verification:**
   - Confirm tables exist: `applications`, `enrollments`, `program_holders`, `employer_profiles`
   - Verify RLS policies are enabled
   - Test cross-tenant isolation

3. **Empty State Verification:**
   - Confirm all dashboards show actionable empty states
   - No "No data" without a CTA
   - All CTAs lead to real actions

4. **Redirect Consolidation:**
   - Document partner vs program_holder ambiguity
   - Establish canonical routes
   - Add redirects from legacy routes

---

## Status: ⚠️ VERIFICATION IN PROGRESS

Manual testing required to complete this verification.
