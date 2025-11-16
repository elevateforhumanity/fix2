import Link from 'next/link';
import {
  BookOpen,
  Video,
  FileText,
  Users,
  Award,
  CheckCircle,
  Download,
} from 'lucide-react';

export const metadata = {
  title: 'Program Holder Training | Elevate for Humanity',
  description:
    'Training resources and documentation for program holders and training providers',
};

export default function ProgramHolderTrainingPage() {
  const trainingModules = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      lessons: [
        'System Overview and Navigation',
        'Setting Up Your Program Profile',
        'Understanding WIOA, WRG, and JRI Requirements',
        'Compliance and Reporting Basics',
      ],
    },
    {
      title: 'Student Management',
      icon: Users,
      lessons: [
        'Enrolling Students',
        'Tracking Student Progress',
        'Managing Case Notes',
        'Communication Best Practices',
      ],
    },
    {
      title: 'Course Administration',
      icon: Award,
      lessons: [
        'Creating and Managing Courses',
        'Uploading Course Materials',
        'Setting Up Video Lessons',
        'Managing Assessments and Quizzes',
      ],
    },
    {
      title: 'Reporting and Compliance',
      icon: FileText,
      lessons: [
        'Generating Reports',
        'WIOA Compliance Documentation',
        'Exporting Student Data',
        'Certificate Management',
      ],
    },
  ];

  const quickStartGuides = [
    {
      title: 'Quick Start Guide',
      description: 'Get up and running in 15 minutes',
      downloadUrl: '/docs/program-holder-quick-start.pdf',
    },
    {
      title: 'WIOA Compliance Checklist',
      description: 'Ensure your program meets all requirements',
      downloadUrl: '/docs/wioa-compliance-checklist.pdf',
    },
    {
      title: 'Student Enrollment Guide',
      description: 'Step-by-step enrollment process',
      downloadUrl: '/docs/student-enrollment-guide.pdf',
    },
    {
      title: 'Reporting Templates',
      description: 'Pre-formatted templates for common reports',
      downloadUrl: '/docs/reporting-templates.zip',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Program Holder Training
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/program-holder/dashboard"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Dashboard
          </Link>
          <Link href="/" className="elevate-btn-secondary">
            Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="elevate-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Program Holder Training
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Everything you need to successfully manage your training programs on
            the Elevate platform
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#video-tutorials"
              className="elevate-btn-primary bg-white text-blue-600 hover:bg-gray-100"
            >
              Watch Video Tutorials
            </Link>
            <Link
              href="#quick-guides"
              className="elevate-btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
            >
              Download Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Training Modules
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive training organized by topic to help you master the
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {trainingModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  className="elevate-card hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li
                        key={lessonIndex}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`#module-${index + 1}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-2"
                    >
                      Start Module
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section
        id="video-tutorials"
        className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Video Tutorials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch step-by-step video guides to learn the platform quickly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Platform Overview',
                duration: '5 min',
                description: 'Quick tour of the main features and navigation',
              },
              {
                title: 'Enrolling Students',
                duration: '8 min',
                description: 'Complete walkthrough of the enrollment process',
              },
              {
                title: 'Creating Courses',
                duration: '12 min',
                description: 'How to set up and manage your course content',
              },
              {
                title: 'Progress Tracking',
                duration: '6 min',
                description: 'Monitor student progress and completion',
              },
              {
                title: 'Generating Reports',
                duration: '10 min',
                description: 'Create WIOA-compliant reports and exports',
              },
              {
                title: 'Certificate Management',
                duration: '7 min',
                description: 'Issue and manage student certificates',
              },
            ].map((video, index) => (
              <div
                key={index}
                className="elevate-card hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-600 flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Video Coming Soon</p>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {video.duration}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Watch →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guides */}
      <section id="quick-guides" className="py-16 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Start Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download PDF guides and templates to help you get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quickStartGuides.map((guide, index) => (
              <div
                key={index}
                className="elevate-card hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {guide.description}
                    </p>
                    <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="elevate-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Additional Support?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to help you succeed with your training programs
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="elevate-card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive guides and FAQs
                </p>
                <Link
                  href="/docs"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  View Docs →
                </Link>
              </div>
              <div className="elevate-card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Live Support</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Chat with our support team
                </p>
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Contact Us →
                </Link>
              </div>
              <div className="elevate-card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Webinars</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Join live training sessions
                </p>
                <Link
                  href="/webinars"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Schedule →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="elevate-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Access your program holder dashboard to begin managing your training
            programs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/program-holder/dashboard"
              className="elevate-btn-primary bg-white text-blue-600 hover:bg-gray-100"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/program-holder/apply"
              className="elevate-btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
            >
              Apply as Program Holder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
