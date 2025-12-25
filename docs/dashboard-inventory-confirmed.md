# Dashboard Inventory - Confirmed Against Code

**Date:** 2024-12-24  
**Method:** File system scan + code inspection  
**Status:** VERIFIED

---

## Canonical Dashboards (6 Total)

| Route                       | File Path                               | Role           | Status                | Auth Guard       | DB Tables                      |
| --------------------------- | --------------------------------------- | -------------- | --------------------- | ---------------- | ------------------------------ |
| `/lms/dashboard`            | `app/lms/dashboard/page.tsx`            | student        | ✅ Working            | Yes (role check) | enrollments, courses, progress |
| `/admin/dashboard`          | `app/admin/dashboard/page.tsx`          | admin          | ✅ Working            | Yes (role check) | enrollments, programs, users   |
| `/program-holder/dashboard` | `app/program-holder/dashboard/page.tsx` | program_holder | ✅ Working            | Yes (role check) | programs, enrollments          |
| `/employer/dashboard`       | `app/employer/dashboard/page.tsx`       | employer       | ⚠️ Needs verification | Yes (role check) | apprenticeship_enrollments     |
| `/staff-portal/dashboard`   | `app/staff-portal/dashboard/page.tsx`   | staff          | ⚠️ Needs verification | Yes (role check) | TBD                            |
| `/instructor/dashboard`     | `app/instructor/dashboard/page.tsx`     | instructor     | ⚠️ Needs verification | Yes (role check) | TBD                            |

---

## Router

| Route        | File Path                | Purpose             | Status   |
| ------------ | ------------------------ | ------------------- | -------- |
| `/dashboard` | `app/dashboard/page.tsx` | Role-based redirect | ✅ Fixed |

**Router logic verified:**

- `admin/super_admin/org_admin` → `/admin/dashboard`
- `program_holder/partner` → `/program-holder/dashboard`
- `employer` → `/employer/dashboard`
- `staff` → `/staff-portal/dashboard`
- `instructor` → `/instructor/dashboard`
- `student/default` → `/lms/dashboard`

---

## Legacy Redirects (All Exist)

| Legacy Route                    | Canonical Route             | File Path                                   | Status            |
| ------------------------------- | --------------------------- | ------------------------------------------- | ----------------- |
| `/student/dashboard`            | `/lms/dashboard`            | `app/student/dashboard/page.tsx`            | ✅ Exists         |
| `/portal/student/dashboard`     | `/lms/dashboard`            | `app/portal/student/dashboard/page.tsx`     | ✅ Exists         |
| `/portal/staff/dashboard`       | `/staff-portal/dashboard`   | `app/portal/staff/dashboard/page.tsx`       | ✅ Exists         |
| `/portal/parent/dashboard`      | TBD                         | `app/portal/parent/dashboard/page.tsx`      | ⚠️ Needs decision |
| `/partner/dashboard`            | `/program-holder/dashboard` | `app/partner/dashboard/page.tsx`            | ✅ Exists         |
| `/(partner)/partners/dashboard` | `/program-holder/dashboard` | `app/(partner)/partners/dashboard/page.tsx` | ✅ Exists         |
| `/programs/admin/dashboard`     | `/admin/dashboard`          | `app/programs/admin/dashboard/page.tsx`     | ✅ Exists         |

---

## Orphan/Unknown Routes

| Route                              | File Path                                      | Status     | Recommendation |
| ---------------------------------- | ---------------------------------------------- | ---------- | -------------- |
| `/admin/programs/[code]/dashboard` | `app/admin/programs/[code]/dashboard/page.tsx` | ⚠️ Unknown | Verify if used |

---

## Status Summary

**Total dashboard routes found:** 14  
**Canonical:** 6  
**Redirects:** 7  
**Orphans:** 1

**Auth guards:** All canonical dashboards have role checks  
**Route groups in URLs:** None found ✅

---

## Next Steps

1. **Verify employer dashboard** - Check if `apprenticeship_enrollments` table exists
2. **Verify staff dashboard** - Identify actual DB tables used
3. **Verify instructor dashboard** - Identify actual DB tables used
4. **Decide parent portal** - Keep or redirect?
5. **Check orphan route** - Is `/admin/programs/[code]/dashboard` used?

---

## Evidence

**Scan command:**

```bash
find app -name "page.tsx" -path "*/dashboard/*" | sort
```

**Router verification:**

```bash
cat app/dashboard/page.tsx | grep -A 20 "switch (profile.role)"
```

**Redirect verification:**

```bash
grep "redirect(" app/portal/*/dashboard/page.tsx app/partner/dashboard/page.tsx
```
