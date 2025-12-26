export const metadata = {
  title: 'Customer Service Protocols | Staff Portal',
};

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Customer Service Protocols</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600">DO</h2>
            <ul className="space-y-2">
              <li>✓ Respond within 1 hour during business hours</li>
              <li>✓ Use student's preferred name</li>
              <li>✓ Explain processes clearly</li>
              <li>✓ Follow up on promises</li>
              <li>✓ Document all interactions</li>
              <li>✓ Escalate when needed</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-600">DON'T</h2>
            <ul className="space-y-2">
              <li>✗ Make promises you can't keep</li>
              <li>✗ Share confidential information</li>
              <li>✗ Argue with students</li>
              <li>✗ Ignore complaints</li>
              <li>✗ Use jargon or acronyms</li>
              <li>✗ Rush conversations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
