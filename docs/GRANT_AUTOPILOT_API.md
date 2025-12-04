# Grant Autopilot API Documentation

Complete API reference for the EFH Grant Autopilot System.

---

## Table of Contents

1. [Authentication](#authentication)
2. [Grant Sync](#grant-sync)
3. [Grant Matching](#grant-matching)
4. [Eligibility Checking](#eligibility-checking)
5. [Draft Generation](#draft-generation)
6. [Federal Forms](#federal-forms)
7. [Package Building](#package-building)
8. [Submission Tracking](#submission-tracking)
9. [Notifications](#notifications)

---

## Authentication

All API endpoints require authentication via Supabase Auth.

```typescript
// Client-side
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Get session token
const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;

// Make authenticated request
const response = await fetch('/api/grants/draft', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ grantId, entityId }),
});
```

---

## Grant Sync

Import grant opportunities from external sources.

### Endpoint
```
POST /api/grants/sync
```

### Request
```json
{}
```

### Response
```json
{
  "ok": true,
  "imported": 2
}
```

### Example
```typescript
const response = await fetch('/api/grants/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});

const data = await response.json();
console.log(`Imported ${data.imported} grants`);
```

---

## Grant Matching

Match entities to grants based on eligibility criteria.

### Endpoint
```
POST /api/grants/match
```

### Request
```json
{}
```

### Response
```json
{
  "ok": true
}
```

### Example
```typescript
const response = await fetch('/api/grants/match', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});

const data = await response.json();
// Matches are stored in grant_matches table
```

---

## Eligibility Checking

Check entity eligibility using SAM.gov data.

### Endpoint
```
POST /api/grants/eligibility
```

### Actions

#### Check Entity Eligibility
```json
{
  "action": "check_entity",
  "entityId": "uuid"
}
```

**Response:**
```json
{
  "entityId": "uuid",
  "entityName": "Elevate for Humanity",
  "uei": "ABC123DEF456",
  "checks": {
    "samRegistered": true,
    "samActive": true,
    "ueiValid": true,
    "cageValid": true,
    "notExcluded": true,
    "repsAndCertsCurrent": true,
    "registrationNotExpired": true
  },
  "issues": [],
  "warnings": ["SAM.gov registration expires in 45 days"],
  "eligible": true,
  "score": 100,
  "checkedAt": "2024-12-04T12:00:00Z"
}
```

#### Check Grant Eligibility
```json
{
  "action": "check_grant",
  "entityId": "uuid",
  "grantId": "uuid"
}
```

**Response:**
```json
{
  "grantId": "uuid",
  "grantTitle": "Workforce Innovation Grant",
  "entityId": "uuid",
  "entityName": "Elevate for Humanity",
  "eligible": true,
  "matchScore": 85,
  "eligibilityCheck": { /* entity check results */ },
  "naicsMatch": true,
  "locationMatch": true,
  "entityTypeMatch": true,
  "reasons": ["NAICS match: 611519, 624190"]
}
```

#### Batch Check All
```json
{
  "action": "batch_check"
}
```

**Response:**
```json
{
  "checked": 15,
  "eligible": 12,
  "ineligible": 3
}
```

---

## Draft Generation

Generate AI-powered grant narratives.

### Endpoint
```
POST /api/grants/draft
```

### Request
```json
{
  "grantId": "uuid",
  "entityId": "uuid"
}
```

### Response
```json
{
  "ok": true,
  "applicationId": "uuid",
  "draft_narrative": "# Project Title\n\n## Statement of Need\n\n..."
}
```

### Example
```typescript
const response = await fetch('/api/grants/draft', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grantId: 'grant-uuid',
    entityId: 'entity-uuid',
  }),
});

const { applicationId, draft_narrative } = await response.json();
```

---

## Federal Forms

Generate pre-filled federal forms.

### Endpoint
```
POST /api/grants/forms
```

### Actions

#### Generate All Forms
```json
{
  "action": "generate_all",
  "applicationId": "uuid"
}
```

**Response:**
```json
{
  "sf424": { /* SF-424 data */ },
  "sf424a": { /* SF-424A data */ },
  "sflll": { /* SF-LLL data */ }
}
```

#### Generate SF-424
```json
{
  "action": "generate_sf424",
  "entityId": "uuid",
  "grantId": "uuid",
  "formData": {
    "projectTitle": "Workforce Development Initiative",
    "projectDates": {
      "start": "2025-01-01",
      "end": "2025-12-31"
    },
    "funding": {
      "federal": 500000,
      "applicant": 0,
      "state": 0,
      "local": 0,
      "other": 0,
      "programIncome": 0,
      "total": 500000
    }
  }
}
```

#### Generate SF-424A
```json
{
  "action": "generate_sf424a",
  "entityId": "uuid",
  "grantId": "uuid",
  "formData": {
    "budgetCategories": {
      "personnel": 300000,
      "fringeBenefits": 75000,
      "travel": 10000,
      "equipment": 25000,
      "supplies": 15000,
      "contractual": 30000,
      "construction": 0,
      "other": 20000,
      "totalDirectCharges": 475000,
      "indirectCharges": 25000,
      "total": 500000
    }
  }
}
```

#### Generate SF-LLL
```json
{
  "action": "generate_sflll",
  "entityId": "uuid",
  "grantId": "uuid"
}
```

---

## Package Building

Build submission-ready grant packages.

### Endpoint
```
POST /api/grants/package
```

### Actions

#### Build Complete Package (ZIP)
```json
{
  "action": "build_complete",
  "applicationId": "uuid"
}
```

**Response:** Binary ZIP file download

#### Generate Narrative (PDF)
```json
{
  "action": "generate_narrative",
  "applicationId": "uuid",
  "format": "pdf"
}
```

**Response:** Binary PDF file download

#### Generate Narrative (Word)
```json
{
  "action": "generate_narrative",
  "applicationId": "uuid",
  "format": "docx"
}
```

**Response:** Binary DOCX file download

#### Generate Capability Statement
```json
{
  "action": "generate_capability",
  "entityId": "uuid"
}
```

**Response:** Binary PDF file download

#### Generate Budget
```json
{
  "action": "generate_budget",
  "applicationId": "uuid"
}
```

**Response:** Binary CSV file download

### Example
```typescript
// Download complete package
const response = await fetch('/api/grants/package', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'build_complete',
    applicationId: 'app-uuid',
  }),
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'grant_package.zip';
a.click();
```

---

## Submission Tracking

Record and track grant submissions.

### Endpoint
```
POST /api/grants/submit
GET /api/grants/submit?applicationId=uuid
```

### POST Actions

#### Record Email Submission
```json
{
  "action": "record_email",
  "applicationId": "uuid",
  "submittedBy": "Elizabeth Greene",
  "details": {
    "to": "grants@agency.gov",
    "subject": "Grant Application - Workforce Development",
    "messageId": "msg-123",
    "attachments": ["narrative.pdf", "budget.xlsx", "forms.pdf"]
  }
}
```

#### Record Portal Submission
```json
{
  "action": "record_portal",
  "applicationId": "uuid",
  "submittedBy": "Elizabeth Greene",
  "details": {
    "portalUrl": "https://grants.gov/apply/12345",
    "confirmationNumber": "CONF-2024-12345",
    "confirmationReceipt": "base64-encoded-pdf"
  }
}
```

#### Update Status
```json
{
  "action": "update_status",
  "submissionId": "uuid",
  "status": "under_review",
  "notes": "Agency confirmed receipt",
  "performedBy": "Elizabeth Greene"
}
```

**Status values:** `submitted`, `confirmed`, `under_review`, `awarded`, `rejected`, `withdrawn`

#### Add Timeline Event
```json
{
  "action": "add_timeline_event",
  "submissionId": "uuid",
  "event": {
    "event": "follow_up_call",
    "description": "Called program officer for status update",
    "performedBy": "Elizabeth Greene",
    "metadata": {
      "contactName": "John Smith",
      "notes": "Application under final review"
    }
  }
}
```

### GET Response
```json
{
  "submission": {
    "id": "uuid",
    "applicationId": "uuid",
    "grantId": "uuid",
    "entityId": "uuid",
    "method": "portal",
    "status": "under_review",
    "submittedBy": "Elizabeth Greene",
    "submittedAt": "2024-12-01T10:30:00Z",
    "confirmationNumber": "CONF-2024-12345",
    "portalUrl": "https://grants.gov/apply/12345",
    "timeline": [
      {
        "timestamp": "2024-12-01T10:30:00Z",
        "event": "submitted",
        "description": "Grant submitted via portal",
        "performedBy": "Elizabeth Greene"
      },
      {
        "timestamp": "2024-12-02T14:15:00Z",
        "event": "status_updated",
        "description": "Status changed to: under_review",
        "performedBy": "Elizabeth Greene"
      }
    ]
  }
}
```

---

## Notifications

Manage grant notifications and alerts.

### Endpoint
```
POST /api/grants/notifications
GET /api/grants/notifications?unreadOnly=true
PATCH /api/grants/notifications
```

### POST Actions

#### Notify Draft Generated
```json
{
  "action": "notify_draft",
  "applicationId": "uuid"
}
```

#### Notify Package Ready
```json
{
  "action": "notify_package",
  "applicationId": "uuid"
}
```

#### Notify Submitted
```json
{
  "action": "notify_submitted",
  "applicationId": "uuid",
  "submittedBy": "Elizabeth Greene",
  "confirmationNumber": "CONF-2024-12345"
}
```

#### Notify Deadline Approaching
```json
{
  "action": "notify_deadline",
  "grantId": "uuid",
  "daysRemaining": 7
}
```

#### Check All Deadlines
```json
{
  "action": "check_deadlines"
}
```

### GET Response
```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "draft_generated",
      "grant_id": "uuid",
      "application_id": "uuid",
      "entity_id": "uuid",
      "title": "Grant Draft Generated",
      "message": "AI has generated a complete draft for \"Workforce Innovation Grant\"",
      "priority": "medium",
      "read": false,
      "created_at": "2024-12-04T10:00:00Z",
      "grant": {
        "title": "Workforce Innovation Grant"
      },
      "entity": {
        "name": "Elevate for Humanity"
      }
    }
  ]
}
```

### PATCH Request
```json
{
  "notificationId": "uuid",
  "read": true
}
```

---

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (e.g., SAM.gov API down)

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Draft Generation:** 10 requests per minute
- **Package Building:** 5 requests per minute
- **Other endpoints:** 60 requests per minute

---

## Webhooks (Future)

Webhook support for external integrations (coming soon):

- Grant status updates
- Deadline reminders
- Award notifications

---

## Support

For API support, contact:
- **Email:** Elevate4humanityedu@gmail.com
- **Documentation:** `/docs/grant-autopilot/`
- **Repository:** [https://github.com/elevateforhumanity/fix2](https://github.com/elevateforhumanity/fix2)
