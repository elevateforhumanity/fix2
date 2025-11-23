'use client';

import Link from 'next/link';
import { FileText, Download, ExternalLink, Video, Image, File, Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function CourseResourcesPage() {
  const resources = {
    files: [
      { id: 1, name: 'Course Syllabus.pdf', type: 'pdf', size: '245 KB', category: 'Documents' },
      { id: 2, name: 'HVAC System Diagram.pdf', type: 'pdf', size: '1.2 MB', category: 'Documents' },
      { id: 3, name: 'Safety Guidelines.pdf', type: 'pdf', size: '890 KB', category: 'Documents' },
      { id: 4, name: 'Installation Checklist.xlsx', type: 'excel', size: '45 KB', category: 'Documents' },
    ],
    videos: [
      { id: 5, name: 'System Overview', type: 'video', duration: '15:30', category: 'Videos' },
      { id: 6, name: 'Installation Demo', type: 'video', duration: '25:45', category: 'Videos' },
      { id: 7, name: 'Troubleshooting Guide', type: 'video', duration: '18:20', category: 'Videos' },
    ],
    links: [
      { id: 8, name: 'EPA Certification Requirements', url: 'https://epa.gov', type: 'link', category: 'External Links' },
      { id: 9, name: 'HVAC Excellence Standards', url: 'https://hvacexcellence.org', type: 'link', category: 'External Links' },
      { id: 10, name: 'OSHA Safety Guidelines', url: 'https://osha.gov', type: 'link', category: 'External Links' },
    ],
    images: [
      { id: 11, name: 'Component Diagram.png', type: 'image', size: '2.1 MB', category: 'Images' },
      { id: 12, name: 'Wiring Schematic.jpg', type: 'image', size: '1.5 MB', category: 'Images' },
      { id: 13, name: 'Installation Steps.png', type: 'image', size: '3.2 MB', category: 'Images' },
    ],
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'excel':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-blue-600" />;
      case 'link':
        return <ExternalLink className="h-5 w-5 text-green-600" />;
      default:
        return <File className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/student/courses/hvac-systems" className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Course Resources</h1>
          <p className="text-gray-600 mt-2">HVAC Systems Installation</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Documents */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="h-5 w-5 text-slate-600" />
                  <h2 className="text-xl font-bold">Documents</h2>
                </div>
                <div className="space-y-2">
                  {resources.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <h3 className="font-medium text-slate-900">{file.name}</h3>
                          <p className="text-sm text-slate-600">{file.size}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Videos */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Video className="h-5 w-5 text-slate-600" />
                  <h2 className="text-xl font-bold">Video Resources</h2>
                </div>
                <div className="space-y-2">
                  {resources.videos.map((video) => (
                    <Link
                      key={video.id}
                      href={`/student/courses/hvac-systems/video/${video.id}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(video.type)}
                        <div>
                          <h3 className="font-medium text-slate-900">{video.name}</h3>
                          <p className="text-sm text-slate-600">{video.duration}</p>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">Watch →</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink className="h-5 w-5 text-slate-600" />
                  <h2 className="text-xl font-bold">External Resources</h2>
                </div>
                <div className="space-y-2">
                  {resources.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(link.type)}
                        <div>
                          <h3 className="font-medium text-slate-900">{link.name}</h3>
                          <p className="text-sm text-slate-600">{link.url}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="h-5 w-5 text-slate-600" />
                  <h2 className="text-xl font-bold">Images & Diagrams</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {resources.images.map((image) => (
                    <div
                      key={image.id}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-slate-100 flex items-center justify-center">
                        <Image className="h-12 w-12 text-slate-400" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-slate-900 mb-1">{image.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-600">{image.size}</p>
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4" />
                    Download All Files
                  </button>
                  <Link
                    href="/student/courses/hvac-systems"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-blue-600 transition-colors"
                  >
                    Back to Course
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resource Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Documents</span>
                    <span className="font-medium text-slate-900">{resources.files.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Videos</span>
                    <span className="font-medium text-slate-900">{resources.videos.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">External Links</span>
                    <span className="font-medium text-slate-900">{resources.links.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Images</span>
                    <span className="font-medium text-slate-900">{resources.images.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Can't find what you're looking for? Contact your instructor or visit the help center.
                </p>
                <Link
                  href="/student/support"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Get Support →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
