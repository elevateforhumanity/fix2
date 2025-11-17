# Student Journey Email Templates

### For Course Orchestrator System

---

## 1. Welcome Email - Barber Apprenticeship (Milady Partner)

**Template ID:** `email_barber_welcome`

**Subject:** Welcome to the Elevate Barber Apprenticeship Pathway ✂️🔥

**Body:**

Hi {{student_name}},

Welcome to Elevate for Humanity! You are officially enrolled into the Barber Apprenticeship Pathway, and we're excited to guide you from Day 1 all the way to your state barber license.

This pathway combines:

- Milady's Barbering Curriculum (required for state licensing)
- Elevate Live Support & Q&A Sessions
- Elevate Check-Ins, Quizzes, & Workforce Requirements
- Apprenticeship Participation & Workforce Documentation

---

⭐ **What You Will Earn**

- **Industry Credential:** Milady + State Exam → Barber License
- **Elevate Certificate of Completion:** After finishing all pathway requirements

---

⭐ **Your First Steps (Do These Today)**

1. **Log Into Your Elevate Dashboard**
   → {{dashboard_url}}

2. **Click "Start Pathway"**
   - Watch the Welcome Video
   - Complete the Orientation Quiz
   - Upload your required intake documents

3. **Launch the Milady Barbering Core Theory modules**
   - You'll see a button inside your dashboard that takes you straight into the Milady system

4. **Add our Weekly Barber Q&A Session to your calendar**
   - We hold them every Wednesday at 6 PM
   - Link is inside your Live Session block

---

⭐ **How Completion Works**

- You will complete Milady's official barbering content
- Attend your live support sessions
- Pass Elevate's knowledge check quizzes
- Upload proof of your Milady completion
- After that → We issue your Elevate Certificate of Completion
- Then you schedule your state board exam

You're not alone — we support you every single step.

Welcome to Elevate. Let's get started.

– Elevate Student Support  
support@elevateforhumanity.org

---

## 2. Welcome Email - CNA Career Pathway (Choice Medical Partner)

**Template ID:** `email_cna_welcome`

**Subject:** Welcome to Your CNA Pathway! Let's Get You Certified 👩‍⚕️🔥

**Body:**

Hi {{student_name}},

Welcome to the CNA Career Pathway with Elevate for Humanity!
You're now starting a flexible, partner-powered training experience designed to help you earn your CNA credential and launch your healthcare career quickly.

This pathway includes:

- Choice Medical Institute CNA Theory + Clinicals
- Elevate Live CNA Support Sessions
- Elevate Quizzes, Reminders, & Documentation
- Workforce Agency Approvals (WRG / WorkOne / EmployIndy)

---

⭐ **Start With These Steps**

1. Log into your Elevate dashboard → {{dashboard_url}}
2. Watch the Welcome CNA Orientation Video
3. Complete the orientation quiz
4. Upload your ID & intake documents
5. Click the Choice Medical CNA Theory Module and begin

---

⭐ **What You Will Earn**

- **Industry Credential:** CNA Certification (via State Exam)
- **Elevate Certificate of Completion:** After finishing all pathway requirements

You're now officially on the path to becoming a Certified Nursing Assistant, and we are honored to support you.

– Elevate Student Support  
support@elevateforhumanity.org

---

## 3. Inactive Nudge Email (Universal)

**Template IDs:** `email_barber_inactive_nudge`, `email_cna_inactive_nudge`

**Subject:** We Miss You! Let's Keep Your {{program_name}} Momentum Going

**Body:**

Hi {{student_name}},

We noticed you haven't logged into your {{program_name}} pathway in a few days.

Life gets busy — we get it. But your future is waiting, and we're here to help you get back on track.

**Quick Reminder:**

- Your next step: {{next_block_title}}
- Time to complete: {{expected_hours}} hours
- Live session coming up: {{next_live_session_date}}

**Need Help?**
Reply to this email or call us at (317) 314-3757.

Let's finish what you started. You've got this.

– Elevate Student Support  
support@elevateforhumanity.org

---

## 4. Live Session Reminder (Universal)

**Template IDs:** `email_barber_live_session_reminder`, `email_cna_live_session_reminder`

**Subject:** Reminder: Live {{program_name}} Session Tomorrow!

**Body:**

Hi {{student_name}},

Just a quick reminder that your live {{program_name}} Q&A session is coming up:

**When:** {{session_date_time}}  
**Where:** {{meeting_link}}  
**What to Bring:** Questions, your progress notes, and any challenges you're facing

This is your chance to get direct support from our instructors and connect with other students in your pathway.

Can't make it? No problem — we'll post the recording in your dashboard within 24 hours.

See you there!

– Elevate Student Support  
support@elevateforhumanity.org

---

## 5. Completion Congratulations Email (Universal)

**Template IDs:** `email_barber_completion_congrats`, `email_cna_completion_congrats`

**Subject:** Congratulations — You Have Completed Your Elevate Pathway! 🎉

**Body:**

Hi {{student_name}},

**Congratulations!** You have officially completed the {{program_name}} Pathway at Elevate for Humanity.

**What this means:**

- ✅ You finished all required partner modules
- ✅ Attended required live Elevate support sessions
- ✅ Passed all Elevate quizzes
- ✅ Completed all compliance and documentation steps

**Attached:**

Your **Elevate Certificate of Completion**  
This confirms you completed the full Elevate pathway.

---

**Your Next Steps**

{{#if_barber}}

- **Barber:** Schedule your state barber licensing exam
  {{/if_barber}}

{{#if_cna}}

- **CNA:** Schedule your state CNA exam
  {{/if_cna}}

If already scheduled → upload your results as soon as available

---

**Help With Next Steps**

Our support team is here to guide you into your exam, job placement, and any referrals needed through WorkOne, EmployIndy, and other workforce partners.

**We are proud of you.**

– Elevate Student Support  
support@elevateforhumanity.org

---

## Template Variables Reference

Common variables used across all templates:

- `{{student_name}}` - Student's first name
- `{{program_name}}` - Full program title
- `{{dashboard_url}}` - Link to student dashboard
- `{{next_block_title}}` - Title of next incomplete block
- `{{expected_hours}}` - Hours for next block
- `{{next_live_session_date}}` - Date/time of upcoming session
- `{{session_date_time}}` - Formatted date/time
- `{{meeting_link}}` - Zoom/Teams link
- `{{certificate_url}}` - Link to download certificate
