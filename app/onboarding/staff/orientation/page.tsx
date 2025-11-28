'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video, FileText, CheckCircle, Download, Users, Settings, BookOpen } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Welcome to the Elevate Team',
    duration: '10 min',
    type: 'video',
    description: 'Mission, values, team structure, and your role in transforming lives',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 2,
    title: 'Platform Navigation & Dashboard',
    duration: '20 min',
    type: 'video',
    description: 'Complete tour of staff portal, student management, and reporting tools',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 3,
    title: 'Student Management System',
    duration: '15 min',
    type: 'video',
    description: 'Enrolling students, tracking progress, managing attendance, and documentation',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 4,
    title: 'Course & Content Management',
    duration: '18 min',
    type: 'video',
    description: 'Creating courses, uploading materials, managing assignments and assessments',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 5,
    title: 'Communication Tools',
    duration: '12 min',
    type: 'video',
    description: 'Messaging students, announcements, email templates, and notifications',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 6,
    title: 'Reporting & Compliance',
    duration: '15 min',
    type: 'video',
    description: 'WIOA reporting, attendance tracking, outcome documentation, and audits',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 7,
    title: 'Hour Tracking & Verification',
    duration: '10 min',
    type: 'video',
    description: 'Verifying apprenticeship hours, approving time logs, and licensure documentation',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 8,
    title: 'Support Services & Resources',
    duration: '12 min',
    type: 'video',
    description: 'Connecting students with support, referrals, and emergency assistance',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
  },
  {
    id: 9,
    title: 'Staff Handbook & Policies',
    duration: '10 min',
    type: 'document',
    description: 'Review staff handbook, code of conduct, and organizational policies',
  },
  {
    id: 10,
    title: 'Complete Onboarding Paperwork',
    duration: '15 min',
    type: 'document',
    description: 'W-9, direct deposit, emergency contacts, and background check authorization',
  },
];

const documents = [
  {
    title: 'Staff Handbook',
    description: 'Complete guide to policies, procedures, and expectations',
    url: '/documents/staff-handbook.pdf',
  },
  {
    title: 'W-9 Form',
    description: 'Tax information for contractors',
    url: '/documents/w9-form.pdf',
  },
  {
    title: 'Direct Deposit Form',
    description: 'Set up direct deposit for payroll',
    url: '/documents/direct-deposit-form.pdf',
  },
  {
    title: 'Emergency Contact Form',
    description: 'Emergency contact information',
    url: '/documents/emergency-contact-form.pdf',
  },
  {
    title: 'Background Check Authorization',
    description: 'Authorization for background screening',
    url: '/documents/background-check-auth.pdf',
  },
  {
    title: 'Platform Quick Reference Guide',
    description: 'Printable guide for common tasks',
    url: '/documents/platform-quick-reference.pdf',
  },
];

export default function StaffOrientationPage() {
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
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/onboarding" className="inline-flex items-center text-white/90 hover:text-white text-sm mb-4">
            ← Back to Onboarding Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Staff & Contractor Orientation</h1>
              <p className="text-xl text-purple-100 mt-2">
                Learn how to use the platform and support our students
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
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Training Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Training Modules</h2>
            
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
                            : 'bg-purple-100 text-purple-600'
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
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700 transition-all"
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
                          Download, review, and complete the required documents below.
                        </p>
                        <div className="space-y-3 mb-4">
                          {documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc.url}
                              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-purple-300 transition-colors"
                            >
                              <FileText className="w-5 h-5 text-purple-600" />
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
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700 transition-all"
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link
                    href="/staff-portal"
                    className="block p-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-semibold"
                  >
                    → Staff Portal Dashboard
                  </Link>
                  <Link
                    href="/staff-portal/students"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Student Management
                  </Link>
                  <Link
                    href="/staff-portal/courses"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Course Management
                  </Link>
                  <Link
                    href="/onboarding/handbook"
                    className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                  >
                    → Staff Handbook
                  </Link>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Training Resources</h4>
                <div className="space-y-2 text-sm">
                  <a href="/documents/platform-quick-reference.pdf" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                    <BookOpen className="w-4 h-4" />
                    <span>Quick Reference Guide</span>
                  </a>
                  <a href="/documents/video-tutorials.pdf" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                    <Video className="w-4 h-4" />
                    <span>Video Tutorial Library</span>
                  </a>
                  <a href="/faq" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                    <FileText className="w-4 h-4" />
                    <span>FAQ & Troubleshooting</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Need Help?</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Contact HR or your supervisor
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <a href="mailto:hr@elevateforhumanity.org" className="text-purple-600 hover:text-purple-700 ml-2">
                      hr@elevateforhumanity.org
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>
                    <a href="tel:+13173143757" className="text-purple-600 hover:text-purple-700 ml-2">
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
                    You're ready to start working with students.
                  </p>
                  <Link
                    href="/staff-portal"
                    className="block text-center rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-all"
                  >
                    Go to Staff Portal
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
