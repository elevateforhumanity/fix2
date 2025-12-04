import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Business Apprenticeship Program | Elevate For Humanity',
  description: '100% free business apprenticeship. Learn while you earn. Develop entrepreneurship and management skills.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Business Apprenticeship Program"
        description="100% free business apprenticeship. Learn while you earn. Develop entrepreneurship and management skills."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Business Apprenticeship Program"
        duration="12-24 Months"
        cost="$0"
        placement="85%+"
        salary="$40K+"
      />
    </div>
  );
}
