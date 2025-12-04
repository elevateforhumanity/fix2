import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Building Technology Training | Elevate For Humanity',
  description: '100% free building tech training. Learn construction, maintenance, and building systems. Get certified.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Building Technology Training"
        description="100% free building tech training. Learn construction, maintenance, and building systems. Get certified."
        imageSrc="/images/trades/program-hvac-technician.jpg"
        imageAlt="Building Technology Training"
        duration="12-16 Weeks"
        cost="$0"
        placement="85%+"
        salary="$42K+"
      />
    </div>
  );
}
