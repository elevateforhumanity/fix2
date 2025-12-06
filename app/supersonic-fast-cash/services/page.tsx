export default function ServicesPage() {
  const services = [
    {
      title: "Personal Loans",
      amount: "$500 - $5,000",
      description: "Quick personal loans for any purpose. Flexible terms and competitive rates.",
      features: ["Fast approval", "Flexible repayment", "No collateral required"]
    },
    {
      title: "Emergency Cash",
      amount: "$100 - $1,000",
      description: "Immediate funds for unexpected expenses. Same-day approval available.",
      features: ["24-hour funding", "Minimal requirements", "Easy application"]
    },
    {
      title: "Payday Advance",
      amount: "$100 - $500",
      description: "Bridge the gap until your next paycheck. Short-term solution for immediate needs.",
      features: ["Quick turnaround", "Simple process", "Direct deposit"]
    },
    {
      title: "Installment Loans",
      amount: "$1,000 - $10,000",
      description: "Larger loans with fixed monthly payments. Predictable and manageable.",
      features: ["Fixed rates", "Longer terms", "Build credit"]
    },
    {
      title: "Line of Credit",
      amount: "Up to $5,000",
      description: "Revolving credit line for ongoing needs. Borrow what you need, when you need it.",
      features: ["Reusable credit", "Pay interest only on what you use", "Instant access"]
    },
    {
      title: "Business Cash Advance",
      amount: "$5,000 - $50,000",
      description: "Fast funding for business needs. No collateral, based on revenue.",
      features: ["Quick approval", "Flexible repayment", "No personal guarantee"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-green-900">
          Our Services
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Flexible financial solutions tailored to your needs
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-2 text-green-800">{service.title}</h2>
              <p className="text-xl font-semibold text-green-600 mb-4">{service.amount}</p>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">Key Features:</p>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-green-100 p-8 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-green-800">Compare Our Services</h2>
          <p className="text-gray-700 mb-6">
            Not sure which service is right for you? Our team can help you choose the best option 
            based on your specific needs and financial situation.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
              Contact Us
            </button>
            <button className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
              View Rates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
