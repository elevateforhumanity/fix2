import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function CPRSPage() {
  return (
    <ProgramPageTemplate
      title="Peer Recovery Support"
      icon="🤝"
      duration="Certification • Community Impact"
      description="Train to become a certified peer recovery support specialist and help others on their recovery journey."
      funding="WRG • WIOA"
      metaDescription="Become a Certified Peer Recovery Support Specialist. Help others in recovery with 100% funded training in Marion County, IN."
      overview="Our Peer Recovery Support program trains you to become a certified specialist who helps individuals in recovery from substance use disorders. Use your lived experience to support others on their recovery journey."
      benefits={[
        '100% funded training',
        'State certification',
        'Meaningful career',
        'Community impact',
        'Job placement assistance',
        'Growing field',
      ]}
      curriculum={[
        'Recovery principles',
        'Peer support techniques',
        'Ethics and boundaries',
        'Crisis intervention',
        'Resource navigation',
        'Documentation',
        'Cultural competency',
      ]}
      requirements={[
        '18 years or older',
        'Marion County resident',
        'WIOA/WRG eligible',
        'Personal recovery experience',
        'Background check',
        'Commitment to helping others',
        'Professional boundaries',
      ]}
      outcomes={[
        'Certified Peer Recovery Specialist',
        'Recovery support positions',
        'Average salary: $28,000-$38,000/year',
        'Treatment facilities',
        'Community organizations',
        'Career advancement',
      ]}
    />
  );
}
