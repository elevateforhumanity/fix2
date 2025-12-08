import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import CourseBuilderClient from './CourseBuilderClient';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/course-builder",
  },
  title: 'Course Builder | Admin',
  description: 'Build and edit courses with live preview',
};

export default async function CourseBuilderPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch all courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('title');

  // Fetch all programs for categorization
  const { data: programs } = await supabase
    .from('programs')
    .select('id, title, code')
    .order('title');

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Course Builder</h1>
            <p className="text-xl text-blue-100">Create and edit courses with live preview</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <CourseBuilderClient 
            initialCourses={courses || []} 
            programs={programs || []}
          />
        </div>
      </div>
    </div>
  );
}
