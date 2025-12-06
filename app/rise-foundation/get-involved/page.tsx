export default function RISEGetInvolvedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">
          Get Involved
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Join us in making a difference in communities around the world
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Volunteer</h2>
            <p className="text-gray-700 mb-6">
              Share your skills and time to help empower communities. We have opportunities 
              for both in-person and remote volunteers.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Teach classes and workshops</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Mentor students and entrepreneurs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Support program operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Contribute technical expertise</span>
              </li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full">
              Apply to Volunteer
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Donate</h2>
            <p className="text-gray-700 mb-6">
              Your financial support helps us expand our programs and reach more communities 
              in need of educational opportunities.
            </p>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-bold text-gray-900">$50</p>
                <p className="text-sm text-gray-600">Provides learning materials for one student</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-bold text-gray-900">$250</p>
                <p className="text-sm text-gray-600">Funds a month of digital literacy training</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-bold text-gray-900">$1,000</p>
                <p className="text-sm text-gray-600">Establishes a community technology center</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full">
              Make a Donation
            </button>
          </div>
        </div>

        <div className="bg-blue-100 p-8 rounded-lg max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Partner With Us</h2>
          <p className="text-gray-700 mb-6">
            We collaborate with organizations, businesses, and institutions to amplify our impact. 
            Partnership opportunities include:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Corporate Partnerships</h3>
              <p className="text-gray-600">Employee engagement programs and CSR initiatives</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Educational Institutions</h3>
              <p className="text-gray-600">Curriculum development and student exchanges</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Community Organizations</h3>
              <p className="text-gray-600">Joint programs and resource sharing</p>
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Explore Partnerships
          </button>
        </div>
      </div>
    </div>
  );
}
