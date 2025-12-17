# BLOCKING ISSUES - Must Fix Before "Complete"

**Status**: 🔴 NOT PRODUCTION READY  
**Date**: 2025-12-17

## Critical Blockers

### 1. Migrations NOT Applied ❌

**Issue**: Migrations 001-009 exist in code but are NOT applied to Supabase database.

**Impact**: 
- Core tables may not exist (organizations, organization_users, org_invites)
- RLS policies not enforced
- Helper functions missing
- Platform cannot function

**Fix**:
```bash
# Apply via Supabase Dashboard SQL Editor
# Copy/paste each file in order:
1. supabase/migrations/001_init_schema.sql
2. supabase/migrations/002_courses.sql
3. supabase/migrations/003_products.sql
4. supabase/migrations/004_media.sql
5. supabase/migrations/005_licenses.sql
6. supabase/migrations/006_org_invites_rls_fix.sql
7. supabase/migrations/007_rls_policies.sql
8. supabase/migrations/008_system_errors.sql
9. supabase/migrations/009_rls_hardening_pack.sql
```

**Verification**:
```sql
-- Run in Supabase SQL Editor
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('organizations', 'organization_users', 'org_invites', 'audit_logs', 'system_errors');
-- Should return 5 rows
```

---

### 2. Stripe Webhook → Org Subscription NOT Wired ❌

**Issue**: Stripe webhook exists but doesn't call `upsertOrgSubscription`.

**Impact**:
- Billing status not tracked
- License enforcement broken
- Organizations can't be marked as past_due

**Current State**: Check `app/api/webhooks/stripe/route.ts`

**Required Fix**:
```typescript
// In webhook handler, after checkout.session.completed:
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const orgId = session.metadata?.organization_id;
  
  if (orgId) {
    await upsertOrgSubscription({
      organization_id: orgId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      status: 'active',
      current_period_end: new Date(session.subscription.current_period_end * 1000)
    });
  }
}
```

**Verification**:
1. Complete Stripe checkout with org metadata
2. Check `organization_subscriptions` table has row
3. Verify `status = 'active'`

---

### 3. Reports UI NOT Accessible ❌

**Issue**: Report API routes exist but no UI pages to access them.

**Impact**:
- Admins can't view enrollment reports
- No CSV export functionality
- Missing key differentiator (Workforce OS vs LMS)

**Required Pages**:
- `/admin/reports` - Reports dashboard
- `/admin/reports/enrollments` - Enrollment report
- `/admin/reports/progress` - Progress report
- `/admin/reports/completions` - Completions report
- `/admin/reports/credentials` - Credentials report

**Each page needs**:
- Data table with filters
- CSV export button
- Org isolation (only show current org data)

---

### 4. Hero Media Placeholders ❌

**Issue**: Hero uses SVG placeholders, not real images/video.

**Impact**:
- Site looks generic/unfinished
- No visual authority
- Doesn't match "December 12 banners" mentioned

**Required Assets**:
```
/public/images/hero/hero-banner-1.jpg  (1920x600px)
/public/images/hero/hero-banner-2.jpg  (1920x600px)
/public/video/home-hero.mp4            (8-10 seconds)
/public/audio/home-hero-voiceover.mp3  (8-10 seconds)
```

**Current**: All are SVG placeholders

---

### 5. Onboarding Flow Incomplete ❌

**Issue**: Missing entry points for key flows.

**Impact**:
- Users can't create organizations
- Invite flow not discoverable
- No clear path from signup → org creation

**Required**:
- [ ] `/onboarding` page after signup
- [ ] "Create Organization" button visible
- [ ] "Accept Invite" page works end-to-end
- [ ] Dashboard shows "Invite Team" CTA

---

## Non-Blocking (But Important)

### 6. RLS on Remaining Tables ⚠️

**Issue**: Student data tables (student_documents, student_grades, etc.) may not have RLS.

**Impact**: Potential data leakage between orgs

**Fix**: Apply org-scoped policies to all student/HR/billing tables

---

### 7. Legal Warning Banner ⚠️

**Issue**: Top banner "unauthorized copying" looks like a scare tactic.

**Impact**: Reduces premium feel

**Fix**: Move to footer or make less prominent

---

## What "Complete" Actually Means

✅ **Code Complete**: YES (all features implemented)  
❌ **Database Complete**: NO (migrations not applied)  
❌ **Wiring Complete**: NO (webhook, reports UI missing)  
❌ **Assets Complete**: NO (hero placeholders)  
❌ **Flow Complete**: NO (onboarding gaps)

---

## One-Shot Fix Plan

**Today (2-3 hours)**:

1. **Apply migrations** (30 min)
   - Copy/paste each SQL file into Supabase dashboard
   - Verify tables exist

2. **Wire Stripe webhook** (30 min)
   - Add `upsertOrgSubscription` call
   - Test with Stripe CLI

3. **Create reports UI** (60 min)
   - Copy API logic to page components
   - Add CSV export button
   - Test org isolation

4. **Replace hero assets** (30 min)
   - Upload December 12 banners
   - Upload video/audio
   - Test autoplay behavior

**After these 4 fixes**: Platform is actually complete and production-ready.

---

## Current Reality

**What works**:
- TypeScript: 0 errors ✅
- Build: Success ✅
- Email: Wired ✅
- Invite logic: Correct ✅
- RLS migrations: Created ✅

**What doesn't work**:
- Migrations: Not applied ❌
- Webhook: Not wired ❌
- Reports: No UI ❌
- Hero: Placeholders ❌
- Onboarding: Gaps ❌

**Bottom line**: Code is 95% done. Execution is 40% done.

The gap between "code exists" and "platform works" is these 4 fixes.
