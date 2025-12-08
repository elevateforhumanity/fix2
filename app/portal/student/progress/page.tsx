import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/portal/student/progress",
  },
  title: 'Progress | Student Portal',
  description: 'Track your learning progress',
};

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch progress data
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      programs (name, duration_weeks)
    `)
    .eq('user_id', user.id);

  const totalCourses = enrollments?.length || 0;
  const completedCourses = enrollments?.filter(e => e.status === 'completed').length || 0;
  const overallProgress = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Learning Progress</h1>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Overall Progress</h2>
              <p className="text-gray-600">Your learning journey</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-blue-600">{overallProgress}%</p>
              <p className="text-gray-600">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
             />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Target className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalCourses}</p>
            <p className="text-gray-600">Total Courses</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{completedCourses}</p>
            <p className="text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <TrendingUp className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalCourses - completedCourses}</p>
            <p className="text-gray-600">In Progress</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Clock className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">0</p>
            <p className="text-gray-600">Hours Logged</p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Course Progress</h2>
          </div>
          <div className="p-6 space-y-6">
            {enrollments && enrollments.length > 0 ? (
              enrollments.map((enrollment: any) => (
                <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{enrollment.programs?.name}</h3>
                      <p className="text-sm text-gray-600">
                        {enrollment.programs?.duration_weeks} weeks
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      enrollment.status === 'completed' ? 'bg-green-100 text-green-700' :
                      enrollment.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {enrollment.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {enrollment.status === 'completed' ? '100%' : '0%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: enrollment.status === 'completed' ? '100%' : '0%' }}
                       />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No courses enrolled yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
