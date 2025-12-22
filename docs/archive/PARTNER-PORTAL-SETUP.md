# Partner Portal Setup Guide

## Overview

The Partner Portal allows shop owners, site coordinators, and staff to manage student placements, submit attendance, upload documents, and track weekly progress.

## Database Tables Created

- `partner_documents` - Document uploads (MOU, W9, insurance, etc.)
- `partner_attendance` - Weekly attendance tracking per student

## Existing Tables Used

- `shops` - Partner locations
- `shop_staff` - User assignments to shops
- `apprentice_placements` - Student placements at shops
- `apprentice_weekly_reports` - Weekly progress reports

## Routes Created

- `/partners/login` - Partner login page
- `/partners/dashboard` - Overview of assigned shops
- `/partners/students` - List of students at partner locations
- `/partners/attendance` - Weekly attendance entry
- `/partners/documents` - Document upload and status
- `/partners/reports/weekly` - Weekly report submission
- `/partners/admin/shops` - Admin: manage shops
- `/partners/admin/placements` - Admin: manage placements
- `/partners/support` - Support information

## Setup Steps

### 1. Run Database Migration

```bash
# Apply the partner_documents and partner_attendance tables
# File: supabase/migrations/20241220_partner_documents_attendance.sql
```

### 2. Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create bucket: `partner-docs`
3. Set to Private
4. Add storage policies (admin + shop staff can read/write their shop folder)

### 3. Assign Users to Shops

```sql
-- Create a shop
INSERT INTO shops (name, active, city, state)
VALUES ('Example Barbershop', true, 'Indianapolis', 'IN')
RETURNING id;

-- Assign user to shop
INSERT INTO shop_staff (shop_id, user_id, role)
VALUES ('SHOP_UUID', 'USER_UUID', 'manager');

-- Create student placement
INSERT INTO apprentice_placements (shop_id, student_id, program_slug, status)
VALUES ('SHOP_UUID', 'STUDENT_UUID', 'barber-apprenticeship', 'active');
```

### 4. Test Access

1. Login as partner user at `/partners/login`
2. Should redirect to `/partners/dashboard`
3. Verify shops are listed
4. Navigate to Students page - should see placements
5. Test attendance entry
6. Test document upload

## RLS Policies

All tables have Row Level Security enabled:

- **Admin users** can see/edit everything
- **Shop staff** can only see/edit data for their assigned shops
- **Students** can see their own placements and attendance

## Troubleshooting

### "No shops assigned"

- User needs a row in `shop_staff` table linking them to a shop

### "No placements found"

- Shop needs student placements in `apprentice_placements` table

### Document upload fails

- Verify `partner-docs` storage bucket exists and is private
- Check storage policies allow shop staff to upload

### RLS errors

- Verify `is_admin()` and `is_shop_staff()` functions exist
- Check user has correct role in `profiles` table

## Next Steps

1. Create Supabase Storage bucket for partner documents
2. Add shop staff users via SQL or admin UI
3. Create student placements
4. Test full workflow: login → view students → log attendance → submit report
