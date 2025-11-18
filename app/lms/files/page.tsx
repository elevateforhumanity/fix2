// app/lms/files/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Upload, File, Trash2, Download, FolderOpen } from 'lucide-react';

type FileItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
};

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    try {
      const res = await fetch('/api/files');
      if (!res.ok) {
        throw new Error('Failed to load files');
      }
      const data = await res.json();
      setFiles(data);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      await loadFiles();
    } catch (e: any) {
      setError(e.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this file?')) return;

    try {
      const res = await fetch(`/api/files?id=${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete file');
      }

      await loadFiles();
    } catch (e: any) {
      setError(e.message || 'Delete failed');
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6">
          <a href="/lms/dashboard" className="text-gray-700 hover:text-red-600 font-medium">
            Dashboard
          </a>
          <a href="/lms/courses" className="text-gray-700 hover:text-red-600 font-medium">
            Courses
          </a>
          <a href="/lms/files" className="text-red-600 font-semibold">
            Files
          </a>
        </nav>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files</h1>
            <p className="text-gray-600">
              Upload and manage your course materials, assignments, and documents
            </p>
          </div>

          {/* Upload Section */}
          <div className="elevate-card mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900 mb-1">Upload Files</h2>
                <p className="text-sm text-gray-600">
                  Upload documents, images, PDFs, and other course materials
                </p>
              </div>
              <label className="elevate-btn-primary cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Choose File'}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* Files List */}
          <div className="elevate-card">
            <h2 className="font-bold text-gray-900 mb-4">Your Files</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading files...</p>
              </div>
            ) : files.length > 0 ? (
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-white rounded-lg">
                        <File className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatFileSize(file.size)} •{' '}
                          {new Date(file.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">No Files Yet</h3>
                <p className="text-gray-600 mb-6">
                  Upload your first file to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
