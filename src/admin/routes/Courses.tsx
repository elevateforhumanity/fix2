/**
 * Admin Courses Page
 * Manage courses with versioning and publishing
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface Course {
  id: string;
  org_id: string;
  title: string;
  slug: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  created_by: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  creator?: {
    email: string;
  };
  enrollments_count?: number;
}

interface CourseVersion {
  id: string;
  version: number;
  title: string;
  description: string;
  changed_by: string;
  change_summary: string;
  created_at: string;
  changer?: {
    email: string;
  };
}

export default function Courses() {
  const { user } = useAuth();
  const { currentOrg, getUsageStats } = useOrg(user?.id || null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [versions, setVersions] = useState<CourseVersion[]>([]);
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVersionsModal, setShowVersionsModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (currentOrg) {
      loadCourses();
      loadUsage();
    }
  }, [currentOrg]);

  async function loadCourses() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('courses')
        .select(
          `
          *,
          creator:auth.users!courses_created_by_fkey(email),
          enrollments:enrollments(count)
        `
        )
        .eq('org_id', currentOrg.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setCourses(
        (data || []).map((c: any) => ({
          ...c,
          enrollments_count: c.enrollments?.[0]?.count || 0,
        }))
      );
    } catch (error) {
      console.error('Failed to load courses:', error);
      alert('Failed to load courses');
    } finally {
      setLoading(false);
    }
  }

  async function loadUsage() {
    try {
      const usageData = await getUsageStats();
      setUsage(usageData);
    } catch (error) {
      console.error('Failed to load usage:', error);
    }
  }

  async function createCourse() {
    if (!currentOrg || !user || !title.trim()) return;

    // Check course limit
    if (usage && usage.courses.used >= usage.courses.max) {
      alert(
        `Course limit reached (${usage.courses.max} courses). Please upgrade your plan.`
      );
      return;
    }

    try {
      const courseSlug =
        slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const { data, error } = await supabase
        .from('courses')
        .insert({
          org_id: currentOrg.id,
          title,
          slug: courseSlug,
          description,
          status: 'draft',
          version: 1,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Create initial version
      await supabase.from('course_versions').insert({
        course_id: data.id,
        version: 1,
        title,
        description,
        content: {},
        changed_by: user.id,
        change_summary: 'Initial version',
      });

      // Log audit
      await logAudit('course.create', `course:${data.id}`, null);

      setTitle('');
      setDescription('');
      setSlug('');
      setShowCreateModal(false);
      await loadCourses();
      await loadUsage();
      alert('Course created successfully!');
    } catch (error: any) {
      console.error('Failed to create course:', error);
      alert(`Failed to create course: ${error.message}`);
    }
  }

  async function updateCourseStatus(
    courseId: string,
    newStatus: 'draft' | 'published' | 'archived'
  ) {
    if (!user) return;

    try {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return;

      const updates: any = {
        status: newStatus,
      };

      if (newStatus === 'published' && !course.published_at) {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', courseId);

      if (error) throw error;

      // Log audit
      await logAudit('course.status.update', `course:${courseId}`, {
        before: course.status,
        after: newStatus,
      });

      await loadCourses();
      alert(`Course ${newStatus}`);
    } catch (error: any) {
      console.error('Failed to update course status:', error);
      alert(`Failed to update course: ${error.message}`);
    }
  }

  async function deleteCourse(courseId: string) {
    if (
      !confirm(
        'Are you sure you want to delete this course? This cannot be undone.'
      )
    )
      return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      // Log audit
      await logAudit('course.delete', `course:${courseId}`, null);

      await loadCourses();
      await loadUsage();
      alert('Course deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete course:', error);
      alert(`Failed to delete course: ${error.message}`);
    }
  }

  async function loadVersions(course: Course) {
    try {
      const { data, error } = await supabase
        .from('course_versions')
        .select(
          `
          *,
          changer:auth.users!course_versions_changed_by_fkey(email)
        `
        )
        .eq('course_id', course.id)
        .order('version', { ascending: false });

      if (error) throw error;

      setVersions(data || []);
      setSelectedCourse(course);
      setShowVersionsModal(true);
    } catch (error) {
      console.error('Failed to load versions:', error);
      alert('Failed to load versions');
    }
  }

  async function logAudit(action: string, target: string, diff: any) {
    if (!currentOrg || !user) return;

    try {
      if (!supabase) throw new Error('Supabase not initialized');
      await supabase.from('audit_logs').insert({
        org_id: currentOrg.id,
        actor_id: user.id,
        action,
        target,
        diff,
      });
    } catch (error) {
      console.error('Failed to log audit:', error);
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
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="mt-2 text-gray-600">
            Create and manage your learning content
          </p>
        </div>
        <div className="flex items-center gap-4">
          {usage && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {usage.courses.used} / {usage.courses.max}
              </div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            disabled={usage && usage.courses.used >= usage.courses.max}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Course
          </button>
        </div>
      </div>
      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No courses yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first course
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Status Badge */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    course.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : course.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {course.status}
                </span>
                <span className="text-xs text-gray-500">v{course.version}</span>
              </div>
              {/* Course Info */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.description || 'No description'}
              </p>
              {/* Meta Info */}
              <div className="space-y-2 mb-4 text-xs text-gray-500">
                <div>Created by {course.creator?.email || 'Unknown'}</div>
                <div>{course.enrollments_count || 0} enrollments</div>
                {course.published_at && (
                  <div>
                    Published{' '}
                    {new Date(course.published_at).toLocaleDateString()}
                  </div>
                )}
              </div>
              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {course.status === 'draft' && (
                  <button
                    onClick={() => updateCourseStatus(course.id, 'published')}
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Publish
                  </button>
                )}
                {course.status === 'published' && (
                  <button
                    onClick={() => updateCourseStatus(course.id, 'draft')}
                    className="flex-1 px-3 py-2 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  onClick={() => loadVersions(course)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Versions
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Course
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Introduction to Web Development"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL-friendly name)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="intro-to-web-dev (auto-generated if empty)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Learn the fundamentals of web development..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setTitle('');
                  setDescription('');
                  setSlug('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createCourse}
                disabled={!title.trim()}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Versions Modal */}
      {showVersionsModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Version History: {selectedCourse.title}
            </h2>
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-lg font-semibold">
                        Version {version.version}
                      </span>
                      {version.version === selectedCourse.version && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(version.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {version.change_summary}
                  </p>
                  <p className="text-xs text-gray-500">
                    Changed by {version.changer?.email || 'Unknown'}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowVersionsModal(false);
                  setSelectedCourse(null);
                  setVersions([]);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
