import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { BarChart3, TrendingUp, Clock, Target, BookOpen, Award, Calendar, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Analytics | Student Portal',
  description: 'Track your learning performance and insights',
};

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch enrollments for analytics
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      programs (name, duration_weeks)
    `)
    .eq('user_id', user.id);

  // Fetch activity logs
  const { data: activities } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  // Calculate metrics
  const totalCourses = enrollments?.length || 0;
  const completedCourses = enrollments?.filter(e => e.status === 'completed').length || 0;
  const activeCourses = enrollments?.filter(e => e.status === 'active').length || 0;
  const completionRate = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  // Calculate time spent (mock data for now)
  const totalHours = activities?.length ? Math.round(activities.length * 0.5) : 0;
  const avgSessionTime = activities?.length ? Math.round((totalHours * 60) / activities.length) : 0;

  // Weekly activity (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const weeklyActivity = last7Days.map(day => {
    const count = Math.floor(Math.random() * 10) + 1; // Mock data
    return { day, count };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Learning Analytics</h1>
          <p className="text-gray-600 mt-1">Track your performance and learning insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCourses}</p>
                <p className="text-sm text-gray-600">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCourses}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalHours}h</p>
                <p className="text-sm text-gray-600">Time Spent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Weekly Activity</h2>
            </div>
            <div className="p-6">
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyActivity.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700" 
                         style={{ height: `${(item.count / 10) * 100}%`, minHeight: '20px' }}>
                    </div>
                    <span className="text-xs text-gray-600">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Performance Insights</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-green-900">Strong Progress</p>
                    <p className="text-sm text-green-700">You're on track with your goals</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-blue-900">Avg Session: {avgSessionTime} min</p>
                    <p className="text-sm text-blue-700">Consistent study habits</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="text-purple-600" size={24} />
                  <div>
                    <p className="font-semibold text-purple-900">{activities?.length || 0} Activities</p>
                    <p className="text-sm text-purple-700">Total learning sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Course Performance</h2>
          </div>
          <div className="p-6">
            {enrollments && enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.map((enrollment: any) => (
                  <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{enrollment.programs?.name}</h3>
                        <p className="text-sm text-gray-600">{enrollment.programs?.duration_weeks} weeks</p>
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
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No analytics data yet</h3>
                <p className="text-gray-600">Enroll in courses to start tracking your progress</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
