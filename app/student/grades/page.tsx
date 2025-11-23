import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Award, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser, requireStudent } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grades - Student Portal | Elevate for Humanity",
  description: "Access your courses, grades, assignments, and certifications.",
  keywords: ["student portal", "my courses", "grades", "assignments"],
  openGraph: {
    title: "Grades - Student Portal | Elevate for Humanity",
    description: "Access your courses, grades, assignments, and certifications.",
    images: ["/images/homepage/student-portal.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grades - Student Portal | Elevate for Humanity",
    description: "Access your courses, grades, assignments, and certifications.",
    images: ["/images/homepage/student-portal.png"],
  },
};



export default async function StudentGradesPage() {
  await requireStudent();
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  // Fetch all grades for the student
  const { data: grades } = await supabase
    .from('grades')
    .select(
      `
      id,
      score,
      max_score,
      passed,
      graded_at,
      feedback,
      courses!inner (
        id,
        title
      ),
      quizzes (
        id,
        title
      ),
      assignments (
        id,
        title
      )
    `
    )
    .eq('student_id', user.id)
    .order('graded_at', { ascending: false });

  // Calculate overall stats
  const totalGrades = grades?.length || 0;
  const passedGrades = grades?.filter((g) => g.passed).length || 0;
  const averageScore =
    totalGrades > 0
      ? Math.round(
          grades!.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) /
            totalGrades
        )
      : 0;

  // Group grades by course
  const gradesByCourse = grades?.reduce((acc: any, grade) => {
    const course = Array.isArray(grade.courses)
      ? grade.courses[0]
      : grade.courses;
    const courseId = course?.id;
    if (!courseId) return acc;

    if (!acc[courseId]) {
      acc[courseId] = {
        course,
        grades: [],
      };
    }
    acc[courseId].grades.push(grade);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">My Grades</h1>
          <p className="text-slate-600 mt-1">Track your academic performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageScore}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Passed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {passedGrades}/{totalGrades}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalGrades}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grades by Course */}
        {gradesByCourse && Object.keys(gradesByCourse).length > 0 ? (
          <div className="space-y-6">
            {Object.values(gradesByCourse).map((courseData: any) => {
              const courseGrades = courseData.grades;
              const courseAverage =
                courseGrades.length > 0
                  ? Math.round(
                      courseGrades.reduce(
                        (sum: number, g: any) =>
                          sum + (g.score / g.max_score) * 100,
                        0
                      ) / courseGrades.length
                    )
                  : 0;

              return (
                <Card key={courseData.course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{courseData.course.title}</CardTitle>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Course Average</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {courseAverage}%
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courseGrades.map((grade: any) => {
                        const quiz = Array.isArray(grade.quizzes)
                          ? grade.quizzes[0]
                          : grade.quizzes;
                        const assignment = Array.isArray(grade.assignments)
                          ? grade.assignments[0]
                          : grade.assignments;
                        const assessmentTitle =
                          quiz?.title || assignment?.title || 'Assessment';
                        const percentage = Math.round(
                          (grade.score / grade.max_score) * 100
                        );

                        return (
                          <div
                            key={grade.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {grade.passed ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {assessmentTitle}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(grade.graded_at).toLocaleDateString(
                                    'en-US',
                                    {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                {grade.score}/{grade.max_score}
                              </p>
                              <p
                                className={`text-sm font-medium ${
                                  grade.passed
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {percentage}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Grades Yet</h2>
              <p className="text-gray-600 mb-6">
                Complete quizzes and assignments to see your grades here.
              </p>
              <Link
                href="/lms/courses"
                className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                View My Courses
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
