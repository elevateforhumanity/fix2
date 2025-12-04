import ProgramPageTemplate from '@/components/ProgramPageTemplate';

export default function MedicalAssistantPage() {
  return (
    <ProgramPageTemplate
      // Hero Section
      heroImage="/images/programs/efh-medical-assistant-hero.jpg"
      heroTitle="Medical Assistant Training"
      heroSubtitle="Healthcare Career Training"
      heroDescription="Launch your healthcare career in 16-24 weeks. Learn vital signs, EKG, phlebotomy, medical records, and patient care with hands-on clinical experience."
      
      // Program Details
      duration="16-24 Weeks"
      format="Hybrid (Online + Clinical)"
      jobs={[
        "Medical Assistant",
        "Clinical Medical Assistant",
        "Administrative Medical Assistant",
        "Phlebotomy Technician",
        "EKG Technician",
        "Patient Care Coordinator",
        "Medical Office Specialist",
        "Healthcare Administrative Assistant"
      ]}
      
      // Highlights
      highlights={[
        {
          icon: "🏥",
          title: "Clinical Experience",
          description: "Get hands-on training in real medical offices, clinics, and hospitals. Work directly with patients under supervision of licensed professionals."
        },
        {
          icon: "💰",
          title: "100% Funded",
          description: "WIOA, WRG, and workforce grants cover full tuition costs. No student loans required. Financial aid assistance available."
        },
        {
          icon: "📋",
          title: "Multiple Certifications",
          description: "Graduate with Medical Assistant certification plus additional credentials in EKG, Phlebotomy, and CPR/First Aid."
        }
      ]}
      
      // How to Start
      howToStartSteps={[
        "Call 317-314-3757 to speak with an advisor about the Medical Assistant program and funding options",
        "Apply online at www.indianaconnectnow.com to access WIOA and WRG funding programs",
        "Complete enrollment paperwork and background check (required for clinical placements)",
        "Attend orientation and begin online coursework",
        "Complete hands-on clinical training at partner healthcare facilities",
        "Pass certification exam and receive job placement assistance"
      ]}
      
      // Additional CTA
      ctaImage="/images/medical-assistant-photos/medical-assistant-06.jpg"
      ctaTitle="Start Your Healthcare Career Today"
      ctaDescription="Medical Assistants are in high demand across Indiana. With our accelerated training program, you can be working in a healthcare setting in less than 6 months. We provide job placement assistance and many of our graduates receive job offers before completing the program."
      ctaButtonText="Apply for Medical Assistant Program"
      ctaButtonLink="/apply"
    />
  );
}
