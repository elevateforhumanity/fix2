'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Edit, Trash2, Eye, Users, Clock, CheckCircle } from 'lucide-react';

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  status: string;
  total_students: number;
  total_lessons: number;
  rating: number;
  created_at: string;
};

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/courses/list?status=${filter}`);
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCourses();
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const publishCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      });

      if (response.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-slate-100 text-slate-700',
      published: 'bg-green-100 text-green-700',
      archived: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Course Management</h1>
              <p className="text-slate-600 mt-1">Create and manage your training courses</p>
            </div>
            <Link
              href="/create-course"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              <Plus size={20} />
              Create New Course
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-6">
            {['all', 'draft', 'published', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === status
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto" />
            <p className="text-slate-600 mt-4">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No courses yet</h3>
            <p className="text-slate-600 mb-6">Create your first course to get started</p>
            <Link
              href="/create-course"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              <Plus size={20} />
              Create Course
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          course.status
                        )}`}
                      >
                        {course.status}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{course.description}</p>

                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        <span>{course.total_lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{course.total_students} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                        {course.category}
                      </div>
                      <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                        {course.level}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                      title="View Course"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      href={`/admin/courses/edit/${course.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit Course"
                    >
                      <Edit size={20} />
                    </Link>
                    {course.status === 'draft' && (
                      <button
                        onClick={() => publishCourse(course.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Publish Course"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Course"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
