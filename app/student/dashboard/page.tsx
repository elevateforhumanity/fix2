'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';

export default function StudentDashboardPage() {
  const student = {
    name: 'John Doe',
    program: 'HVAC Technician Training',
    enrollmentDate: '2024-01-15',
    completionProgress: 65,
    nextClass: 'HVAC Systems II',
    nextClassDate: '2024-02-20',
    nextClassTime: '9:00 AM',
  };

  const upcomingAssignments = [
    { id: 1, title: 'Refrigeration Quiz', dueDate: '2024-02-18', course: 'HVAC Systems II' },
    { id: 2, title: 'Safety Procedures Essay', dueDate: '2024-02-22', course: 'Workplace Safety' },
    { id: 3, title: 'System Diagram Project', dueDate: '2024-02-25', course: 'HVAC Systems II' },
  ];

  const recentGrades = [
    { id: 1, assignment: 'Midterm Exam', grade: 92, course: 'HVAC Fundamentals' },
    { id: 2, assignment: 'Lab Practical', grade: 88, course: 'Electrical Systems' },
    { id: 3, assignment: 'Safety Quiz', grade: 95, course: 'Workplace Safety' },
  ];

  const announcements = [
    { id: 1, title: 'Career Fair Next Week', date: '2024-02-15', type: 'event' },
    { id: 2, title: 'New Job Postings Available', date: '2024-02-14', type: 'jobs' },
    { id: 3, title: 'Schedule Change for Lab', date: '2024-02-13', type: 'important' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome back, {student.name}!</h1>
              <p className="text-slate-600 mt-1">{student.program}</p>
            </div>
            <Button variant="primary">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Program Progress</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {student.completionProgress}%
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Assignments Due</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {upcomingAssignments.length}
                  </div>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Current GPA</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">3.8</div>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Attendance</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">98%</div>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Class */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Next Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {student.nextClass}
                      </h3>
                      <div className="flex items-center gap-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {student.nextClassDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {student.nextClassTime}
                        </div>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Program Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Overall Completion</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {student.completionProgress}%
                      </span>
                    </div>
                    <Progress value={student.completionProgress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <div className="text-sm text-slate-600">Courses Completed</div>
                      <div className="text-lg font-semibold text-slate-900">8 / 12</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Estimated Completion</div>
                      <div className="text-lg font-semibold text-slate-900">May 2024</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Upcoming Assignments
                  </span>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{assignment.title}</div>
                        <div className="text-sm text-slate-600">{assignment.course}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">
                          Due {assignment.dueDate}
                        </div>
                        <Badge variant="warning" size="sm">Pending</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Grades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Grades
                  </span>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade) => (
                    <div
                      key={grade.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{grade.assignment}</div>
                        <div className="text-sm text-slate-600">{grade.course}</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{grade.grade}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="primary" fullWidth className="justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Courses
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    View Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 text-sm">
                            {announcement.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{announcement.date}</div>
                        </div>
                        <Badge 
                          variant={announcement.type === 'important' ? 'error' : 'primary'} 
                          size="sm"
                        >
                          {announcement.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
