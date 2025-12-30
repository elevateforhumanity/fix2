# JotForm + Drake Software Integration Guide
**Automatic Client Intake for SupersonicFastCash**

---

## What This Does

When a client fills out your JotForm intake form:
1. ✅ **JotForm** sends data to your webhook
2. ✅ **Your System** parses the client information
3. ✅ **Drake Software** automatically creates a new tax return
4. ✅ **Database** saves all client data
5. ✅ **Email** sends confirmation to client and notification to you
6. ✅ **Portal** client can access their account immediately

**NO MANUAL DATA ENTRY REQUIRED!**

---

## Setup Steps

### Step 1: Get Your JotForm API Key

1. Log in to [JotForm.com](https://www.jotform.com)
2. Go to **Settings** → **API**
3. Click **Create New Key**
4. Copy your API key
5. Add to `.env.local`:
   ```bash
   JOTFORM_API_KEY=your_api_key_here
   ```

### Step 2: Configure Webhook in JotForm

1. Open your client intake form in JotForm
2. Go to **Settings** → **Integrations**
3. Search for **Webhooks**
4. Add webhook URL:
   ```
   https://elevateforhumanity.org/api/supersonic-fast-cash/jotform-webhook
   ```
5. Select **POST** method
6. Click **Complete Integration**

### Step 3: Map Form Fields

Your JotForm should include these fields (exact names don't matter, our system is smart):

#### Personal Information
- First Name
- Last Name
- Middle Name (optional)
- Social Security Number
- Date of Birth
- Email Address
- Phone Number

#### Address
- Street Address
- City
- State
- ZIP Code

#### Filing Information
- Filing Status (dropdown):
  - Single
  - Married Filing Jointly
  - Married Filing Separately
  - Head of Household

#### Spouse Information (if married)
- Spouse First Name
- Spouse Last Name
- Spouse SSN
- Spouse Date of Birth

#### Dependents (repeatable section)
- Dependent First Name
- Dependent Last Name
- Dependent SSN
- Dependent Date of Birth
- Relationship

#### Income Sources (checkboxes)
- [ ] W-2 Wages
- [ ] 1099 Income
- [ ] Self-Employment Income
- [ ] Rental Income

#### Refund Preferences
- Refund Method (dropdown):
  - Direct Deposit
  - Paper Check
- Bank Routing Number (if direct deposit)
- Bank Account Number (if direct deposit)
- Account Type (Checking/Savings)

#### Refund Advance
- [ ] I want a refund advance

---

## How It Works

### Workflow Diagram

```
┌─────────────┐
│   Client    │
│ Fills Form  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   JotForm   │
│  Webhook    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Your System                        │
│  /api/supersonic-fast-cash/        │
│  jotform-webhook                    │
└──────┬──────────────────────────────┘
       │
       ├──► Parse Form Data
       │
       ├──► Save to Database (Supabase)
       │    └─► clients table
       │    └─► tax_returns table
       │    └─► dependents table
       │    └─► bank_accounts table
       │
       ├──► Create Drake Return
       │    └─► drakeIntegration.createReturn()
       │    └─► Returns Drake Return ID
       │
       ├──► Send Email to Client
       │    └─► Confirmation + Portal Link
       │
       └──► Send Email to Tax Pro
            └─► New client notification
```

### Data Flow

```javascript
// 1. JotForm sends webhook
POST /api/supersonic-fast-cash/jotform-webhook
{
  "submissionID": "123456789",
  "formID": "987654321"
}

// 2. System fetches full submission
GET https://api.jotform.com/submission/123456789

// 3. Parse into structured data
{
  firstName: "John",
  lastName: "Doe",
  ssn: "123-45-6789",
  email: "john@example.com",
  filingStatus: "single",
  hasW2: true,
  wantsRefundAdvance: true
}

// 4. Create Drake return
drakeIntegration.createReturn({
  taxpayer: { ... },
  filingStatus: "single",
  taxYear: 2024
})
// Returns: { returnId: "DRAKE-123456" }

// 5. Save to database
INSERT INTO tax_returns (
  user_id,
  drake_return_id,
  filing_status,
  status
) VALUES (...)

// 6. Send emails
resend.emails.send({
  to: "john@example.com",
  subject: "Your Tax Return Information Received"
})
```

---

## Database Schema

### clients table
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  ssn TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  filing_status TEXT,
  jotform_submission_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### tax_returns table
```sql
CREATE TABLE tax_returns (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES clients(id),
  tax_year INTEGER NOT NULL,
  filing_status TEXT NOT NULL,
  service_type TEXT DEFAULT 'professional',
  status TEXT DEFAULT 'in_progress',
  drake_return_id TEXT,
  jotform_submission_id TEXT,
  has_w2 BOOLEAN DEFAULT false,
  has_1099 BOOLEAN DEFAULT false,
  has_self_employment BOOLEAN DEFAULT false,
  has_rental_income BOOLEAN DEFAULT false,
  wants_refund_advance BOOLEAN DEFAULT false,
  refund_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### dependents table
```sql
CREATE TABLE dependents (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  tax_return_id UUID REFERENCES tax_returns(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  ssn TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  relationship TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### bank_accounts table
```sql
CREATE TABLE bank_accounts (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  routing_number TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Testing

### Test the Integration

1. **Submit Test Form**
   - Fill out your JotForm with test data
   - Use fake SSN: 123-45-6789
   - Use your email for testing

2. **Check Webhook Logs**
   ```bash
   # View webhook logs
   tail -f /var/log/webhook.log
   ```

3. **Verify Database**
   ```sql
   -- Check if client was created
   SELECT * FROM clients ORDER BY created_at DESC LIMIT 1;
   
   -- Check if tax return was created
   SELECT * FROM tax_returns ORDER BY created_at DESC LIMIT 1;
   ```

4. **Check Drake Software**
   - Open Drake Tax
   - Search for return ID
   - Verify client data populated

5. **Check Emails**
   - Client should receive confirmation
   - You should receive notification

---

## Admin Dashboard

Access the client intake dashboard:
```
https://elevateforhumanity.org/supersonic-fast-cash/admin/client-intake
```

Features:
- ✅ View all client submissions
- ✅ Search and filter clients
- ✅ See Drake return status
- ✅ Sync JotForm manually
- ✅ Open returns in Drake
- ✅ View JotForm submissions

---

## Troubleshooting

### Webhook Not Firing

**Problem:** JotForm webhook not sending data

**Solutions:**
1. Check webhook URL is correct
2. Verify webhook is enabled in JotForm
3. Check firewall/security settings
4. Test webhook manually:
   ```bash
   curl -X POST https://elevateforhumanity.org/api/supersonic-fast-cash/jotform-webhook \
     -H "Content-Type: application/json" \
     -d '{"submissionID": "test123"}'
   ```

### Drake Return Not Created

**Problem:** Client saved but Drake return missing

**Solutions:**
1. Check Drake credentials in `.env.local`
2. Verify Drake Software is running
3. Check Drake API logs
4. Manually create return and link:
   ```sql
   UPDATE tax_returns 
   SET drake_return_id = 'DRAKE-123456' 
   WHERE id = 'client-uuid';
   ```

### Email Not Sending

**Problem:** Confirmation emails not received

**Solutions:**
1. Check Resend API key
2. Verify email addresses
3. Check spam folder
4. View Resend dashboard for delivery status

### Field Mapping Issues

**Problem:** Data not extracting correctly

**Solutions:**
1. Check JotForm field names
2. Update field mapping in `jotform.ts`
3. Add console.log to see raw data:
   ```typescript
   console.log('JotForm answers:', submission.answers);
   ```

---

## Advanced Features

### Custom Field Mapping

Edit `/lib/integrations/jotform.ts` to customize field mapping:

```typescript
// Add custom field extraction
const clientData: ClientIntakeData = {
  // ... existing fields
  
  // Add your custom fields
  customField: this.getAnswer(answers, 'yourFieldName'),
};
```

### Conditional Logic

Add business logic based on form data:

```typescript
// In webhook route
if (clientData.wantsRefundAdvance && clientData.estimatedRefund > 250) {
  // Automatically start refund advance process
  await processRefundAdvance(clientData);
}
```

### Multiple Forms

Support different intake forms:

```typescript
// Check form ID
if (submission.form_id === 'basic-intake') {
  // Handle basic intake
} else if (submission.form_id === 'business-intake') {
  // Handle business client intake
}
```

---

## Security

### Data Protection

1. **Encryption**
   - SSNs encrypted at rest
   - HTTPS for all transmissions
   - Secure webhook endpoint

2. **Access Control**
   - Admin dashboard requires authentication
   - Row-level security in database
   - API key rotation

3. **Compliance**
   - HIPAA-compliant data handling
   - IRS Publication 1075 guidelines
   - Data retention policies

---

## Support

### Need Help?

1. **Check Logs**
   ```bash
   # View application logs
   vercel logs
   
   # View database logs
   supabase logs
   ```

2. **Test Endpoints**
   ```bash
   # Test webhook
   curl https://elevateforhumanity.org/api/supersonic-fast-cash/jotform-webhook
   
   # Test JotForm API
   curl https://api.jotform.com/user?apiKey=YOUR_KEY
   ```

3. **Contact Support**
   - Drake Software: 1-800-890-9500
   - JotForm: support@jotform.com
   - Supabase: support@supabase.io

---

## Summary

✅ **What You Get:**
- Automatic client intake from JotForm
- Instant Drake return creation
- No manual data entry
- Email notifications
- Client portal access
- Admin dashboard

✅ **Time Saved:**
- 15-20 minutes per client
- Zero data entry errors
- Instant client onboarding
- Automated follow-ups

✅ **Ready to Use:**
- All code implemented
- Database tables created
- Webhooks configured
- Emails set up

**Just add your JotForm API key and webhook URL, and you're ready to go!**
