'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Clock, Target, Award, BookOpen, CheckCircle,
  Calendar, BarChart, PieChart, Activity, Zap, Trophy,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react';

export default function StudentAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Learning Analytics</h1>
              <p className="text-slate-600 mt-1">Track your progress and performance</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon size={24} className={metric.iconColor} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' :
                  metric.trend === 'down' ? 'text-red-600' :
                  'text-slate-600'
                }`}>
                  {metric.trend === 'up' && <ArrowUp size={16} />}
                  {metric.trend === 'down' && <ArrowDown size={16} />}
                  {metric.trend === 'neutral' && <Minus size={16} />}
                  {metric.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
              <div className="text-sm text-slate-600">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Learning Activity Chart */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Learning Activity</h2>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-slate-600">Study Time</span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-slate-600">Lessons</span>
                  </div>
                </div>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-2">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col gap-1">
                      <div
                        className="w-full bg-red-500 rounded-t transition-all hover:bg-red-600"
                        style={{ height: `${(day.hours / 4) * 100}%`, minHeight: '4px' }}
                        title={`${day.hours} hours`}
                      />
                      <div
                        className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                        style={{ height: `${(day.lessons / 10) * 100}%`, minHeight: '4px' }}
                        title={`${day.lessons} lessons`}
                      />
                    </div>
                    <div className="text-xs text-slate-600 font-medium">{day.day}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Progress */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Course Progress</h2>
              <div className="space-y-4">
                {courseProgress.map((course, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{course.title}</h3>
                        <p className="text-sm text-slate-600">
                          {course.completed} of {course.total} lessons completed
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">{course.progress}%</div>
                        <div className="text-xs text-slate-600">Complete</div>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-blue-500 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quiz Performance */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Quiz Performance</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">92%</div>
                  <div className="text-sm text-slate-600">Average Score</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24</div>
                  <div className="text-sm text-slate-600">Quizzes Taken</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
                  <div className="text-sm text-slate-600">Perfect Scores</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {recentQuizzes.map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{quiz.title}</p>
                      <p className="text-sm text-slate-600">{quiz.course}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          quiz.score >= 90 ? 'text-green-600' :
                          quiz.score >= 70 ? 'text-blue-600' :
                          'text-orange-600'
                        }`}>
                          {quiz.score}%
                        </div>
                        <div className="text-xs text-slate-600">{quiz.date}</div>
                      </div>
                      {quiz.score === 100 && (
                        <Trophy size={20} className="text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Study Habits */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Study Habits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Most Active Times</h3>
                  <div className="space-y-3">
                    {studyTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-24 text-sm text-slate-600">{time.period}</div>
                        <div className="flex-1">
                          <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                            <div
                              className="h-full bg-red-500 flex items-center justify-end pr-2"
                              style={{ width: `${time.percentage}%` }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {time.hours}h
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Learning Preferences</h3>
                  <div className="space-y-3">
                    {learningPreferences.map((pref, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <pref.icon size={20} className="text-slate-600" />
                          <span className="text-sm font-medium text-slate-900">{pref.type}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{pref.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-sm text-white/90">Day Streak</div>
                </div>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Keep it up! You're on fire 🔥
              </p>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 bg-white/30 rounded-full">
                    <div className="h-full bg-white rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target size={20} />
                Weekly Goals
              </h3>
              <div className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">{goal.title}</span>
                      <span className="text-sm font-bold text-slate-900">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${goal.color} transition-all`}
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy size={20} />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                      <Award size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{achievement.title}</p>
                      <p className="text-xs text-slate-600">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3">💡 Recommendations</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Try studying in the morning - your quiz scores are 15% higher!</li>
                <li>• You're close to completing VITA Tax Prep - finish this week!</li>
                <li>• Join the discussion forum to boost engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data
const keyMetrics = [
  {
    icon: Clock,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    value: '12.5h',
    label: 'Study Time',
    change: '+15%',
    trend: 'up',
  },
  {
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    value: '18',
    label: 'Lessons Completed',
    change: '+22%',
    trend: 'up',
  },
  {
    icon: Target,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    value: '92%',
    label: 'Quiz Average',
    change: '+3%',
    trend: 'up',
  },
  {
    icon: Trophy,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    value: '5',
    label: 'Badges Earned',
    change: '0',
    trend: 'neutral',
  },
];

const weeklyActivity = [
  { day: 'Mon', hours: 2.5, lessons: 4 },
  { day: 'Tue', hours: 3.2, lessons: 6 },
  { day: 'Wed', hours: 1.8, lessons: 3 },
  { day: 'Thu', hours: 2.9, lessons: 5 },
  { day: 'Fri', hours: 1.5, lessons: 2 },
  { day: 'Sat', hours: 0.6, lessons: 1 },
  { day: 'Sun', hours: 0, lessons: 0 },
];

const courseProgress = [
  { title: 'VITA Tax Preparation', completed: 13, total: 20, progress: 65 },
  { title: 'Medical Assistant Fundamentals', completed: 8, total: 25, progress: 32 },
  { title: 'Digital Literacy Essentials', completed: 12, total: 15, progress: 80 },
];

const recentQuizzes = [
  { title: 'Tax Law Fundamentals', course: 'VITA Tax Prep', score: 95, date: 'Nov 20' },
  { title: 'Form 1040 Practice', course: 'VITA Tax Prep', score: 88, date: 'Nov 18' },
  { title: 'EITC Calculations', course: 'VITA Tax Prep', score: 100, date: 'Nov 15' },
  { title: 'Vital Signs Assessment', course: 'Medical Assistant', score: 92, date: 'Nov 12' },
];

const studyTimes = [
  { period: 'Morning', hours: 4.2, percentage: 70 },
  { period: 'Afternoon', hours: 3.8, percentage: 63 },
  { period: 'Evening', hours: 3.5, percentage: 58 },
  { period: 'Night', hours: 1.0, percentage: 17 },
];

const learningPreferences = [
  { type: 'Video Lessons', icon: Activity, percentage: 45 },
  { type: 'Reading', icon: BookOpen, percentage: 30 },
  { type: 'Quizzes', icon: CheckCircle, percentage: 15 },
  { type: 'Discussions', icon: Activity, percentage: 10 },
];

const weeklyGoals = [
  { title: 'Study Hours', current: 12, target: 15, color: 'bg-blue-500' },
  { title: 'Lessons', current: 18, target: 20, color: 'bg-green-500' },
  { title: 'Quizzes', current: 4, target: 5, color: 'bg-purple-500' },
];

const recentAchievements = [
  { title: 'Week Warrior', date: 'Nov 20', color: 'bg-orange-500' },
  { title: 'Quiz Master', date: 'Nov 18', color: 'bg-blue-500' },
  { title: 'Quick Learner', date: 'Nov 15', color: 'bg-green-500' },
];
