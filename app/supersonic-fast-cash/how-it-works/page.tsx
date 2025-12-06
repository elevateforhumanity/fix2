export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Apply Online",
      description: "Fill out our simple online application in just 5 minutes. No paperwork, no hassle."
    },
    {
      number: "2",
      title: "Get Approved",
      description: "Receive instant approval decision. Our advanced system reviews your application in real-time."
    },
    {
      number: "3",
      title: "Receive Funds",
      description: "Money deposited directly to your bank account within 24 hours of approval."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-green-900">
          How It Works
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Get the cash you need in three simple steps
        </p>

        <div className="max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-12">
              <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6">
                {step.number}
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2 text-green-800">{step.title}</h2>
                <p className="text-lg text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">Basic Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>18 years or older</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Valid government-issued ID</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Active bank account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Steady source of income</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">What You'll Need</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Social Security Number</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Contact information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Employment details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Bank account information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-900 text-white p-12 rounded-lg text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Apply now and get your cash as soon as tomorrow!
          </p>
          <button className="bg-white text-green-900 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
