/**
 * Video Builder
 * Upload, manage, and configure video content for courses
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Video, 
  Play,
  Pause,
  Settings,
  Download,
  Trash2,
  Eye,
  Clock,
  FileVideo,
  Youtube,
  Link2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface VideoFile {
  id: string;
  title: string;
  filename: string;
  duration: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  thumbnail?: string;
  url?: string;
  views?: number;
}

export default function VideoBuilder() {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'youtube' | 'url'>('file');
  const [videos, setVideos] = useState<VideoFile[]>([
    {
      id: 'video-1',
      title: 'Introduction to Barbering',
      filename: 'intro-barbering.mp4',
      duration: '5:30',
      size: '125 MB',
      uploadDate: '2024-01-15',
      status: 'ready',
      views: 45
    },
    {
      id: 'video-2',
      title: 'Advanced Fade Techniques',
      filename: 'fade-techniques.mp4',
      duration: '12:45',
      size: '280 MB',
      uploadDate: '2024-01-16',
      status: 'ready',
      views: 32
    },
    {
      id: 'video-3',
      title: 'Safety and Sanitation',
      filename: 'safety-sanitation.mp4',
      duration: '8:15',
      size: '180 MB',
      uploadDate: '2024-01-17',
      status: 'processing'
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Uploading files:', files);
    }
  };

  const deleteVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId));
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Video Builder | Staff Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Builder</h1>
              <p className="text-gray-600">Upload and manage video content for your courses</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Upload className="h-5 w-5" />
              Upload Video
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Library */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Video Library</h2>
                  <p className="text-sm text-gray-600 mt-1">{videos.length} videos</p>
                </div>

                <div className="p-6">
                  {videos.length === 0 ? (
                    <div className="text-center py-12">
                      <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No videos uploaded yet</p>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Upload Your First Video
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {videos.map((video) => (
                        <div
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                            selectedVideo?.id === video.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Thumbnail */}
                            <div className="w-32 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Play className="h-8 w-8 text-white" />
                            </div>

                            {/* Video Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-900 mb-1">{video.title}</h3>
                                  <p className="text-sm text-gray-600">{video.filename}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {video.status === 'ready' && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                      <CheckCircle className="h-3 w-3" />
                                      Ready
                                    </span>
                                  )}
                                  {video.status === 'processing' && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                                      <Clock className="h-3 w-3 animate-spin" />
                                      Processing
                                    </span>
                                  )}
                                  {video.status === 'error' && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                                      <AlertCircle className="h-3 w-3" />
                                      Error
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {video.duration}
                                </span>
                                <span>{video.size}</span>
                                <span>Uploaded: {video.uploadDate}</span>
                                {video.views !== undefined && (
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {video.views} views
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Preview video
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Preview"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteVideo(video.id);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Video Settings Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                {selectedVideo ? (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Video Settings
                    </h2>

                    {/* Video Title */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={selectedVideo.title}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Add video description..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Thumbnail */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Thumbnail
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition cursor-pointer">
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload custom thumbnail</p>
                      </div>
                    </div>

                    {/* Video Settings */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Auto-play</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Show controls</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Allow download</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                        <CheckCircle className="h-5 w-5" />
                        Save Changes
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                        <Download className="h-5 w-5" />
                        Download Video
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Select a video to edit settings</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Video</h2>

                {/* Upload Method Tabs */}
                <div className="flex gap-4 mb-6 border-b">
                  <button
                    onClick={() => setUploadMethod('file')}
                    className={`pb-3 px-4 font-semibold transition ${
                      uploadMethod === 'file'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FileVideo className="h-5 w-5 inline mr-2" />
                    Upload File
                  </button>
                  <button
                    onClick={() => setUploadMethod('youtube')}
                    className={`pb-3 px-4 font-semibold transition ${
                      uploadMethod === 'youtube'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Youtube className="h-5 w-5 inline mr-2" />
                    YouTube
                  </button>
                  <button
                    onClick={() => setUploadMethod('url')}
                    className={`pb-3 px-4 font-semibold transition ${
                      uploadMethod === 'url'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Link2 className="h-5 w-5 inline mr-2" />
                    External URL
                  </button>
                </div>

                {/* Upload Content */}
                {uploadMethod === 'file' && (
                  <div>
                    <label className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition cursor-pointer">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        Drop video files here or click to browse
                      </p>
                      <p className="text-sm text-gray-600">
                        Supports MP4, MOV, AVI (Max 2GB per file)
                      </p>
                    </label>
                  </div>
                )}

                {uploadMethod === 'youtube' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <p className="text-sm text-gray-600">
                      Paste a YouTube video URL to embed it in your course
                    </p>
                  </div>
                )}

                {uploadMethod === 'url' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <p className="text-sm text-gray-600">
                      Link to a video hosted on your own server or CDN
                    </p>
                  </div>
                )}

                {/* Modal Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
