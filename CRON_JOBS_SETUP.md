# ⏰ Automated Cron Jobs Setup

## ✅ What's Configured

### **1. Morning Check-in Reminders**
**Endpoint:** `/api/cron/morning-reminders`  
**Schedule:** 8:00 AM, Monday-Friday  
**What it does:**
- Finds all active apprenticeships with notification settings
- Sends check-in reminder emails to students
- Updates `last_sent_at` timestamp

### **2. Missed Check-in Alerts**
**Endpoint:** `/api/cron/missed-checkins`  
**Schedule:** 10:00 AM, Monday-Friday  
**What it does:**
- Checks which students haven't checked in today
- Sends alert emails to employers/program holders
- Logs all alerts in notification_log

### **3. End of Day Summary**
**Endpoint:** `/api/cron/end-of-day-summary`  
**Schedule:** 5:00 PM, Monday-Friday  
**What it does:**
- Sends daily summary to students who checked in
- Shows hours worked, check-in/out times
- Displays total progress toward completion

---

## 🔧 Setup Instructions

### **Step 1: Add Environment Variable**

Add to `.env.local` and Vercel:

```env
CRON_SECRET=your_random_secret_here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### **Step 2: Deploy to Vercel**

The cron jobs are configured in `vercel.json`:

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

**Deploy:**
```bash
vercel --prod
```

### **Step 3: Verify in Vercel Dashboard**

1. Go to your project in Vercel
2. Click **Settings** → **Cron Jobs**
3. You should see all 3 cron jobs listed
4. Check execution logs after scheduled times

---

## 📋 Cron Schedule Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0 and 7 are Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

**Examples:**
- `0 8 * * 1-5` = 8:00 AM, Monday-Friday
- `0 */2 * * *` = Every 2 hours
- `30 9 * * *` = 9:30 AM daily
- `0 0 * * 0` = Midnight every Sunday

---

## 🔐 Security

Each cron endpoint checks for authorization:

```typescript
const authHeader = request.headers.get('authorization');
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**Vercel automatically adds this header when calling cron jobs.**

---

## 📊 Monitoring

### **Check Cron Execution:**

1. **Vercel Dashboard:**
   - Project → Deployments → Functions
   - Filter by cron function names
   - View execution logs

2. **Database Logs:**
   ```sql
   SELECT * FROM notification_log
   ORDER BY sent_at DESC
   LIMIT 50;
   ```

3. **Check Last Sent:**
   ```sql
   SELECT 
     an.*,
     p.full_name as student_name
   FROM apprentice_notifications an
   JOIN profiles p ON p.id = an.student_id
   ORDER BY last_sent_at DESC;
   ```

---

## 🧪 Testing Cron Jobs Locally

You can test cron endpoints manually:

```bash
# Morning reminders
curl -X GET http://localhost:3000/api/cron/morning-reminders \
  -H "Authorization: Bearer your_cron_secret"

# Missed check-ins
curl -X GET http://localhost:3000/api/cron/missed-checkins \
  -H "Authorization: Bearer your_cron_secret"

# End of day summary
curl -X GET http://localhost:3000/api/cron/end-of-day-summary \
  -H "Authorization: Bearer your_cron_secret"
```

---

## 📧 Email Templates

### **Morning Reminder:**
```
Subject: ⏰ Time to Check In - Joe's Barbershop

Hi John,

Reminder to check in for your shift at Joe's Barbershop.

Check in now: https://yoursite.com/student/apprenticeship-hours
```

### **Missed Check-in Alert:**
```
Subject: ⚠️ Apprentice Missed Check-In - John Smith

John Smith has not checked in today.

Expected check-in time: 9:00 AM
Current time: 10:15 AM
Date: 12/05/2024
```

### **Daily Summary:**
```
Subject: 📊 Daily Hours Summary - 12/05/2024

Hi John,

Here's your summary for 12/05/2024:

Check-in: 9:00 AM
Check-out: 5:30 PM
Hours Today: 8.5

Total Progress:
245.5/1500 hours (16.4%)

Status: ✅ Approved
```

---

## 🎯 Customization

### **Change Schedule:**

Edit `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/morning-reminders",
      "schedule": "0 7 * * 1-5"  // Changed to 7 AM
    }
  ]
}
```

### **Add New Cron Job:**

1. Create new endpoint: `app/api/cron/your-job/route.ts`
2. Add to `vercel.json`:
   ```json
   {
     "path": "/api/cron/your-job",
     "schedule": "0 12 * * *"
   }
   ```
3. Deploy

### **Disable Notifications:**

```sql
UPDATE apprentice_notifications
SET enabled = false
WHERE student_id = 'student-uuid';
```

---

## 🚨 Troubleshooting

### **Cron not running:**
1. Check CRON_SECRET is set in Vercel
2. Verify cron jobs appear in Vercel dashboard
3. Check function logs for errors

### **Emails not sending:**
1. Verify email service API key is set
2. Check notification_log for error messages
3. Test email endpoint manually

### **Wrong timezone:**
Vercel cron jobs run in UTC. Adjust schedule accordingly:
- 8 AM EST = 13:00 UTC
- 8 AM PST = 16:00 UTC

---

## ✅ Verification Checklist

- [ ] CRON_SECRET added to Vercel environment variables
- [ ] Deployed to production
- [ ] Cron jobs visible in Vercel dashboard
- [ ] Email service configured (Resend/SendGrid)
- [ ] Test notification sent successfully
- [ ] Database tables created (apprentice_notifications, notification_log)
- [ ] Notification settings configured for test apprenticeship
- [ ] Checked logs after first scheduled run

---

## 📚 Related Documentation

- [AUTOMATED_ALERTS_PAYROLL_SYSTEM.md](./AUTOMATED_ALERTS_PAYROLL_SYSTEM.md) - Full system overview
- [Vercel Cron Jobs Docs](https://vercel.com/docs/cron-jobs)
- [Email Alerts API](./app/api/apprentice/email-alerts/route.ts)

---

**Your automated notification system is ready! 🎉**
