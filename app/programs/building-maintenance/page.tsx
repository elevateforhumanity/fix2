import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Building Maintenance Training | Elevate For Humanity',
  description: '100% free training. Learn facility maintenance, repairs, and building systems. Start your career.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Building Maintenance Training"
        description="100% free training. Learn facility maintenance, repairs, and building systems. Start your career."
        imageSrc="/images/trades/program-hvac-technician.jpg"
        imageAlt="Building Maintenance Training"
        duration="8-12 Weeks"
        cost="$0"
        placement="85%+"
        salary="$38K+"
      />
    </div>
  );
}
