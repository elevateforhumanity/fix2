export const metadata = {
  title: 'QA Checklist | Staff Portal',
};

export default function QAChecklistPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Quality Assurance Checklist</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Daily Checklist</h2>
          
          <div className="space-y-4">
            {[
              'Review new student applications',
              'Verify eligibility documentation',
              'Check program capacity',
              'Update student records',
              'Respond to inquiries within 24 hours',
              'Review barrier support requests',
              'Update job placement tracker',
              'Check for system errors',
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-lg">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
