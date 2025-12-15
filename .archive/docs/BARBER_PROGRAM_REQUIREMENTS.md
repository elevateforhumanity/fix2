# Barber Apprenticeship Program - Complete Requirements

## 💰 Program Pricing

### Student Payment Options:

**Option 1: Free Government-Funded Training**
- WIOA (Workforce Innovation and Opportunity Act)
- WRG (Workforce Ready Grant)
- Other workforce development grants
- **Cost to Student:** $0

**Option 2: Self-Pay with Financing**
- **Total Cost:** $4,890
- **Payment Method:** Affirm (flexible payment plans)
- **Checkout Link:** `/checkout/prog-barber-apprentice`
- **Button on Program Page:** ✅ Already exists

### Milady RISE Certification Costs:

**Required for Barber Students:**
1. **RISE Client Well-Being & Safety** - **$29.95**
   - Duration: 3.5 hours
   - Topics:
     - Human Trafficking Awareness
     - Domestic Abuse Awareness
     - Practical Infection Control
   - URL: https://www.miladytraining.com/bundles/client-well-being-safety-certification

**Optional (Recommended):**
2. **RISE Finance Fundamentals** - **$99.95**
   - Duration: 4 hours
   - Topics:
     - Profit & Loss 101
     - Understanding Cash Flow
     - Increase Top Line Sales
     - How to Raise Prices
   - URL: https://www.miladytraining.com/bundles/rise-certification-finance-fundamentals

**Total Required Cost for Barber Students:**
- Self-Pay: $4,890 (program) + $29.95 (RISE) = **$4,919.95**
- WIOA/WRG: $0 (program) + $29.95 (RISE) = **$29.95**

---

## 📊 Barber Apprenticeship Requirements

### Time Requirements:
- **Total Hours:** 2,000 hours
- **Duration:** 12-18 months (typically)
- **Format:** On-the-job training + classroom instruction

### Components:

**1. Theory/Classroom (Your LMS)**
- Modules covering barbering fundamentals
- Online video lessons
- Quizzes and assessments
- AI instructor support

**2. Practical Hours (Hands-On)**
- **Haircuts:** 200+ required
- **Fades:** 100+ required
- **Shaves:** 50+ required
- **Beard Trims:** 50+ required
- **Hair Coloring:** 25+ required
- **Chemical Services:** 25+ required

**3. RISE Certifications (Milady)**
- ✅ Client Well-Being & Safety (REQUIRED)
- ⭐ Finance Fundamentals (OPTIONAL)

---

## 🎯 Program Holder Access Requirements

### What Program Holders Need:

**1. View Apprentice Progress**
- Real-time dashboard showing:
  - Total hours logged
  - Hours by category (theory vs practical)
  - Practical skills completed
  - RISE certification status
  - Overall program completion %

**2. Enter/Approve Hours**
- Clock-in/out approval
- Manual hour entry
- Adjust hours if needed
- Add notes/comments

**3. Track Practical Skills**
- View logged services
- Approve/reject service logs
- Add supervisor notes
- Verify skill competency

**4. Monitor RISE Progress**
- See which RISE courses assigned
- Track completion status
- View certificates earned

**5. Generate Reports**
- DOL compliance reports
- State board readiness
- Hour tracking summaries
- Skill completion reports

### Current Status:
- ✅ Program Holder Dashboard exists
- ❌ No apprentice progress tracking
- ❌ No hour entry/approval system
- ❌ No practical skills monitoring
- ❌ No RISE integration visibility

---

## 🏗️ What Needs to Be Built

### Phase 1: Student Experience (Priority 1)
1. ✅ **Student Dashboard** - Updated with Milady integration
2. ⏳ **Milady SSO Launch** - One-click access to RISE courses
3. ⏳ **Clock-In/Out System** - Track apprenticeship hours
4. ⏳ **Practical Skills Log** - Log haircuts, fades, etc.
5. ⏳ **Progress Tracking** - Visual progress indicators

### Phase 2: Program Holder Access (Priority 2)
6. ⏳ **Program Holder Dashboard Enhancement**
   - View all apprentices
   - See real-time progress
   - Access individual apprentice details

7. ⏳ **Apprentice Detail Page**
   - Full progress overview
   - Hour tracking table
   - Practical skills log
   - RISE certification status
   - Notes/comments section

8. ⏳ **Hour Entry/Approval System**
   - Approve clock-in/out entries
   - Manual hour entry
   - Bulk approve
   - Export for payroll

9. ⏳ **Practical Skills Approval**
   - Review logged services
   - Approve/reject with feedback
   - Track competency levels
   - Photo verification

10. ⏳ **Reporting Dashboard**
    - DOL compliance reports
    - State board readiness
    - Export to PDF/Excel
    - Email reports

### Phase 3: Automation (Priority 3)
11. ⏳ **Automatic RISE Enrollment**
    - Auto-enroll in required RISE courses
    - Send welcome email with login
    - Track completion automatically

12. ⏳ **Progress Sync**
    - Daily sync from Milady
    - Update completion status
    - Trigger notifications

13. ⏳ **Email Notifications**
    - Application received
    - Enrollment complete
    - RISE course assigned
    - Hour milestones (500, 1000, 1500, 2000)
    - Skills milestones
    - Certificate earned

---

## 📋 Database Tables Needed

### Already Exist:
- ✅ `enrollments` - Program enrollments
- ✅ `partner_lms_enrollments` - Milady RISE enrollments
- ✅ `partner_lms_courses` - RISE course catalog
- ✅ `programs` - Program definitions

### Need to Create:
- ⏳ `time_tracking` - Clock-in/out entries
- ⏳ `practical_skills_log` - Service tracking
- ⏳ `skill_requirements` - Required skills by program
- ⏳ `apprentice_notes` - Program holder notes
- ⏳ `hour_approvals` - Approval workflow

---

## 🔗 Integration Points

### Milady RISE:
- **API:** `lib/partners/milady.ts` ✅ Already built
- **SSO:** Generate launch URL ✅ Code exists
- **Progress Sync:** Need to implement ⏳
- **Certificate Fetch:** Need to implement ⏳

### Student Dashboard:
- **Location:** `/app/student/dashboard/page.tsx` ✅ Updated
- **Shows:** Enrollments, RISE courses, progress
- **Missing:** Clock-in, skills log, detailed progress

### Program Holder Dashboard:
- **Location:** `/app/program-holder/dashboard/page.tsx` ✅ Exists
- **Shows:** Basic apprentice list
- **Missing:** Progress tracking, hour approval, skills monitoring

---

## 🎯 Next Steps (In Order)

### Step 1: Create Database Tables
```sql
-- time_tracking table
-- practical_skills_log table
-- skill_requirements table
-- apprentice_notes table
```

### Step 2: Build Student Features
- Clock-in/out page
- Practical skills log page
- Progress tracking components

### Step 3: Build Program Holder Features
- Apprentice detail page
- Hour approval interface
- Skills approval interface
- Reporting dashboard

### Step 4: Integrate Milady
- SSO launch functionality
- Progress sync cron job
- Certificate fetching
- Auto-enrollment on program enrollment

### Step 5: Email Automation
- Application confirmation
- Enrollment welcome
- RISE course assignment
- Progress milestones
- Certificate earned

---

## 📞 Support Information

**Milady Support:**
- Phone: 866-848-5143
- Hours: Mon-Fri, 8am-6pm EST
- Email: jessica.boyd@milady.com
- Support: https://www.milady.com/support

**Promo Code:** efhcti-rise295

**Platform:** Thinkific

---

## ✅ Current Status Summary

**Working:**
- ✅ Program page with financing link
- ✅ Checkout page for $4,890 payment
- ✅ Milady API integration code
- ✅ RISE courses in database
- ✅ Basic student dashboard
- ✅ Basic program holder dashboard

**Missing:**
- ❌ Time tracking system
- ❌ Practical skills logging
- ❌ Program holder progress monitoring
- ❌ Milady SSO launch
- ❌ Progress sync from Milady
- ❌ Email automation
- ❌ Reporting system

**Priority:** Build time tracking and skills logging first, then program holder monitoring.
