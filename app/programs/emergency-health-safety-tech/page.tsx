import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Emergency Health & Safety Technician | Elevate For Humanity',
  description: '100% free training. Learn emergency response, safety protocols, and health procedures.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Emergency Health & Safety Technician"
        description="100% free training. Learn emergency response, safety protocols, and health procedures."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Emergency Health & Safety Technician"
        duration="8-12 Weeks"
        cost="$0"
        placement="85%+"
        salary="$38K+"
      />
    </div>
  );
}
