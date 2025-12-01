import { Metadata } from 'next';
import TeamSection from '@/components/TeamSection';

export const metadata: Metadata = {
  title: 'Our Team | Elevate For Humanity',
  description: 'Meet the dedicated team behind Elevate for Humanity. Our staff provides comprehensive support including housing assistance, mental health services, life coaching, and direct employer connections.',
};

export default function TeamPage() {
  return (
    <main className="bg-white">
      <TeamSection />
    </main>
  );
}
