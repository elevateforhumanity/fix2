# ✅ CORRECT PRICING - Barber Apprenticeship

## 💰 Final Pricing

### Barber Apprenticeship Program

**Total Cost: $4,890**

**Includes:**
- ✅ Complete Barber Apprenticeship Program (2,000 hours)
- ✅ Milady CIMA access
- ✅ RISE Client Well-Being & Safety certification ($29.95 value) - **INCLUDED**
- ✅ Theory video lessons
- ✅ Practical training tracking
- ✅ Time tracking system
- ✅ Progress monitoring
- ✅ Certificate upon completion

**Payment Options:**
1. **Self-Pay:** $4,890 (Affirm financing available)
   - As low as $407/month (12-month plan)
   - 3, 6, or 12-month payment options
   
2. **Government-Funded:** $0
   - WIOA (Workforce Innovation and Opportunity Act)
   - WRG (Workforce Ready Grant)
   - Other workforce development programs

---

## 🎓 What's Included in $4,890

### 1. Barber Apprenticeship Program
- 2,000 hours of training
- 12-18 months duration
- DOL Registered Apprenticeship
- State board preparation

### 2. Milady CIMA Platform Access
- Complete LMS access
- Video lessons
- Assessments and quizzes
- Automatic time tracking
- Progress monitoring
- Mobile access

### 3. RISE Certification (INCLUDED)
- **Client Well-Being & Safety** ($29.95 value)
  - Human Trafficking Awareness
  - Domestic Abuse Awareness
  - Practical Infection Control
  - 3.5 hours of training
  - Certificate upon completion

### 4. Support & Resources
- AI instructor support 24/7
- Student dashboard access
- Progress tracking
- Certificate downloads
- Technical support

---

## 🔄 Automatic Enrollment Process

### When Student Pays $4,890:

**Step 1: Payment Processing**
- Student completes Stripe/Affirm checkout
- Payment confirmed

**Step 2: Automatic Enrollment (Your System)**
- ✅ Create enrollment record
- ✅ Call Milady API to create student account
- ✅ Auto-enroll in Barber program courses
- ✅ Auto-enroll in RISE Client Well-Being & Safety
- ✅ Mark RISE as paid (included in tuition)

**Step 3: Welcome Email**
- Send email with:
  - Milady CIMA login credentials
  - Link to student dashboard
  - Getting started instructions
  - Support contact info

**Step 4: Student Access**
- Student logs into dashboard
- Clicks "Launch Milady CIMA"
- Starts training immediately
- RISE course already enrolled and accessible

---

## 📋 Stripe Webhook Configuration

### Metadata to Include:

```javascript
{
  programId: 'barber-apprentice',
  programName: 'Barber Apprenticeship',
  amount: 489000, // $4,890 in cents
  includes_rise: true, // RISE course included
  rise_course_id: 'rise-client-wellbeing',
  rise_paid: true // Already paid in tuition
}
```

### Webhook Logic:

```javascript
if (programId === 'barber-apprentice') {
  // 1. Create enrollment
  const enrollment = await createEnrollment(userId, programId);
  
  // 2. Create Milady account
  const miladyStudent = await miladyAPI.createAccount({
    email: email,
    firstName: firstName,
    lastName: lastName,
  });
  
  // 3. Enroll in RISE (included in tuition)
  const riseEnrollment = await miladyAPI.enrollInCourse(
    miladyStudent.student_id,
    'rise-client-wellbeing'
  );
  
  // 4. Store enrollment with payment status
  await supabase.from('partner_lms_enrollments').insert({
    student_id: userId,
    course_id: 'rise-client-wellbeing',
    course_name: 'RISE Client Well-Being & Safety',
    external_student_id: miladyStudent.student_id,
    external_enrollment_id: riseEnrollment.enrollment_id,
    status: 'enrolled',
    payment_status: 'paid', // Included in tuition
    amount_paid: 0, // No separate charge
    included_in_tuition: true,
  });
  
  // 5. Send welcome email
  await sendWelcomeEmail(email, miladyStudent);
}
```

---

## 📧 Welcome Email Template

**Subject:** Welcome to Barber Apprenticeship - Start Your Training

**Body:**
```
Hi [Name],

Congratulations! Your enrollment is complete and paid in full.

🎓 Your Milady CIMA Login:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
URL: https://www.miladytraining.com/users/sign_in
Email: [email]
Temporary Password: [password]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ You're enrolled in:
• Barber Apprenticeship Program (2,000 hours)
• RISE Client Well-Being & Safety (INCLUDED)

🚀 Get Started:
1. Log into your student dashboard: [link]
2. Click "Launch Milady CIMA"
3. Change your temporary password
4. Start your first lesson

📚 What's Next:
• Complete orientation module
• Watch your first video lesson
• Log your first practical service
• Track your progress

💬 Need Help?
Call: 317-314-3757
Email: elevate4humanityedu@gmail.com

Welcome to your new career in barbering!

Elevate For Humanity Team
```

---

## 🎯 Optional Add-On

**RISE Finance Fundamentals** - $99.95 (OPTIONAL)
- Not included in base tuition
- Can be purchased separately
- Recommended for students planning to own a shop
- Topics: P&L, Cash Flow, Sales, Pricing

**If student wants this:**
- Separate checkout page
- Additional $99.95 charge
- Auto-enrolled after payment

---

## 📊 Pricing Comparison

| Item | Included? | Cost |
|------|-----------|------|
| Barber Apprenticeship Program | ✅ | $4,890 |
| Milady CIMA Access | ✅ | Included |
| RISE Client Well-Being & Safety | ✅ | Included |
| Time Tracking System | ✅ | Included |
| Progress Monitoring | ✅ | Included |
| Student Dashboard | ✅ | Included |
| Certificate | ✅ | Included |
| **TOTAL** | | **$4,890** |

**Optional Add-On:**
| Item | Included? | Cost |
|------|-----------|------|
| RISE Finance Fundamentals | ❌ | $99.95 |

---

## ✅ Summary

**One Price: $4,890**
- Everything included
- No hidden fees
- RISE certification included
- Automatic Milady enrollment
- Start training immediately

**Government-Funded: $0**
- WIOA/WRG covers full tuition
- RISE certification included
- Same benefits as self-pay

**Financing Available:**
- Affirm payment plans
- As low as $407/month
- 3, 6, or 12 months
- Instant approval

---

## 🔧 Implementation Checklist

- [ ] Update checkout page to clarify RISE is included
- [ ] Update Stripe webhook to auto-enroll in RISE
- [ ] Create welcome email template
- [ ] Test automatic Milady enrollment
- [ ] Update program page to show "RISE included"
- [ ] Update FAQ to clarify pricing

---

**Bottom Line:** Students pay **$4,890 total** and get everything, including the RISE certification.
