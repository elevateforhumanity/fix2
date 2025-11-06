import React from 'react';
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
