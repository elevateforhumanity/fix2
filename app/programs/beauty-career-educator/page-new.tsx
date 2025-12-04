import type { Metadata } from 'next';
import ProgramPageLayout from '@/components/ProgramPageLayout';

export const metadata: Metadata = {
  title: 'Beauty Career Educator Training | Elevate For Humanity',
  description: 'Become a licensed cosmetology instructor. Teach the next generation of beauty professionals. 100% free training.',
};

export default function BeautyCareerEducatorPage() {
  return (
    <ProgramPageLayout
      // Unique Hero Banner - Beauty Education Specific (Instructor Teaching)
      heroImage="/images/programs/efh-beauty-career-educator-hero.jpg"
      heroImageAlt="Beauty instructor teaching cosmetology students in modern salon classroom"
      title="Beauty Career Educator"
      subtitle="Transform your passion into a teaching career. Train the next generation of beauty professionals. Flexible schedule, stable income, creative fulfillment."
      ctaPrimary={{ text: 'Become an Instructor', href: '/apply' }}
      ctaSecondary={{ text: 'Learn More', href: '/contact' }}
      
      // Quick Facts
      duration="12-16 Weeks"
      cost="$0"
      placement="85%+"
      salary="$40K-$60K"
      
      // Overview
      overviewTitle="Cosmetology Instructor Certification"
      overviewDescription={[
        "Already licensed in cosmetology, barbering, or esthetics? Take the next step and become an educator. Share your expertise, mentor students, and build a rewarding teaching career with predictable hours and benefits.",
        "Our program covers adult learning theory, curriculum development, classroom management, and state board exam preparation. Learn to teach hair, skin, nails, and business skills effectively.",
        "Flexible evening and weekend classes designed for working professionals. Complete your instructor hours while maintaining your current position. Graduate ready to teach at beauty schools, vocational programs, or community colleges."
      ]}
      certifications={[
        "State Cosmetology Instructor License",
        "Adult Education Teaching Certificate",
        "Curriculum Development Certification",
        "State Board Exam Preparation Training",
        "Classroom Management & Safety"
      ]}
      
      // Visual Highlights - Education Focused
      highlights={[
        {
          title: "Teaching Methodology & Curriculum Design",
          description: "Learn how adults learn differently than children. Master various teaching styles including demonstration, hands-on practice, and theory instruction. Develop lesson plans that meet state board requirements while keeping students engaged. Create assessments that measure real-world competency.",
          imageSrc: "/images/beauty/beauty-instructor-teaching.jpg",
          imageAlt: "Instructor demonstrating hair cutting technique to students"
        },
        {
          title: "Classroom Management & Student Success",
          description: "Build a positive learning environment where every student thrives. Learn conflict resolution, motivation techniques, and how to adapt to different learning styles. Mentor students through challenges and celebrate their achievements. Prepare them not just for exams, but for successful careers.",
          imageSrc: "/images/beauty/beauty-classroom-environment.jpg",
          imageAlt: "Beauty school classroom with students practicing on mannequins"
        },
        {
          title: "State Board Exam Preparation",
          description: "Master the art of preparing students for state board practical and written exams. Learn testing strategies, common pitfalls, and how to build student confidence. Your students' success rate reflects your teaching excellence. Our instructors maintain a 95%+ first-time pass rate.",
          imageSrc: "/images/beauty/beauty-exam-prep.jpg",
          imageAlt: "Instructor reviewing state board exam materials with student"
        },
        {
          title: "Business & Career Counseling",
          description: "Teach students the business side of beauty: client retention, pricing strategies, marketing, and salon management. Provide career counseling and job placement guidance. Help them transition from students to successful professionals. Your impact extends far beyond technical skills.",
          imageSrc: "/images/beauty/beauty-business-training.jpg",
          imageAlt: "Instructor teaching salon business management to students"
        }
      ]}
      
      // Career Outcomes
      careerTitle="Rewarding Teaching Careers in Beauty"
      careerDescription="Beauty schools nationwide need qualified instructors. Enjoy stable employment with benefits, predictable hours (no more late-night clients!), and the satisfaction of shaping careers. Many instructors also maintain a small private clientele or work weekends for extra income. Teaching offers work-life balance that salon work often doesn't."
      careerImage="/images/programs/efh-beauty-career-educator-card.jpg"
      careerImageAlt="Beauty instructor with successful graduate at graduation ceremony"
      jobTitles={[
        "Cosmetology School Instructor - $35K-$50K + Benefits",
        "Department Head / Lead Instructor - $45K-$60K",
        "Vocational Program Director - $50K-$70K",
        "Private Beauty Academy Owner - $60K-$100K+",
        "Corporate Educator (Brand Training) - $55K-$75K + Travel"
      ]}
      
      // Final CTA
      finalCtaTitle="Share Your Passion. Shape Careers."
      finalCtaDescription="Transform your beauty expertise into a teaching career. Stable hours, benefits, and the reward of mentoring the next generation."
    />
  );
}
