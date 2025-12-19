import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Clock, Users, FileText, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Holder Dashboard',
  description: 'Manage students and verify completion requirements',
};

export default async function ProgramHolderDashboard() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?next=/program-holder/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, organization_id')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'program_holder') {
    redirect('/unauthorized');
  }

  // Fetch programs for this organization
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name')
    .eq('organization_id', profile.organization_id);

  const programIds = programs?.map(p => p.id) || [];

  // Fetch enrollments for these programs
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      profiles!enrollments_student_id_fkey (
        id,
        first_name,
        last_name,
        email
      ),
      programs (
        id,
        name
      ),
      student_risk_status (
        status,
        overdue_count,
        progress_percentage
      )
    `)
    .in('program_id', programIds)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Calculate metrics
  const activeStudents = enrollments?.length || 0;
  const atRiskStudents = enrollments?.filter(e => 
    e.student_risk_status?.[0]?.status === 'at_risk'
  ).length || 0;
  const needsActionStudents = enrollments?.filter(e => 
    e.student_risk_status?.[0]?.status === 'needs_action'
  ).length || 0;

  // Fetch pending verifications
  const { data: pendingVerifications, count: pendingCount } = await supabase
    .from('student_requirements')
    .select('*, enrollments!inner(program_id)', { count: 'exact' })
    .in('enrollments.program_id', programIds)
    .eq('status', 'completed')
    .order('updated_at', { ascending: true });

  // Fetch upcoming deadlines
  const { data: upcomingDeadlines } = await supabase
    .from('student_requirements')
    .select('*, enrollments!inner(program_id, profiles!enrollments_student_id_fkey(first_name, last_name))')
    .in('enrollments.program_id', programIds)
    .in('status', ['pending', 'in_progress'])
    .gte('due_date', new Date().toISOString().split('T')[0])
    .lte('due_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('due_date', { ascending: true})
    .limit(5);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Program Holder Dashboard
          </h1>
          <p className="text-gray-600">
            Manage students and verify completion requirements
          </p>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Active Students</div>
                <div className="text-3xl font-bold text-gray-900">{activeStudents}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-sm text-gray-500">At-Risk Students</div>
                <div className="text-3xl font-bold text-red-600">{atRiskStudents}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-sm text-gray-500">Pending Verifications</div>
                <div className="text-3xl font-bold text-yellow-600">{pendingCount || 0}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-sm text-gray-500">Upcoming Deadlines</div>
                <div className="text-3xl font-bold text-purple-600">{upcomingDeadlines?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Roster */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Student Roster</h2>
          
          {enrollments && enrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Program</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Progress</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Overdue</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment: any) => {
                    const riskStatus = enrollment.student_risk_status?.[0];
                    const status = riskStatus?.status || 'on_track';
                    const progress = riskStatus?.progress_percentage || 0;
                    const overdueCount = riskStatus?.overdue_count || 0;
                    
                    let statusBadge = {
                      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
                      text: 'On Track',
                      color: 'text-green-600',
                      bgColor: 'bg-green-100'
                    };
                    
                    if (status === 'at_risk') {
                      statusBadge = {
                        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
                        text: 'At Risk',
                        color: 'text-red-600',
                        bgColor: 'bg-red-100'
                      };
                    } else if (status === 'needs_action') {
                      statusBadge = {
                        icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
                        text: 'Needs Action',
                        color: 'text-yellow-600',
                        bgColor: 'bg-yellow-100'
                      };
                    }
                    
                    return (
                      <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">
                            {enrollment.profiles?.first_name} {enrollment.profiles?.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {enrollment.profiles?.email}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {enrollment.programs?.name}
                        </td>
                        <td className="py-3 px-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusBadge.bgColor}`}>
                            {statusBadge.icon}
                            <span className={`text-sm font-semibold ${statusBadge.color}`}>
                              {statusBadge.text}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="text-lg font-bold text-gray-900">{progress}%</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {overdueCount > 0 ? (
                            <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                              <AlertCircle className="w-4 h-4" />
                              {overdueCount}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/program-holder/verify/${enrollment.id}`}
                            className="text-blue-600 hover:underline font-semibold"
                          >
                            Verify →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No active students yet.</p>
            </div>
          )}
        </div>

        {/* Pending Verifications */}
        {pendingVerifications && pendingVerifications.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pending Verifications ({pendingCount})
            </h2>
            <div className="space-y-3">
              {pendingVerifications.slice(0, 5).map((req: any) => (
                <div key={req.id} className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <div>
                    <div className="font-semibold text-gray-900">{req.title}</div>
                    <div className="text-sm text-gray-600">
                      Submitted {new Date(req.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Link
                    href={`/program-holder/verify/${req.enrollment_id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Checklist */}
        <div className="bg-blue-50 rounded-lg shadow-sm p-6 border-2 border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Compliance Checklist
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Curriculum uploaded</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Instructor credentials on file</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Agreements signed</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-700">Monthly reporting due in 5 days</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
