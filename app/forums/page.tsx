import DiscussionForums from '@/components/forums/DiscussionForums';

export const metadata = {
  title: 'Discussion Forums | Elevate for Humanity',
  description:
    'Connect with peers, ask questions, and share knowledge in our student community forums.',
};

export const dynamic = 'force-dynamic';

export default function ForumsPage() {
  return <DiscussionForums />;
}
