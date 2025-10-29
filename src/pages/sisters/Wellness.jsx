import React from 'react';
import ComingSoon from '../../components/ComingSoon';

export default function Wellness() {
  return (
    <ComingSoon
      title="Wellness Center"
      description="Explore resources and tips for maintaining your physical, mental, and emotional wellness. Your well-being is essential to your success."
      icon="🧘"
      features={[
        'Self-care strategies and daily wellness tips',
        'Stress management and mindfulness techniques',
        'Healthy habits for work-life balance',
        'Access to wellness workshops and events',
        'Mental health resources and support',
        'Fitness and nutrition guidance',
      ]}
      launchDate="Q1 2025"
    />
  );
}
