# Roles → Dashboards Mapping (AUTHORITATIVE)

**Date:** 2024-12-24  
**Status:** LOCKED  
**Purpose:** Define which roles have dashboards and which do not

This document is authoritative. All code must follow this mapping.

---

## CANONICAL ROLES (Have Dashboards)

| Role | Dashboard Route | Auth Guard | Notes |
|------|-----------------|------------|-------|
| student | /lms/dashboard | requireAuth + role=student | LMS learning experience |
| admin | /admin/dashboard | requireAdmin | Full system access |
| staff | /staff-portal/dashboard | role=staff | Internal operations |
| instructor | /instructor/dashboard | role=instructor | Course/student management |
| program_holder | /program-holder/dashboard | role=program_holder | Program management, compliance |
| employer | /employer/dashboard | role=employer | Hiring, placements, apprenticeships |

**Total:** 6 canonical dashboards

---

## ELIMINATED ROLES (No Dashboards)

These roles/concepts are ELIMINATED. They must redirect to /dashboard or /unauthorized.

### 1. partner
**Status:** ELIMINATED  
**Reason:** Partner is an organization classification, not a user role  
**Evidence:** 0 users with role=partner in database  
**Action:** All /partner/* routes redirect to /program-holder/dashboard  
**Tables:** partner_profiles (org-level), program_partners (relationships)

### 2. board (board_member)
**Status:** ELIMINATED  
**Reason:** 0 users, minimal implementation, no active product need  
**Evidence:** 0 users in database  
**Action:** /board/dashboard redirects to /dashboard

### 3. workforce_board
**Status:** ELIMINATED  
**Reason:** 0 users, oversight role not currently staffed  
**Evidence:** 0 users in database  
**Action:** /workforce-board/dashboard redirects to /dashboard

### 4. delegate
**Status:** ELIMINATED  
**Reason:** 0 users, unclear scope, not actively used  
**Evidence:** In enum but 0 users in database  
**Action:** /delegate/dashboard redirects to /dashboard

### 5. creator
**Status:** ELIMINATED  
**Reason:** Marketplace managed through admin dashboard, not separate role  
**Evidence:** 0 users with role=creator  
**Action:** /creator/dashboard redirects to /dashboard  
**Note:** Marketplace exists but creators don't need separate dashboard

### 6. shop (shop_manager/shop_owner)
**Status:** ELIMINATED  
**Reason:** Store/shop managed through admin dashboard, not separate role  
**Evidence:** 0 users in database  
**Action:** /shop/dashboard redirects to /dashboard  
**Note:** Shop onboarding exists but shops don't need separate dashboard

### 7. parent
**Status:** ELIMINATED  
**Reason:** Explicitly deprecated in code comments  
**Evidence:** 0 users, code says "Parent role removed from schema"  
**Action:** /portal/parent/dashboard redirects to /unauthorized

---

## EXPLICIT NON-ROLES

The following are NOT user roles and must NEVER have dashboards:

- **partner** - Organization classification only (stored in partner_profiles table)
- **credentialed partner** - Organization relationship type
- **employer partner** - Organization relationship type
- **program owner partner** - Organization relationship type

---

## REDIRECT MAP (Required Implementation)

All legacy/eliminated dashboard routes must redirect:

| Legacy Route | Redirects To | Reason |
|-------------|--------------|--------|
| /partner/dashboard | /program-holder/dashboard | Partner is alias |
| /(partner)/partners/dashboard | /program-holder/dashboard | Partner is alias |
| /board/dashboard | /dashboard | Eliminated role |
| /workforce-board/dashboard | /dashboard | Eliminated role |
| /delegate/dashboard | /dashboard | Eliminated role |
| /creator/dashboard | /dashboard | Eliminated role |
| /shop/dashboard | /dashboard | Eliminated role |
| /portal/parent/dashboard | /unauthorized | Deprecated role |
| /portal/student/dashboard | /lms/dashboard | Legacy portal |
| /portal/staff/dashboard | /staff-portal/dashboard | Legacy portal |
| /programs/admin/dashboard | /admin/dashboard | Duplicate admin |
| /student/dashboard | /lms/dashboard | Legacy route |

---

## FEATURE WORK RULES

### Allowed:
- Feature work on the 6 canonical dashboards
- Admin dashboard sections for marketplace/store management
- Org-level partner management (not user dashboards)

### Forbidden:
- Creating dashboards for eliminated roles
- Creating "partner dashboard" (partner is not a role)
- Creating separate creator/shop dashboards (managed in admin)
- Resurrecting board/workforce_board/delegate/parent dashboards

---

## DATABASE ALIGNMENT

**Roles with actual users (from Supabase):**
- admin: 3 users ✅
- staff: 2 users ✅
- instructor: 1 user ✅
- student: 4 users ✅

**Roles with 0 users:**
- program_holder: 0 users (keep dashboard for future)
- employer: 0 users (keep dashboard for future)
- partner: 0 users (ELIMINATED - not a role)
- board_member: 0 users (ELIMINATED)
- workforce_board: 0 users (ELIMINATED)
- delegate: 0 users (ELIMINATED)
- creator: 0 users (ELIMINATED)
- shop: 0 users (ELIMINATED)
- parent: 0 users (ELIMINATED)

---

## ENFORCEMENT

Any code that violates this mapping must be rejected in code review.

**Examples of violations:**
- Adding features to /partner/dashboard
- Creating new /board/* routes
- Routing role=partner to its own dashboard
- Adding "Partner" to navigation menus

**Correct implementations:**
- Partner organizations managed in admin dashboard
- Marketplace managed in admin dashboard
- Store managed in admin dashboard
- All eliminated roles redirect to /dashboard

---

## SIGN-OFF

- [x] 6 canonical roles defined
- [x] 7 roles eliminated with justification
- [x] Partner explicitly removed as role
- [x] Redirect map complete
- [x] Feature work rules defined

**Approved by:** User  
**Documented by:** Ona  
**Date:** 2024-12-24  
**Status:** LOCKED - No changes without updating this document first
