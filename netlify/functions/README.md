# Netlify Functions - Elevate for Humanity

Serverless functions for enrollment sync, job tracking, reporting, and payments.

## Functions

### 1. enrollment-sync.js
**Purpose:** Sync student enrollments from external systems to Supabase  
**Endpoint:** `POST /.netlify/functions/enrollment-sync`  
**Use case:** Google Forms, Zapier, manual API calls

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "317-555-0100",
  "program_id": "tax-business",
  "program_name": "Tax Business Start-Up",
  "enrollment_date": "2025-01-27T00:00:00Z",
  "funding_source": "WIOA",
  "status": "pending",
  "metadata": {}
}
```

**Response:**
```json
{
  "success": true,
  "student_id": "uuid",
  "enrollment_id": "uuid",
  "message": "Enrollment synced successfully"
}
```

### 2. job-placement-tracking.js
**Purpose:** Track student job placements and outcomes  
**Endpoints:**
- `GET /.netlify/functions/job-placement-tracking` - Get placements & stats
- `POST /.netlify/functions/job-placement-tracking` - Record new placement

**POST Request:**
```json
{
  "student_id": "uuid",
  "employer_name": "ABC Company",
  "job_title": "Tax Preparer",
  "starting_salary": 45000,
  "employment_type": "full-time",
  "placement_date": "2025-01-27T00:00:00Z",
  "industry": "Financial Services",
  "location": "Indianapolis, IN",
  "benefits": {
    "health_insurance": true,
    "401k": true,
    "pto_days": 15
  },
  "notes": "Placed through employer partner program"
}
```

**GET Response:**
```json
{
  "placements": [...],
  "stats": {
    "total_placements": 150,
    "placements_last_30_days": 12,
    "average_salary": 45000,
    "placement_rate": 92,
    "by_program": {...},
    "by_funding_source": {...}
  }
}
```

### 3. automated-reporting.js
**Purpose:** Generate automated reports for compliance and stakeholders  
**Endpoint:** `POST /.netlify/functions/automated-reporting`

**Request:**
```json
{
  "report_type": "monthly",
  "start_date": "2025-01-01T00:00:00Z",
  "end_date": "2025-01-31T23:59:59Z"
}
```

**Report Types:**
- `monthly` - Monthly summary report
- `wioa` - WIOA compliance report
- `placement` - Job placement report
- `financial` - Financial/revenue report

**Response:**
```json
{
  "success": true,
  "report_id": "uuid",
  "report": {
    "period": {...},
    "enrollments": {...},
    "completions": {...},
    "placements": {...}
  }
}
```

### 4. create-checkout-session.js
**Purpose:** Create Stripe checkout session for payments  
**Endpoint:** `POST /.netlify/functions/create-checkout-session`

### 5. create-enrollment-session.js
**Purpose:** Create Stripe checkout session for program enrollment  
**Endpoint:** `POST /.netlify/functions/create-enrollment-session`

### 6. stripe-webhook.js
**Purpose:** Handle Stripe webhook events  
**Endpoint:** `POST /.netlify/functions/stripe-webhook`

## Setup

### 1. Environment Variables

Add these to Netlify Dashboard → Site settings → Environment variables:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

### 2. Database Setup

Run the migration to create required tables:

```bash
# Using Supabase CLI
supabase db push

# Or manually run the SQL in Supabase Dashboard
# File: supabase/migrations/20250127_create_automation_tables.sql
```

### 3. Deploy

Functions are automatically deployed when you push to main:

```bash
git add netlify/functions/
git commit -m "feat: add automation functions"
git push origin main
```

## Usage Examples

### Zapier Integration (Enrollment Sync)

1. Create Zap: Google Forms → Webhooks by Zapier
2. Configure webhook:
   - URL: `https://elevateforhumanity.org/.netlify/functions/enrollment-sync`
   - Method: POST
   - Data: Map form fields to JSON structure
3. Test and activate

### Manual API Call (Job Placement)

```bash
curl -X POST https://elevateforhumanity.org/.netlify/functions/job-placement-tracking \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "uuid-here",
    "employer_name": "ABC Company",
    "job_title": "Tax Preparer",
    "starting_salary": 45000
  }'
```

### Scheduled Reports (GitHub Actions)

Create `.github/workflows/monthly-report.yml`:

```yaml
name: Monthly Report

on:
  schedule:
    - cron: '0 9 1 * *'  # 9am on 1st of month
  workflow_dispatch:

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - name: Generate report
        run: |
          curl -X POST https://elevateforhumanity.org/.netlify/functions/automated-reporting \
            -H "Content-Type: application/json" \
            -d '{"report_type": "monthly"}'
```

## Testing Locally

### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. Set Environment Variables

Create `.env` file:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_test_your_key
```

### 3. Run Functions Locally

```bash
netlify dev
```

Functions available at:
- http://localhost:8888/.netlify/functions/enrollment-sync
- http://localhost:8888/.netlify/functions/job-placement-tracking
- http://localhost:8888/.netlify/functions/automated-reporting

### 4. Test with curl

```bash
# Test enrollment sync
curl -X POST http://localhost:8888/.netlify/functions/enrollment-sync \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "phone": "317-555-0100",
    "program_id": "test-program",
    "program_name": "Test Program"
  }'
```

## Monitoring

### View Function Logs

1. Go to Netlify Dashboard
2. Click on your site
3. Navigate to **Functions** tab
4. Click on function name
5. View logs and invocations

### Error Tracking

Errors are logged to:
- Netlify function logs
- Supabase activity_log table
- (Optional) Sentry integration

## Security

### API Authentication

For production, add authentication:

```javascript
// Add to function handler
const apiKey = event.headers['x-api-key'];
if (apiKey !== process.env.API_KEY) {
  return {
    statusCode: 401,
    body: JSON.stringify({ error: 'Unauthorized' }),
  };
}
```

### Rate Limiting

Netlify provides built-in rate limiting:
- Free tier: 125k requests/month
- Pro tier: 1M requests/month

### CORS

CORS is configured to allow all origins (`*`). For production, restrict to your domain:

```javascript
const headers = {
  'Access-Control-Allow-Origin': 'https://elevateforhumanity.org',
  // ...
};
```

## Troubleshooting

### Function not found (404)

- Check function name matches file name
- Ensure function is in `netlify/functions/` directory
- Redeploy site

### Database connection error

- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in Netlify env vars
- Check Supabase project is active
- Verify RLS policies allow service role access

### Timeout errors

- Netlify functions timeout after 10 seconds (free) or 26 seconds (pro)
- Optimize database queries
- Use indexes on frequently queried columns
- Consider background jobs for long-running tasks

## Next Steps

1. ✅ Deploy functions to Netlify
2. ✅ Run database migration
3. ✅ Test each function
4. ✅ Integrate with Google Forms/Zapier
5. ✅ Set up scheduled reports
6. ✅ Add error monitoring (Sentry)
7. ✅ Document API for team

## Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Stripe API Reference](https://stripe.com/docs/api)
