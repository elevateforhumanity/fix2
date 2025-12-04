import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Peer Support Professional Training | Elevate For Humanity',
  description: '100% free training. Provide mental health and recovery support. Get certified and help your community.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Peer Support Professional Training"
        description="100% free training. Provide mental health and recovery support. Get certified and help your community."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Peer Support Professional Training"
        duration="8-12 Weeks"
        cost="$0"
        placement="85%+"
        salary="$35K+"
      />
    </div>
  );
}
