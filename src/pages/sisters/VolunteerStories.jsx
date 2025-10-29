import React from 'react';
import ComingSoon from '../../components/ComingSoon';

export default function VolunteerStories() {
  return (
    <ComingSoon
      title="Volunteer Stories"
      description="Read inspiring stories from our volunteers about their experiences and the impact they've made in students' lives. Be inspired to make a difference."
      icon="📖"
      features={[
        'Real stories from community volunteers',
        'Learn about volunteer experiences and impact',
        'Discover different ways to get involved',
        'See the difference volunteers make',
        'Get inspired to start your volunteer journey',
        'Connect with featured volunteers',
      ]}
      launchDate="Q1 2025"
    />
  );
}
