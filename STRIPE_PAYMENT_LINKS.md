# Stripe Payment Links - Direct Enrollment

**Date:** 2025-12-10
**Status:** ✅ READY TO SHARE

---

## 🔗 DIRECT PAYMENT LINKS

You can share these links directly with students for instant enrollment and payment.

### Barber Apprenticeship - $4,890
```
https://www.elevateforhumanity.org/checkout/prog-barber-apprentice
```

### Business Apprenticeship
```
https://www.elevateforhumanity.org/checkout/prog-business-apprentice
```

### Esthetics Apprenticeship
```
https://www.elevateforhumanity.org/checkout/prog-esthetics-apprentice
```

### Tax Preparation (VITA)
```
https://www.elevateforhumanity.org/checkout/prog-tax-vita
```

---

## 💳 PAYMENT OPTIONS

Each checkout page includes:
- ✅ **Credit/Debit Card** - Instant payment
- ✅ **Affirm Financing** - Buy now, pay over time
- ✅ **Payment Plans** - 4 monthly installments
- ✅ **Secure Stripe Processing** - PCI compliant

---

## 📱 HOW TO SHARE

### Via Text Message
```
Ready to start your barber career? 
Enroll now with flexible payment options:
https://www.elevateforhumanity.org/checkout/prog-barber-apprentice
```

### Via Email
```
Subject: Enroll in Barber Apprenticeship - Flexible Payment

Hi [Name],

You can enroll in our Barber Apprenticeship program right now!

💰 Total: $4,890
📅 Payment plans available
✅ Start training immediately

Enroll here: https://www.elevateforhumanity.org/checkout/prog-barber-apprentice

Questions? Call us: 317-314-3757

- Elevate for Humanity Team
```

### Via Social Media
```
🎓 Ready to become a licensed barber?

Enroll now with flexible payment options!
💰 $4,890 total
📅 Payment plans available
✅ Start within 2 weeks

👉 https://www.elevateforhumanity.org/checkout/prog-barber-apprentice

#BarberSchool #CareerTraining #Indianapolis
```

---

## 🎯 CREATING MORE PAYMENT LINKS

### Option 1: Use Dynamic Route (Recommended)
For any program, use this format:
```
https://www.elevateforhumanity.org/checkout/[program-slug]
```

Example:
- CNA: `/checkout/cna`
- HVAC: `/checkout/hvac`
- CDL: `/checkout/cdl`

### Option 2: Create Stripe Payment Links (In Stripe Dashboard)

1. Go to: https://dashboard.stripe.com/payment-links
2. Click "New payment link"
3. Set up product:
   - **Name:** Barber Apprenticeship Program
   - **Price:** $4,890
   - **Description:** 1,500 hours of training, state certification prep
4. Configure options:
   - ✅ Enable Affirm
   - ✅ Allow payment plans
   - ✅ Collect customer info
5. Copy the link (format: `https://buy.stripe.com/...`)

### Option 3: Create Custom Checkout Pages

Create new files like:
```
app/checkout/prog-cna/page.tsx
app/checkout/prog-hvac/page.tsx
app/checkout/prog-cdl/page.tsx
```

Copy the structure from `prog-barber-apprentice/page.tsx`

---

## 🔐 SECURITY FEATURES

All payment links include:
- ✅ **SSL Encryption** - Secure HTTPS
- ✅ **PCI Compliance** - Stripe handles card data
- ✅ **Fraud Detection** - Stripe Radar enabled
- ✅ **3D Secure** - Additional verification when needed
- ✅ **Webhook Verification** - Secure payment confirmations

---

## 📊 TRACKING PAYMENTS

### In Stripe Dashboard
1. Go to: https://dashboard.stripe.com/payments
2. Filter by metadata: `programName: "Barber Apprenticeship"`
3. View all enrollments and payments

### In Your Database
Payments are recorded in:
- Supabase `enrollments` table
- Stripe webhook updates enrollment status
- Student gets confirmation email

---

## 💰 PRICING BREAKDOWN

### Barber Apprenticeship - $4,890
- **Full Payment:** $4,890 (one-time)
- **Payment Plan:** $1,222.50/month × 4 months
- **Affirm:** As low as $150/month (varies by credit)

### What's Included:
- 1,500 hours of training
- State certification prep
- All materials and supplies
- Job placement assistance
- Lifetime career support

---

## 🎓 ENROLLMENT FLOW

```
Student clicks payment link
    ↓
Stripe checkout page loads
    ↓
Student enters payment info
    ↓
Payment processed securely
    ↓
Webhook confirms payment
    ↓
Student enrolled in program
    ↓
Confirmation email sent
    ↓
Student can access portal
```

---

## 📞 SUPPORT

If students have payment issues:
- **Phone:** 317-314-3757
- **Email:** info@elevateforhumanity.org
- **Hours:** Mon-Fri 9am-5pm EST

---

## 🚀 QUICK START GUIDE

### To Share a Payment Link Right Now:

1. **Copy this link:**
   ```
   https://www.elevateforhumanity.org/checkout/prog-barber-apprentice
   ```

2. **Send via:**
   - Text message
   - Email
   - Social media DM
   - WhatsApp
   - Facebook Messenger

3. **Student clicks link** → Enters payment info → Enrolled!

---

## 📱 QR CODE (Optional)

You can create a QR code for the payment link:
1. Go to: https://qr-code-generator.com
2. Paste: `https://www.elevateforhumanity.org/checkout/prog-barber-apprentice`
3. Download QR code
4. Print on flyers, business cards, posters

---

## ✅ VERIFICATION

All payment links are:
- ✅ Live and functional
- ✅ Stripe integrated
- ✅ Affirm enabled
- ✅ Mobile responsive
- ✅ Secure (HTTPS)
- ✅ Ready to share

---

## 🎯 BEST PRACTICES

### Do:
- ✅ Share links directly with qualified students
- ✅ Include program details in your message
- ✅ Mention payment plan options
- ✅ Provide contact info for questions

### Don't:
- ❌ Share links publicly without context
- ❌ Promise specific financing terms (Affirm decides)
- ❌ Guarantee approval (credit check required)

---

## 📈 CONVERSION TIPS

To increase enrollment through payment links:

1. **Add urgency:** "Limited spots available"
2. **Highlight value:** "$4,890 for a $50K/year career"
3. **Show flexibility:** "Payment plans as low as $150/month"
4. **Include testimonials:** "Marcus went from unemployed to $50K/year"
5. **Make it easy:** "Enroll in 5 minutes"

---

## 🔗 ALL AVAILABLE LINKS

### Current Programs with Checkout Pages:
1. ✅ Barber Apprenticeship - `/checkout/prog-barber-apprentice`
2. ✅ Business Apprenticeship - `/checkout/prog-business-apprentice`
3. ✅ Esthetics Apprenticeship - `/checkout/prog-esthetics-apprentice`
4. ✅ Tax Preparation - `/checkout/prog-tax-vita`

### Need More?
Create additional checkout pages for:
- CNA Training
- HVAC Technician
- CDL/Truck Driving
- Medical Assistant
- Phlebotomy
- Any other program

---

## ✅ READY TO USE

**YES - You have individual Stripe payment links you can share!**

Start with the barber link:
```
https://www.elevateforhumanity.org/checkout/prog-barber-apprentice
```

Share it via text, email, or social media. Students can enroll and pay in minutes.
