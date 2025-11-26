// Parent Portal for K-12 Schools
import Link from 'next/link';
import { Users, BookOpen, Calendar, MessageSquare, TrendingUp, Award, Bell, FileText } from 'lucide-react';

export const metadata = {
  title: 'Parent Portal | Elevate For Humanity',
  description: 'Monitor your child\'s progress and stay connected with their education',
};

export default function ParentPortalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-orange-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Parent Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Stay Connected to Your Child's Education
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Monitor progress, communicate with teachers, and support your child's learning journey
            </p>
            <Link href="/parent-portal/login" className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition">
              Access Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Portal Features</h2>
            <p className="text-lg text-slate-600">Everything you need to support your child's success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-brandPrimary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Real-Time Progress</h3>
              <p className="text-slate-600">
                View grades, assignments, and attendance in real-time
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Teacher Communication</h3>
              <p className="text-slate-600">
                Message teachers directly and schedule parent-teacher conferences
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">School Calendar</h3>
              <p className="text-slate-600">
                Stay updated on events, holidays, and important dates
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Course Materials</h3>
              <p className="text-slate-600">
                Access syllabi, homework assignments, and learning resources
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Notifications</h3>
              <p className="text-slate-600">
                Get alerts for grades, attendance, and school announcements
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Achievement Tracking</h3>
              <p className="text-slate-600">
                Celebrate milestones and track academic achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Dashboard at a Glance</h2>
            <p className="text-lg text-slate-600">See everything important in one place</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Student Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Overall GPA</div>
                    <div className="text-sm text-slate-600">Current semester</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">3.8</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Attendance</div>
                    <div className="text-sm text-slate-600">This month</div>
                  </div>
                  <div className="text-2xl font-bold text-brandPrimary">95%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Assignments</div>
                    <div className="text-sm text-slate-600">Completed on time</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">18/20</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { type: 'grade', subject: 'Math Quiz', grade: 'A', time: '2 hours ago' },
                  { type: 'assignment', subject: 'Science Project', grade: 'Submitted', time: '1 day ago' },
                  { type: 'message', subject: 'Teacher Message', grade: 'New', time: '2 days ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brandPrimary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{item.subject}</div>
                      <div className="text-sm text-slate-600">{item.time}</div>
                    </div>
                    <div className="font-bold text-green-600">{item.grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-orange-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Connected On the Go</h2>
              <p className="text-xl text-purple-100 mb-8">
                Download our mobile app for iOS and Android to access the parent portal anywhere
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition">
                  📱 Download for iOS
                </button>
                <button className="px-8 py-4 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-400 transition border-2 border-white">
                  🤖 Download for Android
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Access your parent portal account or contact your school for login credentials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/parent-portal/login" className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">
              Login to Portal
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
