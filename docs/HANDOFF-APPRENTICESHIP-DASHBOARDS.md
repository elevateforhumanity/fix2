# Handoff: Apprenticeship Dashboard Implementation

**Date:** 2024-12-24  
**Status:** Ready for Implementation  
**GitHub Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)

---

## What You're Receiving

A complete implementation plan to wire employer and shop dashboards to real Supabase data, with zero guessing and zero schema invention.

---

## The Problem We Solved

Previous attempts failed because:

1. Code referenced tables/columns that didn't exist
2. Dashboards queried the wrong tables
3. RLS policies weren't understood
4. Mock data masked real issues

**Result:** Empty dashboards, wasted time, team frustration.

---

## The Solution

**Truth-first approach:**

1. Document what exists in database (SQL proof)
2. Map which dashboard uses which tables
3. Wire dashboards to real data
4. Verify RLS works correctly

---

## What's Already Done

### Documentation Created

- ✅ `scripts/current_state_apprenticeship.sql` - Database truth gathering script
- ✅ `docs/apprenticeship-schema-analysis.md` - Dual system discovery
- ✅ `docs/executive-brief-apprenticeship-truth.md` - Stakeholder summary
- ✅ `docs/truth-packet-approval-checklist.md` - Engineering approval checklist
- ✅ `docs/STOP-READ-THIS-FIRST.md` - Team guidance
- ✅ GitHub Issue #1383 with complete one-shot prompt

### What Exists in Database (Verified)

- `apprenticeship_enrollments` table (old system)
- `apprentice_placements` table (new system)
- `shop_staff` table (access control)
- `shops` table
- `apprentice_weekly_reports` table
- RLS policies are enabled

---

## What You Need to Do

### Step 1: Run SQL Script (15 minutes)

1. Open Supabase SQL Editor
2. Copy contents of `scripts/current_state_apprenticeship.sql`
3. Run the script
4. Copy ALL output (including NOTICE messages)
5. Paste output into GitHub Issue #1383 as a comment

### Step 2: Complete Truth Packet (2-3 hours)

1. Use SQL output to complete `docs/current-state-apprenticeship.md`
2. Document all tables, columns, FKs, RLS policies
3. Scan codebase for existing routes
4. Map which dashboard uses which tables
5. List gaps (missing routes, wrong queries, etc.)

### Step 3: Implement Dashboards (1-2 days)

1. **Employer Dashboard** (`/app/employer/dashboard/page.tsx`)
   - Query: `apprenticeship_enrollments` WHERE `employer_id = auth.uid()`
   - Join: programs, student profiles
   - Show: counts, list of enrollments
   - Empty state: actionable CTA

2. **Shop Dashboard** (`/app/shop/dashboard/*`)
   - Query: `shop_staff` → `shops` → `apprentice_placements` → `apprentice_weekly_reports`
   - Show: shops list, placements, weekly reports
   - Create: weekly report form (passes RLS)

### Step 4: Verify (1 hour)

1. Test as `employer@test.com`
2. Test as shop owner/staff
3. Verify RLS works (no service role keys)
4. Confirm real data displays
5. Check empty states work

---

## The One-Shot Prompt

**Location:** GitHub Issue #1383 (latest comment)

**Use this prompt in:**

- Gitpod Copilot Chat
- GitHub Issue for contractor
- Team documentation

**DO NOT paste into:**

- Supabase SQL Editor (it only accepts SQL)

---

## Critical Rules

### ✅ DO

- Query tables that exist
- Use columns that exist
- Respect RLS policies
- Show real data
- Document everything

### ❌ DON'T

- Invent columns
- Guess relationships
- Use service role keys in dashboards
- Use mock/placeholder data
- Mix employer and shop views

---

## Architecture Map

```
EMPLOYER DASHBOARD
└── apprenticeship_enrollments (employer_id = auth.uid())
    ├── programs (JOIN)
    └── profiles/students (JOIN)

SHOP DASHBOARD
└── shop_staff (user_id = auth.uid())
    └── shops
        └── apprentice_placements
            └── apprentice_weekly_reports

STUDENT VIEW
└── apprenticeship_enrollments (student_id = auth.uid())
    OR
└── apprentice_placements (student_id = auth.uid())
```

**DO NOT cross these boundaries.**

---

## Acceptance Criteria

Before marking as "done":

- [ ] SQL script has been run and output posted
- [ ] `docs/current-state-apprenticeship.md` is complete
- [ ] Employer dashboard shows real enrollments
- [ ] Shop dashboard shows real placements/reports
- [ ] No mock data anywhere
- [ ] No schema assumptions
- [ ] RLS works correctly (tested)
- [ ] Empty states are actionable
- [ ] Code passes review using approval checklist

---

## Common Errors & Solutions

| Error                                 | Cause                 | Solution                                      |
| ------------------------------------- | --------------------- | --------------------------------------------- |
| `relation "X" does not exist`         | Querying wrong table  | Check truth packet for actual table name      |
| `column "Y" does not exist`           | Using wrong column    | Check truth packet for actual columns         |
| `new row violates row-level security` | RLS blocking write    | Check RLS policies, fix filter                |
| `permission denied for table`         | RLS blocking read     | Check RLS policies, fix filter                |
| Empty dashboard (no errors)           | Query returns no data | Check filter (auth.uid()), verify data exists |

---

## Timeline

| Phase                 | Duration  | Owner                         |
| --------------------- | --------- | ----------------------------- |
| Run SQL script        | 15 min    | Engineer with Supabase access |
| Complete truth packet | 2-3 hours | Senior engineer               |
| Review & approve      | 1 day     | Tech lead + stakeholders      |
| Implement dashboards  | 1-2 days  | Full-stack engineer           |
| Test & verify         | 1 hour    | QA + engineer                 |
| Deploy                | 30 min    | DevOps                        |

**Total:** 2-3 days from start to production

---

## Success Metrics

**Before:**

- 3+ failed implementation attempts
- 2-3 days wasted per attempt
- Empty dashboards in production
- Team frustration

**After:**

- First-try success
- Real data on day 1
- Zero schema hotfixes
- Team confidence

---

## Support & Questions

**GitHub Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)

**Documentation:**

- `docs/STOP-READ-THIS-FIRST.md` - Start here
- `docs/executive-brief-apprenticeship-truth.md` - For stakeholders
- `docs/truth-packet-approval-checklist.md` - For reviewers
- `docs/apprenticeship-schema-analysis.md` - Technical deep dive

**Key Files:**

- `scripts/current_state_apprenticeship.sql` - Run this first
- `app/employer/dashboard/page.tsx` - Employer dashboard
- `app/shop/dashboard/page.tsx` - Shop dashboard (if exists)

---

## Final Notes

**This is not a "figure it out" task.**

Everything you need is documented:

- SQL script to gather facts
- Exact tables to query
- Exact filters to use
- Exact RLS policies to respect
- Exact acceptance criteria

**If something is unclear, ask in GitHub Issue #1383 BEFORE coding.**

**If you find yourself guessing, STOP and document the question.**

---

## Handoff Checklist

Before handing off to engineer:

- [ ] Engineer has read `docs/STOP-READ-THIS-FIRST.md`
- [ ] Engineer has access to Supabase SQL Editor
- [ ] Engineer has access to GitHub Issue #1383
- [ ] Engineer understands the one-shot prompt
- [ ] Engineer knows NOT to paste prompt into Supabase
- [ ] Engineer has test credentials (`employer@test.com`)
- [ ] Engineer knows to document first, code second
- [ ] Engineer has approval checklist for review

**Handed off by:** ********\_********  
**Handed off to:** ********\_********  
**Date:** ********\_********

---

**Remember: Build on truth, not assumptions. Document first, code second.**
