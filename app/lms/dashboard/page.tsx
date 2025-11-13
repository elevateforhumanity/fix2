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
    <div className="min-h-screen bg-background">
      <LoginTracker />
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Continue your learning journey and achieve your goals</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Learning */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Button variant="outline" asChild>
              <Link href="/lms/courses">View All Courses</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 relative">
                  {course.status === 'completed' && (
                    <Badge className="absolute top-3 right-3 bg-green-600">
                      <Award className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {course.nextLesson}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            course.status === 'completed' ? 'bg-green-600' : 'bg-primary'
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button className="w-full" asChild variant={course.status === 'completed' ? 'outline' : 'default'}>
                      <Link href={`/lms/courses/${course.id}`}>
                        {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{deadline.task}</p>
                        <p className="text-sm text-muted-foreground">{deadline.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(deadline.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(deadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/lms/courses">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <BookOpen className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Browse Courses</CardTitle>
                  <CardDescription>
                    Explore available training programs
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/lms/progress">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>My Progress</CardTitle>
                  <CardDescription>
                    Track your learning achievements
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/lms/certificates">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <Award className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>My Certificates</CardTitle>
                  <CardDescription>
                    View and download certificates
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/lms/profile">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <Target className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
