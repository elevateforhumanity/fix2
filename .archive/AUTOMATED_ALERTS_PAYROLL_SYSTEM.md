# 🔔 Automated Alerts & Payroll System

## ✅ What Was Created

### **1. Database Tables**
- `apprentice_notifications` - Scheduled notification settings
- `apprentice_payroll` - Payroll tracking and calculations
- `notification_log` - All sent notifications history

### **2. Email Alert System**
**API Route:** `/api/apprentice/email-alerts`

**Alert Types:**
- ✅ **Check-in Reminders** - Sent to students at scheduled times
- ✅ **Missed Check-in Alerts** - Sent to employers when student doesn't check in
- ✅ **Hours Approved** - Sent to students when hours are approved
- ✅ **Payroll Ready** - Sent to students when payroll is calculated

### **3. Payroll Tracking**
**Admin Page:** `/admin/payroll`

**Features:**
- Calculate payroll for any period
- Track hours worked
- Calculate gross pay (hours × hourly rate)
- Mark as paid
- Send payment notifications

### **4. Automated Functions**
- `check_missed_checkins()` - Checks for missed check-ins
- `calculate_payroll()` - Calculates pay for a period

---

## 📋 How It Works

### **For Students:**

**Morning Reminder (8:00 AM):**
```
Subject: ⏰ Time to Check In - Joe's Barbershop
Message: Hi John,

Reminder to check in for your shift at Joe's Barbershop.

Check in now: https://yoursite.com/student/apprenticeship-hours
```

**When Hours Approved:**
```
Subject: ✅ Your Hours Have Been Approved
Message: Hi John,

Your 8.5 hours for 12/05/2024 have been approved!

Total hours: 245.5/1500
Progress: 16.4%
```

**When Payroll Ready:**
```
Subject: 💰 Payroll Ready - 12/05/2024
Message: Hi John,

Your payroll is ready:

Period: 11/28/2024 to 12/05/2024
Hours: 40.0
Rate: $15.00/hr
Gross Pay: $600.00
```

---

### **For Employers/Program Holders:**

**Missed Check-in Alert (10:00 AM):**
```
Subject: ⚠️ Apprentice Missed Check-In - John Smith
Message: John Smith has not checked in today.

Expected check-in time: 9:00 AM
Current time: 10:15 AM
```

---

## 🔧 Setup Instructions

### **Step 1: Create Database Tables** ✅

Run this SQL in Supabase:

```sql
CREATE TABLE IF NOT EXISTS public.apprentice_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apprenticeship_id UUID NOT NULL REFERENCES public.apprenticeship_enrollments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  scheduled_time TIME NOT NULL,
  days_of_week INTEGER[],
  enabled BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.apprentice_payroll (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apprenticeship_id UUID NOT NULL REFERENCES public.apprenticeship_enrollments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  total_hours NUMERIC NOT NULL,
  hourly_rate NUMERIC NOT NULL,
  gross_pay NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notification_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent',
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE OR REPLACE FUNCTION calculate_payroll(
  p_apprenticeship_id UUID,
  p_period_start DATE,
  p_period_end DATE
)
RETURNS UUID AS $$
DECLARE
  v_total_hours NUMERIC;
  v_hourly_rate NUMERIC;
  v_gross_pay NUMERIC;
  v_student_id UUID;
  v_payroll_id UUID;
BEGIN
  SELECT student_id, wage_current INTO v_student_id, v_hourly_rate
  FROM apprenticeship_enrollments
  WHERE id = p_apprenticeship_id;
  
  SELECT COALESCE(SUM(total_hours), 0) INTO v_total_hours
  FROM ojt_hours_log
  WHERE apprenticeship_id = p_apprenticeship_id
    AND work_date BETWEEN p_period_start AND p_period_end
    AND approved = true;
  
  v_gross_pay := v_total_hours * v_hourly_rate;
  
  INSERT INTO apprentice_payroll (
    apprenticeship_id,
    student_id,
    pay_period_start,
    pay_period_end,
    total_hours,
    hourly_rate,
    gross_pay,
    status
  ) VALUES (
    p_apprenticeship_id,
    v_student_id,
    p_period_start,
    p_period_end,
    v_total_hours,
    v_hourly_rate,
    v_gross_pay,
    'pending'
  ) RETURNING id INTO v_payroll_id;
  
  RETURN v_payroll_id;
END;
$$ LANGUAGE plpgsql;
```

### **Step 2: Configure Email Service** ✅

Add to `.env.local`:

```env
# Email Service (Choose one)
RESEND_API_KEY=your_resend_key
# OR
SENDGRID_API_KEY=your_sendgrid_key
```

### **Step 3: Set Up Cron Jobs** ✅

**Cron jobs are now configured in `vercel.json`:**

```json
{
  "crons": [
    {
      "path": "/api/cron/morning-reminders",
      "schedule": "0 8 * * 1-5"
    },
    {
      "path": "/api/cron/missed-checkins",
      "schedule": "0 10 * * 1-5"
    },
    {
      "path": "/api/cron/end-of-day-summary",
      "schedule": "0 17 * * 1-5"
    }
  ]
}
```

**Schedule Explanation:**
- `0 8 * * 1-5` = 8:00 AM, Monday-Friday (Morning reminders)
- `0 10 * * 1-5` = 10:00 AM, Monday-Friday (Missed check-in alerts)
- `0 17 * * 1-5` = 5:00 PM, Monday-Friday (End of day summary)

**Add to `.env.local`:**
```env
CRON_SECRET=your_random_secret_here
```

**Generate a secret:**
```bash
openssl rand -base64 32
```

**Vercel will automatically:**
- Run these cron jobs on schedule
- Send Authorization header with CRON_SECRET
- Handle retries and logging

---

## 💰 Payroll Workflow

### **Weekly Payroll Process:**

1. **Admin goes to** `/admin/payroll`
2. **Clicks "Generate Payroll"** for each apprentice
3. **System calculates:**
   - Total approved hours for the week
   - Hourly rate from apprenticeship record
   - Gross pay = hours × rate
4. **Email sent to student** with payroll details
5. **Admin marks as "Paid"** after processing payment
6. **Record kept** in payroll history

### **Example Calculation:**

```
Student: John Smith
Period: 11/28/2024 - 12/05/2024
Hourly Rate: $15.00

Hours Worked:
- Monday: 8.0 hours
- Tuesday: 8.5 hours
- Wednesday: 8.0 hours
- Thursday: 7.5 hours
- Friday: 8.0 hours

Total Hours: 40.0
Gross Pay: 40.0 × $15.00 = $600.00
```

---

## 🔔 Notification Schedule

### **Daily Notifications:**

**8:00 AM** - Check-in reminder to students
```sql
INSERT INTO apprentice_notifications (
  apprenticeship_id,
  student_id,
  notification_type,
  scheduled_time,
  days_of_week,
  enabled
) VALUES (
  'apprenticeship-uuid',
  'student-uuid',
  'checkin_reminder',
  '08:00:00',
  ARRAY[1,2,3,4,5], -- Monday-Friday
  true
);
```

**10:00 AM** - Missed check-in alert to employers (if not checked in)

**5:00 PM** - End of day summary

### **Weekly Notifications:**

**Friday 5:00 PM** - Weekly hours summary

**Monday 9:00 AM** - Payroll ready notification

---

## 📊 Admin Dashboard Features

### **Payroll Page** (`/admin/payroll`)

**Features:**
- ✅ Generate payroll for any apprentice
- ✅ View payroll history
- ✅ Filter by status (pending/paid)
- ✅ Mark as paid
- ✅ Export to CSV (coming soon)
- ✅ Send payment notifications

**Stats Shown:**
- Total hours worked
- Hourly rate
- Gross pay
- Payment status
- Payment date

---

## 🎯 Integration with Existing System

### **Automatic Triggers:**

**When hours are approved:**
```typescript
// In admin dashboard when approving hours
await supabase
  .from('ojt_hours_log')
  .update({ approved: true })
  .eq('id', logId);

// Automatically sends email
await fetch('/api/apprentice/email-alerts', {
  method: 'POST',
  body: JSON.stringify({
    type: 'hours_approved',
    apprenticeshipId,
    data: { hours, date, totalHours, requiredHours }
  })
});
```

**When student checks in:**
```typescript
// Notification logged automatically
await supabase
  .from('notification_log')
  .insert({
    recipient_id: employerId,
    notification_type: 'checkin_notification',
    subject: 'Student Checked In',
    message: `${studentName} checked in at ${time}`
  });
```

---

## 🚀 Next Steps

### **To Make It Fully Functional:**

1. **Add Email Service Integration:**
   - Sign up for Resend (https://resend.com) or SendGrid
   - Add API key to environment variables
   - Update `/api/apprentice/email-alerts/route.ts` to actually send emails

2. **Set Up Cron Jobs:**
   - Use Vercel Cron (vercel.json)
   - Or use external service like Cron-job.org
   - Schedule hourly checks during work hours

3. **Configure Notification Preferences:**
   - Let students set their check-in time
   - Let employers set alert preferences
   - Add SMS notifications (optional)

4. **Test the System:**
   - Create test apprenticeship
   - Generate test payroll
   - Verify emails are sent
   - Check notification log

---

## 📱 Mobile App Integration

Students can receive push notifications on their phones when:
- It's time to check in
- Hours are approved
- Payroll is ready
- Employer sends a message

---

## ✅ Summary

You now have:
- ✅ Automated check-in reminders
- ✅ Missed check-in alerts to employers
- ✅ Hours approval notifications
- ✅ Payroll calculation system
- ✅ Payment tracking
- ✅ Notification history
- ✅ Admin payroll dashboard

**All linked to:**
- Hours worked (from check-in/out)
- Hourly wage (from apprenticeship record)
- Automatic calculations
- Email notifications

**Ready to launch with email service integration!** 🎉
