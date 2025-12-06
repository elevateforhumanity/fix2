export default function RISEAboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">
          About RISE Foundation
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The RISE Foundation is dedicated to empowering individuals and communities through 
              accessible education, innovative programs, and sustainable development initiatives. 
              We believe that everyone deserves the opportunity to rise above their circumstances 
              and achieve their full potential.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We envision a world where quality education and opportunity are accessible to all, 
              regardless of background or circumstance. Through our programs, we aim to create 
              lasting positive change in communities worldwide.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <strong className="text-gray-900">Empowerment:</strong>
                  <span className="text-gray-700"> We believe in giving people the tools and knowledge to transform their own lives.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <strong className="text-gray-900">Innovation:</strong>
                  <span className="text-gray-700"> We embrace new ideas and technologies to maximize our impact.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <strong className="text-gray-900">Sustainability:</strong>
                  <span className="text-gray-700"> We focus on creating long-term, sustainable solutions.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <strong className="text-gray-900">Community:</strong>
                  <span className="text-gray-700"> We work collaboratively with local communities and partners.</span>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-blue-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Our History</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2020, the RISE Foundation emerged from a vision to make quality education 
              and opportunity accessible to underserved communities. Since our inception, we've grown 
              from a small local initiative to a global organization impacting thousands of lives 
              across multiple continents.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
