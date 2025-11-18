'use client';

import Link from 'next/link';
import { BookOpen, FileText, Award, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">HVAC Technician Training</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <p className="text-blue-100 mt-1">Keep up the great work!</p>
            </div>
            <div className="text-5xl font-bold">65%</div>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-3">
            <div className="bg-white rounded-full h-3" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Quick Actions - Simple Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* My Courses */}
          <Link
            href="/student/courses"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition border-2 border-gray-100 hover:border-blue-500"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">My Courses</h3>
            <p className="text-gray-600 text-sm">View and continue your courses</p>
            <div className="mt-4 text-blue-600 font-semibold text-sm">
              3 Active Courses →
            </div>
          </Link>

          {/* Assignments */}
          <Link
            href="/student/assignments"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition border-2 border-gray-100 hover:border-orange-500"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Assignments</h3>
            <p className="text-gray-600 text-sm">Check your assignments</p>
            <div className="mt-4 text-orange-600 font-semibold text-sm">
              2 Due This Week →
            </div>
          </Link>

          {/* Grades */}
          <Link
            href="/student/grades"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition border-2 border-gray-100 hover:border-green-500"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Grades</h3>
            <p className="text-gray-600 text-sm">View your grades</p>
            <div className="mt-4 text-green-600 font-semibold text-sm">
              GPA: 3.8 →
            </div>
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-900">Coming Up</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Refrigeration Quiz</div>
                  <div className="text-sm text-gray-600">Due Feb 18 • HVAC Systems II</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Safety Essay</div>
                  <div className="text-sm text-gray-600">Due Feb 22 • Workplace Safety</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Next Class: HVAC Systems II</div>
                  <div className="text-sm text-gray-600">Feb 20 at 9:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-900">Recent Grades</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Midterm Exam</div>
                  <div className="text-sm text-gray-600">HVAC Fundamentals</div>
                </div>
                <div className="text-2xl font-bold text-green-600">92</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Lab Practical</div>
                  <div className="text-sm text-gray-600">Electrical Systems</div>
                </div>
                <div className="text-2xl font-bold text-green-600">88</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Safety Quiz</div>
                  <div className="text-sm text-gray-600">Workplace Safety</div>
                </div>
                <div className="text-2xl font-bold text-green-600">95</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/student/certificates" className="text-center p-4 hover:bg-gray-50 rounded-lg transition">
              <Award className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Certificates</div>
            </Link>
            <Link href="/student/calendar" className="text-center p-4 hover:bg-gray-50 rounded-lg transition">
              <Calendar className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Calendar</div>
            </Link>
            <Link href="/student/resources" className="text-center p-4 hover:bg-gray-50 rounded-lg transition">
              <BookOpen className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Resources</div>
            </Link>
            <Link href="/student/profile" className="text-center p-4 hover:bg-gray-50 rounded-lg transition">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-600 font-bold">
                J
              </div>
              <div className="text-sm font-medium text-gray-900">Profile</div>
            </Link>
          </div>
        </div>
      </div>
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
                <div className="bg-red-50 border border-blue-200 rounded-lg p-6">
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
                      <span className="text-sm font-semibold text-red-600">
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
