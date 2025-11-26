'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Upload, Video, CheckCircle } from 'lucide-react';

export default function VideoUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    lessonId: '',
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Create FormData for file upload
    const data = new FormData();
    data.append('file', file);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('courseId', formData.courseId);
    data.append('lessonId', formData.lessonId);

    try {
      const res = await fetch('/api/admin/videos/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      setUploadedUrl(result.url);
      alert('Video uploaded successfully!');
    } catch (error: any) {
      alert('Upload failed: ' + error.message);
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Video className="h-8 w-8" />
              Upload Course Video
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Upload videos for course lessons. Supports MP4, WebM, and other
              common formats.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Introduction to Medical Terminology"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the video content..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course ID
                  </label>
                  <input
                    type="number"
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Course ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lesson ID
                  </label>
                  <input
                    type="number"
                    value={formData.lessonId}
                    onChange={(e) =>
                      setFormData({ ...formData, lessonId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Lesson ID"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <label className="cursor-pointer">
                  <span className="text-brandPrimary font-semibold hover:underline">
                    Click to upload video
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  MP4, WebM, or MOV (max 500MB)
                </p>
              </div>

              {uploading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-blue-900 font-semibold">
                    Uploading video...
                  </p>
                  <p className="text-sm text-brandPrimary mt-1">
                    This may take a few minutes
                  </p>
                </div>
              )}

              {uploadedUrl && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-900 font-semibold mb-2">
                    <CheckCircle className="h-5 w-5" />
                    Upload Complete!
                  </div>
                  <p className="text-sm text-green-800">
                    Video URL: {uploadedUrl}
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-900 mb-2">
                  Video Autopilot Available
                </h4>
                <p className="text-sm text-yellow-800 mb-3">
                  Use the video autopilot generator to automatically create
                  course videos from scripts.
                </p>
                <Button variant="outline" size="sm">
                  Launch Video Autopilot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
