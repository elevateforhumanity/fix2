import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, BookOpen, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Program Holder Dashboard | Elevate For Humanity',
  description: 'Manage your apprentices, track progress, and oversee training programs.',
};

export default async function ProgramHolderDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch apprentices/students under this program holder
  const { data: apprentices } = await supabase
    .from('enrollments')
    .select(`
      *,
      profiles (id, full_name, email),
      programs (id, title, name, training_hours)
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  // Calculate stats
  const totalApprentices = apprentices?.length || 0;
  const activeApprentices = apprentices?.filter(e => e.status === 'active').length || 0;
  const completedApprentices = apprentices?.filter(e => e.status === 'completed').length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Program Holder Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Welcome back, {profile?.full_name || 'Program Holder'}!</p>
            </div>
            <Link
              href="/program-holder/apprentices/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Apprentice
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{totalApprentices}</p>
                <p className="text-sm text-slate-600">Total Apprentices</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{activeApprentices}</p>
                <p className="text-sm text-slate-600">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{completedApprentices}</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Apprentices List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Recent Apprentices</h2>
                <Link href="/program-holder/apprentices" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              {apprentices && apprentices.length > 0 ? (
                <div className="space-y-4">
                  {apprentices.slice(0, 5).map((apprentice: any) => (
                    <div key={apprentice.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{apprentice.profiles?.full_name || 'Unknown'}</h3>
                          <p className="text-sm text-slate-600">{apprentice.programs?.title || apprentice.programs?.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{apprentice.programs?.training_hours} hours</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            apprentice.status === 'active' ? 'bg-green-100 text-green-700' :
                            apprentice.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {apprentice.status}
                          </span>
                          <p className="text-xs text-slate-500 mt-2">
                            Started {new Date(apprentice.started_at || apprentice.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-600 mb-4">No apprentices yet</p>
                  <Link href="/program-holder/apprentices/new" className="text-blue-600 hover:text-blue-700 font-medium">
                    Add Your First Apprentice
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/program-holder/apprentices" className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                  <p className="font-medium text-slate-900">Manage Apprentices</p>
                  <p className="text-xs text-slate-600">View and manage all apprentices</p>
                </Link>
                <Link href="/program-holder/programs" className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                  <p className="font-medium text-slate-900">View Programs</p>
                  <p className="text-xs text-slate-600">Browse available programs</p>
                </Link>
                <Link href="/program-holder/settings" className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                  <p className="font-medium text-slate-900">Settings</p>
                  <p className="text-xs text-slate-600">Update your profile</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
                    <span>No cost to you - completely free</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible scheduling options</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career support from start to finish</span>
                  </li>
                  
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Funded</h3>
                <p className="text-gray-600">All programs completely free through government funding</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Placement</h3>
                <p className="text-gray-600">We help you find employment after training</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from industry professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}