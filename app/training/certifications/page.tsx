import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Certifications | Elevate For Humanity",
  description: "Learn more about Certifications inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/training/certifications"
      label="Certifications"
      section="Other"
    />
  );
}
