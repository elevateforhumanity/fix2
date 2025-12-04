# Stripe Auto-Enrollment Setup Checklist

## ✅ Quick Setup Guide (30 minutes)

Follow these steps to activate automatic enrollment when students pay via Stripe.

---

## 📋 Prerequisites

- [ ] Stripe account created (https://dashboard.stripe.com)
- [ ] Vercel project deployed (fix2-gpql)
- [ ] Supabase database configured

---

## Step 1: Configure Environment Variables (5 minutes)

### **In Vercel Dashboard:**

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

2. Add these 3 variables:

```
STRIPE_SECRET_KEY = sk_live_... (from Stripe Dashboard → API Keys)
STRIPE_PUBLIC_KEY = pk_live_... (from Stripe Dashboard → API Keys)
STRIPE_WEBHOOK_SECRET = whsec_... (will get this in Step 3)
```

3. Set for: **Production, Preview, Development**

4. Click **Save** for each

5. **Redeploy** project to apply changes

### **Get Stripe Keys:**

1. Go to: https://dashboard.stripe.com/apikeys
2. Copy **Publishable key** (starts with `pk_live_`)
3. Click **Reveal test key** → Copy **Secret key** (starts with `sk_live_`)
4. Paste into Vercel environment variables

---

## Step 2: Create Payment Links (15 minutes)

### **For Each Program:**

1. Go to: https://dashboard.stripe.com/payment-links
2. Click **+ New**
3. Fill in details:
   - **Product name:** (e.g., "CNA Training Program")
   - **Price:** (e.g., $1,500)
   - **Description:** Brief program description
4. **CRITICAL:** Scroll to **Metadata** section
5. Add metadata:
   - Key: `programId`
   - Value: (see table below)
6. Click **Create link**
7. Copy the payment link URL

### **Program Metadata Values:**

| Program Name | programId | Price |
|-------------|-----------|-------|
| CNA Training | `prog-cna` | $1,500 |
| Barber Apprenticeship | `prog-barber` | $2,500 |
| Tax Preparation (VITA) | `prog-tax-vita` | $1,200 |
| HVAC Technician | `prog-hvac` | $3,500 |
| CDL Training | `prog-cdl` | $4,000 |
| Business Apprenticeship | `prog-business-apprentice` | $1,800 |
| Esthetics Apprenticeship | `prog-esthetics-apprentice` | $2,200 |

### **For HSI Partner Courses:**

Create payment links with **TWO** metadata fields:

| Course Name | courseId | partnerId | Price |
|------------|----------|-----------|-------|
| CPR/AED (All Ages) | `hsi-cpr-aed-all-ages` | `partner-hsi` | $135 |
| CPR/AED (Adult) | `hsi-cpr-aed-adult` | `partner-hsi` | $119 |
| First Aid + CPR (All Ages) | `hsi-first-aid-cpr-all-ages` | `partner-hsi` | $189 |
| First Aid + CPR (Adult) | `hsi-first-aid-cpr-adult` | `partner-hsi` | $189 |

**Metadata for HSI courses:**
- Key 1: `courseId` → Value: (from table)
- Key 2: `partnerId` → Value: `partner-hsi`

---

## Step 3: Configure Webhook (5 minutes)

### **Create Webhook Endpoint:**

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **+ Add endpoint**
3. Enter **Endpoint URL:**
   ```
   https://fix2-gpql-git-main-elevate-48e460c9.vercel.app/api/stripe/webhook
   ```
4. Click **Select events**
5. Search for and select:
   - ✓ `checkout.session.completed`
6. Click **Add events**
7. Click **Add endpoint**

### **Get Webhook Secret:**

1. Click on the webhook you just created
2. Click **Reveal** under **Signing secret**
3. Copy the secret (starts with `whsec_`)
4. Go back to Vercel environment variables
5. Add:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_...
   ```
6. **Redeploy** project

---

## Step 4: Test the System (5 minutes)

### **Test Payment:**

1. Use a test payment link
2. Use test card: `4242 4242 4242 4242`
3. Expiry: Any future date
4. CVC: Any 3 digits
5. Complete checkout

### **Verify Webhook:**

1. Go to: https://dashboard.stripe.com/webhooks
2. Click on your webhook
3. Check **Recent events** tab
4. Should see `checkout.session.completed` event
5. Status should be **Succeeded** (green checkmark)

### **Verify Enrollment:**

1. Go to Supabase dashboard
2. Open **Table Editor**
3. Check `enrollments` table
4. Should see new enrollment record with:
   - Student email
   - Program ID
   - Stripe session ID
   - Status: "active"

### **Verify Course Assignment:**

1. In Supabase, check `student_courses` table
2. Should see course assigned to student email
3. Student can now log in and access course

---

## Step 5: Go Live (Optional)

### **Switch to Live Mode:**

If you've been testing with test keys:

1. Go to Stripe Dashboard
2. Toggle from **Test mode** to **Live mode** (top right)
3. Get live API keys from: https://dashboard.stripe.com/apikeys
4. Update Vercel environment variables with live keys:
   - `STRIPE_SECRET_KEY = sk_live_...`
   - `STRIPE_PUBLIC_KEY = pk_live_...`
5. Update webhook endpoint to use live mode
6. Get new webhook secret and update in Vercel
7. Redeploy project

---

## 🎯 What Happens Automatically

Once configured, when a student pays:

1. ✅ **Enrollment record created** in database
2. ✅ **Courses assigned** to student automatically
3. ✅ **Application marked as paid** (if exists)
4. ✅ **Partner enrollment processed** (for HSI courses)
5. ✅ **Welcome email sent** to student
6. ✅ **Student can access courses** immediately

**Zero manual work required!**

---

## 🔍 Troubleshooting

### **Webhook not firing:**
- Check webhook URL is correct
- Verify webhook secret in environment variables
- Check Stripe webhook logs for errors
- Ensure project is redeployed after adding env vars

### **Enrollment not created:**
- Check webhook logs in Stripe Dashboard
- Verify metadata is set on payment link
- Check Vercel function logs
- Ensure `programId` matches exactly

### **Courses not assigned:**
- Check `lms-data/enrollmentMappings.ts` has program mapping
- Verify course slugs are correct
- Check `student_courses` table in Supabase

### **Partner enrollment fails:**
- Check partner credentials in environment variables
- Verify `partnerId` and `courseId` metadata
- Check `partner_lms_enrollment_failures` table for errors

---

## 📞 Support Resources

### **Stripe Documentation:**
- Payment Links: https://stripe.com/docs/payment-links
- Webhooks: https://stripe.com/docs/webhooks
- Metadata: https://stripe.com/docs/api/metadata

### **Your Documentation:**
- `STRIPE_AUTO_ENROLLMENT_STATUS.md` - Complete system overview
- `STRIPE_HSI_AUTO_ENROLLMENT.md` - HSI-specific setup
- `app/api/stripe/webhook/route.ts` - Webhook handler code

### **Testing Tools:**
- Stripe CLI: https://stripe.com/docs/stripe-cli
- Test cards: https://stripe.com/docs/testing

---

## ✅ Completion Checklist

- [ ] Stripe API keys added to Vercel
- [ ] Payment links created for all programs
- [ ] Metadata added to all payment links
- [ ] Webhook endpoint configured
- [ ] Webhook secret added to Vercel
- [ ] Project redeployed
- [ ] Test payment completed successfully
- [ ] Webhook event shows "Succeeded"
- [ ] Enrollment record created in database
- [ ] Courses assigned to student
- [ ] Student can access courses

---

## 🎉 You're Done!

Your Stripe auto-enrollment system is now live and fully automated.

**Time to complete:** 30 minutes  
**Manual work per enrollment:** 0 minutes  
**System handles:** Unlimited enrollments automatically  

---

## 🚀 Next Steps

1. Add payment links to your website
2. Test with real students
3. Monitor webhook logs
4. Check enrollment reports in Supabase
5. Celebrate automated enrollments! 🎊

---

**Questions?** Check the documentation files or Stripe Dashboard logs.
