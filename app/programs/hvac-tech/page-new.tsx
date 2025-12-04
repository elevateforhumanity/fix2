import type { Metadata } from 'next';
import ProgramPageLayout from '@/components/ProgramPageLayout';

export const metadata: Metadata = {
  title: 'HVAC Technician Training | Elevate For Humanity',
  description: '100% free HVAC training program. Learn heating, ventilation, and air conditioning systems. Get certified and start your career.',
};

export default function HVACTechPage() {
  return (
    <ProgramPageLayout
      // Unique Hero Banner - HVAC Specific
      heroImage="/images/trades/hero-program-hvac.jpg"
      heroImageAlt="HVAC technician working on commercial air conditioning unit"
      title="HVAC Technician Training"
      subtitle="Master heating, cooling, and ventilation systems. Get EPA certified. Launch your career in 8-12 weeks."
      ctaPrimary={{ text: 'Apply Now - Free Training', href: '/apply' }}
      ctaSecondary={{ text: 'Schedule a Tour', href: '/contact' }}
      
      // Quick Facts
      duration="8-12 Weeks"
      cost="$0"
      placement="90%+"
      salary="$45K+"
      
      // Overview
      overviewTitle="Complete HVAC Training Program"
      overviewDescription={[
        "Train on real Carrier, Trane, Lennox, and Rheem equipment in our 5,000 sq ft climate-controlled facility. Work with residential and commercial systems from day one.",
        "Learn from EPA-certified master technicians with 15+ years of field experience. Small class sizes (max 12 students) ensure hands-on practice with every system.",
        "Monday-Friday 8am-4pm with evening classes available. Flexible scheduling for working adults. Job placement assistance starts week one."
      ]}
      certifications={[
        "EPA 608 Universal Certification (required by federal law)",
        "OSHA 10-Hour Construction Safety",
        "R-410A Refrigerant Handling Certification",
        "Electrical Fundamentals for HVAC",
        "Digital Multimeter & Diagnostic Tools"
      ]}
      
      // Visual Highlights - No Bullets!
      highlights={[
        {
          title: "Hands-On System Installation",
          description: "Install complete residential HVAC systems from scratch. Learn proper ductwork design, refrigerant line installation, electrical connections, and startup procedures. Practice on split systems, package units, and heat pumps.",
          imageSrc: "/images/trades/program-hvac-technician.jpg",
          imageAlt: "Student installing HVAC ductwork in training facility"
        },
        {
          title: "Diagnostic & Troubleshooting",
          description: "Master the art of system diagnosis using digital manifolds, multimeters, and thermal imaging cameras. Learn to identify compressor failures, refrigerant leaks, electrical issues, and airflow problems. Real-world scenarios prepare you for any service call.",
          imageSrc: "/images/trades/program-hvac-overview.jpg",
          imageAlt: "Technician using diagnostic equipment on HVAC system"
        },
        {
          title: "Commercial Systems Training",
          description: "Work with rooftop units, chillers, and building automation systems. Learn commercial refrigeration, boiler operations, and large-scale climate control. Gain experience with systems found in hospitals, schools, and office buildings.",
          imageSrc: "/images/facilities-new/facility-1.jpg",
          imageAlt: "Commercial HVAC rooftop units at training facility"
        },
        {
          title: "Energy Efficiency & Smart Controls",
          description: "Install and program smart thermostats, zone control systems, and energy management platforms. Learn about high-efficiency systems, heat recovery ventilators, and green building standards. Position yourself for the future of HVAC.",
          imageSrc: "/images/artlist/hero-training-1.jpg",
          imageAlt: "Smart thermostat and energy efficient HVAC controls"
        }
      ]}
      
      // Career Outcomes
      careerTitle="Your HVAC Career Starts Here"
      careerDescription="The HVAC industry is booming with 13% job growth projected through 2032. Our graduates work for top companies like Carrier, Trane, and local HVAC contractors. Many start their own businesses within 5 years. With our job placement support, you'll have interviews lined up before graduation."
      careerImage="/images/hero-new/hero-2.jpg"
      careerImageAlt="HVAC technician on job site with company van"
      jobTitles={[
        "HVAC Installation Technician - $40K-$55K",
        "Service & Repair Technician - $45K-$65K",
        "Commercial HVAC Specialist - $55K-$75K",
        "HVAC Project Manager - $65K-$85K",
        "Business Owner / Contractor - $80K-$150K+"
      ]}
      
      // Final CTA
      finalCtaTitle="Ready to Start Your HVAC Career?"
      finalCtaDescription="Join our next class starting soon. 100% free training, industry certifications, and job placement support included."
    />
  );
}
