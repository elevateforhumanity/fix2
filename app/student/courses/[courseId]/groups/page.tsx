'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, MessageCircle, Calendar, Award, UserPlus, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function CourseGroupsPage() {
  const [activeTab, setActiveTab] = useState<'my-group' | 'all-groups'>('my-group');

  const myGroup = {
    id: 1,
    name: 'Team Alpha',
    cohort: 'Fall 2024 - Evening',
    members: [
      { id: 1, name: 'John Doe', role: 'leader', avatar: '👨', progress: 75 },
      { id: 2, name: 'Jane Smith', role: 'member', avatar: '👩', progress: 82 },
      { id: 3, name: 'Mike Johnson', role: 'member', avatar: '👨', progress: 68 },
      { id: 4, name: 'Sarah Williams', role: 'member', avatar: '👩', progress: 90 },
    ],
    activities: [
      { id: 1, type: 'discussion', title: 'Group Discussion: Ductwork Design', date: 'Today, 2:00 PM' },
      { id: 2, type: 'assignment', title: 'Team Project: System Installation', date: 'Dec 28, 5:00 PM' },
      { id: 3, type: 'meeting', title: 'Study Session', date: 'Dec 25, 6:00 PM' },
    ],
    stats: {
      avgProgress: 79,
      completedProjects: 3,
      activeDiscussions: 5,
    },
  };

  const allGroups = [
    { id: 1, name: 'Team Alpha', cohort: 'Fall 2024 - Evening', members: 4, avgProgress: 79 },
    { id: 2, name: 'Team Beta', cohort: 'Fall 2024 - Evening', members: 5, avgProgress: 85 },
    { id: 3, name: 'Team Gamma', cohort: 'Fall 2024 - Morning', members: 4, avgProgress: 72 },
    { id: 4, name: 'Team Delta', cohort: 'Fall 2024 - Morning', members: 6, avgProgress: 88 },
  ];

  const cohorts = [
    { id: 1, name: 'Fall 2024 - Evening', students: 24, groups: 6, startDate: 'Sep 1, 2024' },
    { id: 2, name: 'Fall 2024 - Morning', students: 30, groups: 7, startDate: 'Sep 1, 2024' },
    { id: 3, name: 'Summer 2024', students: 18, groups: 5, startDate: 'Jun 1, 2024' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/student/courses/hvac-systems" className="text-sm text-brandPrimary hover:text-brandPrimary mb-2 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Groups & Cohorts</h1>
          <p className="text-gray-600 mt-2">HVAC Systems Installation</p>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('my-group')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'my-group'
                  ? 'bg-brandPrimary text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              My Group
            </button>
            <button
              onClick={() => setActiveTab('all-groups')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all-groups'
                  ? 'bg-brandPrimary text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Groups
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'my-group' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Group Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{myGroup.name}</h2>
                      <p className="text-slate-600 mt-1">{myGroup.cohort}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 rounded-lg hover:border-brandPrimary transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                  </div>

                  {/* Group Stats */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-brandPrimary font-medium">Avg Progress</p>
                      <p className="text-2xl font-bold text-brandPrimary mt-1">{myGroup.stats.avgProgress}%</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-medium">Completed Projects</p>
                      <p className="text-2xl font-bold text-green-700 mt-1">{myGroup.stats.completedProjects}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-purple-600 font-medium">Active Discussions</p>
                      <p className="text-2xl font-bold text-purple-700 mt-1">{myGroup.stats.activeDiscussions}</p>
                    </div>
                  </div>

                  {/* Members */}
                  <h3 className="font-semibold mb-4">Group Members</h3>
                  <div className="space-y-3">
                    {myGroup.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{member.avatar}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-slate-900">{member.name}</h4>
                              {member.role === 'leader' && (
                                <span className="px-2 py-0.5 bg-blue-100 text-brandPrimary text-xs font-medium rounded">
                                  Leader
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600">Progress: {member.progress}%</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <MessageCircle className="h-5 w-5 text-slate-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Group Activities */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Upcoming Activities</h3>
                  <div className="space-y-3">
                    {myGroup.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                        <Calendar className="h-5 w-5 text-brandPrimary mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{activity.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{activity.date}</p>
                        </div>
                        <button className="text-sm text-brandPrimary hover:text-brandPrimary font-medium">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      Group Chat
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-brandPrimary transition-colors">
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-brandPrimary transition-colors">
                      <UserPlus className="h-4 w-4" />
                      Invite Member
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Cohort Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Your Cohort</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-600">Cohort Name</p>
                      <p className="font-medium text-slate-900">{myGroup.cohort}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Total Students</p>
                      <p className="font-medium text-slate-900">24</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Total Groups</p>
                      <p className="font-medium text-slate-900">6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Group Leaderboard</h3>
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    {allGroups.slice(0, 3).map((group, index) => (
                      <div key={group.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${index === 0 ? 'text-yellow-600' : 'text-slate-600'}`}>
                            #{index + 1}
                          </span>
                          <span className="text-slate-900">{group.name}</span>
                        </div>
                        <span className="font-medium text-brandPrimary">{group.avgProgress}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* All Groups */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">All Course Groups</h2>
                  <div className="space-y-4">
                    {allGroups.map((group) => (
                      <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 rounded-full p-3">
                            <Users className="h-6 w-6 text-brandPrimary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{group.name}</h3>
                            <p className="text-sm text-slate-600">{group.cohort}</p>
                            <p className="text-xs text-slate-500 mt-1">{group.members} members</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-brandPrimary">{group.avgProgress}%</p>
                          <p className="text-xs text-slate-600">Avg Progress</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cohorts Sidebar */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">All Cohorts</h3>
                  <div className="space-y-4">
                    {cohorts.map((cohort) => (
                      <div key={cohort.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">{cohort.name}</h4>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p>{cohort.students} students</p>
                          <p>{cohort.groups} groups</p>
                          <p className="text-xs text-slate-500 mt-2">Started: {cohort.startDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
