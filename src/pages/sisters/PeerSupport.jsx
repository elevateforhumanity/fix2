import React from 'react';
import ComingSoon from '../../components/ComingSoon';

export default function PeerSupport() {
  return (
    <ComingSoon
      title="Peer Support Network"
      description="Connect with fellow students for encouragement, advice, and shared experiences. Build a supportive community that helps you succeed."
      icon="💬"
      features={[
        'Join peer support groups by program or interest',
        'Share your story and challenges in a safe space',
        'Find study buddies and accountability partners',
        'Access mental health and wellness resources',
        'Participate in group discussions and forums',
        'Get support from students who understand your journey',
      ]}
      launchDate="Q1 2025"
    />
  );
}
