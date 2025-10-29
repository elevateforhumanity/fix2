/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function CloneLanding() {
  return (
    <ComingSoon
      title="White Label Platform"
      description="Launch your own branded workforce development platform with our white label solution. Perfect for organizations, schools, and training providers."
      icon="🎨"
      features={[
        'Fully customizable branding and design',
        'Your logo, colors, and domain name',
        'Complete LMS and course management',
        'Student enrollment and tracking',
        'Payment processing and reporting',
        'Dedicated support and training',
      ]}
      launchDate="Q2 2025"
    />
  );
}
