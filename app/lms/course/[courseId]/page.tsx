import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const supabase = await createClient();
  
  const { data: course } = await supabase
    .from('courses')
    .select('title, description')
    .eq('slug', courseId)
    .single();

  return {
    title: course ? `${course.title} | Elevate For Humanity` : 'Course | Elevate For Humanity',
    description: course?.description || 'Discover more about this course inside the Elevate For Humanity workforce ecosystem.'
  };
}

export default async function Page({ params }: Props) {
  const { courseId } = await params;
  const supabase = await createClient();
  
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseId)
    .single();

  if (error || !course) {
    notFound();
  }

  // Get course modules
  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', course.id)
    .order('order_index');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4">
            <Link 
              href="/lms/courses" 
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              ← Back to Courses
            </Link>
          </div>
          
          {course.image_url && (
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={course.image_url}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            {course.title}
          </h1>
          
          {course.description && (
            <p className="mb-4 text-lg text-slate-600">
              {course.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {course.duration && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Duration:</span>
                <span>{course.duration}</span>
              </div>
            )}
            {course.level && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Level:</span>
                <span className="capitalize">{course.level}</span>
              </div>
            )}
          </div>
        </div>

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Course Content</h2>
          
          {modules && modules.length > 0 ? (
            <div className="space-y-3">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {module.title}
                        </h3>
                      </div>
                      
                      {module.description && (
                        <p className="ml-11 text-slate-600">
                          {module.description}
                        </p>
                      )}
                    </div>
                    
                    <Link
                      href={`/lms/course/${courseId}/module/${module.id}`}
                      className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Start Module
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">No modules available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
