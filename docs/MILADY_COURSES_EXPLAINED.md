# Milady Courses Explained

## Two Different Milady Integrations

You have **TWO separate Milady programs** with different purposes:

---

## 1. Milady RISE (External - Links to Milady)

**What it is:** Client Well-Being & Safety Certification  
**Where students learn:** External Milady platform  
**How it works:** Students click "Enroll" → Redirected to Milady website

### Student Experience:

```
Your Site (Enrollment Page)
    ↓
Click "Enroll Now"
    ↓
Redirected to: miladytraining.com
    ↓
Complete courses on Milady platform
    ↓
Get Milady certificate
    ↓
(Future) Webhook notifies your system
    ↓
Your system issues EFH certificate too
```

**URL:** `/lms/milady-riseenrollment`  
**Links to:** YES - Opens Milady's external platform  
**Cost:** FREE with promo code `efhcti-rise295`  
**Duration:** 4 hours (3 short courses)  
**Scholarship:** $500 RISE Scholarship available

---

## 2. Milady Barber Apprenticeship (Internal - Your LMS)

**What it is:** 2,000-hour DOL Registered Apprenticeship  
**Where students learn:** YOUR LMS + On-the-job training  
**How it works:** Students learn on your platform, NOT Milady's

### Student Experience:

```
Your Site (Course Page)
    ↓
View curriculum (10 modules, 2,000 hours)
    ↓
Click "Apply Now"
    ↓
Application process on YOUR site
    ↓
Accepted students enroll
    ↓
Learn on YOUR LMS + Work at barbershop
    ↓
Complete 2,000 hours
    ↓
Get Indiana State Barber License
```

**URL:** `/lms/milady-barber-course`  
**Links to:** NO - Stays on your site  
**Cost:** FREE with WIOA funding  
**Duration:** 2,000 hours (12-18 months)  
**Curriculum:** Uses Milady Standard Barbering textbook (you own the content)

---

## Key Differences

| Feature         | RISE (External)    | Barber (Internal)               |
| --------------- | ------------------ | ------------------------------- |
| **Platform**    | Milady's website   | Your LMS                        |
| **Content**     | Milady hosts it    | You host it                     |
| **Enrollment**  | Redirect to Milady | Stay on your site               |
| **Progress**    | Tracked by Milady  | Tracked by your LMS             |
| **Certificate** | Milady issues it   | You issue it                    |
| **Duration**    | 4 hours            | 2,000 hours                     |
| **Format**      | 100% online        | Hybrid (classroom + on-the-job) |
| **Cost**        | FREE (promo code)  | FREE (WIOA funded)              |

---

## Current Implementation Status

### Milady RISE ✅ FUNCTIONAL

- ✅ Enrollment page shows course info
- ✅ "Enroll Now" button records enrollment in your database
- ✅ Redirects to Milady platform with promo code
- ⚠️ Completion tracking via webhook (not yet implemented)
- ⚠️ Automatic certificate issuance (not yet implemented)

### Milady Barber ✅ FUNCTIONAL (Display Only)

- ✅ Course page shows full curriculum
- ✅ 10 modules with lessons and topics
- ✅ "Apply Now" button links to application
- ❌ Actual course content not yet loaded into LMS
- ❌ Progress tracking not yet implemented
- ❌ Lesson pages not yet created

---

## What Happens Now vs. What Could Happen

### Milady RISE (External)

**NOW:**

1. Student visits `/lms/milady-riseenrollment`
2. Sees course information
3. Clicks "Enroll Now"
4. System records enrollment in database
5. Opens Milady website in new tab
6. Student completes courses on Milady platform
7. Student manually tells you they completed it

**FUTURE (with webhook):**

1. Student visits `/lms/milady-riseenrollment`
2. Sees course information
3. Clicks "Enroll Now"
4. System records enrollment in database
5. Opens Milady website in new tab
6. Student completes courses on Milady platform
7. **Milady sends webhook to your system** ← NEW
8. **Your system automatically issues certificate** ← NEW
9. **Certificate appears in student's portal** ← NEW

### Milady Barber (Internal)

**NOW:**

1. Student visits `/lms/milady-barber-course`
2. Sees full curriculum (informational)
3. Clicks "Apply Now"
4. Goes to application page
5. (Rest of enrollment process happens offline)

**FUTURE (with full LMS integration):**

1. Student visits `/lms/milady-barber-course`
2. Sees full curriculum
3. Clicks "Enroll" (if accepted)
4. **Course appears in their student dashboard** ← NEW
5. **Can access lessons, watch videos, take quizzes** ← NEW
6. **Progress tracked automatically** ← NEW
7. **Hours logged for on-the-job training** ← NEW
8. **Certificate issued upon completion** ← NEW

---

## Recommendation

### For Milady RISE (External)

**Keep as-is for now.** It works! Students can enroll and complete the certification.

**Optional enhancement:** Add webhook integration so you know when they complete it.

### For Milady Barber (Internal)

**Two options:**

#### Option 1: Keep as Marketing Page (Current)

- Use current page to showcase curriculum
- Handle enrollment offline
- Track progress manually or in separate system
- **Pros:** Works now, no additional development
- **Cons:** Not integrated with LMS

#### Option 2: Full LMS Integration (Recommended)

- Migrate curriculum data to database
- Create lesson pages with content
- Enable progress tracking
- Track on-the-job hours
- **Pros:** Fully integrated, automated tracking
- **Cons:** Requires content creation (2-3 weeks)

---

## What You Should Do

### Immediate (Now)

1. **Deploy current implementation** - Both pages work as-is
2. **Test Milady RISE enrollment** - Make sure redirect works
3. **Use Barber page as marketing** - Shows curriculum to prospects

### Short-term (1-2 weeks)

1. **Add webhook for RISE** - Auto-track completions
2. **Decide on Barber approach** - Marketing page or full LMS?

### Long-term (1-3 months)

1. **If full LMS:** Migrate Barber curriculum to database
2. **Create lesson content** - Videos, readings, quizzes
3. **Build progress tracking** - Hours, skills, assessments
4. **Integrate with on-the-job training** - Track workplace hours

---

## Quick Answer to Your Question

**"Will Barber Apprenticeship link to Milady?"**

**NO** - The Barber Apprenticeship is designed to run on YOUR LMS, not Milady's platform.

**Why?**

- It's a 2,000-hour program (too long for external platform)
- It's hybrid (classroom + on-the-job training)
- You need to track hours and progress
- You issue the certificate (Indiana State Barber License)
- You use Milady's textbook content, but host it yourself

**Only RISE links to Milady** because:

- It's a short certification (4 hours)
- Milady hosts and manages it
- They issue the certificate
- You just facilitate enrollment

---

## Summary

**Two different programs, two different approaches:**

1. **Milady RISE** = External partner course
   - Links to Milady ✅
   - Short certification
   - They host, you facilitate

2. **Milady Barber** = Internal program using Milady curriculum
   - Stays on your site ✅
   - Long apprenticeship
   - You host, you manage

**Both are functional now for their intended purposes!**

---

## Need to Change This?

If you want the Barber program to link to an external Milady platform (like RISE does), you would need:

1. A Milady Barber LMS subscription
2. API access to their platform
3. Different integration approach

**But that's probably not what you want** because:

- More expensive
- Less control
- Can't customize for your DOL requirements
- Can't track on-the-job hours
- Can't integrate with your other systems

**Current approach is better** for a 2,000-hour apprenticeship program.
