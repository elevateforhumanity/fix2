# Certificate System Features - Implementation Summary

## Overview
Complete certificate management system with QR codes, bulk issuance, expiry rules, revocation, and replacement capabilities.

## Features Implemented

### 1. QR Code on Certificate PDF ✅
**Files:**
- `/app/api/cert/pdf/route.ts` - PDF generation with embedded QR code

**Functionality:**
- Generates PDF certificates with QR codes linking to verification page
- QR code contains full verification URL: `{origin}/cert/verify/{serial}`
- Professional certificate layout with all details
- Downloadable via `/api/cert/pdf?serial={serial}`

**Dependencies:**
- `qrcode` - QR code generation
- `@react-pdf/renderer` - PDF document creation

### 2. One-Click "Mark Complete & Issue Cert" ✅
**Files:**
- `/app/api/cert/issue/route.ts` - Certificate issuance API
- `/app/admin/programs/[code]/dashboard/page.tsx` - Admin dashboard with action button

**Functionality:**
- Admin/partner/instructor can complete enrollment and issue certificate in one click
- Marks enrollment as completed
- Logs completion event to `enrollment_events` table
- Generates unique serial number with retry logic (format: `EFH-{8-char-hex}`)
- Auto-applies course expiry rules if configured
- Returns serial number for immediate verification

**Database Updates:**
- Added `funding_program_id` to enrollments table
- Created `enrollment_events` table for KPI tracking
- Added `report_for_program()` function returning `user_id` and `course_id`

### 3. Course-Level Certificate Expiry Rules ✅
**Database Schema:**
- `courses.cert_valid_days` - Number of days certificate is valid (null/0 = no expiry)
- `courses.cert_note` - Display label for certificate validity rule
- `certificates.expires_at` - Calculated expiry timestamp

**Functionality:**
- Admins can set certificate validity period per course
- Expiry auto-calculated on issuance: `issued_at + cert_valid_days`
- Priority: CSV `expires_at` → course `cert_valid_days` → no expiry
- Verification page shows expiry status

### 4. Bulk Complete + Issue Certificates (CSV) ✅
**Files:**
- `/app/admin/certifications/bulk/page.tsx` - Upload interface
- `/app/api/cert/bulk-issue/route.ts` - Bulk processing API

**CSV Format:**
```csv
email,course_slug,issued_at,expires_at
jane@example.com,cna-cert,2025-11-12,
john@work.org,hvac-tech,,
```

**Supported Columns:**
- `email` (required) - Learner email
- `course_id` or `course_slug` (required) - Course identifier
- `issued_at` (optional) - Custom issue date (YYYY-MM-DD)
- `expires_at` (optional) - Custom expiry date (YYYY-MM-DD)

**Functionality:**
- Admin/partner can upload CSV to bulk complete enrollments and issue certificates
- Creates enrollments if missing
- Logs completion and certification events for KPIs
- Respects course expiry rules unless CSV overrides
- Returns summary: `{ ok, issued, errors[] }`
- Errors logged to console for debugging

### 5. Certificate Revocation System ✅
**Database Schema:**
- `certificates.revoked_at` - Timestamp when certificate was revoked
- `certificates.revoked_reason` - Reason for revocation
- `cert_revocation_log` view - All revoked certificates with details

**Files:**
- `/app/api/cert/revocations/route.ts` - Export revocation log as CSV

**Functionality:**
- Admins can export complete revocation log
- CSV includes: serial, learner_email, course_title, issued_at, expires_at, revoked_at, revoked_reason
- Verification page shows revocation status prominently
- Revoked certificates cannot be downloaded

### 6. Certificate Replacement ✅
**Files:**
- `/app/api/cert/replace/route.ts` - Replace certificate API

**Functionality:**
- Admin/partner/instructor can replace a certificate
- Revokes old certificate with reason "Replaced with new certificate"
- Issues new certificate with fresh serial number
- Maintains all original details (user, course, student name)
- Logs new certification event for KPIs
- Returns new serial number

**Usage:**
```javascript
POST /api/cert/replace
{
  "old_serial": "EFH-A3F2B1C4",
  "reason": "Corrected learner name"
}
```

### 7. Certificate Verification Page ✅
**Files:**
- `/app/cert/verify/[serial]/page.tsx` - Public verification page

**Functionality:**
- Public page to verify certificate authenticity
- Shows certificate status: Valid / Revoked / Expired
- Displays all certificate details
- Shows revocation reason if applicable
- Shows expiry date and status
- Download PDF button (only for valid certificates)
- Professional UI with status badges and icons

## Database Schema Updates

### Tables Modified:
1. **courses**
   - Added `cert_valid_days int` - Certificate validity period
   - Added `cert_note text` - Certificate validity note

2. **certificates**
   - Added `expires_at timestamptz` - Certificate expiry timestamp
   - Added `revoked_at timestamptz` - Revocation timestamp
   - Added `revoked_reason text` - Revocation reason
   - Added unique index on `serial` column

3. **enrollments**
   - Added `funding_program_id uuid` - Link to funding program

### Tables Created:
4. **enrollment_events** (NEW)
   - `id uuid` - Primary key
   - `user_id uuid` - Learner
   - `course_id uuid` - Course
   - `funding_program_id uuid` - Funding program (nullable)
   - `kind text` - Event type: ENROLLED|STARTED|COMPLETED|DROPPED|CERTIFIED
   - `created_at timestamptz` - Event timestamp

### Views Created:
5. **cert_revocation_log** (NEW)
   - Joins certificates, users, and courses
   - Filters to revoked certificates only
   - Ordered by revocation date descending

### Functions Created:
6. **report_for_program(pid uuid)** (NEW)
   - Returns enrollment report for funding program
   - Includes `user_id` and `course_id` for admin actions
   - Aggregates lesson progress and certificate data

## API Endpoints

### Certificate Management
- `GET /api/cert/pdf?serial={serial}` - Download certificate PDF
- `POST /api/cert/issue` - Issue single certificate
- `POST /api/cert/bulk-issue` - Bulk issue from CSV
- `POST /api/cert/replace` - Replace certificate
- `GET /api/cert/revocations` - Export revocation log CSV

### Public Pages
- `/cert/verify/{serial}` - Verify certificate authenticity
- `/admin/certifications/bulk` - Bulk certificate upload interface
- `/admin/programs/{code}/dashboard` - Program dashboard with Complete+Cert button

## Role Permissions

### Admin
- Issue certificates (single & bulk)
- Replace certificates
- Export revocation log
- Complete enrollments

### Partner
- Issue certificates (single & bulk)
- Replace certificates
- Export revocation log
- Complete enrollments

### Instructor
- Issue certificates (single only)
- Replace certificates
- Complete enrollments

### Public
- Verify certificates (no authentication required)

## Testing Checklist

### Single Certificate Issuance
- [ ] Admin can issue certificate from program dashboard
- [ ] Certificate has unique serial number
- [ ] Enrollment marked as completed
- [ ] Completion event logged
- [ ] Certification event logged
- [ ] Course expiry rules applied correctly
- [ ] PDF downloadable with QR code

### Bulk Certificate Issuance
- [ ] CSV upload interface accessible
- [ ] Valid CSV processed successfully
- [ ] Invalid rows reported in errors
- [ ] Course lookup by slug works
- [ ] Course lookup by ID works
- [ ] Custom issue dates respected
- [ ] Custom expiry dates respected
- [ ] Course expiry rules applied when no CSV expiry
- [ ] All events logged correctly

### Certificate Verification
- [ ] Valid certificate shows "Valid" badge
- [ ] Revoked certificate shows "Revoked" badge
- [ ] Expired certificate shows "Expired" badge
- [ ] All certificate details displayed
- [ ] Revocation reason shown
- [ ] PDF download button only for valid certificates
- [ ] QR code in PDF links to verification page

### Certificate Replacement
- [ ] Old certificate revoked with reason
- [ ] New certificate issued with fresh serial
- [ ] All original details preserved
- [ ] Certification event logged
- [ ] New serial returned in response

### Revocation Log
- [ ] Export includes all revoked certificates
- [ ] CSV format correct
- [ ] All columns populated
- [ ] Ordered by revocation date

### Expiry Rules
- [ ] Course expiry setting saved correctly
- [ ] Expiry auto-calculated on issuance
- [ ] CSV expiry overrides course setting
- [ ] No expiry when cert_valid_days is 0 or null
- [ ] Verification page shows expiry status

## KPI Tracking

All certificate operations log events to `enrollment_events`:
- **COMPLETED** - When enrollment marked complete
- **CERTIFIED** - When certificate issued

Events include:
- `user_id` - Learner
- `course_id` - Course
- `funding_program_id` - Funding program (for WRG, WIOA, etc.)
- `created_at` - Event timestamp

This enables accurate reporting for:
- Completion rates by program
- Certification rates by program
- Time to completion
- Weekly/monthly KPI reports

## Security Considerations

1. **Role-Based Access Control**
   - All admin endpoints check user role
   - Only admin/partner/instructor can issue certificates
   - Public verification requires no authentication

2. **Serial Number Uniqueness**
   - Unique index on `certificates.serial`
   - Retry logic (3 attempts) on collision
   - Cryptographically random generation

3. **Data Validation**
   - Email validation in bulk upload
   - Course existence verification
   - User existence verification
   - Date format validation

4. **Audit Trail**
   - All events logged to `enrollment_events`
   - Revocation reasons stored
   - Timestamps on all operations

## Future Enhancements (Not Implemented)

1. **QR Label Sheet Generator**
   - PDF of QR stickers for whole cohort
   - Printable on label sheets

2. **Revoke Certificate Admin Action**
   - Button in admin dashboard to revoke
   - Prompt for revocation reason
   - Update verification page status

3. **Email Notifications**
   - Auto-email learner when certificate issued
   - Include PDF attachment
   - Include verification link

4. **Replacement Log View**
   - Show old → new serial mappings
   - Track replacement history
   - Audit trail for replacements

5. **Certificate Templates**
   - Multiple certificate designs
   - Course-specific templates
   - Custom branding per organization

## Deployment Notes

1. **Database Migration**
   - Run `supabase/schema.sql` to create all tables, views, and functions
   - Ensure `uuid-ossp` extension is enabled

2. **Environment Variables**
   - No new environment variables required
   - Uses existing Supabase configuration

3. **Dependencies**
   - `qrcode` - QR code generation
   - `@react-pdf/renderer` - PDF creation
   - `@types/qrcode` - TypeScript types

4. **Storage**
   - Certificates stored in database only
   - PDFs generated on-demand (not stored)
   - QR codes generated on-demand (not stored)

## Support

For issues or questions:
1. Check console logs for bulk upload errors
2. Verify database schema is up to date
3. Ensure user has correct role permissions
4. Check Supabase RLS policies if queries fail
