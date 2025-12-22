# 🔗 Webhook Configuration Guide

## Overview

Configure partner webhooks to enable automatic student progression through multi-partner training sequences.

---

## 🔐 Step 1: Generate Webhook Secret

### Create a Secure Secret

```bash
# Generate a secure random secret (32 characters)
openssl rand -base64 32
```

**Example output:**
```
Kx7mP9nQ2wR5tY8uI1oL4aS6dF3gH0jK
```

### Add to Environment Variables

**In Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add new variable:
   - **Name:** `PARTNER_WEBHOOK_SECRET`
   - **Value:** `<your-generated-secret>`
   - **Environments:** Production, Preview, Development

**In Local `.env.local`:**
```env
PARTNER_WEBHOOK_SECRET=Kx7mP9nQ2wR5tY8uI1oL4aS6dF3gH0jK
```

---

## 📋 Step 2: Partner Webhook Endpoints

### Production URLs

Configure these endpoints with each partner:

| Partner | Webhook URL |
|---------|-------------|
| **HSI** | `https://www.elevateforhumanity.org/api/webhooks/partners/hsi` |
| **Certiport** | `https://www.elevateforhumanity.org/api/webhooks/partners/certiport` |
| **CareerSafe** | `https://www.elevateforhumanity.org/api/webhooks/partners/careersafe` |
| **JRI** | `https://www.elevateforhumanity.org/api/webhooks/partners/jri` |
| **Milady** | `https://www.elevateforhumanity.org/api/webhooks/partners/milady` |
| **NRF** | `https://www.elevateforhumanity.org/api/webhooks/partners/nrf` |
| **NDS** | `https://www.elevateforhumanity.org/api/webhooks/partners/nds` |

### Development URLs (Testing)

| Partner | Webhook URL |
|---------|-------------|
| **HSI** | `http://localhost:3000/api/webhooks/partners/hsi` |
| **Certiport** | `http://localhost:3000/api/webhooks/partners/certiport` |
| **CareerSafe** | `http://localhost:3000/api/webhooks/partners/careersafe` |
| **JRI** | `http://localhost:3000/api/webhooks/partners/jri` |
| **Milady** | `http://localhost:3000/api/webhooks/partners/milady` |
| **NRF** | `http://localhost:3000/api/webhooks/partners/nrf` |
| **NDS** | `http://localhost:3000/api/webhooks/partners/nds` |

---

## 🎯 Step 3: Configure Each Partner

### HSI (Health & Safety Institute)

**Contact:** HSI Technical Support  
**Portal:** HSI Partner Dashboard

**Configuration:**
1. Login to HSI partner portal
2. Navigate to: Settings → Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/hsi`
   - **Secret:** `<your-webhook-secret>`
   - **Events:** 
     - ✅ `course.completed`
     - ✅ `certificate.issued`
     - ✅ `enrollment.created`
4. Save and test

**Expected Events:**
```json
{
  "event": "course.completed",
  "student_id": "external-student-id",
  "course_id": "hsi-course-123",
  "completed_at": "2025-12-22T10:30:00Z",
  "certificate_url": "https://hsi.com/cert/123"
}
```

---

### Certiport

**Contact:** Certiport Partner Support  
**Portal:** Certiport Partner Center

**Configuration:**
1. Login to Certiport partner portal
2. Navigate to: Integration → Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/certiport`
   - **Secret:** `<your-webhook-secret>`
   - **Events:**
     - ✅ `exam.completed`
     - ✅ `certification.issued`
     - ✅ `enrollment.created`
4. Save and test

**Expected Events:**
```json
{
  "event": "exam.completed",
  "student_id": "external-student-id",
  "exam_id": "certiport-exam-456",
  "score": 850,
  "passed": true,
  "completed_at": "2025-12-22T11:00:00Z"
}
```

---

### CareerSafe (OSHA)

**Contact:** CareerSafe Support  
**Portal:** CareerSafe Admin Portal

**Configuration:**
1. Login to CareerSafe admin portal
2. Navigate to: Settings → API & Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/careersafe`
   - **Secret:** `<your-webhook-secret>`
   - **Events:**
     - ✅ `training.completed`
     - ✅ `certificate.issued`
4. Save and test

**Expected Events:**
```json
{
  "event": "training.completed",
  "student_id": "external-student-id",
  "training_id": "osha-10-789",
  "completed_at": "2025-12-22T12:00:00Z",
  "certificate_number": "OSHA-123456"
}
```

---

### JRI (Job Readiness Initiative)

**Contact:** JRI Technical Team  
**Portal:** JRI Partner Dashboard

**Configuration:**
1. Login to JRI partner portal
2. Navigate to: Integrations → Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/jri`
   - **Secret:** `<your-webhook-secret>`
   - **Events:**
     - ✅ `module.completed`
     - ✅ `program.completed`
     - ✅ `certificate.issued`
4. Save and test

**Expected Events:**
```json
{
  "event": "module.completed",
  "student_id": "external-student-id",
  "module_id": "jri-module-101",
  "completed_at": "2025-12-22T13:00:00Z"
}
```

---

### Milady RISE

**Contact:** Milady Support  
**Portal:** Milady Partner Portal

**Configuration:**
1. Login to Milady partner portal
2. Navigate to: Settings → Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/milady`
   - **Secret:** `<your-webhook-secret>`
   - **Events:**
     - ✅ `course.completed`
     - ✅ `assessment.passed`
     - ✅ `certificate.issued`
4. Save and test

**Expected Events:**
```json
{
  "event": "course.completed",
  "student_id": "external-student-id",
  "course_id": "milady-cosmo-202",
  "completed_at": "2025-12-22T14:00:00Z",
  "grade": "A"
}
```

---

### NRF (National Retail Federation)

**Contact:** NRF Rise Up Support  
**Portal:** NRF Rise Up Partner Portal

**Configuration:**
1. Login to NRF Rise Up partner portal
2. Navigate to: Settings → Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/nrf`
   - **Secret:** `<your-webhook-secret>`
   - **Events:**
     - ✅ `course.completed`
     - ✅ `module.completed`
     - ✅ `certificate.issued`
4. Save and test

**Expected Events:**
```json
{
  "event": "course.completed",
  "student_id": "external-student-id",
  "course_id": "nrf-retail-303",
  "completed_at": "2025-12-22T15:00:00Z",
  "certificate_url": "https://nrf.com/cert/456"
}
```

---

### NDS (National Drug Screening)

**Contact:** NDS Support  
**Portal:** NDS Partner Portal

**Configuration:**
1. Login to NDS partner portal
2. Navigate to: Integration → Webhooks
3. Add new webhook:
   - **URL:** `https://www.elevateforhumanity.org/api/webhooks/partners/nds`
   - **Secret:** `<your-webhook-secret>`
   - **Events:**
     - ✅ `training.completed`
     - ✅ `certification.issued`
     - ✅ `enrollment.created`
4. Save and test

**Expected Events:**
```json
{
  "event": "training.completed",
  "student_id": "external-student-id",
  "training_id": "nds-dot-drug-awareness",
  "completed_at": "2025-12-22T16:00:00Z",
  "certificate_number": "NDS-123456"
}
```

---

## 🧪 Step 4: Test Webhooks

### Test Each Endpoint

```bash
# Set your webhook secret
export WEBHOOK_SECRET="your-webhook-secret-here"

# Test HSI webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/hsi \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "course.completed",
    "student_id": "test-student-123",
    "course_id": "test-course-456",
    "completed_at": "2025-12-22T10:00:00Z"
  }'

# Test Certiport webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/certiport \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "exam.completed",
    "student_id": "test-student-123",
    "exam_id": "test-exam-789",
    "passed": true,
    "completed_at": "2025-12-22T11:00:00Z"
  }'

# Test CareerSafe webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/careersafe \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "training.completed",
    "student_id": "test-student-123",
    "training_id": "osha-10",
    "completed_at": "2025-12-22T12:00:00Z"
  }'

# Test JRI webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/jri \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "module.completed",
    "student_id": "test-student-123",
    "module_id": "jri-101",
    "completed_at": "2025-12-22T13:00:00Z"
  }'

# Test Milady webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/milady \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "course.completed",
    "student_id": "test-student-123",
    "course_id": "milady-202",
    "completed_at": "2025-12-22T14:00:00Z"
  }'

# Test NRF webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/nrf \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "course.completed",
    "student_id": "test-student-123",
    "course_id": "nrf-303",
    "completed_at": "2025-12-22T15:00:00Z"
  }'

# Test NDS webhook
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/nds \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
  -d '{
    "event": "training.completed",
    "student_id": "test-student-123",
    "training_id": "nds-404",
    "completed_at": "2025-12-22T16:00:00Z"
  }'
```

### Expected Response

**Success (200 OK):**
```json
{
  "success": true
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid signature"
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Internal server error"
}
```

---

## 📊 Step 5: Monitor Webhooks

### Check Webhook Logs

**In Vercel Dashboard:**
1. Go to Deployments → Select deployment
2. Click "Functions" tab
3. Find `/api/webhooks/partners/[partner]`
4. View logs for webhook calls

**In Supabase:**
```sql
-- Check recent enrollment step updates
SELECT 
  es.id,
  es.status,
  es.completed_at,
  plp.provider_name,
  e.user_id
FROM enrollment_steps es
JOIN partner_lms_providers plp ON plp.id = es.provider_id
JOIN enrollments e ON e.id = es.enrollment_id
WHERE es.updated_at > NOW() - INTERVAL '1 hour'
ORDER BY es.updated_at DESC;
```

### Monitor Auto-Advancement

```sql
-- Check students who auto-advanced today
SELECT 
  p.full_name,
  plp.provider_name,
  es.status,
  es.started_at,
  es.completed_at
FROM enrollment_steps es
JOIN enrollments e ON e.id = es.enrollment_id
JOIN profiles p ON p.id = e.user_id
JOIN partner_lms_providers plp ON plp.id = es.provider_id
WHERE DATE(es.started_at) = CURRENT_DATE
ORDER BY es.started_at DESC;
```

---

## 🔒 Security Best Practices

### Webhook Secret Management

1. **Never commit secrets to git**
   ```bash
   # Add to .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Rotate secrets regularly**
   - Generate new secret every 90 days
   - Update in Vercel and partner portals
   - Test all webhooks after rotation

3. **Use different secrets per environment**
   - Production: Strong 32+ character secret
   - Staging: Different secret
   - Development: Different secret

### Signature Verification

The webhook handler automatically verifies signatures:

```typescript
// In webhook handler
const signature = request.headers.get('x-webhook-signature');
const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

if (!isValid) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
}
```

---

## 🚨 Troubleshooting

### Webhook Not Received

**Check:**
1. ✅ Webhook URL is correct
2. ✅ Partner has correct endpoint configured
3. ✅ Webhook secret matches
4. ✅ Firewall allows incoming webhooks
5. ✅ SSL certificate is valid

**Debug:**
```bash
# Test endpoint is reachable
curl -I https://www.elevateforhumanity.org/api/webhooks/partners/hsi

# Should return: HTTP/2 405 (Method Not Allowed for GET)
# This confirms endpoint exists
```

### Signature Verification Fails

**Check:**
1. ✅ `PARTNER_WEBHOOK_SECRET` environment variable is set
2. ✅ Secret matches what partner has configured
3. ✅ No extra whitespace in secret
4. ✅ Secret is not URL-encoded

**Debug:**
```bash
# Check environment variable
echo $PARTNER_WEBHOOK_SECRET

# Test with correct secret
curl -X POST https://www.elevateforhumanity.org/api/webhooks/partners/hsi \
  -H "X-Webhook-Secret: $PARTNER_WEBHOOK_SECRET" \
  -d '{"event":"test"}'
```

### Auto-Advancement Not Working

**Check:**
1. ✅ `SUPABASE_SERVICE_ROLE_KEY` is set
2. ✅ Enrollment steps exist for enrollment
3. ✅ Current step status is `in_progress`
4. ✅ Next step exists with status `pending`

**Debug:**
```sql
-- Check enrollment steps
SELECT * FROM enrollment_steps 
WHERE enrollment_id = '<enrollment-id>'
ORDER BY sequence_order;

-- Check if function exists
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'mark_step_complete';
```

---

## ✅ Configuration Checklist

Use this checklist to verify webhook configuration:

### Environment Variables
- [ ] `PARTNER_WEBHOOK_SECRET` set in Vercel
- [ ] `PARTNER_WEBHOOK_SECRET` set in `.env.local`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` set correctly

### Partner Configuration
- [ ] HSI webhook configured
- [ ] Certiport webhook configured
- [ ] CareerSafe webhook configured
- [ ] JRI webhook configured
- [ ] Milady webhook configured

### Testing
- [ ] HSI webhook tested successfully
- [ ] Certiport webhook tested successfully
- [ ] CareerSafe webhook tested successfully
- [ ] JRI webhook tested successfully
- [ ] Milady webhook tested successfully

### Monitoring
- [ ] Vercel logs accessible
- [ ] Supabase queries working
- [ ] Admin dashboard showing data
- [ ] Student progress updating

---

## 📞 Partner Contact Information

### HSI (Health & Safety Institute)
- **Support:** support@hsi.com
- **Phone:** 1-800-XXX-XXXX
- **Portal:** https://partner.hsi.com

### Certiport
- **Support:** partnersupport@certiport.com
- **Phone:** 1-800-XXX-XXXX
- **Portal:** https://partner.certiport.com

### CareerSafe
- **Support:** support@careersafe.com
- **Phone:** 1-800-XXX-XXXX
- **Portal:** https://admin.careersafe.com

### JRI (Job Readiness Initiative)
- **Support:** tech@jri.org
- **Phone:** 1-800-XXX-XXXX
- **Portal:** https://partner.jri.org

### Milady RISE
- **Support:** support@milady.com
- **Phone:** 1-800-XXX-XXXX
- **Portal:** https://partner.milady.com

### NRF (National Retail Federation)
- **Support:** riseup@nrf.com
- **Phone:** 1-800-XXX-XXXX
- **Portal:** https://riseup.nrf.com/partner

### NDS (National Drug Screening)
- **Support:** support@nationaldrugscreening.com
- **Phone:** 1-866-843-4545
- **Portal:** https://partner.nationaldrugscreening.com

---

## 🎉 Next Steps

After webhook configuration:

1. **Monitor First Enrollments**
   - Watch admin dashboard
   - Check webhook logs
   - Verify auto-advancement

2. **Set Up Alerts**
   - Webhook failures
   - Stuck students
   - Completion anomalies

3. **Document Partner-Specific Details**
   - Custom event formats
   - Special handling requirements
   - Contact information

4. **Launch!** 🚀

---

**Configuration Time:** ~30 minutes per partner  
**Total Time:** ~2.5 hours for all 5 partners  
**Status:** Ready to configure
