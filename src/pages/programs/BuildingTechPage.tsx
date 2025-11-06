/**
 * Building Services Technician Program Page
 * Copyright (c) 2025 Elevate for Humanity
 */

import React from 'react';
import ProgramPageTemplate from '../../components/ProgramPageTemplate';

export default function BuildingTechPage() {
  return (
    <ProgramPageTemplate
      title="Building Services Technician"
      icon="🔧"
      duration="Flexible • Industry Certification"
      description="Learn essential building maintenance and repair skills for commercial and residential properties."
      funding="WRG • WIOA"
      metaDescription="Become a certified Building Services Technician. Learn HVAC, plumbing, electrical, and facility maintenance with 100% funded training."
      overview="Our Building Services Technician program prepares you for a career in facility maintenance and building operations. You'll learn essential skills in HVAC, plumbing, electrical systems, and general maintenance to keep commercial and residential properties running smoothly."
      benefits={[
        '100% funded training',
        'Industry-recognized certification',
        'Flexible scheduling options',
        'Hands-on training with real equipment',
        'Job placement assistance',
        'High-demand career field',
      ]}
      curriculum={[
        'HVAC systems maintenance',
        'Basic plumbing repairs',
        'Electrical troubleshooting',
        'Carpentry and drywall repair',
        'Painting and finishing',
        'Safety procedures and OSHA compliance',
        'Preventive maintenance scheduling',
      ]}
      requirements={[
        'Must be 18 years or older',
        'High school diploma or GED',
        'Marion County, IN resident',
        'Eligible for WIOA or WRG funding',
        'Physical ability to perform maintenance tasks',
        "Valid driver's license preferred",
      ]}
      outcomes={[
        'Certified Building Services Technician',
        'Employment in facilities management',
        'Property maintenance positions',
        'Average salary: $32,000-$45,000/year',
        'Career advancement opportunities',
        'Self-employment potential',
      ]}
    />
  );
}
