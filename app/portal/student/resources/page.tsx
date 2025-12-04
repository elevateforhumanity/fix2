import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { FileText, Video, Download, BookOpen, File, Image, Music, Archive } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resources | Student Portal',
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const resources = [
    { id: 1, name: 'Course Syllabus.pdf', type: 'pdf', size: '2.4 MB', downloads: 45, category: 'Documents' },
    { id: 2, name: 'Lecture Video 1.mp4', type: 'video', size: '156 MB', downloads: 32, category: 'Videos' },
    { id: 3, name: 'Study Guide.docx', type: 'document', size: '1.2 MB', downloads: 67, category: 'Documents' },
    { id: 4, name: 'Practice Exercises.zip', type: 'archive', size: '5.8 MB', downloads: 28, category: 'Archives' },
  ];

  const categories = ['All', 'Documents', 'Videos', 'Images', 'Archives'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <FileText className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{resources.length}</p>
            <p className="text-sm text-gray-600">Total Resources</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Download className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{resources.reduce((sum, r) => sum + r.downloads, 0)}</p>
            <p className="text-sm text-gray-600">Total Downloads</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Video className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{resources.filter(r => r.type === 'video').length}</p>
            <p className="text-sm text-gray-600">Videos</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <BookOpen className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{resources.filter(r => r.type === 'pdf' || r.type === 'document').length}</p>
            <p className="text-sm text-gray-600">Documents</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap \${
                  cat === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Available Resources</h2>
          </div>
          <div className="divide-y">
            {resources.map((resource) => {
              const Icon = resource.type === 'video' ? Video :
                          resource.type === 'pdf' ? FileText :
                          resource.type === 'archive' ? Archive :
                          File;
              
              return (
                <div key={resource.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{resource.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{resource.size}</span>
                        <span>•</span>
                        <span>{resource.downloads} downloads</span>
                        <span>•</span>
                        <span>{resource.category}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
