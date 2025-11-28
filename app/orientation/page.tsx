import Link from 'next/link';
import { CheckCircle, Video, FileText, Calendar, Users, Award } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Orientation | Elevate For Humanity',
  description: 'Complete your online orientation to get started with your training program.',
};

export default function OrientationPage() {
  const orientationModules = [
    {
      id: 1,
      title: 'Welcome & Introduction',
      duration: '15 min',
      type: 'video',
      icon: Video,
      description: 'Learn about Elevate for Humanity, our mission, and what to expect',
      completed: false,
      href: '/orientation/welcome',
    },
    {
      id: 2,
      title: 'Platform Navigation',
      duration: '20 min',
      type: 'interactive',
      icon: Users,
      description: 'Tour of the student portal, LMS, and key features',
      completed: false,
      href: '/orientation/platform-tour',
    },
    {
      id: 3,
      title: 'Code of Conduct',
      duration: '10 min',
      type: 'reading',
      icon: FileText,
      description: 'Review expectations, policies, and professional standards',
      completed: false,
      href: '/onboarding/handbook#code-of-conduct',
    },
    {
      id: 4,
      title: 'Program Requirements',
      duration: '15 min',
      type: 'reading',
      icon: FileText,
      description: 'Attendance, participation, and completion requirements',
      completed: false,
      href: '/orientation/requirements',
    },
    {
      id: 5,
      title: 'Support Services',
      duration: '10 min',
      type: 'video',
      icon: Users,
      description: 'Available resources, coaching, and how to get help',
      completed: false,
      href: '/orientation/support',
    },
    {
      id: 6,
      title: 'Schedule Your Start Date',
      duration: '5 min',
      type: 'action',
      icon: Calendar,
      description: 'Book your first class or orientation meeting',
      completed: false,
      href: '/orientation/schedule',
    },
    {
      id: 7,
      title: 'Competency Assessment',
      duration: '30 min',
      type: 'test',
      icon: Award,
      description: 'Complete pre-program assessment to establish baseline',
      completed: false,
      href: '/orientation/competency-test',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/student" className="inline-flex items-center text-white/90 hover:text-white text-sm mb-4">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Elevate for Humanity!
          </h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Complete your online orientation to get started with your training program. 
            This should take about 2 hours total.
          </p>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>0 of 7 modules completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️ Estimated time: 2 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
            <span className="text-sm text-slate-600">0%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div className="bg-red-600 h-3 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
          </div>
        </div>
      </section>

      {/* Orientation Modules */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Orientation Modules</h2>
            <p className="text-slate-600">
              Complete each module in order. You can pause and resume at any time.
            </p>
          </div>

          <div className="space-y-4">
            {orientationModules.map((module, index) => {
              const Icon = module.icon;
              const isLocked = index > 0 && !orientationModules[index - 1].completed;
              
              return (
                <Link
                  key={module.id}
                  href={isLocked ? '#' : module.href}
                  className={`block rounded-2xl border-2 transition-all ${
                    isLocked
                      ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                      : module.completed
                      ? 'border-green-200 bg-green-50 hover:border-green-300'
                      : 'border-slate-200 bg-white hover:border-red-300 hover:shadow-lg'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Module Number */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        module.completed
                          ? 'bg-green-500 text-white'
                          : isLocked
                          ? 'bg-slate-300 text-slate-500'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {module.completed ? '✓' : module.id}
                      </div>

                      {/* Module Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                              {module.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {module.description}
                            </p>
                          </div>
                          <Icon className={`w-6 h-6 ${
                            module.completed ? 'text-green-600' : 'text-slate-400'
                          }`} />
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                            module.type === 'video' ? 'bg-blue-100 text-blue-700' :
                            module.type === 'reading' ? 'bg-purple-100 text-purple-700' :
                            module.type === 'test' ? 'bg-orange-100 text-orange-700' :
                            module.type === 'action' ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {module.type === 'video' && '🎥'}
                            {module.type === 'reading' && '📖'}
                            {module.type === 'test' && '📝'}
                            {module.type === 'action' && '✅'}
                            {module.type === 'interactive' && '🖱️'}
                            {' '}{module.type}
                          </span>
                          <span className="text-sm text-slate-600">
                            ⏱️ {module.duration}
                          </span>
                          {isLocked && (
                            <span className="text-sm text-slate-500">
                              🔒 Complete previous module first
                            </span>
                          )}
                          {module.completed && (
                            <span className="text-sm text-green-600 font-semibold">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      {!isLocked && !module.completed && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            →
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-blue-50 rounded-2xl border-2 border-blue-200 p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                💡
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Need Help?</h3>
                <p className="text-slate-700 mb-4">
                  If you have questions or technical issues during orientation, our team is here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/faq"
                    className="inline-flex items-center justify-center rounded-full border-2 border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    View FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
