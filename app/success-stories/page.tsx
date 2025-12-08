import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/success-stories",
  },
  title: 'Success Stories | Elevate For Humanity',
  description: 'Real stories from real graduates who transformed their lives through our workforce training programs.',
};

const successStories = [
  {
    name: "Marcus Johnson",
    program: "HVAC Technician",
    image: "/media/testimonials/student1.jpg",
    beforeJob: "Unemployed for 18 months",
    afterJob: "HVAC Technician at Carrier",
    salary: "$52,000/year",
    quote: "I was unemployed for over a year and didn't know where to turn. Elevate For Humanity not only trained me for free, but they helped me with housing and connected me directly to employers. Now I have a career I'm proud of and can support my family.",
    timeline: "Completed training in 10 weeks",
  },
  {
    name: "Jasmine Williams",
    program: "Medical Assistant",
    image: "/media/testimonials/student2.jpg",
    beforeJob: "Retail worker, $12/hour",
    afterJob: "Medical Assistant at IU Health",
    salary: "$42,000/year",
    quote: "I was stuck in retail making minimum wage with no path forward. The Medical Assistant program changed everything. The training was hands-on, the instructors were amazing, and I got hired before I even finished the program.",
    timeline: "Completed training in 8 weeks",
  },
  {
    name: "David Thompson",
    program: "CDL Driver",
    image: "/media/testimonials/student3.jpg",
    beforeJob: "Returning citizen, no job prospects",
    afterJob: "CDL Driver at Schneider National",
    salary: "$58,000/year",
    quote: "After being incarcerated, I thought no one would give me a chance. Elevate For Humanity saw my potential, not my past. They trained me, supported me, and connected me with an employer willing to hire me.",
    timeline: "Completed training in 6 weeks",
  },
];

export default function Page() {
  return (
    <main className="bg-white">
      <section className="relative h-[500px] w-full overflow-hidden bg-white">
        <Image
          src="/media/testimonials/student-testimonial-graduate-hd.jpg"
          alt="Success stories - graduates celebrating"
          fill
          className="object-cover brightness-110"
          priority
          quality={100}
          sizes="100vw"
        />
        
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight">
              Success Stories
            </h1>
            <p className="text-2xl md:text-3xl text-slate-700 leading-relaxed mb-8">
              Real people. Real transformations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-orange-500 text-white px-8 py-4 rounded-md font-semibold hover:bg-orange-600 text-lg transition-all">
                Start Your Story
              </Link>
              <Link href="/programs" className="bg-white text-slate-900 px-8 py-4 rounded-md font-semibold hover:bg-slate-50 border-2 border-slate-300 text-lg transition-all">
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-16">Graduate Success Stories</h2>
          <div className="space-y-16">
            {successStories.map((story, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={story.image} alt={story.name} fill
className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" quality={100} />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-bold mb-4">{story.program}</div>
                  <h3 className="text-3xl font-extrabold mb-4">{story.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-sm text-slate-500 mb-1">Before</div>
                      <div className="font-semibold text-slate-900">{story.beforeJob}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-700 mb-1">After</div>
                      <div className="font-semibold text-green-900">{story.afterJob}</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 mb-6 border-l-4 border-blue-600">
                    <Quote className="w-8 h-8 text-blue-600 mb-3" />
                    <p className="text-lg text-slate-700 italic leading-relaxed mb-4">"{story.quote}"</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-900">{story.timeline}</span>
                      <span className="text-green-700 font-bold">{story.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Success Stories | Elevate For Humanity</h1>
            <p className="text-xl mb-8 text-blue-100">Discover more about Success Stories inside the Elevate For Humanity workforce ecosystem.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 text-lg">
                Get Started
              </Link>
              <Link href="/programs" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg">
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Transform Your Future</h2>
                <p className="text-gray-700 mb-6">Join thousands who have launched successful careers through our programs.</p>
                <ul className="space-y-3">
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% government-funded training</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No cost to you - completely free</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible scheduling options</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career support from start to finish</span>
                  </li>
                  
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Funded</h3>
                <p className="text-gray-600">All programs completely free through government funding</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Placement</h3>
                <p className="text-gray-600">We help you find employment after training</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from industry-standard professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Start Your Success Story?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands who transformed their lives through free training.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="px-10 py-5 bg-white text-orange-600 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg">
              Apply Now - It's Free
            </Link>
            <Link href="/programs" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 border-2 border-white transition-all shadow-2xl text-lg">
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}