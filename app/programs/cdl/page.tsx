import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Commercial Driver License (CDL) Training | Elevate For Humanity',
  description: '100% free CDL training. Learn to drive commercial vehicles. Get your CDL and start earning immediately.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Commercial Driver License (CDL) Training"
        description="100% free CDL training. Learn to drive commercial vehicles. Get your CDL and start earning immediately."
        imageSrc="/images/trades/hero-program-cdl.jpg"
        imageAlt="Commercial Driver License (CDL) Training"
        duration="4-6 Weeks"
        cost="$0"
        placement="95%+"
        salary="$50K+"
      />
    </div>
  );
}
