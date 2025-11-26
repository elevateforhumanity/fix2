// Social Learning Hub
import Link from 'next/link';
import { MessageSquare, Users, Trophy, TrendingUp, Heart, Share2, BookOpen, Award } from 'lucide-react';

export const metadata = {
  title: 'Social Learning | Elevate LMS',
  description: 'Connect with peers, join study groups, and collaborate on learning',
};

export default function SocialLearningPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Social Learning</h1>
          <p className="text-slate-600">Connect, collaborate, and learn together</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">2,847</div>
                <div className="text-sm text-slate-600">Active Learners</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <div className="text-sm text-slate-600">Study Groups</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">1,234</div>
                <div className="text-sm text-slate-600">Achievements</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">89%</div>
                <div className="text-sm text-slate-600">Engagement Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Groups */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Study Groups</h2>
                <Link href="/lms/social/groups/create" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Create Group
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'HVAC Certification Study Group', members: 24, activity: 'Active now' },
                  { name: 'Medical Assistant Exam Prep', members: 18, activity: '2 hours ago' },
                  { name: 'Barber License Practice', members: 31, activity: 'Active now' },
                ].map((group, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{group.name}</div>
                        <div className="text-sm text-slate-600">{group.members} members • {group.activity}</div>
                      </div>
                    </div>
                    <Link href={`/lms/social/groups/${i}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Join
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion Forums */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Discussions</h2>
              <div className="space-y-4">
                {[
                  { title: 'Tips for EPA 608 Certification Exam', replies: 12, likes: 24 },
                  { title: 'Best practices for patient communication', replies: 8, likes: 15 },
                  { title: 'Barber chair setup recommendations', replies: 6, likes: 10 },
                ].map((topic, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition">
                    <div className="font-semibold text-slate-900 mb-2">{topic.title}</div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {topic.replies} replies
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {topic.likes} likes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peer Learning */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Find Study Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Sarah M.', course: 'Medical Assistant', status: 'Looking for study partner' },
                  { name: 'James K.', course: 'HVAC Technician', status: 'Available for practice sessions' },
                ].map((user, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.course}</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">{user.status}</div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Top Learners
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Alex R.', points: 2450, badge: '🥇' },
                  { name: 'Maria G.', points: 2180, badge: '🥈' },
                  { name: 'David L.', points: 1950, badge: '🥉' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{user.badge}</span>
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.points} points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/lms/forums" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">Browse Forums</span>
                </Link>
                <Link href="/lms/collaborate" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-slate-900">Collaborate</span>
                </Link>
                <Link href="/lms/achievements" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-slate-900">View Achievements</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
