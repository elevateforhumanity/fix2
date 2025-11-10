/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function StudentGrades() {
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentGrades();
  }, []);

  const fetchStudentGrades = async () => {
    if (!supabase) {
      setError('Database service is not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to view your grades');
        return;
      }

      // Fetch enrollments with course details
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(
          `
          *,
          courses (
            id,
            title,
            code,
            program_id
          )
        `
        )
        .eq('user_id', user.id);

      if (enrollmentError) throw enrollmentError;

      setEnrollments(enrollmentData || []);

      // Fetch quiz responses and calculate grades
      const { data: responses, error: responsesError } = await supabase
        .from('quiz_responses')
        .select(
          `
          *,
          quiz_questions (
            id,
            answer,
            lesson_id,
            lessons (
              course_id,
              title
            )
          )
        `
        )
        .eq('user_id', user.id);

      if (responsesError) throw responsesError;

      // Calculate grades per course
      const gradesByCourse = {};

      responses?.forEach((response) => {
        const courseId = response.quiz_questions?.lessons?.course_id;
        if (!courseId) return;

        if (!gradesByCourse[courseId]) {
          gradesByCourse[courseId] = {
            correct: 0,
            total: 0,
            quizzes: [],
          };
        }

        const isCorrect = response.answer === response.quiz_questions?.answer;
        gradesByCourse[courseId].total++;
        if (isCorrect) gradesByCourse[courseId].correct++;
      });

      // Calculate percentages
      const gradesArray = Object.entries(gradesByCourse).map(
        ([courseId, data]) => ({
          courseId,
          percentage:
            data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
          correct: data.correct,
          total: data.total,
        })
      );

      setGrades(gradesArray);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Grades</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brown-600">Loading grades...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Academic Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{enrollments.length}</div>
                  <div className="text-sm">Enrolled Courses</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {grades.reduce((sum, g) => sum + g.total, 0)}
                  </div>
                  <div className="text-sm">Quizzes Completed</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {grades.length > 0
                      ? Math.round(
                          grades.reduce((sum, g) => sum + g.percentage, 0) /
                            grades.length
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-sm">Average Grade</div>
                </div>
              </div>
            </div>
            {/* Course Grades */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Course Grades</h2>
              </div>
              {enrollments.length === 0 ? (
                <div className="p-6 text-center text-brown-500">
                  <p>You are not enrolled in any courses yet.</p>
                  <a
                    href="/programs"
                    className="text-green-600 hover:underline mt-2 inline-block"
                  >
                    Browse Programs
                  </a>
                </div>
              ) : (
                <div className="divide-y">
                  {enrollments.map((enrollment) => {
                    const courseGrade = grades.find(
                      (g) => g.courseId === enrollment.courses?.id
                    );
                    const percentage = courseGrade?.percentage || 0;
                    const letterGrade = getLetterGrade(percentage);
                    const gradeColor = getGradeColor(percentage);

                    return (
                      <div
                        key={enrollment.course_id}
                        className="p-6 hover:bg-beige-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-brown-900">
                              {enrollment.courses?.title || 'Unknown Course'}
                            </h3>
                            <p className="text-sm text-brown-500">
                              {enrollment.courses?.code}
                            </p>
                            {courseGrade && (
                              <p className="text-sm text-brown-600 mt-2">
                                {courseGrade.correct} / {courseGrade.total}{' '}
                                quizzes correct
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className={`text-4xl font-bold ${gradeColor}`}>
                              {letterGrade}
                            </div>
                            <div className="text-lg text-brown-600">
                              {percentage}%
                            </div>
                            {courseGrade ? (
                              <div className="mt-2">
                                {percentage >= 70 ? (
                                  <span className="px-3 py-1 bg-beige-50 text-green-600 rounded-full text-xs font-semibold">
                                    Passing
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 bg-beige-50 text-red-800 rounded-full text-xs font-semibold">
                                    Needs Improvement
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="mt-2">
                                <span className="px-3 py-1 bg-beige-100 text-brown-600 rounded-full text-xs font-semibold">
                                  No Grades Yet
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Grade Scale */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Grading Scale</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">A</div>
                  <div className="text-sm text-brown-600">90-100%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">B</div>
                  <div className="text-sm text-brown-600">80-89%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">C</div>
                  <div className="text-sm text-brown-600">70-79%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">D</div>
                  <div className="text-sm text-brown-600">60-69%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">F</div>
                  <div className="text-sm text-brown-600">0-59%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
