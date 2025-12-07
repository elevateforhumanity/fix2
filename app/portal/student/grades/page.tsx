import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { TrendingUp, Award, FileText } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/portal/student/grades",
  },
  title: 'Grades | Student Portal',
  description: 'View your grades and academic performance',
};

export default async function GradesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch grades
  const { data: grades } = await supabase
    .from('grades')
    .select(`
      *,
      courses (name, code),
      assignments (title)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Calculate GPA
  const totalPoints = grades?.reduce((sum, g) => sum + (g.points_earned || 0), 0) || 0;
  const maxPoints = grades?.reduce((sum, g) => sum + (g.points_possible || 0), 0) || 0;
  const gpa = maxPoints > 0 ? ((totalPoints / maxPoints) * 4.0).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Grades</h1>

        {/* GPA Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2">Current GPA</p>
              <p className="text-5xl font-bold">{gpa}</p>
              <p className="text-blue-100 mt-2">Out of 4.0</p>
            </div>
            <Award size={80} className="text-blue-200 opacity-50" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-600" size={32} />
              <div>
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-gray-600">Total Points</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              <div>
                <p className="text-2xl font-bold">{grades?.length || 0}</p>
                <p className="text-gray-600">Graded Items</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <Award className="text-purple-600" size={32} />
              <div>
                <p className="text-2xl font-bold">
                  {maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0}%
                </p>
                <p className="text-gray-600">Average</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grades by Course */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Grade Book</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {grades && grades.length > 0 ? (
                  grades.map((grade: any) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{grade.courses?.name}</p>
                          <p className="text-sm text-gray-500">{grade.courses?.code}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{grade.assignments?.title}</td>
                      <td className="px-6 py-4">
                        {grade.points_earned}/{grade.points_possible}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          grade.percentage >= 90 ? 'bg-green-100 text-green-700' :
                          grade.percentage >= 80 ? 'bg-blue-100 text-blue-700' :
                          grade.percentage >= 70 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {grade.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(grade.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No grades yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
