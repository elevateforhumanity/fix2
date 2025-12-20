import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Play,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Compare Career Training Programs | Find Your Perfect Path | Elevate for Humanity',
  description:
    'Compare 28+ free career training programs side-by-side. See salaries, duration, certifications, and job outcomes for healthcare, trades, and beauty careers.',
  keywords:
    'compare training programs, career comparison, healthcare vs trades, CNA vs medical assistant, welding vs HVAC, free training comparison',
  openGraph: {
    title: 'Compare Career Training Programs - Find Your Best Fit',
    description:
      'Side-by-side comparison of 28+ free training programs. See which career path offers the best salary, fastest completion, and highest job placement.',
    url: 'https://www.elevateforhumanity.org/compare-programs',
    siteName: 'Elevate for Humanity',
    images: [
      {
        url: 'https://www.elevateforhumanity.org/og-compare-programs.jpg',
        width: 1200,
        height: 630,
        alt: 'Compare Career Training Programs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  alternates: {
    canonical: 'https://www.elevateforhumanity.org/compare-programs',
  },
};

// Program comparison data
const programs = [
  {
    id: 'cna',
    name: 'Certified Nursing Assistant (CNA)',
    category: 'Healthcare',
    duration: '4-6 weeks',
    hours: 120,
    cost: '$0 (100% funded)',
    salary: { min: 32000, max: 42000, avg: 37000 },
    certifications: ['State CNA License', 'CPR Certification', 'First Aid'],
    jobTitles: [
      'Certified Nursing Assistant',
      'Patient Care Technician',
      'Home Health Aide',
    ],
    employmentRate: 95,
    prerequisites: [
      'High school diploma or GED',
      '18 years or older',
      'Background check',
    ],
    topEmployers: [
      'IU Health',
      'Community Health Network',
      'Eskenazi Health',
      'Franciscan Health',
    ],
    weeklyHours: 30,
    difficulty: 'Beginner',
    physicalDemand: 'High',
    image: '/media-backup-20251128-043832/programs/cna-hd.jpg',
    videoUrl: 'https://www.youtube.com/embed/cna-program-overview',
  },
  {
    id: 'direct-support-professional',
    name: 'Direct Support Professional (DSP)',
    category: 'Healthcare',
    duration: '8-12 weeks',
    hours: 240,
    cost: '$0 (100% funded)',
    salary: { min: 35000, max: 45000, avg: 40000 },
    certifications: [
      'CDSP (Certified Direct Support Professional)',
      'CPR/BLS',
      'First Aid',
    ],
    jobTitles: [
      'Direct Support Professional',
      'Behavioral Health Technician',
      'Residential Support Specialist',
    ],
    employmentRate: 92,
    prerequisites: ['High school diploma or GED', '18 years or older'],
    topEmployers: [
      'Community Health Network',
      'Residential Care Facilities',
      'Behavioral Health Centers',
    ],
    weeklyHours: 35,
    difficulty: 'Intermediate',
    physicalDemand: 'Medium',
    image: '/media-backup-20251128-043832/programs/medical-hd.jpg',
    videoUrl: 'https://www.youtube.com/embed/dsp-program-overview',
  },
  {
    id: 'welding',
    name: 'Welding Technology',
    category: 'Skilled Trades',
    duration: '12-16 weeks',
    hours: 480,
    cost: '$0 (100% funded)',
    salary: { min: 45000, max: 65000, avg: 55000 },
    certifications: [
      'AWS D1.1 Structural Welding',
      'SMAW Certification',
      'GMAW Certification',
      'FCAW Certification',
    ],
    jobTitles: [
      'Certified Welder',
      'Structural Welder',
      'Pipe Welder',
      'Fabrication Welder',
    ],
    employmentRate: 97,
    prerequisites: [
      '18 years or older',
      'Physical ability to lift 50 lbs',
      'Good vision',
    ],
    topEmployers: [
      'Cummins',
      'Rolls-Royce',
      'Caterpillar',
      'Local Fabrication Shops',
    ],
    weeklyHours: 40,
    difficulty: 'Intermediate',
    physicalDemand: 'High',
    image: '/media-backup-20251128-043832/programs/welding-hd.jpg',
    videoUrl: 'https://www.youtube.com/embed/welding-program-overview',
  },
  {
    id: 'hvac',
    name: 'HVAC Technician',
    category: 'Skilled Trades',
    duration: '12-16 weeks',
    hours: 480,
    cost: '$0 (100% funded)',
    salary: { min: 42000, max: 62000, avg: 52000 },
    certifications: [
      'EPA 608 Universal Certification',
      'OSHA 10',
      'R-410A Certification',
    ],
    jobTitles: [
      'HVAC Technician',
      'HVAC Installer',
      'Service Technician',
      'Maintenance Technician',
    ],
    employmentRate: 94,
    prerequisites: [
      '18 years or older',
      "Valid driver's license",
      'Physical ability',
    ],
    topEmployers: [
      'Carrier',
      'Trane',
      'Local HVAC Companies',
      'Property Management',
    ],
    weeklyHours: 40,
    difficulty: 'Intermediate',
    physicalDemand: 'High',
    image: '/media-backup-20251128-043832/programs/hvac-hd.jpg',
    videoUrl: 'https://www.youtube.com/embed/hvac-program-overview',
  },
  {
    id: 'barber',
    name: 'Professional Barber',
    category: 'Beauty & Personal Care',
    duration: '12-16 weeks',
    hours: 1500,
    cost: '$0 (100% funded)',
    salary: { min: 35000, max: 60000, avg: 45000 },
    certifications: [
      'Indiana State Barber License',
      'Sanitation Certification',
      'First Aid',
    ],
    jobTitles: [
      'Licensed Barber',
      'Master Barber',
      'Barber Shop Owner',
      'Mobile Barber',
    ],
    employmentRate: 89,
    prerequisites: ['16 years or older', 'High school diploma or GED'],
    topEmployers: [
      'Self-Employed',
      'Sport Clips',
      'Great Clips',
      'Independent Shops',
    ],
    weeklyHours: 35,
    difficulty: 'Intermediate',
    physicalDemand: 'Low',
    image: '/media-backup-20251128-043832/programs/barber-hd.jpg',
    videoUrl: 'https://www.youtube.com/embed/barber-program-overview',
  },
  {
    id: 'cdl',
    name: "Commercial Driver's License (CDL)",
    category: 'Transportation',
    duration: '4-6 weeks',
    hours: 160,
    cost: '$0 (100% funded)',
    salary: { min: 45000, max: 75000, avg: 60000 },
    certifications: ['CDL Class A', 'Hazmat Endorsement', 'Tanker Endorsement'],
    jobTitles: [
      'Truck Driver',
      'Delivery Driver',
      'Long-Haul Driver',
      'Local Driver',
    ],
    employmentRate: 98,
    prerequisites: [
      '21 years or older',
      "Valid driver's license",
      'Clean driving record',
      'DOT physical',
    ],
    topEmployers: ['Schneider', 'Werner', 'J.B. Hunt', 'Local Carriers'],
    weeklyHours: 50,
    difficulty: 'Beginner',
    physicalDemand: 'Medium',
    image: '/media-backup-20251128-043832/programs/cdl-hd.jpg',
    videoUrl: 'https://www.youtube.com/embed/cdl-program-overview',
  },
];

// Success stories
const successStories = [
  {
    name: 'Sarah Martinez',
    program: 'CNA',
    image: '/testimonials/sarah.jpg',
    quote:
      "I was unemployed for 8 months. WIOA paid for my CNA training, and I earned $18/hour during my apprenticeship. Now I'm making $42,000 a year with full benefits at IU Health.",
    outcome: 'Employed in 2 weeks',
    salary: '$42,000/year',
    employer: 'IU Health',
  },
  {
    name: 'Marcus Johnson',
    program: 'Welding',
    image: '/testimonials/marcus.jpg',
    quote:
      'The welding program changed my life. I went from minimum wage to $28/hour. The instructors were amazing and the hands-on training was exactly what I needed.',
    outcome: 'Employed before graduation',
    salary: '$58,000/year',
    employer: 'Cummins',
  },
  {
    name: 'Jennifer Williams',
    program: 'Medical Assistant',
    image: '/testimonials/jennifer.jpg',
    quote:
      "As a single mom, I couldn't afford college. This program gave me a career path and I earned while I learned. Now I support my family comfortably.",
    outcome: 'Employed in 1 week',
    salary: '$44,000/year',
    employer: 'Community Health Network',
  },
];

export default function CompareProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Compare Programs"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Compare Programs
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Compare Career Training Programs',
            description:
              'Compare 28+ free career training programs side-by-side',
            url: 'https://www.elevateforhumanity.org/compare-programs',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.elevateforhumanity.org',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Compare Programs',
                  item: 'https://www.elevateforhumanity.org/compare-programs',
                },
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="   text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Compare Career Training Programs
            </h1>
            <p className="text-base md:text-lg mb-8 text-orange-100">
              Find your perfect career path. Compare salaries, duration,
              certifications, and job outcomes across 28+ programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-brand-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors button-scale"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="#comparison"
                className="bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-800 transition-colors border-2 border-white"
              >
                See Comparison
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                28+
              </div>
              <div className="text-slate-600">Programs Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                $0
              </div>
              <div className="text-slate-600">Tuition Cost</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                95%
              </div>
              <div className="text-slate-600">Employment Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                $45K
              </div>
              <div className="text-slate-600">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              How to Choose Your Program
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Watch this 3-minute guide to find your perfect career path
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-brand-orange-600 rounded-full flex items-center justify-center hover:bg-brand-orange-700 transition-colors button-scale">
                  <Play className="w-10 h-10 text-white ml-1" />
                </button>
              </div>
              {/* Replace with actual video embed */}
              <Image
                src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                alt="Program comparison video"
                fill
                className="object-cover opacity-50"
                sizes="100vw"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              Side-by-Side Comparison
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Compare programs by salary, duration, and requirements
            </p>
          </div>

          {/* Mobile: Card View */}
          <div className="md:hidden space-y-6">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={100}
                  />
                  <div className="absolute top-4 right-4 bg-brand-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {program.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-lg font-bold mb-4">
                    {program.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-brand-green-600" />
                      <span className="font-semibold">
                        ${program.salary.min.toLocaleString()} - $
                        {program.salary.max.toLocaleString()}/year
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-brand-blue-600" />
                      <span>
                        {program.duration} ({program.hours} hours)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-orange-600" />
                      <span>{program.employmentRate}% Employment Rate</span>
                    </div>
                  </div>

                  <Link
                    href={`/programs/${program.id}`}
                    className="block w-full text-center bg-brand-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-orange-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Program</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Salary Range</th>
                  <th className="px-6 py-4 text-left">Employment Rate</th>
                  <th className="px-6 py-4 text-left">Difficulty</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr
                    key={program.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={program.image}
                            alt={program.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            quality={100}
                          />
                        </div>
                        <div>
                          <div className="font-bold">{program.name}</div>
                          <div className="text-sm text-slate-600">
                            {program.hours} hours
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {program.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{program.duration}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-green-600">
                        ${program.salary.min.toLocaleString()} - $
                        {program.salary.max.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">
                        Avg: ${program.salary.avg.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-brand-green-600 h-2 rounded-full"
                            style={{ width: `${program.employmentRate}%` }}
                          />
                        </div>
                        <span className="font-bold">
                          {program.employmentRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          program.difficulty === 'Beginner'
                            ? 'bg-brand-green-100 text-green-800'
                            : program.difficulty === 'Intermediate'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {program.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/programs/${program.id}`}
                        className="inline-block bg-brand-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-orange-700 transition-colors text-sm"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              Real Success Stories
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              See how our graduates transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full    flex items-center justify-center text-white text-2xl font-bold">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{story.name}</div>
                      <div className="text-slate-600">
                        {story.program} Graduate
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-700 mb-6 italic">"{story.quote}"</p>

                  <div className="space-y-2 pt-6 border-t border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Outcome:</span>
                      <span className="font-bold text-brand-green-600">
                        {story.outcome}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Salary:</span>
                      <span className="font-bold">{story.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Employer:</span>
                      <span className="font-bold">{story.employer}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16    text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold mb-6 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Ready to Start Your Career?
          </h2>
          <p className="text-base md:text-lg mb-8 text-orange-100">
            Apply now and get started with 100% free training
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-brand-orange-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-orange-50 transition-colors button-scale shadow-2xl"
          >
            Apply Now - It's Free →
          </Link>
          <p className="mt-6 text-orange-100">
            Questions? Call us at (317) 314-3757
          </p>
        </div>
      </section>
    </div>
  );
}
