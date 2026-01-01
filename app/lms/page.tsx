import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  BookOpen,
  Video,
  Users,
  Award,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Management System | Elevate for Humanity',
  description:
    'Access interactive courses, video lessons, quizzes, and collaboration tools. Learn at your own pace with our modern LMS platform.',
};

export default function LMSLandingPage() {
  const features = [
    {
      icon: Video,
      title: 'Video Lessons',
      description: 'High-quality video content with expert instructors',
      href: '/lms/features/video-lessons',
    },
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Engaging lessons with quizzes and hands-on activities',
      href: '/lms/features/interactive-courses',
    },
    {
      icon: Users,
      title: 'Discussion Forums',
      description: 'Connect with classmates and instructors',
      href: '/lms/features/discussion-forums',
    },
    {
      icon: Award,
      title: 'Earn Certificates',
      description: 'Get recognized for completing courses',
      href: '/lms/features/certificates',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat Support',
      description: '24/7 help when you need it',
      href: '/lms/features/support',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey in real-time',
      href: '/lms/features/progress-tracking',
    },
  ];

  const courses = [
    {
      title: 'Healthcare Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      students: '1,200+',
      rating: 4.9,
      image: '/images/course-healthcare.jpg',
    },
    {
      title: 'HVAC Technician Training',
      instructor: 'Mike Rodriguez',
      students: '850+',
      rating: 4.8,
      image: '/images/course-hvac.jpg',
    },
    {
      title: 'Business Management',
      instructor: 'Jennifer Lee',
      students: '2,100+',
      rating: 4.9,
      image: '/images/course-business.jpg',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Course Teaser Style */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-teal-600 to-teal-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              {/* Logo */}
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="Elevate for Humanity"
                  width={150}
                  height={60}
                  className="brightness-0 invert"
                />
              </div>

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Learning Management System
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase">
                Learn Anywhere, Anytime
              </h1>

              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Access interactive courses, video lessons, quizzes, and
                collaboration tools. Learn at your own pace with our modern LMS
                platform.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">50+</div>
                  <div className="text-xs text-teal-100">Courses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">5,000+</div>
                  <div className="text-xs text-teal-100">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">24/7</div>
                  <div className="text-xs text-teal-100">Access</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboards"
                  className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-orange-600 hover:scale-105 transition-all"
                >
                  <span>Access LMS</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#courses"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-teal-600 transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>Browse Courses</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Video/Image Preview */}
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/heroes/hero-homepage.jpg"
                  alt="LMS Platform"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-teal-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our LMS platform provides all the tools and resources for
              effective online learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={idx}
                  href={feature.href}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-teal-500 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors">
                    <Icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {feature.title} →
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <span className="text-teal-600 font-semibold text-sm">
                    Learn More →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular training programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-teal-500 hover:shadow-2xl transition-all hover:-translate-y-2 transform"
              >
                <div className="relative h-48 bg-gradient-to-br from-teal-500 to-teal-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Instructor: {course.instructor}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">
                        {course.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {course.students} students
                    </div>
                  </div>
                  <Link
                    href="/lms/dashboard"
                    className="block text-center bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
            "The LMS platform made learning so easy. I could study at my own
            pace and the instructors were always available to help."
          </blockquote>
          <p className="text-xl text-gray-600">
            — Marcus Thompson, CNA Graduate
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={150}
              height={60}
              className="mx-auto brightness-0 invert"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Join 5,000+ students already learning on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
            >
              <span>Apply Now - 100% Free</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/lms/dashboard"
              className="inline-flex items-center gap-3 bg-orange-700 border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-black hover:bg-orange-800 transition-all"
            >
              <span>Access LMS</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-orange-100 mt-6">
            Already enrolled? Log in to access your courses
          </p>
        </div>
      </section>
    </main>
  );
}
