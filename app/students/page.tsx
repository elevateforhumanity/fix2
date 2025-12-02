import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Students | Elevate For Humanity',
  description: 'Learn more about Students inside the Elevate For Humanity workforce ecosystem.',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Background Image */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1000&fit=crop&q=80"
          alt="Students learning together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-green-900/70" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl">
              Your Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 drop-shadow-lg">
              Access free training, earn certifications, and launch your career
            </p>
            <Link href="/student/courses" className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 text-lg inline-block shadow-2xl transition-all">
              View My Courses
            </Link>
          </div>
        </div>
      </section>

      {/* JRI Callout */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
            <h2 className="text-3xl font-extrabold mb-4">Job Ready Indy (JRI) Partner – Marion County</h2>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Elevate For Humanity Career and Training Institute is an approved Job Ready Indy (JRI) partner in Marion County. JRI helps youth and adults build:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <span className="text-lg font-semibold">Work ethic</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤝</span>
                <span className="text-lg font-semibold">Professionalism</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <span className="text-lg font-semibold">Communication</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-lg font-semibold">Self-management</span>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Eligible learners can access JRI modules through EmployIndy's Tovuti LMS, with Elevate For Humanity providing local training, coaching, and wraparound support.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn Anywhere</h3>
              <p className="text-gray-600">Access courses on any device</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">Monitor your learning journey</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Certified</h3>
              <p className="text-gray-600">Earn industry-recognized certifications</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}