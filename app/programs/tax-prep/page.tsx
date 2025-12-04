import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Tax Preparation Training | Elevate For Humanity',
  description: '100% free tax prep training. Learn tax preparation and financial services. Get certified and start your business.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Tax Preparation Training"
        description="100% free tax prep training. Learn tax preparation and financial services. Get certified and start your business."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Tax Preparation Training"
        duration="8-12 Weeks"
        cost="$0"
        placement="80%+"
        salary="$35K+"
      />
    </div>
  );
}
