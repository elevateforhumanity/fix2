'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Award, Calendar, TrendingUp, Clock, CheckCircle, MessageCircle, UserPlus, Video, MessageSquare, HelpCircle, Settings, GripVertical, Eye, EyeOff, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function StudentDashboardPage() {
  const [customizeMode, setCustomizeMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [visibleBlocks, setVisibleBlocks] = useState({
    progress: true,
    stats: true,
    nextClass: true,
    activity: true,
    courses: true,
    calendar: true,
    deadlines: true,
    achievements: true,
  });
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
              <p className="text-gray-600 mt-1">HVAC Technician Training</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Bell className="h-6 w-6 text-slate-700" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <NotificationItem
                        type="assignment"
                        title="New assignment posted"
                        message="Module 3 Quiz is now available"
                        time="5 minutes ago"
                        unread
                      />
                      <NotificationItem
                        type="grade"
                        title="Grade posted"
                        message="You scored 95% on Circuit Diagram"
                        time="2 hours ago"
                        unread
                      />
                      <NotificationItem
                        type="comment"
                        title="Instructor commented"
                        message="Great work on your safety report!"
                        time="1 day ago"
                      />
                      <NotificationItem
                        type="reminder"
                        title="Class reminder"
                        message="HVAC Systems class starts in 30 minutes"
                        time="2 days ago"
                      />
                    </div>
                    <div className="p-3 border-t text-center">
                      <Link
                        href="/student/notifications"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setCustomizeMode(!customizeMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  customizeMode
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-600'
                }`}
              >
                <Settings className="h-4 w-4" />
                {customizeMode ? 'Done Customizing' : 'Customize Dashboard'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Customization Panel */}
        {customizeMode && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customize Your Dashboard</h3>
              <p className="text-sm text-slate-600 mb-4">Toggle widgets on or off to personalize your dashboard view.</p>
              <div className="grid md:grid-cols-2 gap-3">
                <CustomizeToggle
                  label="Progress Card"
                  checked={visibleBlocks.progress}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, progress: checked })}
                />
                <CustomizeToggle
                  label="Stats Grid"
                  checked={visibleBlocks.stats}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, stats: checked })}
                />
                <CustomizeToggle
                  label="Next Class"
                  checked={visibleBlocks.nextClass}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, nextClass: checked })}
                />
                <CustomizeToggle
                  label="Recent Activity"
                  checked={visibleBlocks.activity}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, activity: checked })}
                />
                <CustomizeToggle
                  label="Active Courses"
                  checked={visibleBlocks.courses}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, courses: checked })}
                />
                <CustomizeToggle
                  label="Calendar"
                  checked={visibleBlocks.calendar}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, calendar: checked })}
                />
                <CustomizeToggle
                  label="Upcoming Deadlines"
                  checked={visibleBlocks.deadlines}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, deadlines: checked })}
                />
                <CustomizeToggle
                  label="Achievements"
                  checked={visibleBlocks.achievements}
                  onChange={(checked) => setVisibleBlocks({ ...visibleBlocks, achievements: checked })}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Card */}
        {visibleBlocks.progress && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
              <p className="text-blue-100">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">67%</div>
              <p className="text-blue-100 mt-1">Complete</p>
            </div>
          </div>
          <div className="mt-6 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3" style={{ width: '67%' }} />
          </div>
        </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <QuickAction
            icon={<Video className="h-5 w-5" />}
            label="Join Live Class"
            href="/student/live-classes"
            color="blue"
          />
          <QuickAction
            icon={<FileText className="h-5 w-5" />}
            label="Submit Assignment"
            href="/student/assignments"
            color="green"
          />
          <QuickAction
            icon={<MessageSquare className="h-5 w-5" />}
            label="Forums"
            href="/lms/forums"
            color="purple"
          />
          <QuickAction
            icon={<UserPlus className="h-5 w-5" />}
            label="Study Groups"
            href="/study-groups"
            color="orange"
          />
          <QuickAction
            icon={<TrendingUp className="h-5 w-5" />}
            label="My Analytics"
            href="/student/analytics"
            color="green"
          />
          <QuickAction
            icon={<MessageSquare className="h-5 w-5" />}
            label="AI Chat"
            href="/chat"
            color="blue"
          />
          <QuickAction
            icon={<Award className="h-5 w-5" />}
            label="Certificates"
            href="/student/certificates"
            color="orange"
          />
          <QuickAction
            icon={<HelpCircle className="h-5 w-5" />}
            label="Get Help"
            href="/student/support"
            color="orange"
          />
        </div>

        {/* Stats Grid */}
        {visibleBlocks.stats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Courses</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">3</div>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Certificates</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">2</div>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">GPA</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">3.8</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Attendance</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">98%</div>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Class */}
            {visibleBlocks.nextClass && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Next Class</h3>
                  <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">HVAC Systems Installation</h4>
                      <p className="text-sm text-slate-600 mt-1">Module 3: Ductwork Design</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Today, 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>2 hours</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/courses/hvac-systems"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Join Class
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            {/* Recent Activity Feed */}
            {visibleBlocks.activity && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <ActivityItem
                    type="completed"
                    title="Completed Module 2 Quiz"
                    course="HVAC Systems"
                    time="2 hours ago"
                    score={95}
                  />
                  <ActivityItem
                    type="submitted"
                    title="Submitted Circuit Diagram"
                    course="Electrical Fundamentals"
                    time="5 hours ago"
                  />
                  <ActivityItem
                    type="comment"
                    title="Instructor commented on your assignment"
                    course="Safety & Compliance"
                    time="1 day ago"
                  />
                  <ActivityItem
                    type="enrolled"
                    title="Enrolled in Advanced HVAC"
                    course="HVAC Systems"
                    time="2 days ago"
                  />
                </div>
              </CardContent>
            </Card>
            )}

            {/* Learning Path Visualization */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Learning Path</h3>
                <p className="text-sm text-slate-600 mb-6">HVAC Technician Certification Program</p>
                <LearningPathVisualization />
              </CardContent>
            </Card>

            {/* Active Courses */}
            {visibleBlocks.courses && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Active Courses</h3>
                <div className="space-y-4">
                  <CourseCard
                    title="HVAC Systems Installation"
                    progress={75}
                    nextLesson="Ductwork Design"
                    href="/courses/hvac-systems"
                  />
                  <CourseCard
                    title="Electrical Fundamentals"
                    progress={60}
                    nextLesson="Circuit Analysis"
                    href="/courses/electrical"
                  />
                  <CourseCard
                    title="Safety & Compliance"
                    progress={90}
                    nextLesson="Final Assessment"
                    href="/courses/safety"
                  />
                </div>
              </CardContent>
            </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Calendar Widget */}
            {visibleBlocks.calendar && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Calendar</h3>
                <CalendarWidget />
              </CardContent>
            </Card>
            )}

            {/* Upcoming Deadlines */}
            {visibleBlocks.deadlines && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  <DeadlineItem
                    title="Module 3 Quiz"
                    course="HVAC Systems"
                    dueDate="Tomorrow"
                    dueTime="11:59 PM"
                    urgent
                  />
                  <DeadlineItem
                    title="Circuit Diagram"
                    course="Electrical"
                    dueDate="Dec 26"
                    dueTime="5:00 PM"
                  />
                  <DeadlineItem
                    title="Safety Report"
                    course="Safety"
                    dueDate="Dec 30"
                    dueTime="11:59 PM"
                  />
                  <DeadlineItem
                    title="Final Project"
                    course="HVAC Systems"
                    dueDate="Jan 5"
                    dueTime="11:59 PM"
                  />
                </div>
                <Link
                  href="/student/assignments"
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-4"
                >
                  View All Assignments →
                </Link>
              </CardContent>
            </Card>
            )}

            {/* Recent Achievements */}
            {visibleBlocks.achievements && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <AchievementItem
                    title="Perfect Attendance"
                    description="30 days streak"
                    icon="🎯"
                  />
                  <AchievementItem
                    title="Quick Learner"
                    description="Completed 5 modules"
                    icon="⚡"
                  />
                  <AchievementItem
                    title="Top Performer"
                    description="95% average score"
                    icon="🏆"
                  />
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LearningPathVisualization() {
  const pathSteps = [
    { id: 1, title: 'Fundamentals', status: 'completed', progress: 100 },
    { id: 2, title: 'Safety & Compliance', status: 'completed', progress: 100 },
    { id: 3, title: 'HVAC Systems', status: 'in-progress', progress: 75 },
    { id: 4, title: 'Electrical Fundamentals', status: 'in-progress', progress: 60 },
    { id: 5, title: 'Advanced Installation', status: 'locked', progress: 0 },
    { id: 6, title: 'Troubleshooting', status: 'locked', progress: 0 },
    { id: 7, title: 'Final Certification', status: 'locked', progress: 0 },
  ];

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200" />
      <div 
        className="absolute left-6 top-8 w-0.5 bg-blue-600 transition-all duration-500"
        style={{ height: '42%' }}
       />

      <div className="space-y-6">
        {pathSteps.map((step, index) => (
          <div key={step.id} className="relative flex items-start gap-4">
            {/* Step Indicator */}
            <div className={`
              relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
              ${step.status === 'completed' ? 'bg-green-600 text-white' : ''}
              ${step.status === 'in-progress' ? 'bg-blue-600 text-white' : ''}
              ${step.status === 'locked' ? 'bg-slate-200 text-slate-400' : ''}
            `}>
              {step.status === 'completed' ? '✓' : step.id}
            </div>

            {/* Step Content */}
            <div className="flex-1 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-semibold ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-900'}`}>
                  {step.title}
                </h4>
                {step.status !== 'locked' && (
                  <span className={`text-sm font-medium ${
                    step.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {step.progress}%
                  </span>
                )}
              </div>
              
              {step.status !== 'locked' && (
                <div className="bg-slate-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      step.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${step.progress}%` }}
                   />
                </div>
              )}

              {step.status === 'in-progress' && (
                <Link
                  href={`/courses/${step.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Learning →
                </Link>
              )}

              {step.status === 'locked' && (
                <p className="text-sm text-slate-500">Complete previous courses to unlock</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationItem({
  type,
  title,
  message,
  time,
  unread,
}: {
  type: 'assignment' | 'grade' | 'comment' | 'reminder';
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}) {
  const getIcon = () => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'grade':
        return <Award className="h-5 w-5 text-green-600" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-purple-600" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-orange-600" />;
    }
  };

  return (
    <div className={`p-4 border-b hover:bg-slate-50 cursor-pointer ${unread ? 'bg-blue-50' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
            {unread && <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />}
          </div>
          <p className="text-sm text-slate-600 mt-0.5">{message}</p>
          <p className="text-xs text-slate-500 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

function CustomizeToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
}

function CourseCard({
  title,
  progress,
  nextLesson,
  href,
}: {
  title: string;
  progress: number;
  nextLesson: string;
  href: string;
}) {
  return (
    <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-600 mt-1">Next: {nextLesson}</p>
        </div>
        <span className="text-sm font-medium text-blue-600">{progress}%</span>
      </div>
      <div className="bg-slate-200 rounded-full h-2 mb-3">
        <div
          className="bg-blue-600 rounded-full h-2"
          style={{ width: `${progress}%` }}
         />
      </div>
      <Link
        href={href}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Continue Learning →
      </Link>
    </div>
  );
}

function DeadlineItem({
  title,
  course,
  dueDate,
  dueTime,
  urgent,
}: {
  title: string;
  course: string;
  dueDate: string;
  dueTime: string;
  urgent?: boolean;
}) {
  return (
    <div className={`border-l-4 ${urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'} rounded-r-lg p-3`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
          <p className="text-xs text-slate-600 mt-0.5">{course}</p>
        </div>
        <FileText className={`h-4 w-4 flex-shrink-0 ${urgent ? 'text-red-600' : 'text-blue-600'}`} />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Clock className={`h-3 w-3 ${urgent ? 'text-red-600' : 'text-slate-500'}`} />
        <p className={`text-xs ${urgent ? 'text-red-700 font-medium' : 'text-slate-600'}`}>
          {dueDate} at {dueTime}
        </p>
      </div>
    </div>
  );
}

function AchievementItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
    green: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${colorClasses[color]}`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}

function ActivityItem({
  type,
  title,
  course,
  time,
  score,
}: {
  type: 'completed' | 'submitted' | 'comment' | 'enrolled';
  title: string;
  course: string;
  time: string;
  score?: number;
}) {
  const getIcon = () => {
    switch (type) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'submitted':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-purple-600" />;
      case 'enrolled':
        return <UserPlus className="h-5 w-5 text-orange-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'completed':
        return 'bg-green-50';
      case 'submitted':
        return 'bg-blue-50';
      case 'comment':
        return 'bg-purple-50';
      case 'enrolled':
        return 'bg-orange-50';
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${getBgColor()}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600 mt-0.5">{course}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-slate-500">{time}</p>
          {score && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-green-600">Score: {score}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CalendarWidget() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Sample events
  const events = [
    { day: currentDay + 1, type: 'class' },
    { day: currentDay + 2, type: 'assignment' },
    { day: currentDay + 5, type: 'class' },
  ];

  const hasEvent = (day: number | null) => {
    if (!day) return null;
    return events.find(e => e.day === day);
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h4 className="font-semibold text-slate-900">
          {monthNames[currentMonth]} {currentYear}
        </h4>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-slate-600 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const event = hasEvent(day);
          const isToday = day === currentDay;
          
          return (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg
                ${!day ? '' : 'hover:bg-slate-100 cursor-pointer'}
                ${isToday ? 'bg-blue-600 text-white font-bold hover:bg-blue-700' : ''}
                ${event && !isToday ? 'bg-blue-50 text-blue-700 font-medium' : ''}
                ${!event && !isToday && day ? 'text-slate-700' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-600" />
          <span className="text-slate-600">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-50 border border-blue-200" />
          <span className="text-slate-600">Has events</span>
        </div>
      </div>
    </div>
  );
}
