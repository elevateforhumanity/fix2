import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CourseProgressTracker from './CourseProgressTracker';

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const supabase = await createClient();
  
  const { data: course } = await supabase
    .from('courses')
    .select('title')
    .eq('id', courseId)
    .single();

  return {
    title: `${course?.title || 'Course'} | Student Portal`,
    description: 'Continue your learning journey'
  };
}

export default async function StudentCourseDetailPage(props: Props)
