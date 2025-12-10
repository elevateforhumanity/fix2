import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, GraduationCap, BookOpen, BarChart3, FileCheck, 
  Mail, Briefcase, DollarSign, Building2, Zap, 
  FolderOpen, Settings, TrendingUp, Award, Calendar,
  MessageSquare, Bell, Shield, Database, Workflow
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Elevate For Humanity',
  description: 'Unified admin control center',
};

export default async function UnifiedAdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch key metrics
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  const { count: pendingApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
              <p className="text-blue-100">Welcome back, {profile?.full_name || user.email}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200">Role</div>
              <div className="text-lg font-bold">{profile?.role || 'admin'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-slate-600 mb-1">Students</div>
            <div className="text-2xl font-bold text-blue-600">{totalStudents || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-slate-600 mb-1">Enrollments</div>
            <div className="text-2xl font-bold text-green-600">{totalEnrollments || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-slate-600 mb-1">Active</div>
            <div className="text-2xl font-bold text-orange-600">{activeEnrollments || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-slate-600 mb-1">Programs</div>
            <div className="text-2xl font-bold text-purple-600">{totalPrograms || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-slate-600 mb-1">Courses</div>
            <div className="text-2xl font-bold text-indigo-600">{totalCourses || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-slate-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-red-600">{pendingApplications || 0}</div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* STUDENT MANAGEMENT */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">Student Management</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/students" className="text-sm text-blue-600 hover:underline">
                  → View All Students
                </Link>
              </li>
              <li>
                <Link href="/admin/applicants" className="text-sm text-blue-600 hover:underline">
                  → Applications ({pendingApplications || 0} pending)
                </Link>
              </li>
              <li>
                <Link href="/admin/enrollments" className="text-sm text-blue-600 hover:underline">
                  → Enrollments
                </Link>
              </li>
              <li>
                <Link href="/admin/barriers" className="text-sm text-blue-600 hover:underline">
                  → Barrier Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* COURSE/PROGRAM MANAGEMENT */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Courses & Programs</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/programs" className="text-sm text-green-600 hover:underline">
                  → Manage Programs
                </Link>
              </li>
              <li>
                <Link href="/admin/courses" className="text-sm text-green-600 hover:underline">
                  → Manage Courses
                </Link>
              </li>
              <li>
                <Link href="/admin/curriculum" className="text-sm text-green-600 hover:underline">
                  → Curriculum Builder
                </Link>
              </li>
              <li>
                <Link href="/admin/course-builder" className="text-sm text-green-600 hover:underline">
                  → Course Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* ANALYTICS & REPORTS */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold">Analytics & Reports</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/analytics" className="text-sm text-purple-600 hover:underline">
                  → Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/reports" className="text-sm text-purple-600 hover:underline">
                  → Generate Reports
                </Link>
              </li>
              <li>
                <Link href="/admin/completions" className="text-sm text-purple-600 hover:underline">
                  → Completion Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin/impact" className="text-sm text-purple-600 hover:underline">
                  → Impact Metrics
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPLIANCE & CERTIFICATION */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold">Compliance & Certs</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/compliance" className="text-sm text-orange-600 hover:underline">
                  → Compliance Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/certificates" className="text-sm text-orange-600 hover:underline">
                  → Issue Certificates
                </Link>
              </li>
              <li>
                <Link href="/admin/audit-logs" className="text-sm text-orange-600 hover:underline">
                  → Audit Logs
                </Link>
              </li>
              <li>
                <Link href="/admin/etpl-alignment" className="text-sm text-orange-600 hover:underline">
                  → ETPL Alignment
                </Link>
              </li>
            </ul>
          </div>

          {/* COMMUNICATION */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold">Communication</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/email-marketing" className="text-sm text-indigo-600 hover:underline">
                  → Email Campaigns
                </Link>
              </li>
              <li>
                <Link href="/admin/notifications" className="text-sm text-indigo-600 hover:underline">
                  → Send Notifications
                </Link>
              </li>
              <li>
                <Link href="/admin/live-chat" className="text-sm text-indigo-600 hover:underline">
                  → Live Chat Support
                </Link>
              </li>
              <li>
                <Link href="/admin/contacts" className="text-sm text-indigo-600 hover:underline">
                  → Contact Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* HR & STAFF */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold">HR & Staff</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/hr" className="text-sm text-teal-600 hover:underline">
                  → HR Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/instructors" className="text-sm text-teal-600 hover:underline">
                  → Manage Instructors
                </Link>
              </li>
              <li>
                <Link href="/admin/hr/employees" className="text-sm text-teal-600 hover:underline">
                  → Employee Directory
                </Link>
              </li>
              <li>
                <Link href="/admin/delegates" className="text-sm text-teal-600 hover:underline">
                  → Delegate Access
                </Link>
              </li>
            </ul>
          </div>

          {/* FUNDING & GRANTS */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Funding & Grants</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/funding" className="text-sm text-green-600 hover:underline">
                  → Funding Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/grants" className="text-sm text-green-600 hover:underline">
                  → Grant Management
                </Link>
              </li>
              <li>
                <Link href="/admin/jri" className="text-sm text-green-600 hover:underline">
                  → JRI Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin/wioa" className="text-sm text-green-600 hover:underline">
                  → WIOA Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* PARTNERSHIPS */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">Partnerships</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/employers" className="text-sm text-blue-600 hover:underline">
                  → Employer Partners
                </Link>
              </li>
              <li>
                <Link href="/admin/partners" className="text-sm text-blue-600 hover:underline">
                  → Training Partners
                </Link>
              </li>
              <li>
                <Link href="/admin/program-holders" className="text-sm text-blue-600 hover:underline">
                  → Program Holders
                </Link>
              </li>
              <li>
                <Link href="/admin/integrations" className="text-sm text-blue-600 hover:underline">
                  → System Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* AI & AUTOMATION */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold">AI & Automation</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/ai-console" className="text-sm text-purple-600 hover:underline">
                  → AI Console
                </Link>
              </li>
              <li>
                <Link href="/admin/copilot" className="text-sm text-purple-600 hover:underline">
                  → Admin Copilot
                </Link>
              </li>
              <li>
                <Link href="/admin/course-generator" className="text-sm text-purple-600 hover:underline">
                  → AI Course Generator
                </Link>
              </li>
              <li>
                <Link href="/admin/syllabus-generator" className="text-sm text-purple-600 hover:underline">
                  → Syllabus Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* OPERATIONS */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Workflow className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold">Operations</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/operations" className="text-sm text-orange-600 hover:underline">
                  → Operations Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/workflows" className="text-sm text-orange-600 hover:underline">
                  → Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/admin/data-processor" className="text-sm text-orange-600 hover:underline">
                  → Data Processor
                </Link>
              </li>
              <li>
                <Link href="/admin/schedule" className="text-sm text-orange-600 hover:underline">
                  → Schedule Management
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTENT & LIBRARY */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold">Content & Library</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/library" className="text-sm text-indigo-600 hover:underline">
                  → Content Library
                </Link>
              </li>
              <li>
                <Link href="/admin/documents" className="text-sm text-indigo-600 hover:underline">
                  → Document Center
                </Link>
              </li>
              <li>
                <Link href="/admin/files" className="text-sm text-indigo-600 hover:underline">
                  → File Manager
                </Link>
              </li>
              <li>
                <Link href="/admin/resources" className="text-sm text-indigo-600 hover:underline">
                  → Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* SETTINGS */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-bold">Settings</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/settings" className="text-sm text-slate-600 hover:underline">
                  → System Settings
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="text-sm text-slate-600 hover:underline">
                  → User Management
                </Link>
              </li>
              <li>
                <Link href="/admin/roles" className="text-sm text-slate-600 hover:underline">
                  → Roles & Permissions
                </Link>
              </li>
              <li>
                <Link href="/admin/preferences" className="text-sm text-slate-600 hover:underline">
                  → Preferences
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
