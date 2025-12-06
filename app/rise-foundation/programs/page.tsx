export default function RISEProgramsPage() {
  const programs = [
    {
      title: "Education Access Initiative",
      description: "Providing scholarships and resources to students in underserved communities.",
      impact: "5,000+ students supported annually"
    },
    {
      title: "Skills Development Program",
      description: "Vocational training and professional development courses for career advancement.",
      impact: "3,000+ professionals trained"
    },
    {
      title: "Community Technology Centers",
      description: "Establishing computer labs and internet access in rural and urban communities.",
      impact: "50+ centers established"
    },
    {
      title: "Youth Leadership Academy",
      description: "Mentorship and leadership training for emerging community leaders.",
      impact: "1,000+ youth leaders developed"
    },
    {
      title: "Entrepreneurship Support",
      description: "Business training and microloans for aspiring entrepreneurs.",
      impact: "500+ businesses launched"
    },
    {
      title: "Digital Literacy Campaign",
      description: "Teaching essential digital skills to bridge the technology gap.",
      impact: "10,000+ people trained"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">
          Our Programs
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Transforming lives through education, skills development, and community empowerment
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-3 text-blue-800">{program.title}</h2>
              <p className="text-gray-700 mb-4">{program.description}</p>
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-blue-600">{program.impact}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white p-12 rounded-lg text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-lg mb-6">
            Contact us to discover how our programs can benefit your community or how you can get involved.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
