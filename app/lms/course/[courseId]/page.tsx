import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/lms/course/[courseId]"
  },
  title: '[courseId] | Elevate For Humanity',
  description: 'Explore [courseId] and discover opportunities for career growth and development at Elevate For Humanity.'
};

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  
  
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

export default async function Page({ params }
