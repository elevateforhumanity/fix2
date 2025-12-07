import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'CDL Training Program | Elevate For Humanity',
  description: 'Get your Commercial Driver License. Free training. Start earning $50K+ your first year.',
};

export default function CDLProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[350px] w-full overflow-hidden">
        <Image
          src="/images/programs/cdl-hero.jpg"
          alt="CDL Training Program"
          fill
          className="object-cover brightness-105"
          priority
          quality={100}
        />
        
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-3">
              High-Demand Career
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Become a Truck Driver
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-6">
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-orange-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-700 transition-all">
                Start Your Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Trucking?</h2>
          <p className="text-lg text-slate-700 mb-6">
            America runs on trucks. Every store, every restaurant, every hospital needs what truck drivers deliver. 
            The pay is good, the demand is high, and you can start earning right after you get your license. 
            Plus, you get to see the country while you work.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">4-8</div>
              <div className="text-sm text-slate-600">Weeks to get your CDL</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">You pay nothing</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$50K+</div>
              <div className="text-sm text-slate-600">First year earnings</div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Driving Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Operating a commercial truck safely</li>
                <li>• Backing up, parking, and maneuvering</li>
                <li>• Highway driving and city navigation</li>
                <li>• Pre-trip inspections</li>
                <li>• Handling different weather and road conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Professional Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• DOT regulations and compliance</li>
                <li>• Hours of service and log books</li>
                <li>• Loading and securing cargo</li>
                <li>• Customer service and professionalism</li>
                <li>• Route planning and time management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Training Details */}
        <section className="mb-16 bg-orange-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How Training Works</h2>
          <p className="text-lg text-slate-700 mb-4">
            You'll start in the classroom learning the rules and regulations, then spend most of your time 
            behind the wheel with an experienced instructor. By the time you take your CDL test, you'll 
            have logged real hours driving a commercial truck.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Classroom</h3>
              <p className="text-slate-700">Learn DOT regulations, safety procedures, and what you need to pass the written test.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Behind the Wheel</h3>
              <p className="text-slate-700">Practice driving, backing, parking, and everything you'll do on the road.</p>
            </div>
          </div>
        </section>

        {/* It's Really Free */}
        <section className="mb-16 bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Yes, It's Really Free</h2>
          <p className="text-lg text-slate-700 mb-4">
            Trucking companies need drivers so badly that the government will pay for your training. 
            We'll help you get funding through:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - for anyone looking to start a trucking career</li>
            <li>• <strong>Workforce Ready Grant</strong> - Indiana residents</li>
            <li>• <strong>Company sponsorships</strong> - some companies will pay for your training if you work for them</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            We'll help you figure out which option works best for you.
          </p>
        </section>

        {/* Career Outlook */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Earn</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your First Year</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">$45,000 - $60,000</p>
                <p className="text-sm text-slate-600">Most new drivers start here, with room to grow</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Types of Trucking</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Local delivery (home every night)</li>
                  <li>• Regional routes (home on weekends)</li>
                  <li>• Long haul (see the country)</li>
                  <li>• Specialized freight (higher pay)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Start */}
        <section className="bg-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Hit the Road?</h2>
          <p className="text-lg text-slate-700 mb-6">
            No trucking experience needed. Just a valid driver's license and you're good to go.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-orange-600 text-white px-10 py-4 rounded-md font-semibold hover:bg-orange-700 transition-all text-lg"
          >
            Start Your Application
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Questions? Call us at (317) 123-4567 or stop by—we'd love to meet you.
          </p>
        </section>
      </div>
    </main>
  );
}
