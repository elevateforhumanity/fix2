# HSI Enrollment System - READY TO USE!

## ✅ YOU HAVE DIRECT HSI ENROLLMENT ACCESS!

**Contact:** Geoff Albrecht (Sales Director, Emergency Care)
- **Email:** galbrecht@hsi.com
- **Phone:** (949) 456-8366
- **Website:** hsi.com

---

## 🎓 HSI ENROLLMENT OPTIONS

### Option 1: Traditional & Blended Courses (In-Person)
**Link:** https://hsi.com/solutions/cpr-aed-first-aid-training/elevate-for-humanity-career-training-institute-nts-class-sign-up

**Details:**
- Up to 12 students per class
- Traditional or blended format
- Payment: Credit terms OR pay-as-you-go via credit card

**Use For:**
- Group training sessions
- In-person CPR/First Aid classes
- Scheduled training events

---

### Option 2: RSV (Remote Skills Verification) - AUTOMATED!

**How It Works:**
1. You enroll student via unique link
2. Student receives ONE email from info@hsi.com
3. Student completes ALL steps in that email:
   - Blended training
   - Pick date/time for skills session
   - Location to ship supplies
   - Launch the session
4. HSI ships supplies to student
5. Student completes training remotely
6. HSI issues certificate

**⚠️ IMPORTANT:** 
- Each link enrollment uses ONE credit
- Students should ONLY use enrollment link ONCE
- After enrollment, students use email from info@hsi.com
- You need to purchase credits upfront

---

## 🔗 YOUR RSV ENROLLMENT LINKS

### 1. CPR/AED (All Ages)
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/906B45CC-211D-48B3-A2FE-71D2C6D464F3

**Use For:**
- Healthcare workers
- Childcare providers
- Teachers
- Anyone needing comprehensive CPR

**Your Price:** $135
**Your Profit:** $50 per student

---

### 2. CPR/AED (Adult Only)
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/8B978D3E-85A4-48E7-AFF2-5F01FFF12F35

**Use For:**
- Office workers
- General workplace safety
- Basic CPR certification

**Your Price:** $119
**Your Profit:** $44 per student

---

### 3. Adult First Aid, CPR/AED (All Ages)
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/D84A8E63-967E-4A63-944A-AA3E33D777A8

**Use For:**
- Healthcare programs (CNA, Medical Assistant)
- Comprehensive emergency training
- Most popular option

**Your Price:** $189
**Your Profit:** $64 per student

---

### 4. Adult First Aid, CPR/AED (Adult Only)
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/A373CD50-3045-49B1-B119-62A1DC5EFF47

**Use For:**
- Workplace safety compliance
- General first aid training

**Your Price:** $189
**Your Profit:** $64 per student

---

## 💰 PRICING & CREDITS

### How Credits Work:
1. **Purchase Credits Upfront**
   - Contact Geoff: galbrecht@hsi.com
   - Buy credits in bulk (10, 25, 50, 100)
   - Credits stored in your "bank"

2. **Use Credits for Enrollment**
   - Each enrollment = 1 credit
   - Credits deducted automatically
   - Track remaining credits

3. **Refill When Low**
   - Monitor credit balance
   - Purchase more as needed
   - Volume discounts available

### Recommended Credit Purchase:
- **Start:** 25 credits ($2,125 wholesale)
- **Scale:** 100 credits ($8,500 wholesale)
- **Your Revenue:** $3,375-$4,750 profit on 25 students

---

## 🎯 INTEGRATION INTO YOUR SYSTEM

### Enrollment Workflow:

```
Student enrolls in YOUR course catalog
         ↓
You collect payment ($119-$189)
         ↓
You enroll student via HSI link
         ↓
Student receives email from info@hsi.com
         ↓
Student completes training remotely
         ↓
HSI issues certificate
         ↓
You track completion in your system
```

### Database Integration:

```sql
-- Add HSI enrollment tracking
ALTER TABLE partner_lms_enrollments 
ADD COLUMN IF NOT EXISTS hsi_enrollment_link TEXT,
ADD COLUMN IF NOT EXISTS hsi_credit_used BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS hsi_student_email TEXT,
ADD COLUMN IF NOT EXISTS hsi_completion_date DATE;

-- Track which RSV link was used
CREATE TABLE IF NOT EXISTS hsi_rsv_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES partner_lms_enrollments(id),
  student_id UUID REFERENCES profiles(id),
  course_type TEXT, -- 'cpr_all_ages', 'cpr_adult', 'first_aid_all', 'first_aid_adult'
  enrollment_link TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  credit_used BOOLEAN DEFAULT true,
  hsi_email_sent BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  certificate_url TEXT
);
```

---

## 🚀 IMMEDIATE IMPLEMENTATION

### Step 1: Purchase Credits (TODAY)
**Email Geoff:** galbrecht@hsi.com

```
Hi Geoff,

Thank you for setting up our enrollment links! We're ready to start enrolling students.

Please set us up with:
- 25 RSV credits to start
- Credit terms (if available) OR we'll pay via credit card

We expect to enroll 50-100 students in the first quarter across:
- Healthcare programs (CNA, Medical Assistant)
- All workforce training programs
- Safety compliance requirements

Can you provide:
1. Credit pricing (wholesale cost per enrollment)
2. Volume discount tiers
3. Payment terms
4. Credit balance tracking method

Thank you!
```

### Step 2: Add to Your Course Catalog (THIS WEEK)

**Create 4 Course Pages:**

1. **CPR/AED Certification (All Ages)** - $135
2. **CPR/AED Certification (Adult Only)** - $119
3. **First Aid + CPR/AED (All Ages)** - $189 ⭐ MOST POPULAR
4. **First Aid + CPR/AED (Adult Only)** - $189

### Step 3: Build Enrollment System (THIS WEEK)

**Admin Dashboard:**
- `/admin/hsi/enroll` - Enroll student in HSI course
- Select course type
- Enter student info
- Click "Enroll" → Opens HSI link
- Admin enters student data in HSI system
- Mark credit as used

**Automated Option (Future):**
- API integration with HSI
- Automatic enrollment via your system
- No manual link clicking needed

---

## 📊 REVENUE PROJECTIONS

### Conservative (25 students/quarter):
- Average price: $150
- Wholesale cost: $85
- Your profit: $65 per student
**Quarterly Revenue:** $1,625
**Annual Revenue:** $6,500

### Moderate (100 students/quarter):
- Average price: $160
- Wholesale cost: $85
- Your profit: $75 per student
**Quarterly Revenue:** $7,500
**Annual Revenue:** $30,000

### Aggressive (250 students/quarter):
- Average price: $170
- Wholesale cost: $85
- Your profit: $85 per student
**Quarterly Revenue:** $21,250
**Annual Revenue:** $85,000

---

## 🎓 WHICH PROGRAMS NEED HSI?

### REQUIRED:
- **CNA Certification** - First Aid + CPR/AED (All Ages)
- **Medical Assistant** - First Aid + CPR/AED (All Ages)
- **Dental Assistant** - CPR/AED (All Ages)
- **Childcare/Education** - First Aid + CPR/AED (All Ages)

### RECOMMENDED:
- **HVAC Technician** - CPR/AED (Adult Only)
- **Construction/Trades** - First Aid + CPR/AED (Adult Only)
- **CDL Truck Driving** - CPR/AED (Adult Only)
- **All Programs** - Workplace safety compliance

### OPTIONAL:
- **Barber/Cosmetology** - CPR/AED (Adult Only)
- **Retail Management** - CPR/AED (Adult Only)
- **Office Administration** - CPR/AED (Adult Only)

---

## ✅ NEXT STEPS

### TODAY:
1. ✅ Email Geoff to purchase 25 credits
2. ✅ Confirm credit terms or payment method
3. ✅ Get wholesale pricing confirmed

### THIS WEEK:
4. Add 4 HSI courses to your catalog
5. Set pricing ($119-$189)
6. Build enrollment workflow
7. Train staff on HSI enrollment process

### NEXT WEEK:
8. Enroll first 5 test students
9. Verify process works smoothly
10. Launch to all students

---

## 📞 SUPPORT

### HSI Contact:
- **Geoff Albrecht**
- **Email:** galbrecht@hsi.com
- **Phone:** (949) 456-8366
- **Website:** hsi.com

### Questions to Ask Geoff:
1. What's the wholesale cost per credit?
2. Volume discount tiers?
3. Credit terms available?
4. How to track credit balance?
5. Refund policy for unused credits?
6. Can we get API access for automation?
7. White-label certificate options?

---

## 🎉 YOU'RE READY!

**You have:**
✅ Direct enrollment links
✅ RSV automated system
✅ Contact at HSI (Geoff)
✅ 4 courses ready to sell
✅ Clear enrollment process

**Next Action:**
📧 Email Geoff TODAY to purchase credits and get pricing!

---

**Last Updated:** November 29, 2024  
**Status:** Ready to Enroll Students  
**Contact:** Geoff Albrecht (galbrecht@hsi.com)  
**Revenue Potential:** $6.5K-$85K/year (CPR/First Aid only)
