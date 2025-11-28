'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, FileText, CheckCircle, X, Folder } from 'lucide-react';

const documentCategories = [
  { value: 'mou', label: 'MOUs & Partnership Agreements' },
  { value: 'onboarding', label: 'Onboarding Forms' },
  { value: 'compliance', label: 'Compliance Documents' },
  { value: 'training', label: 'Training Materials' },
  { value: 'hr', label: 'HR Documents' },
  { value: 'financial', label: 'Financial Documents' },
  { value: 'student', label: 'Student Forms' },
  { value: 'other', label: 'Other Documents' },
];

export default function DocumentUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }

    setUploading(true);
    setError('');

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const res = await fetch('/api/admin/documents/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await res.json();
        setUploadedFiles(prev => [...prev, file.name]);
      }

      // Clear form after successful upload
      setFiles([]);
      setCategory('');
      
      setTimeout(() => {
        setUploadedFiles([]);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin" className="text-sm text-slate-600 hover:text-slate-900 mb-2 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Document Upload</h1>
          <p className="text-slate-600 mt-2">
            Upload MOUs, onboarding forms, and other important documents
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Upload Documents</h2>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Document Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select a category...</option>
                  {documentCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload Area */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Files *
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 text-slate-400 mb-4" />
                    <span className="text-sm font-semibold text-slate-700 mb-1">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-slate-500">
                      PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (max 10MB each)
                    </span>
                  </label>
                </div>
              </div>

              {/* Selected Files List */}
              {files.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {file.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <X className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success Messages */}
              {uploadedFiles.length > 0 && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Successfully Uploaded</span>
                  </div>
                  <ul className="text-sm text-green-600 space-y-1">
                    {uploadedFiles.map((name, idx) => (
                      <li key={idx}>✓ {name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={uploading || files.length === 0 || !category}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload Documents</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar - Quick Links */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Document Categories</h3>
              
              <div className="space-y-3 mb-6">
                {documentCategories.map((cat) => (
                  <div
                    key={cat.value}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <Folder className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-700">{cat.label}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link
                    href="/admin/documents"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → View All Documents
                  </Link>
                  <Link
                    href="/admin/documents/mou"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Manage MOUs
                  </Link>
                  <Link
                    href="/admin/documents/forms"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Onboarding Forms
                  </Link>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 mt-6">
                <h4 className="font-bold text-slate-900 mb-2">File Guidelines</h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Max file size: 10MB per file</li>
                  <li>• Accepted formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG</li>
                  <li>• Use descriptive file names</li>
                  <li>• Organize by category</li>
                  <li>• Remove sensitive data before uploading</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
