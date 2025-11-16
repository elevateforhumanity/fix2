# Certificate System - Quick Start Guide

## For Admins

### Issue Single Certificate

1. Navigate to `/admin/programs/{CODE}/dashboard` (e.g., `/admin/programs/WRG/dashboard`)
2. Find learner in the table
3. Click **"Complete + Cert"** button
4. Certificate issued instantly with unique serial
5. Click **"PDF"** link to download certificate

### Bulk Issue Certificates

1. Navigate to `/admin/certifications/bulk`
2. Prepare CSV file with format:
   ```csv
   email,course_slug,issued_at,expires_at
   jane@example.com,cna-cert,2025-11-12,
   john@work.org,hvac-tech,,
   ```
3. Upload CSV file
4. Click **"Process CSV"**
5. Review results: issued count and any errors

### Set Course Expiry Rules

1. Edit course settings
2. Set **"Certificate validity (days)"** (e.g., 365 for 1 year)
3. Optionally set **"Certificate note"** (e.g., "Valid for 1 year from issue")
4. Save course
5. All future certificates will auto-expire after specified days

### Replace Certificate

```javascript
// API call to replace certificate
POST /api/cert/replace
{
  "old_serial": "EFH-A3F2B1C4",
  "reason": "Corrected learner name"
}
```

### Export Revocation Log

1. Navigate to admin area
2. Add download link:
   ```html
   <a href="/api/cert/revocations" target="_blank"> Download Revocation Log </a>
   ```
3. CSV downloads with all revoked certificates

## For Learners

### Verify Certificate

1. Visit `/cert/verify/{SERIAL}` (e.g., `/cert/verify/EFH-A3F2B1C4`)
2. View certificate details and status
3. Click **"Download PDF Certificate"** if valid
4. Share verification URL with employers

### Scan QR Code

1. Scan QR code on printed certificate
2. Automatically opens verification page
3. Confirms certificate authenticity

## For Developers

### Issue Certificate Programmatically

```typescript
const response = await fetch('/api/cert/issue', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 'uuid-here',
    course_id: 'uuid-here',
    expires_at: '2026-11-12T00:00:00Z', // optional
  }),
});

const { serial } = await response.json();
console.log('Certificate issued:', serial);
```

### Bulk Issue from Code

```typescript
const csv = `email,course_slug
jane@example.com,cna-cert
john@work.org,hvac-tech`;

const response = await fetch('/api/cert/bulk-issue', {
  method: 'POST',
  body: csv,
});

const { issued, errors } = await response.json();
console.log(`Issued: ${issued}, Errors: ${errors.length}`);
```

### Generate PDF URL

```typescript
const pdfUrl = `/api/cert/pdf?serial=${serial}`;
// Use in <a> tag or window.open()
```

### Check Certificate Status

```typescript
const { data: cert } = await supabase
  .from('certificates')
  .select('*')
  .eq('serial', serial)
  .single();

const isRevoked = !!cert.revoked_at;
const isExpired = cert.expires_at && new Date(cert.expires_at) < new Date();
const isValid = !isRevoked && !isExpired;
```

## CSV Format Reference

### Required Columns

- `email` - Learner email address
- `course_id` OR `course_slug` - Course identifier

### Optional Columns

- `issued_at` - Custom issue date (YYYY-MM-DD format)
- `expires_at` - Custom expiry date (YYYY-MM-DD format)

### Example CSV

```csv
email,course_slug,issued_at,expires_at
jane@example.com,cna-cert,2025-11-12,2026-11-12
john@work.org,hvac-tech,2025-11-10,
alice@company.com,phlebotomy,,2026-06-01
```

### Notes

- Empty `issued_at` defaults to current date
- Empty `expires_at` uses course expiry rule or no expiry
- CSV `expires_at` overrides course expiry rule
- Invalid rows logged to console, processing continues

## Serial Number Format

Format: `EFH-{8-CHAR-HEX}`

Examples:

- `EFH-A3F2B1C4`
- `EFH-7E9D2A5B`
- `EFH-1C4F8E2D`

Properties:

- Cryptographically random
- Unique (database constraint)
- Case-insensitive
- 12 characters total

## Expiry Rules Priority

1. **CSV `expires_at`** - Highest priority
2. **Course `cert_valid_days`** - Applied if no CSV expiry
3. **No expiry** - If neither set

Example:

- Course has `cert_valid_days = 365`
- CSV row has `expires_at = 2026-06-01`
- Result: Certificate expires 2026-06-01 (CSV wins)

Example:

- Course has `cert_valid_days = 365`
- CSV row has empty `expires_at`
- Result: Certificate expires 365 days from issue date

Example:

- Course has `cert_valid_days = 0` (or null)
- CSV row has empty `expires_at`
- Result: Certificate never expires

## Troubleshooting

### Certificate Not Found

- Verify serial number is correct (case-insensitive)
- Check database for certificate record
- Ensure certificate wasn't deleted

### PDF Generation Fails

- Check QR code generation (qrcode package)
- Verify @react-pdf/renderer is installed
- Check console for errors

### Bulk Upload Errors

- Verify CSV format (comma-separated, proper headers)
- Check email addresses exist in system
- Verify course slugs/IDs are correct
- Review console logs for specific errors

### Permission Denied

- Verify user role (admin/partner/instructor)
- Check Supabase RLS policies
- Ensure user is authenticated

### Serial Collision

- Automatic retry (3 attempts)
- If all fail, check database index
- Verify unique constraint on serial column

## Best Practices

1. **Always set course expiry rules** for compliance courses
2. **Use bulk upload** for cohort completions
3. **Export revocation log** regularly for audits
4. **Test verification page** before distributing certificates
5. **Keep CSV files** as backup records
6. **Document revocation reasons** for compliance
7. **Use replacement** instead of revoke+reissue for corrections

## Support

For issues:

1. Check browser console for errors
2. Review server logs
3. Verify database schema is current
4. Check Supabase connection
5. Ensure all dependencies installed
