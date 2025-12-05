import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Leadership & Support Team | Elevate For Humanity',
  description: 'Meet the leadership team bringing decades of experience in workforce development, healthcare, beauty, trades, and education.',
};

const teamMembers = [
  {
    name: "Elizabeth Greene",
    title: "Chief Executive Officer",
    image: "/images/elizabeth-greene-founder.jpg",
    bio: "Elizabeth Greene is a visionary workforce architect and community advocate committed to creating equitable pathways for individuals and families across Indiana. As Chief Executive Officer of Elevate for Humanity Technical & Career Institute, she leads with purpose, compassion, and a strong belief in transforming communities through education, empowerment, and access. Under her leadership, Elevate has become a federal and state–aligned Registered Apprenticeship sponsor, fully approved on RAPIDS, fundable on the ETPL, and eligible for WIOA, WRG, and JRI funding. Elizabeth's mission is simple: build pathways, remove barriers, and elevate humanity—one life at a time."
  },
  {
    name: "Dr. Carlina Annette Wilkes",
    title: "Executive Director, Financial Operations & Compliance",
    image: "/images/carlina-wilkes.jpg",
    bio: "Dr. Carlina Annette Wilkes is a highly accomplished executive and retired federal professional with more than 24 years of distinguished service at the Defense Finance and Accounting Service (DFAS). She brings deep expertise in financial management, organizational compliance, workforce development, and strategic program oversight. Holding a Doctorate in Ministry, a Master of Arts in Ministry, a Bachelor of Applied Management, and technical credentials in Accounting and Paralegal Studies, Dr. Wilkes helps ensure Elevate operates with integrity, accountability, and excellence across all programs and partnerships."
  },
  {
    name: "Clystjah Woodley",
    title: "Life Coach & Student Success Coach",
    image: "/images/clystjah-woodley.jpg",
    bio: "Clystjah Woodley is a compassionate Life Coach dedicated to helping individuals heal, grow, and move forward with confidence. She supports Elevate learners with mindset coaching, accountability, and emotional wellness, creating safe spaces where students feel seen, heard, and supported as they work toward their goals."
  },
  {
    name: "Delores Reynolds",
    title: "Social Media Director",
    image: "/images/delores-reynolds.jpg",
    bio: "Delores Reynolds is a creative digital strategist who tells Elevate's story across social platforms. She transforms complex programs and real student success stories into engaging content that informs, inspires, and connects with the community—helping more people discover free training, funding options, and career pathways."
  },
  {
    name: "Johanna George",
    title: "Beauty Programs Director",
    image: "/images/jozanna-george.jpg",
    bio: "With more than 20 years as a licensed Nail Technician and Esthetician and seven years running a beauty school, Johanna George brings deep industry experience to Elevate's beauty and barber programs. As Beauty Programs Director, she oversees curriculum quality, enrollment support, and student readiness for licensure and salon, spa, or suite-based careers."
  },
  {
    name: "Sharon Douglass",
    title: "Respiratory Therapy & Health Informatics Specialist",
    image: "/images/sharon-douglas.jpg",
    bio: "A Respiratory Therapist with over 30 years of experience and a Master's in Health Informatics, Sharon Douglass supports Elevate's healthcare training and curriculum design. She combines front-line clinical experience with data-informed decision-making to help shape programs that are safe, current, and aligned with real-world healthcare needs."
  },
  {
    name: "Alina Smith, PMHNP",
    title: "Psychiatric Nurse Practitioner (Partner Provider)",
    image: "/images/alina-smith.jpg",
    bio: "Alina Smith is a board-certified Psychiatric Mental Health Nurse Practitioner who provides comprehensive mental health care for individuals ages five and older. As a partner provider, she supports Elevate's commitment to trauma-informed, whole-person services by offering psychiatric assessment, behavioral health interventions, and medication management when needed."
  },
  {
    name: "Ameco Martin",
    title: "Workforce Development Specialist",
    image: "/images/ameco-martin.jpg",
    bio: "Ameco Martin brings expertise in connecting individuals with career opportunities and workforce resources. He works closely with students to identify pathways, remove barriers, and build sustainable employment outcomes."
  },
  {
    name: "Leslie Wafford",
    title: "Student Support Coordinator",
    image: "/images/leslie-wafford.jpg",
    bio: "Leslie Wafford provides wraparound support services to help students overcome challenges and stay on track. From navigating funding to addressing personal barriers, Leslie ensures every student has the resources they need to succeed."
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
            alt="Elevate For Humanity Leadership Team"
            fill
            className="object-cover"
            priority 
            quality={85} 
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/85 to-slate-900/90" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Our Leadership & Support Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              People don't just need programs—they need people who care. Our team brings decades of experience in workforce development, mental health, healthcare, beauty, trades, and education to every learner we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                  <p className="text-xl text-red-600 font-semibold mb-4">{member.title}</p>
                  <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-banner.jpg"
            alt="Join our team"
            fill
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/95 to-red-700/95" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Our team is here to support you every step of the way
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-red-600 px-10 py-5 rounded-full font-bold hover:bg-red-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Contact Us
              </Link>
            </div>
            
            <p className="text-white/90 mt-8 text-sm">
              Questions? Call <a href="tel:317-314-3757" className="underline font-semibold hover:text-white">317-314-3757</a> or email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold hover:text-white">elevateforhumanity.edu@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
