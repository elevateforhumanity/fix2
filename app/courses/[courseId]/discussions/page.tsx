import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DiscussionsClient from './DiscussionsClient';

export default async function DiscussionsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
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
