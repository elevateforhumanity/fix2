import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import CoursesCatalog from './CoursesCatalog';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/courses",
  },
  title: 'Course Catalog | Elevate For Humanity',
  description: 'Browse our complete catalog of workforce development courses. 100% free training programs funded by WIOA.',
};

export default async function CoursesPage() {
  const supabase = await createClient();
  
  // Fetch published courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'published')
    .order('title');

  // Get course categories
  const categories = courses ? [...new Set(courses.map(c => c.category).filter(Boolean))] : [];
  const levels = courses ? [...new Set(courses.map(c => c.level).filter(Boolean))] : [];

  return <CoursesCatalog courses={courses || []} categories={categories} levels={levels} />;
}
