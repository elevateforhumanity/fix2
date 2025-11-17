'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function StudentCoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'HVAC Fundamentals',
      instructor: 'Mike Johnson',
      progress: 100,
      grade: 92,
      status: 'completed',
      credits: 3,
      nextLesson: null,
    },
    {
      id: 2,
      title: 'Electrical Systems',
      instructor: 'Sarah Williams',
      progress: 85,
      grade: 88,
      status: 'in-progress',
      credits: 4,
      nextLesson: 'Advanced Wiring Techniques',
    },
    {
      id: 3,
      title: 'HVAC Systems II',
      instructor: 'Mike Johnson',
      progress: 65,
      grade: null,
      status: 'in-progress',
      credits: 4,
      nextLesson: 'Commercial Refrigeration',
    },
    {
      id: 4,
      title: 'Workplace Safety',
      instructor: 'Tom Davis',
      progress: 45,
      grade: null,
      status: 'in-progress',
      credits: 2,
      nextLesson: 'OSHA Regulations',
    },
    {
      id: 5,
      title: 'Business Management',
      instructor: 'Lisa Chen',
      progress: 0,
      grade: null,
      status: 'not-started',
      credits: 3,
      nextLesson: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="primary">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="secondary">Not Started</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-600 mt-1">Track your progress and access course materials</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">Total Courses</div>
              <div className="text-3xl font-bold text-slate-900 mt-1">{courses.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">In Progress</div>
              <div className="text-3xl font-bold text-red-600 mt-1">
                {courses.filter(c => c.status === 'in-progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">Completed</div>
              <div className="text-3xl font-bold text-green-600 mt-1">
                {courses.filter(c => c.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">Total Credits</div>
              <div className="text-3xl font-bold text-slate-900 mt-1">
                {courses.reduce((sum, c) => sum + c.credits, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:border-orange-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{course.title}</h3>
                        <p className="text-slate-600">Instructor: {course.instructor}</p>
                      </div>
                      {getStatusBadge(course.status)}
                    </div>

                    {course.status !== 'not-started' && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-600">Progress</span>
                            <span className="text-sm font-semibold text-slate-900">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} />
                        </div>

                        {course.nextLesson && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="h-4 w-4" />
                            <span>Next: {course.nextLesson}</span>
                          </div>
                        )}

                        {course.grade && (
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-green-600" />
                            <span className="text-slate-600">Current Grade:</span>
                            <span className="font-semibold text-green-600">{course.grade}%</span>
                          </div>
                        )}
                      </div>
                    )}

                    {course.status === 'not-started' && (
                      <div className="text-sm text-slate-500 mt-2">
                        This course will be available after completing prerequisites
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button 
                      variant="primary" 
                      fullWidth
                      disabled={course.status === 'not-started'}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {course.status === 'completed' ? 'Review' : 'Continue'}
                    </Button>
                    <Button variant="outline" fullWidth>
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
