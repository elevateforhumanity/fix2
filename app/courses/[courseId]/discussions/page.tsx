import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DiscussionsClient from './DiscussionsClient';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussions - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Discussions - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/students-new/student-25.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discussions - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default async function DiscussionsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: threads } = await supabase
    .from('discussion_threads')
    .select('*, replies:discussion_replies(*)')
    .eq('course_id', params.courseId)
    .order('created_at', { ascending: false });

  return (
    <DiscussionsClient
      courseId={params.courseId}
      initialThreads={threads || []}
      currentUserId={user.id}
    />
  );
}
