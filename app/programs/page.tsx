import Link from "next/link";
import Image from "next/image";
import { programs as programsData } from "@/app/data/programs";

export const metadata = {
  title: 'Our Programs | Elevate For Humanity',
  description: 'Career training programs. 100% free with government funding. Real credentials, real jobs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

// Map programs data to display format
const programs = programsData.map(p => ({
  name: p.name,
  slug: p.slug,
  duration: p.duration,
  cost: '$0',
  image: p.heroImage,
  description: p.shortDescription,
  credentials: p.credential,
}));

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner - No overlay, no text */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="/images/heroes/success-story-1.jpg"
          alt="Career Training Programs"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Your Past Doesn't Define Your Future</h2>
          
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Maria was working at Target for $14/hour. Single mom, two kids, barely making rent. She wanted more but didn't know where to start.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Then she found us. We told her about free training through WRG. No tuition. No debt. Just 21 days of focused learning. She became a Medical Assistant. Now she makes $42,000/year with benefits. Her kids have stability. Her life changed.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            James worked in a factory for 8 years until it closed. No warning. No severance. At 45, he thought his career was over. We trained him in HVAC repair—completely free through WIOA. 60 days later, he was hired at $55,000/year. "I've never been more financially secure," he says.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Keisha had a record. Nobody would hire her. We trained her as a Peer Recovery Coach. Now she works at a treatment center helping people like her. She makes $38,000/year and saves lives every day.
          </p>
          <p className="text-xl text-slate-700 font-semibold">
            These aren't special cases. This is what we do. We train people for real jobs. And most of our students pay nothing.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our 9 Programs</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">{program.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-700">
                      <strong>Duration:</strong> {program.duration}
                    </span>
                    <span className="text-green-600 font-bold">
                      FREE or {program.cost}
                    </span>
                  </div>
                  
                  <div className="text-xs text-slate-500 mb-4">
                    📜 {program.credentials}
                  </div>
                  
                  <div className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Free Training Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-slate-600">
                Tell us which program interests you. We'll check if you qualify for free funding.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Approved</h3>
              <p className="text-slate-600">
                We help you apply for WRG, WIOA, or other funding. Most students get approved within 1-2 weeks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Start Training</h3>
              <p className="text-slate-600">
                Begin your program. Graduate with credentials. Get connected to employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-xl mb-8">Contact us today. We'll help you find free training and a path to employment.</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all text-lg shadow-xl"
          >
            Contact Us
          </Link>
          <p className="mt-6 text-white/90">
            Call <a href="tel:3173143757" className="font-bold underline">317-314-3757</a>
          </p>
        </div>
      </section>
    </main>
  );
}
