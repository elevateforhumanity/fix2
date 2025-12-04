import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Map, Target, CheckCircle, Lock, TrendingUp, Award, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Learning Paths | Student Portal',
};

export default async function LearningPathsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      programs(name, duration_weeks)
    `)
    .eq('user_id', user.id);

  const paths = [
    {
      id: 1,
      name: 'Web Development Fundamentals',
      description: 'Master the basics of web development',
      courses: ['HTML & CSS', 'JavaScript Basics', 'React Fundamentals', 'Node.js Intro'],
      progress: 50,
      enrolled: true,
      duration: '12 weeks',
      level: 'Beginner'
    },
    {
      id: 2,
      name: 'Data Science Track',
      description: 'Learn data analysis and machine learning',
      courses: ['Python Basics', 'Data Analysis', 'Machine Learning', 'Deep Learning'],
      progress: 0,
      enrolled: false,
      duration: '16 weeks',
      level: 'Intermediate'
    },
    {
      id: 3,
      name: 'Cloud Computing Path',
      description: 'Master cloud technologies and DevOps',
      courses: ['AWS Basics', 'Docker & Kubernetes', 'CI/CD', 'Cloud Architecture'],
      progress: 0,
      enrolled: false,
      duration: '14 weeks',
      level: 'Advanced'
    }
  ];

  const enrolledPaths = paths.filter(p => p.enrolled);
  const recommendedPaths = paths.filter(p => !p.enrolled);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Learning Paths</h1>
          <p className="text-gray-600 mt-1">Follow structured paths to achieve your learning goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Map className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{enrolledPaths.length}</p>
            <p className="text-sm text-gray-600">Active Paths</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Target className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{enrollments?.length || 0}</p>
            <p className="text-sm text-gray-600">Courses Completed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Paths Completed</p>
          </div>
        </div>

        {enrolledPaths.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">My Learning Paths</h2>
            <div className="space-y-6">
              {enrolledPaths.map((path) => (
                <div key={path.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{path.name}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {path.level}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{path.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen size={16} />
                            {path.courses.length} courses
                          </span>
                          <span>{path.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-600">{path.progress}%</p>
                        <p className="text-sm text-gray-600">Complete</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                          style={{ width: `\${path.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      {path.courses.map((course, index) => {
                        const isCompleted = index < (path.courses.length * path.progress / 100);
                        const isCurrent = index === Math.floor(path.courses.length * path.progress / 100);
                        const isLocked = index > Math.floor(path.courses.length * path.progress / 100);

                        return (
                          <div 
                            key={index}
                            className={`p-4 rounded-lg border-2 \${
                              isCompleted ? 'border-green-500 bg-green-50' :
                              isCurrent ? 'border-blue-500 bg-blue-50' :
                              'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {isCompleted && <CheckCircle size={20} className="text-green-600" />}
                              {isCurrent && <TrendingUp size={20} className="text-blue-600" />}
                              {isLocked && <Lock size={20} className="text-gray-400" />}
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                            <p className={`text-sm font-medium \${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                              {course}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Recommended Paths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {path.level}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{path.name}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="space-y-2 mb-4">
                    {path.courses.map((course, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {course}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen size={16} />
                      {path.courses.length} courses
                    </span>
                    <span>{path.duration}</span>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Enroll in Path
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
