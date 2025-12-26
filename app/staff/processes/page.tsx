export const metadata = {
  title: 'Process Documentation | Staff Portal',
};

export default function ProcessesPage() {
  const processes = [
    { name: 'Student Enrollment', steps: 8, time: '15 min' },
    { name: 'WIOA Eligibility Check', steps: 5, time: '10 min' },
    { name: 'Program Assignment', steps: 6, time: '20 min' },
    { name: 'Barrier Support Request', steps: 4, time: '5 min' },
    { name: 'Job Placement Assistance', steps: 10, time: '30 min' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Process Documentation</h1>
        
        <div className="grid gap-4">
          {processes.map(process => (
            <div key={process.name} className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{process.name}</h3>
                <p className="text-gray-600">{process.steps} steps • {process.time} average</p>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View Process
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
