# Two-Step MOU Signing Implementation

## Overview

Successfully migrated from single-step to two-step MOU signing workflow where:

1. Program holder signs the MOU with digital signature
2. Admin countersigns the MOU
3. System generates final PDF with both signatures

## Database Changes

### Migration: `20240114_mou_two_step_signing.sql`

**New Fields in `program_holders` table:**

- `mou_holder_signed_at` - Timestamp when program holder signed
- `mou_holder_name` - Full name of program holder signatory
- `mou_holder_sig_url` - Storage path to holder's signature PNG
- `mou_admin_signed_at` - Timestamp when admin countersigned
- `mou_admin_name` - Full name of admin signatory
- `mou_admin_sig_url` - Storage path to admin's signature PNG
- `mou_final_pdf_url` - Storage path to final signed PDF

**Removed Fields:**

- `signed_mou_url` (replaced by `mou_final_pdf_url`)

**MOU Status Values:**

- `not_sent` - MOU not yet sent to program holder
- `pending` - MOU sent, awaiting holder signature
- `signed_by_holder` - Holder signed, awaiting admin countersignature
- `fully_executed` - Both parties signed, final PDF generated

**Storage Bucket:**

- Created `agreements` bucket for signatures and final PDFs
- RLS policies for program holders and admins

## Dependencies

**Added:**

- `react-signature-canvas` - Signature pad component
- `@types/react-signature-canvas` - TypeScript types

## Program Holder Flow

### Pages

**`/app/program-holder/mou/page.tsx`**

- Displays full MOU text in scrollable container
- Shows organization name and revenue share percentage
- Signature pad for drawing signature
- Input for full legal name
- Submit button to save signature
- Shows confirmation when signed, awaiting countersignature

### API Endpoints

**`/api/program-holder/me`** (GET)

- Returns current program holder info including MOU status
- Used by MOU signing page to load data

**`/api/program-holder/mou/sign`** (POST)

- Accepts: `{ name, signatureDataUrl }`
- Decodes base64 signature image
- Uploads PNG to `agreements/program_holders/{id}/holder_signature.png`
- Updates program_holders table with signature info
- Sets `mou_status` to `signed_by_holder`

**`/api/program-holder/mou/download`** (GET)

- Downloads final signed PDF (only available after fully executed)
- Returns PDF with proper filename

## Admin Flow

### Pages

**`/admin/program-holders/[id]/countersign-mou/page.tsx`**

- Shows program holder's signature and details
- Displays MOU summary
- Signature pad for admin to countersign
- Input for admin's full name
- Automatically generates final PDF after countersigning

**`/admin/program-holders/page.tsx`** (Updated)

- Shows MOU status badges with new workflow states
- "Countersign MOU" button for `signed_by_holder` status
- "Download Final MOU" button for `fully_executed` status
- Displays holder signed date

### API Endpoints

**`/api/admin/program-holders/[id]`** (GET)

- Returns single program holder with all MOU fields
- Used by countersigning page

**`/api/admin/program-holders/mou/countersign`** (POST)

- Accepts: `{ programHolderId, name, signatureDataUrl }`
- Uploads admin signature PNG to storage
- Updates program_holders table with admin signature info
- Sets `mou_status` to `fully_executed`

**`/api/admin/program-holders/mou/generate-pdf`** (POST)

- Accepts: `{ programHolderId }`
- Downloads both signature images from storage
- Generates PDF with MOU text using pdf-lib
- Embeds both signatures in PDF
- Uploads final PDF to `agreements/program_holders/{id}/MOU_signed.pdf`
- Updates `mou_final_pdf_url` in database

**`/api/admin/storage/signature`** (GET)

- Downloads signature images from storage
- Used by countersigning page to display holder's signature
- Query param: `?path={storage_path}`

## Updated Components

**`/app/program-holder/dashboard/page.tsx`**

- Updated to show different states:
  - `signed_by_holder` - Orange badge, awaiting countersignature message
  - `fully_executed` - Green badge, download link to final PDF
  - `pending/sent` - Blue badge, "Sign MOU Now" button links to `/program-holder/mou`

## Workflow Summary

### Program Holder Side:

1. Navigate to `/program-holder/mou`
2. Read MOU agreement text
3. Enter full legal name
4. Draw signature on canvas
5. Click "Sign & Submit MOU"
6. Signature saved, status → `signed_by_holder`
7. Wait for admin countersignature

### Admin Side:

1. View program holders list at `/admin/program-holders`
2. See "Countersign MOU" button for holders with `signed_by_holder` status
3. Click button to navigate to `/admin/program-holders/{id}/countersign-mou`
4. Review holder's signature and MOU details
5. Enter admin name and draw signature
6. Click "Countersign & Generate Final PDF"
7. System saves admin signature, generates PDF, status → `fully_executed`
8. Both parties can now download final signed PDF

## Storage Structure

```
agreements/
  program_holders/
    {program_holder_id}/
      holder_signature.png      # Program holder's signature
      admin_signature.png       # Admin's signature
      MOU_signed.pdf           # Final signed PDF with both signatures
```

## Security

- All signature uploads use Supabase service role key (server-side only)
- RLS policies ensure program holders can only access their own files
- Admins can access all files
- Signature images stored as PNG with base64 decoding
- Final PDFs include both signatures embedded in document

## Testing Checklist

- [ ] Program holder can sign MOU at `/program-holder/mou`
- [ ] Signature is saved to storage
- [ ] Status updates to `signed_by_holder`
- [ ] Admin sees "Countersign MOU" button
- [ ] Admin can view holder's signature
- [ ] Admin can countersign MOU
- [ ] Final PDF is generated with both signatures
- [ ] Status updates to `fully_executed`
- [ ] Both parties can download final PDF
- [ ] PDF contains correct MOU text and both signatures

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-side only!
```

## Migration Notes

- Old `signed_mou_url` field removed
- Existing MOUs with `signed` status should be migrated to `fully_executed`
- Old `mous` storage bucket can be deprecated in favor of `agreements`
- Old single-step signing pages at `/program-holder/sign-mou` can be removed
