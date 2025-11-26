// app/lms/page.tsx - Public LMS Landing Page
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight, Video, FileText, Target } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Learning Management System | Elevate For Humanity',
  description: 'Access your courses, track progress, and earn certifications through our comprehensive LMS platform.',
};

// Add revalidation to cache the page
export const revalidate = 3600; // Revalidate every hour

export default async function LMSLandingPage() {
  // Simplified - don't fetch courses on landing page for faster load
  const courseCount = 27; // Static count for now
  const courses = null; // Don't fetch on landing page

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Elevate Learning Management System
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Access world-class training, track your progress, and earn industry-recognized certifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lms/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg"
              >
                Access Dashboard
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/lms/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-400 transition border-2 border-white"
              >
                Browse Courses
                <BookOpen size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{courseCount}+</div>
              <div className="text-slate-600 font-medium">Active Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-slate-600 font-medium">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-slate-600 font-medium">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Funded Training</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our LMS provides all the tools and support for your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Video Lessons</h3>
              <p className="text-slate-600">
                High-quality video content with expert instructors teaching every concept
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600">
                Monitor your progress with detailed analytics and completion tracking
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certifications</h3>
              <p className="text-slate-600">
                Earn industry-recognized certificates upon course completion
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Course Materials</h3>
              <p className="text-slate-600">
                Downloadable resources, worksheets, and reference materials
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instructor Support</h3>
              <p className="text-slate-600">
                Get help from experienced instructors and career coaches
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Flexible Learning</h3>
              <p className="text-slate-600">
                Learn at your own pace with 24/7 access to all course content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Courses Preview */}
      {courses && courses.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Available Courses
              </h2>
              <p className="text-lg text-slate-600">
                Start learning today with our comprehensive training programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition">
                  <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="text-white/20" size={80} />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {course.level && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                          {course.level}
                        </span>
                      )}
                      {course.duration_hours && (
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <Clock size={14} />
                          {course.duration_hours}h
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                    {course.subtitle && (
                      <p className="text-slate-600 text-sm mb-4">{course.subtitle}</p>
                    )}
                    <Link
                      href={`/lms/courses/${course.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                    >
                      View Course
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/lms/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition"
              >
                View All Courses
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Access your dashboard and begin your training journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lms/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-bold text-lg hover:bg-white/10 transition border-2 border-white"
            >
              Apply for Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
