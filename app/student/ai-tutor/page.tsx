import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AIInstructor from '@/app/components/AIInstructor';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/student/ai-tutor",
  },
  title: 'AI Tutor | Student Portal',
  description: 'Get personalized help from your AI instructor',
};

export default async function AITutorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .limit(10);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Get student's active enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      programs (
        id,
        title,
        slug
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'active');

  // Get AI instructors for enrolled programs
  const programIds = enrollments?.map(e => e.program_id) || [];
  const { data: aiInstructors } = await supabase
    .from('ai_instructors')
    .select('*')
    .in('program_id', programIds.length > 0 ? programIds : ['null'])
    .eq('is_active', true);

  // Get recent AI interactions
  const { data: recentInteractions } = await supabase
    .from('ai_instructor_interactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Ai Tutor"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Ai Tutor
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">AI Tutor & Instructor</h1>
            <p className="text-xl text-blue-100">Get personalized guidance from your AI instructor</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* AI Instructors */}
              {aiInstructors && aiInstructors.length > 0 ? (
                <div className="space-y-6">
                  {aiInstructors.map((instructor: any) => {
                    const enrollment = enrollments?.find(e => e.program_id === instructor.program_id);
                    const program = enrollment?.programs;
                    
                    return (
                      <div key={instructor.id} className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-start gap-4 mb-4">
                          {instructor.instructor_avatar_url ? (
                            <img 
                              src={instructor.instructor_avatar_url} 
                              alt={instructor.instructor_name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold">{instructor.instructor_name}</h3>
                            <p className="text-sm text-gray-600">{program?.title}</p>
                            {instructor.welcome_message && (
                              <p className="text-sm text-gray-700 mt-2 italic">"{instructor.welcome_message}"</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Link 
                            href={`/student/programs/${program?.slug}/chat`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Chat with {instructor.instructor_name.split(' ')[0]}
                          </Link>
                          <Link 
                            href="/student/courses"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            View Course
                          </Link>
                        
      {/* Storytelling Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Your Journey Starts Here
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Every great career begins with a single step. Whether you're looking to change careers, 
                  upgrade your skills, or enter the workforce for the first time, we're here to help you succeed. 
                  Our programs are 100% free, government-funded, and designed to get you hired fast.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">100% free training - no tuition, no hidden costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Industry-recognized certifications that employers value</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Job placement assistance and career support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Flexible scheduling for working adults</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI Instructors Available</h3>
                  <p className="text-gray-600 mb-6">Enroll in a program to get access to your AI instructor</p>
                  <Link 
                    href="/student/courses"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Browse Courses
                  </Link>
                </div>
              )}

              {/* Recent Interactions */}
              {recentInteractions && recentInteractions.length > 0 && (
                <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Interactions</h2>
                  <div className="space-y-3">
                    {recentInteractions.map((interaction: any) => (
                      <div key={interaction.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-purple-600 uppercase">
                            {interaction.interaction_type.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(interaction.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{interaction.message_text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold mb-4">AI Tutor Features</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 availability for questions</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personalized learning guidance</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lesson introductions & summaries</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Encouragement & motivation</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quiz feedback & explanations</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Voice & text interactions</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <nav className="space-y-2">
                  <Link href="/student/courses" className="block p-2 hover:bg-gray-50 rounded text-sm">
                    📚 My Courses
                  </Link>
                  <Link href="/student/assignments" className="block p-2 hover:bg-gray-50 rounded text-sm">
                    ✍️ Assignments
                  </Link>
                  <Link href="/student/certificates" className="block p-2 hover:bg-gray-50 rounded text-sm">
                    🏆 Certificates
                  </Link>
                  <Link href="/student/dashboard" className="block p-2 hover:bg-gray-50 rounded text-sm">
                    🏠 Dashboard
                  </Link>
                </nav>
              </div>

              {/* Help */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-sm p-6 text-white">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Your AI instructor is here to help you succeed in your program.
                </p>
                <Link 
                  href="/support"
                  className="block w-full text-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium text-sm"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
