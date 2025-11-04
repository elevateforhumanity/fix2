import React from 'react';
/**
 * Admin Assessments Page
 * Manage quizzes, assignments, and grading
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface Assessment {
  id: string;
  title: string;
  type: string;
  course_id: string;
  questions: any;
  passing_score: number;
  time_limit: number | null;
  created_at: string;
  course?: {
    title: string;
  };
}

interface Submission {
  id: string;
  assessment_id: string;
  user_id: string;
  answers: any;
  score: number | null;
  graded: boolean;
  submitted_at: string;
  user?: {
    email: string;
  };
  assessment?: {
    title: string;
  };
}

export default function Assessments() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'assessments' | 'submissions' | 'analytics'
  >('assessments');

  // Assessment form
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentType, setAssessmentType] = useState('quiz');
  const [passingScore, setPassingScore] = useState(70);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalAssessments: 0,
    pendingGrading: 0,
    averageScore: 0,
    completionRate: 0,
  });

  useEffect(() => {
    if (currentOrg) {
      loadAssessmentData();
    }
  }, [currentOrg]);

  async function loadAssessmentData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      // Load assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessments')
        .select(
          `
          *,
          course:courses(title)
        `
        )
        .eq('org_id', currentOrg.id)
        .order('created_at', { ascending: false });

      if (assessmentsError) throw assessmentsError;

      // Load submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('assessment_submissions')
        .select(
          `
          *,
          user:users(email),
          assessment:assessments(title)
        `
        )
        .eq('org_id', currentOrg.id)
        .order('submitted_at', { ascending: false })
        .limit(50);

      if (submissionsError) throw submissionsError;

      setAssessments(assessmentsData || []);
      setSubmissions(submissionsData || []);

      // Calculate stats
      const pendingGrading = (submissionsData || []).filter(
        (s) => !s.graded
      ).length;
      const gradedSubmissions = (submissionsData || []).filter(
        (s) => s.graded && s.score !== null
      );
      const averageScore =
        gradedSubmissions.length > 0
          ? gradedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) /
            gradedSubmissions.length
          : 0;

      setStats({
        totalAssessments: (assessmentsData || []).length,
        pendingGrading,
        averageScore: Math.round(averageScore),
        completionRate: 0, // Would need enrollment data
      });
    } catch (error) {
      console.error('Failed to load assessment data:', error);
      alert('Failed to load assessment data');
    } finally {
      setLoading(false);
    }
  }

  async function createAssessment() {
    if (!currentOrg || !assessmentTitle.trim()) return;

    try {
      setCreating(true);

      const { error } = await supabase.from('assessments').insert({
        org_id: currentOrg.id,
        title: assessmentTitle,
        type: assessmentType,
        questions: [],
        passing_score: passingScore,
        time_limit: timeLimit,
      });

      if (error) throw error;

      setAssessmentTitle('');
      setShowAssessmentModal(false);
      await loadAssessmentData();
      alert('Assessment created successfully!');
    } catch (error: any) {
      console.error('Failed to create assessment:', error);
      alert('Failed to create assessment: ' + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function gradeSubmission(submissionId: string, score: number) {
    try {
      const { error } = await supabase
        .from('assessment_submissions')
        .update({ score, graded: true })
        .eq('id', submissionId);

      if (error) throw error;

      await loadAssessmentData();
      alert('Submission graded successfully!');
    } catch (error: any) {
      console.error('Failed to grade submission:', error);
      alert('Failed to grade submission: ' + error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Assessments & Grading
          </h1>
          <p className="mt-2 text-gray-600">
            Manage quizzes, assignments, and student submissions
          </p>
        </div>
        <button
          onClick={() => setShowAssessmentModal(true)}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Create Assessment
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Total Assessments</div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalAssessments}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Pending Grading</div>
          <div className="text-3xl font-bold text-orange-600">
            {stats.pendingGrading}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Average Score</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.averageScore}%
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Completion Rate</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.completionRate}%
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'assessments'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Assessments ({assessments.length})
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'submissions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Submissions ({submissions.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'analytics'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Analytics
        </button>
      </div>
      {/* Assessments Tab */}
      {activeTab === 'assessments' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Assessments
          </h2>
          {assessments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No assessments yet</p>
              <button
                onClick={() => setShowAssessmentModal(true)}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Your First Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {assessment.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <span className="capitalize">{assessment.type}</span>
                        <span>•</span>
                        <span>Passing: {assessment.passing_score}%</span>
                        {assessment.time_limit && (
                          <>
                            <span>•</span>
                            <span>{assessment.time_limit} min</span>
                          </>
                        )}
                        <span>•</span>
                        <span>
                          {new Date(assessment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {assessment.course && (
                        <div className="text-sm text-gray-500 mt-1">
                          Course: {assessment.course.title}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Submissions
          </h2>
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No submissions yet
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {submission.assessment?.title || 'Unknown Assessment'}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <span>{submission.user?.email || 'Unknown User'}</span>
                        <span>•</span>
                        <span>
                          {new Date(submission.submitted_at).toLocaleString()}
                        </span>
                        {submission.graded && submission.score !== null && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-blue-600">
                              Score: {submission.score}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!submission.graded ? (
                        <button
                          onClick={() => {
                            const score = prompt('Enter score (0-100):');
                            if (score !== null) {
                              const numScore = parseInt(score);
                              if (
                                !isNaN(numScore) &&
                                numScore >= 0 &&
                                numScore <= 100
                              ) {
                                gradeSubmission(submission.id, numScore);
                              } else {
                                alert(
                                  'Invalid score. Please enter a number between 0 and 100.'
                                );
                              }
                            }
                          }}
                          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Grade
                        </button>
                      ) : (
                        <span className="px-4 py-2 text-sm text-green-600 font-medium">
                          ✓ Graded
                        </span>
                      )}
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Assessment Analytics
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Score Distribution
              </h3>
              <div className="text-gray-600">
                Analytics visualization would go here (chart library needed)
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Question Performance
              </h3>
              <div className="text-gray-600">
                Question-level analytics would go here
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Time Analysis</h3>
              <div className="text-gray-600">
                Time-to-complete analytics would go here
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Create Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Assessment
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Title *
                </label>
                <input
                  type="text"
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  placeholder="Module 1 Quiz"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={assessmentType}
                  onChange={(e) => setAssessmentType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                  <option value="survey">Survey</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit (minutes, optional)
                </label>
                <input
                  type="number"
                  value={timeLimit || ''}
                  onChange={(e) =>
                    setTimeLimit(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  placeholder="No limit"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowAssessmentModal(false);
                  setAssessmentTitle('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createAssessment}
                disabled={creating || !assessmentTitle.trim()}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Assessment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
