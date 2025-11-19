import { ProgramPageShell } from "@/components/programs/ProgramPageShell";
import { Card } from "@/components/ui/Card";

export default function HvacProgramPage() {
  return (
    <ProgramPageShell
      title="HVAC Technician"
      subtitle="Learn to install, maintain, and repair heating, ventilation, and air conditioning systems."
      blurb="This program is built to align with workforce funding and employer needs so you graduate ready to work in residential or light commercial HVAC roles."
      credential="Industry-recognized HVAC training (EPA prep support)"
      duration="Approx. 12–16 weeks"
      schedule="Day / evening options (varies by cohort)"
      location="Indiana-based training sites (with partner schools)"
      funding="Workforce Ready Grant, WIOA, and partner funding where eligible."
      audience="Adults and young adults ready to work with their hands, troubleshoot systems, and move into a skilled trade."
      outcomes={[
        "Understand basic electrical, refrigeration, and HVAC safety",
        "Assist with installation and maintenance of HVAC systems",
        "Read basic schematics and use trade tools correctly",
        "Prepare for entry-level roles with local HVAC employers",
      ]}
      highlights={[
        "Hands-on labs through approved partner schools",
        "Built to plug into state workforce funding streams",
        "Pathway to in-demand, year-round employment",
      ]}
      employerNotes="Use this program as a talent pipeline to bring in entry-level techs you can grow into lead installers and service technicians."
      applyHref="/apply?program=hvac"
    >
      <Card className="p-5 md:p-6 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Sample topics covered
        </h3>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• HVAC safety, tools, and shop practices</li>
          <li>• Fundamentals of heating and cooling</li>
          <li>• Basic electricity for HVAC</li>
          <li>• Intro to troubleshooting and maintenance</li>
        </ul>
      </Card>
    </ProgramPageShell>
  );
}
