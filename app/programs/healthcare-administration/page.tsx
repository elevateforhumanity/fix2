import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Healthcare Administration Training | Elevate For Humanity',
  description: '100% free training. Learn medical office management, billing, and healthcare systems.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Healthcare Administration Training"
        description="100% free training. Learn medical office management, billing, and healthcare systems."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Healthcare Administration Training"
        duration="12-16 Weeks"
        cost="$0"
        placement="85%+"
        salary="$42K+"
      />
    </div>
  );
}
