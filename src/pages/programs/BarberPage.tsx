/**
 * Barber Apprenticeship Program Page
 * Copyright (c) 2025 Elevate for Humanity
 */

import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function BarberPage() {
  return (
    <ProgramPageTemplate
      title="Barber Apprenticeship"
      icon="🪒"
      duration="2,000 hours • State Licensure"
      description="Earn while you learn. Master professional barbering skills and qualify for Indiana State Licensure."
      funding="WRG • WIOA • Apprenticeship"
      metaDescription="Become a licensed barber through our 2,000-hour apprenticeship program. Earn while you learn with 100% funded training in Marion County, IN."
      heroImage="/images/programs/efh-barber-hero.jpg"
      cardImage="/images/programs/efh-barber-card.jpg"
      ogImage="/images/programs/efh-barber-og.jpg"
      highlights={[
        {
          icon: '💼',
          title: 'Earn While You Learn',
          description: 'Get paid while completing your 2,000-hour apprenticeship with experienced barbers.',
        },
        {
          icon: '📜',
          title: 'State Licensure',
          description: 'Qualify for Indiana State Barber Licensure upon program completion.',
        },
        {
          icon: '✂️',
          title: 'Master the Craft',
          description: 'Learn cutting, styling, shaving, and customer service from industry professionals.',
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      videoTitle="Barber Apprenticeship Program"
      overview="Our Barber Apprenticeship program combines hands-on training with paid work experience. You'll master cutting techniques, styling, shaving, and customer service while earning income. Upon completion, you'll be eligible for Indiana State Barber Licensure and ready to start your career in a high-demand field."
      benefits={[
        'Earn while you learn through paid apprenticeship',
        'Qualify for Indiana State Barber Licensure',
        '2,000 hours of hands-on training',
        '100% funded through WIOA and WRG',
        'Work with experienced master barbers',
        'Job placement assistance upon completion',
      ]}
      curriculum={[
        'Hair cutting and styling techniques',
        'Straight razor shaving and beard trimming',
        'Hair coloring and chemical treatments',
        'Sanitation and safety procedures',
        'Customer service and communication',
        'Business management and marketing',
        'State board exam preparation',
      ]}
      requirements={[
        'Must be 18 years or older',
        'High school diploma or GED',
        'Marion County, IN resident',
        'Eligible for WIOA or WRG funding',
        'Pass background check',
        'Commitment to complete 2,000 hours',
      ]}
      outcomes={[
        'Licensed Professional Barber',
        'Employment in barbershops',
        'Self-employment opportunities',
        'Average salary: $35,000-$50,000/year',
        'Career advancement to shop owner',
        'Continuing education opportunities',
      ]}
    />
  );
}
