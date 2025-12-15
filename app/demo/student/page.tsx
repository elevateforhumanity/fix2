'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Play,
  CheckCircle,
} from 'lucide-react';

export default function StudentDemoPage() {
  const courses = [
    {
      id: 1,
      title: 'Professional Barbering Fundamentals',
      progress: 65,
      nextLesson: 'Hair Cutting Techniques',
      totalLessons: 24,
      completedLessons: 16,
      instructor: 'Master Barber Johnson',
      image: '💈',
    },
    {
      id: 2,
      title: 'OSHA 10 Safety Certification',
      progress: 40,
      nextLesson: 'Hazard Communication',
      totalLessons: 10,
      completedLessons: 4,
      instructor: 'Safety Specialist Martinez',
      image: '🦺',
    },
    {
      id: 3,
      title: 'Business Management Basics',
      progress: 80,
      nextLesson: 'Marketing Your Services',
      totalLessons: 12,
      completedLessons: 10,
      instructor: 'Prof. Williams',
      image: '💼',
    },
  ];

  const achievements = [
    { title: 'First Course Started', date: '2 months ago', icon: '🎯' },
    { title: 'Perfect Attendance Week', date: '1 month ago', icon: '⭐' },
    { title: '10 Lessons Completed', date: '3 weeks ago', icon: '🏆' },
    { title: 'Quiz Master', date: '1 week ago', icon: '🎓' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Student"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Student
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Banner */}
      <div className="bg-blue-700 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-semibold">
                DEMO MODE - Student Portal Preview
              </span>
            </div>
            <Link
              href="/demo"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-2xl md:text-3xl lg:text-4xl">
            Welcome, Demo Student
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-500">Active Courses</p>
            </div>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-gray-500">Certificates</p>
            </div>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-gray-500">Avg. Score</p>
            </div>
            <p className="text-3xl font-bold">92%</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl text-2xl md:text-3xl lg:text-4xl">
                        {course.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Instructor: {course.instructor}
                        </p>

                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">
                              {course.completedLessons}
                            </span>{' '}
                            of {course.totalLessons} lessons
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2">
                            <Play size={16} />
                            Continue
                          </button>
                        </div>

                        <div className="mt-2 text-sm text-gray-500">
                          Next: {course.nextLesson}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Upcoming Assignments</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Barbering Practical Exam</h3>
                    <p className="text-sm text-gray-600">Due in 3 days</p>
                  </div>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">OSHA Safety Quiz</h3>
                    <p className="text-sm text-gray-600">Due in 5 days</p>
                  </div>
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Business Plan Draft</h3>
                    <p className="text-sm text-gray-600">Due in 1 week</p>
                  </div>
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 text-left px-4">
                  📚 Browse Courses
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 text-left px-4">
                  🎓 View Certificates
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 text-left px-4">
                  💬 Message Instructor
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 text-left px-4">
                  📊 View Progress Report
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="   rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-sm text-purple-100 mb-4">
                Our support team is here 24/7
              </p>
              <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Demo Footer */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            This is a Demo Preview
          </h3>
          <p className="text-blue-700 mb-4">
            In the full platform, students can access courses, track progress,
            earn certificates, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 border-2 border-blue-600"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16    text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-base md:text-lg mb-8 text-blue-100">
                Join thousands who have launched successful careers through our
                free training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
                >
                  Apply Now - It's Free
                </Link>
                <Link
                  href="/programs"
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
                >
                  Browse All Programs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
