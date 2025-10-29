import React from 'react';
import ComingSoon from '../../components/ComingSoon';

export default function Volunteer() {
  return (
    <ComingSoon
      title="Volunteer Hub"
      description="Learn about volunteer opportunities and how you can get involved to support our mission of empowering students and elevating communities."
      icon="🌟"
      features={[
        'Browse available volunteer positions',
        'Sign up for volunteer shifts and events',
        'Track your volunteer hours and impact',
        'Receive volunteer training and resources',
        'Join our community of dedicated volunteers',
        "Make a meaningful difference in students' lives",
      ]}
      launchDate="Q1 2025"
    />
  );
}
