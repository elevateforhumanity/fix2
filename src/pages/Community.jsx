/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function Community() {
  return (
    <ComingSoon
      title="Community Forum"
      description="Connect with fellow students, share your progress, ask questions, and build lasting relationships in our supportive community forum."
      icon="🏘️"
      features={[
        'Participate in discussion threads by topic',
        'Share your learning journey and progress',
        'Ask questions and get help from peers',
        'Network with students in your program',
        'Join study groups and accountability circles',
        'Celebrate achievements together',
      ]}
      launchDate="Q1 2025"
    />
  );
}
