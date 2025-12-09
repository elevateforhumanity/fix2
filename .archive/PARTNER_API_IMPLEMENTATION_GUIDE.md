# Partner API Implementation Guide

## Quick Start: From Stub to Real Integration

This guide shows how to replace stub implementations with real partner API calls.

---

## Step 1: Get Partner API Documentation

Contact each partner and request:

1. **API Documentation**
   - Base URL
   - Authentication method
   - Available endpoints
   - Request/response formats

2. **API Credentials**
   - API key
   - API secret (if applicable)
   - Organization/Client ID
   - Webhook secret

3. **Webhook Configuration**
   - Supported events
   - Signature verification method
   - Retry policy

---

## Step 2: Add Credentials to Environment

Add to `.env.local`:

```bash
# Example for HSI
HSI_API_BASE_URL=https://api.hsi.com
HSI_API_KEY=abc123...
HSI_API_SECRET=xyz789...
HSI_ORGANIZATION_ID=org_12345
```

Add to Vercel:

```bash
vercel env add HSI_API_BASE_URL
vercel env add HSI_API_KEY
vercel env add HSI_API_SECRET
vercel env add HSI_ORGANIZATION_ID
```

---

## Step 3: Review Partner Implementation

Each partner has a dedicated file in `lib/partners/`:

```typescript
// lib/partners/hsi.ts
export class HsiAPI extends BasePartnerAPI {
  constructor(config: PartnerConfig) {
    super("hsi", config);
  }

  protected getDefaultHeaders(): Record<string, string> {
    return {
      ...super.getDefaultHeaders(),
      "X-API-Key": this.config.apiKey || "",
      "X-Organization-Id": this.config.orgId || "",
    };
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    // TODO: Update endpoint and request format based on partner docs
    const response = await this.httpClient.post<{
      studentId: string;
      username: string;
      loginUrl: string;
    }>("/api/v1/students", {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      organizationId: this.config.orgId,
    });

    return {
      externalId: response.data.studentId,
      username: response.data.username,
      loginUrl: response.data.loginUrl,
    };
  }

  // ... other methods
}
```

---

## Step 4: Adjust Implementation Based on Partner Docs

### Example: HSI API Adjustments

If HSI's actual API uses different field names:

```typescript
// Before (generic implementation)
const response = await this.httpClient.post("/api/v1/students", {
  firstName: student.firstName,
  lastName: student.lastName,
  email: student.email,
});

// After (adjusted to HSI's actual API)
const response = await this.httpClient.post("/api/v2/users/create", {
  first_name: student.firstName,  // HSI uses snake_case
  last_name: student.lastName,
  email_address: student.email,
  org_id: this.config.orgId,
});
```

### Common Adjustments Needed

1. **Endpoint paths**
   ```typescript
   // Generic: "/api/v1/students"
   // Actual: "/v2/users/create"
   ```

2. **Field naming conventions**
   ```typescript
   // Generic: camelCase
   // Actual: snake_case, PascalCase, etc.
   ```

3. **Authentication headers**
   ```typescript
   // Generic: "X-API-Key"
   // Actual: "Authorization: Bearer {token}"
   ```

4. **Response structure**
   ```typescript
   // Generic: { studentId, username, loginUrl }
   // Actual: { data: { user: { id, login, portal_url } } }
   ```

---

## Step 5: Test Each Method

Create a test file:

```typescript
// scripts/test-partner-integration.ts
import { getPartnerClient } from "@/lib/partners";

async function testHsiIntegration() {
  const client = getPartnerClient("hsi");

  console.log("Testing HSI integration...");

  // Test 1: Create account
  console.log("1. Creating account...");
  const account = await client.createAccount({
    id: "test-123",
    email: "test@example.com",
    firstName: "Test",
    lastName: "Student",
  });
  console.log("✅ Account created:", account.externalId);

  // Test 2: Enroll in course
  console.log("2. Enrolling in course...");
  const enrollment = await client.enrollInCourse(
    account.externalId,
    "CPR-AED-ADULT"
  );
  console.log("✅ Enrolled:", enrollment.externalEnrollmentId);

  // Test 3: Get progress
  console.log("3. Getting progress...");
  const progress = await client.getProgress(enrollment.externalEnrollmentId);
  console.log("✅ Progress:", progress?.percentage + "%");

  // Test 4: Get SSO URL
  console.log("4. Generating SSO URL...");
  const ssoUrl = await client.getSsoLaunchUrl({
    accountExternalId: account.externalId,
    externalEnrollmentId: enrollment.externalEnrollmentId,
  });
  console.log("✅ SSO URL:", ssoUrl);

  console.log("\n✅ All tests passed!");
}

testHsiIntegration().catch(console.error);
```

Run test:

```bash
npx tsx scripts/test-partner-integration.ts
```

---

## Step 6: Configure Webhooks

### Register Webhook URL

Contact partner and provide:

```
URL: https://yourdomain.com/api/webhooks/partners/hsi
Method: POST
Events: enrollment.created, progress.updated, course.completed, certificate.issued
```

### Test Webhook Delivery

Use partner's webhook testing tool or:

```bash
curl -X POST https://yourdomain.com/api/webhooks/partners/hsi \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: test-signature" \
  -d '{
    "event": "progress.updated",
    "timestamp": "2024-01-01T00:00:00Z",
    "data": {
      "enrollmentId": "test-enrollment-123",
      "percentage": 50,
      "lessonsCompleted": 3,
      "totalLessons": 6
    }
  }'
```

### Verify Signature Validation

Update signature verification in partner implementation:

```typescript
// lib/partners/hsi.ts
verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Example: HMAC-SHA256 verification
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  
  return signature === expectedSignature;
}
```

---

## Step 7: Monitor and Debug

### Check Logs

```bash
# View partner API logs
vercel logs --filter="PartnerAPI"

# View webhook logs
vercel logs --filter="Webhook"
```

### Check Metrics

```typescript
import { partnerMonitoring } from "@/lib/partners/monitoring";

// Get metrics
const metrics = partnerMonitoring.getMetrics("hsi");
console.log("Success rate:", 
  metrics.successfulRequests / metrics.totalRequests * 100 + "%"
);
console.log("Average response time:", metrics.averageResponseTime + "ms");
console.log("Last error:", metrics.lastError);
```

### Common Issues

**Issue: 401 Unauthorized**
- Check API key is correct
- Verify authentication header format
- Check if API key has expired

**Issue: 404 Not Found**
- Verify endpoint path is correct
- Check API version in URL
- Confirm resource exists

**Issue: 422 Validation Error**
- Check required fields are provided
- Verify field names match partner's API
- Check data types (string vs number)

**Issue: 500 Internal Server Error**
- Check partner's status page
- Verify request format is correct
- Contact partner support

**Issue: Timeout**
- Increase timeout in config
- Check network connectivity
- Verify partner's API is responding

---

## Step 8: Deploy to Production

### Pre-deployment Checklist

- [ ] All API credentials added to Vercel
- [ ] All methods tested successfully
- [ ] Webhooks configured and tested
- [ ] Error handling verified
- [ ] Monitoring alerts configured
- [ ] Documentation updated

### Deploy

```bash
# Deploy to production
vercel --prod

# Verify environment variables
vercel env ls

# Test production endpoints
curl https://yourdomain.com/api/webhooks/partners/hsi
```

---

## Partner-Specific Implementation Notes

### HSI

**API Documentation:** Contact Geoff Albrecht (galbrecht@hsi.com)

**Key Points:**
- RSV enrollments use different endpoint
- Certificates expire after 2 years
- Progress updates via webhook

**Adjustments Needed:**
```typescript
// Enrollment type detection
const enrollmentType = courseExternalCode.includes("RSV") 
  ? "rsv" 
  : "blended";
```

### Certiport

**API Documentation:** Contact Certiport sales team

**Key Points:**
- Voucher generation required before enrollment
- Practice tests separate from certification exams
- OAuth 2.0 authentication

**Adjustments Needed:**
```typescript
// Two-step enrollment process
const voucher = await this.generateVoucher(courseCode);
const enrollment = await this.enrollWithVoucher(voucher.id);
```

### CareerSafe

**API Documentation:** Contact Mark Sattele (Mark.Sattele@careersafeonline.com)

**Key Points:**
- Organization code required
- Temporary passwords provided
- Group enrollment support

**Adjustments Needed:**
```typescript
// Include organization code in all requests
headers: {
  "X-Organization-Code": this.config.orgId,
}
```

### Milady RISE

**API Documentation:** Call 866-848-5143

**Key Points:**
- School ID required
- Promo code: efhcti-rise295
- Bearer token authentication

**Adjustments Needed:**
```typescript
// Include school ID
body: {
  schoolId: this.config.orgId,
  promoCode: "efhcti-rise295",
}
```

### JRI

**API Documentation:** Contact via jri.org

**Key Points:**
- Free courses (no payment)
- Simple API structure
- Basic authentication

### NRF RISE Up

**API Documentation:** Contact via nrf.com/riseup

**Key Points:**
- Partner ID required
- Free retail training
- OAuth 2.0 authentication

### NDS

**API Documentation:** Contact National Drug Screening

**Key Points:**
- Client ID required
- DOT compliance courses
- Certificate expiration tracking

---

## Troubleshooting

### API Key Not Working

1. Verify key is correct (no extra spaces)
2. Check if key has been activated
3. Verify IP whitelist (if applicable)
4. Contact partner support

### Webhook Not Receiving Events

1. Verify webhook URL is publicly accessible
2. Check webhook is registered with partner
3. Verify signature validation is correct
4. Check partner's webhook logs

### High Error Rate

1. Check partner's status page
2. Review error logs for patterns
3. Verify request format hasn't changed
4. Contact partner support

### Slow Response Times

1. Check network latency
2. Verify timeout settings
3. Check partner's API performance
4. Consider caching responses

---

## Summary

✅ **Framework is ready** - All infrastructure in place
✅ **7 partner implementations** - Ready for API adjustments
✅ **Testing tools** - Scripts and monitoring
✅ **Documentation** - Complete setup guide

**Next Steps:**
1. Contact each partner for API documentation
2. Obtain API credentials
3. Adjust implementations based on actual API
4. Test thoroughly
5. Configure webhooks
6. Deploy to production

**Estimated Time per Partner:** 2-4 hours (once API docs received)

**Total Implementation Time:** 14-28 hours for all 7 partners
