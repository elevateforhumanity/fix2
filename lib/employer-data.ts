// Mock employer data - replace with Supabase queries in production

export interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string;
  benefits?: string;
  posted: string;
  applications: number;
  status: 'active' | 'closed' | 'draft';
}

export interface JobApplication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'offered' | 'rejected';
  resume?: string;
  coverLetter?: string;
}

export interface EmployerProfile {
  id: string;
  companyName: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  description: string;
}

export async function getEmployerProfile(employerId: string): Promise<EmployerProfile> {
  // TODO: Replace with actual Supabase query
  return {
    id: employerId,
    companyName: 'ABC Manufacturing',
    industry: 'Manufacturing',
    size: '50-200 employees',
    location: 'Milwaukee, WI',
    website: 'https://abcmanufacturing.com',
    description: 'Leading manufacturer of industrial equipment',
  };
}

export async function getEmployerJobs(employerId: string): Promise<JobPosting[]> {
  // TODO: Replace with actual Supabase query
  return [
    {
      id: '1',
      title: 'HVAC Technician',
      location: 'Milwaukee, WI',
      type: 'full-time',
      salary: '$45,000 - $55,000',
      description: 'Install and maintain HVAC systems',
      requirements: 'EPA 608 certification, 2+ years experience',
      benefits: 'Health insurance, 401(k), paid time off',
      posted: '2024-02-10',
      applications: 15,
      status: 'active',
    },
  ];
}

export async function getJobApplications(jobId: string): Promise<JobApplication[]> {
  // TODO: Replace with actual Supabase query
  return [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.j@example.com',
      position: 'HVAC Technician',
      appliedDate: '2024-02-15',
      status: 'new',
    },
  ];
}
