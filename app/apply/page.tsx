import type { Metadata } from 'next';
import ApplyFormClient from './ApplyFormClient';

export const metadata: Metadata = {
  title: 'Apply Now - 100% Free Career Training | Elevate for Humanity',
  description:
    'Start your career journey with 100% free training in healthcare, trades, and technology. No tuition, no debt. WIOA-funded programs in Indianapolis, Indiana.',
  keywords: [
    'apply',
    'free training',
    'WIOA',
    'career training',
    'Indianapolis',
    'Indiana',
    'job training application',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply',
  },
  openGraph: {
    title: 'Apply for Free Career Training - Elevate for Humanity',
    description:
      '100% FREE career training through WIOA funding. No tuition, no debt. Real jobs waiting in Indianapolis.',
    url: 'https://www.elevateforhumanity.org/apply',
    type: 'website',
    images: [
      {
        url: '/images/heroes/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Apply for free career training',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default function ApplyPage() {
  return <ApplyFormClient />;
}
