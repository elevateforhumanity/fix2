# Internal Docs Security Setup

## ⚠️ IMPORTANT: Before Production

The `/admin/internal-docs` page currently references files in `public/internal-docs/`.

**This is NOT secure for production** because anything in `public/` is accessible to anyone who knows the URL.

## 🔒 Secure Options

### Option 1: Supabase Storage (Recommended)

1. **Create a private bucket in Supabase:**
   ```sql
   -- In Supabase SQL Editor
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('internal-docs', 'internal-docs', false);
   ```

2. **Set up RLS policies:**
   ```sql
   -- Only staff/admin can access
   CREATE POLICY "Staff can view internal docs"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (
     bucket_id = 'internal-docs' AND
     EXISTS (
       SELECT 1 FROM auth.users
       WHERE auth.users.id = auth.uid()
       AND (auth.users.raw_user_meta_data->>'role' = 'admin' 
            OR auth.users.raw_user_meta_data->>'role' = 'staff')
     )
   );
   ```

3. **Upload files to Supabase Storage** instead of `public/`

4. **Update the internal-docs page** to generate signed URLs:
   ```typescript
   const { data } = await supabase.storage
     .from('internal-docs')
     .createSignedUrl('jri-wex-wrg.pdf', 3600); // 1 hour expiry
   ```

### Option 2: API Route with Auth Check

1. **Move files** from `public/internal-docs/` to `private/internal-docs/` (outside public)

2. **Create API route** `app/api/internal-docs/[filename]/route.ts`:
   ```typescript
   import { requireStaff } from '@/lib/auth-server';
   import { readFile } from 'fs/promises';
   import { NextRequest, NextResponse } from 'next/server';
   
   export async function GET(
     request: NextRequest,
     { params }: { params: { filename: string } }
   ) {
     // Check auth
     await requireStaff();
     
     // Stream file
     const filePath = `private/internal-docs/${params.filename}`;
     const file = await readFile(filePath);
     
     return new NextResponse(file, {
       headers: {
         'Content-Type': 'application/pdf', // or detect from filename
         'Content-Disposition': `inline; filename="${params.filename}"`,
       },
     });
   }
   ```

3. **Update hrefs** in internal-docs page:
   ```typescript
   href: `/api/internal-docs/jri-wex-wrg.pdf`
   ```

## 📝 Current Status

- ✅ Auth helper (`lib/auth-server.ts`) now uses real Supabase auth
- ✅ `requireStaff()` redirects unauthorized users
- ⚠️  Internal docs files still need to be moved to secure storage

## 🚀 Next Steps

Before going live:
1. Choose Option 1 (Supabase Storage) or Option 2 (API Route)
2. Move files from `public/internal-docs/` to secure location
3. Update hrefs in `/admin/internal-docs/page.tsx`
4. Test with staff and non-staff accounts
5. Delete `public/internal-docs/` folder

## 🧪 Testing

After implementing:
1. Try accessing `/admin/internal-docs` without being logged in → should redirect to login
2. Try accessing as a student → should redirect with unauthorized error
3. Try accessing as staff/admin → should work and files should download
4. Try accessing file URLs directly → should require auth
