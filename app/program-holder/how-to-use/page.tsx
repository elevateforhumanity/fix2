import Link from 'next/link';
import {
  CheckCircle,
  ArrowRight,
  Users,
  BookOpen,
  FileText,
  Award,
  BarChart,
  Settings,
} from 'lucide-react';

export const metadata = {
  title: 'How to Utilize the System | Elevate for Humanity',
  description:
    'Complete guide on how to use the Elevate platform as a program holder',
,
  openGraph: {
    images: ["/images/success-new/success-10.jpg"],
    type: "website",
  }};

export default function HowToUsePage() {
  const steps = [
    {
      number: 1,
      title: 'Set Up Your Program',
      icon: Settings,
      description: 'Configure your training program details and requirements',
      tasks: [
        'Complete your program holder profile',
        'Add program information (name, description, duration)',
        'Upload program materials and syllabi',
        'Set WIOA, WRG, or JRI eligibility criteria',
        'Configure CIP/SOC codes for workforce alignment',
      ],
      link: '/program-holder/dashboard',
    },
    {
      number: 2,
      title: 'Create Your Courses',
      icon: BookOpen,
      description: 'Build course content and learning materials',
      tasks: [
        'Create course modules and lessons',
        'Upload video content (YouTube, Vimeo, or MP4)',
        'Add reading materials and documents',
        'Create quizzes and assessments',
        'Set lesson completion requirements',
      ],
      link: '/program-holder/courses',
    },
    {
      number: 3,
      title: 'Enroll Students',
      icon: Users,
      description: 'Add students to your programs and track enrollment',
      tasks: [
        'Review student applications',
        'Verify WIOA/WRG/JRI eligibility',
        'Approve enrollments',
        'Assign case managers',
        'Send welcome emails and orientation materials',
      ],
      link: '/program-holder/enrollments',
    },
    {
      number: 4,
      title: 'Monitor Progress',
      icon: BarChart,
      description: 'Track student progress and engagement',
      tasks: [
        'View student lesson completion',
        'Check video watch progress',
        'Review quiz scores and assessments',
        'Monitor attendance and participation',
        'Identify students who need support',
      ],
      link: '/program-holder/reports',
    },
    {
      number: 5,
      title: 'Manage Documentation',
      icon: FileText,
      description: 'Handle compliance and reporting requirements',
      tasks: [
        'Add case manager notes',
        'Document student interactions',
        'Track funding source information',
        'Generate WIOA compliance reports',
        'Export data for workforce boards',
      ],
      link: '/program-holder/reports',
    },
    {
      number: 6,
      title: 'Issue Certificates',
      icon: Award,
      description: 'Award certificates to students who complete programs',
      tasks: [
        'Review course completion status',
        'Verify all requirements met',
        'Generate certificates automatically',
        'Provide verification codes',
        'Send certificates to students',
      ],
      link: '/program-holder/certificates',
    },
  ];

  const keyFeatures = [
    {
      title: 'Student Enrollment Management',
      description:
        'Easily enroll students, verify eligibility, and track enrollment status',
      benefits: [
        'Automated eligibility verification',
        'Printable enrollment confirmations',
        'Case manager assignment',
        'Funding source tracking',
      ],
    },
    {
      title: 'Course Content Management',
      description:
        'Create and manage engaging course content with video, documents, and assessments',
      benefits: [
        'Video player with progress tracking',
        'YouTube/Vimeo integration',
        'Document uploads',
        'Quiz and assessment tools',
      ],
    },
    {
      title: 'Progress Tracking',
      description:
        'Monitor student progress in real-time with detailed analytics',
      benefits: [
        'Lesson completion tracking',
        'Video watch time analytics',
        'Quiz score tracking',
        'Attendance monitoring',
      ],
    },
    {
      title: 'WIOA Compliance Reporting',
      description: 'Generate reports that meet WIOA, WRG, and JRI requirements',
      benefits: [
        'Pre-formatted compliance reports',
        'CSV export for workforce boards',
        'Automated data collection',
        'Audit-ready documentation',
      ],
    },
    {
      title: 'Certificate Management',
      description: 'Automatically generate and manage student certificates',
      benefits: [
        'Completion verification',
        'Unique verification codes',
        'PDF certificate generation',
        'Digital credential tracking',
      ],
    },
    {
      title: 'Case Management Tools',
      description: 'Document student interactions and track case notes',
      benefits: [
        'Case note documentation',
        'Follow-up reminders',
        'Student communication history',
        'Barrier tracking',
      ],
    },
  ];

  const quickTips = [
    {
      title: 'Upload Videos First',
      tip: 'Start by uploading your video content to YouTube or Vimeo, then add the URLs to your lessons. This ensures faster loading and better streaming.',
    },
    {
      title: 'Set Clear Requirements',
      tip: 'Mark lessons as "required" so students know what they must complete. The system will automatically track completion.',
    },
    {
      title: 'Use Case Notes',
      tip: 'Document every student interaction in case notes. This helps with WIOA reporting and provides a complete student history.',
    },
    {
      title: 'Check Progress Weekly',
      tip: 'Review student progress reports weekly to identify students who may need additional support or intervention.',
    },
    {
      title: 'Export Data Regularly',
      tip: 'Export enrollment and progress data monthly for your records and workforce board reporting.',
    },
    {
      title: 'Verify Before Certificates',
      tip: 'Always verify that students have completed all required lessons before generating certificates. The system checks this automatically.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">System Guide</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/program-holder/training"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Training
          </Link>
          <Link
            href="/program-holder/dashboard"
            className="elevate-btn-primary"
          >
            Dashboard
          </Link>
        </div>
      </header>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-blue-600 text-white py-20">
        <div className="elevate-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How to Utilize the System
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            A complete guide to managing your training programs, enrolling
            students, tracking progress, and maintaining WIOA compliance on the
            Elevate platform
          </p>
          <Link
            href="#getting-started"
            className="elevate-btn-primary bg-white text-red-600 hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>
      {/* Step-by-Step Guide */}
      <section id="getting-started" className="py-16 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              6 Steps to Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these steps to effectively manage your training programs
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="elevate-card hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                        <Icon className="h-8 w-8 text-red-600 flex-shrink-0" />
                      </div>
                      <ul className="space-y-2 mb-4">
                        {step.tasks.map((task, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={step.link}
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                      >
                        Go to {step.title}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Key Features */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features You'll Use
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools to manage your training programs effectively
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="elevate-card hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Quick Tips */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Tips for Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Best practices from experienced program holders
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quickTips.map((item, index) => (
              <div
                key={index}
                className="elevate-card bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
              >
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Support CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="elevate-container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you every step of the way
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/program-holder/training"
              className="elevate-btn-primary bg-white text-red-600 hover:bg-gray-100"
            >
              View Training Resources
            </Link>
            <Link
              href="/contact"
              className="elevate-btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
