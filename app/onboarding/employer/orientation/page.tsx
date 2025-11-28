'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video, FileText, CheckCircle, Download, Play, Users, Briefcase } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Welcome to Elevate for Humanity',
    duration: '10 min',
    type: 'video',
    description: 'Learn about our mission, values, and how we connect employers with trained talent',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    completed: false,
  },
  {
    id: 2,
    title: 'Employer Portal Overview',
    duration: '15 min',
    type: 'video',
    description: 'Tour of the employer dashboard, job posting, and candidate management features',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    completed: false,
  },
  {
    id: 3,
    title: 'Posting Job Opportunities',
    duration: '12 min',
    type: 'video',
    description: 'Step-by-step guide to creating and managing job postings',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    completed: false,
  },
  {
    id: 4,
    title: 'Reviewing Candidates',
    duration: '10 min',
    type: 'video',
    description: 'How to review applications, schedule interviews, and provide feedback',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    completed: false,
  },
  {
    id: 5,
    title: 'Hiring & Onboarding Process',
    duration: '15 min',
    type: 'video',
    description: 'Best practices for hiring graduates and reporting outcomes',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    completed: false,
  },
  {
    id: 6,
    title: 'Partnership Agreement & Paperwork',
    duration: '5 min',
    type: 'document',
    description: 'Review and complete required partnership documents',
    completed: false,
  },
];

const documents = [
  {
    title: 'Employer Partnership Agreement',
    description: 'MOU outlining partnership terms and expectations',
    url: '/documents/employer-partnership-agreement.pdf',
  },
  {
    title: 'Job Posting Template',
    description: 'Template for creating effective job postings',
    url: '/documents/job-posting-template.docx',
  },
  {
    title: 'Hiring Checklist',
    description: 'Step-by-step checklist for hiring Elevate graduates',
    url: '/documents/hiring-checklist.pdf',
  },
  {
    title: 'Outcome Reporting Form',
    description: 'Form for reporting employment outcomes',
    url: '/documents/outcome-reporting-form.pdf',
  },
];

export default function EmployerOrientationPage() {
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/onboarding" className="inline-flex items-center text-white/90 hover:text-white text-sm mb-4">
            ← Back to Onboarding Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Briefcase className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Employer Orientation</h1>
              <p className="text-xl text-blue-100 mt-2">
                Learn how to partner with Elevate to hire trained talent
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{completedModules.length} of {modules.length} modules completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️ Total time: ~70 minutes</span>
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
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Modules */}
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
                            : 'bg-blue-100 text-blue-600'
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
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all"
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
                          Review and complete the required partnership documents below.
                        </p>
                        <div className="space-y-3 mb-4">
                          {documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc.url}
                              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                            >
                              <FileText className="w-5 h-5 text-blue-600" />
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
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all"
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
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
              
              <div className="space-y-3 mb-6">
                <Link
                  href="/employer/dashboard"
                  className="block p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-semibold"
                >
                  → Go to Employer Dashboard
                </Link>
                <Link
                  href="/employer/post-job"
                  className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                >
                  → Post a Job Opening
                </Link>
                <Link
                  href="/partners/mou"
                  className="block p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                >
                  → Sign Partnership Agreement
                </Link>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Need Help?</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Contact our employer relations team
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <a href="mailto:employers@elevateforhumanity.org" className="text-blue-600 hover:text-blue-700 ml-2">
                      employers@elevateforhumanity.org
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>
                    <a href="tel:+13173143757" className="text-blue-600 hover:text-blue-700 ml-2">
                      (317) 314-3757
                    </a>
                  </div>
                </div>
              </div>

              {allComplete && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Orientation Complete!</span>
                  </div>
                  <p className="text-sm text-green-600 mb-3">
                    You're ready to start posting jobs and hiring talent.
                  </p>
                  <Link
                    href="/employer/dashboard"
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
