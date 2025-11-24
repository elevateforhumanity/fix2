import Link from 'next/link';
import { Briefcase, MapPin, DollarSign, Clock, Building, ArrowRight } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Medical Assistant',
    company: 'Community Health Network',
    location: 'Indianapolis, IN',
    salary: '$32,000 - $38,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Seeking certified Medical Assistant for busy family practice.'
  },
  {
    id: 2,
    title: 'HVAC Technician',
    company: 'Carrier Corporation',
    location: 'Indianapolis, IN',
    salary: '$40,000 - $55,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Experienced HVAC tech needed for residential and commercial service.'
  },
  {
    id: 3,
    title: 'Licensed Barber',
    company: 'The Barber Shop',
    location: 'Indianapolis, IN',
    salary: '$35,000 - $50,000',
    type: 'Full-time / Commission',
    posted: '5 days ago',
    description: 'Join our team! Chair rental or commission available.'
  },
  {
    id: 4,
    title: 'Building Maintenance Technician',
    company: 'Simon Property Group',
    location: 'Indianapolis, IN',
    salary: '$38,000 - $45,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Maintain commercial properties, HVAC, electrical, plumbing.'
  }
];

export default function JobBoardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Briefcase className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Job Board</h1>
          <p className="text-xl text-blue-50">Exclusive opportunities for our graduates</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h2>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Building size={16} />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {job.type}
                </span>
              </div>
              <p className="text-slate-700 mb-4">{job.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <DollarSign size={16} />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock size={16} />
                    {job.posted}
                  </span>
                </div>
                <Link
                  href={`/careers/job-board/${job.id}`}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Apply Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
