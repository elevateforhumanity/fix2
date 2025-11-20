# 📧 Contact Management System Setup

## ✅ What's Been Created

### 1. Database Table

- **File**: `supabase/CREATE_MARKETING_CONTACTS.sql`
- **Table**: `marketing_contacts`
- **Features**:
  - Contact information (email, name, phone)
  - Interest tracking
  - Status management (new, contacted, enrolled, not_interested)
  - Message history
  - Timestamps and notes

### 2. Admin Interface

- **URL**: `/admin/contacts`
- **Features**:
  - View all contacts
  - Update contact status
  - Send personalized welcome emails
  - Track last contact date
  - Filter and search contacts

### 3. Email System

- **API**: `/api/marketing/send-welcome`
- **Features**:
  - Personalized welcome messages
  - Program recommendations based on interest
  - Next steps guidance
  - Automatic status updates

### 4. Pre-loaded Contacts

All 17 contacts you provided are ready to be imported!

---

## 🚀 Setup Instructions

### Step 1: Create the Database Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/CREATE_MARKETING_CONTACTS.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

You should see: ✅ Success. No rows returned

### Step 2: Insert Your Contacts

**Option A: Via Script (Recommended)**

```bash
cd /workspaces/fix2
node scripts/insert-contacts.mjs
```

**Option B: Via SQL (if script fails)**
The SQL file already includes INSERT statements for all 17 contacts!

### Step 3: Verify the Setup

Check that contacts were inserted:

```bash
curl -s "https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/marketing_contacts?select=count" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE" \
  -H "Prefer: count=exact"
```

Expected output: `[{"count":17}]`

### Step 4: Access the Admin Interface

1. Visit: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/contacts
2. You should see all 17 contacts listed
3. Click "Send Welcome Email" on any contact to send a personalized message

---

## 📋 Contact List Summary

| Name               | Email                         | Interest          |
| ------------------ | ----------------------------- | ----------------- |
| Jakelia Taylor     | Info@totalsupporthomecare.org | General Interest  |
| Premella Holifield | mella.holifield@icloud.com    | Educator          |
| Angela Hurns       | a_hurns@yahoo.com             | General Programs  |
| Kimberly Harris    | harriskimberly738@gmail.com   | CDL Training      |
| Koman djan         | dkalandry@gmail.com           | General Training  |
| Eve                | eviennejoseph1083@yahoo.com   | HVAC Training     |
| robert robison     | rerobison5@gmail.com          | Business Start-Up |
| Sarra L Foster     | 1sarralee@gmail.com           | Tax Preparation   |
| Jordan McClung     | keiransolace@gmail.com        | Digital Design    |
| Blaise Filsinger   | Blaisefilsinger@icloud.com    | CDL Instructor    |
| Maryanne Lundy     | maryannelundy@gmail.com       | Tax Preparation   |
| Reshown Mcnary     | Reshow@yahoo.com              | General Programs  |
| Sonya Winford      | winfordsonya@yahoo.com        | HHA Training      |
| Jordan McClung     | mcclujor000@warren.k12.in.us  | Animation Program |
| Elijah Bailey      | Baileeli000@gmail.com         | Dental Program    |
| Salena Lithetland  | Litherland.salena@gmail.com   | Cosmetology       |
| Miyahra Sanders    | miyahras@gmail.com            | Youth Cosmetology |

---

## 📧 Welcome Email Template

The system automatically generates personalized welcome emails that include:

1. **Personalized Greeting** - Uses their name
2. **Interest Acknowledgment** - References their specific interest
3. **Program Overview** - Lists relevant programs
4. **Next Steps** - Clear action items
5. **Contact Information** - How to reach you

### Example Email:

```
Subject: Welcome to Elevate for Humanity - HVAC Training

Hi Eve,

Thank you for your interest in HVAC Training at Elevate for Humanity!

We're excited to help you on your career journey. Here's what happens next:

**Our Programs:**
- 100% Funded Training - No cost to you
- Job Placement Support
- Flexible Schedules
- Industry-Recognized Certifications

**Programs Available:**
• HVAC Technician (4-9 months) - Your interest!
• Medical Assistant (4-6 months)
• Barber Apprenticeship (12-18 months)
• CDL Training (4-8 weeks)
• Business Start-Up (32 hours)
• And more!

**Next Steps:**
1. Complete your application at: https://elevateconnectsdirectory.org/apply
2. Schedule a consultation call
3. Get matched with the right program
4. Start your training!

**Questions?**
Reply to this email or call us at (317) 555-0100

We're here to support you every step of the way!

Best regards,
The Elevate for Humanity Team
```

---

## 🎯 Using the System

### Sending Welcome Emails

1. Go to `/admin/contacts`
2. Find the contact you want to reach out to
3. Click **"Send Welcome Email"**
4. Review the pre-filled message (edit if needed)
5. Click **"Send Email"**
6. Status automatically updates to "Contacted"

### Managing Contact Status

- **New** - Just submitted, not yet contacted
- **Contacted** - Welcome email sent
- **Enrolled** - Successfully enrolled in a program
- **Not Interested** - Declined or not responding

### Tracking Follow-ups

- The system tracks `last_contacted_at` timestamp
- You can add notes to each contact
- Filter by status to prioritize outreach

---

## ⚙️ Email Configuration

The system uses the existing email infrastructure:

- **Resend API** (if configured)
- **SendGrid** (fallback)

Make sure you have `RESEND_API_KEY` set in your Vercel environment variables.

---

## 🔒 Security & Privacy

- ✅ Row Level Security (RLS) enabled
- ✅ Only authenticated users can access
- ✅ Service role has full access
- ✅ Email addresses are unique (no duplicates)
- ✅ Unsubscribe tracking included

---

## 📊 Next Steps

1. **Run the SQL** to create the table
2. **Insert contacts** using the script
3. **Visit `/admin/contacts`** to see your contacts
4. **Send welcome emails** to start engaging
5. **Track responses** and update statuses

---

## 🆘 Troubleshooting

### Table doesn't exist

- Make sure you ran the SQL in Supabase SQL Editor
- Check that you're in the correct project

### Contacts not showing

- Verify the table was created: Check Supabase Table Editor
- Run the insert script again
- Check browser console for errors

### Emails not sending

- Verify `RESEND_API_KEY` is set in Vercel
- Check API logs in Vercel dashboard
- Test with a personal email first

---

## 🎉 You're All Set!

Your contact management system is ready to:

- ✅ Store and organize leads
- ✅ Send personalized welcome emails
- ✅ Track engagement and status
- ✅ Manage follow-ups efficiently

**Start reaching out to your 17 contacts today!** 🚀
