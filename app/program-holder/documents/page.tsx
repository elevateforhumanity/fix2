'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  description: string | null;
  approved: boolean;
  approval_notes: string | null;
  created_at: string;
}

export default function ProgramHolderDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please login to view documents');
        setLoading(false);
        return;
      }

      // Check if table exists, if not, documents will be empty
      const { data, error: fetchError } = await supabase
        .from('program_holder_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error loading documents:', fetchError);
        // Table might not exist yet - that's okay
        setDocuments([]);
      } else if (data) {
        setDocuments(data);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please login to upload documents');
        setUploading(false);
        return;
      }

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `program-holders/${user.id}/${timestamp}_${sanitizedFileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, selectedFile, {
          contentType: selectedFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        setError('Upload failed. Please try again.');
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Save to database (if table exists)
      try {
        const { error: dbError } = await supabase
          .from('program_holder_documents')
          .insert({
            user_id: user.id,
            document_type: documentType,
            file_name: selectedFile.name,
            file_url: publicUrl,
            file_size: selectedFile.size,
            mime_type: selectedFile.type,
            description: description || null,
            uploaded_by: user.id,
            approved: false
          });

        if (dbError) {
          console.error('Database error:', dbError);
          // File uploaded but couldn't save to DB
          setSuccess('File uploaded! (Database record pending)');
        } else {
          setSuccess('Document uploaded successfully!');
        }
      } catch (dbErr) {
        console.error('Database error:', dbErr);
        setSuccess('File uploaded! (Database record pending)');
      }

      setSelectedFile(null);
      setDocumentType('');
      setDescription('');
      loadDocuments();
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (doc: Document) => {
    if (doc.approved) {
      return <CheckCircle className="text-green-600" size={20} />;
    } else if (doc.approved === false) {
      return <XCircle className="text-red-600" size={20} />;
    } else {
      return <Clock className="text-yellow-600" size={20} />;
    }
  };

  const getStatusText = (doc: Document) => {
    if (doc.approved) return 'Approved';
    if (doc.approved === false) return 'Rejected';
    return 'Pending Review';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select type...</option>
                <option value="syllabus">Program Syllabus</option>
                <option value="license">Business License</option>
                <option value="insurance">Insurance Certificate</option>
                <option value="accreditation">Accreditation Documents</option>
                <option value="instructor_credentials">Instructor Credentials</option>
                <option value="facility_photos">Facility Photos</option>
                <option value="mou">Signed MOU</option>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any notes about this document..."
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={uploading || !selectedFile || !documentType}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
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
              <p className="text-sm mt-2">Upload your first document above</p>
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
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Download size={16} />
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
