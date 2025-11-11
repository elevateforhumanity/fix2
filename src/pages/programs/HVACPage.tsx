import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function HVACPage() {
  return (
    <ProgramPageTemplate
      title="HVAC & Welding"
      icon="🔥"
      duration="Dual Certification • High Demand"
      description="Master two in-demand trades with comprehensive training in heating, ventilation, air conditioning, and welding."
      funding="WRG • WIOA"
      metaDescription="Dual certification in HVAC and Welding. 100% funded training for two high-demand trades in Marion County, IN."
      heroImage="/images/programs/efh-building-tech-hero.jpg"
      highlights={[
        {
          icon: '🔥',
          title: 'Dual Certification',
          description: 'Get certified in both HVAC and Welding - two skills, double the opportunities.',
        },
        {
          icon: '💪',
          title: 'Hands-On Training',
          description: 'Work with real equipment and materials in our state-of-the-art facilities.',
        },
        {
          icon: '📈',
          title: 'High Earning Potential',
          description: 'Skilled trades professionals earn $40,000-$60,000+ annually.',
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      videoTitle="HVAC & Welding Program"
      overview="Our HVAC & Welding program offers dual certification in two high-demand trades. You'll gain expertise in heating, ventilation, air conditioning systems, plus welding techniques used in construction and manufacturing."
      benefits={[
        'Dual certification in two trades',
        '100% funded training',
        'High-demand skills',
        'Hands-on training',
        'Industry certifications',
        'Excellent job prospects',
      ]}
      curriculum={[
        'HVAC system installation',
        'Refrigeration principles',
        'Welding techniques (MIG, TIG, Stick)',
        'Blueprint reading',
        'Safety procedures',
        'EPA certification prep',
        'Welding certification prep',
      ]}
      requirements={[
        '18 years or older',
        'High school diploma or GED',
        'Marion County resident',
        'WIOA/WRG eligible',
        'Physical ability',
        'Pass drug screening',
      ]}
      outcomes={[
        'HVAC Technician',
        'Certified Welder',
        'Average salary: $40,000-$60,000/year',
        'Union opportunities',
        'Self-employment potential',
        'Career advancement',
      ]}
    />
  );
}
