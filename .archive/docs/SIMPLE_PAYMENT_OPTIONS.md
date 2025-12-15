# ✅ Simple Payment Options - Final

## 💰 Two Options Only

### Option 1: FREE (WIOA/WRG)
**Cost:** $0  
**Button:** "Apply for Free Training"  
**Process:** Application → Approval → Enrollment

### Option 2: Pay in Full
**Cost:** $4,890  
**Button:** "Proceed to Checkout - $4,890"  
**Process:** Payment → Instant Enrollment

---

## 🛒 Checkout Page Structure

```
┌─────────────────────────────────────────────┐
│ Barber Apprenticeship - Choose Your Option │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Option 1: FREE Government-Funded    │   │
│ │                                     │   │
│ │ Cost: $0                            │   │
│ │ • WIOA, WRG, or other funding      │   │
│ │ • Must qualify                      │   │
│ │ • 2-4 week approval process        │   │
│ │                                     │   │
│ │ [Apply for Free Training]          │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Option 2: Pay in Full               │   │
│ │                                     │   │
│ │ Cost: $4,890                        │   │
│ │ • Start immediately                 │   │
│ │ • Payment plans available           │   │
│ │ • Stripe checkout                   │   │
│ │                                     │   │
│ │ [Proceed to Checkout - $4,890]     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ℹ️ FREE RISE Certification included        │
│    (normally $29.95)                        │
└─────────────────────────────────────────────┘
```

---

## 💳 Stripe Checkout

When student clicks "Proceed to Checkout":

**Stripe handles:**
- ✅ Pay in full with credit/debit card
- ✅ Payment plans (Affirm, Klarna, Afterpay)
- ✅ Automatic approval/decline
- ✅ Secure processing

**Student sees at Stripe checkout:**
- Pay $4,890 now (one-time)
- OR choose payment plan (if eligible)
  - Affirm: 3, 6, or 12 months
  - Klarna: 4 payments
  - Afterpay: 4 payments

**You don't need to configure payment plans** - Stripe handles this automatically based on:
- Amount ($4,890)
- Student's location
- Credit eligibility

---

## 🔄 Payment Flow

### Option 1: WIOA/WRG (Free)
```
1. Student clicks "Apply for Free Training"
   ↓
2. Fills out application form
   ↓
3. Admin reviews and verifies funding
   ↓
4. Admin approves application
   ↓
5. Student enrolled (no payment)
   ↓
6. Welcome email sent
   ↓
7. RISE instructions sent (FREE with promo code)
```

### Option 2: Pay in Full
```
1. Student clicks "Proceed to Checkout - $4,890"
   ↓
2. Redirected to Stripe checkout
   ↓
3. Student chooses:
   - Pay $4,890 now
   - OR select payment plan (if available)
   ↓
4. Payment processed
   ↓
5. Stripe webhook fires
   ↓
6. Student enrolled automatically
   ↓
7. Welcome email sent
   ↓
8. RISE instructions sent (FREE with promo code)
```

---

## 📧 Email After Payment

**Subject:** Welcome to Barber Apprenticeship - You're Enrolled!

**Body:**
```
Hi [Name],

🎉 Payment received! You're officially enrolled.

Payment: $4,890
Program: Barber Apprenticeship
Status: Active

📚 Access Your Dashboard:
[Login Here]

🎓 NEXT STEP: Get Your FREE RISE Certification

As part of your program, complete the Milady RISE certification (normally $29.95, FREE for you):

1. Go to: https://www.miladytraining.com/bundles/client-well-being-safety-certification
2. Create account with: [email]
3. At checkout, enter code: efhcti-rise295
4. Complete courses (FREE)
5. Download certificate

This is REQUIRED for program completion.

Questions? Call 317-314-3757

Welcome aboard!
Elevate For Humanity
```

---

## 🎯 What's Included in $4,890

✅ Complete 2,000-hour apprenticeship program  
✅ Milady CIMA platform access  
✅ RISE certification (FREE with promo code)  
✅ All training materials  
✅ Student dashboard  
✅ Progress tracking  
✅ Certificate upon completion  

**No hidden fees. No additional costs.**

---

## 📊 Comparison

| Feature | WIOA/WRG (Free) | Pay in Full |
|---------|-----------------|-------------|
| **Cost** | $0 | $4,890 |
| **Approval Time** | 2-4 weeks | Instant |
| **Start Date** | After approval | Immediate |
| **Payment Plans** | N/A | Available via Stripe |
| **Eligibility** | Must qualify | Anyone |
| **RISE Course** | FREE (promo code) | FREE (promo code) |

---

## 🔧 Technical Setup

### Stripe Checkout Session

**File:** `/app/api/create-checkout-session/route.ts`

**Configuration:**
```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card', 'affirm', 'klarna', 'afterpay_clearpay'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Barber Apprenticeship Program',
        description: 'Complete 2,000-hour program with Milady CIMA access',
      },
      unit_amount: 489000, // $4,890 in cents
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${YOUR_DOMAIN}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${YOUR_DOMAIN}/checkout/prog-barber-apprentice`,
  metadata: {
    programId: 'barber-apprentice',
    programName: 'Barber Apprenticeship Program',
  },
});
```

**Stripe automatically shows payment plans** based on:
- Amount ($4,890 qualifies for Affirm)
- Student location (US)
- Credit check (automatic)

---

## ✅ What's Updated

### Program Page
- ✅ Button: "Enroll Now - $4,890"
- ✅ Text: "financing options available"

### Checkout Page
- ✅ Two clear options: Free or Pay
- ✅ Single "Proceed to Checkout" button
- ✅ Note about payment plans at Stripe
- ✅ RISE course note (FREE with promo code)

### What Stripe Handles
- ✅ Payment processing
- ✅ Payment plan options
- ✅ Credit approval
- ✅ Installment calculations
- ✅ Payment collection

---

## 💡 Key Points

1. **Two Options Only:** Free (WIOA/WRG) or Pay ($4,890)
2. **Stripe Handles Plans:** No need to configure Affirm/Klarna separately
3. **RISE is FREE:** Separate enrollment with promo code `efhcti-rise295`
4. **Instant Enrollment:** After payment, student gets immediate access
5. **No Hidden Fees:** $4,890 includes everything

---

## 📞 Support

**Payment Questions:**
- Phone: 317-314-3757
- Email: elevate4humanityedu@gmail.com

**Milady RISE:**
- Phone: 866-848-5143
- Email: jessica.boyd@milady.com
- Promo Code: efhcti-rise295

---

## 🎯 Summary

**Students have 2 choices:**

1. **Free Training** - Apply through WIOA/WRG
2. **Pay $4,890** - Checkout via Stripe (payment plans available)

**After enrollment (either way):**
- Get FREE RISE certification with promo code
- Access student dashboard
- Start training

**Simple. Clear. No confusion.**
