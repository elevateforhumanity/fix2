import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team | Elevate For Humanity',
  description: 'Meet the dedicated professionals leading Elevate For Humanity\'s mission to transform lives through education and career training.',
};

const teamMembers = [
  {
    name: 'Elizabeth Greene',
    title: 'Chief Executive Officer',
    image: '/images/team/elizabeth-greene.jpg',
    bio: 'Elizabeth Greene is a visionary leader, workforce innovator, and community builder dedicated to transforming lives through education, opportunity, and equitable access. As the Chief Executive Officer of Elevate for Humanity Technical & Career Institute, she drives the organization\'s mission to uplift individuals, strengthen families, and create sustainable career pathways across Indiana and beyond.\n\nWith a unique blend of business leadership, technical expertise, and human-centered strategy, Elizabeth has built a powerful, fully integrated ecosystem that includes state-approved workforce programs, federal apprenticeship pathways, community empowerment services, and trauma-informed support. Under her leadership, Elevate for Humanity has become a federally aligned Registered Apprenticeship sponsor, a RAPIDS-approved provider, and a fully fundable ETPL program—eligible for WIOA, WRG, and JRI initiatives.\n\nElizabeth is known for her ability to envision what a community needs before it exists, and then build it with precision, compliance, and compassion. Her leadership philosophy centers on removing barriers, opening doors, and creating real opportunities for individuals who are often overlooked or underserved. She believes deeply in meeting people where they are, educating them, and empowering them to rise—professionally, personally, and financially.\n\nDriven by purpose and grounded in integrity, Elizabeth\'s work continues to impact hundreds of lives through education, training, mentorship, and strategic community partnerships. Her commitment is simple: create pathways, eliminate barriers, and elevate humanity—one person at a time.',
    email: 'elizabeth@elevateforhumanity.org',
    linkedin: 'https://www.linkedin.com/in/elizabethgreene',
  },
  {
    name: 'Leslie Wafford',
    title: 'Director of Community Services',
    image: '/images/team/leslie-wafford.jpg',
    bio: 'Leslie Wafford is deeply committed to building stable, empowered communities by promoting low-barrier housing access and strong eviction-prevention practices. Throughout her career, she has worked closely with diverse neighborhoods to remove barriers, support families, and create environments where residents can remain safely housed.\n\nLeslie believes in the power of education and advocacy. She is dedicated to helping individuals understand their rights and responsibilities as renters, giving them the tools they need to navigate housing challenges with confidence. Guided by her personal philosophy of "reach one, teach one," Leslie approaches her work with compassion, fairness, and a genuine desire to uplift the people and communities she serves.\n\nHer passion, experience, and community-first leadership make her a powerful asset within Elevate for Humanity\'s mission to support, educate, and strengthen individuals and families across Indiana.',
    email: 'leslie@elevateforhumanity.org',
  },
  {
    name: 'Jozanna George',
    title: 'Beauty Programs Director',
    image: '/images/team/jozanna-george.jpg',
    bio: 'Jozanna George is a highly experienced beauty indusstart professional with more than 20 years as a licensed Nail Technician and Esthetician. With a proven track record of excellence, she brings deep expertise, passion, and leadership to Elevate for Humanity as our Beauty Programs Director.\n\nJozanna spent seven years successfully running a beauty school, where she oversaw enrollment, instructor coordination, curriculum management, and daily operations. Her experience gives her a strong understanding of what students need to succeed in beauty education—from mastering fundamentals to preparing for state licensure and entering the indusstart with confidence.\n\nAs a seasoned Nail Instructor, Jozanna has trained countless students in nail technology, esthetics, sanitation, salon professionalism, and hands-on service techniques. Her teaching style balances patience, high standards, skill-building, and real-world insight—ensuring students graduate ready to excel in salons, spas, suites, or entrepreneurship.\n\nJozanna is known for her warm personality, strong communication skills, and true dedication to student success. At Elevate for Humanity, she plays a vital role in shaping the quality of our beauty indusstart programs, supporting enrollment, and helping future beauty professionals build the foundation for long-term careers.\n\nHer mission is simple: develop confident, skilled, and indusstart-ready students who are prepared to shine.',
    email: 'jozanna@elevateforhumanity.org',
  },
  {
    name: 'Clystjah Woodley',
    title: 'Life Coach',
    image: '/images/team/clystjah-woodley.jpg',
    bio: 'Clystjah Woodley is a compassionate and purpose-driven Life Coach dedicated to empowering individuals to heal, grow, and navigate life with clarity and confidence. With a strong passion for personal development and emotional wellness, she helps people break through barriers, understand their own potential, and create healthier patterns that support long-term success.\n\nClystjah\'s coaching style blends empathy, active listening, and practical strategies that meet people exactly where they are. She specializes in mindset transformation, confidence building, accountability, and guiding individuals through life challenges with grace and resilience. Her work centers on creating safe spaces for clients to express themselves, discover their strengths, and develop the tools they need to move forward.\n\nAt Elevate for Humanity, Clystjah plays an important role in the organization\'s holistic support model—helping students, participants, and families feel grounded, motivated, and supported as they pursue education, career pathways, and personal growth. She believes that when a person feels seen, heard, and understood, they gain the strength to transform their lives.\n\nGuided by the belief that growth starts with self-awareness and real transformation begins with support, Clystjah is committed to walking beside every individual she serves as they step into their highest potential.',
    email: 'clystjah@elevateforhumanity.org',
  },
  {
    name: 'Dr. Carlina Annette Wilkes',
    title: 'Executive Director of Financial Operations & Organizational Compliance',
    image: '/images/team/dr-carlina-wilkes.jpg',
    bio: 'Dr. Carlina Annette Wilkes is a highly accomplished executive and retired federal professional with more than 24 years of distinguished service within the Defense Finance and Accounting Service (DFAS). Throughout her federal career, she advanced through multiple leadership and operational roles, earning recognition for her excellence in financial management, organizational compliance, workforce development, and strategic program oversight.\n\nDr. Wilkes holds the Department of Defense Financial Management Certification, Level II, demonstrating mastery in federal financial operations, accountability, and mission-aligned decision-making.\n\nHer educational background reflects a deep commitment to leadership and lifelong learning. She holds a Doctorate in Minisstart, a Master of Arts in Minisstart, and a Bachelor of Applied Management, supported by specialized credentials in Accounting and Paralegal Studies. This diverse expertise allows her to navigate complex organizational systems, lead and develop teams, design effective operational frameworks, and improve efficiency across government, nonprofit, and community-serving environments.\n\nDr. Wilkes is known for her integrity, strategic insight, and results-driven leadership. She brings a powerful blend of federal experience, organizational acumen, and executive-level training to every role she undertakes. At Elevate for Humanity, she serves as a trusted leader and advisor, helping strengthen financial operations, compliance, and long-term institutional stability.',
    email: 'carlina@elevateforhumanity.org',
  },
  {
    name: 'Alina Smith, PMHNP',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/team/alina-smith.jpg',
    bio: 'Alina Smith is a compassionate, board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP) dedicated to promoting emotional wellness and holistic healing across all stages of life. A graduate of Purdue University, she holds a Master\'s in Nursing with a concentration in mental health across the lifespan.\n\nAlina provides comprehensive psychiatric care for individuals aged five and older, offering evidence-based mental health assessments, behavioral health interventions, and medication management for a wide range of mental health and substance use disorders. Her clinical approach combines psychopharmacology and therapeutic support, helping clients achieve balance, stability, and emotional growth.\n\nAt Elevate for Humanity, Alina plays a key role in integrating mental health awareness and wellness strategies into workforce and community programs. She believes that access to compassionate, judgment-free mental health care is the foundation of empowerment, self-sufficiency, and lasting transformation.',
    email: 'alina@elevateforhumanity.org',
  },
  {
    name: 'Sharon Douglass',
    title: 'Respiratory Therapy & Health Informatics Specialist',
    image: '/images/team/sharon-douglass.jpg',
    bio: 'Sharon Douglass is a highly skilled healthcare professional with over 30 years of dedicated experience as a Respiratory Therapist, complemented by a Master of Science degree in Health Informatics. She is deeply committed to improving patient safety, enhancing care quality, and supporting clinical teams through expert-level respiratory care and advanced healthcare data systems.\n\nThroughout her career, Sharon has worked at the intersection of patient care, medical technology, operations management, and clinical informatics. She has supported hospitals, long-term care facilities, and healthcare organizations by implementing evidence-based respiratory practices, improving patient outcomes, and streamlining clinical workflows to increase efficiency and reduce care variations.\n\nSharon\'s extensive clinical expertise includes respiratory therapy treatments and emergency response, ventilator management (invasive & noninvasive), bronchopulmonary hygiene techniques, oxygen therapy and airway management, interpreting EKGs, ABGs, vital signs, and diagnostic results, mechanical ventilator setup and monitoring, suctioning and airway clearance procedures, patient education and disease management, and managing respiratory equipment safety, testing, and maintenance.\n\nShe has also served as an Area Supervisor, overseeing staff performance, compliance with patient safety standards, and preventive maintenance for diagnostic equipment such as bronchoscopes and respiratory devices.\n\nAt Elevate for Humanity, Sharon brings her decades of clinical experience and informatics expertise to support healthcare training, workforce readiness, and patient-centered educational programs. Her passion lies in helping individuals and healthcare organizations improve safety, streamline processes, and deliver high-quality care.\n\nKnown for her professionalism, clinical precision, and commitment to excellence, Sharon Douglass is a trusted leader and educator dedicated to elevating patient outcomes and supporting the next generation of healthcare professionals.',
    email: 'sharon@elevateforhumanity.org',
  },
];

export default function TeamPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Meet Our Team
              </h1>
              <p className="text-xl text-white/95 max-w-3xl">
                Dedicated professionals committed to transforming lives through education, opportunity, and community empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-start`}
              >
                {/* Photo */}
                <div className="lg:w-1/3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-8xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="mt-6 space-y-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="block text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {member.email}
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-700 font-medium"
                      >
                        LinkedIn Profile →
                      </a>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="lg:w-2/3">
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                    {member.name}
                  </h2>
                  <p className="text-xl text-blue-600 font-semibold mb-6">
                    {member.title}
                  </p>
                  <div className="prose prose-lg max-w-none">
                    {member.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Join Our Team</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're always looking for passionate professionals who share our mission to transform lives through education and opportunity.
          </p>
          <Link
            href="/careers"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </main>
  );
}
