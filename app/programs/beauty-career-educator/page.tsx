import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Beauty Career Educator Training | Elevate For Humanity',
  description: '100% free training. Become a licensed beauty instructor. Teach the next generation of beauty professionals.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Beauty Career Educator Training"
        description="100% free training. Become a licensed beauty instructor. Teach the next generation of beauty professionals."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Beauty Career Educator Training"
        duration="16-24 Weeks"
        cost="$0"
        placement="80%+"
        salary="$45K+"
      />
    </div>
  );
}
