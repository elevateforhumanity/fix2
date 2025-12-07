import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'CNA Training Program | Elevate For Humanity',
};

export default function CNAProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner - Clean, No Overlay */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2400&h=1350&fit=crop&q=95"
          alt="CNA Training Program"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Hero Content - Below Image */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">
            Start Your Healthcare Career
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Become a CNA
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Start your healthcare career in just 4-6 weeks. State-certified training with clinical placement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/apply" className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Do</h2>
          <p className="text-lg text-slate-700 mb-6">
            CNAs are the heart of healthcare. You'll help patients with daily activities, take vital signs, 
            and provide comfort when people need it most. It's hard work, but it's meaningful work that 
            makes a real difference every single day.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">4-6</div>
              <div className="text-sm text-slate-600">Weeks to complete</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">You pay nothing</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">Day 1</div>
              <div className="text-sm text-slate-600">Start working after certification</div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Patient Care</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Helping patients with daily activities</li>
                <li>• Taking vital signs (blood pressure, temperature)</li>
                <li>• Keeping patients comfortable and safe</li>
                <li>• Recognizing when something's wrong</li>
                <li>• Communicating with nurses and doctors</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Professional Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Infection control and safety</li>
                <li>• Medical terminology you'll actually use</li>
                <li>• Working with different types of patients</li>
                <li>• Documentation and record keeping</li>
                <li>• Being part of a healthcare team</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Training Details */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How Training Works</h2>
          <p className="text-lg text-slate-700 mb-4">
            You'll spend time in the classroom learning the basics, then get hands-on experience 
            in real healthcare facilities. By the time you take your state certification exam, 
            you'll have already worked with real patients under supervision.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Classroom</h3>
              <p className="text-slate-700">Learn the fundamentals, practice skills, and prepare for real-world situations.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Clinical</h3>
              <p className="text-slate-700">Work in hospitals or nursing homes with experienced CNAs guiding you.</p>
            </div>
          </div>
        </section>

        {/* It's Really Free */}
        <section className="mb-16 bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Yes, It's Really Free</h2>
          <p className="text-lg text-slate-700 mb-4">
            Healthcare needs CNAs, and the government will pay for your training. We'll help you 
            apply for funding through:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - for anyone looking to start a healthcare career</li>
            <li>• <strong>Workforce Ready Grant</strong> - Indiana residents</li>
            <li>• <strong>Other state programs</strong> - we'll help you find what you qualify for</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Don't worry about the paperwork—we'll walk you through it step by step.
          </p>
        </section>

        {/* Where You'll Work */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Where You'll Work</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your First Year</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$30,000 - $35,000</p>
                <p className="text-sm text-slate-600">Plus benefits at most facilities</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Places That Hire CNAs</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Hospitals</li>
                  <li>• Nursing homes</li>
                  <li>• Assisted living facilities</li>
                  <li>• Home healthcare</li>
                  <li>• Rehabilitation centers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Start */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-700 mb-6">
            No healthcare experience needed. Just bring yourself and we'll teach you everything else.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-md font-semibold hover:bg-blue-700 transition-all text-lg"
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
