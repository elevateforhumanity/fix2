import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Video, Book, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources | Student Portal',
  description: 'Access learning materials and resources',
};

export default function StudentResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/student/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Learning Resources
          </h1>
          <p className="text-slate-600 mt-2">
            Access study materials, guides, and additional learning content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FileText className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Study Guides
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Comprehensive guides for each course module
            </p>
            <span className="text-sm text-slate-500">12 documents</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Video className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Video Tutorials
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Step-by-step video instructions
            </p>
            <span className="text-sm text-slate-500">24 videos</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Book className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Reference Materials
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Industry standards and best practices
            </p>
            <span className="text-sm text-slate-500">8 resources</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Recent Resources
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'HVAC Systems Overview',
                type: 'PDF',
                size: '2.4 MB',
                icon: FileText,
              },
              {
                title: 'Safety Procedures Video',
                type: 'Video',
                size: '45 min',
                icon: Video,
              },
              {
                title: 'Industry Standards Guide',
                type: 'PDF',
                size: '1.8 MB',
                icon: Book,
              },
            ].map((resource, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <resource.icon className="h-8 w-8 text-red-600" />
                  <div>
                    <div className="font-medium text-slate-900">
                      {resource.title}
                    </div>
                    <div className="text-sm text-slate-500">
                      {resource.type} • {resource.size}
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">💡 Study Tips</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Download resources for offline access</li>
            <li>• Review study guides before starting each module</li>
            <li>• Watch video tutorials at your own pace</li>
            <li>• Bookmark important reference materials</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
