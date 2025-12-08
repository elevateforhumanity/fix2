'use client';

import { useState } from 'react';
import VideoUploader from '@/components/admin/VideoUploader';
import { Video, Copy, Check } from 'lucide-react';

export default function VideoManagerPage() {
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleUploadComplete = (url: string) => {
    setUploadedVideos(prev => [url, ...prev]);
  };

  const copyToClipboard = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Video Manager
            </h1>
            <p className="text-lg text-slate-600">
              Upload and enhance videos for your hero banners and content
            </p>
          </div>

          {/* Uploader */}
          <div className="mb-12">
            <VideoUploader onUploadComplete={handleUploadComplete} />
          </div>

          {/* Uploaded Videos */}
          {uploadedVideos.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Video className="h-6 w-6" />
                Uploaded Videos
              </h2>
              <div className="space-y-4">
                {uploadedVideos.map((url, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-mono text-slate-600 break-all">
                          {url}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {copiedUrl === url ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy URL
                          </>
                        )}
                      </button>
                    </div>
                    <div className="mt-3">
                      <video
                        src={url}
                        controls
                        className="w-full max-w-md rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              📝 How to Use Your Enhanced Video
            </h3>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>1. Upload your video</strong> - Even low quality videos will be enhanced
              </p>
              <p>
                <strong>2. Copy the enhanced URL</strong> - Click the "Copy URL" button
              </p>
              <p>
                <strong>3. Use in your pages</strong> - Add to hero sections like this:
              </p>
              <pre className="bg-slate-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/uploads/videos/enhanced-xxxxx.mp4" type="video/mp4" />
</video>`}
              </pre>
              <p className="mt-4">
                <strong>4. For barber page</strong> - I'll add it automatically once you upload!
              </p>
            </div>
          </div>

          {/* Enhancement Details */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold text-slate-900 mb-3">
                ✨ What Gets Enhanced:
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Resolution upscaled to 1080p</li>
                <li>✓ Noise and grain removed</li>
                <li>✓ Colors enhanced and balanced</li>
                <li>✓ Contrast improved</li>
                <li>✓ Shaky footage stabilized</li>
                <li>✓ Optimized for web streaming</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold text-slate-900 mb-3">
                📹 Best Practices:
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Keep videos 10-30 seconds long</li>
                <li>• Show your barbershop atmosphere</li>
                <li>• Include cutting techniques</li>
                <li>• Good lighting helps enhancement</li>
                <li>• Horizontal (landscape) format</li>
                <li>• No audio needed (will be muted)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
