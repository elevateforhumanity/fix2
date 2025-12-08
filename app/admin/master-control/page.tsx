import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Briefcase,
  UserCheck,
  Brain,
  Zap,
  Settings,
  FileText,
  Image,
  Video,
  Mail,
  BarChart,
  Shield,
  Database,
  Code,
  BookOpen,
  Award,
  DollarSign,
  Calendar,
  MessageSquare,
  Bell,
  Globe,
  Smartphone
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/master-control",
  },
  title: 'Master Control Center | Admin',
  description: 'Access all platform features and user portals',
};

export default async function MasterControlPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }
  
  const { data: items, count: totalItems } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activeItems } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Get counts for all user types
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: totalProgramHolders } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'program_holder');

  const { count: totalEmployers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const { count: totalStaff } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'staff');

  const { count: totalInstructors } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'instructor');

  const sections = [
    {
      title: 'User Management',
      icon: Users,
      color: 'blue',
      items: [
        { name: 'All Users', href: '/admin/users', count: totalStudents + totalProgramHolders + totalEmployers + totalStaff },
        { name: 'Students', href: '/admin/students', count: totalStudents },
        { name: 'Program Holders', href: '/admin/program-holders', count: totalProgramHolders },
        { name: 'Employers', href: '/admin/employers', count: totalEmployers },
        { name: 'Staff', href: '/admin/staff', count: totalStaff },
        { name: 'Instructors', href: '/admin/instructors/performance', count: totalInstructors },
        { name: 'Applications', href: '/admin/applications' },
        { name: 'Enrollments', href: '/admin/enrollments' },
      ]
    },
    {
      title: 'Portal Access',
      icon: Globe,
      color: 'green',
      items: [
        { name: 'Student Portal', href: '/student/dashboard', description: 'View as student' },
        { name: 'Program Holder Portal', href: '/program-holder/portal', description: 'View as program holder' },
        { name: 'Employer Portal', href: '/employer/dashboard', description: 'View as employer' },
        { name: 'Staff Portal', href: '/staff-portal/dashboard', description: 'View as staff' },
        { name: 'Instructor Portal', href: '/instructor/dashboard', description: 'View as instructor' },
        { name: 'Workforce Board', href: '/workforce-board/dashboard', description: 'View as board member' },
      ]
    },
    {
      title: 'AI & Automation',
      icon: Brain,
      color: 'purple',
      items: [
        { name: 'AI Console', href: '/admin/ai-console', description: 'OpenAI, TTS, AI Instructor' },
        { name: 'Autopilots', href: '/admin/autopilots', description: 'Automated tasks' },
        { name: 'AI Course Builder', href: '/admin/ai-course-builder' },
        { name: 'Course Generator', href: '/admin/course-generator' },
        { name: 'AI Instructor', href: '/admin/ai-console', description: 'Chat with AI' },
        { name: 'Text-to-Speech', href: '/admin/ai-console', description: 'Generate audio' },
      ]
    },
    {
      title: 'Content Management',
      icon: BookOpen,
      color: 'orange',
      items: [
        { name: 'Courses', href: '/admin/courses' },
        { name: 'Course Builder', href: '/admin/course-builder' },
        { name: 'Course Studio', href: '/admin/course-studio' },
        { name: 'Programs', href: '/admin/programs' },
        { name: 'Curriculum Upload', href: '/admin/curriculum/upload' },
        { name: 'Course Templates', href: '/admin/course-templates' },
        { name: 'Quiz Builder', href: '/admin/quiz-builder' },
        { name: 'Syllabus Generator', href: '/admin/syllabus-generator' },
      ]
    },
    {
      title: 'Media & Assets',
      icon: Image,
      color: 'pink',
      items: [
        { name: 'Media Studio', href: '/admin/media-studio', description: 'Upload images' },
        { name: 'Video Upload', href: '/admin/videos/upload' },
        { name: 'Documents', href: '/admin/documents' },
        { name: 'Document Center', href: '/admin/document-center' },
        { name: 'Files', href: '/admin/files' },
        { name: 'Digital Binders', href: '/admin/document-center', description: 'Program workbooks' },
      ]
    },
    {
      title: 'Development Tools',
      icon: Code,
      color: 'indigo',
      items: [
        { name: 'Dev Studio', href: '/admin/dev-studio', description: 'Live code editor' },
        { name: 'Editor', href: '/admin/editor' },
        { name: 'Database', href: '/admin/data-processor' },
        { name: 'Migrations', href: '/admin/migrations' },
        { name: 'API Console', href: '/admin/console' },
        { name: 'Mobile Sync', href: '/admin/mobile-sync' },
      ]
    },
    {
      title: 'Analytics & Reports',
      icon: BarChart,
      color: 'cyan',
      items: [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Analytics', href: '/admin/analytics' },
        { name: 'Reports', href: '/admin/reports' },
        { name: 'Impact Metrics', href: '/admin/impact' },
        { name: 'Outcomes', href: '/admin/outcomes' },
        { name: 'Retention', href: '/admin/retention' },
        { name: 'Progress Tracking', href: '/admin/progress' },
        { name: 'Completions', href: '/admin/completions' },
      ]
    },
    {
      title: 'Certificates & Credentials',
      icon: Award,
      color: 'yellow',
      items: [
        { name: 'Certificates', href: '/admin/certificates' },
        { name: 'Issue Certificate', href: '/admin/certificates/issue' },
        { name: 'Bulk Certificates', href: '/admin/certificates/bulk' },
        { name: 'Certifications', href: '/admin/certifications/bulk' },
        { name: 'Apprenticeships', href: '/admin/apprenticeships' },
      ]
    },
    {
      title: 'Financial & Grants',
      icon: DollarSign,
      color: 'emerald',
      items: [
        { name: 'Grants', href: '/admin/grants' },
        { name: 'Grant Revenue', href: '/admin/grants/revenue' },
        { name: 'Grant Submissions', href: '/admin/grants/submissions' },
        { name: 'Payroll', href: '/admin/payroll' },
        { name: 'Payroll Cards', href: '/admin/payroll-cards' },
        { name: 'Cash Advances', href: '/admin/cash-advances' },
        { name: 'Funding', href: '/admin/funding' },
      ]
    },
    {
      title: 'HR & Operations',
      icon: Briefcase,
      color: 'red',
      items: [
        { name: 'HR Dashboard', href: '/admin/hr' },
        { name: 'Employees', href: '/admin/hr/employees' },
        { name: 'Payroll Processing', href: '/admin/hr/payroll' },
        { name: 'Time Tracking', href: '/admin/hr/time' },
        { name: 'Leave Management', href: '/admin/hr/leave' },
        { name: 'Operations', href: '/admin/operations' },
      ]
    },
    {
      title: 'Communications',
      icon: Mail,
      color: 'teal',
      items: [
        { name: 'Email Marketing', href: '/admin/email-marketing' },
        { name: 'Social Media', href: '/admin/social-media' },
        { name: 'Live Chat', href: '/admin/live-chat' },
        { name: 'Notifications', href: '/admin/notifications' },
        { name: 'Contacts', href: '/admin/contacts' },
        { name: 'Messages', href: '/admin/program-holder-acknowledgements' },
      ]
    },
    {
      title: 'Compliance & Security',
      icon: Shield,
      color: 'slate',
      items: [
        { name: 'Compliance Dashboard', href: '/admin/compliance-dashboard' },
        { name: 'Compliance', href: '/admin/compliance' },
        { name: 'Security', href: '/admin/security' },
        { name: 'Audit Logs', href: '/admin/audit-logs' },
        { name: 'Data Exports', href: '/admin/compliance/exports' },
        { name: 'Data Deletions', href: '/admin/compliance/deletions' },
      ]
    },
    {
      title: 'Partnerships',
      icon: Building2,
      color: 'violet',
      items: [
        { name: 'Partners', href: '/admin/partners' },
        { name: 'Partner Enrollments', href: '/admin/partner-enrollments' },
        { name: 'LMS Integrations', href: '/admin/partners/lms-integrations' },
        { name: 'HSI Enrollments', href: '/admin/hsi-enrollments' },
        { name: 'JRI Programs', href: '/admin/jri' },
        { name: 'External Modules', href: '/admin/external-modules/approvals' },
        { name: 'External Progress', href: '/admin/external-progress' },
      ]
    },
    {
      title: 'System Management',
      icon: Settings,
      color: 'gray',
      items: [
        { name: 'Settings', href: '/admin/settings' },
        { name: 'Site Health', href: '/admin/site-health' },
        { name: 'System Health', href: '/admin/system-health' },
        { name: 'Control Center', href: '/admin/control-center' },
        { name: 'Workflows', href: '/admin/workflows' },
        { name: 'Delegates', href: '/admin/delegates' },
        { name: 'Tenants', href: '/admin/tenants' },
      ]
    },
    {
      title: 'Student Support',
      icon: UserCheck,
      color: 'lime',
      items: [
        { name: 'Barriers', href: '/admin/barriers', description: 'Student barriers tracking' },
        { name: 'Learner Details', href: '/admin/learner', description: 'Individual student view' },
        { name: 'Applicants Live', href: '/admin/applicants-live' },
        { name: 'Applicants', href: '/admin/applicants' },
        { name: 'Success Stories', href: '/admin/success' },
      ]
    },
    {
      title: 'Integrations',
      icon: Zap,
      color: 'amber',
      items: [
        { name: 'Google Classroom', href: '/admin/google-classroom' },
        { name: 'Google Integrations', href: '/admin/integrations/google-classroom' },
        { name: 'ETPL Alignment', href: '/admin/etpl-alignment' },
        { name: 'Copilot', href: '/admin/copilot' },
        { name: 'Copilot Deploy', href: '/admin/copilot/deploy' },
      ]
    },
    {
      title: 'Documentation',
      icon: FileText,
      color: 'sky',
      items: [
        { name: 'MOU Documents', href: '/admin/mou' },
        { name: 'MOU Docs', href: '/admin/docs/mou' },
        { name: 'Internal Docs', href: '/admin/internal-docs' },
        { name: 'Signatures', href: '/admin/signatures/new' },
        { name: 'Employer Playbook', href: '/admin/employers-playbook' },
        { name: 'Funding Playbook', href: '/admin/funding-playbook' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Master Control"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Master Control
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Master Control Center</h1>
                <p className="text-xl text-blue-100">Access all 144 admin features + all user portals</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200">Logged in as</p>
                <p className="text-lg font-semibold">{profile?.full_name || user.email}</p>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs mt-1">
                  {profile?.role || 'admin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <p className="text-sm text-gray-600">Students</p>
              <p className="text-2xl font-bold text-blue-600">{totalStudents || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <p className="text-sm text-gray-600">Program Holders</p>
              <p className="text-2xl font-bold text-green-600">{totalProgramHolders || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <p className="text-sm text-gray-600">Employers</p>
              <p className="text-2xl font-bold text-purple-600">{totalEmployers || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <p className="text-sm text-gray-600">Staff</p>
              <p className="text-2xl font-bold text-orange-600">{totalStaff || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <p className="text-sm text-gray-600">Instructors</p>
              <p className="text-2xl font-bold text-pink-600">{totalInstructors || 0}</p>
            </div>
          </div>

          {/* All Feature Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-white rounded-lg shadow-sm border">
                  <div className={`bg-${section.color}-50 border-b border-${section.color}-100 px-6 py-4`}>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 text-${section.color}-600`} />
                      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                      <span className="text-sm text-gray-500">({section.items.length} features)</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="p-3 border rounded-lg hover:bg-gray-50 hover:border-blue-500 transition group"
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                            {item.name}
                            {item.count !== undefined && (
                              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
                                {item.count}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
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
