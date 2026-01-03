#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const files = [
  "app/staff-portal/page.tsx",
  "app/onboarding/page.tsx",
  "app/onboarding/payroll-setup/PayrollSetupForm.tsx",
  "app/calculator/revenue-share/page.tsx",
  "app/partner/page.tsx",
  "app/transparency/page.tsx",
  "app/career-services/resume-building/page.tsx",
  "app/pathways/page.tsx",
  "app/jri/page.tsx",
  "app/agencies/page.tsx",
  "app/accreditation/page.tsx",
  "app/success-stories/page.tsx",
  "app/program-holder/onboarding/page.tsx",
  "app/program-holder/compliance/page.tsx",
  "app/program-holder/verify-identity/IdentityVerificationFlow.tsx",
  "app/program-holder/verify-identity/ManualIDUploadForm.tsx",
  "app/program-holder/verification/page.tsx",
  "app/snap-et-partner/page.tsx",
  "app/(dashboard)/client-portal/page.tsx",
  "app/courses/nrf/page.tsx",
  "app/programs/skilled-trades/page.tsx",
  "app/programs/APPRENTICESHIP_TEMPLATE.tsx",
  "app/programs/business-financial/page.tsx",
  "app/programs/MODERN_TEMPLATE.tsx",
  "app/programs/cdl-transportation/page.tsx",
  "app/programs/healthcare/page.tsx",
  "app/programs/tax-entrepreneurship/page.tsx",
  "app/programs/tax-preparation/page.tsx",
  "app/programs/barber-apprenticeship/page.tsx",
  "app/workforce-board/page.tsx",
  "app/lms/courses/healthcare-fundamentals/page.tsx",
  "app/lms/(app)/courses/[courseId]/lessons/[lessonId]/page.tsx",
  "app/supersonic-fast-cash/tools/drake-download/page.tsx",
  "app/supersonic-fast-cash/tools/refund-tracker/page.tsx",
  "app/supersonic-fast-cash/tools/smart-upload/page.tsx",
  "app/supersonic-fast-cash/page.tsx",
  "app/supersonic-fast-cash/careers/page.tsx",
  "app/supersonic-fast-cash/page-gradient-modern.tsx",
  "app/supersonic-fast-cash/admin/client-intake/page.tsx",
  "app/supersonic-fast-cash/diy-taxes/page.tsx",
  "app/supersonic-fast-cash/services/page.tsx",
  "app/fssa-partnership-request/page.tsx",
  "app/academic-integrity/page.tsx",
  "app/solutions/page.tsx",
  "app/instructor/dashboard/page.tsx",
  "app/banking/page.tsx",
  "app/pricing/program-holder/page.tsx",
  "app/pricing/platform/page.tsx",
  "app/pricing/independent/page.tsx",
  "app/employer/page.tsx",
  "app/ferpa/page.tsx",
  "app/funding/page.tsx",
  "app/for/students/page.tsx",
  "app/licensing-partnerships/page.tsx",
  "app/certificates/page.tsx",
  "app/contracts/page.tsx",
  "app/contact/page.tsx",
  "app/suboffice-onboarding/page.tsx",
  "app/franchise/page.tsx",
  "app/donate/page.tsx",
  "app/tax/book-appointment/page.tsx",
  "app/tax/supersonicfastcash/services/page.tsx",
  "app/tax/page.tsx",
  "app/admin/sap/page.tsx",
  "app/admin/portal-map/page.tsx",
  "app/admin/accreditation/page.tsx",
  "app/admin/shops/page.tsx",
  "app/admin/live-chat/page.tsx",
  "app/admin/store/clones/page.tsx",
  "app/admin/external-modules/page.tsx",
  "app/admin/autopilots/page.tsx",
  "app/admin/dashboard/etpl/page.tsx",
  "app/admin/program-holder-documents/page.tsx",
  "app/admin/dev-studio/page.tsx",
  "app/admin/program-holders/verification/page.tsx",
  "app/admin/program-holders/verification/[id]/review/VerificationReviewForm.tsx",
  "app/partners/jri/page.tsx",
  "app/partners/hsi/page.tsx",
  "app/partners/careersafe/page.tsx",
  "app/partners/nrf/page.tsx",
  "app/syllabi/page.tsx",
  "app/workone-partner-packet/page.tsx",
  "app/apprenticeships/page.tsx",
  "app/verify-credential/page.tsx",
  "app/approvals/page.tsx",
];

let fixed = 0;

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file uses CheckCircle but doesn't import it
  if (content.includes('<CheckCircle') && !content.includes('CheckCircle') && content.includes("from 'lucide-react'")) {
    // Find the lucide-react import and add CheckCircle
    const importRegex = /(import\s*{[^}]*)(}\s*from\s*['"]lucide-react['"])/;
    const match = content.match(importRegex);
    
    if (match) {
      const imports = match[1];
      const closing = match[2];
      
      // Add CheckCircle to imports if not already there
      if (!imports.includes('CheckCircle')) {
        const newImports = imports + ', CheckCircle';
        content = content.replace(importRegex, newImports + closing);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${filePath}`);
        fixed++;
      }
    }
  }
});

console.log(`\n✅ Fixed ${fixed} files with missing CheckCircle imports`);
