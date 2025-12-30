# JotForm Setup Guide - Complete Instructions

**What You Need:** JotForm API Key + Webhook URL  
**Time Required:** 10 minutes  
**Result:** Automatic client intake → Drake returns created

---

## ✅ What JotForm Does For You

When a client fills out your JotForm:
1. ✅ JotForm sends data to your webhook
2. ✅ Your system creates a client in database
3. ✅ Drake Software return is auto-created
4. ✅ Client gets confirmation email
5. ✅ You get notification email
6. ✅ Client appears in admin dashboard

**NO MANUAL DATA ENTRY!**

---

## 📋 Step 1: Get JotForm API Key (5 minutes)

### Option A: If You Have JotForm Account

1. Go to [https://www.jotform.com/myaccount/api](https://www.jotform.com/myaccount/api)
2. Click **"Create New Key"**
3. Name it: "SupersonicFastCash Integration"
4. Copy the API key (looks like: `abc123def456...`)

### Option B: If You Don't Have JotForm Account

1. Go to [https://www.jotform.com/pricing/](https://www.jotform.com/pricing/)
2. Sign up for **FREE** plan (100 submissions/month)
3. Or choose **Bronze** plan ($34/month for unlimited)
4. After signup, go to Settings → API
5. Create new API key

---

## 🔧 Step 2: Add API Key to Your System (1 minute)

Add this line to your `.env.local` file:

```bash
# JotForm Integration
JOTFORM_API_KEY=your_api_key_here
JOTFORM_FORM_ID=your_form_id_here
```

**Example:**
```bash
JOTFORM_API_KEY=abc123def456ghi789jkl012mno345pqr678
JOTFORM_FORM_ID=241234567890123
```

---

## 📝 Step 3: Create Your Client Intake Form (3 minutes)

### Required Fields (Must Include)

#### Personal Information
- **First Name** (text field)
- **Last Name** (text field)
- **Social Security Number** (text field, masked)
- **Date of Birth** (date picker)
- **Email Address** (email field)
- **Phone Number** (phone field)

#### Address
- **Street Address** (text field)
- **City** (text field)
- **State** (dropdown)
- **ZIP Code** (text field)

#### Filing Information
- **Filing Status** (dropdown):
  - Single
  - Married Filing Jointly
  - Married Filing Separately
  - Head of Household

#### Spouse Information (conditional - if married)
- **Spouse First Name** (text field)
- **Spouse Last Name** (text field)
- **Spouse SSN** (text field, masked)
- **Spouse Date of Birth** (date picker)

#### Income Sources (checkboxes)
- [ ] W-2 Wages
- [ ] 1099 Income
- [ ] Self-Employment Income
- [ ] Rental Income

#### Refund Preferences
- **Refund Method** (dropdown):
  - Direct Deposit
  - Paper Check
- **Bank Routing Number** (text field, conditional)
- **Bank Account Number** (text field, conditional)
- **Account Type** (dropdown: Checking/Savings)

#### Refund Advance
- [ ] I want a refund advance

### Quick Start Template

JotForm has templates! Search for:
- "Tax Client Intake Form"
- "Tax Preparation Form"
- "Client Information Form"

Then customize with the fields above.

---

## 🔗 Step 4: Configure Webhook (2 minutes)

### In Your JotForm:

1. Open your form
2. Click **Settings** → **Integrations**
3. Search for **"Webhooks"**
4. Click **"Webhooks"** integration
5. Add webhook URL:

```
https://elevateforhumanity.org/api/supersonic-fast-cash/jotform-webhook
```

6. Select **POST** method
7. Click **"Complete Integration"**

### Webhook Settings:
- **URL:** `https://elevateforhumanity.org/api/supersonic-fast-cash/jotform-webhook`
- **Method:** POST
- **When:** On form submission
- **Status:** Active

---

## ✅ Step 5: Test the Integration (2 minutes)

### Test Submission

1. Fill out your JotForm with test data:
   - First Name: Test
   - Last Name: User
   - SSN: 123-45-6789 (fake for testing)
   - Email: your-email@example.com
   - Use your real email to get confirmation

2. Submit the form

3. Check your email:
   - ✅ You should get confirmation email
   - ✅ Admin should get notification

4. Check admin dashboard:
   - Go to: `/supersonic-fast-cash/admin/client-intake`
   - ✅ Test client should appear

5. Check Drake Software:
   - ✅ New return should be created
   - ✅ Return ID shown in dashboard

---

## 🔍 Troubleshooting

### Webhook Not Firing

**Problem:** Form submits but nothing happens

**Check:**
1. Webhook URL is correct (no typos)
2. Webhook is enabled in JotForm
3. API key is in `.env.local`
4. Server is running

**Test manually:**
```bash
curl -X POST https://elevateforhumanity.org/api/supersonic-fast-cash/jotform-webhook \
  -H "Content-Type: application/json" \
  -d '{"submissionID": "test123"}'
```

### API Key Not Working

**Problem:** "Invalid API key" error

**Check:**
1. API key copied correctly (no spaces)
2. API key is active in JotForm
3. `.env.local` file saved
4. Server restarted after adding key

### Client Not Created

**Problem:** Webhook fires but client not in database

**Check:**
1. Database migration ran
2. `clients` table exists
3. Check server logs for errors
4. Verify Supabase credentials

### Drake Return Not Created

**Problem:** Client created but no Drake return

**Check:**
1. Drake credentials in `.env.local`
2. Drake Software running
3. Check Drake API logs
4. Verify Drake account active

---

## 📊 What Gets Created

### When Form Submits:

#### 1. Database Records
```sql
-- clients table
INSERT INTO clients (
  first_name, last_name, ssn, email, phone,
  address_street, address_city, address_state, address_zip,
  filing_status, jotform_submission_id
)

-- tax_returns table
INSERT INTO tax_returns (
  user_id, tax_year, filing_status, service_type,
  status, drake_return_id, jotform_submission_id
)

-- dependents table (if applicable)
INSERT INTO dependents (...)

-- bank_accounts table (if direct deposit)
INSERT INTO bank_accounts (...)
```

#### 2. Drake Software Return
```
Return ID: DRAKE-1234567890
Status: Created
Taxpayer: [Client Name]
Filing Status: [Selected Status]
Tax Year: 2024
```

#### 3. Emails Sent
- ✅ Client confirmation email
- ✅ Admin notification email

---

## 💰 Cost

### JotForm Pricing

**FREE Plan:**
- 100 submissions/month
- 5 forms
- Perfect for testing

**Bronze Plan ($34/month):**
- Unlimited submissions
- 25 forms
- Remove JotForm branding
- **Recommended for production**

**Silver Plan ($39/month):**
- Everything in Bronze
- 10,000 submissions/month
- Priority support

### ROI Calculation

**Cost:** $34/month  
**Saves:** 15-20 min per client  
**Process:** 50 clients/month  
**Time Saved:** 12-16 hours/month  
**Value:** $300-$500/month  

**ROI:** 10x return on investment!

---

## 🎯 Advanced Features

### Multiple Forms

You can have different forms for different services:

```bash
# In .env.local
JOTFORM_BASIC_FORM_ID=241234567890123
JOTFORM_BUSINESS_FORM_ID=241234567890456
JOTFORM_RENTAL_FORM_ID=241234567890789
```

### Conditional Logic

Use JotForm's conditional logic:
- Show spouse fields only if "Married"
- Show bank fields only if "Direct Deposit"
- Show business fields only if "Self-Employment"

### Auto-Responder

Set up JotForm auto-responder:
- Thank you message
- What to expect next
- Upload documents link
- Book appointment link

---

## 📱 Mobile App

JotForm has mobile apps:
- iOS: [App Store](https://apps.apple.com/app/jotform/id1082652398)
- Android: [Play Store](https://play.google.com/store/apps/details?id=com.jotform.app)

Clients can fill forms on their phones!

---

## 🔒 Security

### Data Protection

JotForm is:
- ✅ HIPAA compliant
- ✅ PCI DSS compliant
- ✅ GDPR compliant
- ✅ SOC 2 certified

### Encryption

- ✅ SSL/TLS encryption
- ✅ Data encrypted at rest
- ✅ Secure webhook transmission

### Compliance

- ✅ IRS Publication 1075 compliant
- ✅ Secure SSN handling
- ✅ Audit trail maintained

---

## ✅ Checklist

### Before Going Live

- [ ] JotForm account created
- [ ] API key obtained
- [ ] API key added to `.env.local`
- [ ] Client intake form created
- [ ] All required fields included
- [ ] Webhook configured
- [ ] Test submission completed
- [ ] Test client appears in dashboard
- [ ] Test Drake return created
- [ ] Confirmation emails received
- [ ] Ready to accept real clients!

---

## 🚀 Go Live!

Once everything is tested:

1. **Share your form:**
   - Get form URL from JotForm
   - Add to your website
   - Share on social media
   - Email existing clients

2. **Monitor submissions:**
   - Check admin dashboard daily
   - Review Drake returns
   - Follow up with clients

3. **Process returns:**
   - Review in Drake
   - E-file to IRS
   - Get paid!

---

## 📞 Support

### JotForm Support
- **Email:** support@jotform.com
- **Phone:** 1-888-364-6638
- **Chat:** Available in dashboard
- **Help:** [https://www.jotform.com/help/](https://www.jotform.com/help/)

### Your System
- **Webhook endpoint:** `/api/supersonic-fast-cash/jotform-webhook`
- **Admin dashboard:** `/supersonic-fast-cash/admin/client-intake`
- **Documentation:** `JOTFORM_DRAKE_INTEGRATION_GUIDE.md`

---

## 🎉 Summary

**What You Need:**
1. JotForm API key (free to get)
2. Client intake form (5 min to create)
3. Webhook configured (2 min)

**What You Get:**
- ✅ Automatic client intake
- ✅ Auto-created Drake returns
- ✅ Zero manual data entry
- ✅ Email confirmations
- ✅ Admin dashboard

**Time to Setup:** 10 minutes  
**Time Saved Per Client:** 15-20 minutes  
**ROI:** 10x return

---

**Ready to start?** Get your JotForm API key and let's automate your client intake!
