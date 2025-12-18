import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Get Started Today | Elevate for Humanity',
  description:
    'Connect with Elevate for Humanity. Students, employers, training providers, and workforce boards - find the right contact for your needs. Call 317-314-3757.',
  keywords: [
    'contact',
    'Indianapolis',
    'workforce training',
    'career services',
    'WIOA',
    'training providers',
    'employers',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/contact',
  },
  openGraph: {
    title: 'Contact Elevate for Humanity',
    description:
      'Connect with us for free career training, employer partnerships, or platform licensing. Multiple ways to get in touch.',
    url: 'https://www.elevateforhumanity.org/contact',
    type: 'website',
    images: [
      {
        url: '/images/facilities-new/facility-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Elevate for Humanity',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return <ContactClient />;
}
