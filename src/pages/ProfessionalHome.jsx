import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function ProfessionalHome() {
  return (
    <ComingSoon
      title="Professional Development Hub"
      description="Advance your career with our comprehensive professional development programs designed for working professionals seeking to upskill and grow."
      icon="💼"
      features={[
        'Executive leadership training programs',
        'Industry-specific certifications',
        'Flexible evening and weekend classes',
        'Online and hybrid learning options',
        'Career advancement coaching',
        'Professional networking opportunities',
      ]}
      launchDate="Q2 2025"
    />
  );
}
