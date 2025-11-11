import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function LeadershipPage() {
  return (
    <ProgramPageTemplate
      title="Leadership Development"
      icon="👔"
      duration="Professional Development • Soft Skills"
      description="Develop leadership, communication, and professional skills to advance your career and lead teams effectively."
      funding="WRG • WIOA"
      metaDescription="Leadership development and professional skills training. Build communication, management, and leadership skills with 100% funded training."
      heroImage="/images/hero-banner.jpg"
      highlights={[
        {
          icon: '👔',
          title: 'Career Advancement',
          description: 'Develop skills needed to move into management and leadership roles.',
        },
        {
          icon: '🗣️',
          title: 'Communication Skills',
          description: 'Master effective communication, presentation, and interpersonal skills.',
        },
        {
          icon: '🎯',
          title: 'Practical Application',
          description: 'Apply leadership principles immediately in your current role.',
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      videoTitle="Leadership Development Program"
      overview="Our Leadership Development program builds essential soft skills and leadership capabilities. Learn effective communication, team management, conflict resolution, and professional development strategies."
      benefits={[
        '100% funded training',
        'Career advancement focus',
        'Practical leadership skills',
        'Professional networking',
        'Certificate of completion',
        'Applicable to any industry',
      ]}
      curriculum={[
        'Leadership principles',
        'Effective communication',
        'Team building and management',
        'Conflict resolution',
        'Time management',
        'Professional development',
        'Emotional intelligence',
      ]}
      requirements={[
        '18 years or older',
        'Marion County resident',
        'WIOA/WRG eligible',
        'Work experience preferred',
        'Commitment to program',
        'Professional attitude',
      ]}
      outcomes={[
        'Leadership certificate',
        'Supervisory positions',
        'Team lead roles',
        'Management opportunities',
        'Career advancement',
        'Increased earning potential',
      ]}
    />
  );
}
