# Apprenticeship Dashboard Completion Checklist

**GitHub Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)  
**Status:** Ready for Implementation

---

## Pre-Implementation

- [ ] Read `docs/STOP-READ-THIS-FIRST.md`
- [ ] Read `docs/HANDOFF-APPRENTICESHIP-DASHBOARDS.md`
- [ ] Have access to Supabase SQL Editor
- [ ] Have test credentials (`employer@test.com`)
- [ ] Understand: Employer ≠ Shop (different tables)

---

## Phase 1: Database Truth (Optional but Recommended)

- [ ] Run `scripts/current_state_apprenticeship.sql` in Supabase
- [ ] Paste output to GitHub Issue #1383
- [ ] Verify tables exist:
  - [ ] `apprenticeship_enrollments`
  - [ ] `apprentice_placements`
  - [ ] `shop_staff`
  - [ ] `shops`
  - [ ] `apprentice_weekly_reports`
- [ ] Verify row counts > 0 for critical tables
- [ ] Document any missing tables

---

## Phase 2: Employer Dashboard Implementation

### File: `/app/employer/dashboard/page.tsx`

- [ ] Server-side auth implemented
  - [ ] `supabase.auth.getUser()` called
  - [ ] Redirects to `/login` if no user
  - [ ] Uses server component (not client)

- [ ] Query implementation
  - [ ] Queries `apprenticeship_enrollments` table
  - [ ] Filters by `employer_id = auth.uid()`
  - [ ] Joins `programs` table (program_id)
  - [ ] Joins `profiles` table (student_id)
  - [ ] Does NOT query `apprentices` table
  - [ ] Does NOT query `apprentice_placements` table
  - [ ] Does NOT use service role keys

- [ ] Data rendering
  - [ ] Shows total enrollment count
  - [ ] Shows active vs completed counts
  - [ ] Renders list/table of enrollments
  - [ ] Shows: program name, student name, start date, status
  - [ ] Shows: hours required, hours completed
  - [ ] No mock/placeholder data

- [ ] Empty state
  - [ ] Shows when no enrollments exist
  - [ ] Provides actionable CTA or explanation
  - [ ] Not just "coming soon"

- [ ] Error handling
  - [ ] Handles RLS errors gracefully
  - [ ] Handles missing data gracefully
  - [ ] No console errors

---

## Phase 3: Shop Dashboard Implementation

### File: `/app/shop/dashboard/page.tsx`

- [ ] Server-side auth implemented
  - [ ] `supabase.auth.getUser()` called
  - [ ] Redirects to `/login` if no user

- [ ] Query flow (in order)
  - [ ] Step 1: Query `shop_staff` WHERE `user_id = auth.uid()`
  - [ ] Step 2: Extract `shop_id` values
  - [ ] Step 3: Query `shops` WHERE `id IN (shop_ids)`
  - [ ] Step 4: Query `apprentice_placements` WHERE `shop_id IN (shop_ids)`
  - [ ] Does NOT query `apprenticeship_enrollments`
  - [ ] Does NOT use service role keys

- [ ] Data rendering
  - [ ] Shows list of shops user has access to
  - [ ] Shows placements per shop
  - [ ] Links to placement detail pages
  - [ ] No mock/placeholder data

- [ ] Empty state
  - [ ] Shows when no shops exist
  - [ ] Provides actionable CTA or explanation

### File: `/app/shop/placements/[id]/page.tsx` (or equivalent)

- [ ] Placement detail page exists
  - [ ] Shows placement information
  - [ ] Lists weekly reports for this placement
  - [ ] Queries `apprentice_weekly_reports` WHERE `placement_id = [id]`

- [ ] Weekly report creation
  - [ ] Form exists to create new report
  - [ ] Inserts into `apprentice_weekly_reports`
  - [ ] Sets `placement_id` correctly
  - [ ] Sets `submitted_by_user_id = auth.uid()`
  - [ ] Passes RLS (no service role)
  - [ ] Shows success/error feedback

---

## Phase 4: Testing with Real Users

### Test as Employer (`employer@test.com`)

- [ ] Can log in successfully
- [ ] Employer dashboard loads without errors
- [ ] Shows at least 1 apprenticeship enrollment
- [ ] Enrollment shows:
  - [ ] Program name
  - [ ] Student name
  - [ ] Start date
  - [ ] Status
  - [ ] Hours required
  - [ ] Hours completed
- [ ] No console errors
- [ ] No RLS policy errors
- [ ] No "relation does not exist" errors

### Test as Shop Owner (`employer@test.com` or shop staff user)

- [ ] Can log in successfully
- [ ] Shop dashboard loads without errors
- [ ] Shows at least 1 shop
- [ ] Shows at least 1 placement
- [ ] Can click into placement detail
- [ ] Placement detail shows:
  - [ ] Placement information
  - [ ] List of weekly reports
- [ ] Can create new weekly report
- [ ] Weekly report saves successfully
- [ ] New report appears in list
- [ ] No console errors
- [ ] No RLS policy errors

---

## Phase 5: Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build passes (`npm run build` or equivalent)
- [ ] No hardcoded test data
- [ ] No commented-out mock data
- [ ] No `// TODO: fix this` comments
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Consistent with existing code style

---

## Phase 6: Documentation

- [ ] Code comments explain non-obvious logic
- [ ] RLS assumptions are documented
- [ ] Table relationships are clear
- [ ] Empty states are explained
- [ ] Update `docs/current-state-apprenticeship.md` if created

---

## Phase 7: Final Verification

### Database Integrity

- [ ] No new columns added
- [ ] No schema changes made
- [ ] No RLS policies modified
- [ ] No service role keys used in dashboards

### Query Correctness

- [ ] Employer dashboard queries `apprenticeship_enrollments`
- [ ] Shop dashboard queries `shop_staff` → `shops` → `apprentice_placements`
- [ ] No mixing of employer and shop tables
- [ ] All queries respect RLS

### User Experience

- [ ] Dashboards show real data
- [ ] Empty states are helpful
- [ ] Loading states work
- [ ] Error messages are clear
- [ ] Navigation works correctly

---

## Phase 8: Deployment Readiness

- [ ] All tests pass
- [ ] Build succeeds
- [ ] No breaking changes
- [ ] Rollback plan exists
- [ ] Stakeholders notified
- [ ] Documentation updated

---

## Acceptance Criteria (ALL MUST PASS)

- [ ] ✅ Employer dashboard renders real enrollments
- [ ] ✅ Shop dashboard renders real shops/placements
- [ ] ✅ Weekly reports visible and creatable
- [ ] ✅ Queries align with RLS policies
- [ ] ✅ Code references correct tables
- [ ] ✅ Build passes
- [ ] ✅ No mock data anywhere
- [ ] ✅ No schema changes
- [ ] ✅ Tested with real users

---

## Common Failure Points (Check These First)

### Dashboard is Empty

- [ ] Verified data exists in database (run SQL query)
- [ ] Checked filter: `employer_id = auth.uid()` or `user_id = auth.uid()`
- [ ] Verified RLS policies allow SELECT
- [ ] Checked for typos in table/column names
- [ ] Confirmed joins are correct

### RLS Policy Error

- [ ] Using `auth.uid()` not `user.id`
- [ ] Not using service role keys
- [ ] Filter matches RLS policy USING clause
- [ ] User has required role/permissions

### "Relation Does Not Exist"

- [ ] Table name is spelled correctly
- [ ] Table exists in database (check with SQL)
- [ ] Using correct schema (public)
- [ ] Not querying archived/deprecated tables

### TypeScript Errors

- [ ] Types match actual database schema
- [ ] Nullable fields handled correctly
- [ ] Join results typed properly
- [ ] No `any` types used

---

## Sign-Off

**Implementation Complete:**

- [ ] Engineer: ********\_******** Date: **\_\_\_**
- [ ] Code Review: ********\_******** Date: **\_\_\_**
- [ ] QA Testing: ********\_******** Date: **\_\_\_**
- [ ] Product Owner: ********\_******** Date: **\_\_\_**

**Ready for Deployment:**

- [ ] Tech Lead Approval: ********\_******** Date: **\_\_\_**

---

## Post-Deployment

- [ ] Monitor for errors in production
- [ ] Verify real users can access dashboards
- [ ] Check performance/load times
- [ ] Gather user feedback
- [ ] Document any issues
- [ ] Plan follow-up improvements

---

**Remember: If any checkbox fails, the work is not complete. Fix before proceeding.**
