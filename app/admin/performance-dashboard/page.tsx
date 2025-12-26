import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';

export const metadata = {
  title: 'Performance Dashboard | Admin',
};

async function getMetrics() {
  const supabase = await createClient();
  
  const [
    { count: totalStudents },
    { count: activePrograms },
    { count: jobPlacements },
    { data: completionData }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('programs').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('job_placements').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('status').eq('status', 'completed')
  ]);

  return {
    totalStudents: totalStudents || 0,
    activePrograms: activePrograms || 0,
    jobPlacements: jobPlacements || 0,
    completionRate: completionData ? Math.round((completionData.length / (totalStudents || 1)) * 100) : 0
  };
}

async function getProgramPerformance() {
  const supabase = await createClient();
  
  const { data: programs } = await supabase
    .from('programs')
    .select(`
      id,
      name,
      enrollments (
        id,
        status
      )
    `);

  return programs?.map(program => ({
    name: program.name,
    totalStudents: program.enrollments?.length || 0,
    completedStudents: program.enrollments?.filter((e: any) => e.status === 'completed').length || 0,
    completionRate: program.enrollments?.length 
      ? Math.round((program.enrollments.filter((e: any) => e.status === 'completed').length / program.enrollments.length) * 100)
      : 0
  })) || [];
}

export default async function PerformanceDashboardPage() {
  await requireRole(['admin', 'super_admin']);
  
  const metrics = await getMetrics();
  const programPerformance = await getProgramPerformance();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Performance Dashboard</h1>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Students</div>
            <div className="text-3xl font-bold mb-2">{metrics.totalStudents}</div>
            <div className="text-sm text-green-600">Active learners</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Active Programs</div>
            <div className="text-3xl font-bold mb-2">{metrics.activePrograms}</div>
            <div className="text-sm text-blue-600">Currently running</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Job Placements</div>
            <div className="text-3xl font-bold mb-2">{metrics.jobPlacements}</div>
            <div className="text-sm text-purple-600">Successful placements</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
            <div className="text-3xl font-bold mb-2">{metrics.completionRate}%</div>
            <div className="text-sm text-green-600">Program completion</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Program Performance</h2>
          <div className="space-y-4">
            {programPerformance.map(program => (
              <div key={program.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{program.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{program.totalStudents} students</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${program.completionRate}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{program.completionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
