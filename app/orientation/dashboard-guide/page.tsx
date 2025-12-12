import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  BookOpen,
  Calendar,
  Award,
  MessageSquare,
  Settings,
  Clock,
  TrendingUp,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard Navigation Guide | Orientation',
  description: 'Complete guide to using your student dashboard and portal',
};

export default function DashboardGuidePage() {
  const dashboardFeatures = [
    {
      icon: Home,
      title: 'Dashboard Home',
      path: '/student/dashboard',
      description: 'Your central hub for all student activities',
      features: [
        'View your current program and progress',
        'See upcoming assignments and deadlines',
        'Quick access to all portal features',
        'Recent activity and notifications',
        'Program completion percentage',
      ],
    },
    {
      icon: BookOpen,
      title: 'My Courses',
      path: '/student/courses',
      description: 'Access all your enrolled courses',
      features: [
        'View course materials and lessons',
        'Complete assignments and quizzes',
        'Track course progress',
        'Access Milady CIMA courses (theory)',
        'Download course workbooks',
      ],
    },
    {
      icon: Clock,
      title: 'Hour Tracking',
      path: '/student/hours-tracking',
      description: 'Monitor your program hours',
      features: [
        'View theory hours from Milady CIMA',
        'Log practical hours (hands-on work)',
        'See combined progress toward requirements',
        'Track state board hour requirements',
        'Export hour reports',
      ],
    },
    {
      icon: Calendar,
      title: 'Schedule & Attendance',
      path: '/student/calendar',
      description: 'Manage your class schedule',
      features: [
        'View your class schedule',
        'Check attendance records',
        'Request time off or leave',
        'See upcoming events',
        'Sync with personal calendar',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Progress & Grades',
      path: '/student/grades',
      description: 'Track your academic performance',
      features: [
        'View current grades and GPA',
        'See assignment scores',
        'Track learning outcomes',
        'Monitor SAP (Satisfactory Academic Progress)',
        'View grade history',
      ],
    },
    {
      icon: Award,
      title: 'Certificates & Credentials',
      path: '/student/certificates',
      description: 'Access your earned credentials',
      features: [
        'Download completion certificates',
        'View industry certifications',
        'Access digital badges',
        'Share credentials on LinkedIn',
        'Request official transcripts',
      ],
    },
    {
      icon: MessageSquare,
      title: 'AI Instructor Assistant',
      path: '/student/ai-tutor',
      description: 'Get 24/7 help from AI instructor',
      features: [
        'Ask questions about your program',
        'Get course recommendations',
        'Understand assignments',
        'Navigate the portal',
        'Access resources and support',
      ],
    },
    {
      icon: FileText,
      title: 'Documents & Resources',
      path: '/student/resources',
      description: 'Access important documents',
      features: [
        'Student handbook',
        'Program workbooks',
        'Forms and applications',
        'Financial aid documents',
        'Career resources',
      ],
    },
    {
      icon: Settings,
      title: 'Profile & Settings',
      path: '/student/profile',
      description: 'Manage your account',
      features: [
        'Update personal information',
        'Change password',
        'Set notification preferences',
        'Manage privacy settings',
        'Update contact information',
      ],
    },
  ];

  const quickTips = [
    {
      title: 'Check Your Dashboard Daily',
      description:
        'Start each day by checking your dashboard for new assignments, announcements, and messages.',
      icon: CheckCircle,
    },
    {
      title: 'Use the AI Instructor',
      description:
        "Don't hesitate to ask the AI instructor for help. It's available 24/7 and can answer most questions instantly.",
      icon: MessageSquare,
    },
    {
      title: 'Track Your Hours',
      description:
        "Log your practical hours regularly. Don't wait until the end of the week - it's easier to remember details when they're fresh.",
      icon: Clock,
    },
    {
      title: 'Stay Organized',
      description:
        'Use the calendar feature to keep track of deadlines and important dates. Set reminders for yourself.',
      icon: Calendar,
    },
    {
      title: 'Monitor Your Progress',
      description:
        "Regularly check your progress page to ensure you're on track for graduation and meeting SAP requirements.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4 text-2xl md:text-3xl lg:text-4xl">
            Student Dashboard Navigation Guide
          </h1>
          <p className="text-xl text-blue-100">
            Everything you need to know about using your student portal
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Welcome to Your Student Portal
          </h2>
          <p className="text-slate-700 mb-4">
            Your student dashboard is your central hub for everything related to
            your education at Elevate for Humanity. This guide will help you
            navigate all the features and make the most of your learning
            experience.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900">
              <strong>Pro Tip:</strong> Bookmark your dashboard at /student/dashboard for quick access!
            </p>
          </div>
        </div>

        {/* Dashboard Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Dashboard Features
          </h2>
          <div className="space-y-6">
            {dashboardFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-slate-900">
                            {feature.title}
                          </h3>
                          <Link
                            href={feature.path}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                          >
                            <span>Go to {feature.title}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                        <p className="text-slate-600 mb-4">
                          {feature.description}
                        </p>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-900 mb-2">
                            What you can do:
                          </h4>
                          <ul className="space-y-2">
                            {feature.features.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-2 text-sm text-slate-700"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Instructor Guide */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white mb-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                Using the AI Instructor Assistant
              </h2>
              <p className="text-purple-100 mb-6">
                Your AI instructor is available 24/7 to help you succeed. Here's
                how to get the most out of it:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-3">What to Ask:</h3>
                  <ul className="space-y-2 text-purple-100">
                    <li>• "What courses should I take next?"</li>
                    <li>• "How do I log my practical hours?"</li>
                    <li>• "When is my next assignment due?"</li>
                    <li>• "How do I access Milady CIMA?"</li>
                    <li>• "What are the graduation requirements?"</li>
                    <li>• "How do I request financial aid?"</li>
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-3">
                    Tips for Best Results:
                  </h3>
                  <ul className="space-y-2 text-purple-100">
                    <li>• Be specific with your questions</li>
                    <li>• Mention your program if relevant</li>
                    <li>• Ask follow-up questions for clarity</li>
                    <li>• Use it for quick answers anytime</li>
                    <li>• For complex issues, contact staff</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/student/ai-tutor"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Start Chat with AI Instructor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Quick Tips for Success
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile App Info */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Access on Mobile
          </h2>
          <p className="text-slate-700 mb-4">
            Your student portal is fully responsive and works great on mobile
            devices. Access everything from your phone or tablet:
          </p>
          <ul className="space-y-2 text-slate-700 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Check your dashboard on the go</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Log practical hours from your phone</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Chat with AI instructor anywhere</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>View your schedule and grades</span>
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 text-sm">
              <strong>Tip:</strong> Add the portal to your phone's home screen
              for quick access. In your mobile browser, tap the share button and
              select "Add to Home Screen."
            </p>
          </div>
        </div>

        {/* Getting Help */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-orange-900 mb-4">
            Need Help?
          </h2>
          <p className="text-orange-800 mb-6">
            If you have questions or need assistance with the portal, we're here
            to help:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">AI Instructor</h3>
              <p className="text-sm text-slate-600 mb-3">
                Get instant answers 24/7
              </p>
              <Link
                href="/student/ai-tutor"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
              >
                Start Chat <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">
                Student Services
              </h3>
              <p className="text-sm text-slate-600 mb-1">Phone: 317-314-3757</p>
              <p className="text-sm text-slate-600 mb-1">
                Email: support@elevateforhumanity.org
              </p>
              <p className="text-sm text-slate-600">Mon-Fri, 8am-5pm EST</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">Help Center</h3>
              <p className="text-sm text-slate-600 mb-3">
                Browse FAQs and guides
              </p>
              <Link
                href="/faq"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
              >
                View FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-green-100 mb-6">
            Now that you know how to navigate the portal, it's time to dive in
            and start your learning journey!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/student/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </Link>
            <Link
              href="/student/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold border-2 border-white"
            >
              <BookOpen className="w-5 h-5" />
              <span>View My Courses</span>
            </Link>
            <Link
              href="/orientation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold border-2 border-white"
            >
              <Video className="w-5 h-5" />
              <span>Back to Orientation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
