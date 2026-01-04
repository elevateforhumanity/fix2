# Document Center Status Report

**Date:** January 4, 2026  
**Admin Portal:** `/admin/document-center`

---

## ❌ THE TRUTH: PARTIALLY BROKEN

Your document center in the admin portal is **60% working** but has critical issues.

---

## ✅ WHAT'S WORKING (3/5 tables)

### 1. `documents` table ✅

- **Status:** FULLY CONNECTED
- **Records:** 0 (empty but functional)
- **Purpose:** Main document storage for all users
- **Features:**
  - Document upload
  - Status tracking (pending/approved/rejected)
  - File metadata
  - Expiration dates
  - Admin review system

### 2. `document_requirements` table ✅

- **Status:** FULLY CONNECTED
- **Records:** 5 requirements configured
- **Purpose:** Define required documents per role
- **Current Requirements:**
  - **Students:**
    - ID verification (required)
    - Proof of income (optional)
    - Resume (optional)
  - **Program Holders:**
    - License (required)
    - Insurance (required)

### 3. `document_signatures` table ✅

- **Status:** FULLY CONNECTED
- **Records:** 0 (empty but functional)
- **Purpose:** Track document signatures
- **Features:**
  - Digital signature tracking
  - Signature timestamps
  - Document type tracking

---

## ❌ WHAT'S BROKEN (2/5 tables)

### 1. `program_holder_documents` table ❌

- **Status:** SCHEMA MISMATCH
- **Error:** `column program_holder_documents.status does not exist`
- **Issue:** The table exists but is missing the `status` column
- **Impact:** Cannot track program holder document approval status

**Fix Required:**

```sql
ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
```

### 2. `tax_documents` table ❌

- **Status:** DOES NOT EXIST
- **Error:** `Could not find the table 'public.tax_documents' in the schema cache`
- **Issue:** Table was never created in database
- **Impact:** Cannot store or manage tax documents

**Fix Required:**

```sql
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  document_type TEXT NOT NULL, -- 'w2', '1099', 'w4', '1040', 'state_return', 'other'
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  uploaded_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tax_documents_user_id ON tax_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_documents_year ON tax_documents(tax_year);
CREATE INDEX IF NOT EXISTS idx_tax_documents_type ON tax_documents(document_type);

ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update tax documents"
  ON tax_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );
```

---

## 📊 CURRENT FUNCTIONALITY

### What Works:

- ✅ Basic document upload for students
- ✅ Document requirements display
- ✅ Document signature tracking
- ✅ Admin can view uploaded documents
- ✅ RLS policies protect user data

### What's Broken:

- ❌ Program holder document status tracking
- ❌ Program holder document approval workflow
- ❌ Tax document storage
- ❌ Tax document management
- ❌ Complete document center dashboard (shows profiles instead of documents)

---

## 🐛 ADDITIONAL ISSUES FOUND

### Issue 1: Wrong Data Display

**File:** `/app/admin/document-center/page.tsx`  
**Problem:** The page queries `profiles` table instead of `documents` table

**Current Code (WRONG):**

```typescript
const { data: items, count: totalItems } = await supabase
  .from('profiles') // ❌ WRONG TABLE
  .select('*', { count: 'exact' })
  .order('created_at', { ascending: false })
  .limit(50);
```

**Should Be:**

```typescript
const { data: items, count: totalItems } = await supabase
  .from('documents') // ✅ CORRECT TABLE
  .select('*, profiles(full_name, email)', { count: 'exact' })
  .order('created_at', { ascending: false })
  .limit(50);
```

### Issue 2: Missing Document Categories

The page doesn't show documents by category:

- ID Verifications
- Licenses
- Insurance
- Tax Documents
- Certificates
- Background Checks

---

## 🔧 COMPLETE FIX SCRIPT

Run this in Supabase SQL Editor:

```sql
-- FIX 1: Add missing columns to program_holder_documents
ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

ALTER TABLE program_holder_documents
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- FIX 2: Create tax_documents table
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  uploaded_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tax_documents_user_id ON tax_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_documents_year ON tax_documents(tax_year);
CREATE INDEX IF NOT EXISTS idx_tax_documents_type ON tax_documents(document_type);

ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update tax documents"
  ON tax_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- VERIFY
SELECT
  'documents' as table_name,
  COUNT(*) as record_count
FROM documents
UNION ALL
SELECT
  'document_requirements',
  COUNT(*)
FROM document_requirements
UNION ALL
SELECT
  'document_signatures',
  COUNT(*)
FROM document_signatures
UNION ALL
SELECT
  'program_holder_documents',
  COUNT(*)
FROM program_holder_documents
UNION ALL
SELECT
  'tax_documents',
  COUNT(*)
FROM tax_documents;
```

---

## 📋 AFTER SQL FIX: Update Page Code

**File:** `/app/admin/document-center/page.tsx`

Change line 33-37 from:

```typescript
const { data: items, count: totalItems } = await supabase
  .from('profiles')
  .select('*', { count: 'exact' })
  .order('created_at', { ascending: false })
  .limit(50);
```

To:

```typescript
const { data: items, count: totalItems } = await supabase
  .from('documents')
  .select(
    `
    *,
    profiles:user_id (
      full_name,
      email
    )
  `,
    { count: 'exact' }
  )
  .order('created_at', { ascending: false })
  .limit(50);
```

---

## 🎯 SUMMARY

**Current Status:** 60% Working (3/5 tables functional)

**To Make It 100% Working:**

1. Run SQL fix script in Supabase dashboard
2. Update `/app/admin/document-center/page.tsx` to query correct table
3. Test document upload functionality
4. Test document approval workflow

**Time to Fix:** 5-10 minutes

**Impact:** Document center will be fully functional for:

- Student document uploads
- Program holder license/insurance tracking
- Tax document management
- Admin document review and approval
- Complete audit trail

---

**Next Step:** Run the SQL fix script, then I'll update the page code.
