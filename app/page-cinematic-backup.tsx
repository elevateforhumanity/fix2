// app/page.tsx
import { HeroCarousel } from "@/components/marketing/HeroCarousel";
import { VideoStrip } from "@/components/marketing/VideoStrip";
import { ProgramCatalog } from "@/components/marketing/ProgramCatalog";
import { PhotoCTA } from "@/components/marketing/PhotoCTA";
import { HowItWorksAndPlatform } from "@/components/marketing/HowItWorksAndPlatform";
import { SuccessStories } from "@/components/marketing/SuccessStories";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { FadeInSection } from "@/components/marketing/FadeInSection";

export default function MarketingHomePage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Rotating animated hero – bright */}
      <HeroCarousel />

      {/* Sections fade/slide in as you scroll */}
      <FadeInSection>
        <VideoStrip />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <ProgramCatalog />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <PhotoCTA />
      </FadeInSection>

      <FadeInSection delay={0.15}>
        <HowItWorksAndPlatform />
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <SuccessStories />
      </FadeInSection>

      <FadeInSection delay={0.25}>
        <FinalCTA />
      </FadeInSection>
    </main>
  );
}

      {/* HERO SECTION - Full Width Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Future<br />
            <span className="text-blue-400">With Funded Training</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            100% funded career training programs. Earn while you learn. Real jobs that change lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Explore Programs
            </Link>
            <Link
              href="/financial-aid"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Check Funding Options
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* FOUR PANEL STRIP - Full Width */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PanelCard
              title="Earn While You Learn"
              description="Get paid during your training through apprenticeships"
              image="/images/earn-learn.jpg"
              cinematic
            />
            <PanelCard
              title="100% Funded Pathways"
              description="WIOA, JRI, and OJT funding available"
              image="/images/funding.jpg"
              bright
            />
            <PanelCard
              title="Real People. Real Support."
              description="Dedicated coaches guide you every step"
              image="/images/support.jpg"
              cinematic
            />
            <PanelCard
              title="Jobs That Change Lives"
              description="Direct pathways to in-demand careers"
              image="/images/careers.jpg"
              bright
            />
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID - Boxed Container */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Career Training Programs</h2>
            <p className="text-xl text-slate-600">Choose your path to success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProgramCard
              title="Medical Assistant"
              category="Healthcare"
              duration="8 weeks"
              type="bright"
              href="/programs/medical-assistant"
            />
            <ProgramCard
              title="Barber Apprenticeship"
              category="Skilled Trade"
              duration="12 months"
              type="cinematic"
              href="/programs/barber"
            />
            <ProgramCard
              title="Esthetician"
              category="Beauty & Wellness"
              duration="10 weeks"
              type="bright"
              href="/programs/esthetician"
            />
            <ProgramCard
              title="HVAC Technician"
              category="Skilled Trade"
              duration="6 months"
              type="cinematic"
              href="/programs/hvac"
            />
            <ProgramCard
              title="Reentry Specialist"
              category="Social Services"
              duration="10 weeks"
              type="cinematic"
              href="/programs/reentry"
            />
            <ProgramCard
              title="CPR/AED/First Aid"
              category="Healthcare"
              duration="1 day"
              type="bright"
              href="/programs/cpr"
            />
            <ProgramCard
              title="Home Health Aide"
              category="Healthcare"
              duration="6 weeks"
              type="bright"
              href="/programs/hha"
            />
            <ProgramCard
              title="Tax Prep & Financial"
              category="Business"
              duration="8 weeks"
              type="bright"
              href="/programs/tax-prep"
            />
            <ProgramCard
              title="Business Startup"
              category="Entrepreneurship"
              duration="6 weeks"
              type="bright"
              href="/programs/business"
            />
            <ProgramCard
              title="Emergency Health Safety"
              category="Healthcare"
              duration="2 weeks"
              type="cinematic"
              href="/programs/emergency-health"
            />
            <ProgramCard
              title="Beauty Educator"
              category="Beauty & Wellness"
              duration="12 weeks"
              type="bright"
              href="/programs/beauty-educator"
            />
            <ProgramCard
              title="Workforce Readiness"
              category="Professional Development"
              duration="4 weeks"
              type="bright"
              href="/programs/workforce-readiness"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              View All Programs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* EARN WHILE YOU LEARN - Full Width Cinematic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Paid While You Train
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Our apprenticeship programs let you earn a paycheck while learning valuable skills. 
                No student debt. Real experience. Real income.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Earn $15-25/hour during training</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Hands-on experience with real employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Job placement upon completion</span>
                </li>
              </ul>
              <Link
                href="/programs/apprenticeships"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Explore Apprenticeships
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                <Users className="h-24 w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING SECTION - Boxed Container Bright */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              100% Funded Training Options
            </h2>
            <p className="text-xl text-slate-600">
              Multiple funding sources to remove financial barriers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FundingCard
              title="WIOA Funding"
              description="Workforce Innovation & Opportunity Act funding for eligible adults"
              icon={<GraduationCap className="h-8 w-8" />}
            />
            <FundingCard
              title="JRI Programs"
              description="Justice-involved reentry support and training funding"
              icon={<Users className="h-8 w-8" />}
            />
            <FundingCard
              title="OJT Programs"
              description="On-the-Job Training with employer partnerships"
              icon={<Briefcase className="h-8 w-8" />}
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/financial-aid"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Check Your Eligibility
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES - Full Width Cinematic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Real People. Real Success.</h2>
            <p className="text-xl text-gray-200">Lives transformed through training and opportunity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <SuccessStoryCard
              name="Marcus Johnson"
              program="Barber Apprenticeship"
              quote="I went from unemployed to owning my own chair in 12 months."
              image="/images/marcus.jpg"
            />
            <SuccessStoryCard
              name="Sarah Williams"
              program="Medical Assistant"
              quote="Now I have a career I'm proud of and can support my family."
              image="/images/sarah.jpg"
            />
            <SuccessStoryCard
              name="James Rodriguez"
              program="HVAC Technician"
              quote="The hands-on training prepared me for real-world work."
              image="/images/james.jpg"
            />
          </div>
        </div>
      </section>

      {/* EMPLOYER PARTNERSHIPS - Boxed Container Bright */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Employer Partnerships
            </h2>
            <p className="text-xl text-slate-600">
              Direct pipelines to hiring companies
            </p>
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Hire Trained, Job-Ready Talent
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-slate-700">Pre-screened candidates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-slate-700">Industry-specific training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-slate-700">Ongoing support services</span>
                  </li>
                </ul>
                <Link
                  href="/employers"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Partner With Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Briefcase className="h-24 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Full Width */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Take the first step toward a better future. Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all border-2 border-white"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Programs */}
            <div>
              <h3 className="text-lg font-bold mb-4">Programs</h3>
              <ul className="space-y-2">
                <li><Link href="/programs/medical-assistant" className="text-gray-400 hover:text-white transition-colors">Medical Assistant</Link></li>
                <li><Link href="/programs/barber" className="text-gray-400 hover:text-white transition-colors">Barber Apprenticeship</Link></li>
                <li><Link href="/programs/hvac" className="text-gray-400 hover:text-white transition-colors">HVAC Technician</Link></li>
                <li><Link href="/programs/hha" className="text-gray-400 hover:text-white transition-colors">Home Health Aide</Link></li>
                <li><Link href="/programs" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">View All Programs →</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/financial-aid" className="text-gray-400 hover:text-white transition-colors">Financial Aid</Link></li>
                <li><Link href="/workforce-partners" className="text-gray-400 hover:text-white transition-colors">Workforce Partners</Link></li>
                <li><Link href="/employers" className="text-gray-400 hover:text-white transition-colors">For Employers</Link></li>
                <li><Link href="/success-stories" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link href="/about#team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Indianapolis, IN</li>
                <li>Phone: (317) 555-0100</li>
                <li>Email: elevate4humanityedu@gmail.com</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/apply"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 Elevate For Humanity. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PanelCard({ title, description, image, cinematic, bright }: any) {
  return (
    <div className={`relative h-80 rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
      cinematic ? 'shadow-2xl hover:shadow-3xl' : 'shadow-lg hover:shadow-xl'
    }`}>
      <div className={`absolute inset-0 ${
        cinematic 
          ? 'bg-gradient-to-br from-slate-900 to-blue-900' 
          : 'bg-gradient-to-br from-blue-50 to-white'
      }`}>
        <div className={`absolute inset-0 ${
          cinematic ? 'bg-black/50' : 'bg-white/80'
        } group-hover:bg-black/30 transition-all duration-300`}></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end p-6 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
        <h3 className={`text-2xl font-bold mb-2 ${
          cinematic ? 'text-white' : 'text-slate-900'
        }`}>{title}</h3>
        <p className={`${
          cinematic ? 'text-gray-200' : 'text-slate-600'
        }`}>{description}</p>
      </div>
    </div>
  );
}

function ProgramCard({ title, category, duration, type, href }: any) {
  const isCinematic = type === 'cinematic';
  
  return (
    <Link href={href} className="block group">
      <div className={`h-full rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
        isCinematic 
          ? 'bg-gradient-to-br from-slate-900 to-blue-900 shadow-2xl hover:shadow-3xl' 
          : 'bg-white shadow-lg hover:shadow-xl'
      }`}>
        <div className={`h-48 ${
          isCinematic ? 'bg-slate-800' : 'bg-blue-50'
        } flex items-center justify-center`}>
          <GraduationCap className={`h-16 w-16 ${
            isCinematic ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-medium ${
              isCinematic ? 'text-blue-400' : 'text-blue-600'
            }`}>{category}</span>
            <span className={`text-sm ${
              isCinematic ? 'text-gray-400' : 'text-slate-500'
            }`}>• {duration}</span>
          </div>
          <h3 className={`text-xl font-bold mb-3 ${
            isCinematic ? 'text-white' : 'text-slate-900'
          }`}>{title}</h3>
          <div className={`flex items-center gap-2 ${
            isCinematic ? 'text-blue-400' : 'text-blue-600'
          } font-medium group-hover:gap-3 transition-all`}>
            Learn More
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function FundingCard({ title, description, icon }: any) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 transform hover:scale-105">
      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function SuccessStoryCard({ name, program, quote, image }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:border-white/40">
      <div className="w-20 h-20 bg-blue-600 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:bg-blue-500">
        {name.charAt(0)}
      </div>
      <p className="text-xl text-white mb-6 italic leading-relaxed">"{quote}"</p>
      <div>
        <h4 className="text-lg font-bold text-white">{name}</h4>
        <p className="text-blue-300">{program}</p>
      </div>
    </div>
  );
}
