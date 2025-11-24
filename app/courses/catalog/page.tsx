import { createClient } from '@/lib/supabase/server';
import CourseCatalogClient from './CourseCatalogClient';

export const metadata = {
  title: 'Course Catalog | Elevate For Humanity',
  description: 'Browse our comprehensive catalog of fully-funded workforce training courses.',
};

export default async function CourseCatalogPage() {
  const supabase = await createClient();
  
  // Fetch courses from database
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'published')
    .order('trending', { ascending: false })
    .order('total_students', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
  }

  return <CourseCatalogClient courses={courses || []} />;
}
