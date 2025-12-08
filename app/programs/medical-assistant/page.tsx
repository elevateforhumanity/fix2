
import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/programs/medical-assistant",
  },
  title: 'Medical Assistant Training | Elevate For Humanity',
  description: 'Become a Medical Assistant. Free training. Work in doctors offices and clinics.',
};

export default function MedicalAssistantPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[250px] sm:h-[300px] md:h-[350px] w-full overflow-hidden">
        <Image
          src="/media/hero-slide-healthcare.jpg"
          alt="Medical Assistant Training"
          fill
          className="object-cover brightness-105"
          priority
          quality={100}
        />
        
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600 mb-3">
              Healthcare Career
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Medical Assistant
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-6">
              Be the person who keeps the doctor's office running. Free training. Great career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-700 transition-all">
                Start Your Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Medical Assistants Do</h2>
          <p className="text-lg text-slate-700 mb-6">
            Medical Assistants are the backbone of every doctor's office and clinic. You'll check in patients, 
            take vital signs, help with exams, handle paperwork, and keep everything organized. It's the perfect 
            job if you want to help people but don't want to go to nursing school.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">8-12</div>
              <div className="text-sm text-slate-600">Weeks to complete</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">You pay nothing</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">$35K+</div>
              <div className="text-sm text-slate-600">Starting salary</div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Clinical Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Taking vital signs and patient histories</li>
                <li>• Preparing patients for exams</li>
                <li>• Assisting doctors during procedures</li>
                <li>• Giving injections and medications</li>
                <li>• Basic lab work and specimen collection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Administrative Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Scheduling appointments</li>
                <li>• Managing medical records</li>
                <li>• Insurance and billing basics</li>
                <li>• Front desk operations</li>
                <li>• Medical office software</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Training Details */}
        <section className="mb-16 bg-purple-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How Training Works</h2>
          <p className="text-lg text-slate-700 mb-4">
            You'll learn both the clinical side (working with patients) and the administrative side 
            (running the office). Most of your training is hands-on, so by the time you graduate, 
            you'll be ready to walk into any medical office and start working.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Classroom & Lab</h3>
              <p className="text-slate-700">Practice clinical skills in our lab before working with real patients.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Externship</h3>
              <p className="text-slate-700">Work in a real medical office to get experience and make connections.</p>
            </div>
          </div>
        </section>

        {/* It's Really Free */}
        <section className="mb-16 bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Yes, It's Really Free</h2>
          <p className="text-lg text-slate-700 mb-4">
            Medical offices need Medical Assistants, and the government will pay for your training:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - for anyone looking to start a healthcare career</li>
            <li>• <strong>Workforce Ready Grant</strong> - Indiana residents</li>
            <li>• <strong>Pell Grants</strong> - federal financial aid</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            We'll help you apply and handle all the paperwork.
          </p>
        </section>

        {/* Career Outlook */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Where You'll Work</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your First Year</h3>
                <p className="text-2xl font-bold text-purple-600 mb-2">$32,000 - $38,000</p>
                <p className="text-sm text-slate-600">Plus benefits at most offices</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Places That Hire MAs</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Doctor's offices</li>
                  <li>• Urgent care clinics</li>
                  <li>• Hospitals</li>
                  <li>• Specialty practices</li>
                  <li>• Community health centers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Start */}
        <section className="bg-purple-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start?</h2>
          <p className="text-lg text-slate-700 mb-6">
            No healthcare experience needed. We'll teach you everything from scratch.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-purple-600 text-white px-10 py-4 rounded-md font-semibold hover:bg-purple-700 transition-all text-lg"
          >
            Start Your Application
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Questions? Call us at (317) 123-4567 or stop by—we'd love to meet you.
          </p>
        </section>
      </div>
    
      
      {/* Indiana Career Connect Enrollment Process */}
      <EnrollmentProcess />
      
      {/* Program Highlights */}
      <ProgramHighlights />
      
      {/* Call to Action */}
      <ProgramCTA programName="this program" />

    </main>
  );
}
