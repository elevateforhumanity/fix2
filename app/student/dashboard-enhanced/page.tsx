'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, TrendingUp, Award, Calendar, Clock, Target,
  Play, CheckCircle, Star, Users, MessageSquare, Bell,
  BarChart, Trophy, Flame, Zap, ArrowRight, Download,
  Video, FileText, Headphones
} from 'lucide-react';

export default function EnhancedStudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome back, Sarah!</h1>
              <p className="text-slate-600 mt-1">Let's continue your learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak Counter */}
              <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                <Flame className="text-orange-500" size={24} />
                <div>
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <div className="text-xs text-orange-700">Day Streak</div>
                </div>
              </div>

              {/* Points */}
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Zap className="text-blue-500" size={24} />
                <div>
                  <div className="text-2xl font-bold text-blue-600">2,450</div>
                  <div className="text-xs text-blue-700">Points</div>
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                <Bell size={20} className="text-slate-700" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Continue Learning */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Continue Learning</h2>
              <div className="grid gap-4">
                {continueLearnin.map((course, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-start gap-4">
                      <div className="w-32 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center">
                        <BookOpen size={32} className="text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{course.nextLesson}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                            <span>{course.progress}% Complete</span>
                            <span>{course.lessonsCompleted} of {course.totalLessons} lessons</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            href={course.continueUrl}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                          >
                            <Play size={16} />
                            Continue Learning
                          </Link>
                          <span className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock size={14} />
                            {course.timeRemaining} left
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Stats */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Progress This Week</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">12.5h</div>
                  </div>
                  <p className="text-sm text-slate-600">Learning Time</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">18</div>
                  </div>
                  <p className="text-sm text-slate-600">Lessons Completed</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Target size={20} className="text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">92%</div>
                  </div>
                  <p className="text-sm text-slate-600">Quiz Average</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Trophy size={20} className="text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">5</div>
                  </div>
                  <p className="text-sm text-slate-600">Badges Earned</p>
                </div>
              </div>
            </section>

            {/* Recommended Courses */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
                <Link href="/courses/catalog" className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-1">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendedCourses.map((course, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <BookOpen size={40} className="text-blue-600" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Users size={12} />
                          {course.students} students
                        </span>
                        <Link
                          href={course.url}
                          className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          Enroll
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-200">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.iconBg}`}>
                      <activity.icon size={20} className={activity.iconColor} />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">{activity.title}</p>
                      <p className="text-sm text-slate-600">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-center flex-shrink-0">
                      <div className="text-2xl font-bold text-red-600">{deadline.day}</div>
                      <div className="text-xs text-slate-600">{deadline.month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{deadline.title}</p>
                      <p className="text-xs text-slate-600">{deadline.course}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/student/calendar"
                className="block text-center mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                View Full Calendar
              </Link>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy size={20} />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Award size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{achievement.title}</p>
                      <p className="text-xs text-slate-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/student/badges"
                className="block text-center mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                View All Badges
              </Link>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-slate-200 text-slate-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                      <p className="text-xs text-slate-600">{user.points} points</p>
                    </div>
                    {index < 3 && (
                      <Trophy size={16} className={
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-slate-400' :
                        'text-orange-500'
                      } />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/student/certificates" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <Award size={18} className="text-slate-600" />
                  <span className="text-sm text-slate-700">My Certificates</span>
                </Link>
                <Link href="/student/resources" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <Download size={18} className="text-slate-600" />
                  <span className="text-sm text-slate-700">Resources</span>
                </Link>
                <Link href="/student/discussions" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <MessageSquare size={18} className="text-slate-600" />
                  <span className="text-sm text-slate-700">Discussions</span>
                </Link>
                <Link href="/support" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <Headphones size={18} className="text-slate-600" />
                  <span className="text-sm text-slate-700">Get Help</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data
const continueLearnin = [
  {
    title: 'VITA Tax Preparation Certification',
    nextLesson: 'Next: Form 1040 Walkthrough',
    progress: 65,
    lessonsCompleted: 13,
    totalLessons: 20,
    timeRemaining: '4.5 hours',
    continueUrl: '/courses/vita-tax-prep/learn',
  },
  {
    title: 'Medical Assistant Fundamentals',
    nextLesson: 'Next: Vital Signs Assessment',
    progress: 32,
    lessonsCompleted: 8,
    totalLessons: 25,
    timeRemaining: '12 hours',
    continueUrl: '/courses/medical-assistant/learn',
  },
];

const recommendedCourses = [
  {
    title: 'Advanced Tax Strategies',
    description: 'Learn complex tax scenarios and advanced filing techniques.',
    category: 'Business',
    rating: '4.8',
    students: '1,234',
    url: '/courses/advanced-tax',
  },
  {
    title: 'Phlebotomy Technician',
    description: 'Master blood collection techniques and lab procedures.',
    category: 'Healthcare',
    rating: '4.9',
    students: '856',
    url: '/courses/phlebotomy',
  },
];

const recentActivity = [
  {
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Completed Lesson',
    description: 'Tax Law Fundamentals - Quiz passed with 95%',
    time: '2 hours ago',
  },
  {
    icon: Award,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    title: 'Badge Earned',
    description: 'Quick Learner - Completed 5 lessons in one day',
    time: '1 day ago',
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Discussion Reply',
    description: 'Instructor replied to your question in VITA course',
    time: '2 days ago',
  },
];

const upcomingDeadlines = [
  { day: '24', month: 'Nov', title: 'Module 3 Quiz', course: 'VITA Tax Prep' },
  { day: '26', month: 'Nov', title: 'Practice Return', course: 'VITA Tax Prep' },
  { day: '28', month: 'Nov', title: 'Final Assessment', course: 'Medical Assistant' },
];

const achievements = [
  { title: 'Week Warrior', description: 'Completed 7 days in a row' },
  { title: 'Quiz Master', description: 'Scored 100% on 5 quizzes' },
  { title: 'Helpful Peer', description: 'Answered 10 discussion questions' },
];

const leaderboard = [
  { name: 'You (Sarah M.)', points: '2,450' },
  { name: 'Marcus T.', points: '2,380' },
  { name: 'Jennifer R.', points: '2,210' },
  { name: 'David L.', points: '2,105' },
  { name: 'Amanda K.', points: '1,980' },
];
