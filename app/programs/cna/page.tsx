import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'CNA Training Program | Elevate For Humanity',
  description: 'Become a Certified Nursing Assistant with our 100% funded CNA training program',
};

export default function CNAProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Certified Nursing Assistant (CNA) Training"
        description="Start your healthcare career in just 4-6 weeks. Work in hospitals, nursing homes, and home health. State certification exam included."
        imageSrc="/images/programs/efh-cna-hero.jpg"
        imageAlt="CNA Training Program"
        duration="4-6 Weeks"
        cost="$0"
        placement="90%+"
        salary="$30-35K"
      />
    </div>
  );
}
