'use client';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';

const steps=[
 {target:'overview',title:'Your host-shop command center',description:'Start here each time you log in. This dashboard shows the apprentices actually assigned to your shop and links to the records you are responsible for maintaining.'},
 {target:'orientation',title:'Complete the operating orientation first',description:'Before signing records, review the host-shop orientation. It explains the sponsor/host-shop/apprentice roles, weekly workflow, documentation rules, and what must be escalated to Elevate.'},
 {target:'syllabus',title:'Train from the registered standard',description:'The syllabus is not generic course copy. It reads the apprenticeship competency standard used by the progress system. Use it to plan supervised work opportunities.'},
 {target:'apprentices',title:'Open one apprentice at a time',description:'Each apprentice record shows their live progress. Use that record to review practical activity and verify only competencies you personally observed.'},
 {target:'signoff',title:'Your sign-off updates apprentice progress',description:'When you verify a competency, the apprentice sees that verification in their own dashboard. Do not pre-sign, estimate, or verify work you did not observe.'},
];
export default function HostShopDashboardTour(){return <OnboardingTour steps={steps} tourKey="host_shop_apprenticeship_v1"/>;}
