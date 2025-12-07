import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Platform Demos | Elevate For Humanity',
  description: 'Explore interactive demos of our workforce training platform, LMS, and student portal.',
};

const demos = [
  {
    title: 'Student Portal Demo',
    description: 'Experience the student dashboard, course enrollment, and progress tracking.',
    image: '/images/general/homepage-hero.jpg',
    href: '/demo/student',
    features: ['Course catalog', 'Progress tracking', 'Certificates', 'Assignments'],
    color: 'blue'
  },
  {
    title: 'Admin Dashboard Demo',
    description: 'See how administrators manage programs, track outcomes, and generate reports.',
    image: '/images/programs/efh-cna-hero.jpg',
    href: '/demo/admin',
    features: ['User management', 'Analytics', 'Reporting', 'Compliance tracking'],
    color: 'green'
  },
  {
    title: 'Grant Management Demo',
    description: 'Explore WIOA, WRG, and JRI grant tracking and compliance features.',
    image: '/images/programs/hvac-hero.jpg',
    href: '/demo/grants',
    features: ['WIOA tracking', 'Outcome reporting', 'Funding allocation', 'Compliance'],
    color: 'orange'
  },
  {
    title: 'VITA Tax Prep Demo',
    description: 'See our specialized VITA tax preparation training and certification system.',
    image: '/images/programs/barber-hero.jpg',
    href: '/demo/vita',
    features: ['IRS certification', 'Practice returns', 'Quality review', 'Site management'],
    color: 'purple'
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[500px] w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold mb-6">
              Interactive Demos
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Experience Our Platform
            </h1>
            <p className="text-2xl text-blue-100 leading-relaxed mb-8">
              Explore interactive demos of our workforce training ecosystem
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#demos" className="bg-white text-blue-600 px-8 py-4 rounded-md font-semibold hover:bg-blue-50 text-lg transition-all">
                View Demos
              </Link>
              <Link href="/apply" className="bg-orange-500 text-white px-8 py-4 rounded-md font-semibold hover:bg-orange-600 text-lg transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Cards */}
      <section id="demos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Explore Our Platform</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our workforce training ecosystem works for students, administrators, and partners
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {demos.map((demo) => (
                <Link 
                  key={demo.href}
                  href={demo.href}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={demo.image}
                      alt={demo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-${demo.color}-900/80 to-transparent`} />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{demo.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{demo.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {demo.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      Start Demo
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands who have transformed their careers through our programs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-blue-600 px-8 py-4 rounded-md font-semibold hover:bg-blue-50 text-lg transition-all">
                Apply Now
              </Link>
              <Link href="/programs" className="bg-blue-700 text-white px-8 py-4 rounded-md font-semibold hover:bg-blue-800 border-2 border-white text-lg transition-all">
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}