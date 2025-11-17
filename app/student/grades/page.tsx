'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';

export default function StudentGradesPage() {
  const courses = [
    {
      id: 1,
      name: 'HVAC Fundamentals',
      grade: 92,
      credits: 3,
      status: 'completed',
      assignments: [
        { name: 'Quiz 1', grade: 95, weight: 10 },
        { name: 'Quiz 2', grade: 88, weight: 10 },
        { name: 'Midterm', grade: 92, weight: 30 },
        { name: 'Final Project', grade: 90, weight: 50 },
      ],
    },
    {
      id: 2,
      name: 'Electrical Systems',
      grade: 88,
      credits: 4,
      status: 'in-progress',
      assignments: [
        { name: 'Lab 1', grade: 90, weight: 20 },
        { name: 'Lab 2', grade: 85, weight: 20 },
        { name: 'Midterm', grade: 88, weight: 30 },
        { name: 'Final', grade: null, weight: 30 },
      ],
    },
    {
      id: 3,
      name: 'HVAC Systems II',
      grade: 85,
      credits: 4,
      status: 'in-progress',
      assignments: [
        { name: 'Quiz 1', grade: 82, weight: 15 },
        { name: 'Quiz 2', grade: 88, weight: 15 },
        { name: 'Project', grade: null, weight: 70 },
      ],
    },
    {
      id: 4,
      name: 'Workplace Safety',
      grade: 95,
      credits: 2,
      status: 'in-progress',
      assignments: [
        { name: 'Safety Quiz', grade: 95, weight: 40 },
        { name: 'Essay', grade: 95, weight: 60 },
      ],
    },
  ];

  const calculateGPA = () => {
    const completed = courses.filter((c) => c.status === 'completed');
    if (completed.length === 0) return 0;

    const totalPoints = completed.reduce((sum, c) => {
      const gradePoint =
        c.grade >= 90
          ? 4.0
          : c.grade >= 80
            ? 3.0
            : c.grade >= 70
              ? 2.0
              : c.grade >= 60
                ? 1.0
                : 0;
      return sum + gradePoint * c.credits;
    }, 0);

    const totalCredits = completed.reduce((sum, c) => sum + c.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLetterGrade = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Grades</h1>
          <p className="text-slate-600 mt-1">Track your academic performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GPA Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Current GPA</div>
                  <div className="text-3xl font-bold text-green-600 mt-1">
                    {calculateGPA()}
                  </div>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Credits Earned</div>
                  <div className="text-3xl font-bold text-slate-900 mt-1">
                    {courses
                      .filter((c) => c.status === 'completed')
                      .reduce((sum, c) => sum + c.credits, 0)}
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
                  <div className="text-sm text-slate-600">
                    Courses Completed
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mt-1">
                    {courses.filter((c) => c.status === 'completed').length}
                  </div>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Average Grade</div>
                  <div className="text-3xl font-bold text-slate-900 mt-1">
                    {Math.round(
                      courses.reduce((sum, c) => sum + c.grade, 0) /
                        courses.length
                    )}
                    %
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grades */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{course.name}</CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        course.status === 'completed' ? 'success' : 'primary'
                      }
                    >
                      {course.status === 'completed'
                        ? 'Completed'
                        : 'In Progress'}
                    </Badge>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold ${getGradeColor(course.grade)}`}
                      >
                        {course.grade}%
                      </div>
                      <div className="text-sm text-slate-600">
                        Grade: {getLetterGrade(course.grade)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">
                        Overall Progress
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {course.grade}%
                      </span>
                    </div>
                    <Progress value={course.grade} />
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Assignment Breakdown
                    </h4>
                    <div className="space-y-3">
                      {course.assignments.map((assignment, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">
                              {assignment.name}
                            </div>
                            <div className="text-sm text-slate-600">
                              Weight: {assignment.weight}%
                            </div>
                          </div>
                          <div className="text-right">
                            {assignment.grade !== null ? (
                              <>
                                <div
                                  className={`text-xl font-bold ${getGradeColor(assignment.grade)}`}
                                >
                                  {assignment.grade}%
                                </div>
                                <div className="text-sm text-slate-600">
                                  {getLetterGrade(assignment.grade)}
                                </div>
                              </>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <div className="text-sm text-slate-600">
                      Credits: {course.credits}
                    </div>
                    <div className="text-sm text-slate-600">
                      {
                        course.assignments.filter((a) => a.grade !== null)
                          .length
                      }{' '}
                      of {course.assignments.length} assignments graded
                    </div>
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
