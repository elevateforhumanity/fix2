# 📤 Program Holder Document Upload - Complete Guide

**Status:** ✅ Partially Built - Need to Add Full Upload Feature  
**Current:** Syllabus upload in setup  
**Needed:** General document upload system

---

## ✅ What You Have Now

### 1. Syllabus Upload (Setup Page)

**Location:** `/program-holder/onboarding/setup`

**What Works:**

- ✅ File input field
- ✅ File selection
- ✅ Form data handling
- ⚠️ Needs API endpoint to save

**Code:**

```typescript
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setFormData({ ...formData, syllabusFile: e.target.files[0] });
  }
};
```

### 2. Shop Documents System (Reference)

**Location:** `supabase/migrations/20251219_shop_onboarding_docs.sql`

**Tables:**

- ✅ `shop_documents` - Document storage
- ✅ Document types: MOU, payroll, workers_comp, business_license, insurance
- ✅ Approval workflow

**This is the model to follow for program holders.**

---

## 🎯 What You Need to Add

### Complete Document Upload System for Program Holders

**Required Components:**

1. Database table for program holder documents
2. Supabase storage bucket
3. Upload API endpoint
4. Upload UI component
5. Document management page

---

## 📋 Step-by-Step Implementation

### Step 1: Create Database Table (5 minutes)

**File:** `supabase/migrations/20251222_program_holder_documents.sql`

```sql
-- Program Holder Documents Table
-- Handles all document uploads for program holders

CREATE TABLE IF NOT EXISTS program_holder_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  -- Types: syllabus | license | insurance | accreditation |
  --        instructor_credentials | facility_photos | other
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER, -- in bytes
  mime_type TEXT,
  description TEXT,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  approved BOOLEAN NOT NULL DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  approval_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_program_holder_docs_user ON program_holder_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_docs_org ON program_holder_documents(organization_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_docs_type ON program_holder_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_program_holder_docs_approved ON program_holder_documents(approved);

-- RLS Policies
ALTER TABLE program_holder_documents ENABLE ROW LEVEL SECURITY;

-- Program holders can view their own documents
CREATE POLICY "Program holders can view own documents"
  ON program_holder_documents FOR SELECT
  USING (
    auth.uid() = user_id
    OR auth.uid() = uploaded_by
  );

-- Program holders can upload documents
CREATE POLICY "Program holders can upload documents"
  ON program_holder_documents FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'program_holder'
    )
  );

-- Admins can view all documents
CREATE POLICY "Admins can view all documents"
  ON program_holder_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Admins can approve documents
CREATE POLICY "Admins can approve documents"
  ON program_holder_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Comments
COMMENT ON TABLE program_holder_documents IS 'Document uploads for program holders (syllabus, licenses, credentials, etc)';
COMMENT ON COLUMN program_holder_documents.document_type IS 'syllabus | license | insurance | accreditation | instructor_credentials | facility_photos | other';
```

**Run This:**

1. Copy SQL above
2. Go to Supabase Dashboard → SQL Editor
3. Paste and run
4. Verify table created

---

### Step 2: Create Storage Bucket (5 minutes)

**In Supabase Dashboard:**

1. Go to Storage
2. Click "New Bucket"
3. Name: `program-holder-documents`
4. Public: No (private)
5. File size limit: 10MB
6. Allowed MIME types:
   - `application/pdf`
   - `image/jpeg`
   - `image/png`
   - `application/msword`
   - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**Or via SQL:**

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('program-holder-documents', 'program-holder-documents', false);

-- Storage policies
CREATE POLICY "Program holders can upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'program-holder-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Program holders can view own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'program-holder-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'program-holder-documents'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );
```

---

### Step 3: Create Upload API Endpoint (10 minutes)

**File:** `app/api/program-holder/documents/upload/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is program holder
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, organization_id')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'program_holder') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('documentType') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large (max 10MB)' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${user.id}/${timestamp}_${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('program-holder-documents')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('program-holder-documents')
      .getPublicUrl(fileName);

    // Save to database
    const { data: document, error: dbError } = await supabase
      .from('program_holder_documents')
      .insert({
        user_id: user.id,
        organization_id: profile.organization_id,
        document_type: documentType || 'other',
        file_name: file.name,
        file_url: publicUrl,
        file_size: file.size,
        mime_type: file.type,
        description: description || null,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Try to delete uploaded file
      await supabase.storage
        .from('program-holder-documents')
        .remove([fileName]);
      return NextResponse.json(
        { error: 'Failed to save document' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      document,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

### Step 4: Create Upload UI Component (15 minutes)

**File:** `app/program-holder/documents/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ProgramHolderDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const supabase = createClient();

  // Load documents
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('program_holder_documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDocuments(data);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        setError('File too large. Maximum size is 10MB.');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType) {
      setError('Please select a file and document type');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('documentType', documentType);
      formData.append('description', description);

      const response = await fetch('/api/program-holder/documents/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Document uploaded successfully!');
        setSelectedFile(null);
        setDocumentType('');
        setDescription('');
        loadDocuments();
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (doc: any) => {
    if (doc.approved) {
      return <CheckCircle className="text-green-600" size={20} />;
    } else if (doc.approved === false) {
      return <XCircle className="text-red-600" size={20} />;
    } else {
      return <Clock className="text-yellow-600" size={20} />;
    }
  };

  const getStatusText = (doc: any) => {
    if (doc.approved) return 'Approved';
    if (doc.approved === false) return 'Rejected';
    return 'Pending Review';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Document Management
          </h1>
          <p className="text-gray-600">
            Upload and manage your program documents
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type *
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type...</option>
                <option value="syllabus">Program Syllabus</option>
                <option value="license">Business License</option>
                <option value="insurance">Insurance Certificate</option>
                <option value="accreditation">Accreditation Documents</option>
                <option value="instructor_credentials">Instructor Credentials</option>
                <option value="facility_photos">Facility Photos</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File * (Max 10MB)
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes about this document..."
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={uploading || !selectedFile || !documentType}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Document
                </>
              )}
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Your Documents</h2>

          {documents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{doc.file_name}</h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {doc.document_type.replace('_', ' ')}
                        </p>
                        {doc.description && (
                          <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{formatFileSize(doc.file_size)}</span>
                          <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(doc)}
                        <span className="text-sm font-medium">{getStatusText(doc)}</span>
                      </div>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </a>
                    </div>
                  </div>
                  {doc.approval_notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                      <strong>Admin Notes:</strong> {doc.approval_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## ✅ IMPLEMENTATION CHECKLIST

### For You (Admin)

**1. Database Setup (5 min)**

- [ ] Run migration SQL in Supabase
- [ ] Verify table created
- [ ] Check RLS policies active

**2. Storage Setup (5 min)**

- [ ] Create storage bucket
- [ ] Set file size limit (10MB)
- [ ] Configure allowed file types
- [ ] Set storage policies

**3. API Endpoint (10 min)**

- [ ] Create `/app/api/program-holder/documents/upload/route.ts`
- [ ] Copy code from above
- [ ] Test with Postman or similar

**4. UI Page (15 min)**

- [ ] Create `/app/program-holder/documents/page.tsx`
- [ ] Copy code from above
- [ ] Test upload flow

**5. Add to Navigation (2 min)**

- [ ] Add "Documents" link to program holder dashboard
- [ ] Add to program holder menu

**Total Time:** ~40 minutes

---

## 🎯 What Your Program Holder Can Upload

**Document Types:**

1. ✅ Program Syllabus
2. ✅ Business License
3. ✅ Insurance Certificate
4. ✅ Accreditation Documents
5. ✅ Instructor Credentials
6. ✅ Facility Photos
7. ✅ Other Documents

**File Types Allowed:**

- PDF (.pdf)
- Word (.doc, .docx)
- Images (.jpg, .jpeg, .png)

**File Size Limit:** 10MB per file

---

## 📋 Admin Approval Workflow

**In Admin Dashboard:**

1. View uploaded documents: `/admin/program-holders/[id]/documents`
2. Review each document
3. Approve or reject
4. Add notes if needed
5. Program holder sees status update

**SQL for Admin Approval:**

```sql
UPDATE program_holder_documents
SET
  approved = true,
  approved_by = '[admin-user-id]',
  approved_at = NOW(),
  approval_notes = 'Document verified and approved'
WHERE id = '[document-id]';
```

---

## ✅ READY TO IMPLEMENT

**You have everything you need:**

- ✅ Database schema
- ✅ Storage configuration
- ✅ API endpoint code
- ✅ UI component code
- ✅ RLS policies
- ✅ Approval workflow

**Time to implement:** 40 minutes

**Then your program holder can:**

- Upload all required documents
- Track approval status
- Download uploaded files
- Manage document library

**Let me know when you're ready to implement and I'll help!** 🚀
