# ✅ Payment Options - Final Setup

## 💰 Pricing Structure

### Barber Apprenticeship Program: $4,890

**What's Included:**
- ✅ Complete 2,000-hour apprenticeship program
- ✅ Milady CIMA platform access
- ✅ FREE RISE certification (with promo code)
- ✅ All training materials
- ✅ Student dashboard access
- ✅ Certificate upon completion

**RISE Course:**
- Regular Price: $29.95
- **Your Students: FREE** (using promo code `efhcti-rise295`)
- Separate enrollment after program payment

---

## 🛒 Payment Options on Program Page

### Option 1: Free Government-Funded Training
**Cost:** $0  
**Button:** "Apply for Free Training"  
**Link:** `/apply`

**Eligibility:**
- WIOA (Workforce Innovation and Opportunity Act)
- WRG (Workforce Ready Grant)
- Other workforce development programs

**Process:**
1. Student applies through your website
2. Admin verifies funding eligibility
3. Student approved and enrolled
4. No payment required

---

### Option 2: Self-Pay with Stripe

**Cost:** $4,890  
**Button:** "Enroll Now - $4,890"  
**Link:** `/checkout/prog-barber-apprentice`

**Two Payment Methods:**

#### A. Pay in Full
- **Amount:** $4,890 (one-time payment)
- **Method:** Credit/Debit card via Stripe
- **Button:** "Pay $4,890 Now"
- **Benefits:**
  - ✅ No interest
  - ✅ Immediate enrollment
  - ✅ One transaction

#### B. Financing with Affirm
- **Amount:** As low as $407/month
- **Plans:** 3, 6, or 12 months
- **Method:** Affirm financing via Stripe
- **Button:** "Choose Payment Plan"
- **Benefits:**
  - ✅ Flexible monthly payments
  - ✅ Instant approval
  - ✅ Start training immediately
  - ⚠️ Subject to credit approval

---

## 🔄 Checkout Flow

### Student Journey:

**Step 1: Choose Payment Method**
```
Checkout Page:
┌─────────────────────────────────────┐
│ Option 1: Free Government-Funded   │
│ [Apply for Free Training]          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Option 2: Self-Pay - $4,890        │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Pay in Full                 │   │
│ │ $4,890 one-time            │   │
│ │ [Pay $4,890 Now]           │   │
│ └─────────────────────────────┘   │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Financing with Affirm       │   │
│ │ $407/month                  │   │
│ │ [Choose Payment Plan]       │   │
│ └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Step 2: Stripe Checkout**
- Student enters payment info
- Stripe processes payment
- Webhook fires on success

**Step 3: Automatic Enrollment**
- Enrollment record created
- Welcome email sent
- Student dashboard access granted

**Step 4: RISE Enrollment (Separate)**
- Email with RISE instructions
- Promo code: `efhcti-rise295`
- Student enrolls (FREE)

---

## 📧 Email Flow After Payment

### Email 1: Welcome & Enrollment Confirmation

**Subject:** Welcome to Barber Apprenticeship - You're Enrolled!

**Body:**
```
Hi [Name],

🎉 Congratulations! Your enrollment is confirmed.

Payment Received: $4,890
Program: Barber Apprenticeship
Start Date: Immediate

📚 Access Your Student Dashboard:
[Login to Dashboard]

Your dashboard includes:
• Course materials
• Progress tracking
• Schedule
• Support resources

🎓 IMPORTANT: Complete Your FREE RISE Certification

As part of your program, you need to complete the Milady RISE certification (normally $29.95, FREE for you).

Instructions:
1. Go to: https://www.miladytraining.com/bundles/client-well-being-safety-certification
2. Create account with your email: [email]
3. At checkout, enter code: efhcti-rise295
4. Complete all 3 courses (FREE)
5. Download certificate

This is REQUIRED for program completion.

Questions? Call 317-314-3757

Welcome to your new career!
Elevate For Humanity Team
```

### Email 2: RISE Reminder (3 days later if not completed)

**Subject:** Reminder: Complete Your FREE RISE Certification

**Body:**
```
Hi [Name],

Quick reminder to complete your FREE Milady RISE certification.

This is a REQUIRED component of your Barber Apprenticeship.

🎓 Get Your FREE Certification:
1. Go to: https://www.miladytraining.com/bundles/client-well-being-safety-certification
2. Use code: efhcti-rise295
3. Complete courses (FREE)

Need help? Call 317-314-3757
```

---

## 🔧 Technical Implementation

### Stripe Checkout Session

**File:** `/app/api/create-checkout-session/route.ts`

**Request Body:**
```javascript
{
  programId: 'barber-apprentice',
  programName: 'Barber Apprenticeship Program',
  amount: 489000, // $4,890 in cents
  paymentType: 'full' | 'financing'
}
```

**Stripe Configuration:**

**For "Pay in Full":**
```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Barber Apprenticeship Program',
        description: 'Complete 2,000-hour program with Milady CIMA access',
      },
      unit_amount: 489000, // $4,890
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${YOUR_DOMAIN}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${YOUR_DOMAIN}/checkout/prog-barber-apprentice`,
  metadata: {
    programId: 'barber-apprentice',
    paymentType: 'full',
  },
});
```

**For "Financing with Affirm":**
```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card', 'affirm'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Barber Apprenticeship Program',
        description: 'Complete 2,000-hour program with Milady CIMA access',
      },
      unit_amount: 489000, // $4,890
    },
    quantity: 1,
  }],
  mode: 'payment',
  payment_method_options: {
    affirm: {
      enabled: true,
    },
  },
  success_url: `${YOUR_DOMAIN}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${YOUR_DOMAIN}/checkout/prog-barber-apprentice`,
  metadata: {
    programId: 'barber-apprentice',
    paymentType: 'financing',
  },
});
```

### Webhook Handler

**File:** `/app/api/stripe/webhook/route.ts`

**On `checkout.session.completed`:**
```javascript
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  
  // 1. Create enrollment
  const enrollment = await createEnrollment({
    studentId: userId,
    programId: 'barber-apprentice',
    paymentAmount: 4890,
    paymentMethod: session.metadata.paymentType,
    stripeSessionId: session.id,
  });
  
  // 2. Send welcome email
  await sendWelcomeEmail({
    email: session.customer_email,
    name: session.customer_details.name,
    enrollmentId: enrollment.id,
  });
  
  // 3. Send RISE instructions
  await sendRISEInstructions({
    email: session.customer_email,
    name: session.customer_details.name,
    promoCode: 'efhcti-rise295',
  });
}
```

---

## 📊 Payment Comparison

| Payment Method | Amount | Processing | Start Date | Benefits |
|----------------|--------|------------|------------|----------|
| **Government-Funded** | $0 | 2-4 weeks | After approval | Free, no debt |
| **Pay in Full** | $4,890 | Instant | Immediate | No interest, one payment |
| **Affirm 3-month** | $1,630/mo | Instant | Immediate | Short term, higher monthly |
| **Affirm 6-month** | $815/mo | Instant | Immediate | Balanced |
| **Affirm 12-month** | $407/mo | Instant | Immediate | Lowest monthly, more interest |

---

## ✅ What's Updated

### Program Page (`/app/programs/barber-apprenticeship/page.tsx`)
- ✅ Updated button text: "Enroll Now - $4,890"
- ✅ Updated description: "financing options available"
- ✅ Removed "Affirm" from button (moved to checkout)

### Checkout Page (`/app/checkout/prog-barber-apprentice/page.tsx`)
- ✅ Added two payment options:
  - Pay in Full ($4,890)
  - Financing with Affirm ($407/mo)
- ✅ Added RISE course note (FREE with promo code)
- ✅ Updated includes list
- ✅ Added payment type parameter to checkout function

### To Be Updated:
- ⏳ `/app/api/create-checkout-session/route.ts` - Add Affirm support
- ⏳ Email templates - Welcome + RISE instructions
- ⏳ Success page - Show next steps

---

## 🎯 Student Experience Summary

**Path 1: Government-Funded**
1. Apply → Wait for approval → Enroll (FREE)
2. Receive RISE instructions
3. Complete RISE (FREE with code)
4. Start training

**Path 2: Pay in Full**
1. Click "Enroll Now" → Choose "Pay in Full"
2. Pay $4,890 → Instant enrollment
3. Receive RISE instructions
4. Complete RISE (FREE with code)
5. Start training

**Path 3: Financing**
1. Click "Enroll Now" → Choose "Financing"
2. Select payment plan (3, 6, or 12 months)
3. Affirm approval → Instant enrollment
4. Receive RISE instructions
5. Complete RISE (FREE with code)
6. Start training

---

## 📞 Support

**Questions about payment:**
- Phone: 317-314-3757
- Email: elevate4humanityedu@gmail.com

**Milady RISE support:**
- Phone: 866-848-5143
- Email: jessica.boyd@milady.com
- Promo Code: efhcti-rise295

---

## 💡 Key Points

1. **One Price:** $4,890 for everything
2. **Two Payment Methods:** Full or Financing
3. **RISE is FREE:** Separate enrollment with promo code
4. **No Hidden Fees:** All-inclusive pricing
5. **Instant Start:** Begin training immediately after payment

**Bottom Line:** Students pay $4,890 (full or financing), then get FREE RISE access with your promo code.
