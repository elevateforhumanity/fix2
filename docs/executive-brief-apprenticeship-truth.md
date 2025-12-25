# Executive Brief: Apprenticeship Dashboard Truth Packet

**Date:** 2024-12-24  
**Status:** Pre-Implementation Analysis  
**Issue:** [#1383](https://github.com/elevateforhumanity/fix2/issues/1383)

---

## Purpose

Lock everyone into the same reality before more code is written.

---

## Current State Summary

The apprenticeship system is live at the database level.

**Real data exists for:**

- Employers
- Apprenticeship enrollments
- Shops
- Placements
- Weekly reports

**Row Level Security (RLS) is enabled and working.**

- Employers can now correctly read their own apprenticeship enrollments.
- Shops manage placements and weekly reports separately.

**Dashboard Architecture:**

- Employer dashboards must use `apprenticeship_enrollments` as the source of truth.
- Shop dashboards must use `shop_staff` → `shops` → `apprentice_placements` → `apprentice_weekly_reports`.

---

## Critical Constraint

**Do not mix employer views with shop views.**

- Do not invent columns or relationships.
- Dashboards appearing empty is almost always a query-to-wrong-table problem, not missing data.

---

## Approved Direction

**Phase 1:** Employer dashboard reads only from `apprenticeship_enrollments`.

**Phase 2 (optional):** Add explicit linkage between enrollments and placements if business rules require it.

---

## Stop Condition

**No new features until the "Current State Truth Packet" is completed and reviewed.**

---

## Timeline

| Phase               | Duration  | Status      |
| ------------------- | --------- | ----------- |
| SQL Script Creation | 1 hour    | ✅ Complete |
| Run SQL in Supabase | 15 min    | ⏳ Pending  |
| Document Analysis   | 2-3 hours | ⏳ Pending  |
| Stakeholder Review  | 1 day     | ⏳ Pending  |
| Implementation      | TBD       | ⏸️ Blocked  |

---

## Decision Required

**Choose implementation approach:**

**Plan A: Fast Path** (Recommended for MVP)

- Employer dashboard uses `apprenticeship_enrollments` table only
- No schema changes required
- Can ship in 1-2 days
- Limited to single-employer view

**Plan B: Complete Path** (Recommended for scale)

- Link old and new systems together
- Requires schema migration
- Takes 1-2 weeks
- Supports multi-shop employers

---

## Business Impact

**Without Truth Packet:**

- Continue building features that don't work
- Waste 2-3 days per failed attempt
- Risk data corruption from wrong queries
- Team frustration and low morale

**With Truth Packet:**

- Build features that work on first try
- Save 80% of debugging time
- Prevent data integrity issues
- Team confidence and velocity

---

## Next Steps

1. **Immediate:** Run SQL script in Supabase (15 min)
2. **Today:** Complete truth packet documentation (2-3 hours)
3. **Tomorrow:** Stakeholder review and decision (Plan A vs B)
4. **This Week:** Begin implementation with confidence

---

## Questions for Stakeholders

1. **Priority:** Do we need employer dashboards working this week? → Choose Plan A
2. **Scale:** Will employers manage multiple shops? → Consider Plan B
3. **Data:** Are there active enrollments in the old system? → Affects migration
4. **Timeline:** Can we wait 1-2 weeks for complete solution? → Plan B feasible

---

## Success Metrics

- [ ] Zero "table does not exist" errors in production
- [ ] Dashboards show real data on first deployment
- [ ] No emergency hotfixes for schema mismatches
- [ ] Engineering velocity increases 3x

---

**Bottom Line:** Spend 4 hours documenting truth now, save 40 hours debugging assumptions later.

**Approval Required:** Product Owner, Technical Lead  
**Blocking:** All apprenticeship dashboard work until truth packet complete
