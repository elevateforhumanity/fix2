import React from 'react';
import ComingSoon from '../../components/ComingSoon';

export default function MentorDirectory() {
  return (
    <ComingSoon
      title="Mentor Directory"
      description="Connect with experienced mentors who can guide you through your career journey. Browse profiles, read reviews, and find the perfect mentor for your goals."
      icon="👥"
      features={[
        'Search mentors by industry and expertise',
        'View detailed mentor profiles and backgrounds',
        'Read reviews from other students',
        'Schedule one-on-one mentoring sessions',
        'Access career guidance and advice',
        'Build lasting professional relationships',
      ]}
      launchDate="Q1 2025"
    />
  );
}
