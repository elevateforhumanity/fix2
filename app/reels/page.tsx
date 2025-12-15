export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { createClient } from '@/lib/supabase/server';

import ReelsFeed from '@/components/reels/ReelsFeed';

export const metadata: Metadata = {
  title: 'Reels | Elevate For Humanity',
  description:
    'Watch short-form videos about career training and success stories',
};

async function getReels() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('reels')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20);
    return data || [];
  } catch (error) {
    return [];
  }
}

export default async function ReelsPage() {
  const reels = await getReels();

  return (
    <main className="bg-black min-h-screen">
      <ReelsFeed reels={reels} />
    </main>
  );
}
