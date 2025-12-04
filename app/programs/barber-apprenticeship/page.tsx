import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Elevate For Humanity',
  description: '100% free barber apprenticeship. Learn while you earn. Get licensed and start your own business.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Barber Apprenticeship Program"
        description="100% free barber apprenticeship. Learn while you earn. Get licensed and start your own business."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Barber Apprenticeship Program"
        duration="12-24 Months"
        cost="$0"
        placement="90%+"
        salary="$40K+"
      />
    </div>
  );
}
