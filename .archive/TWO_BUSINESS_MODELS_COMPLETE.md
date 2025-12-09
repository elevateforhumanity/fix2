# Partner LMS - Two Business Models ✅

## System Complete

The partner LMS integration now supports **two distinct business models**:

### Model 1: PAID MICRO-CLASSES 💰
**How it works:**
1. Student browses courses on YOUR site
2. Student clicks "Enroll Now - $135"
3. Student pays YOU via Stripe checkout
4. YOU pay the partner wholesale cost
5. Student gets access to partner's course
6. **You keep the markup as profit**

**Example:**
- HSI CPR/AED Course
- Student pays you: **$135**
- You pay HSI: **$85**
- **Your profit: $50** (59% markup)

**Partners using this model:**
- ✅ Certiport (40% markup)
- ✅ HSI (59% markup)
- ✅ Milady RISE (60% markup)
- ✅ CareerSafe (40% markup)
- ✅ National Drug Screening (50% markup)

### Model 2: DIRECT ENROLLMENT (WIOA/Apprenticeship) 🎓
**How it works:**
1. Student browses courses on YOUR site
2. Student clicks "Apply with WIOA" or "Enroll Free"
3. Student goes DIRECTLY to partner's website
4. No payment involved
5. You provide the referral/placement

**Example:**
- JRI Medical Assistant Program
- Student clicks link
- Goes to jrihealthed.com
- Enrolls in WIOA-funded program
- **No payment from student or you**

**Partners using this model:**
- ✅ JRI (WIOA programs)
- ✅ NRF RISE Up (Free retail training)

---

## Database Schema

### Course Fields

```sql
CREATE TABLE partner_courses (
  id UUID PRIMARY KEY,
  course_name TEXT,
  wholesale_cost DECIMAL(10,2),  -- What YOU pay partner
  retail_price DECIMAL(10,2),    -- What STUDENT pays you
  markup_percentage DECIMAL(5,2), -- Your profit margin
  course_url TEXT,                -- Partner's enrollment URL
  enrollment_type TEXT,           -- 'paid', 'direct', 'wioa', 'apprenticeship'
  requires_payment BOOLEAN,       -- true = Stripe checkout, false = direct link
  ...
);
```

### Enrollment Types

| Type | Description | Payment | Your Role |
|------|-------------|---------|-----------|
| `paid` | Micro-class | Student pays you via Stripe | You pay partner, keep markup |
| `direct` | Free course | No payment | Provide link only |
| `wioa` | WIOA-funded | No payment | Referral/placement |
| `apprenticeship` | Apprenticeship | No payment | Referral/placement |

---

## User Experience

### For PAID Courses (Micro-Classes)

**Course Card:**
```
┌─────────────────────────────────┐
│ Microsoft Office Specialist     │
│ Word 2019                       │
│                                 │
│ $164                            │
│ 40 hours                        │
│                                 │
│ [Enroll Now - $164]             │
└─────────────────────────────────┘
```

**Click "Enroll Now"** →
1. Goes to `/courses/partners/[id]/enroll`
2. Shows course details and price
3. "Pay with Stripe" button
4. Stripe checkout
5. Payment success
6. You receive payment
7. You pay partner
8. Student gets course access

### For DIRECT/WIOA Courses

**Course Card:**
```
┌─────────────────────────────────┐
│ Certified Medical Assistant     │
│ (CCMA)                          │
│                                 │
│ FREE with WIOA                  │
│ 120 hours                       │
│                                 │
│ [Apply with WIOA →]             │
└─────────────────────────────────┘
```

**Click "Apply with WIOA"** →
1. Opens partner's website in new tab
2. Student completes enrollment there
3. No payment involved
4. You track the referral

---

## Revenue Model

### Paid Micro-Classes

| Partner | Wholesale | Retail | Markup | Your Profit |
|---------|-----------|--------|--------|-------------|
| Certiport | $117 | $164 | 40% | $47 |
| HSI CPR | $85 | $135 | 59% | $50 |
| Milady RISE | $29.95 | $48 | 60% | $18 |
| CareerSafe OSHA 10 | $25 | $35 | 40% | $10 |
| NDS DOT Collector | $75 | $113 | 50% | $38 |

**Projected Revenue (Paid Courses Only):**
- 100 students/month × $35 avg profit = **$3,500/month**
- 500 students/month × $35 avg profit = **$17,500/month**
- 1,000 students/month × $35 avg profit = **$35,000/month**

### WIOA/Direct Enrollment

**No direct revenue**, but:
- Builds student base
- Increases platform traffic
- Potential for:
  - Placement fees from partners
  - Grant funding
  - Employer partnerships

---

## Files Created

### Database Migrations

**`20241129_partner_courses_two_models.sql`**
- 40+ courses with both business models
- Proper `enrollment_type` and `requires_payment` flags
- Real partner URLs for enrollment

### Frontend Components

**`app/courses/partners/CourseSearch.tsx`** (Updated)
- Shows different buttons based on `requires_payment`
- "Enroll Now - $164" for paid courses
- "Apply with WIOA →" for free courses

**`app/courses/partners/[courseId]/enroll/page.tsx`**
- Handles paid course enrollment
- Shows course details and pricing
- Stripe checkout integration
- Redirects to partner site after payment

---

## Workflow Examples

### Example 1: Student Enrolls in HSI CPR Course

```
1. Student visits: /courses/partners
2. Sees: "Adult CPR/AED - $135"
3. Clicks: "Enroll Now - $135"
4. Goes to: /courses/partners/[id]/enroll
5. Sees: Course details, $135 price
6. Clicks: "Pay with Stripe"
7. Stripe checkout opens
8. Student pays $135
9. Webhook fires
10. Creates enrollment record
11. YOU receive $135
12. YOU pay HSI $85
13. YOU keep $50 profit
14. Student gets email with HSI course access
15. Student completes course on training.hsi.com
```

### Example 2: Student Enrolls in JRI Medical Assistant (WIOA)

```
1. Student visits: /courses/partners
2. Sees: "Certified Medical Assistant - FREE with WIOA"
3. Clicks: "Apply with WIOA →"
4. Opens: jrihealthed.com in new tab
5. Student completes WIOA application
6. No payment involved
7. You track the referral
8. Student enrolls in program
```

---

## Next Steps

### 1. Run Database Migration
```bash
# In Supabase SQL Editor:
# Run: 20241129_partner_courses_two_models.sql
```

### 2. Test Both Models

**Test Paid Course:**
1. Browse to `/courses/partners`
2. Find a Certiport or HSI course
3. Click "Enroll Now"
4. Complete Stripe checkout (use test card)
5. Verify payment received
6. Verify enrollment created

**Test Direct Course:**
1. Browse to `/courses/partners`
2. Find a JRI or NRF course
3. Click "Apply with WIOA"
4. Verify opens partner site in new tab

### 3. Configure Stripe

For paid courses, ensure:
- Stripe keys configured
- Webhook endpoint set up
- Test mode working
- Live mode ready

### 4. Partner Payments

For paid courses, you need to:
- Track what you owe each partner
- Pay partners monthly/quarterly
- Keep records for accounting

**Query to see what you owe:**
```sql
SELECT 
  p.provider_name,
  COUNT(e.id) as enrollments,
  SUM(c.wholesale_cost) as total_owed,
  SUM(c.retail_price) as total_revenue,
  SUM(c.retail_price - c.wholesale_cost) as your_profit
FROM partner_lms_enrollments e
JOIN partner_courses c ON c.id = e.course_id
JOIN partner_lms_providers p ON p.id = c.partner_id
WHERE e.payment_status = 'paid'
  AND c.requires_payment = true
GROUP BY p.provider_name;
```

---

## Summary

✅ **Two business models implemented**
✅ **Database schema supports both**
✅ **Frontend shows correct buttons**
✅ **Stripe integration for paid courses**
✅ **Direct links for WIOA/free courses**
✅ **40+ courses ready to launch**

**Revenue Potential:**
- Paid micro-classes: **$3,500-$35,000/month**
- WIOA placements: **Student pipeline + potential placement fees**

**Next Action:** Run the migration and start enrolling students!
