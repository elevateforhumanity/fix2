# Dashboard Navigation Pruning Report

**Date:** 2025-12-23  
**Total Links Audited:** 69  
**Valid Links:** 49  
**Removed Links:** 20

## Summary

Removed 20 dead links from `lib/navigation/dashboard-nav.config.ts` to ensure navigation only includes routes that exist and render.

## Removed Links by Role

### Student Navigation (1 removed)

| Href                    | Reason                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `/lms/(app)/attendance` | Invalid route group syntax - should be `/lms/attendance` but not in student nav (admin feature) |

### Employer Navigation (2 removed)

| Href                        | Reason               |
| --------------------------- | -------------------- |
| `/employer/apprenticeships` | Route does not exist |
| `/employer/company`         | Route does not exist |

### Staff Navigation (3 removed)

| Href                     | Reason               |
| ------------------------ | -------------------- |
| `/staff-portal/tasks`    | Route does not exist |
| `/staff-portal/reports`  | Route does not exist |
| `/staff-portal/calendar` | Route does not exist |

### Instructor Navigation (4 removed)

| Href                     | Reason                                  |
| ------------------------ | --------------------------------------- |
| `/instructor/courses`    | No page.tsx (dynamic route parent only) |
| `/instructor/grading`    | Route does not exist                    |
| `/instructor/attendance` | Route does not exist                    |
| `/instructor/profile`    | Route does not exist                    |

### Board Navigation (3 removed)

| Href                | Reason               |
| ------------------- | -------------------- |
| `/board/reports`    | Route does not exist |
| `/board/metrics`    | Route does not exist |
| `/board/compliance` | Route does not exist |

### Workforce Board Navigation (3 removed)

| Href                          | Reason               |
| ----------------------------- | -------------------- |
| `/workforce-board/programs`   | Route does not exist |
| `/workforce-board/outcomes`   | Route does not exist |
| `/workforce-board/compliance` | Route does not exist |

### Parent Portal Navigation (4 removed - ENTIRE ROLE DISABLED)

| Href                              | Reason                                 |
| --------------------------------- | -------------------------------------- |
| `/parent-portal/dashboard`        | Module not enabled - no schema support |
| `/parent-portal/student-progress` | Module not enabled - no schema support |
| `/parent-portal/messages`         | Module not enabled - no schema support |
| `/parent-portal/calendar`         | Module not enabled - no schema support |

## Roles Disabled

### Parent Portal

**Status:** Not enabled  
**Reason:** No `parent` role in `profiles.role` enum, no RLS policies, no real users  
**Action:** Removed entire `parentNavigation` and `parent` case from `getDashboardNavigation()`

## Roles with Minimal Routes (Flagged for Review)

### Board Member

**Status:** Enabled but minimal  
**Routes:** Only `/board/dashboard` exists  
**Recommendation:** If board members don't actively use the system, consider disabling

### Workforce Board

**Status:** Enabled but minimal  
**Routes:** Only `/workforce-board/dashboard` and `/workforce-board/reports` exist  
**Recommendation:** Verify real users exist before keeping enabled

## Admin Navigation - Kept But Flagged

The following admin nav items point to routes that exist but may need verification:

- `/admin/live-chat` - Verify this feature is active
- `/partners/portal` - This is a redirect, should be `/program-holder/dashboard`
- `/lms/(app)/attendance` - Should be `/lms/attendance` (admin can view student attendance)

## Next Steps

1. ✅ Remove dead links from nav config
2. ⚠️ Verify board/workforce-board roles have real users in production
3. ⚠️ Fix `/partners/portal` to use canonical route
4. ⚠️ Fix attendance route in admin nav
5. ⚠️ Consider creating "coming soon" pages for employer/staff/instructor missing features OR remove those roles from nav entirely
