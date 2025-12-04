import type { Metadata } from 'next';
import ProgramPageLayout from '@/components/ProgramPageLayout';

export const metadata: Metadata = {
  title: 'CDL Training - Commercial Truck Driving | Elevate For Humanity',
  description: 'Get your CDL Class A license in 4-6 weeks. 100% free training. Drive for top carriers earning $50K-$70K first year.',
};

export default function CDLPage() {
  return (
    <ProgramPageLayout
      // Unique Hero Banner - CDL Specific (Semi Truck on Highway)
      heroImage="/images/trades/hero-program-cdl.jpg"
      heroImageAlt="Professional truck driver in modern semi-truck cab on highway"
      title="Commercial Driver's License Training"
      subtitle="Get your CDL Class A in 4-6 weeks. Train on modern Freightliner and Peterbilt trucks. Start earning $50K+ immediately."
      ctaPrimary={{ text: 'Start CDL Training', href: '/apply' }}
      ctaSecondary={{ text: 'Meet Our Instructors', href: '/contact' }}
      
      // Quick Facts
      duration="4-6 Weeks"
      cost="$0"
      placement="95%+"
      salary="$50K-$70K"
      
      // Overview
      overviewTitle="Professional CDL Class A Training"
      overviewDescription={[
        "Train on our fleet of modern Freightliner Cascadia and Peterbilt 579 trucks with 10-speed manual and automatic transmissions. Practice on our private 5-acre driving range before hitting the road.",
        "Learn from professional drivers with millions of accident-free miles. Master backing maneuvers, highway driving, city navigation, and DOT compliance. Small instructor-to-student ratio ensures personalized coaching.",
        "Full-time and part-time schedules available. Weekend classes for working adults. Pass your CDL exam on the first try with our proven training methods."
      ]}
      certifications={[
        "CDL Class A License (all endorsements available)",
        "ELDT (Entry Level Driver Training) Certification",
        "DOT Medical Card & Physical",
        "Hazmat Endorsement (optional)",
        "Tanker & Doubles/Triples Endorsements"
      ]}
      
      // Visual Highlights - Unique CDL Content
      highlights={[
        {
          title: "Pre-Trip Inspection Mastery",
          description: "Learn the complete 7-step pre-trip inspection process required for your CDL exam. Memorize every component from air brake systems to coupling procedures. Practice until it becomes second nature. Our pass rate on the pre-trip portion is 98%.",
          imageSrc: "/images/trades/program-cdl-commercial-driving.jpg",
          imageAlt: "Student performing pre-trip inspection on semi-truck"
        },
        {
          title: "Backing & Maneuvering Skills",
          description: "Master the straight-line backing, offset backing, and parallel parking maneuvers required for your skills test. Use our marked training range with cones and reference points. Practice alley docking and jackknife recovery. Build confidence before test day.",
          imageSrc: "/images/trades/program-cdl-overview.jpg",
          imageAlt: "Overhead view of truck backing maneuvers on training range"
        },
        {
          title: "Highway & City Driving",
          description: "Log 40+ hours of behind-the-wheel training on highways, city streets, and rural roads. Learn lane management, speed control, intersection navigation, and defensive driving techniques. Experience real traffic conditions with an instructor by your side.",
          imageSrc: "/images/artlist/hero-training-2.jpg",
          imageAlt: "Semi-truck on highway during training session"
        },
        {
          title: "Electronic Logs & DOT Compliance",
          description: "Master electronic logging devices (ELDs), hours of service regulations, and DOT compliance requirements. Learn load securement, weight distribution, and trip planning. Understand the business side of trucking to maximize your earning potential.",
          imageSrc: "/images/artlist/hero-training-3.jpg",
          imageAlt: "Truck driver using electronic logging device in cab"
        }
      ]}
      
      // Career Outcomes
      careerTitle="High-Demand Trucking Careers"
      careerDescription="The trucking industry needs 80,000+ new drivers annually. Our carrier partners are hiring immediately with sign-on bonuses up to $10,000. Choose between over-the-road, regional, or local routes. Many drivers earn $70K+ within their first year with experience and endorsements."
      careerImage="/images/hero-new/hero-3.jpg"
      careerImageAlt="Professional truck driver standing next to modern semi-truck"
      jobTitles={[
        "Company Driver (OTR) - $50K-$65K + Benefits",
        "Regional Driver (Home Weekly) - $55K-$70K",
        "Local Delivery Driver (Home Daily) - $45K-$60K",
        "Specialized Hauling (Tanker/Flatbed) - $65K-$85K",
        "Owner-Operator - $100K-$200K+"
      ]}
      
      // Final CTA
      finalCtaTitle="Start Driving in 4-6 Weeks"
      finalCtaDescription="Get your CDL Class A license and start earning immediately. Our carrier partners are hiring now with sign-on bonuses."
    />
  );
}
