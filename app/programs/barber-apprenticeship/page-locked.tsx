import { Metadata } from 'next';
import { ProgramPageLocked } from '@/components/programs/ProgramPageLocked';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship | Elevate For Humanity',
  description:
    'Get paid while you learn. Earn $10/hour + tips. 15-17 months to licensed barber.',
};

/**
 * Barber Apprenticeship - STUDENT VIEW ONLY
 *
 * This page speaks ONLY to students
 * Agencies/employers see different pages
 */
export default function BarberApprenticeshipPage() {
  return (
    <ProgramPageLocked
      name="Barber Apprenticeship"
      // 1. WHO THIS IS FOR (student language)
      forWho={[
        'You want to work with your hands and build a skill',
        'You need to earn money while you train',
        'You want to own your own business someday',
      ]}
      // 2. WHAT YOU GET (student outcomes)
      outcomes={[
        'Indiana Licensed Barber',
        'Earn $35,000-$65,000/year',
        'Own your chair or open your shop',
      ]}
      // 3. HOW LONG
      duration="15-17 months"
      schedule="Full-time"
      // 4. WHAT IT COSTS
      cost="$0"
      fundedBy="WIOA & Workforce Ready Grant"
      // 5. PROOF
      rapidsId="2025-IN-132301"
      avgSalary="$45,000"
      heroImage="/images/programs/barber-hero.jpg"
    />
  );
}
