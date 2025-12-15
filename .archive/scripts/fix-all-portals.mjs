#!/usr/bin/env node

/**
 * Fix all portal dashboards with real data connections
 */

import { readFileSync, writeFileSync } from 'fs';

const portals = [
  {
    path: 'app/program-holder/portal/page.tsx',
    role: 'program_holder',
    title: 'Program Holder Portal',
    description: 'Manage your students, attendance, and reports'
  },
  {
    path: 'app/student/dashboard/page.tsx',
    role: 'student',
    title: 'Student Dashboard',
    description: 'Your learning hub - courses, progress, and achievements'
  },
  {
    path: 'app/portal/student/page.tsx',
    role: 'student',
    title: 'Student Portal',
    description: 'Access your courses and track your progress'
  },
  {
    path: 'app/employer/dashboard/page.tsx',
    role: 'employer',
    title: 'Employer Dashboard',
    description: 'Manage job postings and view candidate pipeline'
  },
  {
    path: 'app/staff-portal/dashboard/page.tsx',
    role: 'staff',
    title: 'Staff Dashboard',
    description: 'Manage students, courses, and operations'
  },
  {
    path: 'app/portal/staff/dashboard/page.tsx',
    role: 'staff',
    title: 'Staff Portal',
    description: 'Staff management and oversight tools'
  }
];

const generatePortalTemplate = (role, title, description) => `import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${title}',
  description: '${description}',
};

export default async function ${role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== '${role}') {
    redirect('/unauthorized');
  }

  ${role === 'student' ? `
  // Fetch student data
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(\`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url
      )
    \`)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  const { data: progress } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', user.id);

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('student_id', user.id);

  const completedCourses = enrollments?.filter(e => e.status === 'completed').length || 0;
  const inProgressCourses = enrollments?.filter(e => e.status === 'active').length || 0;
  const totalCertificates = certificates?.length || 0;
  ` : ''}

  ${role === 'program_holder' ? `
  // Fetch program holder data
  const { data: students } = await supabase
    .from('enrollments')
    .select(\`
      *,
      profiles (
        id,
        full_name,
        email
      ),
      courses (
        title
      )
    \`)
    .eq('program_holder_id', user.id);

  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('program_holder_id', user.id);

  const totalStudents = new Set(students?.map(s => s.student_id)).size || 0;
  const activeEnrollments = students?.filter(s => s.status === 'active').length || 0;
  const completions = students?.filter(s => s.status === 'completed').length || 0;
  ` : ''}

  ${role === 'employer' ? `
  // Fetch employer data
  const { data: jobPostings } = await supabase
    .from('job_postings')
    .select('*')
    .eq('employer_id', user.id)
    .order('created_at', { ascending: false });

  const { data: applications } = await supabase
    .from('job_applications')
    .select(\`
      *,
      profiles (
        full_name,
        email
      )
    \`)
    .in('job_posting_id', jobPostings?.map(j => j.id) || []);

  const activeJobs = jobPostings?.filter(j => j.status === 'active').length || 0;
  const totalApplications = applications?.length || 0;
  const newApplications = applications?.filter(a => a.status === 'pending').length || 0;
  ` : ''}

  ${role === 'staff' ? `
  // Fetch staff data
  const { data: allStudents } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student');

  const { data: allEnrollments } = await supabase
    .from('enrollments')
    .select('*');

  const { data: allCourses } = await supabase
    .from('courses')
    .select('*');

  const totalStudents = allStudents?.length || 0;
  const totalEnrollments = allEnrollments?.length || 0;
  const totalCourses = allCourses?.length || 0;
  ` : ''}

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">${title}</h1>
            <p className="text-xl text-blue-100">Welcome back, {profile.full_name || profile.email}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            ${role === 'student' ? `
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Courses</h3>
              <p className="text-3xl font-bold text-blue-600">{inProgressCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{completedCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Certificates</h3>
              <p className="text-3xl font-bold text-purple-600">{totalCertificates}</p>
            </div>
            ` : ''}
            
            ${role === 'program_holder' ? `
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Enrollments</h3>
              <p className="text-3xl font-bold text-green-600">{activeEnrollments}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completions</h3>
              <p className="text-3xl font-bold text-purple-600">{completions}</p>
            </div>
            ` : ''}

            ${role === 'employer' ? `
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Jobs</h3>
              <p className="text-3xl font-bold text-blue-600">{activeJobs}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Applications</h3>
              <p className="text-3xl font-bold text-green-600">{totalApplications}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">New</h3>
              <p className="text-3xl font-bold text-orange-600">{newApplications}</p>
            </div>
            ` : ''}

            ${role === 'staff' ? `
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Enrollments</h3>
              <p className="text-3xl font-bold text-green-600">{totalEnrollments}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Courses</h3>
              <p className="text-3xl font-bold text-purple-600">{totalCourses}</p>
            </div>
            ` : ''}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${role === 'student' ? `
              <Link href="/student/courses" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">My Courses</h3>
                <p className="text-sm text-gray-600">View and access your courses</p>
              </Link>
              <Link href="/student/progress" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Track Progress</h3>
                <p className="text-sm text-gray-600">See your learning progress</p>
              </Link>
              <Link href="/student/certificates" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Certificates</h3>
                <p className="text-sm text-gray-600">View your achievements</p>
              </Link>
              ` : ''}

              ${role === 'program_holder' ? `
              <Link href="/program-holder/portal/students" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Manage Students</h3>
                <p className="text-sm text-gray-600">View and manage your students</p>
              </Link>
              <Link href="/program-holder/portal/attendance" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Track Attendance</h3>
                <p className="text-sm text-gray-600">Record student attendance</p>
              </Link>
              <Link href="/program-holder/portal/reports" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">View Reports</h3>
                <p className="text-sm text-gray-600">Access analytics and reports</p>
              </Link>
              ` : ''}

              ${role === 'employer' ? `
              <Link href="/employer/post-job" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Post a Job</h3>
                <p className="text-sm text-gray-600">Create new job posting</p>
              </Link>
              <Link href="/employer/opportunities" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">View Candidates</h3>
                <p className="text-sm text-gray-600">Browse qualified candidates</p>
              </Link>
              <Link href="/employer/analytics" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Analytics</h3>
                <p className="text-sm text-gray-600">View hiring metrics</p>
              </Link>
              ` : ''}

              ${role === 'staff' ? `
              <Link href="/staff-portal/students" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Manage Students</h3>
                <p className="text-sm text-gray-600">View all students</p>
              </Link>
              <Link href="/staff-portal/courses" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Manage Courses</h3>
                <p className="text-sm text-gray-600">View all courses</p>
              </Link>
              <Link href="/admin" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Admin Panel</h3>
                <p className="text-sm text-gray-600">Access admin tools</p>
              </Link>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

console.log('🔧 Fixing all portal dashboards...\n');

let fixed = 0;
for (const portal of portals) {
  try {
    const newContent = generatePortalTemplate(portal.role, portal.title, portal.description);
    writeFileSync(portal.path, newContent, 'utf-8');
    console.log(`✅ Fixed: ${portal.path}`);
    fixed++;
  } catch (error) {
    console.log(`❌ Error fixing ${portal.path}:`, error.message);
  }
}

console.log(`\n✅ Fixed ${fixed} portal dashboards!`);
