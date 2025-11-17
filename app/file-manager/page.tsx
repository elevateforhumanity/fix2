'use client';

import { useState, useEffect } from 'react';

interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: Date;
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await loadFiles();
        alert('File uploaded successfully!');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (id: string) => {
    if (!confirm('Delete this file?')) return;

    try {
      const response = await fetch(`/api/files?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadFiles();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">File Manager</h1>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded-lg ${view === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
              >
                List
              </button>
            </div>
            <label className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700">
              {uploading ? 'Uploading...' : 'Upload File'}
              <input
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
        {/* Files */}
        {files.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No files yet. Upload your first file!
            </p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center justify-center h-32 bg-gray-100 rounded mb-3">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-4xl">📄</span>
                  )}
                </div>
                <h3
                  className="font-medium text-gray-900 truncate"
                  title={file.name}
                >
                  {file.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </p>
                <div className="flex gap-2 mt-3">
                  <a
                    href={file.url}
                    download
                    className="flex-1 text-center bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-white">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {file.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {file.type}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <a
                          href={file.url}
                          download
                          className="text-red-600 hover:text-blue-800"
                        >
                          Download
                        </a>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
