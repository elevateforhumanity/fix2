# Business Email System Setup

## ✅ What You Have

Your platform has **TWO email systems** already integrated:

### 1. **Resend** (Modern, Recommended)
- Package: `resend@6.4.2` ✅ Installed
- API Integration: ✅ Ready
- File: `lib/email.ts`

### 2. **SendGrid** (Enterprise)
- Package: `@sendgrid/mail@8.1.6` ✅ Installed
- API Integration: ✅ Ready
- File: `lib/notifications/email.ts`

---

## 📧 Email Features You Have

### Automated Emails:
1. **Welcome Emails** - `app/api/emails/welcome/route.ts`
2. **Certificate Delivery** - `app/api/emails/certificate/route.ts`
3. **Course Notifications** - `lib/email-course-notifications.ts`
4. **Apprentice Alerts** - `app/api/apprentice/email-alerts`

---

## 🎯 To Generate Business Emails

You have **3 options**:

### Option 1: Use Your Own Domain Email (Best)
**Example:** `info@elevateforhumanity.org`

**Setup:**
1. Buy domain (if you don't have one)
2. Set up email with:
   - Google Workspace ($6/user/month)
   - Microsoft 365 ($6/user/month)
   - Zoho Mail (Free for 5 users)

### Option 2: Use Resend with Custom Domain (Recommended)
**Example:** `noreply@elevateforhumanity.org`

**Setup:**
1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Add your domain
4. Verify DNS records
5. Get API key
6. Add to Vercel:
   ```
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=noreply@yourdomain.com
   ```

### Option 3: Use SendGrid (Enterprise)
**Example:** `support@elevateforhumanity.org`

**Setup:**
1. Go to https://sendgrid.com
2. Sign up (free tier: 100 emails/day)
3. Verify domain
4. Get API key
5. Add to Vercel:
   ```
   SENDGRID_API_KEY=SG.xxxxx
   SENDGRID_FROM=support@yourdomain.com
   ```

---

## 🚀 Quick Setup (Resend - 10 minutes)

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up with GitHub or email
3. Verify your email

### Step 2: Add Domain
1. Click "Domains" in sidebar
2. Click "Add Domain"
3. Enter: `elevateforhumanity.org` (or your domain)
4. Click "Add"

### Step 3: Verify Domain
Resend will show DNS records to add:

**Add these to your domain registrar:**
```
Type: TXT
Name: @
Value: resend-verify=xxxxx

Type: MX
Name: @
Value: mx.resend.com
Priority: 10

Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
```

### Step 4: Get API Key
1. Go to "API Keys"
2. Click "Create API Key"
3. Name: "Production"
4. Copy the key: `re_xxxxx`

### Step 5: Add to Vercel
1. Vercel Dashboard → Settings → Environment Variables
2. Add:
   ```
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=noreply@yourdomain.com
   ```
3. Save and redeploy

---

## 📨 How to Send Emails

### From Your Code:
```typescript
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'customer@example.com',
  subject: 'Welcome to Elevate For Humanity',
  html: '<h1>Welcome!</h1><p>Thank you for joining...</p>',
  from: 'info@elevateforhumanity.org'
});
```

### Via API:
```bash
curl -X POST https://yourdomain.com/api/emails/welcome \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John Doe"}'
```

---

## 🎨 Email Templates You Have

Your system includes:

1. **Welcome Email** - New user onboarding
2. **Certificate Email** - Course completion
3. **Course Notifications** - Assignment reminders
4. **Apprentice Alerts** - Program updates

All templates support:
- HTML formatting
- Dynamic content
- Attachments
- Tracking

---

## 💼 Business Email Best Practices

### For Professional Communication:

**Use these email addresses:**
- `info@yourdomain.com` - General inquiries
- `support@yourdomain.com` - Customer support
- `noreply@yourdomain.com` - Automated emails
- `admin@yourdomain.com` - Admin notifications

**Set up in Vercel:**
```
EMAIL_FROM=noreply@elevateforhumanity.org
SUPPORT_EMAIL=support@elevateforhumanity.org
ADMIN_EMAIL=admin@elevateforhumanity.org
```

---

## 🔧 Current Configuration

Check your `.env.local`:

```bash
# Email Service (Choose one)
RESEND_API_KEY=your-resend-key
EMAIL_FROM=noreply@yourdomain.com

# OR

SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM=noreply@yourdomain.com
```

---

## ✅ To Enable Business Emails Now:

### Quick Start (5 minutes):
1. **Get Resend API key** (free tier)
2. **Add to Vercel environment variables**
3. **Set EMAIL_FROM to your domain**
4. **Redeploy**

### Full Setup (30 minutes):
1. **Verify your domain with Resend**
2. **Set up DNS records**
3. **Configure email addresses**
4. **Test email sending**
5. **Set up email templates**

---

## 📊 Email Limits

### Resend Free Tier:
- 100 emails/day
- 3,000 emails/month
- All features included

### Resend Pro ($20/month):
- 50,000 emails/month
- Custom domains
- Analytics
- Priority support

### SendGrid Free:
- 100 emails/day
- Basic features

### SendGrid Pro ($15/month):
- 40,000 emails/month
- Advanced features

---

## 🎯 Recommended Setup

**For your platform:**

1. **Use Resend** (easier, modern)
2. **Verify your domain**
3. **Set up these emails:**
   - `noreply@elevateforhumanity.org` - Automated
   - `support@elevateforhumanity.org` - Support
   - `info@elevateforhumanity.org` - General

4. **Add to Vercel:**
   ```
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=noreply@elevateforhumanity.org
   ```

**Your emails will work immediately!** 📧

---

**Want me to help you set this up?** Let me know your domain name and I can guide you through the DNS setup!
