# Apprenticeship Dashboard Implementation Guide

**Last Updated:** 2024-12-24  
**Status:** Ready for Implementation  
**GitHub Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)

---

## Quick Start

**Choose your role:**

### 👨‍💻 I'm an Engineer

1. Read: `docs/STOP-READ-THIS-FIRST.md`
2. Read: `docs/HANDOFF-APPRENTICESHIP-DASHBOARDS.md`
3. Use: Finish-line prompt in GitHub Issue #1383
4. Follow: `docs/COMPLETION-CHECKLIST.md`

### 👔 I'm a Stakeholder

1. Read: `docs/executive-brief-apprenticeship-truth.md`
2. Decide: Plan A (fast) or Plan B (complete)
3. Approve: Implementation plan

### 🔍 I'm a Reviewer

1. Use: `docs/truth-packet-approval-checklist.md`
2. Verify: All checkboxes pass
3. Sign off: Before deployment

---

## The Problem

Multiple attempts to implement employer/shop dashboards failed because:

- Code referenced tables that didn't exist
- Queries used wrong columns
- RLS policies weren't understood
- Mock data masked real issues

**Result:** Empty dashboards, wasted time, team frustration.

---

## The Solution

**Truth-first approach:**

1. Document what exists (SQL proof)
2. Map which dashboard uses which tables
3. Wire dashboards to real data
4. Verify RLS works

**No guessing. No assumptions. No schema changes.**

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER IDENTITY                         │
│                    auth.uid()                            │
└─────────────────────────────────────────────────────────┘
                           │
                           ├─────────────────────────────┐
                           │                             │
                           ▼                             ▼
              ┌────────────────────────┐    ┌────────────────────────┐
              │   EMPLOYER DASHBOARD   │    │    SHOP DASHBOARD      │
              └────────────────────────┘    └────────────────────────┘
                           │                             │
                           ▼                             ▼
              ┌────────────────────────┐    ┌────────────────────────┐
              │ apprenticeship_        │    │     shop_staff         │
              │    enrollments         │    │  (user_id = auth.uid())│
              │ (employer_id =         │    └────────────────────────┘
              │    auth.uid())         │                 │
              └────────────────────────┘                 ▼
                           │                  ┌────────────────────────┐
                           ├─────────────────▶│        shops           │
                           │                  └────────────────────────┘
                           ▼                             │
              ┌────────────────────────┐                 ▼
              │       programs         │    ┌────────────────────────┐
              │    (program_id)        │    │  apprentice_placements │
              └────────────────────────┘    │    (shop_id)           │
                           │                └────────────────────────┘
                           ▼                             │
              ┌────────────────────────┐                 ▼
              │       profiles         │    ┌────────────────────────┐
              │    (student_id)        │    │ apprentice_weekly_     │
              └────────────────────────┘    │      reports           │
                                            │   (placement_id)       │
                                            └────────────────────────┘
```

**Critical Rule:** DO NOT cross these boundaries. Employer and shop are separate systems.

---

## Key Tables

### Employer System

- **`apprenticeship_enrollments`** - Main table
  - `employer_id` → `profiles(id)` or `auth.users(id)`
  - `student_id` → `profiles(id)`
  - `program_id` → `programs(id)`
  - Contains: status, hours, dates

### Shop System

- **`shop_staff`** - Access control
  - `user_id` → `auth.users(id)`
  - `shop_id` → `shops(id)`
  - `role` - owner, manager, staff

- **`shops`** - Shop information
  - `id`, `name`, `address`, etc.

- **`apprentice_placements`** - Student placements
  - `shop_id` → `shops(id)`
  - `student_id` → `profiles(id)`
  - `program_slug` - e.g., 'barber-apprenticeship'

- **`apprentice_weekly_reports`** - Hours tracking
  - `placement_id` → `apprentice_placements(id)`
  - `submitted_by_user_id` → `auth.users(id)`
  - `hours_total`, `hours_ojt`, `hours_related`

---

## Implementation Paths

### Path 1: Finish-Line Prompt (Recommended)

**Use when:** Database is correct, just need to wire dashboards

**Steps:**

1. Use finish-line prompt from GitHub Issue #1383
2. Update employer dashboard to query `apprenticeship_enrollments`
3. Update shop dashboard to query `shop_staff` → `shops` → `placements`
4. Test with real users
5. Deploy

**Timeline:** 1-2 days

### Path 2: Truth Packet First (Recommended for Complex Cases)

**Use when:** Unsure about database state, need documentation

**Steps:**

1. Run `scripts/current_state_apprenticeship.sql`
2. Complete `docs/current-state-apprenticeship.md`
3. Review and approve
4. Then use finish-line prompt
5. Deploy

**Timeline:** 2-3 days

---

## Files Reference

### Must Read

- `docs/STOP-READ-THIS-FIRST.md` - Start here
- `docs/HANDOFF-APPRENTICESHIP-DASHBOARDS.md` - Complete guide

### For Implementation

- GitHub Issue #1383 - Finish-line prompt
- `docs/COMPLETION-CHECKLIST.md` - Step-by-step checklist
- `scripts/current_state_apprenticeship.sql` - Database truth

### For Review

- `docs/truth-packet-approval-checklist.md` - Approval criteria
- `docs/executive-brief-apprenticeship-truth.md` - Business context

### Technical Deep Dive

- `docs/apprenticeship-schema-analysis.md` - Dual system analysis

---

## Common Mistakes to Avoid

### ❌ DON'T

- Query `apprentice_placements` from employer dashboard
- Query `apprenticeship_enrollments` from shop dashboard
- Use `employer_name` as a join key (it's text, not FK)
- Add columns without approval
- Disable RLS to "make it work"
- Use service role keys in dashboards
- Show mock/placeholder data

### ✅ DO

- Query correct tables for each dashboard
- Use `auth.uid()` for identity
- Respect RLS policies
- Show real data or real empty states
- Handle errors gracefully
- Document assumptions
- Test with real users

---

## Testing Checklist

### Employer Dashboard

```bash
# Login as employer@test.com
# Navigate to /employer/dashboard
# Verify:
- [ ] Dashboard loads without errors
- [ ] Shows at least 1 enrollment
- [ ] Program name displays
- [ ] Student name displays
- [ ] Hours display correctly
- [ ] Status displays correctly
- [ ] No console errors
```

### Shop Dashboard

```bash
# Login as shop owner/staff
# Navigate to /shop/dashboard
# Verify:
- [ ] Dashboard loads without errors
- [ ] Shows at least 1 shop
- [ ] Shows at least 1 placement
- [ ] Can view placement detail
- [ ] Can see weekly reports
- [ ] Can create weekly report
- [ ] No console errors
```

---

## Troubleshooting

### Dashboard is Empty

1. Check if data exists: Run SQL query directly
2. Verify filter: `employer_id = auth.uid()` or `user_id = auth.uid()`
3. Check RLS policies: Do they allow SELECT?
4. Verify joins: Are table/column names correct?

### RLS Policy Error

1. Confirm using `auth.uid()` not `user.id`
2. Check you're not using service role keys
3. Verify filter matches RLS USING clause
4. Confirm user has required permissions

### "Relation Does Not Exist"

1. Check table name spelling
2. Verify table exists in database
3. Confirm using correct schema (public)
4. Not querying archived tables

---

## Success Metrics

**Before:**

- 3+ failed attempts
- 2-3 days wasted per attempt
- Empty dashboards
- Team frustration

**After:**

- First-try success
- Real data on day 1
- Zero hotfixes
- Team confidence

---

## Timeline

| Phase          | Duration  | Status      |
| -------------- | --------- | ----------- |
| Documentation  | 4 hours   | ✅ Complete |
| SQL Script Run | 15 min    | ⏳ Pending  |
| Truth Packet   | 2-3 hours | ⏳ Optional |
| Implementation | 1-2 days  | ⏳ Pending  |
| Testing        | 1 hour    | ⏳ Pending  |
| Deployment     | 30 min    | ⏳ Pending  |

**Total:** 2-3 days to production

---

## Support

**GitHub Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)

**Questions?** Comment on the issue.

**Stuck?** Review the checklist and documentation.

**Found a bug?** Document it, don't work around it.

---

## Next Steps

1. **Immediate:** Choose implementation path (finish-line or truth-first)
2. **Today:** Begin implementation
3. **This Week:** Complete and deploy
4. **Next Week:** Monitor and iterate

---

**Remember: Build on truth, not assumptions. Document first, code second.**
