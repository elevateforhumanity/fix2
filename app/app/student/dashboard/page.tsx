// app/app/student/dashboard/page.tsx
import { getCurrentProfile } from '@/lib/getCurrentProfile';

export default async function StudentDashboard() {
  const profile = await getCurrentProfile();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}
      </h1>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Active Courses</p>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Completed</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Certificates</p>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 bg-slate-50 p-4 rounded">
            <h3 className="font-semibold mb-1">Barber Apprenticeship - Module 3</h3>
            <p className="text-sm text-slate-600 mb-2">Advanced cutting techniques</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">65% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
