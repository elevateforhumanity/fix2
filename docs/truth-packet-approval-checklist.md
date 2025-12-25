# Engineering Approval Checklist

**Purpose:** Use this checklist to approve or reject work. If any item fails, the work is not "done."  
**Related Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)

---

## A. Database Reality Check

- [ ] `scripts/current_state_apprenticeship.sql` has been created
- [ ] SQL script has been run in Supabase SQL Editor
- [ ] All output (including NOTICE messages) has been captured
- [ ] Output has been pasted into GitHub Issue #1383
- [ ] No "relation does not exist" errors for critical tables
- [ ] Row counts are documented for all existing tables

---

## Phase 2: Database Truth Verification

### Table Existence

- [ ] Confirmed which tables exist: `shops`, `shop_staff`, `apprentice_placements`, `apprentice_weekly_reports`, `apprenticeship_enrollments`, `apprentices`, `employers`
- [ ] Documented which tables are missing (if any)
- [ ] Row counts show actual data exists (not all zeros)

### Column Verification

- [ ] All columns are documented with correct data types
- [ ] No invented columns (e.g., `owner_user_id`, wrong `employer_id` locations)
- [ ] Nullable vs NOT NULL is documented
- [ ] Default values are documented

### Foreign Key Relationships

- [ ] All FK relationships are documented with exact table/column references
- [ ] Verified: `shop_staff.user_id` → `auth.users(id)` (NOT profiles)
- [ ] Verified: `apprentice_weekly_reports.submitted_by_user_id` → `auth.users(id)`
- [ ] Verified: `apprentice_placements.student_id` → `profiles(id)`
- [ ] Verified: `apprentices.employer_id` → `employers(id)` (if tables exist)
- [ ] Documented any missing or unexpected FK relationships

### RLS Status

- [ ] RLS enabled/disabled status documented for all tables
- [ ] Security risk flagged if `employers` table has RLS disabled
- [ ] All RLS policies are listed with their rules
- [ ] Policy commands documented (SELECT, INSERT, UPDATE, DELETE)
- [ ] `USING` and `WITH CHECK` expressions are captured

---

## Phase 3: Code Truth Verification

### Route Inventory

- [ ] All `/app/employer/**` routes documented
- [ ] All `/app/shop/**` routes documented
- [ ] All routes querying apprenticeship tables documented

### Query Analysis

For each route/page:

- [ ] File path is documented
- [ ] Tables queried are listed
- [ ] Filter conditions are documented (auth.uid(), shop_id, etc.)
- [ ] RLS compatibility is assessed
- [ ] Mismatches between code and schema are flagged

### Specific Routes to Check

- [ ] `app/employer/dashboard/page.tsx` - which tables does it query?
- [ ] `app/shop/dashboard/page.tsx` - which tables does it query?
- [ ] `app/student/portfolio/page.tsx` - which tables does it query?
- [ ] `app/admin/payroll/page.tsx` - which tables does it query?
- [ ] `app/admin/apprenticeships/page.tsx` - which tables does it query?

---

## Phase 4: Ownership Map Validation

### Employer Dashboard

- [ ] Source of truth is clearly defined
- [ ] Expected: `apprenticeship_enrollments` with `employer_id = auth.uid()`
- [ ] Current implementation matches or mismatch is documented
- [ ] RLS policies support this access pattern

### Shop Dashboard

- [ ] Source of truth is clearly defined
- [ ] Expected: `shop_staff` → `shops` → `apprentice_placements` → `apprentice_weekly_reports`
- [ ] Current implementation matches or mismatch is documented
- [ ] RLS policies support this access pattern

### Student View

- [ ] Source of truth is clearly defined
- [ ] Expected: `apprenticeship_enrollments` (student_id) or placements
- [ ] Current implementation matches or mismatch is documented
- [ ] RLS policies support this access pattern

### Separation of Concerns

- [ ] Employer and shop dashboards use different tables (no mixing)
- [ ] No code tries to query both systems in one component
- [ ] Clear boundaries documented

---

## Phase 5: Gap Analysis

### Missing Components

- [ ] Missing route pages are listed
- [ ] Missing joins/relationships are documented
- [ ] Tables that exist but aren't queried are flagged

### RLS Mismatches

- [ ] Places where RLS blocks access are documented
- [ ] Reasons for blocks are explained (e.g., wrong filter, missing policy)
- [ ] No "it should work" assumptions

### Schema Contradictions

- [ ] Any contradictions between old and new systems are documented
- [ ] Linkage between `apprenticeship_enrollments` and `apprentice_placements` is documented (exists or doesn't exist)
- [ ] No invented relationships

---

## Phase 6: Implementation Plans

### Plan A: Fast Path

- [ ] Plan A is documented (employer dashboard uses `apprenticeship_enrollments` only)
- [ ] Steps are concrete and actionable
- [ ] No schema changes required
- [ ] Estimated effort is provided

### Plan B: Complete Path

- [ ] Plan B is documented (explicit linkage between systems)
- [ ] Schema changes are listed
- [ ] RLS policy changes are listed
- [ ] Migration strategy is outlined
- [ ] Estimated effort is provided

### Decision Criteria

- [ ] Trade-offs between Plan A and Plan B are clear
- [ ] Stakeholder input is documented
- [ ] Chosen plan is marked

---

## Phase 7: Documentation Quality

### Completeness

- [ ] `docs/current-state-apprenticeship.md` exists
- [ ] All 5 phases are documented
- [ ] No "TODO" or "TBD" placeholders
- [ ] All claims are backed by evidence (file path or SQL result)

### Consistency

- [ ] No contradictions between sections
- [ ] Table names are consistent throughout
- [ ] Column names match SQL output
- [ ] FK relationships match SQL output

### Clarity

- [ ] Non-technical stakeholders can understand the ownership map
- [ ] Engineers can implement from the documentation
- [ ] Error messages are explained
- [ ] Next steps are clear

---

## Phase 8: Approval Gates

### Technical Approval

- [ ] Lead engineer has reviewed the truth packet
- [ ] Database schema matches documentation
- [ ] Code analysis is accurate
- [ ] No major gaps or contradictions

### Stakeholder Approval

- [ ] Product owner has reviewed ownership map
- [ ] Decision made on Plan A vs Plan B
- [ ] Timeline is agreed upon
- [ ] Resources are allocated

### Security Review

- [ ] RLS policies are documented
- [ ] Security risks are flagged (e.g., RLS disabled)
- [ ] Access patterns are validated
- [ ] No service role key usage in dashboards

---

## Final Approval

**Before proceeding to implementation:**

- [ ] All checkboxes above are checked
- [ ] Truth packet is internally consistent
- [ ] Implementation plan is chosen and approved
- [ ] Team is aligned on next steps

**Approved by:**

- Technical Lead: ********\_******** Date: **\_\_\_**
- Product Owner: ********\_******** Date: **\_\_\_**
- Security Review: ********\_******** Date: **\_\_\_**

---

## Post-Approval Actions

Once approved:

1. Create implementation tickets based on chosen plan
2. Assign engineers to specific tasks
3. Set up code review process
4. Schedule testing with real data
5. Plan deployment strategy

---

## Red Flags (STOP if you see these)

❌ **"We can add that column later"** - No invented columns  
❌ **"It should work with RLS"** - Must verify, not assume  
❌ **"The table probably exists"** - Must confirm with SQL  
❌ **"We'll figure out the relationship"** - Must document now  
❌ **"Let's just try it and see"** - No exploratory coding yet

---

## Success Criteria

✅ Truth packet is complete and accurate  
✅ No assumptions or guesses  
✅ All claims backed by evidence  
✅ Implementation plan is concrete  
✅ Team is aligned and ready to build

---

**Remember: The goal is to build confidently on truth, not waste time debugging assumptions.**
