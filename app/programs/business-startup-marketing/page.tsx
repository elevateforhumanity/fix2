import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Business Startup & Marketing | Elevate For Humanity',
  description: '100% free training. Learn to start and market your own business. Entrepreneurship and digital marketing.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Business Startup & Marketing"
        description="100% free training. Learn to start and market your own business. Entrepreneurship and digital marketing."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Business Startup & Marketing"
        duration="12-16 Weeks"
        cost="$0"
        placement="75%+"
        salary="Varies"
      />
    </div>
  );
}
