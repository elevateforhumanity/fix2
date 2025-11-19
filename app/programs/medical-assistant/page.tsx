import { ProgramPageShell } from "@/components/programs/ProgramPageShell";
import { Card } from "@/components/ui/Card";

export default function MedicalAssistantProgramPage() {
  return (
    <ProgramPageShell
      title="Medical Assistant"
      subtitle="Train for front- and back-office roles supporting patients and clinical teams."
      blurb="This program prepares you to work in clinics, practices, and healthcare organizations by combining classroom learning with skills practice and connections to employer partners."
      credential="Medical Assistant training (with certification prep where available)"
      duration="Approx. 16–24 weeks"
      schedule="Blended options (day / evening) depending on cohort"
      location="Partner healthcare training sites in Indiana"
      funding="Designed to connect with WIOA / workforce funding where eligible."
      audience="People who want a patient-facing role, are detail-oriented, and ready to enter healthcare quickly."
      outcomes={[
        "Support basic clinical tasks under supervision of licensed staff",
        "Handle front-office duties like scheduling, intake, and documentation",
        "Apply medical terminology and patient communication best practices",
        "Prepare for certification options and entry-level employment in clinics",
      ]}
      highlights={[
        "Healthcare-focused training in a short timeline",
        "Connections to employer and clinical partners",
        "Workforce-friendly design for adults returning to school",
      ]}
      employerNotes="Use this program to build an entry-level talent pipeline for front desk and clinical support roles, with learners already trained on core skills and professionalism."
      applyHref="/apply?program=medical-assistant"
    >
      <Card className="p-5 md:p-6 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Sample skills you'll practice
        </h3>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• Patient intake, vital signs, and basic documentation</li>
          <li>• Scheduling, phones, and front-office workflow</li>
          <li>• Professional communication and privacy basics</li>
          <li>• Teamwork inside a busy clinic environment</li>
        </ul>
      </Card>
    </ProgramPageShell>
  );
}
