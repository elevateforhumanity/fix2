# 🔌 API Routes

## Complete List of API Endpoints

### 1. License Purchase

**Endpoint:** `POST /api/licenses/purchase`

**Purpose:** Create Stripe checkout session for license purchase

**Request Body:**

```json
{
  "plan_id": "professional",
  "license_type": "professional_license",
  "lms_model": "hybrid",
  "max_enrollments": 200,
  "can_create_courses": true,
  "can_upload_scorm": false,
  "price": 299
}
```

**Response:**

```json
{
  "sessionId": "cs_test_..."
}
```

**Integration:** Stripe Checkout API

---

### 2. Enrollment Creation

**Endpoint:** `POST /api/enrollments/create`

**Purpose:** Create enrollment with license validation

**Request Body:**

```json
{
  "program_id": "uuid",
  "license_key": "LICENSE-KEY-123"
}
```

**Response:**

```json
{
  "success": true,
  "enrollment": { ... },
  "message": "Enrollment created successfully"
}
```

**Validation:**

- Checks license validity
- Verifies enrollment eligibility
- Tracks license usage

---

### 3. Notification Send

**Endpoint:** `POST /api/notifications/send`

**Purpose:** Send notifications (in-app, email, SMS)

**Request Body:**

```json
{
  "user_id": "uuid",
  "type": "enrollment_created",
  "title": "Enrollment Confirmed",
  "message": "You have been enrolled",
  "link": "/enrollments/123",
  "send_email": true,
  "send_sms": false
}
```

**Response:**

```json
{
  "success": true,
  "notification": { ... },
  "message": "Notification sent successfully"
}
```

**Features:**

- In-app notification creation
- Email sending (optional)
- SMS sending (optional)

---

## Authentication

All API routes require authentication via NextAuth/Supabase.

## Error Handling

All routes return proper error responses:

```json
{
  "error": "Error message here"
}
```

## Rate Limiting

Rate limiting implemented via Upstash Redis.
