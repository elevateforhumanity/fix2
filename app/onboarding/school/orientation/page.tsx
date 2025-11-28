'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video, FileText, CheckCircle, Download, School, Settings } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Welcome Training Providers',
    duration: '10 min',
    type: 'video',
    description: 'Partnership overview, revenue sharing, and mutual expectations',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 2,
    title: 'Program Holder Portal Setup',
    duration: '20 min',
    type: 'video',
    description: 'Account setup, profile configuration, and initial settings',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 3,
    title: 'Creating & Managing Courses',
    duration: '25 min',
    type: 'video',
    description: 'Course creation, curriculum upload, pricing, and scheduling',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 4,
    title: 'Student Enrollment & Management',
    duration: '18 min',
    type: 'video',
    description: 'Accepting enrollments, tracking attendance, and managing rosters',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 5,
    title: 'Payment & Revenue Tracking',
    duration: '15 min',
    type: 'video',
    description: 'Understanding revenue share, payment processing, and financial reports',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 6,
    title: 'Compliance & Reporting',
    duration: '20 min',
    type: 'video',
    description: 'WIOA reporting, attendance documentation, and outcome tracking',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 7,
    title: 'Communication Tools',
    duration: '12 min',
    type: 'video',
    description: 'Messaging students, announcements, and support tickets',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 8,
    title: 'Quality Standards & Best Practices',
    duration: '15 min',
    type: 'video',
    description: 'Teaching standards, student support, and continuous improvement',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 9,
    title: 'Partnership Agreement & MOU',
    duration: '10 min',
    type: 'document',
    description: 'Review and sign the program holder partnership agreement',
  },
];

const documents = [
  {
    title: 'Program Holder Partnership Agreement',
    description: 'MOU outlining partnership terms, revenue share, and responsibilities',
    url: '/program-holder/mou',
  },
  {
    title: 'Course Setup Checklist',
    description: 'Step-by-step checklist for creating your first course',
    url: '/documents/course-setup-checklist.pdf',
  },
  {
    title: 'Revenue Share Agreement',
    description: 'Details on payment structure and payout schedule',
    url: '/documents/revenue-share-agreement.pdf',
  },
  {
    title: 'Compliance Requirements Guide',
    description: 'WIOA and state compliance requirements for training providers',
    url: '/documents/compliance-requirements.pdf',
  },
  {
    title: 'Marketing Assets Package',
    description: 'Logos, templates, and promotional materials',
    url: '/documents/marketing-assets.zip',
  },
];

export default function ProgramOwnerOrientationPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const markComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const progress = (completedModules.length / modules.length) * 100;
  const allComplete = completedModules.length === modules.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/onboarding" className="inline-flex items-center text-white/90 hover:text-white text-sm mb-4">
            ← Back to Onboarding Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <School className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Training Provider Orientation</h1>
              <p className="text-xl text-orange-100 mt-2">
                Learn how to set up and manage your training programs
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{completedModules.length} of {modules.length} modules completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️ Total time: ~2.5 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
            <span className="text-sm text-slate-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-orange-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Training Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Setup & Training Modules</h2>
            
            <div className="space-y-4">
              {modules.map((module) => {
                const isCompleted = completedModules.includes(module.id);
                const isActive = activeModule === module.id;
                
                return (
                  <div key={module.id} className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setActiveModule(isActive ? null : module.id)}
                      className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          {isCompleted ? '✓' : module.id}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
                            {module.type === 'video' ? (
                              <Video className="w-5 h-5 text-slate-400" />
                            ) : (
                              <FileText className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{module.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>⏱️ {module.duration}</span>
                            {isCompleted && <span className="text-green-600 font-semibold">✓ Completed</span>}
                          </div>
                        </div>
                      </div>
                    </button>

                    {isActive && module.type === 'video' && (
                      <div className="border-t border-slate-200 p-6 bg-slate-50">
                        <div className="aspect-video bg-slate-900 rounded-lg mb-4">
                          <iframe
                            className="w-full h-full rounded-lg"
                            src={module.videoUrl}
                            title={module.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        {!isCompleted && (
                          <button
                            onClick={() => markComplete(module.id)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    )}

                    {isActive && module.type === 'document' && (
                      <div className="border-t border-slate-200 p-6 bg-slate-50">
                        <p className="text-sm text-slate-700 mb-4">
                          Download and review the required partnership documents.
                        </p>
                        <div className="space-y-3 mb-4">
                          {documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc.url}
                              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-orange-300 transition-colors"
                            >
                              <FileText className="w-5 h-5 text-orange-600" />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900">{doc.title}</div>
                                <div className="text-xs text-slate-600">{doc.description}</div>
                              </div>
                              <Download className="w-5 h-5 text-slate-400" />
                            </a>
                          ))}
                        </div>
                        {!isCompleted && (
                          <button
                            onClick={() => markComplete(module.id)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-4 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/program-holder"
                    className="block p-3 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors text-sm font-semibold"
                  >
                    → Program Holder Dashboard
                  </Link>
                  <Link
                    href="/program-holder/courses/create"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Create Your First Course
                  </Link>
                  <Link
                    href="/program-holder/mou"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Sign Partnership Agreement
                  </Link>
                  <Link
                    href="/program-holder/settings"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Account Settings
                  </Link>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Revenue Share</h4>
                <div className="bg-green-50 rounded-lg p-4 mb-3">
                  <div className="text-2xl font-bold text-green-700 mb-1">1/3</div>
                  <div className="text-sm text-green-600">You receive 1/3 of net revenue after books and fees</div>
                </div>
                <p className="text-xs text-slate-600">
                  Elevate handles marketing, enrollment, payment processing, and materials. You focus on teaching.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Partner Support</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Dedicated partner success team
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <a href="mailto:partners@elevateforhumanity.org" className="text-orange-600 hover:text-orange-700 ml-2">
                      partners@elevateforhumanity.org
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>
                    <a href="tel:+13173143757" className="text-orange-600 hover:text-orange-700 ml-2">
                      (317) 314-3757
                    </a>
                  </div>
                </div>
              </div>

              {allComplete && (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Orientation Complete!</span>
                  </div>
                  <p className="text-sm text-green-600 mb-3">
                    You're ready to create courses and start earning.
                  </p>
                  <Link
                    href="/program-holder"
                    className="block text-center rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-all"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
