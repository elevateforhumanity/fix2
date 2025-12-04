import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Peer Recovery Coach Training | Elevate For Humanity',
  description: '100% free training. Help others overcome addiction. Get certified as a peer recovery specialist.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Peer Recovery Coach Training"
        description="100% free training. Help others overcome addiction. Get certified as a peer recovery specialist."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Peer Recovery Coach Training"
        duration="8-12 Weeks"
        cost="$0"
        placement="85%+"
        salary="$35K+"
      />
    </div>
  );
}
