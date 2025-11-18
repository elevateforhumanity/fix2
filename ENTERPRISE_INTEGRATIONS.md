# Enterprise Integrations Guide

Complete guide for all enterprise integrations implemented in Elevate for Humanity.

## 📋 Table of Contents

1. [SSO Authentication](#sso-authentication)
2. [Email Notifications](#email-notifications)
3. [SMS Notifications](#sms-notifications)
4. [Teams Notifications](#teams-notifications)
5. [SCORM Support](#scorm-support)
6. [xAPI Tracking](#xapi-tracking)
7. [Infrastructure](#infrastructure)

---

## 🔐 SSO Authentication

### Supported Providers

- **Okta** - Enterprise SSO
- **Azure AD** - Microsoft enterprise authentication

### Configuration

#### Environment Variables

```bash
# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Okta
OKTA_CLIENT_ID=your-okta-client-id
OKTA_CLIENT_SECRET=your-okta-client-secret
OKTA_ISSUER=https://dev-123456.okta.com/oauth2/default

# Azure AD
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-tenant-id
```

### Usage

#### Protecting Routes

```typescript
// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return <div>Welcome {session.user?.name}</div>;
}
```

#### API Route Protection

```typescript
// app/api/protected/route.ts
import { requireAuth } from '@/lib/auth/getSession';

export async function GET() {
  const session = await requireAuth();
  // Your protected logic here
}
```

### User Sync

Users are automatically synced to the `profiles` table on first login. The sync includes:

- Email
- Name
- Provider (okta/azure-ad)
- Provider account ID
- Last login timestamp

---

## 📧 Email Notifications

### Provider: SendGrid

#### Configuration

```bash
SENDGRID_API_KEY=SG.your-api-key
SENDGRID_FROM_EMAIL=noreply@elevateforhumanity.org
```

#### Usage

```typescript
import { sendEmail } from '@/lib/notifications/email';

await sendEmail({
  to: 'student@example.com',
  subject: 'Welcome to Elevate',
  html: '<p>Welcome to your training program!</p>',
});
```

#### Bulk Email

```typescript
import { sendBulkEmail } from '@/lib/notifications/email';

await sendBulkEmail(
  ['user1@example.com', 'user2@example.com'],
  'Program Update',
  '<p>Important update about your program</p>'
);
```

### Email Templates

Create reusable templates in `lib/notifications/templates/`:

```typescript
// lib/notifications/templates/welcome.ts
export function welcomeEmail(name: string, programName: string) {
  return {
    subject: `Welcome to ${programName}`,
    html: `
      <h1>Welcome ${name}!</h1>
      <p>You've been enrolled in ${programName}.</p>
      <a href="https://yourdomain.com/dashboard">Go to Dashboard</a>
    `
  };
}
```

---

## 📱 SMS Notifications

### Provider: Twilio

#### Configuration

```bash
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_FROM_NUMBER=+1234567890
```

#### Usage

```typescript
import { sendSms } from '@/lib/notifications/sms';

await sendSms({
  to: '+1234567890',
  body: 'Your class starts in 30 minutes!',
});
```

### Use Cases

- Attendance reminders
- Class start notifications
- Emergency alerts
- Completion confirmations

---

## 💬 Teams Notifications

### Provider: Microsoft Teams Webhooks

#### Configuration

1. In Teams, go to your channel
2. Click "..." → Connectors → Incoming Webhook
3. Copy the webhook URL

```bash
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/...
```

#### Usage

```typescript
import { sendTeamsMessage } from '@/lib/notifications/teams';

await sendTeamsMessage(
  'New Enrollment',
  'Student enrolled in HVAC program',
  {
    studentEmail: 'student@example.com',
    programName: 'HVAC Technician',
    enrollmentDate: new Date().toISOString()
  }
);
```

### Use Cases

- New enrollments
- Completion notifications
- System alerts
- Daily summaries

---

## 📦 SCORM Support

### Overview

SCORM (Sharable Content Object Reference Model) support for uploading and tracking e-learning content.

### Database Schema

- `scorm_packages` - Uploaded SCORM content
- `scorm_registrations` - Learner enrollments and progress

### Upload SCORM Package

```typescript
// Frontend
const formData = new FormData();
formData.append('file', scormZipFile);
formData.append('title', 'Safety Training Module');
formData.append('description', 'OSHA safety training');
formData.append('tenantId', 'tenant-uuid');

const response = await fetch('/api/scorm/upload', {
  method: 'POST',
  body: formData,
});

const { packageId } = await response.json();
```

### Track Progress

SCORM players should POST progress data to your LMS API, which then updates the `scorm_registrations` table.

### Supported Versions

- SCORM 1.2
- SCORM 2004 (planned)

---

## 📊 xAPI Tracking

### Overview

xAPI (Experience API / Tin Can API) for tracking learning experiences.

### Database Schema

- `xapi_statements` - All learning experience statements

### Send Statement

```typescript
const statement = {
  actor: {
    mbox: 'mailto:student@example.com',
    name: 'John Doe'
  },
  verb: {
    id: 'http://adlnet.gov/expapi/verbs/completed',
    display: { 'en-US': 'completed' }
  },
  object: {
    id: 'http://example.com/activities/module-1',
    objectType: 'Activity',
    definition: {
      name: { 'en-US': 'Safety Module 1' }
    }
  },
  result: {
    score: { scaled: 0.95 },
    success: true,
    completion: true
  }
};

await fetch('/api/xapi/statement', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(statement)
});
```

### Query Statements

```typescript
// Get all statements for a learner
const response = await fetch(
  '/api/xapi/statement?actor=mailto:student@example.com&limit=50'
);
const { statements } = await response.json();

// Get statements by verb
const response = await fetch(
  '/api/xapi/statement?verb=http://adlnet.gov/expapi/verbs/completed'
);
```

### Common Verbs

- `completed` - Finished an activity
- `passed` - Passed an assessment
- `failed` - Failed an assessment
- `attempted` - Started an activity
- `experienced` - Experienced content
- `attended` - Attended a session

---

## 🏗️ Infrastructure

### Terraform

Infrastructure as Code for AWS resources.

#### Resources

- **VPC** - 10.0.0.0/16 with public/private subnets
- **RDS PostgreSQL** - Multi-AZ, encrypted
- **ElastiCache Redis** - For caching
- **S3 Buckets** - Assets and backups
- **CloudFront CDN** - Asset delivery

#### Deploy

```bash
cd infra/terraform
terraform init
terraform plan -var-file="prod.tfvars"
terraform apply -var-file="prod.tfvars"
```

#### Cost

Estimated monthly cost: **$120-200**

---

## 🔄 Integration Workflows

### New Student Enrollment

```typescript
// app/api/enroll/route.ts
import { sendEmail } from '@/lib/notifications/email';
import { sendSms } from '@/lib/notifications/sms';
import { sendTeamsMessage } from '@/lib/notifications/teams';

export async function POST(request: Request) {
  const { studentEmail, studentPhone, programName } = await request.json();
  
  // Save enrollment to database
  // ...
  
  // Email student
  await sendEmail({
    to: studentEmail,
    subject: `Welcome to ${programName}`,
    html: welcomeEmailTemplate(programName)
  });
  
  // SMS reminder
  if (studentPhone) {
    await sendSms({
      to: studentPhone,
      body: `You're enrolled in ${programName}. Check your email for details.`
    });
  }
  
  // Notify staff via Teams
  await sendTeamsMessage(
    'New Enrollment',
    `New student enrolled in ${programName}`,
    { studentEmail, programName }
  );
  
  return NextResponse.json({ success: true });
}
```

### Course Completion

```typescript
// When student completes a course
import { sendEmail } from '@/lib/notifications/email';
import { notifySlack } from '@/lib/notifySlack';

async function handleCourseCompletion(userId: string, courseId: string) {
  // Update database
  // ...
  
  // Send xAPI statement
  await fetch('/api/xapi/statement', {
    method: 'POST',
    body: JSON.stringify({
      actor: { mbox: `mailto:${userEmail}` },
      verb: { id: 'http://adlnet.gov/expapi/verbs/completed' },
      object: { id: `course:${courseId}` },
      result: { completion: true }
    })
  });
  
  // Email certificate
  await sendEmail({
    to: userEmail,
    subject: 'Course Completed!',
    html: certificateEmailTemplate(courseName)
  });
  
  // Notify Slack
  await notifySlack('Course Completion', {
    severity: 'info',
    context: { userId, courseId, courseName }
  });
}
```

---

## 🧪 Testing

### Test Email

```bash
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com"}'
```

### Test SMS

```bash
curl -X POST http://localhost:3000/api/test/sms \
  -H "Content-Type: application/json" \
  -d '{"to":"+1234567890"}'
```

### Test xAPI

```bash
curl -X POST http://localhost:3000/api/xapi/statement \
  -H "Content-Type: application/json" \
  -d @test-statement.json
```

---

## 📚 Additional Resources

- [NextAuth Documentation](https://next-auth.js.org/)
- [SendGrid API Docs](https://docs.sendgrid.com/)
- [Twilio API Docs](https://www.twilio.com/docs)
- [xAPI Specification](https://github.com/adlnet/xAPI-Spec)
- [SCORM Documentation](https://scorm.com/scorm-explained/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

---

**Last Updated**: November 18, 2025
**Version**: 1.0.0
