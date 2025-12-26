export const metadata = {
  title: 'Staff Training | Elevate for Humanity',
};

export default function StaffTrainingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Staff Training Portal</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Onboarding</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Complete orientation video</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Review policies and procedures</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>System access setup</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Shadow experienced staff</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Ongoing Training</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Monthly compliance training</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Customer service skills</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Software updates training</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>Emergency procedures</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
