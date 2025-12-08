'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import { 
  Upload, 
  Trash2, 
  Download, 
  Image as ImageIcon,
  Folder,
  Search,
  Grid,
  List,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  created_at: string;
  bucket: string;
}

export default function MediaStudioPage() {
  const router = useRouter();

  useEffect(() => {
    // Check admin auth
    fetch('/api/auth/check-admin')
      .then(res => res.json())
      .then(data => {
        if (!data.isAdmin) {
          router.push('/login?redirect=/admin');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const [buckets, setBuckets] = useState<string[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadBuckets();
  }, []);

  useEffect(() => {
    if (selectedBucket) {
      loadFiles(selectedBucket);
    }
  }, [selectedBucket]);

  const loadBuckets = async () => {
    try {
      const res = await fetch('/api/media/buckets');
      if (res.ok) {
        const data = await res.json();
        setBuckets(data.buckets);
        if (data.buckets.length > 0) {
          setSelectedBucket(data.buckets[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load buckets:', error);
    }
  };

  const loadFiles = async (bucket: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/media/files?bucket=${bucket}`);
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', selectedBucket);

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        loadFiles(selectedBucket);
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const deleteFile = async (fileName: string) => {
    if (!confirm(`Delete ${fileName}?`)) return;

    try {
      const res = await fetch('/api/media/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket: selectedBucket, fileName })
      });

      if (res.ok) {
        loadFiles(selectedBucket);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const optimizeImages = async () => {
    try {
      const res = await fetch('/api/media/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bucket: selectedBucket,
          files: Array.from(selectedFiles)
        })
      });

      if (res.ok) {
        alert('Images optimized successfully!');
        loadFiles(selectedBucket);
      }
    } catch (error) {
      console.error('Failed to optimize images:', error);
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Studio</h1>
          <p className="text-gray-600">Manage images, videos, and assets across all buckets</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Bucket Selector */}
              <select
                value={selectedBucket}
                onChange={(e) => setSelectedBucket(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                {buckets.map(bucket => (
                  <option key={bucket} value={bucket}>{bucket}</option>
                ))}
              </select>

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode */}
              <div className="flex gap-1 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Actions */}
              <button
                onClick={() => loadFiles(selectedBucket)}
                className="p-2 border rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={optimizeImages}
                disabled={selectedFiles.size === 0}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Optimize
              </button>

              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <Upload className="w-4 h-4" />
                Upload
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(uploadFile);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Files Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.name}
                className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative bg-gray-100">
                  {file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="flex-1 text-xs py-1 px-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteFile(file.name)}
                      className="text-xs py-1 px-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Created</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.name} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{file.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {(file.size / 1024).toFixed(1)} KB
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(file.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteFile(file.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
