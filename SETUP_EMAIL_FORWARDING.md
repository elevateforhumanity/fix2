# Set Up Email Forwarding in Resend

## ✅ You Already Have:
- Resend API key in Vercel ✅
- Professional email on website: `info@elevateforhumanity.org` ✅
- Gmail inbox: `elevate4humanityedu@gmail.com` ✅

---

## 🎯 What You Need to Do (5 minutes):

### Step 1: Log into Resend
Go to https://resend.com and log in

### Step 2: Add Your Domain
1. Click **"Domains"** in left sidebar
2. Click **"Add Domain"**
3. Enter: `elevateforhumanity.org`
4. Click **"Add"**

### Step 3: Verify Domain (DNS Setup)
Resend will show you DNS records to add. Go to your domain registrar and add:

**Record 1: Domain Verification**
```
Type: TXT
Name: @
Value: resend-verify=xxxxx (Resend will show you this)
TTL: 3600
```

**Record 2: Email Sending (SPF)**
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
TTL: 3600
```

**Record 3: DKIM**
```
Type: TXT
Name: resend._domainkey
Value: (Resend will show you this long string)
TTL: 3600
```

**Record 4: MX (Mail Exchange)**
```
Type: MX
Name: @
Priority: 10
Value: mx.resend.com
TTL: 3600
```

### Step 4: Wait for Verification
- Usually takes 5-30 minutes
- Resend will show ✅ when verified
- You'll get an email confirmation

### Step 5: Set Up Email Forwarding
1. In Resend dashboard, go to **"Emails"** or **"Forwarding"**
2. Click **"Add Forwarding Rule"**
3. Set up:
   ```
   From: info@elevateforhumanity.org
   Forward to: elevate4humanityedu@gmail.com
   ```
4. Click **"Save"**

---

## 🎯 Alternative: Use Your Domain Registrar

If you don't want to use Resend for forwarding, most domain registrars offer free email forwarding:

### GoDaddy:
1. Log into GoDaddy
2. My Products → Domain → Manage
3. Email Forwarding → Create Forward
4. `info@elevateforhumanity.org` → `elevate4humanityedu@gmail.com`

### Namecheap:
1. Log into Namecheap
2. Domain List → Manage
3. Email Forwarding tab
4. Add: `info` → `elevate4humanityedu@gmail.com`

### Google Domains:
1. Log into Google Domains
2. Email → Email forwarding
3. Add: `info@elevateforhumanity.org` → `elevate4humanityedu@gmail.com`

### Cloudflare:
1. Log into Cloudflare
2. Email → Email Routing
3. Add: `info` → `elevate4humanityedu@gmail.com`

---

## ✅ Test Email Forwarding

After setup, test it:

1. **Send test email to:** `info@elevateforhumanity.org`
2. **Check your Gmail:** `elevate4humanityedu@gmail.com`
3. **Should receive it within seconds!**

---

## 📧 What Happens Now:

### When someone emails you:
```
User sends to: info@elevateforhumanity.org
↓
Resend/Domain forwards to: elevate4humanityedu@gmail.com
↓
You receive in Gmail inbox ✅
```

### When you reply:
```
You reply from: elevate4humanityedu@gmail.com
↓
User sees reply from: elevate4humanityedu@gmail.com
```

---

## 💡 Pro Tip: Send FROM Professional Email

To send emails FROM `info@elevateforhumanity.org` (not just receive):

### Option 1: Gmail "Send As" Feature
1. Gmail → Settings → Accounts and Import
2. "Send mail as" → Add another email address
3. Add: `info@elevateforhumanity.org`
4. Verify via email
5. Now you can send FROM `info@elevateforhumanity.org` in Gmail!

### Option 2: Use Resend API
Your platform already sends automated emails from `noreply@elevateforhumanity.org`

---

## 🎯 Current Configuration:

### Website Shows:
```
Contact: info@elevateforhumanity.org ✅
```

### Automated Emails:
```
From: noreply@elevateforhumanity.org
Reply-To: info@elevateforhumanity.org
```

### You Receive In:
```
Gmail: elevate4humanityedu@gmail.com ✅
```

---

## ✅ Summary:

**What's Done:**
- ✅ Website updated with professional email
- ✅ Resend API key in Vercel
- ✅ Email system configured

**What You Need to Do:**
1. Add domain to Resend (or use domain registrar)
2. Set up DNS records
3. Configure email forwarding
4. Test it!

**Time:** 5-10 minutes + DNS propagation (5-30 min)

---

**Need help with DNS setup? Let me know your domain registrar (GoDaddy, Namecheap, etc.) and I can give you exact steps!**
