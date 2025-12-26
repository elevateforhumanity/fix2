'use client';

import { useState } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    setUploading(true);
    const fileList = Array.from(e.target.files);
    
    for (const file of fileList) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/tax/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        
        setFiles(prev => [...prev, {
          id: data.id,
          name: file.name,
          size: file.size,
          type: file.type,
          url: data.url,
        }]);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    
    setUploading(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Tax Documents</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            W-2, 1099, receipts, ID (PDF, JPG, PNG up to 10MB)
          </p>
        </label>
      </div>

      {uploading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600 mt-2">Uploading...</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
