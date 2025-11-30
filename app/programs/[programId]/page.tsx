import { ProgramPageShell } from "@/components/programs/ProgramPageShell";
import { Card } from "@/components/ui/Card";
import { COMPLETE_PROGRAMS } from "@/lib/programs-data-complete";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProgramPageProps {
  params: {
    programId: string;
  };
}

export async function generateStaticParams() {
  return COMPLETE_PROGRAMS.map((program) => ({
    programId: program.slug,
  }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const program = COMPLETE_PROGRAMS.find((p) => p.slug === params.programId);

  if (!program) {
    return {
      title: "Program Not Found",
    };
  }

  return {
    title: `${program.name} - Elevate for Humanity`,
    description: program.summary,
    keywords: [program.name, program.tagline, ...program.funding],
    openGraph: {
      title: `${program.name} | Elevate for Humanity`,
      description: program.summary,
      images: [program.image],
      type: "website",
    },
  };
}

export default function DynamicProgramPage({ params }: ProgramPageProps) {
  const program = COMPLETE_PROGRAMS.find((p) => p.slug === params.programId);

  if (!program) {
    notFound();
  }

  // Extract outcomes from bullets (first 4-5 items typically)
  const outcomes = program.bullets.slice(0, 5);
  
  // Extract highlights (key selling points)
  const highlights = [
    program.tagline,
    `${program.duration} program`,
    `Funding available: ${program.funding.join(", ")}`,
    program.etplApproved ? "ETPL Approved Program" : "",
  ].filter(Boolean);

  return (
    <ProgramPageShell
      title={program.name}
      subtitle={program.tagline}
      blurb={program.description}
      credential={program.etplApproved ? "ETPL Approved Credential" : "Industry-Recognized Credential"}
      duration={program.duration}
      schedule="Flexible scheduling available - day, evening, and weekend options"
      location="Multiple locations across Indiana and online options"
      funding={`Funding available through ${program.funding.join(", ")}`}
      audience="Open to all individuals seeking career advancement and skills training"
      heroImage={program.image}
      outcomes={outcomes}
      highlights={highlights}
      employerNotes="Partner with us to train your workforce or hire our graduates. Contact us for employer partnerships and hiring opportunities."
      applyHref={`/apply?program=${program.slug}`}
    >
      <Card className="p-5 md:p-6 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          What You'll Learn
        </h3>
        <ul className="text-sm text-slate-700 space-y-1">
          {program.bullets.map((bullet, index) => (
            <li key={index}>• {bullet}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-5 md:p-6 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Program Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-slate-900">Duration</p>
            <p className="text-slate-700">{program.duration}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Funding Options</p>
            <p className="text-slate-700">{program.funding.join(", ")}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Credential</p>
            <p className="text-slate-700">
              {program.etplApproved ? "ETPL Approved" : "Industry-Recognized"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Format</p>
            <p className="text-slate-700">In-person, Online, or Hybrid</p>
          </div>
        </div>
      </Card>

      <Card className="p-5 md:p-6 space-y-3 bg-teal-50 border-teal-200">
        <h3 className="text-lg font-semibold text-teal-900">
          Ready to Get Started?
        </h3>
        <p className="text-sm text-teal-800">
          Apply now to begin your journey in {program.name}. Our team will guide you through the enrollment process and help you access available funding.
        </p>
        <div className="flex gap-3">
          <a
            href={`/apply?program=${program.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            Apply Now
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white border-2 border-teal-600 px-6 py-3 text-sm font-semibold text-teal-600 hover:bg-teal-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </Card>
    </ProgramPageShell>
  );
}
