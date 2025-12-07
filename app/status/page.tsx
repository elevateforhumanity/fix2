export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">EFH Platform Status</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">✅ Core Features</h2>
          <ul className="space-y-2">
            <li>✅ Admin Dashboard - <a href="/admin" className="text-blue-600 hover:underline">/admin</a></li>
            <li>✅ Dev Studio - <a href="/admin/dev-studio" className="text-blue-600 hover:underline">/admin/dev-studio</a></li>
            <li>✅ Course Studio - <a href="/admin/course-studio" className="text-blue-600 hover:underline">/admin/course-studio</a></li>
            <li>✅ Autopilot - <a href="/admin/autopilot" className="text-blue-600 hover:underline">/admin/autopilot</a></li>
            <li>✅ Media Studio - <a href="/admin/media" className="text-blue-600 hover:underline">/admin/media</a></li>
            <li>✅ Store Builder - <a href="/admin/store" className="text-blue-600 hover:underline">/admin/store</a></li>
            <li>✅ Code Editor - <a href="/admin/editor" className="text-blue-600 hover:underline">/admin/editor</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">✅ Student Features</h2>
          <ul className="space-y-2">
            <li>✅ LMS Dashboard - <a href="/lms/dashboard" className="text-blue-600 hover:underline">/lms/dashboard</a></li>
            <li>✅ Courses - <a href="/lms/courses" className="text-blue-600 hover:underline">/lms/courses</a></li>
            <li>✅ Student Portal - <a href="/student/dashboard" className="text-blue-600 hover:underline">/student/dashboard</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">✅ Store & Licensing</h2>
          <ul className="space-y-2">
            <li>✅ Customer Portal - <a href="/portal/customer" className="text-blue-600 hover:underline">/portal/customer</a></li>
            <li>✅ Store Demo - <a href="/store/demo" className="text-blue-600 hover:underline">/store/demo</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">✅ API Endpoints</h2>
          <ul className="space-y-2 text-sm">
            <li>✅ /api/courses/index</li>
            <li>✅ /api/autopilot/run</li>
            <li>✅ /api/store/checkout</li>
            <li>✅ /api/store/license/validate</li>
            <li>✅ /api/github/repos</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Build Info</h2>
          <ul className="space-y-2 text-sm">
            <li>Build: Production</li>
            <li>Next.js: 16.0.7</li>
            <li>Node: {process.version}</li>
            <li>Deployment: Vercel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
