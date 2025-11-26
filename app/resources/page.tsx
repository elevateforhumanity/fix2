import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Video, Download, ExternalLink, BookOpen, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'Resources | Elevate for Humanity',
  description: 'Training materials, guides, and resources for students',
  openGraph: {
    images: ["/images/facilities-new/facility-18.jpg"],
    type: "website",
  }};

const resources = [
  {
    category: 'Study Guides',
    icon: BookOpen,
    items: [
      { title: 'CNA Exam Prep Guide', type: 'PDF', size: '2.4 MB' },
      { title: 'HVAC Fundamentals Workbook', type: 'PDF', size: '5.1 MB' },
      { title: 'Barber Theory Study Guide', type: 'PDF', size: '3.2 MB' },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    items: [
      { title: 'Patient Care Basics', type: 'Video', duration: '15:30' },
      { title: 'HVAC System Troubleshooting', type: 'Video', duration: '22:45' },
      { title: 'Clipper Techniques Masterclass', type: 'Video', duration: '18:20' },
    ],
  },
  {
    category: 'Forms & Documents',
    icon: FileCheck,
    items: [
      { title: 'Enrollment Application', type: 'PDF', size: '156 KB' },
      { title: 'WIOA Eligibility Form', type: 'PDF', size: '203 KB' },
      { title: 'Clinical Hours Log', type: 'Excel', size: '45 KB' },
    ],
  },
  {
    category: 'Career Resources',
    icon: FileText,
    items: [
      { title: 'Resume Template', type: 'Word', size: '89 KB' },
      { title: 'Interview Preparation Guide', type: 'PDF', size: '1.2 MB' },
      { title: 'Job Search Strategies', type: 'PDF', size: '890 KB' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-red-600 to-orange-500 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">Student Resources</h1>
            <p className="text-xl text-gray-100">
              Access study guides, video tutorials, forms, and career resources to support your training journey.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Icon className="text-red-600" size={24} />
                    </div>
                    <CardTitle>{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                      >
                        <div>
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-sm text-gray-600">
                            {item.type} • {item.size || item.duration}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
