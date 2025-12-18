# API Documentation - Elevate for Humanity

**Version**: 1.0.0  
**Base URL**: `https://www.elevateforhumanity.org/api`  
**Authentication**: Supabase JWT (where required)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Applications & Enrollment](#applications--enrollment)
3. [Email System](#email-system)
4. [Course Management](#course-management)
5. [Payment Processing](#payment-processing)
6. [Admin Endpoints](#admin-endpoints)
7. [Health & Monitoring](#health--monitoring)
8. [Rate Limits](#rate-limits)
9. [Error Codes](#error-codes)

---

## Authentication

Most endpoints require authentication via Supabase JWT token.

**Headers Required:**
```
Authorization: Bearer <jwt_token>
```

**Getting a Token:**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

---

## Applications & Enrollment

### Submit Application

**Endpoint:** `POST /api/applications`

**Description:** Submit a new student application

**Rate Limit:** 3 requests per minute per IP

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "317-555-0100",
  "city": "Indianapolis",
  "zip": "46204",
  "program": "hvac-technician",
  "preferredContact": "email",
  "hasCaseManager": "no",
  "supportNeeds": "Transportation assistance"
}
```

**Response (200):**
```json
{
  "ok": true,
  "id": "uuid-here"
}
```

**Response (400):**
```json
{
  "error": "Missing required field: email"
}
```

**Response (429):**
```json
{
  "error": "Too many requests. Please try again in a minute."
}
```

---

### Submit Quick Inquiry

**Endpoint:** `POST /api/inquiries`

**Description:** Submit a quick inquiry form

**Rate Limit:** 3 requests per minute per IP

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "317-555-0100",
  "program": "barber-apprenticeship",
  "message": "I'm interested in learning more"
}
```

**Response (200):**
```json
{
  "ok": true,
  "id": "uuid-here"
}
```

---

### Create Enrollment Checkout

**Endpoint:** `POST /api/enroll/checkout`

**Description:** Create Stripe checkout session for enrollment payment

**Authentication:** Optional (creates guest checkout if not authenticated)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "317-555-0100",
  "programSlug": "hvac-technician"
}
```

**Response (200):**
```json
{
  "ok": true,
  "checkoutUrl": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

**Response (503):**
```json
{
  "error": "Payment system not configured. Please contact support."
}
```

---

## Email System

### Send Email

**Endpoint:** `POST /api/email/send`

**Description:** Send transactional email (internal use)

**Authentication:** Required (service role)

**Request Body:**
```json
{
  "to": "user@example.com",
  "subject": "Welcome to Elevate",
  "html": "<h1>Welcome!</h1><p>Thank you for joining.</p>",
  "text": "Welcome! Thank you for joining."
}
```

**Response (200):**
```json
{
  "ok": true,
  "id": "email-id-from-provider"
}
```

**Response (400):**
```json
{
  "error": "Missing required fields: to, subject, and html or text"
}
```

---

### Get Email Statistics

**Endpoint:** `GET /api/admin/email-stats?timeframe=24h`

**Description:** Get email delivery statistics

**Authentication:** Required (admin only)

**Query Parameters:**
- `timeframe`: `24h` | `7d` | `30d` (default: `24h`)

**Response (200):**
```json
{
  "stats": {
    "total": 150,
    "sent": 148,
    "failed": 2,
    "pending": 0,
    "successRate": "98.67",
    "failureRate": "1.33",
    "byProvider": {
      "resend": 148,
      "sendgrid": 0,
      "fallback": 2
    }
  },
  "failures": [
    {
      "to": "invalid@example.com",
      "subject": "Welcome Email",
      "error_message": "Invalid email address",
      "created_at": "2024-12-18T10:30:00Z"
    }
  ],
  "health": {
    "status": "healthy",
    "message": "100% delivery success"
  },
  "timeframe": "24h"
}
```

---

## Course Management

### Complete Course

**Endpoint:** `POST /api/lms/progress/complete`

**Description:** Mark a course as completed

**Authentication:** Required (student)

**Request Body (JSON):**
```json
{
  "courseId": "uuid-here",
  "evidenceUrl": "https://storage.example.com/certificate.pdf"
}
```

**Request Body (FormData):**
```
courseId=uuid-here
evidenceUrl=https://storage.example.com/certificate.pdf
```

**Response (200):**
```json
{
  "success": true
}
```

**Response (401):**
```json
{
  "error": "Unauthorized"
}
```

**Response (400):**
```json
{
  "error": "Missing courseId"
}
```

---

### Complete Lesson

**Endpoint:** `POST /api/courses/[courseId]/lessons/[lessonId]/complete`

**Description:** Mark a lesson as completed

**Authentication:** Required (student)

**Response (200):**
```json
{
  "success": true
}
```

---

### Update Video Progress

**Endpoint:** `POST /api/courses/[courseId]/lessons/[lessonId]/progress`

**Description:** Update video playback progress

**Authentication:** Required (student)

**Request Body:**
```json
{
  "progress": 125
}
```

**Response (200):**
```json
{
  "success": true
}
```

---

## Payment Processing

### Stripe Webhook

**Endpoint:** `POST /api/stripe/webhook`

**Description:** Handle Stripe webhook events (internal)

**Authentication:** Stripe signature verification

**Events Handled:**
- `checkout.session.completed` - Auto-enrollment
- `customer.subscription.created` - Subscription activation
- `customer.subscription.updated` - Subscription update
- `customer.subscription.deleted` - Subscription cancellation

**Expected Metadata:**
```json
{
  "student_id": "uuid",
  "program_id": "uuid",
  "program_slug": "hvac-technician",
  "funding_source": "WIOA"
}
```

**Response (200):**
```json
{
  "ok": true
}
```

---

### Create Funding Checkout

**Endpoint:** `POST /api/funding/create-checkout`

**Description:** Create checkout session for sponsor-paid enrollment

**Authentication:** Required (admin)

**Request Body:**
```json
{
  "studentId": "uuid",
  "programId": "uuid",
  "programSlug": "hvac-technician",
  "fundingSource": "WIOA"
}
```

**Response (200):**
```json
{
  "ok": true,
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

---

## Admin Endpoints

### Get All Applications

**Endpoint:** `GET /api/admin/applications`

**Description:** Get all student applications

**Authentication:** Required (admin)

**Query Parameters:**
- `status`: Filter by status (`pending`, `accepted`, `rejected`)
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset

**Response (200):**
```json
{
  "applications": [
    {
      "id": "uuid",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "program_id": "hvac-technician",
      "status": "pending",
      "payment_status": "pending",
      "created_at": "2024-12-18T10:00:00Z"
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

---

### Get Enrollment Statistics

**Endpoint:** `GET /api/admin/enrollments/stats`

**Description:** Get enrollment statistics

**Authentication:** Required (admin)

**Response (200):**
```json
{
  "total": 500,
  "active": 350,
  "completed": 120,
  "withdrawn": 30,
  "byProgram": {
    "hvac-technician": 150,
    "barber-apprenticeship": 100,
    "cna": 80
  },
  "recentEnrollments": [
    {
      "student_name": "John Doe",
      "program_name": "HVAC Technician",
      "enrolled_at": "2024-12-18T09:00:00Z"
    }
  ]
}
```

---

## Health & Monitoring

### Health Check

**Endpoint:** `GET /api/health`

**Description:** System health check

**Authentication:** None

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-18T10:00:00Z",
  "checks": {
    "database": "ok",
    "api": "ok"
  },
  "responseTime": "45ms",
  "version": "1.0.0"
}
```

**Response (503):**
```json
{
  "status": "degraded",
  "timestamp": "2024-12-18T10:00:00Z",
  "checks": {
    "database": "error",
    "api": "ok"
  },
  "responseTime": "1200ms",
  "version": "1.0.0"
}
```

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/applications` | 3 requests | 1 minute |
| `/api/inquiries` | 3 requests | 1 minute |
| `/api/auth/login` | 5 requests | 15 minutes |
| `/api/auth/signup` | 5 requests | 15 minutes |
| General API | 200 requests | 1 hour |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 1702900800
```

**Rate Limit Response (429):**
```json
{
  "error": "Too many requests. Please try again later."
}
```

---

## Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error occurred |
| 503 | Service Unavailable | Service temporarily unavailable |

**Standard Error Response:**
```json
{
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": {}
}
```

---

## Webhooks

### Stripe Webhook Configuration

**URL:** `https://www.elevateforhumanity.org/api/stripe/webhook`

**Events to Subscribe:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**Signature Verification:** Required via `STRIPE_WEBHOOK_SECRET`

---

## SDK Examples

### JavaScript/TypeScript

```typescript
// Submit application
const response = await fetch('https://www.elevateforhumanity.org/api/applications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '317-555-0100',
    city: 'Indianapolis',
    zip: '46204',
    program: 'hvac-technician',
    preferredContact: 'email',
  }),
});

const data = await response.json();
console.log(data);
```

### cURL

```bash
# Submit application
curl -X POST https://www.elevateforhumanity.org/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "317-555-0100",
    "city": "Indianapolis",
    "zip": "46204",
    "program": "hvac-technician",
    "preferredContact": "email"
  }'
```

### Python

```python
import requests

# Submit application
response = requests.post(
    'https://www.elevateforhumanity.org/api/applications',
    json={
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'john@example.com',
        'phone': '317-555-0100',
        'city': 'Indianapolis',
        'zip': '46204',
        'program': 'hvac-technician',
        'preferredContact': 'email'
    }
)

data = response.json()
print(data)
```

---

## Support

**Technical Support:** support@elevateforhumanity.org  
**Phone:** 317-314-3757  
**Documentation:** https://www.elevateforhumanity.org/docs

---

**Last Updated:** December 18, 2024  
**API Version:** 1.0.0
