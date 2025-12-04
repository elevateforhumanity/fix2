import Link from 'next/link';
import Image from 'next/image';

interface ProgramHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  duration?: string;
  cost?: string;
  placement?: string;
  salary?: string;
}

export default function ProgramHero({
  title,
  description,
  imageSrc,
  imageAlt,
  duration = '4-12 Weeks',
  cost = '$0',
  placement = '85%+',
  salary = '$35K+',
}: ProgramHeroProps) {
  return (
    <>
      {/* Simple Hero - Not Stretched */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl mb-8">{description}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Apply Now - Free Training
              </Link>
              <Link 
                href="/contact" 
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition border-2 border-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Image & Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Quick Facts */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{duration}</div>
                <div className="text-gray-600">Program Duration</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{cost}</div>
                <div className="text-gray-600">100% Funded</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{placement}</div>
                <div className="text-gray-600">Job Placement</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{salary}</div>
                <div className="text-gray-600">Starting Salary</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
