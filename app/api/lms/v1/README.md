# Universal LMS Public API v1

Complete REST API for multi-tenant LMS platform with full CRUD operations, integrations, and automation.

## Base URL
```
https://yourdomain.com/api/lms/v1
```

## Authentication
All API requests require authentication via API key or JWT token.

```bash
# API Key (Header)
Authorization: Bearer YOUR_API_KEY

# JWT Token (Header)
Authorization: Bearer YOUR_JWT_TOKEN
```

## Rate Limits
- Free: 1,000 requests/day
- Starter: 10,000 requests/day
- Professional: 100,000 requests/day
- Enterprise: Unlimited

## Endpoints

### Tenants
- `POST /tenants` - Create new tenant
- `GET /tenants/:id` - Get tenant details
- `PATCH /tenants/:id` - Update tenant
- `DELETE /tenants/:id` - Delete tenant

### Users
- `POST /users` - Create user
- `GET /users` - List users
- `GET /users/:id` - Get user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Courses
- `POST /courses` - Create course
- `GET /courses` - List courses
- `GET /courses/:id` - Get course
- `PATCH /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `POST /courses/:id/publish` - Publish course

### Enrollments
- `POST /enrollments` - Enroll student
- `GET /enrollments` - List enrollments
- `GET /enrollments/:id` - Get enrollment
- `PATCH /enrollments/:id` - Update enrollment
- `DELETE /enrollments/:id` - Unenroll student

### Progress
- `GET /progress/:enrollmentId` - Get student progress
- `POST /progress/:enrollmentId/lessons/:lessonId` - Update lesson progress
- `POST /progress/:enrollmentId/complete` - Mark course complete

### Certificates
- `GET /certificates` - List certificates
- `GET /certificates/:id` - Get certificate
- `POST /certificates/verify/:code` - Verify certificate

### Applications
- `POST /applications` - Submit application
- `GET /applications` - List applications
- `GET /applications/:id` - Get application
- `PATCH /applications/:id` - Update application status
- `POST /applications/:id/approve` - Approve application
- `POST /applications/:id/reject` - Reject application

### Webhooks
- `POST /webhooks` - Create webhook
- `GET /webhooks` - List webhooks
- `DELETE /webhooks/:id` - Delete webhook

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-11-30T14:30:00Z",
    "requestId": "req_123456"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": { ... }
  },
  "meta": {
    "timestamp": "2024-11-30T14:30:00Z",
    "requestId": "req_123456"
  }
}
```

## Webhooks

Subscribe to events:
- `enrollment.created`
- `enrollment.completed`
- `certificate.issued`
- `application.submitted`
- `application.approved`
- `application.rejected`
- `payment.completed`

## SDKs Available
- JavaScript/TypeScript
- Python
- PHP
- Ruby
- Go
