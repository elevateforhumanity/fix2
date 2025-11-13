# Complete MOU Workflow - Implementation Guide

## Overview

Full two-step MOU signing workflow with digital signatures, PDF generation, email notifications, and access control.

## Workflow Steps

### 1. Program Holder Signs MOU

**Page:** `/program-holder/mou`

**Process:**
1. Program holder logs in and navigates to MOU page
2. Reviews full MOU text with revenue share details
3. Enters full legal name
4. Draws signature on canvas pad
5. Clicks "Sign & Submit MOU"
6. Signature saved to `agreements/program_holders/{id}/holder_signature.png`
7. Status updated to `signed_by_holder`

**API:** `POST /api/program-holder/mou/sign`
- Accepts: `{ name, signatureDataUrl }`
- Uploads PNG signature to Supabase Storage
- Updates program_holders table

### 2. Admin Countersigns MOU

**Page:** `/admin/program-holders/{id}/countersign-mou`

**Process:**
1. Admin views program holders list at `/admin/program-holders`
2. Sees "Countersign MOU" button for holders with `signed_by_holder` status
3. Clicks to view countersigning page
4. Reviews holder's signature and MOU details
5. Enters admin name
6. Draws admin signature
7. Clicks "Countersign & Generate Final PDF"
8. Admin signature saved to `agreements/program_holders/{id}/admin_signature.png`
9. Status updated to `fully_executed`
10. PDF generation triggered automatically

**API:** `POST /api/admin/program-holders/mou/countersign`
- Accepts: `{ programHolderId, name, signatureDataUrl }`
- Uploads admin signature
- Updates status to `fully_executed`

### 3. PDF Generation & Email

**API:** `POST /api/admin/program-holders/mou/generate-pdf`

**Process:**
1. Downloads both signature images from storage
2. Generates PDF using pdf-lib with:
   - MOU title and parties
   - Purpose and roles
   - Revenue share details
   - Responsibilities
   - Term and termination
   - Both signatures embedded
   - Signer names and dates
3. Uploads PDF to `agreements/program_holders/{id}/MOU_signed.pdf`
4. Creates 7-day signed URL for email
5. Sends email to:
   - Program holder contact email
   - MOU archive email (configurable)
6. Email includes:
   - Signature details
   - Revenue share percentage
   - Download link (7-day expiry)
   - Portal access reminder

## Database Schema

### program_holders Table

```sql
-- Holder signature fields
mou_holder_signed_at TIMESTAMPTZ
mou_holder_name TEXT
mou_holder_sig_url TEXT

-- Admin signature fields
mou_admin_signed_at TIMESTAMPTZ
mou_admin_name TEXT
mou_admin_sig_url TEXT

-- Final PDF
mou_final_pdf_url TEXT

-- Status tracking
mou_status TEXT  -- 'not_sent' | 'pending' | 'signed_by_holder' | 'fully_executed'
```

## Storage Structure

```
agreements/
  program_holders/
    {program_holder_id}/
      holder_signature.png      # Program holder's signature
      admin_signature.png       # Admin's signature  
      MOU_signed.pdf           # Final signed PDF
```

## Access Control & Gating

### MOU Status Checks

**Utility Functions:** `/lib/mou-checks.ts`

```typescript
// Client-side check
const isValid = await hasMOUFullyExecuted(programHolderId);

// Get detailed status
const status = await getMOUStatus(programHolderId);

// Server-side check (API routes)
const { isValid, status } = await checkMOUStatusServer(supabase, programHolderId);
```

### Gating Enrollments

**Example:** `/api/program-holder/enroll-participant/route.ts`

```typescript
// Check MOU before allowing enrollment
const mouStatus = await checkMOUStatusServer(supabase, programHolderId);

if (!mouStatus.isValid) {
  return Response.json({ 
    error: 'MOU_NOT_EXECUTED',
    message: 'A fully executed MOU is required before enrolling participants.',
    currentStatus: mouStatus.status
  }, { status: 403 });
}

// Proceed with enrollment...
```

### Gating Payouts

Add similar checks to payout processing:

```typescript
// In payout API
const mouStatus = await checkMOUStatusServer(supabase, programHolderId);

if (!mouStatus.isValid) {
  return Response.json({ 
    error: 'MOU_NOT_EXECUTED',
    message: 'Payouts require a fully executed MOU.'
  }, { status: 403 });
}
```

## UI Components

### MOUStatusBadge

**Component:** `/components/MOUStatusBadge.tsx`

**Usage:**
```tsx
import { MOUStatusBadge } from '@/components/MOUStatusBadge';

<MOUStatusBadge status={mouStatus} size="md" showIcon={true} />
```

**Displays:**
- Color-coded badges for each status
- Icons (CheckCircle, Clock, AlertCircle, XCircle)
- Human-readable labels

### MOUStatusAlert

**Usage:**
```tsx
import { MOUStatusAlert } from '@/components/MOUStatusBadge';

<MOUStatusAlert status={mouStatus} programHolderName={name} />
```

**Displays:**
- Full-width alert boxes
- Status-specific messages
- Action guidance for users

## Email Configuration

### Environment Variables

```env
# Resend API
RESEND_API_KEY=re_xxxxx

# Email settings
EMAIL_FROM=Elevate for Humanity <noreply@elevateforhumanity.org>
MOU_ARCHIVE_EMAIL=agreements@elevateforhumanity.org

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx  # Server-side only!
```

### Email Template

Sent when MOU is fully executed:

**Subject:** `Fully Executed MOU – {Program Holder Name}`

**Recipients:**
- Program holder contact email
- MOU archive email

**Content:**
- Signature details (both parties)
- Revenue share percentage
- 7-day download link
- Portal access reminder

## Security

### Storage Access

**RLS Policies:**
- Program holders can read their own files only
- Admins can read all files
- System (service role) can insert/update

### Signature Storage

- Signatures stored as PNG images
- Base64 decoded server-side
- Uploaded using service role key
- Never exposed to client

### PDF Generation

- Server-side only using pdf-lib
- Downloads signatures using service role
- Embeds images directly in PDF
- Uploads final PDF with service role

## Testing Checklist

### Program Holder Flow
- [ ] Can access `/program-holder/mou`
- [ ] MOU text displays correctly
- [ ] Can draw signature on canvas
- [ ] Can clear and redraw signature
- [ ] Name input validates
- [ ] Submit saves signature to storage
- [ ] Status updates to `signed_by_holder`
- [ ] Dashboard shows "awaiting countersignature"

### Admin Flow
- [ ] Can view all program holders
- [ ] "Countersign MOU" button appears for `signed_by_holder`
- [ ] Can view holder's signature
- [ ] Can draw admin signature
- [ ] Submit saves admin signature
- [ ] Status updates to `fully_executed`
- [ ] PDF generation triggers automatically
- [ ] Email sent to both parties

### PDF & Email
- [ ] PDF contains correct MOU text
- [ ] Both signatures embedded in PDF
- [ ] Signer names and dates included
- [ ] PDF uploaded to storage
- [ ] Email received by program holder
- [ ] Email received by archive address
- [ ] Download link works (7-day expiry)
- [ ] PDF accessible from portal

### Access Control
- [ ] Enrollment blocked without fully executed MOU
- [ ] Error message explains requirement
- [ ] Dashboard shows MOU status badge
- [ ] Quick links disabled until MOU signed
- [ ] Payout processing checks MOU status

## Integration Points

### Where to Add MOU Checks

1. **Participant Enrollment**
   - Check before creating case records
   - Show MOU requirement in error message

2. **Certificate Issuance**
   - Verify MOU before issuing certificates
   - Link to MOU signing page if needed

3. **Payout Processing**
   - Block payouts for holders without executed MOU
   - Queue payouts until MOU completed

4. **Reporting**
   - Filter reports by MOU status
   - Show MOU completion in analytics

5. **Dashboard Access**
   - Show prominent MOU status
   - Disable features until MOU signed

## Maintenance

### Updating MOU Text

Edit the MOU content in:
- `/app/program-holder/mou/page.tsx` (display version)
- `/app/api/admin/program-holders/mou/generate-pdf/route.ts` (PDF version)

Keep both versions synchronized.

### Changing Revenue Share

Revenue share is stored per program holder in `payout_share` field.
Default is 0.333 (33.3%). Can be customized per holder.

### Email Template Updates

Edit email HTML in:
- `/app/api/admin/program-holders/mou/generate-pdf/route.ts`

### Storage Cleanup

Old signatures can be cleaned up if MOU is re-signed:
- Signatures use `upsert: true` to overwrite
- PDFs use `upsert: true` to replace old versions

## Troubleshooting

### Signature Not Saving
- Check SUPABASE_SERVICE_ROLE_KEY is set
- Verify storage bucket exists
- Check RLS policies allow insert

### PDF Generation Fails
- Ensure both signatures exist in storage
- Check pdf-lib is installed
- Verify service role has storage access

### Email Not Sending
- Check RESEND_API_KEY is valid
- Verify EMAIL_FROM domain is verified
- Check recipient email addresses

### MOU Status Not Updating
- Verify database migration ran
- Check column names match code
- Ensure user has proper permissions

## Future Enhancements

### Possible Additions

1. **Version Control**
   - Track MOU versions
   - Require re-signing on updates
   - Archive old MOUs

2. **Bulk Operations**
   - Send MOUs to multiple holders
   - Batch PDF generation
   - Mass email notifications

3. **Reminders**
   - Email reminders for unsigned MOUs
   - Admin dashboard alerts
   - Scheduled follow-ups

4. **Audit Trail**
   - Log all signature events
   - Track IP addresses
   - Record timestamps

5. **Custom Terms**
   - Per-holder MOU variations
   - Dynamic revenue share
   - Custom clauses

## Support

For issues or questions:
1. Check this documentation
2. Review error logs in Supabase
3. Test with sample data
4. Contact development team
