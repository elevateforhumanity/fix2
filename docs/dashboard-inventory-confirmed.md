# Dashboard Inventory - CONFIRMED FROM LIVE CODE

**Date:** 2024-12-24  
**Source:** Live code scan of repository  
**Method:** `find app -name "page.tsx" -path "*/dashboard/*"`

---

## CANONICAL DASHBOARDS (Real, Working)

### 1. Student Dashboard

**Route:** `/lms/(app)/dashboard`  
**File:** `app/lms/(app)/dashboard/page.tsx`  
**Role:** `student`  
**Status:** ✅ CANONICAL  
**Notes:** Primary student experience, fully implemented

### 2. Admin Dashboard

**Route:** `/admin/dashboard`  
**File:** `app/admin/dashboard/page.tsx`  
**Role:** `admin`, `super_admin`, `org_admin`  
**Status:** ✅ CANONICAL  
**Notes:** Admin operations dashboard

### 3. Program Holder Dashboard

**Route:** `/program-holder/dashboard`  
**File:** `app/program-holder/dashboard/page.tsx`  
**Role:** `program_holder`  
**Status:** ✅ CANONICAL  
**Notes:** Program management dashboard

### 4. Employer Dashboard

**Route:** `/employer/dashboard`  
**File:** `app/employer/dashboard/page.tsx`  
**Role:** `employer`  
**Status:** ✅ CANONICAL  
**Notes:** Employer hiring/placement dashboard

### 5. Staff Portal Dashboard

**Route:** `/staff-portal/dashboard`  
**File:** `app/staff-portal/dashboard/page.tsx`  
**Role:** `staff`  
**Status:** ✅ CANONICAL  
**Notes:** Staff operations dashboard

### 6. Instructor Dashboard

**Route:** `/instructor/dashboard`  
**File:** `app/instructor/dashboard/page.tsx`  
**Role:** `instructor`  
**Status:** ✅ CANONICAL  
**Notes:** Instructor course management

---

## ROUTER (Entry Point)

**Route:** `/dashboard`  
**File:** `app/dashboard/page.tsx`  
**Purpose:** Role-based router only (no UI)  
**Status:** ✅ ROUTER ONLY  
**Notes:** Routes users to canonical dashboards based on role

---

## LEGACY/DUPLICATE DASHBOARDS (Need Redirects)

### Portal Routes (Old Structure)

#### 1. Portal Student Dashboard

**Route:** `/portal/student/dashboard`  
**File:** `app/portal/student/dashboard/page.tsx`  
**Should Redirect To:** `/lms/dashboard`  
**Status:** ⚠️ DUPLICATE - NEEDS REDIRECT

#### 2. Portal Staff Dashboard

**Route:** `/portal/staff/dashboard`  
**File:** `app/portal/staff/dashboard/page.tsx`  
**Should Redirect To:** `/staff-portal/dashboard`  
**Status:** ⚠️ DUPLICATE - NEEDS REDIRECT

#### 3. Portal Parent Dashboard

**Route:** `/portal/parent/dashboard`  
**File:** `app/portal/parent/dashboard/page.tsx`  
**Should Redirect To:** TBD (no parent-portal exists)  
**Status:** ⚠️ ORPHAN - NEEDS DECISION

### Partner Routes (Alias to Program Holder)

#### 4. Partner Dashboard

**Route:** `/partner/dashboard`  
**File:** `app/partner/dashboard/page.tsx`  
**Should Redirect To:** `/program-holder/dashboard`  
**Status:** ⚠️ ALIAS - NEEDS REDIRECT  
**Notes:** Partner is NOT a role, should redirect to program_holder

#### 5. Partners Dashboard (Route Group)

**Route:** `/(partner)/partners/dashboard`  
**File:** `app/(partner)/partners/dashboard/page.tsx`  
**Should Redirect To:** `/program-holder/dashboard`  
**Status:** ⚠️ ALIAS - NEEDS REDIRECT

### Admin Program Dashboard

#### 6. Programs Admin Dashboard

**Route:** `/programs/admin/dashboard`  
**File:** `app/programs/admin/dashboard/page.tsx`  
**Should Redirect To:** `/admin/dashboard`  
**Status:** ⚠️ DUPLICATE - NEEDS REDIRECT

### Student Dashboard (Old)

#### 7. Student Dashboard (Root)

**Route:** `/student/dashboard`  
**File:** `app/student/dashboard/page.tsx`  
**Should Redirect To:** `/lms/dashboard`  
**Status:** ⚠️ DUPLICATE - NEEDS REDIRECT

---

## ORPHAN DASHBOARDS (Exist But Unclear Status)

### 1. Board Dashboard

**Route:** `/board/dashboard`  
**File:** `app/board/dashboard/page.tsx`  
**Role:** `board_member` (assumed)  
**Status:** ⚠️ ORPHAN  
**Notes:** No users with board_member role in database (0 users)  
**Decision Needed:** Keep or deprecate?

### 2. Workforce Board Dashboard

**Route:** `/workforce-board/dashboard`  
**File:** `app/workforce-board/dashboard/page.tsx`  
**Role:** `workforce_board` (assumed)  
**Status:** ⚠️ ORPHAN  
**Notes:** No users with workforce_board role in database (0 users)  
**Decision Needed:** Keep or deprecate?

### 3. Delegate Dashboard

**Route:** `/delegate/dashboard`  
**File:** `app/delegate/dashboard/page.tsx`  
**Role:** `delegate` (assumed)  
**Status:** ⚠️ ORPHAN  
**Notes:** Role exists in enum but 0 users in database  
**Decision Needed:** Keep or deprecate?

### 4. Creator Dashboard

**Route:** `/creator/dashboard`  
**File:** `app/creator/dashboard/page.tsx`  
**Role:** `creator` (assumed)  
**Status:** ⚠️ ORPHAN  
**Notes:** No users with creator role in database (0 users)  
**Decision Needed:** Keep or deprecate?

### 5. Shop Dashboard

**Route:** `/shop/dashboard`  
**File:** `app/shop/dashboard/page.tsx`  
**Role:** `shop_manager` (assumed)  
**Status:** ⚠️ ORPHAN  
**Notes:** No users with shop role in database (0 users)  
**Decision Needed:** Keep or deprecate?

---

## NESTED DASHBOARDS (Subpages)

### Admin Nested

- `/admin/dashboard/etpl` - ETPL reporting
- `/admin/programs/[code]/dashboard` - Program-specific admin

### Main Dashboard Nested

- `/dashboard/progress` - Progress tracking
- `/dashboard/recaps/[id]` - Recap detail
- `/dashboard/recaps` - Recaps list
- `/dashboard/workone` - WorkOne integration

**Status:** ✅ KEEP - These are subpages, not duplicate dashboards

---

## PORTAL PAGES (Not Dashboards)

These are portal landing/index pages, not dashboards:

- `/portal` - Portal selector
- `/portal/customer` - Customer portal
- `/portal/employer` - Employer portal landing
- `/portal/staff` - Staff portal landing
- `/portal/student` - Student portal landing
- `/partners/portal` - Partners portal landing
- `/program-holder/portal` - Program holder portal landing
- `/programs/admin/portal` - Admin portal landing

**Status:** ✅ KEEP - These are navigation/landing pages

---

## SUMMARY

### Canonical Dashboards: 6

1. `/lms/dashboard` (student)
2. `/admin/dashboard` (admin)
3. `/program-holder/dashboard` (program_holder)
4. `/employer/dashboard` (employer)
5. `/staff-portal/dashboard` (staff)
6. `/instructor/dashboard` (instructor)

### Need Redirects: 7

1. `/portal/student/dashboard` → `/lms/dashboard`
2. `/portal/staff/dashboard` → `/staff-portal/dashboard`
3. `/partner/dashboard` → `/program-holder/dashboard`
4. `/(partner)/partners/dashboard` → `/program-holder/dashboard`
5. `/programs/admin/dashboard` → `/admin/dashboard`
6. `/student/dashboard` → `/lms/dashboard`
7. `/portal/parent/dashboard` → TBD

### Orphan Dashboards (Need Decision): 5

1. `/board/dashboard` (0 users)
2. `/workforce-board/dashboard` (0 users)
3. `/delegate/dashboard` (0 users)
4. `/creator/dashboard` (0 users)
5. `/shop/dashboard` (0 users)

---

## NEXT ACTIONS

1. ✅ **DONE:** Inventory confirmed from live code
2. ⏳ **NEXT:** Schema verification against Supabase
3. ⏳ **BLOCKED:** Decisions needed on orphan dashboards
4. ⏳ **BLOCKED:** Implement redirects after decisions made

---

## SIGN-OFF

- [x] Inventory generated from live code (not assumptions)
- [x] All dashboard routes documented
- [x] Canonical vs duplicate vs orphan identified
- [ ] Schema verification complete
- [ ] Decisions made on orphans
- [ ] Redirects implemented

**Generated by:** Ona  
**Date:** 2024-12-24  
**Commit:** Phase 1 - Inventory Confirmation
