import React from 'react';
import ComingSoon from '../../components/ComingSoon';

export default function VolunteerOpportunities() {
  return (
    <ComingSoon
      title="Volunteer Opportunities"
      description="Make a difference in your community by volunteering with Elevate for Humanity. Help students succeed through mentorship, tutoring, and community support."
      icon="🤝"
      features={[
        'Mentor students in your area of expertise',
        'Assist with career workshops and job fairs',
        'Support community outreach programs',
        'Help with administrative tasks and events',
        'Flexible scheduling to fit your availability',
        'Make a lasting impact on students\' lives',
      ]}
      launchDate="Q1 2025"
    />
  );
}
