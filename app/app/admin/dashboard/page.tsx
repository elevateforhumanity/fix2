// app/app/admin/dashboard/page.tsx
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400 mb-1">Total Users</p>
          <p className="text-3xl font-bold">1,247</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400 mb-1">Active Programs</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400 mb-1">Grant Applications</p>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400 mb-1">VITA Cases</p>
          <p className="text-3xl font-bold">156</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-700">
            <div>
              <p className="font-medium">Elevate For Humanity</p>
              <p className="text-sm text-slate-400">Main workforce training platform</p>
            </div>
            <span className="px-3 py-1 bg-green-900 text-green-200 text-xs rounded-full">Active</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-700">
            <div>
              <p className="font-medium">Curvature Body Sculpting</p>
              <p className="text-sm text-slate-400">Beauty & wellness training</p>
            </div>
            <span className="px-3 py-1 bg-green-900 text-green-200 text-xs rounded-full">Active</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-700">
            <div>
              <p className="font-medium">Selfish Inc</p>
              <p className="text-sm text-slate-400">Nonprofit workforce development</p>
            </div>
            <span className="px-3 py-1 bg-green-900 text-green-200 text-xs rounded-full">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
