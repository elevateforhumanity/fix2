import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function HealthcarePage() {
  return (
    <ProgramPageTemplate
      title="Healthcare Training"
      icon="🏥"
      duration="Certification Programs • High Demand"
      description="Enter the healthcare field with comprehensive training in patient care, medical terminology, and clinical skills."
      funding="WRG • WIOA"
      metaDescription="Healthcare training programs including CNA, Medical Assistant, and Patient Care. 100% funded training in Marion County, IN."
      overview="Our Healthcare Training program prepares you for entry-level positions in the healthcare industry. Learn patient care, medical terminology, clinical procedures, and professional healthcare practices."
      benefits={[
        '100% funded training',
        'Multiple certification paths',
        'Clinical experience',
        'Job placement assistance',
        'High-demand field',
        'Career advancement opportunities',
      ]}
      curriculum={[
        'Patient care fundamentals',
        'Medical terminology',
        'Vital signs and measurements',
        'Infection control',
        'Medical documentation',
        'HIPAA compliance',
        'Clinical procedures',
      ]}
      requirements={[
        '18 years or older',
        'High school diploma or GED',
        'Marion County resident',
        'WIOA/WRG eligible',
        'Background check',
        'Drug screening',
        'Immunizations current',
      ]}
      outcomes={[
        'Certified Nursing Assistant (CNA)',
        'Medical Assistant',
        'Patient Care Technician',
        'Average salary: $28,000-$38,000/year',
        'Hospital employment',
        'Career advancement to RN',
      ]}
    />
  );
}
