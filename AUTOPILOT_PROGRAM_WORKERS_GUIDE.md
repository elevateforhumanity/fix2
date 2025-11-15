# Autopilot Program Workers Integration Guide

**Purpose**: Use the Autopilot Certification System to manage program workers and certification applications

---

## Overview

The **Autopilot System** automates certification applications with human oversight. It can be used to:

1. **Manage Program Holders** - Barbershops, CNA schools, HVAC partners
2. **Handle Certifications** - State licenses, WIOA certifications, business permits
3. **Track Workers** - Case managers, delegates, instructors
4. **Automate Applications** - Pre-fill forms, submit to portals, track status

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Elevate LMS Platform                      │
│  (Next.js App - Student/Admin/Program Holder Portals)       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              Autopilot Certification System                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   FastAPI    │  │   Supabase   │  │  Playwright  │      │
│  │   Backend    │  │   Database   │  │  Automation  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              Government/Certification Portals                │
│  • State Licensing Boards                                    │
│  • WIOA Certification Systems                                │
│  • Business Registration Portals                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Current System Status

### ✅ Already Built:

- FastAPI backend with API routes
- Supabase database schema
- Profile management system
- Packet (application) management
- Audit logging system
- Worker dashboard components (React/TypeScript)

### ⏳ Needs Integration:

- Connect to main Next.js app
- Add worker role to existing auth system
- Create UI in admin portal for autopilot
- Deploy FastAPI backend
- Configure Playwright automation

---

## Integration Steps

### Step 1: Deploy Autopilot Backend

**Location**: `AUTOPILOT_SYSTEM/backend/`

```bash
# Install dependencies
cd AUTOPILOT_SYSTEM/backend
pip install -r requirements.txt

# Set environment variables
export SUPABASE_URL="your-supabase-url"
export SUPABASE_KEY="your-service-role-key"
export JWT_SECRET="your-jwt-secret"

# Run backend
uvicorn api.main:app --host 0.0.0.0 --port 8000
```

**Deploy to**:

- Vercel (as serverless functions)
- Railway
- Fly.io
- Or keep as separate service

---

### Step 2: Add Autopilot Tables to Supabase

**Run SQL**:

```bash
cd AUTOPILOT_SYSTEM/backend/database
psql -h your-supabase-url -f schema.sql
```

**Tables Created**:

- `autopilot_profiles` - Master business profiles
- `autopilot_packets` - Certification applications
- `autopilot_packet_fields` - Field values
- `autopilot_attachments` - Uploaded documents
- `autopilot_audit_logs` - Audit trail
- `autopilot_workers` - Worker accounts

---

### Step 3: Add Worker Role to Auth

**Update**: `lib/auth.ts`

```typescript
export type UserRole =
  | 'student'
  | 'admin'
  | 'program_holder'
  | 'delegate'
  | 'cert_worker' // NEW
  | 'cert_reviewer'; // NEW
```

**Add to Supabase**:

```sql
-- Add worker roles to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS autopilot_role TEXT
CHECK (autopilot_role IN ('cert_worker', 'cert_reviewer', 'auditor'));

-- Grant permissions
CREATE POLICY "Workers can view packets"
ON autopilot_packets FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT user_id FROM profiles
    WHERE autopilot_role IN ('cert_worker', 'cert_reviewer')
  )
);
```

---

### Step 4: Create Autopilot Admin UI

**Add to Admin Portal**: `app/admin/autopilot/`

```
app/admin/autopilot/
├── page.tsx              # Dashboard - list all packets
├── packets/
│   ├── page.tsx          # Packet list
│   └── [id]/
│       ├── page.tsx      # Packet detail/editor
│       └── edit/
│           └── page.tsx  # Field editor
├── profiles/
│   ├── page.tsx          # Profile list
│   └── [id]/
│       └── page.tsx      # Profile editor
└── audit/
    └── page.tsx          # Audit log viewer
```

---

### Step 5: Connect Frontend to Backend

**Create API Client**: `lib/autopilot-api.ts`

```typescript
const AUTOPILOT_API =
  process.env.NEXT_PUBLIC_AUTOPILOT_API_URL || 'http://localhost:8000';

export async function getPackets() {
  const res = await fetch(`${AUTOPILOT_API}/api/packets`);
  return res.json();
}

export async function getPacket(id: string) {
  const res = await fetch(`${AUTOPILOT_API}/api/packets/${id}`);
  return res.json();
}

export async function injectData(packetId: string, data: any) {
  const res = await fetch(`${AUTOPILOT_API}/api/packets/${packetId}/inject`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function approvePacket(packetId: string) {
  const res = await fetch(`${AUTOPILOT_API}/api/packets/${packetId}/approve`, {
    method: 'POST',
  });
  return res.json();
}
```

---

## Use Cases

### Use Case 1: Program Holder Certification

**Scenario**: Barbershop applies to become training provider

**Autopilot Flow**:

1. Program holder fills out application in portal
2. Autopilot creates packet with their data
3. Autopilot pre-fills state licensing forms (PDF)
4. Cert worker reviews, adds missing docs
5. Cert reviewer approves
6. Playwright submits to state portal
7. Confirmation logged in audit trail

**Benefits**:

- No manual form filling
- Consistent data across applications
- Audit trail for compliance
- Faster processing

---

### Use Case 2: Student WIOA Certification

**Scenario**: Student needs WIOA eligibility certification

**Autopilot Flow**:

1. Student completes enrollment form
2. Autopilot creates WIOA packet
3. Pre-fills WIOA forms with student data
4. Case manager reviews, uploads income docs
5. Delegate approves eligibility
6. System submits to WIOA portal
7. Certificate generated and stored

**Benefits**:

- Automated eligibility checks
- Document management
- Compliance tracking
- Faster enrollment

---

### Use Case 3: Instructor Certification

**Scenario**: New instructor needs state teaching license

**Autopilot Flow**:

1. Instructor profile created in system
2. Autopilot generates license application
3. Pre-fills with credentials, experience
4. HR worker uploads transcripts, background check
5. Admin approves and submits
6. License tracked in system

**Benefits**:

- Centralized credential management
- Automated renewals
- Compliance tracking

---

## Worker Roles & Permissions

### Cert Worker

**Can**:

- View assigned packets
- Edit packet fields
- Upload attachments
- Add comments/notes
- Mark packet as "Ready for Review"

**Cannot**:

- Approve packets
- Submit to portals
- Delete audit logs
- Change master profiles

### Cert Reviewer

**Can**:

- Everything Cert Worker can do
- Approve packets
- Reject packets with feedback
- Trigger portal submissions
- View all packets

**Cannot**:

- Delete audit logs
- Modify submitted packets
- Change RBAC settings

### Auditor

**Can**:

- View all audit logs
- Export audit reports
- View packet history
- View snapshots

**Cannot**:

- Edit anything
- Approve packets
- Submit applications

---

## API Integration Examples

### Example 1: Create Packet from Program Holder Application

```typescript
// In app/api/program-holder/apply/route.ts

import { createPacket } from '@/lib/autopilot-api';

export async function POST(request: Request) {
  const application = await request.json();

  // Create autopilot packet
  const packet = await createPacket({
    profile_id: application.organization_id,
    certification_type: 'state_training_provider',
    status: 'draft',
    fields: {
      business_name: application.business_name,
      ein: application.ein,
      address: application.address,
      owner_name: application.owner_name,
      // ... more fields
    },
  });

  // Store packet ID with application
  await supabase
    .from('program_holder_applications')
    .update({ autopilot_packet_id: packet.id })
    .eq('id', application.id);

  return NextResponse.json({ success: true, packet_id: packet.id });
}
```

### Example 2: Worker Dashboard Component

```typescript
// app/admin/autopilot/packets/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getPackets } from '@/lib/autopilot-api';

export default function PacketsPage() {
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    getPackets().then(setPackets);
  }, []);

  return (
    <div>
      <h1>Certification Packets</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packets.map(packet => (
            <tr key={packet.id}>
              <td>{packet.id}</td>
              <td>{packet.certification_type}</td>
              <td>{packet.status}</td>
              <td>{packet.assigned_to}</td>
              <td>
                <a href={`/admin/autopilot/packets/${packet.id}`}>
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Environment Variables

Add to `.env.local` and Vercel:

```env
# Autopilot Backend
NEXT_PUBLIC_AUTOPILOT_API_URL=https://autopilot-api.yourdomain.com
AUTOPILOT_JWT_SECRET=your-jwt-secret

# Playwright (for portal automation)
PLAYWRIGHT_HEADLESS=true
PLAYWRIGHT_TIMEOUT=30000

# File Storage (for PDFs and attachments)
S3_BUCKET=autopilot-documents
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key

# Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
```

---

## Deployment Checklist

### Backend Deployment:

- [ ] Deploy FastAPI to Vercel/Railway/Fly.io
- [ ] Set environment variables
- [ ] Run database migrations
- [ ] Test API endpoints
- [ ] Configure CORS for Next.js app

### Frontend Integration:

- [ ] Add autopilot routes to admin portal
- [ ] Create worker dashboard components
- [ ] Add API client functions
- [ ] Test packet creation flow
- [ ] Test worker editing flow

### Database Setup:

- [ ] Run schema.sql in Supabase
- [ ] Add worker roles to profiles
- [ ] Configure RLS policies
- [ ] Seed test data

### Automation Setup:

- [ ] Install Playwright
- [ ] Configure portal credentials
- [ ] Test PDF generation
- [ ] Test portal submission
- [ ] Set up monitoring

---

## Quick Start Commands

```bash
# 1. Deploy backend
cd AUTOPILOT_SYSTEM/backend
pip install -r requirements.txt
uvicorn api.main:app --reload

# 2. Setup database
psql -h your-supabase-url -f database/schema.sql

# 3. Test API
curl http://localhost:8000/api/packets

# 4. Access worker dashboard
# Visit: http://localhost:3000/admin/autopilot
```

---

## Next Steps

1. **Review System**: Read `AUTOPILOT_SYSTEM/README.md`
2. **Deploy Backend**: Follow deployment guide
3. **Add UI Routes**: Create admin/autopilot pages
4. **Test Flow**: Create test packet and edit it
5. **Train Workers**: Onboard certification workers
6. **Go Live**: Start processing real applications

---

## Support & Documentation

- **System Docs**: `AUTOPILOT_SYSTEM/README.md`
- **API Docs**: `AUTOPILOT_SYSTEM/docs/API.md`
- **Worker Guide**: `AUTOPILOT_SYSTEM/docs/WORKER_GUIDE.md`
- **Deployment**: `AUTOPILOT_SYSTEM/docs/DEPLOYMENT.md`

---

**Status**: ✅ System built and ready for integration  
**Next**: Deploy backend and create admin UI  
**Timeline**: 2-3 days for full integration
