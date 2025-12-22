# SAFE VERCEL ACCOUNT DELETION CHECKLIST

**Created:** December 18, 2025  
**New Account:** solacehhc317-9558 (lizzy6262)  
**Old Account:** [Your old account name]  
**Timeline:** 7-14 days before deletion

---

## 📅 DAY 1-2: IMMEDIATE TESTING (December 18-19)

### ✅ Core Functionality Tests

- [ ] **Homepage**
  - [ ] Loads without errors
  - [ ] Videos play correctly
  - [ ] All images display
  - [ ] Navigation works
  - [ ] CTAs clickable

- [ ] **Key Pages**
  - [ ] /about loads
  - [ ] /programs loads
  - [ ] /apply loads and form works
  - [ ] /contact loads and form works
  - [ ] /signup loads and form works
  - [ ] /login works
  - [ ] All 6 program pages load

- [ ] **Authentication**
  - [ ] Can create new account
  - [ ] Can login with existing account
  - [ ] Can logout
  - [ ] Password reset works
  - [ ] Session persists

- [ ] **Database**
  - [ ] Data loads correctly
  - [ ] Can create new records
  - [ ] Can update records
  - [ ] Can delete records
  - [ ] Queries are fast

- [ ] **API Endpoints**
  - [ ] Test 5-10 random API calls
  - [ ] Check response times
  - [ ] Verify data accuracy
  - [ ] No 500 errors

### ✅ Update External Services

- [ ] **Stripe Webhooks**
  - [ ] Go to: https://dashboard.stripe.com/webhooks
  - [ ] Find your webhook
  - [ ] Update URL to: `https://[your-new-domain]/api/stripe/webhook`
  - [ ] Test webhook with Stripe CLI or test payment
  - [ ] Verify webhook events received

- [ ] **Other Webhooks** (if applicable)
  - [ ] Zapier webhooks
  - [ ] Any other services
  - [ ] Update all URLs to new deployment

- [ ] **Email Service (Resend)**
  - [ ] Send test email
  - [ ] Verify delivery
  - [ ] Check from address correct

- [ ] **Analytics**
  - [ ] Google Analytics tracking
  - [ ] Facebook Pixel firing
  - [ ] Events being recorded

### ✅ Monitor Errors

- [ ] **Sentry Dashboard**
  - [ ] Check for new errors
  - [ ] Should be zero or minimal
  - [ ] Investigate any errors found

- [ ] **Browser Console**
  - [ ] Open DevTools on homepage
  - [ ] Check for console errors
  - [ ] Should be clean

- [ ] **Vercel Logs**
  - [ ] Check deployment logs
  - [ ] Look for warnings
  - [ ] Verify build success

**Day 1-2 Status:** ⬜ Complete / ⬜ Issues Found

**Notes:**

```
[Write any issues or observations here]
```

---

## 📅 DAY 3-4: INTEGRATION TESTING (December 20-21)

### ✅ Payment Flow (If Applicable)

- [ ] **Test Payment**
  - [ ] Use Stripe test card: 4242 4242 4242 4242
  - [ ] Complete full payment flow
  - [ ] Verify payment recorded in Stripe
  - [ ] Check webhook received
  - [ ] Verify user enrolled/updated

- [ ] **Subscription** (if applicable)
  - [ ] Test subscription signup
  - [ ] Verify recurring billing setup
  - [ ] Check subscription status updates

### ✅ Email Flows

- [ ] **Application Submitted**
  - [ ] Submit test application
  - [ ] Verify confirmation email received
  - [ ] Check admin notification sent

- [ ] **Contact Form**
  - [ ] Submit contact form
  - [ ] Verify email received
  - [ ] Check formatting correct

- [ ] **Password Reset**
  - [ ] Request password reset
  - [ ] Verify email received
  - [ ] Test reset link works

### ✅ User Journeys

- [ ] **New Student Journey**
  - [ ] Visit homepage
  - [ ] Browse programs
  - [ ] Click apply
  - [ ] Complete application
  - [ ] Receive confirmation

- [ ] **Returning User Journey**
  - [ ] Login
  - [ ] Access dashboard
  - [ ] View progress
  - [ ] Update profile
  - [ ] Logout

- [ ] **Employer Journey**
  - [ ] Visit /employers
  - [ ] Submit inquiry
  - [ ] Receive response

### ✅ Mobile Testing

- [ ] **iPhone/Safari**
  - [ ] Homepage displays correctly
  - [ ] Navigation works
  - [ ] Forms submit
  - [ ] Videos play

- [ ] **Android/Chrome**
  - [ ] Homepage displays correctly
  - [ ] Navigation works
  - [ ] Forms submit
  - [ ] Videos play

**Day 3-4 Status:** ⬜ Complete / ⬜ Issues Found

**Notes:**

```
[Write any issues or observations here]
```

---

## 📅 DAY 5-6: PERFORMANCE & MONITORING (December 22-23)

### ✅ Performance Metrics

- [ ] **Page Load Times**
  - [ ] Homepage: **\_** seconds (should be < 3s)
  - [ ] Programs page: **\_** seconds
  - [ ] Apply page: **\_** seconds
  - [ ] All acceptable?

- [ ] **Lighthouse Scores**
  - [ ] Run Lighthouse on homepage
  - [ ] Performance: **\_** (should be > 80)
  - [ ] Accessibility: **\_** (should be > 90)
  - [ ] Best Practices: **\_** (should be > 90)
  - [ ] SEO: **\_** (should be > 90)

- [ ] **Core Web Vitals**
  - [ ] Check in Vercel Analytics
  - [ ] LCP: **\_** (should be < 2.5s)
  - [ ] FID: **\_** (should be < 100ms)
  - [ ] CLS: **\_** (should be < 0.1)

### ✅ Analytics Verification

- [ ] **Google Analytics**
  - [ ] Real-time users showing
  - [ ] Page views tracking
  - [ ] Events firing
  - [ ] Conversions tracking

- [ ] **Vercel Analytics**
  - [ ] Traffic data showing
  - [ ] No unusual spikes
  - [ ] Geographic distribution normal

### ✅ Error Monitoring

- [ ] **Sentry (Days 1-6)**
  - [ ] Total errors: **\_**
  - [ ] Critical errors: **\_** (should be 0)
  - [ ] Warnings: **\_**
  - [ ] All acceptable?

- [ ] **Vercel Logs**
  - [ ] Any 500 errors? **\_**
  - [ ] Any 404 patterns? **\_**
  - [ ] All normal?

**Day 5-6 Status:** ⬜ Complete / ⬜ Issues Found

**Notes:**

```
[Write any issues or observations here]
```

---

## 📅 DAY 7: FINAL VERIFICATION (December 24)

### ✅ Week 1 Summary

- [ ] **Total Users This Week:** **\_**
- [ ] **Total Page Views:** **\_**
- [ ] **Total Errors:** **\_** (should be minimal)
- [ ] **User Complaints:** **\_** (should be 0)
- [ ] **Payment Issues:** **\_** (should be 0)
- [ ] **Email Issues:** **\_** (should be 0)

### ✅ Comparison Check

- [ ] **Traffic Similar to Old Account?**
  - [ ] Yes / No
  - [ ] If no, investigate why

- [ ] **Conversion Rates Normal?**
  - [ ] Applications: Similar / Different
  - [ ] Signups: Similar / Different
  - [ ] Payments: Similar / Different

### ✅ Final Tests

- [ ] **Random Page Test**
  - [ ] Pick 10 random pages
  - [ ] All load correctly
  - [ ] No errors

- [ ] **API Health Check**
  - [ ] Test 10 random API endpoints
  - [ ] All respond correctly
  - [ ] Response times acceptable

- [ ] **Database Health**
  - [ ] Run test queries
  - [ ] Check connection pool
  - [ ] Verify no slow queries

**Day 7 Status:** ⬜ Complete / ⬜ Issues Found

**Decision:** ⬜ Safe to Delete / ⬜ Wait Longer

**Notes:**

```
[Write final assessment here]
```

---

## 📅 DAY 8-14: EXTENDED MONITORING (Optional)

If you want to be extra safe, monitor for another week:

### Daily Checks (5 minutes each)

- [ ] **Day 8 (Dec 25):** Check Sentry, Analytics, No issues
- [ ] **Day 9 (Dec 26):** Check Sentry, Analytics, No issues
- [ ] **Day 10 (Dec 27):** Check Sentry, Analytics, No issues
- [ ] **Day 11 (Dec 28):** Check Sentry, Analytics, No issues
- [ ] **Day 12 (Dec 29):** Check Sentry, Analytics, No issues
- [ ] **Day 13 (Dec 30):** Check Sentry, Analytics, No issues
- [ ] **Day 14 (Dec 31):** Check Sentry, Analytics, No issues

**Extended Monitoring Status:** ⬜ Complete / ⬜ Issues Found

---

## 🗑️ DELETION PROCESS (After All Checks Pass)

### Step 1: Remove Domains from Old Account

- [ ] Login to old Vercel account
- [ ] Go to project settings
- [ ] Click "Domains"
- [ ] Remove each domain:
  - [ ] elevateforhumanity.org
  - [ ] www.elevateforhumanity.org
  - [ ] [any other domains]

### Step 2: Verify Domains on New Account

- [ ] Login to new Vercel account
- [ ] Go to project settings → Domains
- [ ] Verify all domains listed
- [ ] Verify all domains have SSL certificates
- [ ] Test each domain loads correctly

### Step 3: Delete Old Project

- [ ] Old Vercel account → Project Settings
- [ ] Scroll to bottom
- [ ] Click "Delete Project"
- [ ] Type project name: `fix2`
- [ ] Click "Delete"
- [ ] Confirm deletion

### Step 4: Cancel Old Account (Optional)

- [ ] Old Vercel account → Account Settings
- [ ] Click "Billing"
- [ ] If paid plan: Click "Cancel Subscription"
- [ ] Confirm cancellation
- [ ] Or just leave inactive (free accounts are fine)

### Step 5: Final Verification

- [ ] Visit your live site
- [ ] Everything still works
- [ ] No errors
- [ ] All good!

**Deletion Date:** ******\_\_\_******

**Deleted By:** ******\_\_\_******

---

## 🚨 ROLLBACK PLAN (If Something Goes Wrong)

If you discover issues after deletion:

### Option 1: Fix in New Account

1. Identify the issue
2. Fix the code/config
3. Redeploy
4. Test

### Option 2: Restore from GitHub

1. Your code is in GitHub (safe)
2. Your database is in Supabase (safe)
3. Reimport to Vercel if needed
4. Add environment variables again

### Emergency Contacts

- **Vercel Support:** support@vercel.com
- **Supabase Support:** support@supabase.io
- **Stripe Support:** support@stripe.com

---

## 📊 FINAL DECISION MATRIX

### ✅ Safe to Delete If:

- All tests passed
- Zero critical errors
- Traffic normal
- Conversions normal
- No user complaints
- 7+ days of monitoring complete

### ⚠️ Wait Longer If:

- Any critical errors found
- Traffic significantly different
- User complaints received
- Webhooks not working
- Payments having issues
- Less than 7 days monitored

### ❌ Do Not Delete If:

- Critical functionality broken
- Data loss occurring
- Users reporting major issues
- Payments failing
- Emails not sending

---

## 📝 NOTES & OBSERVATIONS

### Issues Found:

```
[Document any issues discovered during testing]
```

### Resolutions:

```
[Document how issues were resolved]
```

### Lessons Learned:

```
[Document what you learned from this process]
```

---

## ✅ FINAL SIGN-OFF

**I have completed all checks and verified:**

- [ ] All functionality works correctly
- [ ] No critical errors
- [ ] Traffic and conversions normal
- [ ] External services updated
- [ ] Monitoring shows healthy system
- [ ] 7+ days of successful operation

**Signed:** ******\_\_\_******  
**Date:** ******\_\_\_******  
**Status:** ⬜ SAFE TO DELETE OLD ACCOUNT

---

**Remember:** There's no rush. Old account costs nothing if inactive.  
Better to wait an extra week than delete too soon!

---

_Checklist created: December 18, 2025_  
_New Account: solacehhc317-9558_  
_Project: fix2_
