import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function DrugTestingPage() {
  return (
    <ProgramPageTemplate
      title="Drug Testing Specialist"
      icon="🧪"
      duration="Certification • Compliance Training"
      description="Become a certified drug testing specialist with training in collection procedures, chain of custody, and compliance."
      funding="WRG • WIOA"
      metaDescription="Become a certified Drug Testing Specialist. Learn collection procedures, compliance, and chain of custody with 100% funded training."
      heroImage="/images/hero-training.jpg"
      overview="Our Drug Testing Specialist program trains you in proper collection procedures, chain of custody protocols, and compliance requirements for workplace drug testing programs."
      benefits={[
        '100% funded training',
        'Industry certification',
        'High-demand specialty',
        'Flexible work opportunities',
        'Job placement assistance',
        'Growing field',
      ]}
      curriculum={[
        'Collection procedures',
        'Chain of custody protocols',
        'DOT regulations',
        'Specimen handling',
        'Quality control',
        'Documentation requirements',
        'Legal compliance',
      ]}
      requirements={[
        '18 years or older',
        'High school diploma or GED',
        'Marion County resident',
        'WIOA/WRG eligible',
        'Background check',
        'Attention to detail',
        'Professional demeanor',
      ]}
      outcomes={[
        'Certified Collection Specialist',
        'Drug Testing Technician',
        'Average salary: $30,000-$42,000/year',
        'Healthcare facilities',
        'Testing laboratories',
        'Mobile collection services',
      ]}
    />
  );
}
