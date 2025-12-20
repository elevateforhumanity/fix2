import { Metadata } from 'next';
import Link from 'next/link';
import { NewsClient } from './NewsClient';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: 'News & Updates | Elevate for Humanity',
  description:
    'Latest news, program updates, success stories, and community impact from Elevate for Humanity',
};

const newsArticles = [
  {
    id: 1,
    title:
      'New Direct Support Professional (DSP) Program Launches January 2025',
    slug: 'dsp-program-launch',
    excerpt:
      "We're excited to announce our newest program: Direct Support Professional (DSP) training. This 10-week program prepares students for careers in behavioral health and caregiving with 100% funding available.",
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-1.jpg',
    category: 'Program Updates',
    author: 'Elevate Team',
    date: '2024-12-10',
    featured: true,
  },
  {
    id: 2,
    title: 'Celebrating 1,000 Graduates: A Major Milestone',
    slug: '1000-graduates-milestone',
    excerpt:
      "This month we celebrated our 1,000th graduate! Since opening, we've helped over 1,000 individuals launch new careers with an 87% employment rate.",
    content: 'Full article content here...',
    image: '/images/learners/reentry-coaching.jpg',
    category: 'Community Impact',
    author: 'Sarah Johnson',
    date: '2024-12-05',
    featured: true,
  },
  {
    id: 3,
    title: 'Partnership Announcement: Community Health Network',
    slug: 'community-health-partnership',
    excerpt:
      "We're proud to announce a new partnership with Community Health Network, creating direct hiring pathways for our CNA and Medical Assistant graduates.",
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-2.jpg',
    category: 'Partner Spotlights',
    author: 'Elevate Team',
    date: '2024-11-28',
    featured: false,
  },
  {
    id: 4,
    title: "Student Spotlight: Marcus Thompson's Journey",
    slug: 'marcus-thompson-success-story',
    excerpt:
      'From incarceration to career success: How Marcus transformed his life through our Public Safety & Reentry Specialist program and now helps others do the same.',
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-3.jpg',
    category: 'Success Stories',
    author: 'Maria Garcia',
    date: '2024-11-20',
    featured: false,
  },
  {
    id: 5,
    title: 'JRI Program Expansion: Serving More Justice-Involved Individuals',
    slug: 'jri-program-expansion',
    excerpt:
      "Thanks to increased funding, we're expanding our Justice Reinvestment Initiative programs to serve 50% more students in 2025.",
    content: 'Full article content here...',
    image: '/images/funding/funding-jri-program-v2.jpg',
    category: 'Program Updates',
    author: 'Elevate Team',
    date: '2024-11-15',
    featured: false,
  },
  {
    id: 6,
    title: 'Hiring Event Success: 50 Jobs Filled in One Day',
    slug: 'hiring-event-november-2024',
    excerpt:
      'Our November hiring event connected 50 graduates with employers. Over 20 companies participated, offering positions in healthcare, transportation, and skilled trades.',
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-4.jpg',
    category: 'Community Impact',
    author: 'David Chen',
    date: '2024-11-10',
    featured: false,
  },
  {
    id: 7,
    title: 'New Funding Opportunities Available for 2025',
    slug: 'new-funding-2025',
    excerpt:
      'Additional WIOA and WRG funding secured for 2025, meaning more students can access 100% free training. Apply now to secure your spot.',
    content: 'Full article content here...',
    image: '/images/general/workforce-development.png',
    category: 'Program Updates',
    author: 'Elevate Team',
    date: '2024-11-01',
    featured: false,
  },
  {
    id: 8,
    title: 'CDL Program Achieves 95% Pass Rate',
    slug: 'cdl-program-success',
    excerpt:
      'Our CDL training program maintains a 95% first-time pass rate on state licensing exams, well above the national average of 70%.',
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-5.jpg',
    category: 'Program Updates',
    author: 'Tom Williams',
    date: '2024-10-25',
    featured: false,
  },
  {
    id: 9,
    title: 'Community Impact Report: 2024 Year in Review',
    slug: 'community-impact-2024',
    excerpt:
      'Our 2024 impact: 1,200+ students served, 87% employment rate, $42K average starting salary, and 150+ employer partnerships.',
    content: 'Full article content here...',
    image: '/images/homepage/workforce-pathway-ecosystem.png',
    category: 'Community Impact',
    author: 'Elevate Team',
    date: '2024-10-15',
    featured: false,
  },
  {
    id: 10,
    title: 'Holiday Schedule & Upcoming Classes',
    slug: 'holiday-schedule-2024',
    excerpt:
      'Our holiday schedule and January 2025 class start dates. New cohorts starting in CNA, CDL, HVAC, and Medical Assistant programs.',
    content: 'Full article content here...',
    image: '/images/facilities-new/facility-1.jpg',
    category: 'Announcements',
    author: 'Elevate Team',
    date: '2024-10-10',
    featured: false,
  },
];

const categories = [
  'All',
  'Program Updates',
  'Success Stories',
  'Community Impact',
  'Partner Spotlights',
  'Announcements',
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              News & Updates
            </h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              Stay informed about program updates, success stories, and
              community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Client-side interactive content */}
      <NewsClient newsArticles={newsArticles} categories={categories} />

      {/* Newsletter CTA */}
      <section className="py-16 bg-white text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Subscribe to our newsletter for the latest news, program updates,
              and success stories.
            </p>
            <Link
              href="#newsletter"
              className="inline-block px-8 py-4 bg-white text-brand-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
