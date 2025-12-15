# Milady RISE Enrollment Setup - Elevate for Humanity

## Overview

We have a Barber Apprenticeship program where students enroll for FREE, and Elevate pays $295 per student for Milady RISE certification access.

---

## Current Setup

### **Partnership Details**

- **Partner:** Milady RISE (Cengage Learning)
- **Contact:** Jessica Boyd - jessica.boyd@cengage.com
- **Phone:** 866-848-5143
- **Promo Code:** `efhcti-rise295` (1,000 redemptions)
- **Cost:** $295 per student (Elevate pays, not student)

### **Integration Type**

- **Manual Login** (NOT API integration)
- Students self-enroll using promo code
- No API credentials configured
- Students create their own Milady accounts

---

## Student Enrollment Flow

### **Step 1: Student Applies**

- URL: `https://www.elevateforhumanity.org/apply?program=barber-apprenticeship`
- Student fills form: Name, Email, Phone
- Clicks "Submit"

### **Step 2: Account Creation (Automatic)**

```javascript
// API: POST /api/enroll/auto
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "555-1234",
  programSlug: "barber-apprenticeship"
}
```

**What Happens:**

- ✅ User account created in Supabase
- ✅ Profile created (role: student)
- ✅ Enrolled in Barber Apprenticeship program
  - Status: `active`
  - Payment status: `waived` (program is FREE)
- ✅ Application record created
- ✅ Password reset email sent to student

### **Step 3: Stripe Checkout (Elevate Pays)**

```javascript
// Stripe Checkout Session Created
{
  mode: 'payment',
  customer_email: 'accounting@elevateforhumanity.org', // Elevate pays
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Milady RISE Fee - John Doe',
        description: 'Student: john@example.com | Program: Barber Apprenticeship'
      },
      unit_amount: 29500 // $295.00
    },
    quantity: 1
  }],
  metadata: {
    userId: '[student-id]',
    enrollmentId: '[enrollment-id]',
    studentEmail: 'john@example.com',
    paymentType: 'milady_rise_elevate_pays',
    paidBy: 'elevate'
  }
}
```

**Student sees checkout page, but Elevate completes the payment**

### **Step 4: After Payment**

- Webhook: `POST /api/stripe/webhook`
- Event: `checkout.session.completed`
- Enrollment remains active
- Student redirected to success page

### **Step 5: Success Page**

URL: `/enroll/success`

**Student sees:**

1. ✅ Enrollment confirmation
2. 📧 Check email for password reset link
3. 🎓 Instructions to enroll in Milady RISE
4. 📱 Mobile app download links

### **Step 6: Student Self-Enrolls in Milady RISE**

**URL:** https://www.miladytraining.com/bundles/client-well-being-safety-certification

**Steps:**

1. Click "Enroll Now"
2. Create Milady account with same email
3. Enter promo code at checkout: `efhcti-rise295`
4. Get FREE access to 3 courses:
   - Domestic Violence Awareness
   - Human Trafficking Awareness
   - Infection Control (2 hours)

### **Step 7: Mobile App Access**

**App:** Thinkific (iOS/Android)

**iOS:** https://apps.apple.com/us/app/thinkific/id1471012001
**Android:** https://play.google.com/store/apps/details?id=com.thinkific.mobile

**Login:**

1. Download Thinkific app
2. Open app → Tap "Login"
3. Enter: `miladytraining.com`
4. Login with Milady credentials

---

## Database Structure

### **Tables Used**

**1. profiles**

```sql
{
  id: uuid,
  email: text,
  full_name: text,
  first_name: text,
  last_name: text,
  phone: text,
  role: 'student',
  external_lms_id: text (null - not using API)
}
```

**2. enrollments**

```sql
{
  id: uuid,
  student_id: uuid,
  program_id: uuid,
  status: 'active',
  payment_status: 'waived',
  enrolled_at: timestamp
}
```

**3. applications**

```sql
{
  id: uuid,
  first_name: text,
  last_name: text,
  email: text,
  phone: text,
  program_id: text,
  status: 'approved'
}
```

**4. programs**

```sql
{
  id: uuid,
  slug: 'barber-apprenticeship',
  name: 'Barber Apprenticeship',
  total_cost: 295.00
}
```

**5. partner_lms_providers**

```sql
{
  id: uuid,
  provider_type: 'milady',
  provider_name: 'Milady RISE',
  login_url: 'https://www.miladytraining.com/users/sign_in',
  support_email: 'jessica.boyd@cengage.com',
  promo_code: 'efhcti-rise295',
  active: true
}
```

**6. partner_lms_courses**

```sql
-- 19 courses total (16 RISE + 3 compliance)
-- 488 total hours
{
  id: uuid,
  provider_id: uuid,
  course_name: text,
  external_course_id: text,
  duration_hours: integer,
  is_required: boolean,
  active: true
}
```

---

## API Endpoints

### **POST /api/enroll/auto**

Creates student account and enrollment, redirects to Stripe

**Request:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "programSlug": "barber-apprenticeship"
}
```

**Response:**

```json
{
  "ok": true,
  "userId": "uuid",
  "enrollmentId": "uuid",
  "checkoutUrl": "https://checkout.stripe.com/...",
  "sessionId": "cs_...",
  "message": "Enrollment successful! Processing Milady RISE payment..."
}
```

### **POST /api/stripe/webhook**

Handles Stripe payment completion

**Event:** `checkout.session.completed`

**Metadata:**

```json
{
  "userId": "uuid",
  "enrollmentId": "uuid",
  "studentEmail": "john@example.com",
  "paymentType": "milady_rise_elevate_pays",
  "paidBy": "elevate"
}
```

---

## Student Dashboard

### **URL:** `/student/dashboard`

**Features:**

- Hero banner with barber training image
- Welcome message
- Enrolled program display
- Milady RISE courses section (if enrolled)
- Mobile app download widget
- Hour tracking
- Service logging

**Milady Access:**

- "Launch Course" button
- Redirects to: `https://www.miladytraining.com/users/sign_in`
- Student logs in with self-created credentials

---

## What's NOT Implemented

### **Milady API Integration**

- ❌ No API credentials configured
- ❌ No automatic account creation in Milady
- ❌ No automatic course enrollment via API
- ❌ No SSO (Single Sign-On)
- ❌ No progress tracking from Milady

**Why:** Using manual login approach instead

### **Environment Variables Missing**

```bash
# These are NOT set (and not needed for manual login)
MILADY_API_KEY=
MILADY_API_SECRET=
MILADY_ORGANIZATION_ID=
```

---

## Payment Tracking

### **Stripe Dashboard**

- Product: "Milady RISE Fee - [Student Name]"
- Amount: $295.00
- Customer: accounting@elevateforhumanity.org
- Metadata includes student info

### **Accounting**

- Each enrollment triggers $295 charge
- Tracked in Stripe for reconciliation
- Student info in metadata for tracking

---

## Student Communication

### **Welcome Email**

**Sent:** After enrollment (password reset email)
**Contains:**

- Password reset link
- Dashboard login URL
- Milady RISE enrollment instructions
- Promo code
- Mobile app links

**Template:** `/lib/email/templates/barber-welcome.ts`

### **Success Page**

**URL:** `/enroll/success`
**Contains:**

- Enrollment confirmation
- Step-by-step instructions
- Milady RISE enrollment link
- Promo code display
- Mobile app download buttons
- Support contact info

---

## Key Points

1. ✅ **Students pay $0** - Enrollment is completely FREE
2. ✅ **Elevate pays $295** per student via Stripe
3. ✅ **Manual login** - No Milady API integration
4. ✅ **Self-enrollment** - Students use promo code
5. ✅ **Immediate access** - Enrollment active right away
6. ✅ **Password reset** - Students set their own password
7. ✅ **Mobile app** - Thinkific app for iOS/Android
8. ✅ **19 courses** - 16 RISE + 3 compliance (488 hours)

---

## Testing

### **Test Enrollment:**

1. Go to: `/apply?program=barber-apprenticeship`
2. Fill form with test data
3. Submit
4. See Stripe checkout (Elevate pays)
5. Complete payment
6. See success page
7. Check email for password reset
8. Login to dashboard
9. Self-enroll in Milady RISE

### **Test Credentials:**

- Dashboard: Use password reset link from email
- Milady: Create account at miladytraining.com
- Mobile App: Login with Milady credentials

---

## Support Contacts

**Elevate for Humanity:**

- Phone: 317-314-3757
- Email: elevate4humanityedu@gmail.com

**Milady RISE:**

- Contact: Jessica Boyd
- Email: jessica.boyd@cengage.com
- Phone: 866-848-5143

---

## Summary for ChatGPT

We have a barber apprenticeship program where:

- Students enroll for FREE (no charge to student)
- Elevate pays $295 per student to Milady via Stripe
- Students self-enroll in Milady RISE using promo code `efhcti-rise295`
- No API integration - using manual login approach
- Students create their own Milady accounts
- Mobile app access via Thinkific app
- 19 courses available (488 hours total)
- Immediate enrollment activation
- Password reset email sent automatically

**Question for ChatGPT:** [Your question here about the Milady enrollment setup]
