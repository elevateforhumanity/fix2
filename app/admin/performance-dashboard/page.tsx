export const metadata = {
  title: 'Performance Dashboard | Admin',
};

export default function PerformanceDashboardPage() {
  const metrics = [
    { label: 'Total Students', value: '1,247', change: '+12%' },
    { label: 'Active Programs', value: '23', change: '+2' },
    { label: 'Job Placements', value: '892', change: '+18%' },
    { label: 'Completion Rate', value: '87%', change: '+3%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Performance Dashboard</h1>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map(metric => (
            <div key={metric.label} className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="text-3xl font-bold mb-2">{metric.value}</div>
              <div className="text-sm text-green-600">{metric.change}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Program Performance</h2>
          <div className="space-y-4">
            {['HVAC', 'Barber', 'CNA', 'CDL', 'Business'].map(program => (
              <div key={program} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{program}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">156 students</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
