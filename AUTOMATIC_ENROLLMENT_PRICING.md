# Automatic Enrollment & Pricing - Complete Guide

## 💰 Pricing Breakdown

### Barber Apprenticeship Program

**Main Program Cost:**
- **Self-Pay (Stripe/Affirm):** $4,890
- **Government-Funded (WIOA/WRG):** $0

**Required Milady RISE Course:**
- **Client Well-Being & Safety:** $29.95
  - Duration: 3.5 hours
  - Topics: Human Trafficking, Domestic Abuse, Infection Control
  - **REQUIRED for all barber students**

**Optional Milady RISE Course:**
- **Finance Fundamentals:** $99.95
  - Duration: 4 hours
  - Topics: P&L, Cash Flow, Sales, Pricing
  - **OPTIONAL but recommended**

### Total Cost Options:

**Option 1: Self-Pay + Required RISE**
- Program: $4,890
- RISE Required: $29.95
- **Total: $4,919.95**

**Option 2: Self-Pay + Both RISE Courses**
- Program: $4,890
- RISE Required: $29.95
- RISE Optional: $99.95
- **Total: $5,019.90**

**Option 3: Government-Funded + Required RISE**
- Program: $0 (WIOA/WRG)
- RISE Required: $29.95
- **Total: $29.95**

**Option 4: Government-Funded + Both RISE**
- Program: $0 (WIOA/WRG)
- RISE Required: $29.95
- RISE Optional: $99.95
- **Total: $129.90**

---

## 🔄 Automatic Enrollment Flow

### Current Stripe Webhook Setup

**File:** `/app/api/stripe/webhook/route.ts`

**What Happens Now:**
1. Student pays $4,890 via Stripe/Affirm
2. Stripe sends webhook to your system
3. Webhook finds application by email + program_id
4. Creates enrollment record
5. Auto-enrolls in partner courses (if configured)

**What's MISSING:**
- ❌ Milady account creation
- ❌ Milady RISE course enrollment
- ❌ RISE course payment handling
- ❌ Welcome email with Milady login

---

## 🎯 Recommended Automatic Enrollment Flow

### Scenario 1: Student Pays $4,890 (Program Only)

**Current Flow:**
```
1. Student clicks "Pay with Affirm - $4,890"
   ↓
2. Stripe checkout session created
   metadata: { programId: 'barber-apprentice' }
   ↓
3. Student completes payment
   ↓
4. Stripe webhook fires
   ↓
5. Your system:
   ✅ Finds application
   ✅ Creates enrollment
   ❌ Does NOT create Milady account
   ❌ Does NOT enroll in RISE
```

**What Should Happen:**
```
1. Student pays $4,890
   ↓
2. Stripe webhook fires
   ↓
3. Your system:
   ✅ Creates enrollment
   ✅ Calls Milady API to create account
   ✅ Enrolls in RISE Client Well-Being ($29.95)
   ✅ Sends email: "Complete your enrollment"
   ↓
4. Email contains:
   - Milady login credentials
   - Link to pay for RISE course ($29.95)
   - Or: RISE course already paid/included
```

### Scenario 2: Student Pays Full Amount (Program + RISE)

**Recommended Flow:**
```
1. Student pays $4,919.95 (program + RISE required)
   ↓
2. Stripe webhook fires
   ↓
3. Your system:
   ✅ Creates enrollment
   ✅ Calls Milady API to create account
   ✅ Enrolls in RISE Client Well-Being
   ✅ Marks RISE as paid
   ✅ Sends welcome email with Milady login
   ↓
4. Student can immediately access Milady CIMA
```

---

## 💳 Payment Options to Implement

### Option A: Separate Payments (Current)

**Checkout Page 1: Program Only**
- Amount: $4,890
- Includes: Barber apprenticeship program
- Does NOT include: RISE courses

**After Payment:**
- Student receives email
- Email says: "Complete your enrollment by purchasing required RISE course ($29.95)"
- Link to RISE course payment page

**Checkout Page 2: RISE Course**
- Amount: $29.95
- Includes: Client Well-Being & Safety
- Triggers Milady enrollment

**Pros:**
- ✅ Lower initial payment
- ✅ Student can start program immediately
- ✅ RISE payment separate

**Cons:**
- ❌ Two-step process
- ❌ Student might forget RISE payment
- ❌ More complex workflow

---

### Option B: Bundle Payment (Recommended)

**Checkout Page: Complete Package**
- Amount: $4,919.95
- Includes: 
  - Barber apprenticeship program ($4,890)
  - RISE Client Well-Being & Safety ($29.95)
- One payment, complete enrollment

**After Payment:**
- Automatic Milady account creation
- Automatic RISE enrollment
- Welcome email with login
- Student ready to start

**Pros:**
- ✅ One payment
- ✅ Complete enrollment
- ✅ No follow-up needed
- ✅ Better student experience

**Cons:**
- ❌ Higher upfront cost
- ❌ Might deter some students

---

### Option C: Flexible Bundle (Best)

**Checkout Page: Choose Your Package**

**Package 1: Program Only**
- $4,890
- Barber program
- "RISE course required separately ($29.95)"

**Package 2: Complete Training** ⭐ RECOMMENDED
- $4,919.95 ($30 savings!)
- Barber program + RISE required
- "Everything you need to start"

**Package 3: Full Package** 🎓 BEST VALUE
- $4,989.95 ($30 savings!)
- Barber program + both RISE courses
- "Complete training + business skills"

**Pros:**
- ✅ Student choice
- ✅ Upsell opportunity
- ✅ Clear pricing
- ✅ Incentive for bundle

**Cons:**
- ❌ More complex checkout page

---

## 🔧 Technical Implementation

### Update Stripe Webhook

**File:** `/app/api/stripe/webhook/route.ts`

**Add After Enrollment Creation:**

```typescript
// After creating enrollment record
if (programId === 'barber-apprentice') {
  
  // Check if RISE course is included in payment
  const includesRISE = session.metadata?.includes_rise === 'true';
  const riseAmount = includesRISE ? 29.95 : 0;
  
  // 1. Create Milady account
  const miladyAPI = new MiladyAPI({
    apiKey: process.env.MILADY_API_KEY,
    apiSecret: process.env.MILADY_API_SECRET,
    baseUrl: process.env.MILADY_API_URL,
  });
  
  const miladyStudent = await miladyAPI.createAccount({
    email: email,
    firstName: session.customer_details?.name?.split(' ')[0] || '',
    lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || '',
    phone: session.customer_details?.phone || '',
  });
  
  // 2. Enroll in RISE course
  const riseEnrollment = await miladyAPI.enrollInCourse(
    miladyStudent.student_id,
    'rise-client-wellbeing'
  );
  
  // 3. Store Milady enrollment in your database
  await supabase.from('partner_lms_enrollments').insert({
    student_id: userId,
    provider_id: miladyProviderId,
    course_id: 'rise-client-wellbeing',
    course_name: 'RISE Client Well-Being & Safety',
    external_student_id: miladyStudent.student_id,
    external_enrollment_id: riseEnrollment.enrollment_id,
    status: 'enrolled',
    payment_status: includesRISE ? 'paid' : 'pending',
    amount_paid: riseAmount,
  });
  
  // 4. Send welcome email
  await sendWelcomeEmail({
    email: email,
    miladyLogin: miladyStudent.login_url,
    miladyPassword: miladyStudent.temporary_password,
    includesRISE: includesRISE,
    dashboardUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard`,
  });
}
```

---

## 📧 Email Templates Needed

### Email 1: Welcome (RISE Included)

**Subject:** Welcome to Barber Apprenticeship - Your Milady Login

**Body:**
```
Hi [Name],

Congratulations! Your enrollment is complete.

Your Milady CIMA Login:
- URL: https://www.miladytraining.com/users/sign_in
- Email: [email]
- Temporary Password: [password]

You're enrolled in:
✅ Barber Apprenticeship Program
✅ RISE Client Well-Being & Safety

Next Steps:
1. Log into your student dashboard: [link]
2. Click "Launch Milady CIMA"
3. Change your temporary password
4. Start your first lesson

Questions? Call us at 317-314-3757

Welcome to your new career!
```

### Email 2: Welcome (RISE Not Included)

**Subject:** Welcome to Barber Apprenticeship - Complete Your Enrollment

**Body:**
```
Hi [Name],

Your program enrollment is confirmed!

⚠️ Action Required:
To complete your enrollment, you need to purchase the required RISE certification:

RISE Client Well-Being & Safety - $29.95
[Pay Now Button]

This certification is REQUIRED for:
- State board compliance
- Program completion
- License eligibility

Once paid, you'll receive your Milady login credentials.

Questions? Call us at 317-314-3757
```

---

## 🛒 Updated Checkout Pages

### Create New Checkout Page: Complete Package

**File:** `/app/checkout/barber-complete/page.tsx`

**Pricing:**
```typescript
const PACKAGES = {
  programOnly: {
    name: 'Program Only',
    price: 4890,
    includes: ['Barber Apprenticeship Program'],
    note: 'RISE course required separately ($29.95)',
  },
  complete: {
    name: 'Complete Training',
    price: 4919.95,
    savings: 30,
    includes: [
      'Barber Apprenticeship Program',
      'RISE Client Well-Being & Safety',
    ],
    badge: 'RECOMMENDED',
  },
  fullPackage: {
    name: 'Full Package',
    price: 4989.95,
    savings: 30,
    includes: [
      'Barber Apprenticeship Program',
      'RISE Client Well-Being & Safety',
      'RISE Finance Fundamentals',
    ],
    badge: 'BEST VALUE',
  },
};
```

---

## 📊 Pricing Summary Table

| Package | Program | RISE Required | RISE Optional | Total | Savings |
|---------|---------|---------------|---------------|-------|---------|
| Program Only | $4,890 | - | - | **$4,890** | - |
| + RISE Required | $4,890 | $29.95 | - | **$4,919.95** | - |
| Complete Training | ✅ | ✅ | - | **$4,919.95** | $0 |
| Full Package | ✅ | ✅ | ✅ | **$4,989.95** | $30 |

**Government-Funded (WIOA/WRG):**
| Package | Program | RISE Required | RISE Optional | Total |
|---------|---------|---------------|---------------|-------|
| Minimum | $0 | $29.95 | - | **$29.95** |
| Complete | $0 | $29.95 | $99.95 | **$129.90** |

---

## ✅ Recommended Implementation

### Phase 1: Update Checkout Page
1. Add "Complete Training" package option
2. Price: $4,919.95 (program + RISE required)
3. Set metadata: `includes_rise: true`

### Phase 2: Update Stripe Webhook
1. Check for `includes_rise` metadata
2. Call Milady API to create account
3. Enroll in RISE course
4. Store enrollment records
5. Send welcome email

### Phase 3: Create RISE Payment Page
For students who paid program only:
1. Create `/checkout/rise-required/page.tsx`
2. Price: $29.95
3. After payment, trigger Milady enrollment

### Phase 4: Email Automation
1. Welcome email with Milady login
2. RISE payment reminder (if not included)
3. Milestone emails

---

## 🎯 Final Recommendation

**Best Approach:**

1. **Default Checkout:** $4,919.95 (Complete Training)
   - Includes program + RISE required
   - Automatic Milady enrollment
   - Best student experience

2. **Alternative:** $4,890 (Program Only)
   - For budget-conscious students
   - Follow-up email for RISE payment
   - Manual Milady enrollment after RISE paid

3. **Upsell:** $4,989.95 (Full Package)
   - Includes both RISE courses
   - Best value messaging
   - Complete training solution

**Pricing Display:**
```
Complete Training Package: $4,919.95
✅ Barber Apprenticeship Program ($4,890)
✅ RISE Client Well-Being & Safety ($29.95)
✅ Immediate Milady CIMA access
✅ Everything you need to start

[Enroll Now - $4,919.95]

Or pay separately:
Program Only: $4,890 (RISE required separately)
```

---

## 📞 Support

**Questions about pricing or enrollment:**
- Phone: 317-314-3757
- Email: elevate4humanityedu@gmail.com

**Milady RISE courses:**
- Phone: 866-848-5143
- Email: jessica.boyd@milady.com
