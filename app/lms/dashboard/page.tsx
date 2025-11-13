import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Award, TrendingUp, Target, Calendar } from 'lucide-react';
import LMSNav from '@/components/lms/LMSNav';
import LoginTracker from '@/components/lms/LoginTracker';

export const metadata = {
  title: 'Dashboard | Elevate LMS',
  description: 'Your learning dashboard',
};

// Mock data - replace with Supabase queries
const enrolledCourses = [
  {
    id: 1,
    title: 'Barber Fundamentals',
    progress: 100,
    nextLesson: 'Course Completed!',
    thumbnail: '/images/barber.jpg',
    totalLessons: 24,
    completedLessons: 24,
    status: 'completed',
  },
  {
    id: 2,
    title: 'CNA Certification Prep',
    progress: 65,
    nextLesson: 'Module 3: Infection Control',
    thumbnail: '/images/cna.jpg',
    totalLessons: 30,
    completedLessons: 19,
    status: 'active',
  },
  {
    id: 3,
    title: 'HVAC Technician Training',
    progress: 23,
    nextLesson: 'Module 2: Heating Systems',
    thumbnail: '/images/hvac.jpg',
    totalLessons: 28,
    completedLessons: 7,
    status: 'active',
  },
];

const stats = [
  { label: 'Courses Enrolled', value: '4', icon: BookOpen, change: '+1 this month' },
  { label: 'Hours Completed', value: '42', icon: Clock, change: '+8 this week' },
  { label: 'Certificates Earned', value: '1', icon: Award, change: 'Barber Fundamentals' },
  { label: 'Average Score', value: '87%', icon: Target, change: '+5% improvement' },
];

const upcomingDeadlines = [
  { course: 'CNA Certification Prep', task: 'Module 3 Quiz', dueDate: '2024-11-15' },
  { course: 'HVAC Technician Training', task: 'Safety Assessment', dueDate: '2024-11-18' },
];

export default function LMSDashboard() {
  return (
    <div className="elevate-shell">
      <LoginTracker />
      
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark" />
          <span>Elevate Connects</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/lms/courses" className="elevate-btn-secondary">
            Browse Courses
          </Link>
          <Link href="/lms/profile" className="elevate-btn-secondary">
            Profile
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="elevate-hero">
        <div className="elevate-hero-kicker">Student / Learner Portal</div>
        <h1 className="elevate-hero-title">Welcome back, John!</h1>
        <p className="mt-1 text-sm text-slate-300">
          Continue your learning journey and achieve your workforce training goals
        </p>
        <div className="mt-3 flex gap-2">
          <Link href="/lms/courses/2" className="elevate-btn-primary">
            Continue Learning
          </Link>
          <Link href="/lms/progress" className="elevate-btn-secondary">
            View Progress
          </Link>
        </div>
      </section>

      <main className="mt-5">

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-5">
          {stats.map((stat) => (
            <div key={stat.label} className="elevate-card">
              <div className="elevate-card-header">
                <div>
                  <div className="elevate-card-subtitle">{stat.label}</div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                </div>
                <stat.icon className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 mt-2">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <section className="mb-5">
          <div className="elevate-page-heading">
            <h2 className="elevate-page-title">Continue Learning</h2>
            <Link href="/lms/courses" className="elevate-btn-secondary text-xs">
              View All Courses
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="elevate-card">
                <div className="h-32 bg-gradient-to-br from-orange-500 to-blue-500 relative rounded-lg mb-3">
                  {course.status === 'completed' && (
                    <span className="elevate-pill elevate-pill--success absolute top-2 right-2">
                      <Award className="h-3 w-3" />
                      Completed
                    </span>
                  )}
                </div>
                <div className="elevate-card-header">
                  <div>
                    <h3 className="elevate-card-title">{course.title}</h3>
                    <p className="elevate-card-subtitle mt-1">
                      {course.nextLesson}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-medium text-slate-300">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          course.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <Link 
                    href={`/lms/courses/${course.id}`}
                    className={course.status === 'completed' ? 'elevate-btn-secondary w-full text-center block' : 'elevate-btn-primary w-full text-center block'}
                  >
                    {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section className="mb-5">
          <h2 className="elevate-page-title mb-3">Upcoming Deadlines</h2>
          <div className="elevate-card">
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-sm">{deadline.task}</p>
                      <p className="text-xs text-slate-400">{deadline.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(deadline.dueDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-slate-400">
                      {Math.ceil((new Date(deadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="elevate-page-title mb-3">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/lms/courses" className="elevate-card hover:border-orange-500/50 transition-all">
              <BookOpen className="h-7 w-7 mb-2 text-orange-500" />
              <h3 className="elevate-card-title">Browse Courses</h3>
              <p className="elevate-card-subtitle mt-1">
                Explore available training programs
              </p>
            </Link>
            <Link href="/lms/progress" className="elevate-card hover:border-blue-500/50 transition-all">
              <TrendingUp className="h-7 w-7 mb-2 text-blue-500" />
              <h3 className="elevate-card-title">My Progress</h3>
              <p className="elevate-card-subtitle mt-1">
                Track your learning achievements
              </p>
            </Link>
            <Link href="/lms/certificates" className="elevate-card hover:border-green-500/50 transition-all">
              <Award className="h-7 w-7 mb-2 text-green-500" />
              <h3 className="elevate-card-title">My Certificates</h3>
              <p className="elevate-card-subtitle mt-1">
                View and download certificates
              </p>
            </Link>
            <Link href="/lms/profile" className="elevate-card hover:border-purple-500/50 transition-all">
              <Target className="h-7 w-7 mb-2 text-purple-500" />
              <h3 className="elevate-card-title">Profile Settings</h3>
              <p className="elevate-card-subtitle mt-1">
                Manage your account settings
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
