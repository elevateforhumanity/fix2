import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CourseProgressTracker from './CourseProgressTracker';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/student/courses/[courseId]"
  },
  title: '[courseId] | Elevate For Humanity',
  description: 'Explore [courseId] and discover opportunities for career growth and development at Elevate For Humanity.'
};

export async function generateMetadata({ params }: { params: { courseId: string } }): Promise<Metadata> {
  
  const { data: course } = await supabase
    .from('courses')
    .select('title')
    .eq('id', params.courseId)
    .single();

  return {
    title: `${course?.title || 'Course'} | Student Portal`,
    description: 'Continue your learning journey'
  };
}

export default async function StudentCourseDetailPage(props: { params: Promise<{ [key: string]: string }> }
