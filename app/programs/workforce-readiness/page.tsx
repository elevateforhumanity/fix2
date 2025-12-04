import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Workforce Readiness Program | Elevate For Humanity',
  description: '100% free workforce readiness training. Develop job skills, resume writing, and interview techniques.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Workforce Readiness Program"
        description="100% free workforce readiness training. Develop job skills, resume writing, and interview techniques."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Workforce Readiness Program"
        duration="4-8 Weeks"
        cost="$0"
        placement="90%+"
        salary="Varies"
      />
    </div>
  );
}
