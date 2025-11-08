import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function DigitalSkillsPage() {
  return (
    <ProgramPageTemplate
      title="Digital Skills"
      icon="💻"
      duration="Self-Paced • Multiple Certifications"
      description="Build essential digital literacy skills including Microsoft Office, Google Workspace, and online communication."
      funding="WRG • WIOA"
      metaDescription="Digital skills training including Microsoft Office, Google Workspace, and essential computer skills. 100% funded, self-paced learning."
      overview="Our Digital Skills program builds essential computer and technology skills needed in today's workplace. Learn Microsoft Office, Google Workspace, email, internet research, and professional online communication."
      benefits={[
        '100% funded training',
        'Self-paced learning',
        'Multiple certifications',
        'Essential workplace skills',
        'Online and in-person options',
        'Job readiness focus',
      ]}
      curriculum={[
        'Microsoft Word, Excel, PowerPoint',
        'Google Docs, Sheets, Slides',
        'Email and calendar management',
        'Internet research skills',
        'Online collaboration tools',
        'Cybersecurity basics',
        'Professional communication',
      ]}
      requirements={[
        '18 years or older',
        'Marion County resident',
        'WIOA/WRG eligible',
        'Basic reading skills',
        'Commitment to complete program',
        'Access to computer/internet',
      ]}
      outcomes={[
        'Microsoft Office certification',
        'Google Workspace certification',
        'Enhanced employability',
        'Office administration roles',
        'Remote work opportunities',
        'Career advancement',
      ]}
    />
  );
}
