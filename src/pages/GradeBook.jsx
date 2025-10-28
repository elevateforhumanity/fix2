/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function GradeBook() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchStudentGrades(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('title');

      if (coursesError) throw coursesError;

      setCourses(data || []);
      if (data && data.length > 0) {
        setSelectedCourse(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentGrades = async (courseId) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch enrollments for this course
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('user_id')
        .eq('course_id', courseId);

      if (enrollmentError) throw enrollmentError;

      if (!enrollments || enrollments.length === 0) {
        setStudents([]);
        return;
      }

      const userIds = enrollments.map((e) => e.user_id);

      // Fetch quiz responses for these students
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
              course_id
            )
          )
        `
        )
        .in('user_id', userIds);

      if (responsesError) throw responsesError;

      // Calculate grades per student
      const studentGrades = {};

      responses?.forEach((response) => {
        const userId = response.user_id;
        const responseCourseId = response.quiz_questions?.lessons?.course_id;

        if (responseCourseId !== courseId) return;

        if (!studentGrades[userId]) {
          studentGrades[userId] = {
            userId,
            correct: 0,
            total: 0,
          };
        }

        const isCorrect = response.answer === response.quiz_questions?.answer;
        studentGrades[userId].total++;
        if (isCorrect) studentGrades[userId].correct++;
      });

      // Convert to array and calculate percentages
      const studentsArray = Object.values(studentGrades).map((student) => ({
        ...student,
        percentage:
          student.total > 0
            ? Math.round((student.correct / student.total) * 100)
            : 0,
        letterGrade: getLetterGrade(
          student.total > 0
            ? Math.round((student.correct / student.total) * 100)
            : 0
        ),
      }));

      setStudents(studentsArray);
    } catch (error) {
      console.error('Error fetching student grades:', error);
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
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const averageGrade =
    students.length > 0
      ? Math.round(
          students.reduce((sum, s) => sum + s.percentage, 0) / students.length
        )
      : 0;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Instructor Grade Book</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        {/* Course Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse || ''}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brand-text-muted">Loading grades...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Class Statistics */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Class Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{students.length}</div>
                  <div className="text-sm">Total Students</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{averageGrade}%</div>
                  <div className="text-sm">Class Average</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {students.filter((s) => s.percentage >= 70).length}
                  </div>
                  <div className="text-sm">Passing Students</div>
                </div>
              </div>
            </div>
            {/* Student Grades Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Student Grades</h2>
              </div>
              {students.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>No students enrolled in this course yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quizzes Completed
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Correct Answers
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Percentage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Letter Grade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.userId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.userId.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.correct}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {student.percentage}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(student.percentage)}`}
                            >
                              {student.letterGrade}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student.percentage >= 70 ? (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                Passing
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                                At Risk
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* Grade Distribution */}
            {students.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">Grade Distribution</h3>
                <div className="grid grid-cols-5 gap-4">
                  {['A', 'B', 'C', 'D', 'F'].map((grade) => {
                    const count = students.filter(
                      (s) => s.letterGrade === grade
                    ).length;
                    const percentage = Math.round(
                      (count / students.length) * 100
                    );
                    return (
                      <div key={grade} className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {count}
                        </div>
                        <div className="text-sm text-gray-600">
                          {grade} ({percentage}%)
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
