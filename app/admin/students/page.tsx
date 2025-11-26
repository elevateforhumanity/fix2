import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, Mail, Phone, Calendar, Eye, Edit } from 'lucide-react';
import { requireAdmin, createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Manage Students | Admin',
  description: 'Manage all students in the system',
};

export default async function AdminStudentsPage() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  // Fetch all students with their enrollment counts
  const { data: students, error } = await supabase
    .from('profiles')
    .select(
      `
      id,
      email,
      full_name,
      phone,
      role,
      created_at,
      metadata
    `
    )
    .eq('role', 'student')
    .order('created_at', { ascending: false });

  // Get enrollment counts for each student
  const studentIds = students?.map((s) => s.id) || [];
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('student_id, status')
    .in('student_id', studentIds);

  const enrollmentMap =
    enrollments?.reduce(
      (
        acc: Record<
          string,
          { active: number; completed: number; total: number }
        >,
        e
      ) => {
        if (!acc[e.student_id]) {
          acc[e.student_id] = { active: 0, completed: 0, total: 0 };
        }
        acc[e.student_id].total++;
        if (e.status === 'active') acc[e.student_id].active++;
        if (e.status === 'completed') acc[e.student_id].completed++;
        return acc;
      },
      {}
    ) || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link
            href="/admin/dashboard"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Dashboard
          </Link>
          <Link href="/admin/students" className="text-red-600 font-semibold">
            Students
          </Link>
          <Link
            href="/admin/courses"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Courses
          </Link>
          <Link
            href="/admin/certificates"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Certificates
          </Link>
          <Link
            href="/admin/reports"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Reports
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Admin Portal</div>
          <h1 className="elevate-hero-title">Manage Students</h1>
          <p className="elevate-hero-subtitle">
            {students?.length || 0} students in the system
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-sm text-gray-600">Total Students</div>
                  <div className="text-3xl font-bold">
                    {students?.length || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">
                    Active Enrollments
                  </div>
                  <div className="text-3xl font-bold">
                    {Object.values(enrollmentMap).reduce(
                      (sum, e) => sum + e.active,
                      0
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-brandPrimary" />
                <div>
                  <div className="text-sm text-gray-600">Completed</div>
                  <div className="text-3xl font-bold">
                    {Object.values(enrollmentMap).reduce(
                      (sum, e) => sum + e.completed,
                      0
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-600">New This Month</div>
                  <div className="text-3xl font-bold">
                    {students?.filter((s) => {
                      const created = new Date(s.created_at);
                      const now = new Date();
                      return (
                        created.getMonth() === now.getMonth() &&
                        created.getFullYear() === now.getFullYear()
                      );
                    }).length || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardContent className="p-0">
            <div className="elevate-table-container">
              <table className="elevate-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Contact</th>
                    <th>Enrollments</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students && students.length > 0 ? (
                    students.map((student) => {
                      const enrollmentData = enrollmentMap[student.id] || {
                        active: 0,
                        completed: 0,
                        total: 0,
                      };

                      return (
                        <tr key={student.id}>
                          <td>
                            <div>
                              <div className="font-medium text-gray-900">
                                {student.full_name || 'No Name'}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {student.id.substring(0, 8)}...
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span>{student.email}</span>
                              </div>
                              {student.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  <span>{student.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="font-medium">
                                  {enrollmentData.total}
                                </span>{' '}
                                total
                              </div>
                              <div className="flex gap-2 text-xs">
                                <Badge variant="success" className="text-xs">
                                  {enrollmentData.active} active
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {enrollmentData.completed} done
                                </Badge>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Badge
                              variant={
                                enrollmentData.active > 0
                                  ? 'success'
                                  : 'secondary'
                              }
                            >
                              {enrollmentData.active > 0
                                ? 'Active'
                                : 'Inactive'}
                            </Badge>
                          </td>
                          <td>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-3 w-3" />
                              {new Date(student.created_at).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/students/${student.id}`}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-gray-500 py-8"
                      >
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
