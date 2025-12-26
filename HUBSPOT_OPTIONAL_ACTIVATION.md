# HubSpot Integration - Optional Activation Guide

## ⚠️ Important Note

**You already have a complete CRM system built into your platform!**

Your built-in CRM at `/admin/crm` is:
- ✅ More integrated (native database)
- ✅ More powerful (unlimited customization)
- ✅ Free (saves $9,600/year vs HubSpot Pro)
- ✅ Faster (no API calls)
- ✅ More secure (data ownership)

**This HubSpot integration is OPTIONAL** - only activate if you specifically need external form capture or want to sync with an existing HubSpot account.

---

## What the HubSpot Integration Does

**Current Implementation:** `/app/api/hubspot/submit/route.ts`

**Purpose:**
- Captures leads from external forms
- Submits to HubSpot CRM
- Falls back to email if HubSpot not configured

**Use Cases:**
- You have an existing HubSpot account with data
- You want to capture leads from external websites
- You need to integrate with HubSpot workflows
- Your sales team already uses HubSpot

**Recommendation:** Use your built-in CRM instead unless you have a specific need for HubSpot.

---

## If You Still Want to Activate HubSpot

### Step 1: Create Free HubSpot Account (5 minutes)

**Link:** https://www.hubspot.com/products/crm

**Steps:**
1. Click "Get started free"
2. Enter your email
3. Create password
4. Complete onboarding wizard
5. Skip paid features (stay on free plan)

---

### Step 2: Get Portal ID (2 minutes)

**Link:** https://app.hubspot.com/settings/account/general

**Steps:**
1. Login to HubSpot
2. Click Settings (gear icon in top right)
3. Go to "Account Setup" → "Account Defaults"
4. Find "Hub ID" (this is your Portal ID)
5. Copy the number (example: 12345678)

**Your Portal ID:** `_________________` (write it down)

---

### Step 3: Create a Form (5 minutes)

**Link:** https://app.hubspot.com/forms/

**Steps:**
1. Go to Marketing → Lead Capture → Forms
2. Click "Create form"
3. Choose "Embedded form"
4. Name it: "Website Inquiry Form"
5. Add these fields:
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - Phone
   - Program Interest (custom field)
   - Message (custom field)
6. Click "Create"
7. In the form editor, click "Share" or "Embed"
8. Look for the embed code
9. Find the Form GUID in the code (looks like: `12345678-1234-1234-1234-123456789abc`)

**Example embed code:**
```html
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "12345678",
    formId: "12345678-1234-1234-1234-123456789abc"  <-- This is your Form GUID
  });
</script>
```

**Your Form GUID:** `_________________` (write it down)

---

### Step 4: Create Private App (10 minutes)

**Link:** https://app.hubspot.com/private-apps/

**Steps:**
1. Go to Settings → Integrations → Private Apps
2. Click "Create a private app"
3. **Basic Info Tab:**
   - Name: `Elevate LMS Integration`
   - Description: `Integration for Elevate for Humanity LMS`
4. **Scopes Tab:** Select these scopes:
   - ✅ `crm.objects.contacts.write` - Create and update contacts
   - ✅ `crm.objects.contacts.read` - Read contact data
   - ✅ `forms` - Submit forms
   - ✅ `crm.objects.companies.write` - Create companies (optional)
   - ✅ `crm.objects.companies.read` - Read companies (optional)
5. Click "Create app"
6. **Important:** Copy the Access Token immediately (you can't see it again!)
7. Click "Show token" and copy it

**Your Private App Token:** `_________________` (write it down - starts with `pat-na1-...`)

---

### Step 5: Add to Vercel (5 minutes)

**Link:** https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

**Option A: Via Vercel Dashboard**

1. Go to the link above
2. Click "Add New" → "Environment Variable"
3. Add these three variables:

**Variable 1:**
- Key: `HUBSPOT_PORTAL_ID`
- Value: [Your Portal ID from Step 2]
- Environment: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- Key: `HUBSPOT_FORM_GUID`
- Value: [Your Form GUID from Step 3]
- Environment: ✅ Production, ✅ Preview, ✅ Development

**Variable 3:**
- Key: `HUBSPOT_PRIVATE_APP_TOKEN`
- Value: [Your Private App Token from Step 4]
- Environment: ✅ Production, ✅ Preview, ✅ Development

4. Click "Save" for each
5. Go to Deployments tab
6. Click "Redeploy" on latest deployment

**Option B: Via Vercel CLI**

```bash
# Login to Vercel
vercel login

# Navigate to project
cd /workspaces/fix2

# Add variables
echo "YOUR_PORTAL_ID" | vercel env add HUBSPOT_PORTAL_ID production
echo "YOUR_FORM_GUID" | vercel env add HUBSPOT_FORM_GUID production
echo "YOUR_PRIVATE_APP_TOKEN" | vercel env add HUBSPOT_PRIVATE_APP_TOKEN production

# Redeploy
vercel --prod
```

---

### Step 6: Test the Integration (2 minutes)

**Test Endpoint:**
```bash
curl -X POST https://elevateforhumanity.org/api/hubspot/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Test",
    "lastname": "User",
    "email": "test@example.com",
    "phone": "555-1234",
    "program": "Barber Training",
    "message": "Test inquiry from API"
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "data": {
    "inlineMessage": "Thanks for submitting the form.",
    "redirectUri": ""
  }
}
```

**Verify in HubSpot:**
1. Go to Contacts: https://app.hubspot.com/contacts/
2. Look for "Test User" contact
3. Check that all fields populated correctly

---

## Quick Reference Card

Print this and keep it handy:

```
┌─────────────────────────────────────────────────────┐
│         HubSpot Integration Credentials             │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Portal ID: _____________________________________   │
│                                                     │
│ Form GUID: _____________________________________   │
│                                                     │
│ Private App Token: _____________________________   │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Links:                                              │
│                                                     │
│ HubSpot Login:                                      │
│ https://app.hubspot.com/                            │
│                                                     │
│ Settings:                                           │
│ https://app.hubspot.com/settings/                   │
│                                                     │
│ Forms:                                              │
│ https://app.hubspot.com/forms/                      │
│                                                     │
│ Private Apps:                                       │
│ https://app.hubspot.com/private-apps/               │
│                                                     │
│ Contacts:                                           │
│ https://app.hubspot.com/contacts/                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## All Required Links

### Account Setup
1. **Create Account:** https://www.hubspot.com/products/crm
2. **Login:** https://app.hubspot.com/login
3. **Settings:** https://app.hubspot.com/settings/

### Get Credentials
4. **Portal ID:** https://app.hubspot.com/settings/account/general
5. **Create Form:** https://app.hubspot.com/forms/
6. **Private Apps:** https://app.hubspot.com/private-apps/

### Verify & Manage
7. **View Contacts:** https://app.hubspot.com/contacts/
8. **View Forms:** https://app.hubspot.com/forms/
9. **View Submissions:** https://app.hubspot.com/forms/[YOUR_PORTAL_ID]/submissions

### Vercel Configuration
10. **Add Environment Variables:** https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

---

## Troubleshooting

### Issue: "HubSpot configuration missing"

**Check:**
1. All 3 environment variables are set in Vercel
2. Variable names match exactly:
   - `HUBSPOT_PORTAL_ID`
   - `HUBSPOT_FORM_GUID`
   - `HUBSPOT_PRIVATE_APP_TOKEN`
3. Application has been redeployed after adding variables

**Solution:**
```bash
# Verify variables in Vercel dashboard
# Then redeploy:
vercel --prod
```

### Issue: "Submission failed" or 401 error

**Check:**
1. Private App Token is correct
2. Token hasn't been regenerated
3. App has required scopes (contacts.write, forms)

**Solution:**
1. Go to Private Apps: https://app.hubspot.com/private-apps/
2. Click your app
3. Verify scopes are enabled
4. If needed, regenerate token and update Vercel

### Issue: Contact not appearing in HubSpot

**Check:**
1. Form GUID is correct
2. Portal ID is correct
3. Form is published (not draft)

**Solution:**
1. Go to Forms: https://app.hubspot.com/forms/
2. Find your form
3. Check status is "Published"
4. Verify Form ID matches HUBSPOT_FORM_GUID

---

## Cost Comparison

### HubSpot Free Plan
- ✅ Unlimited contacts
- ✅ Basic CRM features
- ✅ Forms and landing pages
- ✅ Email marketing (2,000/month)
- ❌ Limited automation
- ❌ Limited reporting
- ❌ No custom properties (limited)

### HubSpot Pro Plan ($800/month)
- ✅ Everything in Free
- ✅ Advanced automation
- ✅ Custom reporting
- ✅ Unlimited custom properties
- ✅ Advanced workflows
- ✅ A/B testing

### Your Built-In CRM ($0/month)
- ✅ Unlimited everything
- ✅ Full automation
- ✅ Custom reporting
- ✅ Unlimited custom fields
- ✅ Advanced workflows
- ✅ Native integration
- ✅ Complete data ownership
- ✅ No API limits

**Recommendation:** Use your built-in CRM and save $9,600/year!

---

## When to Use HubSpot Integration

**Use HubSpot if:**
- ✅ You already have HubSpot with existing data
- ✅ Your sales team is trained on HubSpot
- ✅ You need to capture leads from external sites
- ✅ You have HubSpot workflows you want to keep

**Use Built-In CRM if:**
- ✅ Starting fresh (no existing HubSpot data)
- ✅ Want full control and customization
- ✅ Want to save $9,600/year
- ✅ Need native integration with your LMS
- ✅ Want unlimited features

---

## Migration from HubSpot to Built-In CRM

If you decide to migrate from HubSpot to your built-in CRM:

### Export from HubSpot
1. Go to Settings → Data Management → Export
2. Export Contacts
3. Export Companies
4. Export Deals
5. Download CSV files

### Import to Built-In CRM
```sql
-- Import contacts
COPY profiles (email, full_name, phone, company)
FROM '/path/to/contacts.csv'
DELIMITER ','
CSV HEADER;

-- Import leads
COPY license_leads (name, email, phone, company, status)
FROM '/path/to/leads.csv'
DELIMITER ','
CSV HEADER;

-- Import deals
COPY deals (name, amount, stage, expected_close_date)
FROM '/path/to/deals.csv'
DELIMITER ','
CSV HEADER;
```

---

## Summary

**Total Setup Time:** 30 minutes
**Cost:** $0 (free plan)
**Benefit:** External form capture and HubSpot sync

**But remember:** Your built-in CRM is more powerful and saves $9,600/year!

**Recommendation:** 
- ✅ Use built-in CRM for primary operations
- ⚠️ Only activate HubSpot if you have a specific need

---

**Last Updated:** December 26, 2025

**Status:** Optional - Not required for platform operation

**Your built-in CRM is better!** Use it at `/admin/crm`
