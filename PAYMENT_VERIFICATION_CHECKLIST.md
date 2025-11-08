# ✅ Payment System Verification Checklist

## After Deploying with Real Keys

### 1. Verify Stripe Integration

**Check Stripe Dashboard:**

- Go to: [https://dashboard.stripe.com/test/dashboard](https://dashboard.stripe.com/test/dashboard)
- Switch to **Live mode** (toggle in top right)
- Verify your account is activated for live payments

### 2. Test Payment Flow on Live Site

**Visit your deployed site:**

- [https://fix2-git-main-elevateforhumanitys-projects.vercel.app](https://fix2-git-main-elevateforhumanitys-projects.vercel.app)

**Test these flows:**

1. **Course Enrollment**
   - Navigate to a course page
   - Click "Enroll Now"
   - Verify Stripe Checkout opens
   - Check that it shows live mode (not test mode)

2. **Program Purchase**
   - Navigate to a program page
   - Click "Purchase" or "Join Program"
   - Verify Stripe Checkout opens
   - Check payment form loads correctly

3. **Donation Flow** (if applicable)
   - Navigate to donation page
   - Enter amount
   - Verify Stripe Checkout opens

### 3. Verify Key Configuration

**Check browser console:**

1. Open DevTools (F12)
2. Go to Console tab
3. Look for any Stripe-related errors
4. Verify no "test mode" warnings

**Expected behavior:**

- ✅ Stripe Checkout loads without errors
- ✅ Payment form displays correctly
- ✅ No console errors about API keys
- ✅ Live mode indicator visible (if in production)

### 4. Test with Stripe Test Cards (in Test Mode)

If you want to test without real charges, use test mode:

**Test Card Numbers:**

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

**Test Details:**

- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

### 5. Verify Webhook Configuration

**Check Stripe Webhooks:**

1. Go to: [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Verify webhook endpoint is configured
3. Check recent webhook events
4. Ensure no failed deliveries

**Expected webhook URL:**

```
https://fix2-git-main-elevateforhumanitys-projects.vercel.app/api/stripe/webhook
```

### 6. Monitor First Real Transaction

**When ready for first real payment:**

1. Use a real credit card (or ask a test user)
2. Complete a small transaction
3. Check Stripe Dashboard for the payment
4. Verify webhook events fired correctly
5. Check your application database for enrollment/purchase record

## 🚨 Troubleshooting

### If Stripe Checkout doesn't load:

- Check browser console for errors
- Verify `VITE_STRIPE_PUBLISHABLE_KEY` is set in Vercel
- Ensure key starts with `pk_live_`

### If payments fail:

- Check Stripe Dashboard for error details
- Verify `STRIPE_SECRET_KEY` is set in Vercel
- Ensure webhook secret is configured

### If webhooks fail:

- Check `STRIPE_WEBHOOK_SECRET` in Vercel
- Verify webhook URL in Stripe Dashboard
- Check Vercel function logs for errors

## ✅ Success Criteria

- [ ] Stripe Checkout loads on course/program pages
- [ ] Payment form displays correctly
- [ ] No console errors
- [ ] Test transaction completes successfully
- [ ] Webhook events are received
- [ ] User enrollment/purchase is recorded

---

**Status:** Ready for payment verification after deployment
