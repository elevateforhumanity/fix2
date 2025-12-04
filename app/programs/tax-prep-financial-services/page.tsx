import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Tax Prep & Financial Services | Elevate For Humanity',
  description: '100% free training. Learn tax preparation, bookkeeping, and financial planning. Start your own business.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Tax Prep & Financial Services"
        description="100% free training. Learn tax preparation, bookkeeping, and financial planning. Start your own business."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Tax Prep & Financial Services"
        duration="12-16 Weeks"
        cost="$0"
        placement="80%+"
        salary="$40K+"
      />
    </div>
  );
}
