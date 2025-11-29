# Quick Start - Launch in 30 Minutes ⚡

## Step 1: Database (5 min)

Open Supabase SQL Editor and run these files in order:

```sql
-- File 1: Create tables
-- Copy/paste: supabase/migrations/20241129_complete_partner_system.sql
-- Click "Run"

-- File 2: Add courses  
-- Copy/paste: supabase/migrations/20241129_partner_courses_two_models.sql
-- Click "Run"
```

**Verify**: Run `SELECT COUNT(*) FROM partner_courses;` → Should return 40+

---

## Step 2: Stripe (5 min)

Go to [dashboard.stripe.com](https://dashboard.stripe.com):

1. **Settings** → **Payment methods** → Enable:
   - ✅ ACH Direct Debit
   - ✅ Affirm
   - ✅ Afterpay
   - ✅ Klarna

2. **Settings** → **Webhooks** → Add endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Event: `checkout.session.completed`
   - Copy webhook secret

3. Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 3: Deploy Email Function (2 min)

```bash
supabase functions deploy send-partner-enrollment-email
```

---

## Step 4: Test (10 min)

### Test Paid Course:
1. Go to `/courses/partners`
2. Find "Microsoft Office Specialist: Excel 2019 - $164"
3. Click "Enroll Now - $164"
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. Verify success page shows
7. Check `/admin/partner-enrollments` → Should see enrollment

### Test Direct Course:
1. Go to `/courses/partners`
2. Find "Certified Medical Assistant - FREE with WIOA"
3. Click "Apply with WIOA"
4. Verify opens JRI website

---

## Step 5: Go Live! (5 min)

1. Switch Stripe to live mode
2. Update environment variables with live keys
3. Deploy to production
4. Test one real enrollment
5. Start marketing!

---

## What You Have Now

✅ **40+ Courses** ready to sell
✅ **5 Payment Options** (Card, ACH, Affirm, Afterpay, Klarna)
✅ **2 Business Models** (Paid + Direct/WIOA)
✅ **Automated Emails** (Confirmation, Access, Reminders)
✅ **Admin Dashboard** (Track revenue, enrollments, partner payments)
✅ **$3,500-$35,000/month** revenue potential

---

## Revenue Example

**100 students enroll in first month:**
- 50 × Certiport ($164) = $8,200 revenue → $2,350 profit
- 30 × HSI ($135) = $4,050 revenue → $1,500 profit  
- 20 × CareerSafe ($35) = $700 revenue → $200 profit

**Total**: $12,950 revenue → **$4,050 profit** in Month 1

---

## Need Help?

**Documentation:**
- `COMPLETE_SYSTEM_READY.md` - Full system guide
- `TWO_BUSINESS_MODELS_COMPLETE.md` - Business model details
- `BUY_NOW_PAY_LATER_COMPLETE.md` - Payment options guide

**Support**: support@elevateforhumanity.org

---

## You're Ready! 🚀

Everything is built. Just run the migrations and start enrolling students!
