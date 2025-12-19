# CALENDLY INTEGRATION GUIDE
## Appointment Flow for Elevate for Humanity

**Version:** 1.0  
**Date:** 2025-12-18  
**Contact:** (317) 314-3757 | elevate4humanityedu@gmail.com

---

## CORE RULE

**Appointments are human-led.**  
**Technology only supports the conversation.**

- No open Zoom rooms
- No random links
- No self-routing without context

---

## 1. APPOINTMENT TYPES (ONLY THESE 3)

### A) STUDENT / INDIVIDUAL ADVISING

**Who:** Students, applicants, community members  
**Purpose:** Programs, funding, next steps

**Options:**
- ☎️ Phone Call (default)
- 💻 Zoom (when needed)

**Duration:** 20–30 minutes

**Calendly Event Name:** "Student Career Advising"

---

### B) TAX APPOINTMENTS

**Who:** Tax clients (free or paid — never mixed)  
**Purpose:** Intake, review, filing

**Options:**
- ☎️ Phone (intake / follow-up)
- 💻 Zoom (document review)

**Duration:** 30–45 minutes

**Calendly Event Names:**
- "Free Tax Appointment (Rise Up Foundation)"
- "Paid Tax Appointment (SupersonicFastCash)"

---

### C) PARTNER / PLATFORM / AGENCY

**Who:** Employers, program holders, workforce boards  
**Purpose:** Partnerships, licensing, reporting

**Options:**
- 💻 Zoom only

**Duration:** 30–60 minutes

**Calendly Event Name:** "Partner / Platform Meeting"

---

## 2. CALENDLY SETUP (RECOMMENDED)

### Create SEPARATE Event Types

**DO NOT use one generic calendar.**

### Event Type 1: Student Career Advising

**Settings:**
- Duration: 30 minutes
- Location: Ask invitee (Phone or Zoom)
- Buffer time: 15 minutes between appointments
- Confirmation page: Custom redirect to `/appointments/confirmed`

**Questions to Ask:**
1. "How would you prefer to meet?" (Phone / Zoom)
2. "Phone number" (if Phone selected)
3. "What programs are you interested in?" (Text field)
4. "Have you applied already?" (Yes / No)

**Confirmation Email:** Use custom template (see Email Templates section)

---

### Event Type 2: Free Tax Appointment

**Settings:**
- Duration: 45 minutes
- Location: Ask invitee (Phone or Zoom)
- Buffer time: 15 minutes
- Confirmation page: Custom redirect to `/tax/free/confirmed`

**Questions to Ask:**
1. "How would you prefer to meet?" (Phone / Zoom)
2. "Phone number" (if Phone selected)
3. "Do you have your tax documents ready?" (Yes / No)
4. "Estimated household income" (Dropdown: <$30k, $30k-$50k, $50k-$70k, >$70k)

**Important:** Separate Calendly account or clear branding for Rise Up Foundation

---

### Event Type 3: Paid Tax Appointment

**Settings:**
- Duration: 45 minutes
- Location: Ask invitee (Phone or Zoom)
- Buffer time: 15 minutes
- Confirmation page: Custom redirect to `/tax/professional/confirmed`

**Questions to Ask:**
1. "How would you prefer to meet?" (Phone / Zoom)
2. "Phone number" (if Phone selected)
3. "Type of return" (Individual / Business / Self-employed)
4. "Do you have your tax documents ready?" (Yes / No)

**Important:** Separate branding for SupersonicFastCash

---

### Event Type 4: Partner / Platform Meeting

**Settings:**
- Duration: 60 minutes
- Location: Zoom (required)
- Buffer time: 30 minutes
- Confirmation page: Custom redirect to `/platform/meeting-confirmed`

**Questions to Ask:**
1. "Organization name"
2. "Your role"
3. "What are you interested in?" (Partnership / Platform Licensing / Workforce Collaboration)
4. "Tell us about your needs" (Text field)

---

## 3. PHONE VS ZOOM DECISION FLOW

### DEFAULT RULE

**Phone first. Zoom when needed.**

**Why:**
- Less friction
- More accessible
- Lower no-show rate
- Trauma- and justice-informed

---

### Student Flow

**Calendly asks:** "How would you prefer to meet?"
- ☎️ Phone
- 💻 Zoom

**If Zoom is selected:**
- Link is auto-generated
- Only sent after confirmation

**If Phone is selected:**
- We call them (never ask them to call us)

---

### Tax Flow

**Intake → Review → Decide format**

- Zoom used only if screen-sharing is required
- Phone for simple returns

---

## 4. EMAIL CONFIRMATION LANGUAGE

### Student Appointment Confirmation

**Subject:** Your appointment with Elevate for Humanity

**Body:**
```
Hello {{FirstName}},

Your appointment with Elevate for Humanity is confirmed.

📅 Date: {{Date}}
⏰ Time: {{Time}}
📞 Format: {{Phone or Zoom}}

{{#if Phone}}
We will call you at the number you provided at the scheduled time.
{{/if}}

{{#if Zoom}}
Your secure Zoom meeting link is below:
{{ZoomLink}}

Please join from a quiet location with a stable internet connection.
{{/if}}

If you need to reschedule, please use the link below or call us at (317) 314-3757.

{{RescheduleLink}}

—
Elevate for Humanity
Phone: (317) 314-3757
```

---

## 5. ZOOM SETUP (DO THIS EXACTLY)

### Zoom Account

**Requirements:**
- One organization Zoom account
- Licensed (no 40-minute cutoff)
- Professional plan minimum

### Settings

**Waiting Room:** ON  
**Why:** Privacy and control

**Auto-Record:** OFF (unless consent)  
**Why:** FERPA/privacy compliance

**Screen Share:** Host + participant  
**Why:** Document review capability

**Join Before Host:** OFF  
**Why:** Professional control

**Meeting Password:** Required  
**Why:** Security

---

## 6. WHO CALLS WHO (NO CONFUSION)

### Phone Appointments

✅ **You call them**  
❌ Never ask students to cold-call

**Why:**
- Reduces anxiety
- Professional standard
- Trauma-informed
- Higher show rate

---

### Zoom Appointments

✅ **Host joins first**  
✅ **Admit participant manually**

**Why:**
- Signals professionalism
- Ensures privacy
- Prevents unauthorized access

---

## 7. NO-SHOW & REMINDER SYSTEM

### Automated Reminders

**24 hours before:**
- Email reminder
- SMS reminder (if phone provided)

**1 hour before:**
- Email reminder
- SMS reminder (if phone provided)

**Message includes:**
- Date / time
- Phone vs Zoom
- Reschedule link
- Phone number for help: (317) 314-3757

---

### No-Show Policy (Soft, Human)

**First no-show:**
- Reschedule freely
- No penalty
- Follow-up email: "We missed you, let's reschedule"

**Second no-show:**
- Advisor review
- Personal outreach
- Check for barriers

**Never:**
- ❌ Shame
- ❌ Auto-block
- ❌ Punitive language

**Why:** Trauma-informed, barrier-aware approach

---

## 8. WHERE APPOINTMENTS LIVE ON THE SITE

### Public Pages

**Apply page:**
- "Book an advising call" button
- Links to Calendly: Student Career Advising

**Tax pages:**
- "Schedule appointment" button
- Links to appropriate Calendly event

**Partner page:**
- "Request meeting" button
- Links to Calendly: Partner / Platform Meeting

---

### Not Public

❌ Zoom links  
❌ Advisor calendars  
❌ Internal scheduling notes  
❌ Appointment history

---

## 9. SUPABASE DATA (MINIMAL, CLEAN)

### Store Only:

```sql
CREATE TABLE appointments (
  id uuid PRIMARY KEY,
  appointment_type text, -- 'student_advising', 'tax_free', 'tax_paid', 'partner_meeting'
  scheduled_date date,
  scheduled_time time,
  format text, -- 'phone' or 'zoom'
  phone_number text,
  zoom_link text,
  student_id uuid,
  advisor_id uuid,
  status text, -- 'scheduled', 'completed', 'no_show', 'cancelled'
  calendly_event_id text,
  created_at timestamptz
);
```

### DO NOT Store:

❌ Zoom recordings  
❌ Call notes publicly  
❌ Sensitive conversation details

---

## 10. CALENDLY WEBHOOK INTEGRATION

### Setup Webhook

**Calendly → Webhooks → Create Webhook**

**Endpoint:** `https://elevateforhumanity.org/api/calendly/webhook`

**Events to Subscribe:**
- `invitee.created` - New appointment booked
- `invitee.canceled` - Appointment cancelled

---

### Webhook Handler

```typescript
// app/api/calendly/webhook/route.ts
export async function POST(request: Request) {
  const payload = await request.json();
  
  if (payload.event === 'invitee.created') {
    // 1. Store appointment in database
    // 2. Send confirmation email
    // 3. Create calendar event
    // 4. Schedule reminders
  }
  
  if (payload.event === 'invitee.canceled') {
    // 1. Update appointment status
    // 2. Send cancellation confirmation
    // 3. Offer reschedule link
  }
  
  return new Response('OK', { status: 200 });
}
```

---

## 11. SMS REMINDERS (OPTIONAL)

### Using Twilio

**24-hour reminder:**
```
Hi {{FirstName}}, reminder: You have an appointment with Elevate for Humanity tomorrow at {{Time}}. 

{{#if Phone}}We'll call you.{{/if}}
{{#if Zoom}}Join here: {{ShortLink}}{{/if}}

Need to reschedule? Call (317) 314-3757
```

**1-hour reminder:**
```
Hi {{FirstName}}, your appointment starts in 1 hour at {{Time}}.

{{#if Phone}}We'll call you soon.{{/if}}
{{#if Zoom}}Join: {{ShortLink}}{{/if}}

Questions? (317) 314-3757
```

---

## 12. WHY THIS WORKS

### Trauma-Informed
- No pressure to call
- Clear expectations
- Human-first approach

### Workforce-Appropriate
- Professional standards
- Accessible options
- Barrier-aware

### IRS-Safe (Tax)
- Free/paid separated
- Clear service boundaries
- Compliant intake

### Professional for Partners
- Zoom-only for business
- Structured meetings
- Enterprise-ready

### Low Technical Friction
- Simple booking
- Clear instructions
- Multiple options

### High Trust
- Human connection
- Consistent experience
- Reliable follow-through

---

## 13. IMPLEMENTATION CHECKLIST

### Immediate Setup

- [ ] Create Calendly account (or use existing)
- [ ] Set up 4 event types
- [ ] Configure custom questions
- [ ] Set up confirmation emails
- [ ] Add Calendly links to website
- [ ] Test booking flow

### Integration

- [ ] Set up Calendly webhook
- [ ] Create webhook handler
- [ ] Test appointment creation in database
- [ ] Verify email sending
- [ ] Test reminder system

### Optimization

- [ ] Monitor no-show rates
- [ ] Adjust reminder timing
- [ ] Refine confirmation copy
- [ ] Add SMS reminders (optional)
- [ ] Create advisor scheduling dashboard

---

## 14. CALENDLY EMBED CODE

### For Website Pages

```html
<!-- Student Advising -->
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/elevateforhumanity/student-advising"
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async>
</script>
```

### For Popup Widget

```html
<!-- Button -->
<button onclick="Calendly.initPopupWidget({url: 'https://calendly.com/elevateforhumanity/student-advising'});">
  Schedule Appointment
</button>

<!-- Script -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
```

---

## CONCLUSION

This appointment system is:
- ✅ Human-centered
- ✅ Trauma-informed
- ✅ Compliance-safe
- ✅ Professionally structured
- ✅ Technically simple
- ✅ Highly effective

**This is exactly how real workforce hubs operate.**

---

**Document Control:**
- **Version:** 1.0
- **Last Updated:** 2025-12-18
- **Next Review:** 2025-03-18
- **Owner:** Elevate for Humanity Operations Team

**Contact:**
- Phone: (317) 314-3757
- Email: elevate4humanityedu@gmail.com
