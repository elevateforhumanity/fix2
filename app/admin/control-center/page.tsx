import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, Video, Users, Building2, FileText, Settings, 
  Zap, BarChart, MessageSquare, Award, Calendar, DollarSign,
  Shield, Bell, Mail, Database, Code, Cpu, Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/control-center",
  },
  title: 'Admin Control Center | Elevate For Humanity',
  description: 'Complete admin control with AI autopilot - build courses, manage content, and automate everything',
};

export default async function AdminControlCenter() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  const features = [
    {
      category: 'Content Creation (AI-Powered)',
      icon: Sparkles,
      color: 'purple',
      items: [
        { name: 'AI Course Builder', desc: 'Generate complete courses with AI', link: '/admin/ai-course-builder', icon: Sparkles },
        { name: 'Course Builder', desc: 'Build courses manually', link: '/admin/course-builder', icon: BookOpen },
        { name: 'Course Generator', desc: 'Auto-generate course content', link: '/admin/course-generator', icon: Cpu },
        { name: 'Program Generator', desc: 'Create training programs', link: '/admin/program-generator', icon: Building2 },
        { name: 'Quiz Builder', desc: 'Create assessments', link: '/admin/quiz-builder', icon: FileText },
        { name: 'Syllabus Generator', desc: 'Generate course syllabi', link: '/admin/syllabus-generator', icon: FileText },
      ]
    },
    {
      category: 'Content Management',
      icon: BookOpen,
      color: 'blue',
      items: [
        { name: 'Manage Courses', desc: 'View and edit all courses', link: '/admin/courses', icon: BookOpen },
        { name: 'Manage Programs', desc: 'View and edit programs', link: '/admin/programs', icon: Building2 },
        { name: 'Course Templates', desc: 'Pre-built course templates', link: '/admin/course-templates', icon: FileText },
        { name: 'Course Import', desc: 'Import courses from files', link: '/admin/course-import', icon: Database },
        { name: 'Videos', desc: 'Manage video content', link: '/admin/videos', icon: Video },
        { name: 'Course Authoring', desc: 'Advanced course editing', link: '/admin/course-authoring', icon: Code },
      ]
    },
    {
      category: 'User Management',
      icon: Users,
      color: 'green',
      items: [
        { name: 'Students', desc: 'Manage all students', link: '/admin/students', icon: Users },
        { name: 'Program Holders', desc: 'Manage program holders', link: '/admin/program-holders', icon: Building2 },
        { name: 'Instructors', desc: 'Manage instructors', link: '/admin/instructors', icon: Users },
        { name: 'Staff', desc: 'Manage staff members', link: '/admin/staff', icon: Users },
        { name: 'Employers', desc: 'Manage employer partners', link: '/admin/employers', icon: Building2 },
      ]
    },
    {
      category: 'Enrollment & Progress',
      icon: BarChart,
      color: 'orange',
      items: [
        { name: 'Enrollments', desc: 'View all enrollments', link: '/admin/enrollments', icon: Users },
        { name: 'Applications', desc: 'Review applications', link: '/admin/applications', icon: FileText },
        { name: 'Completions', desc: 'Track completions', link: '/admin/completions', icon: Award },
        { name: 'Certificates', desc: 'Manage certificates', link: '/admin/certificates', icon: Award },
        { name: 'Progress Tracking', desc: 'Monitor student progress', link: '/admin/progress', icon: BarChart },
      ]
    },
    {
      category: 'Automation & AI',
      icon: Zap,
      color: 'yellow',
      items: [
        { name: 'Autopilot Dashboard', desc: 'AI automation control', link: '/admin/autopilot', icon: Zap },
        { name: 'AI Console', desc: 'AI tools and settings', link: '/admin/ai-console', icon: Cpu },
        { name: 'Automated Tasks', desc: 'Schedule automated tasks', link: '/admin/automation', icon: Calendar },
        { name: 'Bulk Operations', desc: 'Bulk student operations', link: '/admin/bulk-operations', icon: Database },
      ]
    },
    {
      category: 'Communication',
      icon: MessageSquare,
      color: 'pink',
      items: [
        { name: 'Messages', desc: 'Send messages to users', link: '/admin/messages', icon: MessageSquare },
        { name: 'Notifications', desc: 'Manage notifications', link: '/admin/notifications', icon: Bell },
        { name: 'Email Campaigns', desc: 'Send email campaigns', link: '/admin/email-campaigns', icon: Mail },
        { name: 'Announcements', desc: 'Post announcements', link: '/admin/announcements', icon: Bell },
      ]
    },
    {
      category: 'Reports & Analytics',
      icon: BarChart,
      color: 'indigo',
      items: [
        { name: 'Analytics Dashboard', desc: 'View platform analytics', link: '/admin/analytics', icon: BarChart },
        { name: 'Reports', desc: 'Generate reports', link: '/admin/reports', icon: FileText },
        { name: 'Compliance Reports', desc: 'Compliance documentation', link: '/admin/compliance', icon: Shield },
        { name: 'Financial Reports', desc: 'Financial tracking', link: '/admin/financial', icon: DollarSign },
      ]
    },
    {
      category: 'System Settings',
      icon: Settings,
      color: 'slate',
      items: [
        { name: 'Platform Settings', desc: 'Configure platform', link: '/admin/settings', icon: Settings },
        { name: 'Integrations', desc: 'Manage integrations', link: '/admin/integrations', icon: Zap },
        { name: 'Database', desc: 'Database management', link: '/admin/database', icon: Database },
        { name: 'Security', desc: 'Security settings', link: '/admin/security', icon: Shield },
      ]
    }
  ];

  const colorClasses: any = {
    purple: 'bg-purple-100 text-purple-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    pink: 'bg-pink-100 text-pink-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    slate: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Control Center</h1>
              <p className="text-lg text-slate-600">Complete platform control with AI autopilot - build, manage, and automate everything</p>
            </div>
            <Link href="/admin/dashboard" className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800">
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/admin/ai-course-builder" className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
              <Sparkles className="text-purple-700 mb-2" size={24} />
              <p className="font-semibold text-slate-900">Build Course with AI</p>
              <p className="text-xs text-slate-600 mt-1">Generate complete courses automatically</p>
            </Link>
            <Link href="/admin/courses" className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
              <BookOpen className="text-blue-700 mb-2" size={24} />
              <p className="font-semibold text-slate-900">Manage Courses</p>
              <p className="text-xs text-slate-600 mt-1">View and edit all courses</p>
            </Link>
            <Link href="/admin/students" className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition">
              <Users className="text-green-700 mb-2" size={24} />
              <p className="font-semibold text-slate-900">Manage Students</p>
              <p className="text-xs text-slate-600 mt-1">View all students and enrollments</p>
            </Link>
            <Link href="/admin/autopilot" className="p-4 border-2 border-yellow-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition">
              <Zap className="text-yellow-700 mb-2" size={24} />
              <p className="font-semibold text-slate-900">Autopilot</p>
              <p className="text-xs text-slate-600 mt-1">AI automation control</p>
            </Link>
          </div>
        </div>

        {/* All Features */}
        {features.map((category, idx) => {
          const CategoryIcon = category.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[category.color]}`}>
                  <CategoryIcon size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {category.items.map((item, itemIdx) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link 
                      key={itemIdx}
                      href={item.link}
                      className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                    >
                      <div className="flex items-start gap-3">
                        <ItemIcon className="text-slate-600 group-hover:text-blue-700 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-blue-700">{item.name}</p>
                          <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Need Help?</h3>
          <p className="text-slate-700 mb-4">
            All features are accessible from this control center. Use AI Course Builder to create courses without coding. 
            The autopilot system can automate repetitive tasks and implement changes automatically.
          </p>
          <div className="flex gap-4">
            <Link href="/docs/admin-guide" className="text-blue-700 font-semibold hover:underline">
              View Admin Guide →
            </Link>
            <Link href="/support" className="text-blue-700 font-semibold hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
