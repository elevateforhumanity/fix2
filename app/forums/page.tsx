import DiscussionForums from '@/components/forums/DiscussionForums';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Discussion Forums | Elevate for Humanity',
  description:
    'Connect with peers, ask questions, and share knowledge in our student community forums.',
};

// Force dynamic rendering since this uses Supabase client

export default function ForumsPage() {
  return <DiscussionForums />;
}
