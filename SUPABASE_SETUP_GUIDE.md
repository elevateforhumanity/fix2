# Supabase Setup Guide - Tax Services

**Time Required:** 5 minutes  
**Difficulty:** Easy

---

## Quick Setup (Copy & Paste)

### Step 1: Run the Migration

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `/supabase/migrations/20241218_tax_services_tables.sql`
6. Paste into the SQL editor
7. Click **Run** (or press Ctrl+Enter)

**Expected Result:** You should see "Success. No rows returned" and a notice message confirming tables were created.

---

## What Gets Created

### Tables

1. **`tax_appointments`** - Stores appointment bookings
   - Supports in-person and virtual appointments
   - Tracks status (pending, confirmed, completed, cancelled)
   - Includes Zoom meeting fields for virtual appointments

2. **`tax_document_uploads`** - Tracks uploaded documents
   - Links to files in Supabase Storage
   - Tracks review status
   - Stores uploader contact info

### Storage Bucket

- **`tax-documents`** - Private bucket for tax documents
  - 10MB file size limit
  - Allowed types: PDF, JPG, PNG, DOC, DOCX
  - Organized by email: `supersonicfastcash/{email}/{timestamp}-{filename}`

### Security (RLS)

- ✅ Row Level Security enabled on all tables
- ✅ Public can create appointments (for booking form)
- ✅ Public can upload documents (for upload form)
- ✅ Users can only view their own data
- ✅ Service role has full access

### Helper Functions

- `get_tax_appointment_stats()` - Get appointment statistics
- `get_tax_document_stats()` - Get upload statistics

---

## Verify Setup

Run this query to verify everything was created:

```sql
-- Check tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('tax_appointments', 'tax_document_uploads');

-- Check bucket exists
SELECT * FROM storage.buckets WHERE id = 'tax-documents';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('tax_appointments', 'tax_document_uploads');
```

**Expected Results:**

- 2 tables found
- 1 bucket found
- Both tables have `rowsecurity = true`

---

## Test the Setup

### Test 1: Create an Appointment

```sql
INSERT INTO tax_appointments (
  name,
  email,
  phone,
  service,
  appointment_type,
  preferred_date,
  preferred_time
)
VALUES (
  'Test User',
  'test@example.com',
  '317-555-0100',
  'individual-tax-prep',
  'in-person',
  CURRENT_DATE + 1,
  '10:00'
)
RETURNING *;
```

### Test 2: View Appointments

```sql
SELECT * FROM tax_appointments ORDER BY created_at DESC LIMIT 5;
```

### Test 3: Get Statistics

```sql
SELECT * FROM get_tax_appointment_stats(CURRENT_DATE, CURRENT_DATE + 30);
```

---

## Environment Variables

Make sure these are set in your `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SWPG2HVYVH

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

---

## API Routes Status

### ✅ Ready to Use

- `/api/tax/book-appointment` - Appointment booking
- `/api/tax/upload-url` - Document upload URL generation

### How They Work

**Booking Flow:**

1. User fills form at `/tax/book-appointment`
2. Form submits to `/api/tax/book-appointment`
3. API inserts into `tax_appointments` table
4. Returns success/error

**Upload Flow:**

1. User selects files at `/tax/supersonicfastcash/documents`
2. For each file, request signed URL from `/api/tax/upload-url`
3. API generates signed URL for Supabase Storage
4. Client uploads directly to Storage using signed URL
5. API logs upload in `tax_document_uploads` table

---

## Common Issues & Solutions

### Issue: "relation does not exist"

**Solution:** Run the migration SQL again. Make sure you're in the correct project.

### Issue: "bucket not found"

**Solution:** The bucket creation might have failed. Run this manually:

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('tax-documents', 'tax-documents', false, 10485760)
ON CONFLICT (id) DO NOTHING;
```

### Issue: "permission denied"

**Solution:** Check that RLS policies were created. Run this:

```sql
SELECT * FROM pg_policies
WHERE tablename IN ('tax_appointments', 'tax_document_uploads');
```

### Issue: Upload fails with 403

**Solution:** Check storage policies:

```sql
SELECT * FROM storage.policies WHERE bucket_id = 'tax-documents';
```

---

## Email Notifications (Optional)

To enable email notifications for appointments:

1. **Install Resend or SendGrid:**

   ```bash
   npm install resend
   # or
   npm install @sendgrid/mail
   ```

2. **Add to `.env.local`:**

   ```bash
   RESEND_API_KEY=your_key
   # or
   SENDGRID_API_KEY=your_key
   ```

3. **Uncomment email code in:**
   - `/app/api/tax/book-appointment/route.ts`

---

## Zoom Integration (Optional)

To enable automatic Zoom meeting creation:

1. **Create Zoom App:**
   - Go to https://marketplace.zoom.us/
   - Create Server-to-Server OAuth app
   - Get Account ID, Client ID, Client Secret

2. **Add to `.env.local`:**

   ```bash
   ZOOM_ACCOUNT_ID=your_account_id
   ZOOM_CLIENT_ID=your_client_id
   ZOOM_CLIENT_SECRET=your_client_secret
   ```

3. **Install Zoom SDK:**

   ```bash
   npm install @zoom/meetingsdk
   ```

4. **Update booking API** to create meetings automatically

---

## Monitoring & Maintenance

### View Recent Appointments

```sql
SELECT
  name,
  email,
  service,
  appointment_type,
  preferred_date,
  preferred_time,
  status,
  created_at
FROM tax_appointments
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### View Upload Statistics

```sql
SELECT * FROM get_tax_document_stats(
  NOW() - INTERVAL '30 days',
  NOW()
);
```

### Clean Up Old Data (Run Monthly)

```sql
-- Archive completed appointments older than 1 year
UPDATE tax_appointments
SET status = 'archived'
WHERE status = 'completed'
AND completed_at < NOW() - INTERVAL '1 year';

-- Archive reviewed documents older than 1 year
UPDATE tax_document_uploads
SET status = 'archived'
WHERE status = 'reviewed'
AND reviewed_at < NOW() - INTERVAL '1 year';
```

---

## Support

If you encounter issues:

1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test API routes directly with curl/Postman

---

## ✅ Setup Complete!

Once the migration runs successfully, your tax services are ready to accept:

- ✅ Appointment bookings (in-person & virtual)
- ✅ Document uploads
- ✅ Contact information
- ✅ Status tracking

**Next Steps:**

1. Test the booking form: `/tax/book-appointment`
2. Test document upload: `/tax/supersonicfastcash/documents`
3. Check Supabase dashboard to see data flowing in
4. Set up email notifications (optional)
5. Configure Zoom integration (optional)

---

**Total Setup Time:** ~5 minutes  
**Status:** READY TO LAUNCH! 🚀
