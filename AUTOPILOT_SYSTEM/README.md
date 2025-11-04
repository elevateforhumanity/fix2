# Certification Autopilot System

## Human-in-the-Loop Application Management

**Built for:** Elevate for Humanity  
**Purpose:** Automate certification applications with human review and control

---

## 🎯 What This System Does

**Autopilot Pre-fills → Human Reviews/Edits → System Submits**

1. **Master Profile** - Canonical business data stored in Supabase
2. **Autopilot** - Pre-fills PDFs and web forms automatically
3. **Worker Dashboard** - Humans review, edit, inject missing data
4. **Portal Automation** - Playwright submits to government portals
5. **Audit Trail** - Complete logging of who changed what, when

---

## 📦 System Components

```
AUTOPILOT_SYSTEM/
├── README.md (this file)
├── backend/
│   ├── api/
│   │   ├── profiles.py (profile management)
│   │   ├── packets.py (packet CRUD)
│   │   ├── inject.py (data injection)
│   │   └── audit.py (audit logging)
│   ├── automation/
│   │   ├── pdf_filler.py (fill PDFs)
│   │   ├── portal_bot.py (Playwright automation)
│   │   └── packet_generator.py (create packets)
│   ├── database/
│   │   ├── schema.sql (Supabase tables)
│   │   └── seed.sql (initial data)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PacketList.tsx
│   │   │   ├── PacketEditor.tsx
│   │   │   ├── FieldEditor.tsx
│   │   │   └── AuditLog.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── PacketDetail.tsx
│   │   │   └── AuditTrail.tsx
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── scripts/
│   ├── list_pdf_fields.py
│   ├── fill_pdf.py
│   └── deploy.sh
├── data/
│   ├── master_profile.json
│   ├── packets/ (generated packets)
│   └── templates/ (blank PDFs)
└── docs/
    ├── SETUP.md
    ├── API.md
    ├── WORKER_GUIDE.md
    └── DEPLOYMENT.md
```

---

## 🚀 Quick Start

### **Step 1: Setup Database**

```bash
cd backend/database
psql -h your-supabase-url -f schema.sql
psql -h your-supabase-url -f seed.sql
```

### **Step 2: Start Backend**

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn api.main:app --reload
```

### **Step 3: Start Frontend**

```bash
cd frontend
npm install
npm run dev
```

### **Step 4: Access Dashboard**

```
http://localhost:3000
```

---

## 🔐 Security & RBAC

**Roles:**

- **Admin** - Full access, change RBAC, view all logs
- **Cert Worker** - Edit fields, upload docs, mark ready
- **Reviewer** - Final approval, submit to portals
- **Auditor** - Read-only logs and snapshots

**Security Features:**

- MFA for all workers
- Immutable audit logs
- Encrypted file storage
- PII masking (SSN, financials)
- Versioned snapshots
- No plain-text credentials

---

## 📋 Worker Flows

### **Flow A: Edit Pre-filled PDF**

1. Autopilot creates `packet-123-draft.pdf`
2. Worker opens dashboard → sees packet-123
3. Worker edits phone, uploads IRS letter
4. Worker clicks **Approve**
5. System flattens PDF, stores final, logs audit
6. Optional: Playwright uploads to portal

### **Flow B: Inject Data via API**

1. Worker edits fields in UI
2. Clicks **Inject**
3. UI POSTs to `/api/packets/123/inject`
4. Server merges data, creates snapshot
5. Returns audit ID and updated profile

---

## 🔌 API Endpoints

### **Profiles**

```
GET    /api/profiles/{orgId}           - Get master profile
PATCH  /api/profiles/{orgId}           - Update profile fields
GET    /api/profiles/{orgId}/history   - Get version history
```

### **Packets**

```
GET    /api/packets                    - List all packets
GET    /api/packets/{id}               - Get packet details
POST   /api/packets                    - Create new packet
PATCH  /api/packets/{id}/inject        - Inject data
POST   /api/packets/{id}/approve       - Approve packet
POST   /api/packets/{id}/submit        - Submit to portal
```

### **Audit**

```
GET    /api/audit                      - List audit logs
GET    /api/audit/{id}                 - Get audit details
GET    /api/audit/packet/{packetId}   - Get packet audit trail
```

---

## 📊 Database Schema

**Tables:**

- `profiles` - Master business profiles
- `packets` - Application packets
- `packet_fields` - Field values per packet
- `attachments` - Uploaded documents
- `audit_logs` - Immutable audit trail
- `users` - Worker accounts
- `roles` - RBAC definitions

---

## 🤖 Automation Features

**PDF Automation:**

- List all fields in blank PDF
- Pre-fill with master profile data
- Flatten to prevent editing
- Generate final submission PDF

**Portal Automation:**

- Playwright browser automation
- Handle MFA (human login)
- Fill web forms
- Upload documents
- Submit applications
- Capture confirmation

---

## 📝 Audit Trail

**Every action logged:**

- Who made the change
- What changed (before/after diff)
- When it happened
- Which packet/profile
- IP address and session
- Approval chain

**Immutable logs:**

- Cannot be deleted or modified
- Versioned snapshots
- Compliance-ready
- Exportable for audits

---

## 🎨 Worker Dashboard Features

**Packet List:**

- Filter by status (draft, ready, submitted)
- Search by certification type
- Sort by priority/deadline
- Bulk actions

**Packet Editor:**

- Preview pre-filled PDF
- Edit fields inline
- Upload attachments
- Add notes/comments
- Mark ready for review

**Field Editor:**

- Smart validation
- Required field indicators
- Placeholder hints
- Auto-save drafts
- Undo/redo

**Audit Viewer:**

- Timeline of changes
- Before/after diffs
- User attribution
- Export to PDF

---

## 🔄 Workflow States

```
DRAFT → READY_FOR_REVIEW → APPROVED → SUBMITTED → COMPLETED
  ↓           ↓                ↓           ↓
NEEDS_INFO  REJECTED      NEEDS_REVISION  FAILED
```

**State Transitions:**

- Worker creates → DRAFT
- Worker completes → READY_FOR_REVIEW
- Reviewer approves → APPROVED
- System submits → SUBMITTED
- Portal confirms → COMPLETED

---

## 📦 Deployment

**Requirements:**

- Node.js 18+
- Python 3.10+
- PostgreSQL (Supabase)
- Redis (optional, for queues)
- S3/R2 (file storage)

**Environment Variables:**

```bash
SUPABASE_URL=your-url
SUPABASE_KEY=your-key
JWT_SECRET=your-secret
S3_BUCKET=your-bucket
SMTP_HOST=your-smtp
SLACK_WEBHOOK=your-webhook
```

**Deploy:**

```bash
./scripts/deploy.sh production
```

---

## 📚 Documentation

- **SETUP.md** - Installation and configuration
- **API.md** - Complete API reference
- **WORKER_GUIDE.md** - How to use the dashboard
- **DEPLOYMENT.md** - Production deployment guide

---

## 🎯 Next Steps

1. **Review** - Read through all files
2. **Setup** - Follow SETUP.md
3. **Test** - Run with sample data
4. **Train** - Onboard workers
5. **Deploy** - Go to production

---

## 💡 Pro Tips

**For Workers:**

- Save drafts frequently
- Use comments for questions
- Upload docs early
- Review audit trail before submitting

**For Admins:**

- Monitor audit logs daily
- Review failed submissions
- Update master profile regularly
- Backup database weekly

**For Developers:**

- Run tests before deploying
- Monitor API performance
- Check error logs
- Update dependencies monthly

---

## 🆘 Support

**Technical Issues:**

- Check logs: `docker logs autopilot-api`
- Review audit trail
- Contact dev team

**Application Questions:**

- Review WORKER_GUIDE.md
- Check certification requirements
- Contact certification agencies

---

**Built with:** FastAPI, React, Supabase, Playwright, pypdf  
**License:** Commercial - Elevate for Humanity  
**Version:** 1.0.0
