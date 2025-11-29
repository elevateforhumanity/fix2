# HSI RSV Integration - Implementation Guide

## 🎓 HSI Remote Skills Verification (RSV) System

**Contact:** Geoff Albrecht - galbrecht@hsi.com / (949) 456-8366

---

## 🔗 YOUR 4 RSV ENROLLMENT LINKS

### 1. CPR/AED (All Ages) - $135
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/906B45CC-211D-48B3-A2FE-71D2C6D464F3

**Best For:**
- Healthcare workers (CNA, Medical Assistant)
- Childcare providers
- Teachers
- Anyone working with children

**Wholesale Cost:** ~$85
**Your Price:** $135
**Your Profit:** $50

---

### 2. CPR/AED (Adult Only) - $119
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/8B978D3E-85A4-48E7-AFF2-5F01FFF12F35

**Best For:**
- Office workers
- General workplace safety
- Basic CPR requirement

**Wholesale Cost:** ~$75
**Your Price:** $119
**Your Profit:** $44

---

### 3. Adult First Aid, CPR/AED (All Ages) - $189 ⭐ MOST POPULAR
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/D84A8E63-967E-4A63-944A-AA3E33D777A8

**Best For:**
- Healthcare programs (REQUIRED)
- Comprehensive emergency training
- Most complete certification

**Wholesale Cost:** ~$125
**Your Price:** $189
**Your Profit:** $64

---

### 4. Adult First Aid, CPR/AED (Adult Only) - $189
**Link:** https://otis.osmanager4.com/#/nts/openenrollment/A373CD50-3045-49B1-B119-62A1DC5EFF47

**Best For:**
- Workplace safety compliance
- General first aid training

**Wholesale Cost:** ~$125
**Your Price:** $189
**Your Profit:** $64

---

## 🔄 HOW RSV WORKS

### Student Experience:
1. **You enroll student** via unique HSI link
2. **Student receives ONE email** from info@hsi.com
3. **Student completes ALL steps** in that email:
   - Watch blended training videos
   - Pick date/time for skills session
   - Enter location to ship supplies
   - Launch the remote skills session
4. **HSI ships supplies** to student's address
5. **Student completes skills** via video call
6. **HSI issues certificate** automatically

### ⚠️ CRITICAL RULES:
- Each enrollment link use = 1 credit deducted
- Students use link ONLY ONCE for enrollment
- After enrollment, students use email from info@hsi.com
- DO NOT give students the enrollment link
- You must purchase credits upfront

---

## 💻 INTEGRATION INTO YOUR SYSTEM

### Database Schema:

```sql
-- Add HSI RSV tracking table
CREATE TABLE IF NOT EXISTS hsi_rsv_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_type TEXT NOT NULL CHECK (course_type IN (
    'cpr_aed_all_ages',
    'cpr_aed_adult',
    'first_aid_cpr_all_ages',
    'first_aid_cpr_adult'
  )),
  enrollment_link TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_phone TEXT,
  student_address TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  credit_used BOOLEAN DEFAULT true,
  hsi_email_sent BOOLEAN DEFAULT false,
  skills_session_scheduled TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  certificate_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hsi_rsv_student ON hsi_rsv_enrollments(student_id);
CREATE INDEX idx_hsi_rsv_course ON hsi_rsv_enrollments(course_type);
CREATE INDEX idx_hsi_rsv_completed ON hsi_rsv_enrollments(completed_at);

-- Track credit balance
CREATE TABLE IF NOT EXISTS hsi_credit_balance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credits_purchased INTEGER NOT NULL,
  credits_used INTEGER DEFAULT 0,
  credits_remaining INTEGER GENERATED ALWAYS AS (credits_purchased - credits_used) STORED,
  purchase_date TIMESTAMPTZ DEFAULT NOW(),
  purchase_amount DECIMAL(10,2),
  notes TEXT
);

-- Function to use a credit
CREATE OR REPLACE FUNCTION use_hsi_credit()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment credits_used in most recent purchase
  UPDATE hsi_credit_balance
  SET credits_used = credits_used + 1
  WHERE id = (
    SELECT id FROM hsi_credit_balance
    WHERE credits_remaining > 0
    ORDER BY purchase_date DESC
    LIMIT 1
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-deduct credit on enrollment
CREATE TRIGGER trigger_use_hsi_credit
AFTER INSERT ON hsi_rsv_enrollments
FOR EACH ROW
WHEN (NEW.credit_used = true)
EXECUTE FUNCTION use_hsi_credit();
```

---

## 🎯 ADMIN ENROLLMENT WORKFLOW

### Page: `/admin/hsi/enroll`

```typescript
// app/admin/hsi/enroll/page.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const HSI_COURSES = [
  {
    id: 'cpr_aed_all_ages',
    name: 'CPR/AED (All Ages)',
    price: 135,
    link: 'https://otis.osmanager4.com/#/nts/openenrollment/906B45CC-211D-48B3-A2FE-71D2C6D464F3'
  },
  {
    id: 'cpr_aed_adult',
    name: 'CPR/AED (Adult Only)',
    price: 119,
    link: 'https://otis.osmanager4.com/#/nts/openenrollment/8B978D3E-85A4-48E7-AFF2-5F01FFF12F35'
  },
  {
    id: 'first_aid_cpr_all_ages',
    name: 'Adult First Aid, CPR/AED (All Ages)',
    price: 189,
    link: 'https://otis.osmanager4.com/#/nts/openenrollment/D84A8E63-967E-4A63-944A-AA3E33D777A8',
    popular: true
  },
  {
    id: 'first_aid_cpr_adult',
    name: 'Adult First Aid, CPR/AED (Adult Only)',
    price: 189,
    link: 'https://otis.osmanager4.com/#/nts/openenrollment/A373CD50-3045-49B1-B119-62A1DC5EFF47'
  }
];

export default function HSIEnrollPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentId, setStudentId] = useState('');
  const [creditBalance, setCreditBalance] = useState(0);
  const supabase = createClient();

  async function handleEnroll() {
    const course = HSI_COURSES.find(c => c.id === selectedCourse);
    if (!course || !studentId) return;

    // Check credit balance
    const { data: balance } = await supabase
      .from('hsi_credit_balance')
      .select('credits_remaining')
      .order('purchase_date', { ascending: false })
      .limit(1)
      .single();

    if (!balance || balance.credits_remaining < 1) {
      alert('No credits remaining! Purchase more credits from Geoff Albrecht.');
      return;
    }

    // Get student info
    const { data: student } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', studentId)
      .single();

    // Create enrollment record
    const { error } = await supabase
      .from('hsi_rsv_enrollments')
      .insert({
        student_id: studentId,
        course_type: selectedCourse,
        enrollment_link: course.link,
        student_email: student.email,
        student_name: student.full_name,
        student_phone: student.phone,
        student_address: student.address,
        credit_used: true
      });

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    // Open HSI enrollment link in new tab
    window.open(course.link, '_blank');
    
    alert(`Success! 
    
1. Enter student information in the HSI form
2. Student will receive email from info@hsi.com
3. Student completes training via that email
4. Credit deducted: ${balance.credits_remaining - 1} remaining`);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">HSI RSV Enrollment</h1>
      
      {/* Credit Balance */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-blue-600">HSI Credits Remaining</div>
            <div className="text-3xl font-bold text-blue-900">{creditBalance}</div>
          </div>
          <a 
            href="mailto:galbrecht@hsi.com?subject=Purchase HSI Credits"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Purchase More Credits
          </a>
        </div>
      </div>

      {/* Course Selection */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Course</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {HSI_COURSES.map(course => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedCourse === course.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {course.popular && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded mb-2">
                  MOST POPULAR
                </span>
              )}
              <div className="font-semibold">{course.name}</div>
              <div className="text-2xl font-bold text-blue-600 mt-2">${course.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Selection */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Student</h2>
        {/* Add student selector component */}
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        disabled={!selectedCourse || !studentId}
        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enroll Student & Open HSI Form
      </button>

      {/* Instructions */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
          <li>Click "Enroll Student" button above</li>
          <li>HSI enrollment form will open in new tab</li>
          <li>Enter student information in HSI form</li>
          <li>Student receives email from info@hsi.com</li>
          <li>Student completes ALL steps via that email</li>
          <li>DO NOT give student the enrollment link</li>
          <li>1 credit will be deducted automatically</li>
        </ol>
      </div>
    </div>
  );
}
```

---

## 📊 CREDIT MANAGEMENT

### Purchase Credits:

**Email Geoff:**
```
To: galbrecht@hsi.com
Subject: Purchase HSI RSV Credits

Hi Geoff,

We'd like to purchase HSI RSV credits:

Quantity: 25 credits (or 50, 100)
Payment: Credit terms OR credit card

Please provide:
1. Total cost
2. Payment instructions
3. Credit activation timeline

Thank you!
```

### Track Credits:

```sql
-- Add credit purchase
INSERT INTO hsi_credit_balance (credits_purchased, purchase_amount, notes)
VALUES (25, 2125.00, 'Initial purchase from Geoff Albrecht');

-- Check remaining credits
SELECT 
  SUM(credits_remaining) as total_credits,
  SUM(credits_used) as used_credits,
  SUM(credits_purchased) as purchased_credits
FROM hsi_credit_balance;

-- View credit history
SELECT 
  purchase_date,
  credits_purchased,
  credits_used,
  credits_remaining,
  purchase_amount
FROM hsi_credit_balance
ORDER BY purchase_date DESC;
```

---

## 🎓 STUDENT COMMUNICATION

### After Enrollment Email Template:

```
Subject: Your CPR/First Aid Training - Next Steps

Hi [Student Name],

Great news! You've been enrolled in [Course Name] with HSI.

IMPORTANT: Check your email from info@hsi.com

You will receive ONE email from info@hsi.com with ALL the steps:
1. Complete online training videos
2. Schedule your remote skills session
3. Enter shipping address for supplies
4. Complete skills verification via video

DO NOT lose this email - you'll need it to complete your training!

Questions? Contact us or reply to the HSI email.

Best regards,
Elevate for Humanity
```

---

## 📈 REVENUE TRACKING

### Per Course Revenue:

| Course | Your Price | Wholesale | Profit | Margin |
|--------|------------|-----------|--------|--------|
| CPR/AED (All Ages) | $135 | $85 | $50 | 37% |
| CPR/AED (Adult) | $119 | $75 | $44 | 37% |
| First Aid + CPR (All) | $189 | $125 | $64 | 34% |
| First Aid + CPR (Adult) | $189 | $125 | $64 | 34% |

### Projected Revenue:

**25 Students (1 credit pack):**
- Average price: $160
- Total revenue: $4,000
- Total cost: $2,125
- **Your profit: $1,875**

**100 Students (4 credit packs):**
- Average price: $165
- Total revenue: $16,500
- Total cost: $8,500
- **Your profit: $8,000**

---

## ✅ LAUNCH CHECKLIST

- [ ] Email Geoff to purchase 25 credits
- [ ] Run database migration (add HSI tables)
- [ ] Build `/admin/hsi/enroll` page
- [ ] Test enrollment with 1 student
- [ ] Train staff on enrollment process
- [ ] Add 4 courses to student catalog
- [ ] Create student communication templates
- [ ] Launch to all students

---

## 🎉 READY TO ENROLL!

**You have:**
✅ 4 direct enrollment links
✅ Automated RSV system
✅ Credit-based enrollment
✅ Clear workflow
✅ Database schema ready

**Next Action:**
📧 Email Geoff TODAY: galbrecht@hsi.com

---

**Last Updated:** November 29, 2024  
**Contact:** Geoff Albrecht (galbrecht@hsi.com)  
**Revenue Potential:** $6.5K-$85K/year
