# Grant Autopilot System - Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Database Tables

1. **Open Supabase SQL Editor:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Click "SQL Editor" in the left sidebar

2. **Run the migration:**
   - Copy the entire contents of `/migrations/grant_autopilot_tables.sql`
   - Paste into the SQL Editor
   - Click "Run" or press `Ctrl+Enter`

3. **Verify tables were created:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
     AND (table_name LIKE 'grant_%' OR table_name IN ('entities', 'entity_eligibility_checks'))
   ORDER BY table_name;
   ```

   **Expected tables (12 total):**
   - ✅ entities
   - ✅ entity_eligibility_checks
   - ✅ grant_applications
   - ✅ grant_eligibility_results
   - ✅ grant_federal_forms
   - ✅ grant_matches
   - ✅ grant_notification_log
   - ✅ grant_notifications
   - ✅ grant_opportunities
   - ✅ grant_packages
   - ✅ grant_sources
   - ✅ grant_submissions

---

### Step 2: Set Environment Variables

Add these to your Vercel environment variables:

```bash
# SAM.gov API (Required for eligibility checks)
SAM_GOV_API_KEY=your_sam_gov_api_key_here

# OpenAI (Required for draft generation)
OPENAI_API_KEY=your_openai_api_key_here

# Email Notifications (Optional)
RESEND_API_KEY=your_resend_api_key_here

# SMS Notifications (Optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# App URL
NEXT_PUBLIC_APP_URL=https://www.elevateforhumanity.org
```

**How to get API keys:**

1. **SAM.gov API Key:**
   - Go to https://sam.gov/data-services/
   - Click "Request API Key"
   - Fill out the form
   - You'll receive the key via email (usually within 24 hours)

2. **OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy and save the key

3. **Resend API Key (for emails):**
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the key

---

### Step 3: Access the System

Once tables are created and environment variables are set:

1. **Grant Workflow Dashboard:**
   ```
   https://www.elevateforhumanity.org/admin/grants/workflow
   ```

2. **Submissions Archive:**
   ```
   https://www.elevateforhumanity.org/admin/grants/submissions
   ```

---

## 📊 Test the System

### 1. Import Sample Grants
```bash
curl -X POST https://www.elevateforhumanity.org/api/grants/sync \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 2. Run Matching
```bash
curl -X POST https://www.elevateforhumanity.org/api/grants/match \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 3. Check Eligibility
```bash
curl -X POST https://www.elevateforhumanity.org/api/grants/eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "action": "check_entity",
    "entityId": "your-entity-id"
  }'
```

---

## 🎯 Sample Data Included

The migration automatically creates:

✅ **Sample Grant Source:** SAM.gov  
✅ **Sample Entity:** Elevate for Humanity
- UEI: ABC123DEF456
- NAICS: 611519, 624190, 611430
- Location: Indianapolis, IN

You can update this data or add more entities as needed.

---

## 🔧 Troubleshooting

### Pages Not Loading?
**Problem:** Grant pages show errors or don't load  
**Solution:** Run the SQL migration in Supabase

### API Errors?
**Problem:** API endpoints return 500 errors  
**Solution:** Check that environment variables are set in Vercel

### No Grants Showing?
**Problem:** Workflow dashboard is empty  
**Solution:** Run the sync endpoint to import grants

### SAM.gov Errors?
**Problem:** Eligibility checks fail  
**Solution:** Verify SAM_GOV_API_KEY is set and valid

---

## 📖 Full Documentation

- **System Blueprint:** `/GRANT_AUTOPILOT_SYSTEM_BLUEPRINT.md`
- **API Documentation:** `/docs/GRANT_AUTOPILOT_API.md`
- **Completion Report:** `/GRANT_AUTOPILOT_COMPLETE.md`

---

## 🆘 Support

**Issues?** Check:
1. Database tables are created
2. Environment variables are set
3. Vercel deployment is complete
4. API keys are valid

**Contact:** Elevate4humanityedu@gmail.com

---

## ✅ Setup Checklist

- [ ] Run SQL migration in Supabase
- [ ] Verify 12 tables were created
- [ ] Set SAM_GOV_API_KEY in Vercel
- [ ] Set OPENAI_API_KEY in Vercel
- [ ] Set NEXT_PUBLIC_APP_URL in Vercel
- [ ] Redeploy Vercel (if needed)
- [ ] Access workflow dashboard
- [ ] Test sync endpoint
- [ ] Test matching endpoint
- [ ] Review sample data

**Once complete, your Grant Autopilot System is ready to use!** 🎉
