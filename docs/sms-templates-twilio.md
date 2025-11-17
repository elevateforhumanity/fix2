# SMS Templates for Twilio
### Production-Ready Text Message Templates

---

## A. Barber Pathway SMS Templates

### 1. Welcome (sent on enroll)

**Template ID:** `sms_barber_welcome`

```
Welcome to the Elevate Barber Apprenticeship Pathway, {{first_name}}! 🎉
Log in to your Elevate dashboard to watch the welcome video, complete the orientation quiz, and start your Milady barber modules: {{dashboard_link}}
```

---

### 2. "Get started" reminder (if no activity after 3 days)

**Template ID:** `sms_barber_get_started`

```
Hi {{first_name}}, this is Elevate. We noticed you haven't started your Barber Pathway yet. Take your first step today by logging in and starting the welcome module: {{dashboard_link}}
```

---

### 3. Live Q&A reminder (24h before)

**Template ID:** `sms_barber_live_reminder`

```
Reminder: your weekly Elevate Barber Q&A session is tomorrow at {{session_time}}. Bring questions from your Milady lessons. Join link is in your dashboard: {{dashboard_link}}
```

---

### 4. Inactive nudge (7+ days no progress)

**Template ID:** `sms_barber_inactive`

```
Hi {{first_name}}, Elevate here. We haven't seen progress in your Barber Pathway this week. Even 30 minutes today helps you move toward your barber license. Log in here: {{dashboard_link}}
```

---

### 5. Completion congrats

**Template ID:** `sms_barber_completion`

```
Congratulations {{first_name}}! 🎉 You have completed the Elevate Barber Pathway. Check your email to download your certificate and see next steps.
```

---

## B. CNA Pathway SMS Templates

### 1. Welcome (on enroll)

**Template ID:** `sms_cna_welcome`

```
Welcome to the Elevate CNA Career Pathway, {{first_name}}! 👩‍⚕️ Log in to watch the orientation video, finish the quiz, and start your CNA theory modules: {{dashboard_link}}
```

---

### 2. "Get started" reminder

**Template ID:** `sms_cna_get_started`

```
Hi {{first_name}}, Elevate here. Your CNA pathway is waiting. Log in today to start your first module and move closer to your CNA credential: {{dashboard_link}}
```

---

### 3. Live session reminder

**Template ID:** `sms_cna_live_reminder`

```
Reminder: your Elevate CNA live support session is tomorrow at {{session_time}}. We'll answer questions and help you prepare for clinicals and the state exam. Join via your dashboard: {{dashboard_link}}
```

---

### 4. Inactive nudge

**Template ID:** `sms_cna_inactive`

```
Hi {{first_name}}, we haven't seen CNA progress from you this week. You're closer than you think. Log in for at least one lesson today: {{dashboard_link}}
```

---

### 5. Completion congrats

**Template ID:** `sms_cna_completion`

```
Amazing job, {{first_name}}! 🎉 You've completed the Elevate CNA Pathway. Check your email to download your certificate and see next steps toward your state exam.
```

---

## SMS Variables

All templates support these variables:
- `{{first_name}}` - Student's first name
- `{{dashboard_link}}` - Short link to student dashboard
- `{{session_time}}` - Formatted time for live sessions

## Implementation Notes

### Twilio Integration:
```javascript
// Example Twilio send function
async function sendSMS(to, templateId, variables) {
  const template = SMS_TEMPLATES[templateId];
  const message = template.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match);
  
  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
}
```

### Character Limits:
- All templates are under 160 characters where possible
- Longer messages will be sent as multiple segments
- Links are shortened using your URL shortener

### Opt-Out Compliance:
Add to all SMS campaigns:
```
Reply STOP to unsubscribe
```
