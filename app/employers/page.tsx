import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Employers | Elevate For Humanity',
  description: 'Learn more about Employers inside the Elevate For Humanity workforce ecosystem.',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Background Image */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Business team collaboration"
          fill
          className="object-cover"
          priority quality={85} sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/85 to-slate-900/90" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl">
              Partner With Elevate For Humanity
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 drop-shadow-lg">
              Build your workforce with job-ready talent trained in high-demand skills
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/employer/jobs/new" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 text-lg shadow-2xl transition-all">
                Post a Job
              </Link>
              <Link href="/employer/candidates" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all">
                Find Candidates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience (WEX) & OJT Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6">Work Experience (WEX) & On-the-Job Training (OJT)</h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Elevate For Humanity works with workforce boards and employers to create paid work experiences and on-the-job training (OJT) tied to our programs in healthcare, trades, CDL, technology, beauty, and customer service.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-slate-700 leading-relaxed">
                As an approved <strong>ETP</strong>, <strong>WRG</strong>, <strong>JRI provider</strong> and <strong>DOL Registered Apprenticeship sponsor</strong>, we help employers:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Build entry-level talent pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Access wage reimbursements and training incentives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Connect with WEX, internships, and OJT programs through EmployIndy and WorkOne</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Design a Role</h4>
                    <p className="text-slate-700">
                      We help you define a WEX/OJT role that fits your business (e.g., Health & Safety Tech Apprentice, Logistics Assistant, Customer Service Representative, Barber Apprentice).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Match Candidates</h4>
                    <p className="text-slate-700">
                      We match students and jobseekers coming through our programs and workforce partners.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Leverage Funding</h4>
                    <p className="text-slate-700">
                      We coordinate with workforce partners to explore WEX, OJT, apprenticeship, or WRG support where available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Interested in WEX or OJT?</h3>
              <p className="text-lg mb-6">
                Email us at <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold">elevateforhumanity.edu@gmail.com</a> or call <a href="tel:317-314-3757" className="underline font-semibold">317-314-3757</a> and ask for our Employer Workforce Partnership Packet.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-4">Why Partner With Elevate For Humanity?</h2>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            We connect you with job-ready talent while reducing your hiring costs and training time.
          </p>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/images/artlist/hero-training-1.jpg" alt="Pre-Screened Candidates" fill className="object-cover" sizes="80px" quality={85} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Pre-Screened, Job-Ready Talent</h3>
              <p className="text-slate-700 leading-relaxed">
                All our graduates are pre-screened, background-checked, and trained to industry standards. They arrive on day one ready to contribute, reducing your onboarding time and training costs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/images/efh/sections/classroom.jpg" alt="Zero Recruitment Costs" fill className="object-cover" sizes="80px" quality={85} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Zero Recruitment Costs</h3>
              <p className="text-slate-700 leading-relaxed">
                No placement fees, no recruiting costs. We connect you directly with qualified candidates at no charge. Our funding comes from government workforce programs, not employer fees.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/images/artlist/hero-training-1.jpg" alt="Industry-Specific Training" fill className="object-cover" sizes="80px" quality={85} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Industry-Specific Training</h3>
              <p className="text-slate-700 leading-relaxed">
                Our programs are designed with employer input. Students learn the exact skills, tools, and processes your industry requires—not outdated textbook curriculum.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/images/artlist/hero-training-1.jpg" alt="Wage Reimbursement Programs" fill className="object-cover" sizes="80px" quality={85} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Wage Reimbursement Programs</h3>
              <p className="text-slate-700 leading-relaxed">
                Access WEX, OJT, and apprenticeship programs that reimburse up to 50% of wages during training periods. We handle all the paperwork and coordination with workforce boards.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/images/artlist/hero-training-1.jpg" alt="Ongoing Support" fill className="object-cover" sizes="80px" quality={85} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Ongoing Support</h3>
              <p className="text-slate-700 leading-relaxed">
                We don't disappear after placement. Our team provides ongoing support to both employers and employees, addressing any issues that arise and ensuring long-term success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 shadow-lg">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src="/images/artlist/hero-training-1.jpg" alt="Diverse Talent Pool" fill className="object-cover" sizes="80px" quality={85} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Diverse Talent Pool</h3>
              <p className="text-slate-700 leading-relaxed">
                We serve diverse populations including returning citizens, veterans, single parents, and career changers. Build a workforce that reflects your community while meeting diversity goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16">Industries We Serve</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Healthcare</h3>
              <p className="text-slate-600 text-sm">CNAs, Medical Assistants, Phlebotomists, Dental Assistants</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>
              <p className="text-slate-600 text-sm">HVAC, Electrical, Plumbing, Welding, Construction</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Transportation</h3>
              <p className="text-slate-600 text-sm">CDL Drivers, Logistics, Warehouse, Forklift Operators</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Technology</h3>
              <p className="text-slate-600 text-sm">IT Support, Cybersecurity, Web Development, Data Analytics</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Beauty & Wellness</h3>
              <p className="text-slate-600 text-sm">Barbers, Cosmetologists, Estheticians, Nail Technicians</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Business Services</h3>
              <p className="text-slate-600 text-sm">Customer Service, Administrative, Bookkeeping, Sales</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Manufacturing</h3>
              <p className="text-slate-600 text-sm">Production Workers, Quality Control, Machine Operators</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Hospitality</h3>
              <p className="text-slate-600 text-sm">Culinary, Hotel Management, Event Planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Build Your Workforce?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join over 100 employers who trust Elevate For Humanity to connect them with job-ready talent.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-10 py-5 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg">
              Contact Us Today
            </Link>
            <Link href="/employer/jobs/new" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 border-2 border-white transition-all shadow-2xl text-lg">
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
