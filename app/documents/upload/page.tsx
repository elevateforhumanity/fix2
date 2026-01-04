'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface DocumentRequirement {
  document_type: string;
  is_required: boolean;
  description: string;
  instructions: string;
  has_uploaded: boolean;
  upload_status: string | null;
}

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [requirements, setRequirements] = useState<DocumentRequirement[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please sign in to upload documents');
        setLoading(false);
        return;
      }

      const { data, error: reqError } = await supabase.rpc('get_user_document_requirements', {
        p_user_id: user.id
      });

      if (reqError) throw reqError;
      setRequirements(data || []);
    } catch (err: any) {
      setError(`Error loading requirements: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file || !documentType) {
      setError('Please select a file and document type');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', documentType);
      if (expirationDate) {
        formData.append('expiration_date', expirationDate);
      }

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess('Document uploaded successfully!');
      setFile(null);
      setDocumentType('');
      setExpirationDate('');
      
      // Reload requirements to show updated status
      await loadRequirements();

      // Reset file input
      const fileInput = document.getElementById(
        'file-input'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Upload Documents</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Document Requirements</h2>
            {requirements.length === 0 ? (
              <p className="text-gray-600">No document requirements found for your role.</p>
            ) : (
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div key={req.document_type} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {req.document_type.replace(/_/g, ' ').toUpperCase()}
                          </h3>
                          {req.is_required && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                              Required
                            </span>
                          )}
                          {req.has_uploaded && (
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              req.upload_status === 'approved' ? 'bg-green-100 text-green-800' :
                              req.upload_status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {req.upload_status || 'Pending'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{req.description}</p>
                        <p className="text-xs text-gray-500">{req.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="document-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Document Type *
              </label>
              <select
                id="document-type"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select document type</option>
                {requirements.map((req) => (
                  <option key={req.document_type} value={req.document_type}>
                    {req.document_type.replace(/_/g, ' ').toUpperCase()}
                    {req.is_required ? ' (Required)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="file-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                File *
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Accepted formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>

            <div>
              <label
                htmlFor="expiration-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Expiration Date (Optional)
              </label>
              <input
                id="expiration-date"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Uploading...' : 'Upload Document'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/documents')}
                className="px-6 py-3 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
