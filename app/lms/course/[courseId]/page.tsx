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

export default async function Page({ params }: Props)
