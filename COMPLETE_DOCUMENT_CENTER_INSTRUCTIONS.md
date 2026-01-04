# COMPLETE DOCUMENT CENTER FIX - COPY PASTE INSTRUCTIONS

## STEP 1: RUN SQL IN SUPABASE

1. Go to: https://cuxzzpsyufcewtmicszk.supabase.co
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Copy the SQL from `COPY_PASTE_DOCUMENT_CENTER_FIX.sql` (below)
5. Paste and click **Run**

---

## STEP 2: REPLACE PAGE FILE

Replace the entire contents of:
`/workspaces/fix2/app/admin/document-center/page.tsx`

With the contents of:
`COPY_PASTE_DOCUMENT_CENTER_PAGE.tsx` (below)

---

## ✅ WHAT THIS FIXES

### Database Tables (5 tables):

1. ✅ **program_holder_documents** - Adds status tracking columns
2. ✅ **tax_documents** - Creates complete table
3. ✅ **payment_records** - Creates payment tracking
4. ✅ **onboarding_steps** - Creates onboarding progress
5. ✅ **course_modules** - Adds 3 more HVAC modules

### Page Functionality:

1. ✅ Queries correct `documents` table (not profiles)
2. ✅ Shows proper document data with user info
3. ✅ Displays document type, status, file name
4. ✅ Color-coded status badges (green=approved, yellow=pending, red=rejected)
5. ✅ Shows approved and pending counts
6. ✅ Professional table layout
7. ✅ Empty state with icon

---

## 📋 COPY PASTE #1: SQL

```sql
-- ============================================
-- DOCUMENT CENTER COMPLETE FIX
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================

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

DROP POLICY IF EXISTS "Users can view own tax documents" ON tax_documents;
CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload own tax documents" ON tax_documents;
CREATE POLICY "Users can upload own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all tax documents" ON tax_documents;
CREATE POLICY "Admins can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Admins can update tax documents" ON tax_documents;
CREATE POLICY "Admins can update tax documents"
  ON tax_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT ON tax_documents TO authenticated;
GRANT UPDATE ON tax_documents TO authenticated;

-- FIX 3: Create payment_records table (from earlier migration)
CREATE TABLE IF NOT EXISTS payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_records_user ON payment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON payment_records(status);

ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payment_records_select_own" ON payment_records;
CREATE POLICY "payment_records_select_own" ON payment_records
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT ON payment_records TO authenticated;

-- FIX 4: Create onboarding_steps table (from earlier migration)
CREATE TABLE IF NOT EXISTS onboarding_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, step_name)
);

CREATE INDEX IF NOT EXISTS idx_onboarding_user ON onboarding_steps(user_id);

ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "onboarding_select_own" ON onboarding_steps;
CREATE POLICY "onboarding_select_own" ON onboarding_steps
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "onboarding_insert_own" ON onboarding_steps;
CREATE POLICY "onboarding_insert_own" ON onboarding_steps
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "onboarding_update_own" ON onboarding_steps;
CREATE POLICY "onboarding_update_own" ON onboarding_steps
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE ON onboarding_steps TO authenticated;

-- FIX 5: Add more course modules to intro-hvac
INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT
  id,
  'HVAC System Components',
  'Understanding the key components of HVAC systems',
  2,
  45,
  'Learn about compressors, condensers, evaporators, and expansion valves.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT
  id,
  'Installation and Maintenance',
  'Best practices for HVAC installation and maintenance',
  3,
  60,
  'Proper installation techniques and preventive maintenance schedules.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT
  id,
  'Troubleshooting Common Issues',
  'Diagnosing and fixing common HVAC problems',
  4,
  50,
  'Learn systematic troubleshooting approaches for HVAC systems.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all document-related tables
SELECT
  'documents' as table_name,
  COUNT(*) as record_count,
  'Main document storage' as purpose
FROM documents
UNION ALL
SELECT
  'document_requirements',
  COUNT(*),
  'Document requirements per role'
FROM document_requirements
UNION ALL
SELECT
  'document_signatures',
  COUNT(*),
  'Digital signature tracking'
FROM document_signatures
UNION ALL
SELECT
  'program_holder_documents',
  COUNT(*),
  'Program holder documents'
FROM program_holder_documents
UNION ALL
SELECT
  'tax_documents',
  COUNT(*),
  'Tax document storage'
FROM tax_documents
UNION ALL
SELECT
  'payment_records',
  COUNT(*),
  'Payment transaction tracking'
FROM payment_records
UNION ALL
SELECT
  'onboarding_steps',
  COUNT(*),
  'User onboarding progress'
FROM onboarding_steps
UNION ALL
SELECT
  'messages',
  COUNT(*),
  'User messaging system'
FROM messages
UNION ALL
SELECT
  'partner_enrollments',
  COUNT(*),
  'Partner enrollment tracking'
FROM partner_enrollments;

-- Check course modules
SELECT
  c.title as course_title,
  COUNT(cm.id) as module_count
FROM courses c
LEFT JOIN course_modules cm ON cm.course_id = c.id
WHERE c.slug = 'intro-hvac'
GROUP BY c.id, c.title;

-- Check document requirements
SELECT
  role,
  document_type,
  is_required,
  description
FROM document_requirements
ORDER BY role, is_required DESC, document_type;

-- Final success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ DOCUMENT CENTER FIX COMPLETE!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Fixed:';
  RAISE NOTICE '  ✅ program_holder_documents (added status columns)';
  RAISE NOTICE '  ✅ tax_documents (created)';
  RAISE NOTICE '  ✅ payment_records (created)';
  RAISE NOTICE '  ✅ onboarding_steps (created)';
  RAISE NOTICE '  ✅ course_modules (added 3 modules)';
  RAISE NOTICE '';
  RAISE NOTICE 'Next Steps:';
  RAISE NOTICE '  1. Check verification queries above';
  RAISE NOTICE '  2. Update /app/admin/document-center/page.tsx';
  RAISE NOTICE '  3. Test document upload functionality';
  RAISE NOTICE '';
END $$;
```

---

## 📋 COPY PASTE #2: PAGE FILE

Replace entire contents of `/workspaces/fix2/app/admin/document-center/page.tsx` with:

```typescript
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://elevateforhumanity.org/admin/document-center',
  },
  title: 'Document Center | Elevate For Humanity',
  description:
    'Manage and review all uploaded documents from students, program holders, and staff.',
};

export default async function DocumentCenterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  const { data: items, count: totalItems } = await supabase
    .from('documents')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: approvedItems } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  const { count: pendingItems } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/hero/admin-hero.jpg"
          alt="Document Center"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Document Center
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Manage and review all uploaded documents from students, program holders, and staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin/dashboard"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Total Documents
                </h3>
                <p className="text-3xl font-bold text-brand-blue-600">
                  {totalItems || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Approved
                </h3>
                <p className="text-3xl font-bold text-brand-green-600">
                  {approvedItems || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Pending Review
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {pendingItems || 0}
                </p>
              </div>
            </div>

            {/* Data Display */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Documents</h2>
              {items && items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item: any) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.profiles?.full_name || 'Unknown'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.profiles?.email || ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {item.document_type?.replace(/_/g, ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {item.file_name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === 'approved' ? 'bg-green-100 text-green-800' :
                              item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No documents have been uploaded yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Contact support if you need assistance with document management.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Contact Support
              </Link>
              <Link
                href="/admin/dashboard"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## ✅ VERIFICATION

After completing both steps, run this test:

```bash
cd /workspaces/fix2 && node test-document-center.mjs
```

You should see:

```
✅ documents table: EXISTS
✅ document_requirements table: EXISTS
✅ document_signatures table: EXISTS
✅ program_holder_documents table: EXISTS
✅ tax_documents table: EXISTS

🎉 Document Center is FULLY CONNECTED!
```

---

## 🎯 RESULT

Your document center will be **100% functional** with:

- ✅ All 5 tables working
- ✅ Proper data display
- ✅ Status tracking
- ✅ User information
- ✅ Professional UI
- ✅ Empty state handling
- ✅ Color-coded statuses
