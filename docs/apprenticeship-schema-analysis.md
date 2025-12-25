# Apprenticeship Schema Analysis

**Date:** 2024-12-24  
**Status:** Dual system identified - both schemas exist and are in use

## Executive Summary

Two separate apprenticeship tracking systems exist in the codebase:

1. **Legacy System:** `apprenticeship_enrollments` (direct employer relationship)
2. **New System:** `apprentice_placements` (shop-scoped with RBAC)

Both systems are functional and serve different parts of the application. No immediate conflict exists, but long-term consolidation is recommended.

---

## Schema Comparison

### Legacy System: `apprenticeship_enrollments`

**Location:** `.archive/CREATE_OJT_TRACKING_SYSTEM.sql` (not in active migrations)

**Key Columns:**

- `student_id` → `profiles(id)`
- `program_id` → `programs(id)`
- `employer_name` (TEXT) - stored as string, not FK
- `supervisor_name` (TEXT) - stored as string, not FK
- `employer_id` - direct FK to profiles (assumed employer role)
- `total_hours_required` (INTEGER)
- `total_hours_completed` (NUMERIC)
- `status` - active | completed | suspended | terminated

**Access Pattern:**

```sql
SELECT * FROM apprenticeship_enrollments
WHERE employer_id = user.id;  -- Direct employer access
```

**Used By:**

- Student portfolio page
- Admin payroll dashboard
- Admin apprenticeships dashboard
- Email alert APIs
- Cron job notifications

---

### New System: `apprentice_placements`

**Location:** `supabase/migrations/20251218_shop_partner_portal.sql`

**Key Columns:**

- `student_id` → `profiles(id)`
- `program_slug` (TEXT) - defaults to 'barber-apprenticeship'
- `shop_id` → `shops(id)` - FK to shops table
- `supervisor_user_id` → `auth.users(id)` - actual user FK
- `start_date`, `end_date`
- `status` - active | paused | completed

**Related Tables:**

- `apprentice_weekly_reports` - hours tracking per placement
- `apprentice_wage_updates` - wage progression
- `shop_staff` - access control (who can manage which shops)
- `shops` - employer shop information

**Access Pattern:**

```sql
-- Step 1: Get shops user has access to
SELECT shop_id FROM shop_staff WHERE user_id = user.id;

-- Step 2: Get placements for those shops
SELECT * FROM apprentice_placements
WHERE shop_id IN (user_shop_ids);
```

**Used By:**

- Employer dashboard (`app/employer/dashboard/page.tsx`) ✅ CORRECT
- Employer apprenticeship creation flow
- Employer weekly report submission

---

## File Usage Analysis

### Files Using Legacy System (8 files)

#### App Routes (3 files)

1. **`app/student/portfolio/page.tsx`** (Line 31)
   - Shows student's own apprenticeship enrollment
   - Displays employer name, supervisor, hours progress

2. **`app/admin/payroll/page.tsx`** (Lines 26, 30, 44)
   - Admin view of payroll linked to apprenticeships
   - Joins with `apprentice_payroll` table
   - Shows employer name from enrollment

3. **`app/admin/apprenticeships/page.tsx`** (Lines 25, 29, 49)
   - Admin view of pending OJT hours for approval
   - Joins with `ojt_hours_log` table
   - Shows employer name from enrollment

#### API Routes (5 files)

4. **`app/api/apprentice/email-alerts/route.ts`** (Lines 9, 12, 13, 93, 96)
   - Sends email alerts for apprenticeship events
   - Fetches student and employer profiles for notifications

5. **`app/api/cron/missed-checkins/route.ts`** (Lines 23, 30, 35)
   - Daily cron job to check for missed check-ins
   - Sends alerts to students and employers

6. **`app/api/cron/morning-reminders/route.ts`** (Lines 26, 31, 36)
   - Morning reminder emails for active apprentices
   - Includes employer and student contact info

7. **`app/api/cron/end-of-day-summary/route.ts`** (Lines 23, 31, 36)
   - End-of-day summary emails
   - Reports hours logged to employers

8. **`app/api/apprentice/email-alerts/route.ts`** (duplicate entry)

### Files Using New System (4+ files)

1. **`app/employer/dashboard/page.tsx`** ✅
   - Correctly uses `shop_staff → shops → apprentice_placements`
   - Shows placements for all shops user manages
   - Calculates hours from `apprentice_weekly_reports`

2. **`app/employer/apprenticeships/new/page.tsx`** ✅
   - Creates new `apprentice_placements` records
   - Requires shop selection

3. **`app/employer/apprenticeships/[id]/weekly-report/new/page.tsx`** ✅
   - Submits `apprentice_weekly_reports`
   - Links to placement via `placement_id`

4. **`app/employer/shop/create/page.tsx`** ✅
   - Creates shops and auto-adds user to `shop_staff`

---

## Migration Paths

### Option 1: Dual System (Recommended) ⭐

**Approach:**

- Maintain both systems for backward compatibility
- Use legacy system for existing enrollments and admin views
- Use new system for all employer-facing workflows
- Create bridge views/functions for reporting

**Pros:**

- No breaking changes
- Existing admin/student features continue working
- New employer features use proper RBAC
- Gradual migration possible

**Cons:**

- Two sources of truth for apprenticeship data
- Potential confusion for developers
- Requires documentation and clear boundaries

**Implementation:**

1. Document which system each feature uses
2. Create unified reporting views that combine both
3. Add migration script for future consolidation
4. Set deprecation timeline for legacy system

---

### Option 2: Hard Migration

**Approach:**

- Create migration script to convert all `apprenticeship_enrollments` to `apprentice_placements`
- Update all 8 files to use new schema
- Create `shops` records for all employers in old system
- Map `employer_name` strings to actual shop records

**Pros:**

- Single source of truth
- Cleaner codebase
- Better RBAC and multi-shop support

**Cons:**

- High risk of data loss or corruption
- Requires extensive testing
- May break existing workflows
- Complex mapping of string employer names to shop records

**Implementation:**

1. Create shops for all unique `employer_name` values
2. Create `shop_staff` records for all employers
3. Migrate enrollments to placements
4. Update all queries in 8 files
5. Test all affected features
6. Deploy with rollback plan

---

### Option 3: Deprecate Legacy System

**Approach:**

- Mark old system as deprecated
- Add warnings to admin/student pages using old system
- Redirect new enrollments to new system
- Keep old system read-only for historical data

**Pros:**

- Clear migration path
- Preserves historical data
- Forces adoption of new system

**Cons:**

- Admin features may need rebuilding
- Student portfolio needs update
- Email notifications need rewrite

**Implementation:**

1. Add deprecation warnings to old pages
2. Make `apprenticeship_enrollments` read-only
3. Build new admin views using `apprentice_placements`
4. Update student portfolio to show both systems
5. Rewrite email APIs to use new system

---

## Recommended Action Plan

### Phase 1: Documentation & Stabilization (Week 1)

- ✅ Document both systems (this file)
- Create unified view combining both systems for reporting
- Add comments to code indicating which system is used
- Update developer onboarding docs

### Phase 2: Feature Parity (Weeks 2-3)

- Build admin views for `apprentice_placements` system
- Update student portfolio to show placements from both systems
- Create migration script (but don't run yet)
- Add feature flags to toggle between systems

### Phase 3: Testing & Validation (Week 4)

- Test new admin views with real data
- Validate migration script on staging
- Get stakeholder approval for migration
- Create rollback procedures

### Phase 4: Migration (Week 5)

- Run migration script on production
- Monitor for issues
- Update all 8 files to use new system
- Deprecate old system

### Phase 5: Cleanup (Week 6)

- Remove old code after 30-day grace period
- Archive `apprenticeship_enrollments` table
- Update all documentation
- Celebrate! 🎉

---

## Technical Debt Assessment

**Current State:**

- **Debt Level:** Medium
- **Risk:** Low (systems don't conflict)
- **Urgency:** Low (both systems functional)

**Future State (if not addressed):**

- **Debt Level:** High
- **Risk:** High (data inconsistency, confusion)
- **Urgency:** High (blocks new features)

**Recommendation:** Address within 6 weeks using phased approach above.

---

## Questions for Stakeholders

1. **Are there active enrollments in `apprenticeship_enrollments` table?**
   - If yes, how many?
   - Are they still being updated?

2. **Do admin users rely on current payroll/apprenticeship dashboards?**
   - If yes, can we rebuild them using new system?
   - What's the acceptable downtime?

3. **Is the employer dashboard (`apprentice_placements`) in production use?**
   - If yes, how many shops/placements exist?
   - Are employers actively submitting weekly reports?

4. **What's the priority: maintain old features or adopt new system?**
   - If maintain: Use Option 1 (Dual System)
   - If adopt: Use Option 2 (Hard Migration)

---

## Related Documentation

- [Apprenticeship Onboarding Verification](./apprenticeship-onboarding-verification.md)
- [Roles and Dashboards](./roles-and-dashboards.md)
- [Dashboard Consolidation](./dashboard-consolidation.md)

---

## Appendix: SQL Queries

### Check if legacy table exists

```sql
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name = 'apprenticeship_enrollments'
);
```

### Count records in each system

```sql
-- Legacy system
SELECT COUNT(*) as legacy_count
FROM apprenticeship_enrollments;

-- New system
SELECT COUNT(*) as new_count
FROM apprentice_placements;
```

### Find overlapping students

```sql
SELECT DISTINCT p.email, p.first_name, p.last_name
FROM profiles p
WHERE p.id IN (
  SELECT student_id FROM apprenticeship_enrollments
  INTERSECT
  SELECT student_id FROM apprentice_placements
);
```

### Create unified view (example)

```sql
CREATE OR REPLACE VIEW apprenticeships_unified AS
SELECT
  'legacy' as source,
  id,
  student_id,
  employer_name as employer,
  supervisor_name as supervisor,
  start_date,
  status,
  total_hours_completed as hours
FROM apprenticeship_enrollments
UNION ALL
SELECT
  'new' as source,
  ap.id,
  ap.student_id,
  s.name as employer,
  p.first_name || ' ' || p.last_name as supervisor,
  ap.start_date,
  ap.status,
  COALESCE(SUM(awr.hours_total), 0) as hours
FROM apprentice_placements ap
LEFT JOIN shops s ON ap.shop_id = s.id
LEFT JOIN profiles p ON ap.supervisor_user_id = p.id
LEFT JOIN apprentice_weekly_reports awr ON ap.id = awr.placement_id
GROUP BY ap.id, s.name, p.first_name, p.last_name;
```
