// Enhanced Analytics Dashboard
import { BarChart3, TrendingUp, Clock, Target, Award } from 'lucide-react';

export const metadata = {
  title: 'Learning Analytics | Elevate LMS',
  description: 'Track your learning progress with detailed analytics and insights',
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Analytics</h1>
          <p className="text-slate-600">Track your progress and identify areas for improvement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+12%</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">78%</div>
            <div className="text-sm text-slate-600">Overall Progress</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+2.5h</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">24.5h</div>
            <div className="text-sm text-slate-600">Learning Time (This Week)</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">On track</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">12/15</div>
            <div className="text-sm text-slate-600">Lessons Completed</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-blue-600 text-sm font-semibold">+3 new</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">18</div>
            <div className="text-sm text-slate-600">Achievements Earned</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Progress Over Time</h2>
              <div className="space-y-4">
                {[
                  { day: 'Mon', hours: 3.5, percent: 70 },
                  { day: 'Tue', hours: 4.2, percent: 84 },
                  { day: 'Wed', hours: 2.8, percent: 56 },
                  { day: 'Thu', hours: 5.1, percent: 100 },
                  { day: 'Fri', hours: 3.9, percent: 78 },
                ].map((data) => (
                  <div key={data.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-slate-600">{data.day}</div>
                    <div className="flex-1">
                      <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-end px-3"
                          style={{ width: `${data.percent}%` }}
                        >
                          <span className="text-white text-xs font-semibold">{data.hours}h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-bold mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Lessons Completed</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Hours Studied</span>
                  <span className="font-bold">42.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
