import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {

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
