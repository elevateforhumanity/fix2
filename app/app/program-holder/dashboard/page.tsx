// app/app/program-holder/dashboard/page.tsx
import { getCurrentProfile } from '@/lib/getCurrentProfile';

export default async function ProgramHolderDashboard() {
  const profile = await getCurrentProfile();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Program Holder Dashboard{profile?.full_name ? ` - ${profile.full_name}` : ''}
      </h1>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Active Learners</p>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Programs</p>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Completions</p>
          <p className="text-3xl font-bold">18</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">John Smith completed Module 5</p>
              <p className="text-sm text-slate-500">Barber Apprenticeship</p>
            </div>
            <span className="text-xs text-slate-400">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Sarah Johnson enrolled</p>
              <p className="text-sm text-slate-500">CNA Training</p>
            </div>
            <span className="text-xs text-slate-400">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
